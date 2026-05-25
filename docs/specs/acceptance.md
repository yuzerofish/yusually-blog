# Acceptance

This document records the current evidence for the PRD acceptance scope. Dates are UTC unless the command output states otherwise.

## Template Site

- `https://cms.01mvp.com` returned HTTP 200.
- `https://blog-starter.01mvp.com` returned HTTP 200.
- Latest verified template Worker version: `9f74e0ad-1cd6-4550-b28e-5a62edb8f4c9`.
- The template homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.
- `/rss.xml` on `cms.01mvp.com` returned XML with canonical `https://cms.01mvp.com` links.
- Main Cloudflare resources are bound in `apps/web/wrangler.jsonc`.
- D1 migrations `0001_cloud_blog_cms.sql` and `0002_admin_auth.sql` were applied remotely.
- Email Sending is disabled and the core login, publishing, comments, moderation, and export paths do not depend on it.
- `/openapi.json` on `cms.01mvp.com` includes the Markdown, HTML, and ZIP import request schemas.
- The Worker deploy published the daily backup Cron Trigger `0 3 * * *`.
- `/openapi.json` on `cms.01mvp.com` includes `GET /api/export?format=zip` and `POST /api/backups`.
- Unauthenticated ZIP export and backup requests return HTTP 401 JSON responses.

## Skill Demo Site

- `https://demo.01mvp.com` returned HTTP 200.
- `https://blog-demo.01mvp.com` returned HTTP 200.
- Latest verified demo Worker version: `cd7ace94-d515-4e70-b98c-b51fdd780e9a`.
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
- `/openapi.json` on `demo.01mvp.com` includes the backup endpoint and `BackupResult` schema.
- The Worker deploy published the daily backup Cron Trigger `0 3 * * *`.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` returned expected public responses.
- The post page rendered Open Graph title, description, image, and article publish metadata.
- The demo homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.

## Local Verification

- `pnpm --filter @repo/web exec tsc --noEmit` passed after connecting admin post/comment pages to D1 APIs.
- `pnpm lint` passed with 0 warnings and 0 errors.
- `pnpm build:web` and `pnpm build:web:demo` completed before the final Worker deploys.
- Wrangler dry-run accepted the custom Worker entry, backup bindings, and Cron Trigger before deployment.
- `git diff --check` passed.
- Live smoke returned HTTP 200 for `/`, `/blog`, `/tags`, `/archive`, `/projects`, `/about`, `/docs/api`, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, and `/openapi.json` on `cms.01mvp.com`, `blog-starter.01mvp.com`, `demo.01mvp.com`, and `blog-demo.01mvp.com`.
- Headless Playwright rendered `cms.01mvp.com` and `demo.01mvp.com` at 1440px and 390px widths with no console errors and no horizontal overflow.
