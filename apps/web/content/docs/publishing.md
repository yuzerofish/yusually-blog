---
title: Publishing
description: Publish through the admin UI, CLI, API, or Git-managed docs.
---

Cloud Blog CMS supports several publishing paths.

## CMS Posts

Use the admin UI when you want a normal writing workflow:

- write Markdown in the browser
- upload cover images and media
- save drafts
- publish or schedule posts
- moderate comments

Published posts appear under `/blog`, feeds, archives, tag pages, and the sitemap.

## CLI Publishing

Use `blogcms` when you want local or automated publishing:

```sh
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs push ./post.md
```

The CLI uses the same authenticated HTTP API as the admin UI.

## Import And Export

The API supports Markdown, HTML, ZIP, and folder imports. Exports include posts, pages, comments, assets, tags, projects, site settings, and a manifest.

Backups are written to R2 so a generated site can be restored or moved later.

## Docs Publishing

Docs pages are committed as Markdown or MDX files under `apps/web/content/docs`. They are deployed with the web app and rendered by Fumadocs at `/docs`.
