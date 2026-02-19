import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { pool } from './db.js';
import { makeMediaCode, makePlacementCode } from './codes.js';
import { uploadImage, getLocalUploadDir, ensureLocalUploadDir } from './storage.js';
import { assertAllowedSlot, patchPlacementSchema, targetTypeSchema, uploadSchema } from './validation.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

const port = Number(process.env.PORT || 4000);
const adminToken = process.env.ADMIN_TOKEN;
const webOrigin = process.env.WEB_ORIGIN;

if (!adminToken) {
  throw new Error('ADMIN_TOKEN is required');
}

app.use(
  cors({
    origin: webOrigin ? [webOrigin] : true,
  }),
);
app.use(express.json({ limit: '1mb' }));

void ensureLocalUploadDir();
app.use('/uploads', express.static(path.resolve(process.cwd(), getLocalUploadDir())));

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!token || token !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/v1/upload', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'image file is required' });
    }

    const parsed = uploadSchema.parse(req.body);
    assertAllowedSlot(parsed.targetType, parsed.slot);

    const { storageUrl, storageKey } = await uploadImage({
      data: req.file.buffer,
      mimeType: req.file.mimetype,
      fileNameHint: req.file.originalname,
    });

    const mediaId = randomUUID();
    const mediaCode = makeMediaCode();
    const placementId = randomUUID();
    const placementCode = makePlacementCode();

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query(
        `INSERT INTO media (id, short_code, storage_url, storage_key, mime_type, caption, alt)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [mediaId, mediaCode, storageUrl, storageKey, req.file.mimetype, parsed.caption ?? null, parsed.alt ?? null],
      );

      await client.query(
        `INSERT INTO placements (
          id, short_code, media_id, target_type, target_key, slot, position, status, caption_override, alt_override
        ) VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 1), $8, $9, $10)`,
        [
          placementId,
          placementCode,
          mediaId,
          parsed.targetType,
          parsed.targetKey,
          parsed.slot,
          parsed.position ?? null,
          parsed.status,
          parsed.captionOverride ?? null,
          parsed.altOverride ?? null,
        ],
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return res.status(201).json({
      ok: true,
      status: parsed.status,
      media: {
        shortCode: mediaCode,
        url: storageUrl,
      },
      placement: {
        shortCode: placementCode,
        targetType: parsed.targetType,
        targetKey: parsed.targetKey,
        slot: parsed.slot,
        position: parsed.position ?? 1,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return res.status(400).json({ error: message });
  }
});

app.get('/v1/content', async (req, res) => {
  try {
    const parsedTargetType = targetTypeSchema.parse(req.query.targetType);
    const targetKey = String(req.query.targetKey || '').trim();
    if (!targetKey) {
      return res.status(400).json({ error: 'targetKey is required' });
    }

    const result = await pool.query(
      `SELECT
          p.short_code AS placement_short_code,
          p.slot,
          p.position,
          COALESCE(p.caption_override, m.caption) AS caption,
          COALESCE(p.alt_override, m.alt, m.caption, '') AS alt,
          m.short_code AS media_short_code,
          m.storage_url AS image_url,
          p.created_at
       FROM placements p
       INNER JOIN media m ON p.media_id = m.id
       WHERE p.target_type = $1
         AND p.target_key = $2
         AND p.status = 'published'
         AND (p.starts_at IS NULL OR p.starts_at <= now())
         AND (p.ends_at IS NULL OR p.ends_at >= now())
       ORDER BY p.slot ASC, p.position ASC, p.created_at ASC`,
      [parsedTargetType, targetKey],
    );

    const slots: Record<string, Array<Record<string, unknown>>> = {};

    for (const row of result.rows) {
      const slot = row.slot as string;
      if (!slots[slot]) {
        slots[slot] = [];
      }

      slots[slot].push({
        placementShortCode: row.placement_short_code,
        mediaShortCode: row.media_short_code,
        imageUrl: row.image_url,
        caption: row.caption,
        alt: row.alt,
        position: row.position,
      });
    }

    return res.json({
      targetType: parsedTargetType,
      targetKey,
      slots,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch content';
    return res.status(400).json({ error: message });
  }
});

app.patch('/v1/placements/:shortCode', requireAdmin, async (req, res) => {
  try {
    const shortCode = String(req.params.shortCode || '').trim().toUpperCase();
    if (!/^P-[A-Z0-9]{6}$/.test(shortCode)) {
      return res.status(400).json({ error: 'Invalid placement short code' });
    }

    const parsed = patchPlacementSchema.parse(req.body);
    const currentPlacement = await pool.query(
      'SELECT target_type, slot FROM placements WHERE short_code = $1',
      [shortCode],
    );
    if (currentPlacement.rowCount === 0) {
      return res.status(404).json({ error: 'Placement not found' });
    }

    const existing = currentPlacement.rows[0] as { target_type: 'home' | 'event' | 'recipe'; slot: string };
    const nextTargetType = parsed.targetType ?? existing.target_type;
    const nextSlot = parsed.slot ?? existing.slot;
    assertAllowedSlot(nextTargetType, nextSlot);

    const updates: string[] = [];
    const values: unknown[] = [];

    const pushUpdate = (column: string, value: unknown) => {
      values.push(value);
      updates.push(`${column} = $${values.length}`);
    };

    if (parsed.status) pushUpdate('status', parsed.status);
    if (parsed.position) pushUpdate('position', parsed.position);
    if (parsed.targetType) pushUpdate('target_type', parsed.targetType);
    if (parsed.targetKey) pushUpdate('target_key', parsed.targetKey);
    if (parsed.slot) pushUpdate('slot', parsed.slot);
    if (Object.prototype.hasOwnProperty.call(parsed, 'captionOverride')) pushUpdate('caption_override', parsed.captionOverride ?? null);
    if (Object.prototype.hasOwnProperty.call(parsed, 'altOverride')) pushUpdate('alt_override', parsed.altOverride ?? null);

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    values.push(shortCode);

    const query = `UPDATE placements SET ${updates.join(', ')} WHERE short_code = $${values.length} RETURNING short_code, status, target_type, target_key, slot, position, caption_override, alt_override`;
    const result = await pool.query(query, values);

    return res.json({ ok: true, placement: result.rows[0] });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to patch placement';
    return res.status(400).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`content-api listening on :${port}`);
});
