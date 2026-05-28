---
title: Publishing
description: Publish through the admin UI, CLI, API, or Git-managed docs.
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

## CLI Publishing

Use the CLI in `apps/cli` when you want local or automated publishing. Configure the site URL and API token in your shell before running authenticated commands.

The CLI uses the same authenticated HTTP API as the admin UI.

## Import And Export

The API supports Markdown, HTML, ZIP, and folder imports. Exports include posts, comments, assets, tags, site settings, and a manifest.

Backups are written to R2 so a generated site can be restored or moved later.

## Docs Publishing

Docs pages are committed as Markdown or MDX files under `apps/web/content/docs`. They are deployed with the web app and rendered by Fumadocs at `/docs`.
