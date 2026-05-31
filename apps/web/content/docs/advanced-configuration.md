---
title: Advanced configuration
description: Optional email, comment OAuth, and Turnstile setup.
---

The starter does not require email delivery, comment OAuth, or Cloudflare Turnstile for the first run. The admin settings page only detects whether these optional integrations are configured. It does not write Cloudflare secrets, create OAuth apps, or change provider accounts.

After changing Cloudflare vars, secrets, or bindings, redeploy the Worker and refresh `/admin/settings`.

## Email Delivery

Email delivery is an advanced optional feature. The blog can publish posts, accept comments, and run the moderation queue without it.

After email delivery is configured, the blog can:

- send an admin email when a reader submits a new comment
- send password reset links for admin accounts
- send import, export, and backup completion notices
- support admin-enabled email verification for email/password comment accounts

Leave email delivery disabled when you do not need outbound email. The core publishing and comment workflows continue to work.

### Cloudflare Email Service

Add an email binding named `CMS_EMAIL` and enable sending vars in `apps/web/wrangler.jsonc`:

```jsonc
{
  "send_email": [
    {
      "name": "CMS_EMAIL",
      "allowed_sender_addresses": ["noreply@your-domain.com"],
    },
  ],
  "vars": {
    "CMS_EMAIL_SENDING_ENABLED": "true",
    "CMS_EMAIL_FROM": "noreply@your-domain.com",
    "CMS_EMAIL_TO": "you@your-domain.com",
  },
}
```

`CMS_EMAIL_FROM` is the sender address. `CMS_EMAIL_TO` receives admin notices when an action does not provide a more specific recipient.

### Resend

Use Resend instead of the Cloudflare binding by adding a from address and API key:

```jsonc
{
  "vars": {
    "RESEND_FROM_EMAIL": "noreply@your-domain.com",
  },
}
```

```sh
pnpm --filter @repo/web exec wrangler secret put RESEND_API_KEY --config wrangler.jsonc
```

When either Cloudflare Email Service or Resend is detected, the admin settings page can enable email verification for new email/password comment accounts.

## GitHub OAuth

GitHub OAuth adds a one-click reader login option for comments. Email/password comment login remains available when GitHub OAuth is not configured.

Create a GitHub OAuth app for each environment that needs its own callback URL. GitHub OAuth apps have one authorization callback URL, so local and production usually use separate OAuth apps.

Use these callback URLs:

```txt
http://localhost:3000/api/auth/callback/github
https://your-domain.com/api/auth/callback/github
```

Set the client id as a Wrangler var or dashboard variable:

```jsonc
{
  "vars": {
    "GITHUB_CLIENT_ID": "your-client-id",
  },
}
```

Store the client secret as a Wrangler secret:

```sh
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

For local development, put both values in `apps/web/.env`.

## Google OAuth

Google OAuth adds another one-click reader login option for comments. Email/password and any configured GitHub login remain available when Google OAuth is not configured.

Create a Google OAuth client and add the callback URLs as authorized redirect URIs:

```txt
http://localhost:3000/api/auth/callback/google
https://your-domain.com/api/auth/callback/google
```

Set the client id as a Wrangler var or dashboard variable:

```jsonc
{
  "vars": {
    "GOOGLE_CLIENT_ID": "your-client-id",
  },
}
```

Store the client secret as a Wrangler secret:

```sh
pnpm --filter @repo/web exec wrangler secret put GOOGLE_CLIENT_SECRET --config wrangler.jsonc
```

For local development, put both values in `apps/web/.env`.

## Cloudflare Turnstile

Turnstile is optional spam protection for comment submission. Comments still require a reader session and still use server-side rate limits and moderation when Turnstile is not configured.

Create a Turnstile widget in Cloudflare and allow the hostnames where your blog runs. The widget gives you two values:

- site key: public key used by the browser
- secret key: private key used by the Worker to validate tokens

Set the public site key as a Wrangler var:

```jsonc
{
  "vars": {
    "VITE_TURNSTILE_SITE_KEY": "your-site-key",
  },
}
```

Store the secret key as a Wrangler secret:

```sh
pnpm --filter @repo/web exec wrangler secret put CMS_TURNSTILE_SECRET_KEY --config wrangler.jsonc
```

Turnstile is only enforced when both `VITE_TURNSTILE_SITE_KEY` and `CMS_TURNSTILE_SECRET_KEY` are present.

## Check Status

Open `/admin/settings` and review Advanced configuration. The status checks:

- email delivery: `CMS_EMAIL` binding plus email vars, or Resend vars and secret
- GitHub OAuth: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
- Google OAuth: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Turnstile: `VITE_TURNSTILE_SITE_KEY` and `CMS_TURNSTILE_SECRET_KEY`

External references:

- [Cloudflare Email Service Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)
- [Cloudflare Turnstile get started](https://developers.cloudflare.com/turnstile/get-started/)
- [GitHub OAuth app setup](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Google OAuth client setup](https://support.google.com/cloud/answer/6158849)
