import { createFileRoute } from "@tanstack/react-router";

import { getAdminUserFromRequest } from "#/lib/admin-auth";
import { jsonResponse, readJsonBody } from "#/lib/cms-api";
import { isCommentUserStatus, updateCmsUserCommentStatus } from "#/lib/cms-users";

export const Route = createFileRoute("/api/admin/users/$id")({
  server: {
    handlers: {
      PATCH: async ({ params, request }: { params: { id: string }; request: Request }) => {
        const admin = await getAdminUserFromRequest(request).catch(() => null);

        if (!admin) {
          return jsonResponse({ error: "Admin authentication required" }, { status: 401 });
        }

        const body = await readJsonBody<{ commentStatus?: unknown }>(request);

        if (!isCommentUserStatus(body.commentStatus)) {
          return jsonResponse({ error: "Invalid comment status" }, { status: 400 });
        }

        const user = await updateCmsUserCommentStatus(params.id, body.commentStatus);

        if (!user) {
          return jsonResponse({ error: "User not found" }, { status: 404 });
        }

        return jsonResponse({ data: user });
      },
    },
  },
});
