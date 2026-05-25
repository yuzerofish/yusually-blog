---
title: API
description: API and automation surfaces for Cloud Blog CMS.
---

Cloud Blog CMS exposes an OpenAPI document at `/openapi.json`.

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
```

API tokens are scoped. Publishing requires write permissions, and publishing or scheduling posts also requires publish permissions.

## OpenAPI

Open the machine-readable schema:

```txt
/openapi.json
```

Use the schema when generating clients, testing integrations, or wiring external automation.
