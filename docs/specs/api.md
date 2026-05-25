# API

The API is exposed through TanStack Start server routes. Machine-readable OpenAPI is available at `/openapi.json`; the rendered guide is available at `/docs/api`.

## Public Routes

- `GET /rss.xml`
- `GET /feed.xml`
- `GET /sitemap.xml`
- `GET /sitemap-posts.xml`
- `GET /sitemap-pages.xml`
- `GET /robots.txt`
- `GET /openapi.json`
- `GET /docs/api`

Feeds and public metadata use current D1 site settings and localized content where requested. `/rss.xml` returns 404 when RSS is disabled in site settings.

## Content And Automation Routes

- `GET /api/posts`
- `POST /api/posts`
- `POST /api/posts/batch`
- `GET /api/posts/:id`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- `GET /api/pages`
- `POST /api/pages`
- `GET /api/pages/:id`
- `PATCH /api/pages/:id`
- `DELETE /api/pages/:id`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/import/markdown`
- `POST /api/import/html`
- `POST /api/import/zip`
- `GET /api/assets`
- `POST /api/assets`
- `DELETE /api/assets/:id`
- `GET /api/site`
- `PUT /api/site`
- `GET /api/export`
- `POST /api/backups`
- `GET /api/comments`
- `POST /api/comments`
- `POST /api/comments/:id/approve`
- `POST /api/comments/:id/spam`
- `POST /api/comments/:id/delete`
- `GET /api/tokens`
- `POST /api/tokens`
- `POST /api/tokens/:id/revoke`
- `POST /api/admin/users`
- `PATCH /api/admin/password`
- `POST /api/admin/password-reset`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/me`

`GET /api/posts` accepts `q`, `tag`, `status=all`, and `lang=en|zh`. `status=all` requires `posts:read`. Public post lists return only published posts.

`GET /api/site` returns localized site settings when `lang=en|zh` or `Accept-Language` is provided. `PUT /api/site` accepts `themePreset=claude|apple|editorial` along with title, URL, description, author, language, RSS, comments, and indexing settings.

`POST /api/posts` accepts bilingual `i18n` fields for title, excerpt, Markdown, rendered HTML, text, SEO title, and SEO description. When `locale` is `zh`, the primary input is also stored into Chinese localized fields. Creating or updating a `published` post requires both `posts:write` and `posts:publish`.

`POST /api/posts/batch` accepts selected post ids and `action=publish|draft|archive|delete`. Publishing requires `posts:publish`; the other actions require `posts:write`.

`GET /api/pages` and `GET /api/projects` accept `status=all` and `lang=en|zh`, and require `site:read`. Create, update, and delete operations require `site:write`. Pages store Markdown, sanitized HTML, SEO fields, status, and localized fields. Projects store title, excerpt, links, cover image, screenshots, tags, Markdown body, sanitized HTML, status, and localized fields.

`POST /api/import/markdown` accepts `filename`, `contentMarkdown`, optional post fields, and simple frontmatter. It derives title, slug, excerpt, tags, SEO fields, cover image, and status, then creates a D1 post.

`POST /api/import/html` accepts `filename`, `contentHtml`, and optional post fields. HTML is sanitized before persistence, and the importer extracts `<title>`, first `<h1>`, meta description, and first image where available.

`POST /api/import/zip` accepts either `contentBase64` for a ZIP archive or a CLI `files` manifest. The importer selects Markdown first, then HTML, then image-gallery fallback; image entries are uploaded to R2 and local Markdown/HTML image references are rewritten to uploaded asset URLs.

`POST /api/assets` accepts multipart uploads from the admin UI and JSON/base64 uploads from CLI automation. `DELETE /api/assets/:id` removes the D1 record and deletes the matching R2 object when present.

`GET /api/comments` returns the moderation queue and requires `comments:moderate`. `POST /api/comments` is public, accepts optional `parentId` for replies, applies honeypot, Turnstile when configured, per-IP rate limits, body length limits, link limits, and creates comments as `pending`.

`GET /api/export` returns JSON data and writes a backup JSON object to R2. `GET /api/export?format=zip` returns a ZIP archive with Markdown posts, HTML posts, Markdown/HTML pages, Markdown/HTML projects, JSON manifests, comments, settings, tags, and bundled R2 assets; the ZIP is also written to the backups bucket.

`POST /api/backups` creates a ZIP export backup in R2 and applies the configured backup retention policy. It uses the same `export:read` scope as export.

`POST /api/admin/password-reset` requests an optional Email Sending reset link when `email` is provided, or confirms a reset when `token` and `password` are provided. Direct token-authenticated `PATCH /api/admin/password` remains available when Email Sending is disabled.

## Token Scopes

- `posts:read`
- `posts:write`
- `posts:publish`
- `assets:write`
- `comments:moderate`
- `site:read`
- `site:write`
- `export:read`
