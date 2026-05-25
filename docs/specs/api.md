# API

Phase 2 will expose the full OpenAPI contract at `/openapi.json` and a rendered API guide at `/docs/api`.

## Initial Routes

- `GET /rss.xml`
- `GET /feed.xml`
- `GET /sitemap.xml`
- `GET /robots.txt`
- `GET /openapi.json`
- `GET /docs/api`

Feed output uses the site's selected primary language. Content APIs should accept and return bilingual fields for `en` and `zh`.

## API Routes

- `GET /api/posts`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `GET /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/import/markdown`
- `POST /api/import/html`
- `POST /api/import/zip`
- `GET /api/assets`
- `POST /api/assets`
- `GET /api/export`
- `POST /api/comments`
- `POST /api/comments/:id/approve`
- `POST /api/comments/:id/spam`
- `POST /api/comments/:id/delete`

## Token Scopes

`posts:read`, `posts:write`, `posts:publish`, `assets:write`, `comments:moderate`, `site:read`, `site:write`, and `export:read`.
