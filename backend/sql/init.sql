CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  storage_url TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  caption TEXT,
  alt TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS placements (
  id UUID PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL,
  target_key TEXT NOT NULL,
  slot TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published',
  caption_override TEXT,
  alt_override TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT placements_target_type_chk CHECK (target_type IN ('home', 'event', 'recipe')),
  CONSTRAINT placements_status_chk CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX IF NOT EXISTS placements_lookup_idx
  ON placements (target_type, target_key, slot, status, position, created_at);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS media_set_updated_at ON media;
CREATE TRIGGER media_set_updated_at
BEFORE UPDATE ON media
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS placements_set_updated_at ON placements;
CREATE TRIGGER placements_set_updated_at
BEFORE UPDATE ON placements
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
