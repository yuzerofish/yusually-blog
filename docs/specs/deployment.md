# Deployment

Canonical production targets:

- Template demo: `https://cms.01mvp.com`
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
- Current verified version: `9f74e0ad-1cd6-4550-b28e-5a62edb8f4c9`

## Demo Cloudflare Resources

- Worker: `blog-demo`
- D1: `blog-demo-cms`, id `a1e1d82d-2d1a-496a-93af-5fc56d930348`
- R2 assets: `blog-demo-assets`
- R2 backups: `blog-demo-backups`
- KV: `BLOG_DEMO_CMS_CACHE`, id `ae38b550b4604ddeb49078745b58e945`
- Cron Trigger: `0 3 * * *`
- Backup retention: 30 days
- Wrangler config: `apps/web/wrangler.demo.jsonc`
- Current verified version: `cd7ace94-d515-4e70-b98c-b51fdd780e9a`

## Migrations

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-demo-cms --remote --config wrangler.demo.jsonc
```

The remote databases have applied:

- `0001_cloud_blog_cms.sql`
- `0002_admin_auth.sql`

## Build And Deploy

Main:

```sh
pnpm build:web
pnpm --filter @repo/web exec wrangler deploy
```

Demo:

```sh
pnpm build:web:demo
pnpm --filter @repo/web exec wrangler deploy
```

The Cloudflare Vite plugin writes the effective deploy config into `apps/web/dist/server/wrangler.json`. After `pnpm build:web:demo`, the following `wrangler deploy` uses demo bindings and routes from the generated config.

Because custom domains are configured in Wrangler, workers.dev preview URLs can be disabled by Cloudflare for these deployments. Use the custom domains for verification.

Wrangler uses `apps/web/src/server.ts` as the Worker entry. It delegates HTTP requests to TanStack Start and exposes a `scheduled` handler for automatic ZIP backups.

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
