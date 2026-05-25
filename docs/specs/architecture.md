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
- R2 stores uploaded assets, import packages, exports, and backup JSON files.
- KV is available as the `CMS_CACHE` binding for cache metadata.
- Turnstile and Cloudflare Email Sending are optional. Empty Turnstile and Email bindings do not block login, publishing, comment moderation, or exports.

## Internationalization

- Paraglide.js is the only UI translation runtime. Source messages live in `apps/web/messages/en.json` and `apps/web/messages/zh.json`; compiled files live in `apps/web/src/paraglide`.
- English and Chinese are always enabled.
- `primaryLanguage` is selected during initialization and stored in D1 site settings.
- `themePreset` is stored in site settings and drives the public site, admin UI, and auth screens through shared CSS tokens. Supported presets are `claude`, `apple`, and `editorial`.
- Public product copy includes English and Chinese on the home page.
- Content records preserve bilingual fields through `i18n` JSON for posts, tags, projects, comments, site name, site description, author bio, and SEO fields.

## Public And Admin Surfaces

- Public routes: home, blog list, post detail, tags, archive, projects, about, RSS, feed, sitemap, robots, API docs, and OpenAPI JSON.
- Admin routes: overview, posts, assets, comments, settings, and scoped API tokens.
- Admin auth uses D1-backed email/password users and D1 sessions.
- Automation tokens are stored hashed in D1 and checked by scope.

## Automation Flow

The Skill and CLI use the same HTTP API as the admin UI. A generated site can be initialized by provisioning Cloudflare resources, applying D1 migrations, creating the first admin, logging in to mint a scoped token, writing site settings, publishing the first bilingual post, uploading assets, submitting and approving a comment, and exporting a backup.
