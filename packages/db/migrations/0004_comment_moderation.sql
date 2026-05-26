ALTER TABLE comments ADD COLUMN author_user_id TEXT REFERENCES "user" (id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS comments_author_user_idx ON comments (author_user_id);
