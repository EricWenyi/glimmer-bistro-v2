'use client';

import { FormEvent, useMemo, useState } from 'react';

type EventUploadPanelProps = {
  eventKey: string;
};

type UploadResponse = {
  placement?: { shortCode?: string };
  media?: { url?: string };
  error?: string;
};

export default function EventUploadPanel({ eventKey }: EventUploadPanelProps) {
  const apiBase = useMemo(
    () => (process.env.NEXT_PUBLIC_CONTENT_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, ''),
    [],
  );

  const [adminToken, setAdminToken] = useState('');
  const [caption, setCaption] = useState('');
  const [position, setPosition] = useState('1');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<UploadResponse | null>(null);

  const canSubmit = Boolean(adminToken.trim() && file && !isSubmitting);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setMessage('Please choose an image first.');
      return;
    }

    setIsSubmitting(true);
    setMessage('Uploading...');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('targetType', 'event');
      formData.append('targetKey', eventKey);
      formData.append('slot', 'gallery');
      formData.append('position', position || '1');
      formData.append('status', status);
      if (caption.trim()) {
        formData.append('caption', caption.trim());
      }

      const response = await fetch(`${apiBase}/v1/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken.trim()}`,
        },
        body: formData,
      });

      const data = (await response.json()) as UploadResponse;
      setResult(data);

      if (!response.ok) {
        setMessage(data.error || 'Upload failed.');
        return;
      }

      setMessage('Upload succeeded. Refresh this page in a few seconds to see the new photo.');
      setCaption('');
      setFile(null);
      setPosition((value) => value || '1');
    } catch {
      setMessage('Upload request failed. Check API URL and tunnel status.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="event-upload-card">
      <div className="event-upload-head">
        <p className="event-upload-eyebrow">Event Content Studio</p>
        <h3>Upload New Valentine Photos</h3>
        <p>Drop a polished shot, add caption and order, and publish directly to this event gallery.</p>
      </div>

      <form className="event-upload-form" onSubmit={onSubmit}>
        <label>
          Admin Token
          <input
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Bearer token"
            autoComplete="off"
            required
          />
        </label>

        <label>
          Photo File
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            required
          />
        </label>

        <label>
          Caption
          <input
            type="text"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Romantic table setting at candlelight"
          />
        </label>

        <div className="event-upload-row">
          <label>
            Position
            <input
              type="number"
              min={1}
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
          </label>

          <label>
            Mode
            <select value={status} onChange={(event) => setStatus(event.target.value as 'published' | 'draft')}>
              <option value="published">Publish now</option>
              <option value="draft">Save as draft</option>
            </select>
          </label>
        </div>

        <button type="submit" disabled={!canSubmit}>
          {isSubmitting ? 'Uploading...' : 'Upload to Event Gallery'}
        </button>
      </form>

      {message && <p className="event-upload-msg">{message}</p>}

      {result?.placement?.shortCode && (
        <div className="event-upload-result">
          <p>
            Placement: <strong>{result.placement.shortCode}</strong>
          </p>
          {result.media?.url && (
            <p>
              URL: <a href={result.media.url}>{result.media.url}</a>
            </p>
          )}
        </div>
      )}
    </section>
  );
}
