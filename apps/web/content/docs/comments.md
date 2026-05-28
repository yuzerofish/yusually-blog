---
title: Comments
description: Reader login, moderation, and blocked keywords.
---

Comments are enabled as a reader-facing feature, but posting requires a reader session by default.

## Login Options

GitHub OAuth is the preferred login method for reader comments. Email/password login is available as a fallback.

Create a GitHub OAuth app for each environment that needs its own callback URL:

```txt
http://localhost:3000/api/auth/callback/github
https://your-domain.com/api/auth/callback/github
```

GitHub OAuth apps have one authorization callback URL, so local and production usually use separate OAuth apps.

Set `GITHUB_CLIENT_ID` in Wrangler vars or the Cloudflare dashboard. Store `GITHUB_CLIENT_SECRET` as a Wrangler secret for production and in `apps/web/.env` for local development.

## Moderation Defaults

New comments enter the moderation queue when manual approval is enabled. Approved comments are public. Blocked comments are hidden from public pages.

The admin settings page controls:

- whether comments are enabled
- whether comments require approval before publication
- whether blocked keywords automatically hide a comment
- the blocked keyword list
- whether email/password comment accounts must verify email before signing in

## Keyword Blocking

Use blocked keywords for spam, abusive language, and content that should not be publicly displayed. Keyword matches are handled server-side during comment submission.

When auto-blocking is enabled, a matching comment is marked as `spam`. When auto-blocking is disabled, the moderation queue still shows the comment so an admin can decide manually.

## Admin Workflow

Use `/admin/comments` to review pending and blocked comments. Admins can approve, mark as spam, or delete comments.

Use `/admin/settings` to change the default approval mode, keyword blocking behavior, and optional email verification without redeploying the site. Email verification requires Cloudflare Email Sending or Resend configuration.
