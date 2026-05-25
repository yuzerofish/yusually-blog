# Database

The canonical Cloud Blog CMS schema is in `packages/db/src/schema/cms.sqlite.ts`. D1 migrations live in `packages/db/migrations`.

## Migrations

- `0001_cloud_blog_cms.sql`: site settings, posts, pages, tags, projects, assets, comments, API tokens, and content indexes.
- `0002_admin_auth.sql`: admin users and admin sessions.

## Core Tables

- `site_settings`: JSON site configuration. The current row key is `site`.
- `posts`: Markdown-first articles with rendered HTML and plain text search cache.
- `pages`: editable static pages such as About.
- `tags` and `post_tags`: public taxonomy.
- `projects`: portfolio entries.
- `assets`: R2 object metadata and optional post association.
- `comments`: self-hosted moderation queue.
- `api_tokens`: hashed automation tokens with scoped permissions and revocation.
- `admin_users`: D1-backed email/password admin users.
- `admin_sessions`: hashed session tokens for cookie login.

## Content Fields

Posts keep three content forms:

- `content_markdown`: portable source content.
- `content_html`: rendered and sanitized output cache.
- `content_text`: plain text for simple D1 search.

Localized content is stored in JSON `i18n` columns on `posts`, `tags`, `projects`, and `comments`. Site-level bilingual settings live inside `site_settings.value`.

## Security Notes

- Admin passwords are stored as salted PBKDF2 hashes.
- Admin sessions and API tokens are stored as SHA-256 hashes.
- API tokens expose the secret only once at creation.
- Comment author email addresses are hashed before storage.
