import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

import { LanguageToggle } from "#/components/language-toggle";
import { SignOutButton } from "#/components/sign-out-button";
import { ThemeToggle } from "#/components/theme-toggle";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-svh bg-muted/20">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Button render={<Link to="/" />} variant="ghost" size="sm" nativeButton={false}>
            <HomeIcon className="size-4" />
            {m.back_home()}
          </Button>

          <div className="flex items-center gap-1.5">
            <LanguageToggle />
            <ThemeToggle />
            <SignOutButton className="hidden sm:block" buttonClassName="px-3" size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <Outlet />
      </main>

      <div className="mx-auto w-full max-w-5xl px-4 pb-6 sm:hidden">
        <SignOutButton className="w-full" buttonClassName="w-full" size="default" />
      </div>
    </div>
  );
}
