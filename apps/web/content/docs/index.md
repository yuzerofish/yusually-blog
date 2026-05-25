---
title: Cloud Blog CMS
description: A Cloudflare-native personal blog CMS with a Git-managed documentation system.
---

Cloud Blog CMS is a Cloudflare-native personal blog CMS and AI initialization workflow for `github.com/01mvp/blog-starter`.

It ships with two content surfaces by default:

- `/blog` is powered by the CMS. It is for public posts, visual admin writing, comments, RSS, CLI publishing, imports, exports, and backups.
- `/docs` is powered by Fumadocs and GitHub Markdown/MDX. It is for product docs, developer docs, API guides, and template usage notes.

中文简介：Cloud Blog CMS 是一个基于 Cloudflare Workers、D1、R2 的个人永久博客 CMS。默认同时提供 CMS 博客系统和 Git 管理的 Fumadocs 文档系统。

## Stack

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui + Base UI
- Fumadocs for Git-managed documentation
- Paraglide.js for compiled English and Chinese UI messages
- Cloudflare Workers runtime through `@cloudflare/vite-plugin`
- Cloudflare D1 for posts, comments, settings, users, sessions, and API tokens
- Cloudflare R2 for assets, imports, exports, and backups
- `blogcms` CLI for API and Skill automation

## Workspace

```txt
apps/web                 TanStack Start app, admin CMS, public site, docs, API routes
apps/cli                 blogcms CLI
packages/core            content types, demo data, Markdown and i18n helpers
packages/db              Drizzle schema and D1 migrations
packages/ui              shared UI primitives
skills/cloud-blog-cms    AI initialization Skill
docs/specs               project specifications and implementation evidence
```

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

Template site:

```sh
blogcms deploy --target main
```

Skill demo site:

```sh
blogcms deploy --target demo
```

## CLI

```sh
BLOGCMS_SITE_URL=https://demo.01mvp.com pnpm --filter @repo/cli exec node bin/blogcms.mjs login --email <email> --password <password>
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs site get
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs push "$PWD/skills/cloud-blog-cms/examples/first-post.json"
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs export
```

## License

MIT. See `LICENSE`.
