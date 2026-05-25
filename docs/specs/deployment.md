# Deployment

The template target is `blog-starter.01mvp.com`. The Skill-generated demo target is `blog-demo.01mvp.com`.

## Prerequisites

- Node.js 24+
- pnpm 11+
- Vite+ `vp`
- Wrangler authenticated against the target Cloudflare account

## Cloudflare Resources

Create:

- D1 database: `blog-starter-cms`
- R2 bucket: `blog-starter-assets`
- R2 bucket: `blog-starter-backups`
- KV namespace: `CMS_CACHE`
- Turnstile site key and secret for comment anti-spam

Update `apps/web/wrangler.jsonc` with real Cloudflare IDs before remote deploy.

## Build And Deploy

```sh
pnpm install
pnpm build:web
cd apps/web
wrangler d1 migrations apply blog-starter-cms --remote
wrangler deploy
```

`pnpm build:web` compiles Paraglide messages before the TanStack Start build, so deploys must include `apps/web/messages` and `apps/web/project.inlang`.

Real domain binding and DNS changes require Cloudflare account authorization.
