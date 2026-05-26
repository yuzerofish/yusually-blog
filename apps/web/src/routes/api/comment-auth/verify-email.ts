import { createFileRoute } from "@tanstack/react-router";

import { confirmCommentEmailVerification } from "#/lib/email-verification";

export const Route = createFileRoute("/api/comment-auth/verify-email")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const result = await confirmCommentEmailVerification({
          token: url.searchParams.get("token") ?? "",
          userId: url.searchParams.get("userId") ?? "",
        }).catch(() => ({ ok: false as const }));

        return new Response(renderVerificationPage(result.ok), {
          headers: {
            "cache-control": "no-store",
            "content-type": "text/html; charset=utf-8",
          },
          status: result.ok ? 200 : 400,
        });
      },
    },
  },
});

function renderVerificationPage(success: boolean) {
  const title = success ? "Email verified" : "Verification link expired";
  const body = success
    ? "Your email address is verified. You can return to the article and sign in."
    : "This verification link is invalid or expired. Create the account again to receive a new link.";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; background: #f7f5ef; color: #1f2933; }
    main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    section { max-width: 460px; border: 1px solid #ded8cb; border-radius: 12px; background: #fffaf1; padding: 28px; box-shadow: 0 20px 45px rgba(31, 41, 51, 0.08); }
    h1 { margin: 0; font-size: 24px; line-height: 1.2; }
    p { margin: 12px 0 0; color: #52616b; line-height: 1.6; }
    a { display: inline-flex; margin-top: 20px; color: #0f766e; font-weight: 600; }
  </style>
</head>
<body>
  <main>
    <section>
      <h1>${title}</h1>
      <p>${body}</p>
      <a href="/">Return to site</a>
    </section>
  </main>
</body>
</html>`;
}
