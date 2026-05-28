---
title: Content Systems
description: How the blog backend and Fumadocs documentation system divide ownership.
---

The template enables both content systems by default. They are intentionally separate.

## `/blog`: Blog Content

Use the publishing backend for content that benefits from runtime management:

- public posts
- drafts, scheduled posts, and archived posts
- visual admin writing
- comments and moderation
- media uploads to R2
- RSS and feed output
- API and CLI publishing
- imports, exports, and backups

Blog content is stored in D1. Markdown remains the authoring format, and rendered HTML is cached for public pages.

## `/docs`: Git Markdown/MDX

Use Fumadocs for content that should be versioned with the repository:

- product documentation
- developer guides
- API usage notes
- deployment and template setup docs
- longer reference material that should change with code

Docs content lives under `apps/web/content/docs`. It is reviewed, versioned, and deployed with the codebase.

## Boundary

```txt
/blog   = blog content
/docs   = Git Markdown/MDX docs
/admin  = admin UI only
RSS     = blog posts only
sitemap = public pages + blog + docs + tags
```

The admin UI does not edit Git-managed docs. If a site owner wants a docs-only or blog-only template, they can remove the unused route and navigation entry during project customization.
