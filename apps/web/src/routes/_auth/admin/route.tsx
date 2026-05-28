import { createFileRoute, redirect } from "@tanstack/react-router";

import { AdminShell } from "#/components/admin-shell";

export const Route = createFileRoute("/_auth/admin")({
  component: AdminShell,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") {
      throw redirect({ to: "/login" });
    }
  },
});
