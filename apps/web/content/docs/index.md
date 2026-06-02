---
title: 01mvp-blog-starter
description: A Cloudflare-native personal blog with a Git-managed documentation system.
---

01mvp-blog-starter is a Cloudflare-native personal blog and AI initialization workflow for `github.com/01mvp/blog-starter`.

It ships with two content surfaces by default:

- `/blog` is powered by the publishing backend. It is for public posts, visual admin writing, comments, RSS, OpenAPI publishing, imports, exports, and backups.
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
- OpenAPI for publishing automation

## Configuration

Start with the deployment and comment guides when configuring a new site:

- [Deployment](./deployment): Cloudflare Workers, D1, R2, KV, migrations, environment variables, and deploy targets.
- [Comments](./comments): reader login, social OAuth, email/password fallback, approval mode, keyword blocking, and moderation.
- [Advanced configuration](./advanced-configuration): optional email delivery, comment OAuth, and Turnstile status checks.
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

This checks the required R2 bucket, builds the web app, applies remote D1 migrations, deploys the Worker, and runs the Git-managed notes sync when `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN` are configured.

## Automation

Generated sites expose `/openapi.json`. Create scoped API tokens in the admin settings before connecting external publishing tools or API clients.

## License

MIT. See `LICENSE`.
