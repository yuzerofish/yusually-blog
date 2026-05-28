---
title: 01mvp-blog-starter
description: A Cloudflare-native personal blog with a Git-managed documentation system.
---

01mvp-blog-starter is a Cloudflare-native personal blog and AI initialization workflow for `github.com/01mvp/blog-starter`.

It ships with two content surfaces by default:

- `/blog` is powered by the publishing backend. It is for public posts, visual admin writing, comments, RSS, CLI publishing, imports, exports, and backups.
- `/docs` is powered by Fumadocs and GitHub Markdown/MDX. It is for product docs, developer docs, API guides, and template usage notes.

中文简介：01mvp-blog-starter 是一个基于 Cloudflare Workers、D1、R2 的个人长期博客系统。默认同时提供博客发布系统和 Git 管理的 Fumadocs 文档系统。

## Stack

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui + Base UI
- Fumadocs for Git-managed documentation
- Paraglide.js for compiled English and Chinese UI messages
- Cloudflare Workers runtime through `@cloudflare/vite-plugin`
- Cloudflare D1 for posts, comments, settings, users, sessions, and API tokens
- Cloudflare R2 for assets, imports, exports, and backups
- CLI for API and Skill automation

## Workspace

```txt
apps/web                 TanStack Start app, admin UI, public site, docs, API routes
apps/cli                 command-line publishing tool
packages/core            content types, demo data, Markdown and i18n helpers
packages/db              Drizzle schema and D1 migrations
packages/ui              shared UI primitives
skills                   AI initialization Skill
apps/web/content/docs    public Fumadocs source, mirrored at docs/site
docs/specs               project specifications and implementation records
```

## Documentation Source

The public documentation source is `apps/web/content/docs`. It is rendered at `/docs` and `/zh/docs`, and `README.md` points to the English docs index so the repository landing page and docs home stay aligned.

The root `docs/specs` folder is for project specifications, deployment records, acceptance notes, and implementation evidence. It is intentionally separate from the public Fumadocs source.

## Configuration

Start with the deployment and comment guides when configuring a new site:

- [Deployment](./deployment): Cloudflare Workers, D1, R2, KV, migrations, environment variables, and deploy targets.
- [Comments](./comments): reader login, GitHub OAuth, email/password fallback, approval mode, keyword blocking, and moderation.
- [API](./api): automation routes, OpenAPI, and comment-auth endpoints.

## Development

```sh
pnpm install
pnpm dev:web
```

The local web app runs on `http://localhost:3000`.

## Build

```sh
pnpm build:web
```

The build compiles Paraglide output, builds TanStack Start, and writes the Cloudflare Worker bundle.

## Deploy

Production site:

```sh
pnpm deploy:web
```

## CLI

Use the CLI in `apps/cli` for login, site inspection, post publishing, and export workflows. Set the site URL and API token in your shell before running authenticated commands.

## License

MIT. See `LICENSE`.
