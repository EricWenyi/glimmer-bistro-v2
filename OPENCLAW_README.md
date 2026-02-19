# OpenClaw MVP Runbook (Glimmer Bistro)

This file is the operational runbook for handling image upload/placement in the MVP.

## 1. Stack and URLs

- Frontend (Vercel): `https://glimmer-bistro-v2.vercel.app`
- Local API: `http://localhost:4000`
- Public API via tunnel: `https://served-dsl-wear-sporting.trycloudflare.com`

## 2. Required services

Start local stack from project root:

```bash
docker compose -f compose.yml up -d --build
```

Health check:

```bash
curl http://localhost:4000/health
```

## 3. Data model (important)

- `media`: actual image asset + URL
- `placements`: where/how image appears
- Operations should target **placement short codes** (`P-XXXXXX`), not media codes.

## 4. Supported target/slot mapping (MVP)

- `home` -> `hero`, `gallery`
- `event` -> `hero`, `gallery`
- `recipe` -> `cover`, `gallery`

## 5. Upload an event image

```bash
curl -X POST http://localhost:4000/v1/upload \
  -H "Authorization: Bearer change_me" \
  -F "image=@/absolute/path/photo.jpg" \
  -F "targetType=event" \
  -F "targetKey=valentine-2026" \
  -F "slot=gallery" \
  -F "position=1" \
  -F "status=published" \
  -F "caption=Candlelight table"
```

Response includes `placement.shortCode` (use this for edits/retract).

## 6. Essential placement operations

### 6.1 Query published content

```bash
curl "http://localhost:4000/v1/content?targetType=event&targetKey=valentine-2026"
```

### 6.2 Retract (archive)

```bash
curl -X PATCH http://localhost:4000/v1/placements/P-XXXXXX \
  -H "Authorization: Bearer change_me" \
  -H "Content-Type: application/json" \
  -d '{"status":"archived"}'
```

### 6.3 Move to draft

```bash
curl -X PATCH http://localhost:4000/v1/placements/P-XXXXXX \
  -H "Authorization: Bearer change_me" \
  -H "Content-Type: application/json" \
  -d '{"status":"draft"}'
```

### 6.4 Re-publish

```bash
curl -X PATCH http://localhost:4000/v1/placements/P-XXXXXX \
  -H "Authorization: Bearer change_me" \
  -H "Content-Type: application/json" \
  -d '{"status":"published"}'
```

### 6.5 Reorder in gallery

```bash
curl -X PATCH http://localhost:4000/v1/placements/P-XXXXXX \
  -H "Authorization: Bearer change_me" \
  -H "Content-Type: application/json" \
  -d '{"position":2}'
```

### 6.6 Move between slots/targets

```bash
curl -X PATCH http://localhost:4000/v1/placements/P-XXXXXX \
  -H "Authorization: Bearer change_me" \
  -H "Content-Type: application/json" \
  -d '{"targetType":"event","targetKey":"valentine-2026","slot":"hero"}'
```

## 7. Vercel integration checklist

- Vercel envs:
  - `CONTENT_API_BASE_URL=https://served-dsl-wear-sporting.trycloudflare.com`
  - `NEXT_PUBLIC_CONTENT_API_BASE_URL=https://served-dsl-wear-sporting.trycloudflare.com`
- Local `.env` should include:
  - `WEB_ORIGIN=https://glimmer-bistro-v2.vercel.app`
  - `PUBLIC_BASE_URL=https://served-dsl-wear-sporting.trycloudflare.com`
- Keep cloudflared process alive while using tunnel URL.

## 8. Event page behavior

- Gallery appears at the **end of the event page** (after menu courses).
- Event upload panel is on `/events/valentine` and posts to `/v1/upload`.
- Panel requires manual admin token entry.

## 9. Troubleshooting

- If API content returns image URLs on `localhost`, set `PUBLIC_BASE_URL` to tunnel URL and restart compose.
- If Vercel page shows old content, redeploy and wait for ISR revalidation window.
- If upload fails `401`, token is wrong.
