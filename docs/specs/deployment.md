# Deployment

Canonical production targets:

- Template demo: `https://blog.01mvp.com`
- Template alias: `https://blog-starter.01mvp.com`
- Skill-generated demo: `https://demo.01mvp.com`
- Skill demo alias: `https://blog-demo.01mvp.com`

## Prerequisites

- Node.js 24+
- pnpm 11+
- Vite+ `vp`
- Wrangler authenticated against the target Cloudflare account

## Main Cloudflare Resources

- Worker: `blog-starter`
- D1: `blog-starter-cms`, id `b267c97c-72a5-45a1-9f5a-cfd0b8e8067c`
- R2 assets: `blog-starter-assets`
- R2 backups: `blog-starter-backups`
- KV: `CMS_CACHE`, id `c1150cc286374ba9919f48f48a985f36`
- Cron Trigger: `0 3 * * *`
- Backup retention: 30 days
- Wrangler config: `apps/web/wrangler.jsonc`
- Current verified version: `bd7113d3-4755-4c3c-82fb-c78e2531af58`
- Email Sending: disabled by default
- Password reset TTL: 30 minutes

## Demo Cloudflare Resources

- Worker: `blog-demo`
- D1: `blog-demo-cms`, id `a1e1d82d-2d1a-496a-93af-5fc56d930348`
- R2 assets: `blog-demo-assets`
- R2 backups: `blog-demo-backups`
- KV: `BLOG_DEMO_CMS_CACHE`, id `ae38b550b4604ddeb49078745b58e945`
- Cron Trigger: `0 3 * * *`
- Backup retention: 30 days
- Wrangler config: `apps/web/wrangler.demo.jsonc`
- Current verified version: `dda4a2a8-d554-47d8-bcb3-ef942c2484fc`
- Email Sending: disabled by default
- Password reset TTL: 30 minutes

## Migrations

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-demo-cms --remote --config wrangler.demo.jsonc
```

The remote databases have applied:

- `0001_cloud_blog_cms.sql`
- `0002_better_auth_d1.sql`
- `0003_pages_projects_management.sql`
- `0004_comment_moderation.sql`

## Build And Deploy

Main:

```sh
blogcms deploy --target main
```

Demo:

```sh
blogcms deploy --target demo
```

`blogcms deploy` runs the matching Vite+ build, applies remote D1 migrations, and deploys with the generated Cloudflare Vite config. The underlying commands remain available for targeted maintenance:

```sh
pnpm build:web
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler deploy --config dist/server/wrangler.json

pnpm build:web:demo
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-demo-cms --remote --config wrangler.demo.jsonc
pnpm --filter @repo/web exec wrangler deploy --config dist/server/wrangler.json
```

The Cloudflare Vite plugin writes the effective deploy config into `apps/web/dist/server/wrangler.json`. After `pnpm build:web:demo`, Wrangler must use that generated config so the demo bindings, assets, and custom domains are deployed together.

Because custom domains are configured in Wrangler, workers.dev preview URLs can be disabled by Cloudflare for these deployments. Use the custom domains for verification.

Wrangler uses `apps/web/src/server.ts` as the Worker entry. It delegates HTTP requests to TanStack Start and exposes a `scheduled` handler for automatic ZIP backups.

## GitHub Comment Login

Create a GitHub OAuth app and set callback URLs for each environment:

```txt
http://localhost:3000/api/auth/callback/github
https://your-domain.com/api/auth/callback/github
```

Set `GITHUB_CLIENT_ID` in `apps/web/wrangler.jsonc` or the Cloudflare dashboard. Store the auth and GitHub secrets with Wrangler:

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

For local development, set `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` in `apps/web/.env`. Email/password comment login works without GitHub, but GitHub is the preferred default for reader comments.

## Optional Email Sending

Email is disabled by default. To enable comment, import, export, backup, and password reset notifications, set:

```jsonc
{
  "vars": {
    "CMS_EMAIL_SENDING_ENABLED": "true",
    "CMS_EMAIL_FROM": "noreply@example.com",
    "CMS_EMAIL_TO": "admin@example.com",
    "CMS_PASSWORD_RESET_TTL_MINUTES": "30",
  },
  "send_email": [
    {
      "name": "CMS_EMAIL",
      "allowed_sender_addresses": ["noreply@example.com"],
    },
  ],
}
```

The sender address and domain must be verified in Cloudflare Email Service before production mail is sent.

Email Sending is a paid optional feature. Cloudflare's current pricing requires Workers Paid for outbound Email Sending, includes 3,000 outbound emails per month, and bills additional outbound email at $0.35 per 1,000 emails. Email Routing inbound forwarding is unlimited.

Do not make email verification-code login a default dependency. It can be added behind the same `CMS_EMAIL` path for sites that choose the paid email feature, while the free core keeps GitHub OAuth, email/password login, direct admin password reset, publishing, comments, moderation, imports, exports, and backups usable without Email Sending.

Operational limits to account for before enabling production email:

- new accounts may initially send only to verified email addresses in the Cloudflare account
- paid accounts can send to arbitrary recipients, subject to daily sending limits
- one email can include up to 50 total `to`, `cc`, and `bcc` recipients
- one email can be up to 5 MiB including attachments
- Workers binding sends are also constrained by standard Workers CPU, subrequest, and memory limits

The latest main and demo deployments include the Email Sending variables, but `CMS_EMAIL_SENDING_ENABLED` remains `false` until a verified sender and `CMS_EMAIL` binding are configured.
