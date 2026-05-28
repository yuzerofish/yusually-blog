---
name: 01mvp-blog
description: Create and maintain a 01mvp-blog-starter site. Use Cloudflare skills for provisioning/deploy work, then use the site's OpenAPI contract and scoped API tokens for blog maintenance.
---

# 01mvp-blog Skill

Use this Skill when creating a new personal blog from the 01mvp-blog-starter template, validating that a generated site matches the template contract, or maintaining an existing site through its OpenAPI API.

## Dependency Skills

For Cloudflare account, resource, DNS, and deployment work, recommend that the user install and use the relevant Cloudflare skills in their agent environment. Prefer the comprehensive Cloudflare skill plus the Wrangler and Workers best-practices skills, commonly exposed as `cloudflare:cloudflare`, `cloudflare:wrangler`, and `cloudflare:workers-best-practices`. This Skill owns the blog-specific workflow, expected outputs, OpenAPI usage, and verification contract; do not duplicate Cloudflare platform setup instructions here.

## Inputs To Collect

Ask for missing values only when they are not already provided:

- Project name
- Blog name
- Blog description
- Author name
- Author email
- Primary language: `en` or `zh`
- Domain
- Theme preset: `maker`, `apple`, or `editorial`
- Layout preset: `shelf`, `developer`, or `journal`
- Comments enabled
- Email Sending enabled
- GitHub Actions enabled

For maintenance-only tasks, collect only:

- Site URL
- Scoped API token, or confirmation that the user will create one in the admin settings
- The requested operation: publish, update, import, upload, moderate comments, export, backup, or update settings
- Local content paths or payload details when needed

## Create Blog Workflow

1. Check local prerequisites with `scripts/check-prereqs.sh`.
2. Create or clone the project from the template.
3. Write site config from `templates/site.config.json`.
4. Keep `locales: ["en", "zh"]`, `primaryLanguage`, and `i18nRuntime: "paraglide-js"` in generator config. Site settings use `i18n` for localized text fields.
5. Use the user's Cloudflare skills for account authentication, resource provisioning, DNS, bindings, and deployment.
6. Verify that the deployed Worker and custom domain route match the selected target.
7. Create the first admin user through the deployed API or admin UI.
8. Create a scoped API token from the admin settings, or create it through `POST /api/tokens` when an authenticated admin session is available.
9. Store the API token securely outside the repository.
10. Push settings through `PUT /api/site`.
11. Publish the first bilingual post through `POST /api/posts`.
12. Upload a media asset through `POST /api/assets`.
13. Submit a public comment and approve it through `POST /api/comments/:id/approve`.
14. If Email Sending is enabled, request a password reset email.
15. Export the site through `GET /api/export` and create a ZIP backup through `POST /api/backups`.
16. Verify public page, post page, admin login, RSS, sitemap, robots, OpenAPI, OG metadata, localized post API response, R2 asset, JSON export, and ZIP backup.
17. Save an execution log for the generated site.

## Maintain Blog Workflow

1. Fetch `${siteUrl}/openapi.json` and use it as the source of truth for endpoints, request bodies, and scopes.
2. Use the scoped API token in the `Authorization: Bearer <token>` header.
3. Prefer the smallest scope set for the task:
   - Read or update posts: `posts:read`, `posts:write`
   - Publish or schedule posts: add `posts:publish`
   - Upload assets: `assets:write`
   - Moderate comments: `comments:moderate`
   - Read or update site settings: `site:read`, `site:write`
   - Export or create backups: `export:read`
4. For missing tokens, guide the user to create one in the admin settings under API tokens. If an authenticated admin session is available, `POST /api/tokens` may create the token.
5. Use these OpenAPI paths for common work:
   - `GET /api/posts`, `POST /api/posts`, `PATCH /api/posts/:id`, `DELETE /api/posts/:id`
   - `POST /api/import/markdown`, `POST /api/import/html`, `POST /api/import/zip`
   - `GET /api/assets`, `POST /api/assets`, `DELETE /api/assets/:id`
   - `GET /api/comments`, `POST /api/comments/:id/approve`, `POST /api/comments/:id/spam`, `POST /api/comments/:id/delete`
   - `GET /api/site`, `PUT /api/site`
   - `GET /api/export`, `POST /api/backups`
6. Return the changed resource URLs, ids, status, and any follow-up manual steps.

## I18n Contract

- Use Paraglide.js compiled messages from `apps/web/messages/{locale}.json`; do not replace it with i18next or next-intl.
- The generated site must support `en` and `zh` by default.
- The selected primary language controls initial site settings, feed copy, demo post defaults, and admin settings.
- The selected theme preset is saved as `themePreset` in site settings and applied through shared UI tokens.
- The selected layout preset is saved as `layoutPreset` in site settings and applied to the public home page. Use `maker` + `shelf` as the default combination.
- Public product introduction copy should include both English and Chinese.
- Blog content records should keep bilingual fields so switching language changes titles, excerpts, body HTML, tags, comments, and metrics.

## User Intervention Points

Ask the user to act only for Cloudflare login, account registration, paid-plan confirmation, API token creation, DNS confirmation, domain verification, and email verification.

## Canonical Target

This repository's production site uses:

```txt
blog.01mvp.com
```

The Skill run must show that the site came from this workflow rather than manual setup. Use `examples/execution-log.md` as the evidence format.
