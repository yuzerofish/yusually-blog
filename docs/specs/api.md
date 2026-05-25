# API

Phase 2 will expose the full OpenAPI contract at `/openapi.json` and a rendered API guide at `/docs/api`.

## Initial Routes

- `GET /rss.xml`
- `GET /feed.xml`
- `GET /sitemap.xml`
- `GET /robots.txt`
- `GET /openapi.json`

Feed output uses the site's selected primary language. Content APIs should accept and return bilingual fields for `en` and `zh`.

## Planned Mutations

- `POST /api/posts`
- `PATCH /api/posts/:id`
- `POST /api/import/markdown`
- `POST /api/import/html`
- `POST /api/import/zip`
- `POST /api/assets`
- `GET /api/export`
- `POST /api/comments/:id/approve`
- `POST /api/comments/:id/spam`
- `POST /api/comments/:id/delete`

## Token Scopes

`posts:read`, `posts:write`, `posts:publish`, `assets:write`, `comments:moderate`, `site:read`, `site:write`, and `export:read`.
