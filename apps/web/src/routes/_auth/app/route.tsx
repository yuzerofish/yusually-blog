import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { LanguageToggle } from "#/components/language-toggle";
import { SignOutButton } from "#/components/sign-out-button";
import { ThemeToggle } from "#/components/theme-toggle";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 px-2">
      <div className="flex w-full max-w-3xl justify-between">
        <div className="flex items-center gap-1">
          <Button render={<Link to="/" />} size="sm" nativeButton={false}>
            {m.back_home()}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full max-w-3xl rounded-md border p-2">
        <Outlet />
      </div>

      <div className="flex w-full max-w-3xl flex-wrap justify-between gap-2 text-sm">
        <div className="flex flex-col gap-0.5">{m.account_management_note()}</div>
        <SignOutButton />
      </div>
    </div>
  );
}
