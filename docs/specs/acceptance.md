# Acceptance

This document records the current evidence for the PRD acceptance scope. Dates are UTC unless the command output states otherwise.

## Template Site

- `https://cms.01mvp.com` returned HTTP 200.
- `https://blog-starter.01mvp.com` returned HTTP 200.
- Latest verified template Worker version: `bd7113d3-4755-4c3c-82fb-c78e2531af58`.
- The template homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.
- `/rss.xml` on `cms.01mvp.com` returned XML with canonical `https://cms.01mvp.com` links.
- Main Cloudflare resources are bound in `apps/web/wrangler.jsonc`.
- D1 migrations `0001_cloud_blog_cms.sql`, `0002_admin_auth.sql`, and `0003_pages_projects_management.sql` were applied remotely.
- Email Sending is disabled by default and the core login, publishing, comments, moderation, import, export, backup, and password reset request paths do not depend on it.
- `/openapi.json` on `cms.01mvp.com` includes the Markdown, HTML, and ZIP import request schemas.
- `/openapi.json` on `cms.01mvp.com` includes `POST /api/posts/batch`.
- `/openapi.json` on `cms.01mvp.com` includes the page and project management endpoints.
- `/openapi.json` on `cms.01mvp.com` includes `publishedAt` on import payloads and documents scheduled publishing permissions.
- `/projects/cloud-blog-cms-template` and `/projects/cloud-blog-cms-skill` on `cms.01mvp.com` returned HTTP 200.
- `/sitemap.xml` on `cms.01mvp.com` includes project detail URLs and merged tag paths.
- Blog post pages render canonical, Open Graph, Twitter Card, and JSON-LD `BlogPosting` metadata.
- Project detail pages render canonical, Open Graph, and Twitter Card metadata.
- The Worker deploy published the daily backup Cron Trigger `0 3 * * *`.
- `blogcms deploy --target main` completed the build, remote D1 migration, and Wrangler deploy sequence.
- `/openapi.json` on `cms.01mvp.com` includes `GET /api/export?format=zip` and `POST /api/backups`.
- `/openapi.json` on `cms.01mvp.com` includes `POST /api/admin/password-reset` and the password reset request schema.
- `/openapi.json` on `cms.01mvp.com` includes `DELETE /api/assets/{id}`.
- Unauthenticated ZIP export and backup requests return HTTP 401 JSON responses.
- Unauthenticated post batch updates return HTTP 401 JSON with `requiredScope: "posts:write"`.
- Unauthenticated page and project management requests return HTTP 401 JSON with `requiredScope: "site:read"`.
- Unauthenticated asset deletion returns HTTP 401 JSON with `requiredScope: "assets:write"`.
- `POST /api/admin/password-reset` for an unknown email returns HTTP 202 JSON with `accepted: true`, `emailSent: false`, and a 30 minute reset TTL.
- Confirming an invalid password reset token returns HTTP 400 JSON.

## Skill Demo Site

- `https://demo.01mvp.com` returned HTTP 200.
- `https://blog-demo.01mvp.com` returned HTTP 200.
- Latest verified demo Worker version: `dda4a2a8-d554-47d8-bcb3-ef942c2484fc`.
- Site settings were written through `blogcms site update` from `skills/cloud-blog-cms/templates/site.config.json` and now include `themePreset: "claude"`.
- First bilingual post URL: `https://demo.01mvp.com/blog/hello-from-generated-cloud-blog-cms`.
- `GET /api/posts?status=all` with `Accept-Language: zh` returned the Chinese title, excerpt, body, and SEO fields.
- `POST /api/comments` created a `pending` comment.
- `POST /api/comments/:id/approve` changed the comment to `approved`.
- The approved comment rendered on the public post page.
- `blogcms upload` created an R2-backed asset URL under `/uploads/2026/05/...`.
- `blogcms push` accepted a JSON bilingual post payload, and `DELETE /api/posts/:id` returned `deleted` for the temporary verification post.
- `blogcms export` returned posts, comments, assets, and wrote a backup object to R2.
- `blogcms export --format zip` prepares a full ZIP archive download, and `blogcms backup` prepares an R2 ZIP backup.
- `blogcms import` prepares Markdown, HTML, ZIP, and folder uploads for the matching import endpoint.
- `/openapi.json` on `demo.01mvp.com` includes the ZIP import request schema with image rewrite documentation.
- `/openapi.json` on `demo.01mvp.com` includes the post batch endpoint.
- `/openapi.json` on `demo.01mvp.com` includes the page and project management endpoints.
- `/openapi.json` on `demo.01mvp.com` includes `publishedAt` on import payloads and documents scheduled publishing permissions.
- `/projects/cloud-blog-cms-template` and `/projects/cloud-blog-cms-skill` on `demo.01mvp.com` returned HTTP 200.
- `/sitemap.xml` on `demo.01mvp.com` includes project detail URLs and merged tag paths.
- `/openapi.json` on `demo.01mvp.com` includes the backup endpoint and `BackupResult` schema.
- `/openapi.json` on `demo.01mvp.com` includes the password reset endpoint and request schema.
- `/openapi.json` on `demo.01mvp.com` includes the asset deletion endpoint.
- `POST /api/admin/password-reset` for an unknown email returns HTTP 202 JSON with `accepted: true`, `emailSent: false`, and a 30 minute reset TTL.
- The Worker deploy published the daily backup Cron Trigger `0 3 * * *`.
- `blogcms deploy --target demo` completed the build, remote D1 migration, and Wrangler deploy sequence.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` returned expected public responses.
- The post page rendered canonical, Open Graph, Twitter Card, JSON-LD, and article publish metadata.
- Public comments allow a top-level comment and one reply level; replies to replies return HTTP 400.
- The demo homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.

## Local Verification

- `pnpm --filter @repo/web exec tsc --noEmit` passed after connecting admin post/comment pages to D1 APIs.
- `pnpm lint` passed with 0 warnings and 0 errors.
- `pnpm build:web` and `pnpm build:web:demo` completed before the final Worker deploys.
- `node apps/cli/bin/blogcms.mjs deploy --target main` and `node apps/cli/bin/blogcms.mjs deploy --target demo` completed successfully.
- Wrangler dry-run accepted the custom Worker entry, backup bindings, and Cron Trigger before deployment.
- `git diff --check` passed.
- Live smoke returned HTTP 200 for `/`, `/blog`, `/tags`, `/archive`, `/projects`, `/projects/cloud-blog-cms-template`, `/projects/cloud-blog-cms-skill`, `/about`, `/docs/api`, `/rss.xml`, `/feed.xml`, `/sitemap.xml`, `/sitemap-pages.xml`, `/sitemap-posts.xml`, `/robots.txt`, `/openapi.json`, and `/reset-password` on `cms.01mvp.com`, `blog-starter.01mvp.com`, `demo.01mvp.com`, and `blog-demo.01mvp.com`.
- Headless Playwright rendered project detail and blog post pages on `cms.01mvp.com` and `demo.01mvp.com` at 1440px and 390px widths with no console errors and no horizontal overflow.
- A temporary demo D1 scheduled-post check confirmed future scheduled posts stay hidden from the public API and past scheduled posts are publicly returned, then removed the test rows.
- A temporary demo comment-depth check confirmed top-level comments and one reply level return HTTP 201, while a reply to a reply returns HTTP 400, then removed the test rows.
- MDX editor image uploads now send multipart file data to `/api/assets`; the affected code path is covered by `pnpm lint` and `pnpm build:web`.
