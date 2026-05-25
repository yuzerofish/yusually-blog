import { useAuthSuspense } from "@repo/auth/tanstack/hooks";
import { createFileRoute } from "@tanstack/react-router";

import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = useAuthSuspense();

  return (
    <div className="flex flex-col items-center gap-3 text-center text-sm">
      <h1 className="text-2xl font-semibold">{m.account_title()}</h1>
      <p className="text-muted-foreground">{m.account_signed_in_as()}</p>
      <span className="rounded-md border bg-card px-3 py-2 font-mono text-xs text-card-foreground">
        {user?.name}
      </span>
    </div>
  );
}
