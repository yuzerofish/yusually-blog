---
title: Usage Guide
description: How to publish posts, maintain docs, and operate the blog template.
---

Use `/blog` for articles and `/docs` for long-lived documentation. Both systems are enabled by default.

## Write Blog Posts

Use the CMS admin when you want a normal writing workflow:

- write Markdown in the browser
- save drafts
- upload cover images and media
- publish immediately or schedule a post
- review comments

Published posts appear on `/blog`, tag pages, archive pages, RSS, feeds, and sitemap output.

## Publish With CLI Or API

Use the CLI for local drafts, automation, or AI-assisted publishing:

```sh
BLOGCMS_SITE_URL=https://blog.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs push ./post.md
```

Use `/openapi.json` when connecting external tools or generating API clients.

## Maintain Docs

Use Fumadocs for content that should live with the repository:

- product manuals
- developer documentation
- API usage notes
- deployment instructions
- template setup guides

Docs live in `apps/web/content/docs`. English pages use `*.md` or `*.mdx`; Chinese pages use `*.zh.md` or `*.zh.mdx`.

`README.md` points to the English docs index. The repository-level `docs/site` path is a convenience link to the same Fumadocs source, while `docs/specs` remains the project specification and evidence area.

## Choose A Content System

```txt
/blog   = CMS-managed posts
/docs   = Git-managed Markdown/MDX docs
/admin  = CMS management UI
RSS     = blog posts only
sitemap = pages + blog + docs + projects + tags
```

Keep frequently edited articles in the CMS. Keep durable product or developer references in docs.

## Deploy

Build the web app before shipping:

```sh
pnpm build:web
```

Deploy the production site with:

```sh
blogcms deploy --target main
```
