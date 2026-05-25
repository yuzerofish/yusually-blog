import { createFileRoute } from "@tanstack/react-router";

import { handleGitHubCommentCallback } from "#/lib/comment-auth";

export const Route = createFileRoute("/api/comment-auth/github/callback")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => handleGitHubCommentCallback(request),
    },
  },
});
