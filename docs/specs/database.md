# Database

The canonical Cloud Blog CMS schema is in `packages/db/src/schema/cms.sqlite.ts`. The first D1 migration is `packages/db/migrations/0001_cloud_blog_cms.sql`.

## Core Tables

- `site_settings`: JSON site configuration.
- `posts`: Markdown-first articles with rendered HTML and search text cache.
- `pages`: editable static pages such as About.
- `tags` and `post_tags`: public taxonomy.
- `projects`: portfolio entries.
- `assets`: R2 object metadata and optional post association.
- `comments`: self-hosted moderation queue.
- `api_tokens`: hashed automation tokens with scoped permissions.

## Content Fields

Posts keep three content forms:

- `content_markdown`: portable source content.
- `content_html`: rendered and sanitized output cache.
- `content_text`: plain text for simple D1 search.

Localized content is stored in JSON `i18n` columns on `posts`, `tags`, `projects`, and `comments`. Site-level bilingual settings live inside the `site_settings.value` JSON payload.

## Migration Command

After creating the D1 database in Cloudflare:

```sh
cd apps/web
wrangler d1 migrations apply blog-starter-cms --remote
```
