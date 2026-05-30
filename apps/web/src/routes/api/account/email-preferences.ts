import { createFileRoute } from "@tanstack/react-router";

import { auth } from "#/lib/auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { getCmsUserById, isEmailPreference, updateCmsUser } from "#/lib/cms-users";

type EmailPreferenceUpdate = {
  emailPreference?: Parameters<typeof updateCmsUser>[1]["emailPreference"];
  marketingOptOut?: boolean;
};

export const Route = createFileRoute("/api/account/email-preferences")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const user = await getCurrentUser(request);

        if (!user) {
          return jsonResponse({ error: "Authentication required" }, { status: 401 });
        }

        return jsonResponse({
          data: {
            emailPreference: user.emailPreference,
            marketingOptOut: user.marketingOptOut,
          },
        });
      },
      PATCH: async ({ request }: { request: Request }) => {
        const user = await getCurrentUser(request);

        if (!user) {
          return jsonResponse({ error: "Authentication required" }, { status: 401 });
        }

        const rawBody = await readJsonBody<{
          emailPreference?: unknown;
          marketingOptOut?: unknown;
        }>(request);
        const body = rawBody && typeof rawBody === "object" ? rawBody : {};
        const updates: EmailPreferenceUpdate = {};

        if ("emailPreference" in body) {
          if (!isEmailPreference(body.emailPreference)) {
            return jsonResponse({ error: "Invalid email preference" }, { status: 400 });
          }

          updates.emailPreference = body.emailPreference;
        }

        if ("marketingOptOut" in body) {
          if (typeof body.marketingOptOut !== "boolean") {
            return jsonResponse({ error: "Invalid announcement preference" }, { status: 400 });
          }

          updates.marketingOptOut = body.marketingOptOut;
        }

        const updated = await updateCmsUser(user.id, updates);

        return jsonResponse({
          data: {
            emailPreference: updated?.emailPreference ?? user.emailPreference,
            marketingOptOut: updated?.marketingOptOut ?? user.marketingOptOut,
          },
        });
      },
    },
  },
});

async function getCurrentUser(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user?.id) {
    return null;
  }

  return getCmsUserById(session.user.id);
}
