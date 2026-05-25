---
title: Deployment
description: Deploy the CMS template and generated demo to Cloudflare Workers.
---

Cloud Blog CMS is designed for Cloudflare Workers, D1, R2, and optional KV.

## Template Site

```sh
blogcms deploy --target main
```

This builds the web app, applies D1 migrations, and deploys the Worker using the generated Cloudflare config.

## Demo Site

```sh
blogcms deploy --target demo
```

The demo target uses the demo Cloudflare configuration and is useful for validating the template workflow end to end.

## Runtime Resources

```txt
Workers: public site, admin, API routes, feeds, sitemap, robots
D1: posts, pages, projects, comments, settings, users, sessions, tokens
R2: assets, import packages, exports, backups
KV: cache metadata and optional short-lived records
```

Turnstile and Cloudflare Email Sending are optional. Empty optional bindings should not block login, publishing, imports, exports, backups, or comment moderation.

## Required Migrations

Apply D1 migrations before deploying a site that accepts reader comments:

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote --config wrangler.jsonc
```

The comment login and moderation tables are created by `packages/db/migrations/0004_comment_auth_moderation.sql`.

## Environment Variables

Local development reads `apps/web/.env`. Cloudflare preview and production read Wrangler vars plus secrets.

```txt
CMS_PUBLIC_SITE_URL=https://your-domain.com
CMS_BACKUP_RETENTION_DAYS=30
CMS_EMAIL_SENDING_ENABLED=false
CMS_TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Set `GITHUB_CLIENT_SECRET` as a Wrangler secret in production:

```sh
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

## GitHub Comment Login

GitHub OAuth is the recommended reader login method for comments. Create a GitHub OAuth app and add callback URLs for every environment:

```txt
http://localhost:3000/api/comment-auth/github/callback
https://your-domain.com/api/comment-auth/github/callback
```

Set `GITHUB_CLIENT_ID` in the matching Wrangler config or Cloudflare dashboard. Email/password reader login still works when GitHub OAuth is not configured.

## Comment Moderation

Comments require a reader session. Site owners can configure comment behavior in the admin settings:

- require manual approval before comments appear publicly
- automatically block comments that match blocked keywords
- manage blocked keywords without code changes
- review pending and blocked comments in the moderation queue
