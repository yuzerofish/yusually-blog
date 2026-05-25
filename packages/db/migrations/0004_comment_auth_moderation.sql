CREATE TABLE IF NOT EXISTS comment_users (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  avatar_url TEXT,
  provider TEXT NOT NULL DEFAULT 'email' CHECK (provider IN ('email', 'github')),
  provider_account_id TEXT,
  password_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_login_at TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS comment_users_email_idx ON comment_users (email);
CREATE UNIQUE INDEX IF NOT EXISTS comment_users_provider_idx ON comment_users (provider, provider_account_id);

CREATE TABLE IF NOT EXISTS comment_sessions (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES comment_users (id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS comment_sessions_token_hash_idx ON comment_sessions (token_hash);
CREATE INDEX IF NOT EXISTS comment_sessions_user_idx ON comment_sessions (user_id);
CREATE INDEX IF NOT EXISTS comment_sessions_expires_idx ON comment_sessions (expires_at);

ALTER TABLE comments ADD COLUMN author_user_id TEXT REFERENCES comment_users (id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS comments_author_user_idx ON comments (author_user_id);
