# Cloud Blog CMS

Cloud Blog CMS is a Cloudflare-native personal blog CMS and AI initialization Skill. It supports a visual admin CMS, Markdown-first publishing, bilingual English/Chinese content, public blog routes, comments, RSS, sitemap, OpenAPI, CLI automation, D1 storage, and R2 assets/backups.

中文简介：Cloud Blog CMS 是一个基于 Cloudflare Workers、D1、R2 的个人永久博客 CMS。它支持后台可视化写作、Markdown 发布、中英文内容、评论审核、RSS、站点地图、OpenAPI、CLI 自动化和 AI Skill 初始化。

## Live Sites

- Template demo: `https://cms.01mvp.com`
- Template alias: `https://blog-starter.01mvp.com`
- Skill-generated demo: `https://demo.01mvp.com`
- Skill demo alias: `https://blog-demo.01mvp.com`

## Stack

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui + Base UI
- Paraglide.js for compiled `en` / `zh` UI messages
- Cloudflare Workers runtime through `@cloudflare/vite-plugin`
- Cloudflare D1 for posts, comments, settings, users, sessions, and API tokens
- Cloudflare R2 for assets, imports, exports, and backups
- `blogcms` CLI for API and Skill automation

## Workspace

```txt
apps/web                 TanStack Start app, admin CMS, API routes, Worker config
apps/cli                 blogcms CLI
packages/core            content types, demo data, Markdown and i18n helpers
packages/db              Drizzle schema and D1 migrations
packages/ui              shared UI primitives
skills/cloud-blog-cms    AI initialization Skill
docs/specs               architecture, API, database, deployment, Skill, acceptance docs
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
pnpm build:web
pnpm --filter @repo/web exec wrangler deploy
```

Skill demo site:

```sh
pnpm build:web:demo
pnpm --filter @repo/web exec wrangler deploy
```

## CLI

```sh
BLOGCMS_SITE_URL=https://demo.01mvp.com pnpm --filter @repo/cli exec node bin/blogcms.mjs login --email <email> --password <password>
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs site get
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs push "$PWD/skills/cloud-blog-cms/examples/first-post.json"
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs export
```

## Docs

- Product requirements: `docs/prd.md`
- Architecture: `docs/specs/architecture.md`
- Deployment: `docs/specs/deployment.md`
- API: `docs/specs/api.md`
- Database: `docs/specs/database.md`
- Skill: `docs/specs/skill.md`
- Acceptance: `docs/specs/acceptance.md`

## License

MIT. See `LICENSE`.
