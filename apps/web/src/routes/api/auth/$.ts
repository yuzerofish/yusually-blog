import { createFileRoute } from "@tanstack/react-router";

import { auth } from "#/lib/auth";
import { getSetCookieValues } from "#/lib/auth-helpers";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return normalizeAuthResponse(await auth.handler(request));
      },
      POST: async ({ request }) => {
        return normalizeAuthResponse(await auth.handler(request));
      },
    },
  },
});

function normalizeAuthResponse(response: Response) {
  const headers = new Headers();

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      headers.append(key, value);
    }
  });

  for (const cookie of getSetCookieValues(response.headers)) {
    headers.append("set-cookie", cookie);
  }

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}
