# Architecture

Cloud Blog CMS is a TanStack Start monorepo built for Cloudflare Workers. The template separates public publishing, admin CMS workflows, database schema, reusable UI, and the AI initialization Skill.

## Runtime

- `apps/web`: TanStack Start app deployed to Cloudflare Workers.
- `packages/core`: shared domain types, sample content, and pure helpers.
- `packages/db`: Drizzle schema and D1 SQL migrations.
- `packages/ui`: shared shadcn/Base UI primitives and theme tokens.
- `apps/cli`: `blogcms` command surface for API and deployment automation.
- `skills/cloud-blog-cms`: agent workflow for creating a new site from the template.

## Internationalization

- The web app uses Paraglide.js compiled i18n. Translation sources live in `apps/web/messages/en.json` and `apps/web/messages/zh.json`; generated runtime files live in `apps/web/src/paraglide`.
- English and Chinese are always available. Site initialization chooses `primaryLanguage: "en"` or `primaryLanguage: "zh"`.
- Public product introduction copy includes both English and Chinese.
- Blog-facing content types keep bilingual fields for site settings, tags, posts, projects, comments, and admin dashboard metrics.
- Do not introduce i18next or next-intl; Paraglide remains the translation runtime.

## Storage

- D1 stores posts, pages, projects, comments, settings, assets metadata, and API tokens.
- R2 stores images, attachments, imported ZIP files, HTML packages, and backups.
- KV is optional for rendered page/cache metadata.
- Email Sending is optional and must not block the free core publishing flow.

## Phase 1 Boundary

The current implementation creates the reusable project shape, D1 schema, Workers bindings, public blog views, protected admin UI shell, RSS, sitemap, robots, bilingual Paraglide runtime, and Skill skeleton. The remaining hardening work is D1-backed mutations, full MDXEditor integration, and Better Auth migration from the starter's Postgres default to a Cloudflare-native D1 adapter.
