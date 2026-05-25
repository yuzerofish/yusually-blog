# Skill

The `cloud-blog-cms` Skill lives at `skills/cloud-blog-cms/SKILL.md`.

Its job is to let an AI agent initialize a new blog from this template, configure Cloudflare resources, deploy the Worker, create the first admin, publish a bilingual first post, upload media, verify comments and feeds, and record an execution log.

## Required Inputs

The Skill collects:

- Project name
- Blog name and description
- Author name and email
- Primary language: `en` or `zh`
- Domain, or workers.dev fallback
- Theme preset: `claude`, `apple`, or `editorial`
- Comments preference
- Email Sending preference
- GitHub Actions preference

English and Chinese remain enabled regardless of the primary language.
The theme preset is written to site settings and applied through shared UI tokens.

## Automation Order

1. Check local prerequisites with `scripts/check-prereqs.sh`.
2. Create or clone the project.
3. Write site config from `templates/site.config.json`.
4. Verify Cloudflare login.
5. Create D1, R2 assets, R2 backups, optional KV resources, and optional Email Sending resources.
6. Write Wrangler bindings.
7. Run `blogcms deploy --target main` or `blogcms deploy --target demo`, depending on the generated site target. This applies D1 migrations and deploys the Worker with the generated Cloudflare Vite config.
8. Create the first admin user.
9. Log in and create a scoped API token.
10. Push site settings through `blogcms site update`.
11. Publish the first bilingual post through `blogcms push`.
12. Upload a media asset through `blogcms upload`.
13. Submit and approve a comment.
14. If Email Sending is enabled, request a password reset email.
15. Export JSON through `blogcms export` and create a ZIP backup through `blogcms backup`.
16. Verify homepage, post page, admin, RSS, sitemap, robots, OpenAPI, OG metadata, localized API responses, JSON export, and ZIP backup.
17. Save an execution log.

## Demo Evidence

The Skill-generated demo uses:

- Site: `https://demo.01mvp.com`
- Alias: `https://blog-demo.01mvp.com`
- Worker: `blog-demo`
- Current verified demo version: `dda4a2a8-d554-47d8-bcb3-ef942c2484fc`

The demo run created site settings from `skills/cloud-blog-cms/templates/site.config.json`, published `hello-from-generated-cloud-blog-cms`, uploaded an R2 asset, submitted a pending comment, approved it, generated an R2 export backup, verified scheduled post visibility on the public API, verified comment reply depth, and verified project detail pages in the sitemap.

## User Intervention Points

Ask the user to act only for Cloudflare login, account registration, paid-plan confirmation, API token creation, DNS confirmation, domain verification, and email verification.
