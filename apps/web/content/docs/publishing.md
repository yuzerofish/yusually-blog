---
title: Publishing
description: Publish through the admin UI, OpenAPI, AI Skill, or Git-managed docs.
---

01mvp-blog-starter supports several publishing paths.

## Blog Posts

Use the admin UI when you want a normal writing workflow:

- write Markdown in the browser
- upload cover images and media
- save drafts
- publish or schedule posts
- moderate comments

Published posts appear under `/blog`, feeds, tag pages, and the sitemap.

## OpenAPI Publishing

Use `/openapi.json` when you want local automation, external integrations, or AI-assisted publishing. Create a scoped API token in the admin settings before running authenticated requests.

Publishing uses the same authenticated HTTP API as the admin UI. Writing posts requires `posts:write`, and publishing or scheduling posts also requires `posts:publish`.

## Import And Export

The API supports Markdown, HTML, ZIP, and folder imports. Exports include posts, comments, assets, tags, site settings, and a manifest.

Backups are written to R2 so a generated site can be restored or moved later.

## Obsidian Publishing

Use `content/notes` when you want to write in an Obsidian vault. Only `.md` and `.mdx` files with `publish: true` are synced, and synced notes become normal blog posts with the same comments, tags, RSS feed, and sitemap behavior.

See [Obsidian Publishing](/docs/obsidian) for the full workflow.

## Docs Publishing

Docs pages are committed as Markdown or MDX files under `apps/web/content/docs`. They are deployed with the web app and rendered by Fumadocs at `/docs`.
