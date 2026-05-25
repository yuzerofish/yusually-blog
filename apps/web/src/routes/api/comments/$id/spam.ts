import { comments } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { jsonResponse } from "#/lib/cms-api";

export const Route = createFileRoute("/api/comments/$id/spam")({
  server: {
    handlers: {
      POST: ({ params }: { params: { id: string } }) => {
        const comment = comments.find((candidate) => candidate.id === params.id);

        if (!comment) {
          return jsonResponse({ error: "Comment not found" }, { status: 404 });
        }

        return jsonResponse({
          data: { ...comment, status: "spam", updatedAt: new Date().toISOString() },
          requiredScope: "comments:moderate",
        });
      },
    },
  },
});
