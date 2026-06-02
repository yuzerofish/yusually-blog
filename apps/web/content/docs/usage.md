---
title: Usage Guide
description: How to publish posts, maintain docs, and operate the blog template.
---

Use `/blog` for articles and `/docs` for long-lived documentation. Both systems are enabled by default.

## Write Blog Posts

Use the admin UI when you want a normal writing workflow:

- write Markdown in the browser
- save drafts
- upload cover images and media
- publish immediately or schedule a post
- review comments

Published posts appear on `/blog`, tag pages, RSS, feeds, and sitemap output.

## Publish With OpenAPI

Use `/openapi.json` for local drafts, automation, external integrations, or AI-assisted publishing.

Create a scoped API token in the admin settings, then use the OpenAPI schema when connecting external tools or generating API clients.

## Maintain Docs

Use Fumadocs for content that should live with the repository:

- product manuals
- developer documentation
- API usage notes
- deployment instructions
- template setup guides

Docs are Markdown or MDX files in the repository. English pages use `*.md` or `*.mdx`; Chinese pages use `*.zh.md` or `*.zh.mdx`.

## Choose A Content System

```txt
/blog   = admin-managed posts
/docs   = Git-managed Markdown/MDX docs
/admin  = publishing admin UI
RSS     = blog posts only
sitemap = home + demo + blog + docs + series + tags + about
```

Keep frequently edited articles in the publishing backend. Keep durable product or developer references in docs.

## Deploy

Build the web app before shipping:

```sh
pnpm build:web
```

Deploy the production site with:

```sh
pnpm deploy:web
```

The deploy command applies remote D1 migrations and runs the Git-managed notes sync when `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN` are configured.
