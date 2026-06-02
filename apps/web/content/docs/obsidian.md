---
title: Obsidian-Compatible Markdown
description: Publish Git-managed Markdown or MDX notes with Obsidian-style syntax.
---

Obsidian is a good writing environment for a personal site because it keeps notes as plain Markdown files. 01mvp-blog-starter supports that file format through a Git-based publishing workflow.

This is Markdown file publishing, not an Obsidian plugin. The site does not connect to the Obsidian desktop app, watch your vault in real time, or publish directly from Obsidian. It works when the selected Markdown or MDX files are committed to the project repository and deployed through your normal Git or GitHub workflow.

Published notes become normal blog posts. They use the same blog pages, tags, RSS feed, sitemap, comments, moderation, and email reply notifications as posts created in the admin area.

## When To Use It

Use this workflow when:

- you are comfortable keeping selected notes in Git
- your site is deployed from GitHub or another Git remote
- you want writing files to stay as Markdown instead of browser-edited posts
- you want Obsidian-style images, callouts, and internal links to be handled during deployment

If you do not use Git, use the admin editor, Markdown import, ZIP import, or OpenAPI publishing instead. Those paths do not require an Obsidian vault or repository-managed note files.

## How To Use It

Put Markdown files under `content/notes`. The folder can be organized however you like. The site does not use folders for navigation; public pages are grouped by tags and publication time.

Only files with `publish: true` are synced:

```md
---
publish: true
tags: [writing, ai]
---

# My first Obsidian post

Write normally in Obsidian.
```

Commit the file and deploy the site. In a GitHub-based setup, the usual shape is:

1. Write or edit notes under `content/notes`.
2. Commit and push the changes to GitHub.
3. Let GitHub Actions or your deployment command run the web deploy.
4. The deployment syncs published notes into the blog when the sync environment variables are configured.

The deployment sync needs `CMS_PUBLIC_SITE_URL` and `CMS_API_TOKEN`. The API token needs `posts:write`, `posts:publish`, and `assets:write`.

You can run a local preview when debugging a note:

```bash
pnpm sync:obsidian -- --dry-run
```

Dry-run scans `content/notes`, prints the entries that would sync, and does not require `CMS_API_TOKEN`.

You can also run the sync command manually for advanced automation:

```bash
CMS_PUBLIC_SITE_URL=https://your-site.example.com \
CMS_API_TOKEN=your-api-token \
pnpm sync:obsidian
```

During deployment, `pnpm deploy:web` runs this sync after deploy when the required environment variables are configured. If those values are missing, deployment continues and the note sync is skipped.

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

The Worker cannot read Git files at request time, so syncing happens during deployment or from an explicit automation command. The sync scans `content/notes`, finds published `.md` and `.mdx` files, uploads referenced images, rewrites Obsidian-specific syntax, and sends the normalized posts to the deployed site.

The server stores synced notes as normal posts and keeps enough source metadata to match future syncs back to the same files.

The admin area shows these posts as Git-managed Markdown posts. They are read-only in the browser because the source of truth is the Markdown file. To change a synced post, edit the file, commit it, and deploy again.

If a previously synced source file disappears or no longer has `publish: true`, the sync hides the matching post by marking it deleted. The row is not physically removed, so comments and history are not destroyed by a file move or a temporary Git mistake.

Changing the file path is treated as publishing a different post. Keep the same path when you want comments and the existing post identity to continue carrying forward.
