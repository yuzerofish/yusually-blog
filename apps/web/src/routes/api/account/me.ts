import { createFileRoute } from "@tanstack/react-router";

import { getAccountUserFromRequest } from "#/lib/account-auth";
import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/account/me")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const url = new URL(request.url);
        const user = await getAccountUserFromRequest(request, {
          disableCookieCache: url.searchParams.get("disableCookieCache") === "true",
          disableRefresh: url.searchParams.get("disableRefresh") === "true",
        });

        if (!user) {
          return jsonResponse({ data: null }, { status: 401 });
        }

        return jsonResponse({ data: user });
      },
    },
  },
});
