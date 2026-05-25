# Acceptance

This document records the current evidence for the PRD acceptance scope. Dates are UTC unless the command output states otherwise.

## Template Site

- `https://cms.01mvp.com` returned HTTP 200.
- `https://blog-starter.01mvp.com` returned HTTP 200.
- Latest verified template Worker version: `9a96a391-3adf-4bd1-83e4-f29760ebc050`.
- The template homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.
- `/rss.xml` on `cms.01mvp.com` returned XML with canonical `https://cms.01mvp.com` links.
- Main Cloudflare resources are bound in `apps/web/wrangler.jsonc`.
- D1 migrations `0001_cloud_blog_cms.sql` and `0002_admin_auth.sql` were applied remotely.
- Email Sending is disabled and the core login, publishing, comments, moderation, and export paths do not depend on it.

## Skill Demo Site

- `https://demo.01mvp.com` returned HTTP 200.
- `https://blog-demo.01mvp.com` returned HTTP 200.
- Latest verified demo Worker version: `3deef93b-8fb1-4513-b664-9855166f19da`.
- Site settings were written through `blogcms site update` from `skills/cloud-blog-cms/templates/site.config.json` and now include `themePreset: "claude"`.
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
- The demo homepage rendered `data-theme-preset="claude"` after the minimalist theme preset rollout.

## Local Verification

- `pnpm --filter @repo/web exec tsc --noEmit` passed after connecting admin post/comment pages to D1 APIs.
- `pnpm lint` passed with 0 warnings and 0 errors.
- `pnpm build:web` and `pnpm build:web:demo` completed before the final Worker deploys.
- `git diff --check` passed.
- Headless Playwright rendered `cms.01mvp.com` and `demo.01mvp.com` at 1440px and 390px widths with no console errors and no horizontal overflow.
