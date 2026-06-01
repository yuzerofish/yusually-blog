---
title: Obsidian Publishing
description: Write in an Obsidian vault and publish selected notes to the blog.
---

Obsidian is a good writing environment for a personal site because it keeps notes as plain Markdown files. You can keep drafts, references, and private notes in the same vault while publishing only the files you choose.

01mvp-blog-starter treats Obsidian notes as another source for normal blog posts. Published notes use the same blog pages, tags, RSS feed, sitemap, comments, moderation, and email reply notifications as posts created in the admin area.

## How To Use It

Put your vault files under `content/notes`. The folder can be organized however you like. The site does not use folders for navigation; public pages are grouped by tags and publication time.

Only files with `publish: true` are synced:

```md
---
publish: true
tags: [writing, ai]
---

# My first Obsidian post

Write normally in Obsidian.
```

Run a preview first:

```bash
pnpm sync:obsidian -- --dry-run
```

Then sync to a deployed site:

```bash
CMS_PUBLIC_SITE_URL=https://your-site.example.com \
CMS_API_TOKEN=your-api-token \
pnpm sync:obsidian
```

The API token needs `posts:write`, `posts:publish`, and `assets:write`.

During deployment, `pnpm deploy:web` also runs the Obsidian sync after deploy when `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN` are configured. If those values are missing, deployment continues and the sync is skipped.

## Images And Links

The sync command understands the image forms Obsidian users commonly write:

```md
![[cover.png]]
![[Assets/cover.png|Cover image]]
![Cover](../Assets/cover.png)
```

When the referenced file can be found under `content/notes`, it is uploaded to R2 through the existing asset API and the Markdown is rewritten to the uploaded URL. If an image name is ambiguous, the command leaves the reference unchanged so one note cannot accidentally publish the wrong image.

Internal note links are converted when the target note is also published:

```md
[[My other note]]
[[My other note|read the companion note]]
```

If the target is not published, the link text remains as plain text.

Obsidian callouts are preserved as blockquotes:

```md
> [!NOTE] Small detail
```

MDX files are accepted too. Markdown-compatible MDX works the same as `.md`; custom JSX is kept inside the Markdown body and must still be safe to render in the blog page.

## How It Works

The Worker cannot read Git files at request time, so syncing happens from a local or CI command. The command scans `content/notes`, finds published `.md` and `.mdx` files, uploads referenced images, rewrites Obsidian-specific syntax, and sends a normalized manifest to `/api/sync/obsidian`.

The server stores synced notes as normal posts and records their source file in `post_sources`. That source record contains:

- source type: `obsidian_git`
- source path inside `content/notes`
- content hash
- last sync time

The admin area shows these posts with an Obsidian source label. They are read-only in the browser because the source of truth is the Markdown file. To change a synced post, edit the file and run the sync again.

If a previously synced source file disappears or no longer has `publish: true`, the sync hides the matching post by marking it deleted. The row is not physically removed, so comments and history are not destroyed by a file move or a temporary Git mistake.
