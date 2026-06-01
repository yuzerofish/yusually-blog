---
title: Publishing
description: Choose between browser editing, API publishing, Git-managed Markdown, imports, and docs.
---

01mvp-blog-starter supports several publishing paths.

The default path is the admin UI. Use the other paths only when they match how you already work; every extra source adds integration surface, so each one has a narrow boundary.

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

## Git-Managed Markdown

Use `content/notes` when you want blog posts to live as Markdown or MDX files in Git. This path is compatible with common Obsidian Markdown syntax, but it is a Git/deployment workflow rather than an Obsidian desktop plugin.

Only files with `publish: true` are synced. Synced notes become normal blog posts with the same comments, tags, RSS feed, and sitemap behavior.

See [Obsidian-Compatible Markdown](/docs/obsidian) for the full workflow.

## Docs Publishing

Docs pages are committed as Markdown or MDX files under `apps/web/content/docs`. They are deployed with the web app and rendered by Fumadocs at `/docs`.

Keep Fumadocs for product documentation and setup guides. Use `content/notes` for blog-style posts that should be grouped by tags and publish time. The two paths intentionally serve different content types.
