---
title: Deployment
description: Deploy the blog site to Cloudflare Workers.
---

01mvp-blog-starter is designed for Cloudflare Workers, D1, R2, and optional KV.

## Local Development Admin

Seed the local Wrangler D1 database with a fixed admin account:

```sh
pnpm db:seed:local-admin
```

Default local credentials:

```txt
email: a@a.test
password: 1
```

This command writes only to the local D1 database under `.wrangler/state`. It does not create a production admin account. Override the defaults with `BLOGCMS_LOCAL_ADMIN_EMAIL`, `BLOGCMS_LOCAL_ADMIN_NAME`, or `BLOGCMS_LOCAL_ADMIN_PASSWORD` when needed.

## Production Site

```sh
pnpm deploy:web
```

This checks the required R2 bucket, builds the web app, and deploys the Worker using the generated Cloudflare config.

R2 must be enabled on the target Cloudflare account before the storage bucket can be created. Cloudflare includes free monthly R2 usage, but R2 is still a usage-billed product, so new accounts may need to complete the R2 subscription checkout and add a valid payment method first.

If deploy reports a missing R2 bucket, create it in the same Cloudflare account:

```sh
pnpm --filter @repo/web exec wrangler r2 bucket create blog-starter-assets --config wrangler.jsonc
```

The default setup uses one R2 bucket. Object prefixes separate responsibilities: `uploads/` for public assets, `imports/` for import packages, and `exports/` for JSON/ZIP backups.

## Runtime Resources

```txt
Workers: public site, admin, API routes, feeds, sitemap, robots
D1: posts, comments, settings, users, sessions, tokens
R2: assets, import packages, exports, backups
KV: cache metadata and optional short-lived records
```

Turnstile and Cloudflare Email Sending are optional. Empty optional bindings should not block login, publishing, imports, exports, backups, or comment moderation.

For setup steps and admin status checks, see [Advanced configuration](./advanced-configuration).

## Required Migrations

Apply D1 migrations before deploying a site that accepts reader comments:

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply <d1-database-name> --remote --config wrangler.jsonc
```

Better Auth tables are created by `0002_better_auth_d1.sql`; comment moderation linkage is created by `0004_comment_moderation.sql`.

## Environment Variables

Local development reads `apps/web/.env`. Cloudflare preview and production read Wrangler vars plus secrets.

Keep the public site URL, backup retention, email delivery, Turnstile, auth secret, and GitHub OAuth values in Wrangler vars and secrets. Use `apps/web/wrangler.jsonc` as the source of truth for exact variable names.

Set `BETTER_AUTH_SECRET` and `GITHUB_CLIENT_SECRET` as Wrangler secrets in production:

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

## Optional Email Sending

Cloudflare Email Sending is disabled by default because outbound email requires Workers Paid. As of Cloudflare's current pricing, Workers Paid includes 3,000 outbound emails per month, then bills additional sending at $0.35 per 1,000 emails. Email Routing for inbound forwarding remains unlimited.

Use Email Sending or Resend when you want password reset links, admin notifications, import/export completion notices, backup notices, or admin-enabled email verification for comment accounts. Email verification stays off until an admin enables it in settings, and the core site still supports admin login, publishing, comments, moderation, imports, exports, and backups when outbound email is not configured.

Current Cloudflare limits include:

- new accounts may start by sending only to verified email addresses in the Cloudflare account
- paid accounts can send to any recipient, subject to daily sending limits
- each email can include up to 50 total `to`, `cc`, and `bcc` recipients
- each email can be up to 5 MiB, including attachments
- Workers binding sends also count against standard Workers CPU, subrequest, and memory limits

Check Cloudflare's [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/) and [Email Service limits](https://developers.cloudflare.com/email-service/platform/limits/) before enabling production email.

## GitHub Comment Login

GitHub OAuth is the recommended reader login method for comments. Create a GitHub OAuth app for each environment that needs its own callback URL:

```txt
http://localhost:3000/api/auth/callback/github
https://blog.01mvp.com/api/auth/callback/github
```

GitHub OAuth apps have one authorization callback URL, so local and production usually use separate OAuth apps.

Set `GITHUB_CLIENT_ID` in the matching Wrangler config or Cloudflare dashboard. Email/password reader login still works when GitHub OAuth is not configured.

## Comment Moderation

Comments require a reader session. Site owners can configure comment behavior in the admin settings:

- require manual approval before comments appear publicly
- automatically block comments that match blocked keywords
- manage blocked keywords without code changes
- review pending and blocked comments in the moderation queue
