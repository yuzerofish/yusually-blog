import { moderateComment } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/comments/$id/delete")({
  server: {
    handlers: {
      POST: ({ params }: { params: { id: string } }) => {
        const comment = moderateComment(params.id, "deleted");

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
