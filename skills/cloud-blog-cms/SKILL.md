---
name: cloud-blog-cms
description: Initialize, configure, deploy, and verify a new Cloud Blog CMS site on Cloudflare Workers, D1, and R2.
---

# Cloud Blog CMS Skill

Use this Skill when creating a new personal blog from the `01mvp/blog-starter` template or when validating that a generated site matches the template contract.

## Inputs To Collect

Ask for missing values only when they are not already provided:

- Project name
- Blog name
- Blog description
- Author name
- Author email
- Domain, or workers.dev fallback
- Theme style
- Comments enabled
- Email Sending enabled
- GitHub Actions enabled

## Automation Order

1. Check local prerequisites with `scripts/check-prereqs.sh`.
2. Create or clone the project from the template.
3. Write site config from `templates/site.config.json`.
4. Check Cloudflare login with Wrangler.
5. Create D1, R2 assets, R2 backups, and optional KV resources.
6. Write `apps/web/wrangler.jsonc` bindings.
7. Apply D1 migrations from `packages/db/migrations`.
8. Create the first admin user.
9. Deploy the Worker.
10. Create the first example post.
11. Verify public page, admin login, RSS, sitemap, robots, and OG metadata.
12. Save an execution log for the generated site.

## User Intervention Points

Ask the user to act only for Cloudflare login, account registration, paid-plan confirmation, API token creation, DNS confirmation, domain verification, and email verification.

## Verification

The generated demo target is `blog-demo.01mvp.com`. The Skill run must show that the site came from this workflow rather than manual setup.
