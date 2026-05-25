import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { getCommentUserFromRequest, publicCommentUser } from "#/lib/comment-auth";

export const Route = createFileRoute("/api/comment-auth/me")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const user = await getCommentUserFromRequest(request);

        return jsonResponse({ data: user ? publicCommentUser(user) : null });
      },
    },
  },
});
