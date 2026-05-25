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
- Current verified version: `2cda7e80-f0ac-40f8-8e45-42669a8ad807`
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
- Current verified version: `48ab394e-a302-4a8a-85dc-b85d85f3a083`
- Email Sending: disabled by default
- Password reset TTL: 30 minutes

## Migrations

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-demo-cms --remote --config wrangler.demo.jsonc
```

The remote databases have applied:

- `0001_cloud_blog_cms.sql`
- `0002_admin_auth.sql`
- `0003_pages_projects_management.sql`

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

The latest main and demo deployments include the Email Sending variables, but `CMS_EMAIL_SENDING_ENABLED` remains `false` until a verified sender and `CMS_EMAIL` binding are configured.
