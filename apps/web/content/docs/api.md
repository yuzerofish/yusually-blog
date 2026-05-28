---
title: API
description: API and automation surfaces for 01mvp-blog-starter.
---

01mvp-blog-starter exposes an OpenAPI document at `/openapi.json`.

The API is used by:

- the admin UI
- AI initialization and maintenance workflows
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
GET    /api/comment-auth/verify-email
GET    /api/admin/email-status
```

API tokens are scoped. Publishing requires write permissions, and publishing or scheduling posts also requires publish permissions.

Create API tokens from the admin settings. Use the smallest scope set that fits the automation task: posts need `posts:read`, `posts:write`, and sometimes `posts:publish`; comment moderation needs `comments:moderate`; exports need `export:read`; site settings need `site:read` or `site:write`.

## Comments And Reader Auth

`POST /api/comments` requires a reader session. The request accepts comment body, post id, and optional parent id for replies. The server applies honeypot checks, optional Turnstile verification, rate limits, body length limits, link limits, and blocked-keyword checks.

Reader and admin identities share Better Auth. `/api/comment-auth/*` keeps a comment-facing response shape while sessions and accounts live in the shared Better Auth tables. If email verification is enabled in admin settings, email/password comment accounts must confirm the verification link before signing in.

Comments are created as `pending` when manual approval is enabled, `approved` when approval is disabled, and `spam` when blocked keywords match and auto-blocking is enabled.

## OpenAPI

Open the machine-readable schema:

```txt
/openapi.json
```

Use the schema when generating clients, testing integrations, or wiring external automation.
