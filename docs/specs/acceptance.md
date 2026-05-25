# Acceptance

This document records the current evidence for the PRD acceptance scope. Dates are UTC unless the command output states otherwise.

## Template Site

- `https://cms.01mvp.com` returned HTTP 200.
- `https://blog-starter.01mvp.com` returned HTTP 200.
- Latest verified template Worker version: `62f7be28-c5b6-4f11-baef-b8bd04d4fc7a`.
- `/rss.xml` on `cms.01mvp.com` returned XML with canonical `https://cms.01mvp.com` links.
- Main Cloudflare resources are bound in `apps/web/wrangler.jsonc`.
- D1 migrations `0001_cloud_blog_cms.sql` and `0002_admin_auth.sql` were applied remotely.
- Email Sending is disabled and the core login, publishing, comments, moderation, and export paths do not depend on it.

## Skill Demo Site

- `https://demo.01mvp.com` returned HTTP 200.
- `https://blog-demo.01mvp.com` returned HTTP 200.
- Latest verified demo Worker version: `44d442a6-e851-46f0-8aea-c007755f5005`.
- Site settings were written through `blogcms site update` from `skills/cloud-blog-cms/templates/site.config.json`.
- First bilingual post URL: `https://demo.01mvp.com/blog/hello-from-generated-cloud-blog-cms`.
- `GET /api/posts?status=all` with `Accept-Language: zh` returned the Chinese title, excerpt, body, and SEO fields.
- `POST /api/comments` created a `pending` comment.
- `POST /api/comments/:id/approve` changed the comment to `approved`.
- The approved comment rendered on the public post page.
- `blogcms upload` created an R2-backed asset URL under `/uploads/2026/05/...`.
- `blogcms push` accepted a JSON bilingual post payload, and `DELETE /api/posts/:id` returned `deleted` for the temporary verification post.
- `blogcms export` returned posts, comments, assets, and wrote a backup object to R2.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` returned expected public responses.
- The post page rendered Open Graph title, description, image, and article publish metadata.
- Browser plugin verification could not run in the in-app browser because the Browser plugin returned `Browser is not available: iab`; HTTP, API, and rendered HTML checks were used instead.

## Local Verification

- `pnpm --filter @repo/web exec tsc --noEmit` passed after connecting admin post/comment pages to D1 APIs.
- `pnpm lint` passed with 0 warnings and 0 errors.
- `pnpm build:web` and `pnpm build:web:demo` completed before the final Worker deploys.
- `git diff --check` passed.
