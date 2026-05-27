---
title: Deployment
description: Deploy the CMS site to Cloudflare Workers.
---

01mvp-blog-starter is designed for Cloudflare Workers, D1, R2, and optional KV.

## Production Site

```sh
blogcms deploy --target main
```

This builds the web app, applies D1 migrations, and deploys the Worker using the generated Cloudflare config.

## Runtime Resources

```txt
Workers: public site, admin, API routes, feeds, sitemap, robots
D1: posts, pages, comments, settings, users, sessions, tokens
R2: assets, import packages, exports, backups
KV: cache metadata and optional short-lived records
```

Turnstile and Cloudflare Email Sending are optional. Empty optional bindings should not block login, publishing, imports, exports, backups, or comment moderation.

## Required Migrations

Apply D1 migrations before deploying a site that accepts reader comments:

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote --config wrangler.jsonc
```

Better Auth tables are created by `0002_better_auth_d1.sql`; comment moderation linkage is created by `0004_comment_moderation.sql`.

## Environment Variables

Local development reads `apps/web/.env`. Cloudflare preview and production read Wrangler vars plus secrets.

```txt
CMS_PUBLIC_SITE_URL=https://blog.01mvp.com
CMS_BACKUP_RETENTION_DAYS=30
CMS_EMAIL_SENDING_ENABLED=false
CMS_TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

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

GitHub OAuth is the recommended reader login method for comments. Create a GitHub OAuth app and add callback URLs for every environment:

```txt
http://localhost:3000/api/auth/callback/github
https://blog.01mvp.com/api/auth/callback/github
```

Set `GITHUB_CLIENT_ID` in the matching Wrangler config or Cloudflare dashboard. Email/password reader login still works when GitHub OAuth is not configured.

## Comment Moderation

Comments require a reader session. Site owners can configure comment behavior in the admin settings:

- require manual approval before comments appear publicly
- automatically block comments that match blocked keywords
- manage blocked keywords without code changes
- review pending and blocked comments in the moderation queue
