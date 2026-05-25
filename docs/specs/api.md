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
- `GET /api/posts/:id`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/import/markdown`
- `POST /api/import/html`
- `POST /api/import/zip`
- `GET /api/assets`
- `POST /api/assets`
- `GET /api/site`
- `PUT /api/site`
- `GET /api/export`
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
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/me`

`GET /api/posts` accepts `q`, `tag`, `status=all`, and `lang=en|zh`. `status=all` requires `posts:read`. Public post lists return only published posts.

`POST /api/posts` accepts bilingual `i18n` fields for title, excerpt, Markdown, rendered HTML, text, SEO title, and SEO description. When `locale` is `zh`, the primary input is also stored into Chinese localized fields. Creating or updating a `published` post requires both `posts:write` and `posts:publish`.

`GET /api/comments` returns the moderation queue and requires `comments:moderate`. `POST /api/comments` is public, accepts optional `parentId` for replies, applies honeypot, Turnstile when configured, per-IP rate limits, body length limits, link limits, and creates comments as `pending`.

`GET /api/export` returns JSON data and writes a backup JSON object to R2.

## Token Scopes

- `posts:read`
- `posts:write`
- `posts:publish`
- `assets:write`
- `comments:moderate`
- `site:read`
- `site:write`
- `export:read`
