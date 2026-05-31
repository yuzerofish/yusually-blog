# 01mvp-blog-starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/01MVP/blog-starter)
[![Cloudflare deploy](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml/badge.svg)](https://github.com/01MVP/blog-starter/actions/workflows/cloudflare-deploy.yml)

[中文 README](./README.zh-CN.md)

01mvp-blog-starter is a Cloudflare-native personal blog CMS with a Git-managed documentation system.

It ships with two content surfaces:

- `/blog` is powered by the CMS backend for posts, admin writing, comments, RSS, OpenAPI publishing, imports, exports, and backups.
- `/docs` is powered by Fumadocs and GitHub Markdown/MDX for product docs, developer docs, API guides, and template notes.

## Stack

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui
- Fumadocs for Git-managed documentation
- Paraglide.js for English and Chinese UI messages
- Cloudflare Workers via `@cloudflare/vite-plugin`
- Cloudflare D1 for posts, comments, settings, users, sessions, and API tokens
- Cloudflare R2 for assets, imports, exports, and backups
- Cloudflare KV for cache metadata and short-lived records

## Deploy To Cloudflare

Use the Deploy to Cloudflare button above to create and deploy your own copy from the public GitHub repository.

The button works for Workers applications. This repository is a pnpm monorepo, so the root package scripts are the deployment entrypoint:

```sh
pnpm build:web
pnpm run deploy
```

Cloudflare can provision supported resources from the Wrangler config, including D1, R2, and KV. Review `apps/web/wrangler.jsonc` after the first deployment because the production domain and public site URL are project-specific.

Required production secrets:

- `BETTER_AUTH_SECRET`: generate with `pnpm auth:secret`
- `GITHUB_CLIENT_SECRET`: optional unless GitHub comment login is enabled
- `GOOGLE_CLIENT_SECRET`: optional unless Google comment login is enabled

## Automatic Deploys

This repo includes a GitHub Actions workflow at `.github/workflows/cloudflare-deploy.yml`. Every push to `main` installs dependencies, builds the web app, applies D1 migrations to the remote database, and deploys the Worker to Cloudflare.

Add these GitHub repository secrets once:

```sh
gh secret set CLOUDFLARE_API_TOKEN --repo 01MVP/blog-starter --body "$CLOUDFLARE_API_TOKEN"
gh secret set CLOUDFLARE_ACCOUNT_ID --repo 01MVP/blog-starter --body "$CLOUDFLARE_ACCOUNT_ID"
```

The token needs permission to deploy Workers and manage the bound D1, R2, and KV resources used by `apps/web/wrangler.jsonc`.

## Local Development

```sh
pnpm install
pnpm dev:web
```

The local web app runs on `http://localhost:3000`.

Seed the local D1 database with a fixed admin account:

```sh
pnpm db:seed:local-admin
```

Default local credentials:

```txt
email: a@a.test
password: 1
```

## Build

```sh
pnpm build:web
```

The build compiles Paraglide output, builds TanStack Start, and writes the Cloudflare Worker bundle.

## Production Deploy

```sh
pnpm deploy:web
```

This checks the required R2 bucket, builds the web app, applies remote D1 migrations, and deploys the Worker with the generated Cloudflare config.

## Workspace

```txt
apps/web                 TanStack Start app, admin UI, public site, docs, API routes
packages/core            content types, demo data, Markdown and i18n helpers
packages/db              Drizzle schema and D1 migrations
packages/ui              shared UI primitives
skills                   AI initialization and OpenAPI maintenance Skill
apps/web/content/docs    public Fumadocs source, mirrored at docs/site
docs/specs               project specifications and implementation records
```

## Documentation

The public documentation source is `apps/web/content/docs`. It is rendered at `/docs` and `/zh/docs`.

Start with these guides:

- [Deployment](./apps/web/content/docs/deployment.md)
- [Comments](./apps/web/content/docs/comments.md)
- [Advanced configuration](./apps/web/content/docs/advanced-configuration.md)
- [API](./apps/web/content/docs/api.md)

The root `docs/specs` folder is for project specifications, deployment records, acceptance notes, and implementation evidence. It is intentionally separate from the public Fumadocs source.

## Automation

Use the `01mvp-blog` Skill in `skills/01mvp-blog` for site creation and OpenAPI-based maintenance. Generated sites expose `/openapi.json`; create scoped API tokens in the admin settings before wiring external automation.

## License

MIT. See [LICENSE](./LICENSE).
