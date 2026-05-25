import { moderateComment } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";
import { moderateD1Comment } from "#/lib/cms-d1";

export const Route = createFileRoute("/api/comments/$id/delete")({
  server: {
    handlers: {
      POST: async ({ params }: { params: { id: string } }) => {
        const comment =
          (await moderateD1Comment(params.id, "deleted")) ?? moderateComment(params.id, "deleted");

        if (!comment) {
          return jsonResponse({ error: "Comment not found" }, { status: 404 });
        }

        return jsonResponse({
          data: { ...comment, updatedAt: new Date().toISOString() },
          requiredScope: "comments:moderate",
        });
      },
    },
  },
});
