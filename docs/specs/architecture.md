# Architecture

Cloud Blog CMS is a TanStack Start monorepo built for Cloudflare Workers. The repository ships both the reusable CMS template and the `cloud-blog-cms` AI initialization Skill.

## Runtime

- `apps/web`: TanStack Start app deployed to Cloudflare Workers.
- `apps/cli`: `blogcms` command surface for remote publishing, import/export, admin, and Skill automation.
- `packages/core`: domain types, seed content, Markdown helpers, i18n-aware content helpers, and pure demo stores.
- `packages/db`: Drizzle schema plus D1 SQL migrations.
- `packages/ui`: shared shadcn/Base UI primitives and theme tokens.
- `skills/cloud-blog-cms`: agent workflow, templates, checklists, and first-run examples.

## Cloudflare Boundary

- Workers run the public site, admin UI, API routes, feeds, sitemap, and robots output.
- D1 stores posts, comments, site settings, admin users, admin sessions, API tokens, pages, projects, tags, and asset metadata.
- R2 stores uploaded assets, import packages, JSON exports, and full ZIP backups.
- KV is available as the `CMS_CACHE` binding for cache metadata.
- Cron Triggers call the custom Worker entry once per day to generate a ZIP backup and prune old backup objects.
- Turnstile and Cloudflare Email Sending are optional. Empty Turnstile and Email bindings do not block login, publishing, comment moderation, imports, exports, or backups.

## Internationalization

- Paraglide.js is the only UI translation runtime. Source messages live in `apps/web/messages/en.json` and `apps/web/messages/zh.json`; compiled files live in `apps/web/src/paraglide`.
- English and Chinese are always enabled.
- `primaryLanguage` is selected during initialization and stored in D1 site settings.
- `themePreset` is stored in site settings and drives the public site, admin UI, and auth screens through shared CSS tokens. Supported presets are `claude`, `apple`, and `editorial`.
- Public product copy includes English and Chinese on the home page.
- Content records preserve bilingual fields through `i18n` JSON for posts, pages, tags, projects, comments, site name, site description, author bio, and SEO fields.

## Public And Admin Surfaces

- Public routes: home, blog list, post detail, tags, archive, projects, about, RSS, feed, sitemap, robots, API docs, and OpenAPI JSON.
- Admin routes: overview, posts, pages, projects, assets, comments, settings, and scoped API tokens.
- Admin auth uses D1-backed email/password users and D1 sessions.
- Automation tokens are stored hashed in D1 and checked by scope.

## Automation Flow

The Skill and CLI use the same HTTP API as the admin UI. A generated site can be initialized by provisioning Cloudflare resources, applying D1 migrations, creating the first admin, logging in to mint a scoped token, writing site settings, publishing the first bilingual post, updating static pages and projects, uploading assets, submitting and approving a comment, and exporting a backup.

## Import Flow

Markdown imports parse simple frontmatter and preserve Markdown as the source of truth. HTML imports sanitize markup before persistence. ZIP and folder imports select Markdown first, then HTML, and fall back to an image gallery; image files are uploaded to R2 and local image references are rewritten to public asset URLs.

## Export And Backup Flow

JSON export remains the lightweight API response for automation. ZIP export packages Markdown, HTML, site settings, posts, pages, comments, assets, tags, projects, and a manifest under `export/`, stores the archive in R2, and rewrites known local asset URLs to relative paths inside the archive. Manual backups use `POST /api/backups`; scheduled backups use the same ZIP builder from the Worker `scheduled` handler.

## Email Flow

Email Sending is a no-op unless `CMS_EMAIL_SENDING_ENABLED=true`, `CMS_EMAIL_FROM`, `CMS_EMAIL_TO`, and a `CMS_EMAIL` send-email binding are configured. When enabled, the same optional mailer sends comment moderation notices, import/export completion notices, backup completion notices, and password reset links. Password reset tokens are stored in KV with a short TTL.
