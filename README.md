# Glimmer Bistro v2 (MVP In Progress)

This workspace now contains two parts:

- `web`: Next.js frontend (`/` and event/recipe pages read dynamic image placements)
- `backend`: Express + Postgres content API for image upload, placement, and publishing controls

Operator docs:

- `OPENCLAW_README.md`: upload/retract/move/reorder runbook
- `AGENTS.md`: development context and quick-start for future coding sessions

## Architecture (current)

- Frontend: Next.js app (port `3000`)
- Content API: Express app (port `4000`)
- Database: Postgres (port `5432`)
- Storage: Cloudflare R2 (recommended) or local `/uploads` fallback during local testing

## Quick Start

1. Copy env values:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

2. Start stack with Docker Compose:

```bash
docker compose -f compose.yml up --build
```

3. Open:

- Site: `http://localhost:3000`
- API health: `http://localhost:4000/health`

## MVP API Endpoints

- `POST /v1/upload` (admin token required)
  - multipart fields: `image`, `targetType`, `targetKey`, `slot`
  - optional: `position`, `status(draft|published)`, `caption`, `alt`, `captionOverride`, `altOverride`
- `GET /v1/content?targetType=event&targetKey=valentine-2026`
  - returns published content grouped by slot
- `PATCH /v1/placements/:shortCode` (admin token required)
  - update status, move target, reorder position, override caption/alt

## Example Upload

```bash
curl -X POST http://localhost:4000/v1/upload \
  -H "Authorization: Bearer change_me" \
  -F "image=@/absolute/path/photo.jpg" \
  -F "targetType=event" \
  -F "targetKey=valentine-2026" \
  -F "slot=gallery" \
  -F "position=3"
```

## Frontend Mapping

- Home (`targetType=home`, `targetKey=home`): supports `hero`, `gallery`
- Event page (`/events/valentine`, key `valentine-2026`): supports `hero`, `gallery`
- Recipe demo (`/recipes/[slug]`, key=`slug`): supports `cover`, `gallery`

Placement short codes are attached as invisible DOM attributes, for example:

- `data-placement-id="P-9K2M1A"`

## Notes

- `glimmer-bistro-requirements.md` asks for R2 + local backend + publish control. This baseline implements those MVP endpoints and models.
- R2 is optional for local development; set R2 env vars to switch from local file storage to object storage.
