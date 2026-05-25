---
title: Deployment
description: Deploy the CMS template and generated demo to Cloudflare Workers.
---

Cloud Blog CMS is designed for Cloudflare Workers, D1, R2, and optional KV.

## Template Site

```sh
blogcms deploy --target main
```

This builds the web app, applies D1 migrations, and deploys the Worker using the generated Cloudflare config.

## Demo Site

```sh
blogcms deploy --target demo
```

The demo target uses the demo Cloudflare configuration and is useful for validating the template workflow end to end.

## Runtime Resources

```txt
Workers: public site, admin, API routes, feeds, sitemap, robots
D1: posts, pages, projects, comments, settings, users, sessions, tokens
R2: assets, import packages, exports, backups
KV: cache metadata and optional short-lived records
```

Turnstile and Cloudflare Email Sending are optional. Empty optional bindings should not block login, publishing, imports, exports, backups, or comment moderation.
