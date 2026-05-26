---
title: API
description: API and automation surfaces for 01mvp-blog-starter.
---

01mvp-blog-starter exposes an OpenAPI document at `/openapi.json`.

The API is used by:

- the admin UI
- the `blogcms` CLI
- AI initialization workflows
- custom automation scripts

## Main Endpoints

```txt
POST   /api/posts
PATCH  /api/posts/:id
GET    /api/posts
GET    /api/posts/:id
DELETE /api/posts/:id

POST   /api/import/markdown
POST   /api/import/html
POST   /api/import/zip

POST   /api/assets
GET    /api/assets

GET    /api/export
POST   /api/backups

POST   /api/comments/:id/approve
POST   /api/comments/:id/spam
POST   /api/comments/:id/delete

GET    /api/comment-auth/me
POST   /api/comment-auth/login
POST   /api/comment-auth/signup
POST   /api/comment-auth/logout
GET    /api/comment-auth/github/start
```

API tokens are scoped. Publishing requires write permissions, and publishing or scheduling posts also requires publish permissions.

## Comments And Reader Auth

`POST /api/comments` requires a reader session. The request accepts comment body, post id, and optional parent id for replies. The server applies honeypot checks, optional Turnstile verification, rate limits, body length limits, link limits, and blocked-keyword checks.

Reader and admin identities share Better Auth. `/api/comment-auth/*` keeps a comment-facing response shape while sessions and accounts live in the shared Better Auth tables.

Comments are created as `pending` when manual approval is enabled, `approved` when approval is disabled, and `spam` when blocked keywords match and auto-blocking is enabled.

## OpenAPI

Open the machine-readable schema:

```txt
/openapi.json
```

Use the schema when generating clients, testing integrations, or wiring external automation.
