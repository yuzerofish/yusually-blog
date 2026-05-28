---
name: cloud-blog-cms
description: Initialize, configure, deploy, and verify a new 01mvp-blog-starter site on Cloudflare Workers, D1, R2, and KV.
---

# 01mvp-blog-starter Skill

Use this Skill when creating a new personal blog from the 01mvp-blog-starter template or when validating that a generated site matches the template contract.

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

## Automation Order

1. Check local prerequisites with `scripts/check-prereqs.sh`.
2. Create or clone the project from the template.
3. Write site config from `templates/site.config.json`.
4. Keep `locales: ["en", "zh"]`, `primaryLanguage`, and `i18nRuntime: "paraglide-js"` in generator config. Site settings use `i18n` for localized text fields.
5. Check Cloudflare login with Wrangler.
6. Create D1, one R2 storage bucket, optional KV resources, and optional Email Sending resources.
7. Write `apps/web/wrangler.jsonc` bindings.
8. Run `blogcms deploy --target main`. This applies D1 migrations and deploys the Worker with the generated Cloudflare Vite config.
9. Verify that the Worker version and custom domain route match the selected target.
10. Create the first admin user with `blogcms admin create`.
11. Log in with `blogcms login` and store the generated API token securely outside the repository.
12. Push settings with `blogcms site update --config /absolute/path/to/site.config.json`.
13. Publish the first bilingual post with `blogcms push /absolute/path/to/first-post.json`.
14. Upload a media asset with `blogcms upload`.
15. Submit a public comment and approve it through the API.
16. If Email Sending is enabled, request a password reset email.
17. Export the site with `blogcms export` and create a ZIP backup with `blogcms backup`.
18. Verify public page, post page, admin login, RSS, sitemap, robots, OpenAPI, OG metadata, localized post API response, R2 asset, JSON export, and ZIP backup.
19. Save an execution log for the generated site.

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
