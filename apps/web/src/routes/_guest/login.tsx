import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { authQueryOptions, type AuthQueryResult } from "@repo/auth/tanstack/queries";
import { getSiteSettingsForLocale } from "@repo/core";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { redirectForRole } from "#/lib/account-routing";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_guest/login")({
  validateSearch: (search): { error?: boolean } => (search.error === "1" ? { error: true } : {}),
  component: LoginForm,
});

type AccountUser = NonNullable<AuthQueryResult>;

function LoginForm() {
  const { redirectUrl } = Route.useRouteContext();
  const search = Route.useSearch();
  const siteSettings = getSiteSettingsForLocale(getCurrentLocale());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [socialPendingProvider, setSocialPendingProvider] = useState<"GitHub" | "Google" | null>(
    null,
  );

  const { mutate: emailLoginMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/account/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { data?: AccountUser; error?: string };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error || m.login_error());
      }

      return payload.data;
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.login_error());
    },
    onSuccess: async (user) => {
      queryClient.setQueryData(authQueryOptions().queryKey, user);
      await navigate({ to: redirectForRole(user, redirectUrl) });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || socialPendingProvider) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    emailLoginMutate({ email, password });
  };

  const isLoginPending = isPending || Boolean(socialPendingProvider);

  const handleSocialLogin = (
    provider: "GitHub" | "Google",
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (isLoginPending) {
      event.preventDefault();
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const href = event.currentTarget.href;
    setSocialPendingProvider(provider);
    window.setTimeout(() => {
      window.location.assign(href);
    }, 50);
  };

  return (
    <div className="flex flex-col gap-6">
      <form action="/api/account/login" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link to="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
                <BookOpenIcon className="size-5" />
              </div>
              <span className="sr-only">{siteSettings.name}</span>
            </Link>
            <h1 className="text-xl font-bold">{m.login_greeting({ name: siteSettings.name })}</h1>
          </div>
          {search.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {m.login_error()}
            </p>
          ) : null}
          <div className="grid gap-3">
            <a
              href={accountSocialLoginHref("github", redirectUrl)}
              aria-disabled={isLoginPending}
              onClick={(event) => handleSocialLogin("GitHub", event)}
              className={buttonVariants({
                variant: "secondary",
                className: isLoginPending
                  ? "w-full justify-center pointer-events-none opacity-45"
                  : "w-full justify-center",
              })}
            >
              {socialPendingProvider === "GitHub" ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : (
                <SiGithub className="size-4" />
              )}
              {socialPendingProvider === "GitHub"
                ? m.login_social_pending({ provider: "GitHub" })
                : m.login_with_provider({ provider: "GitHub" })}
            </a>
            <a
              href={accountSocialLoginHref("google", redirectUrl)}
              aria-disabled={isLoginPending}
              onClick={(event) => handleSocialLogin("Google", event)}
              className={buttonVariants({
                variant: "secondary",
                className: isLoginPending
                  ? "w-full justify-center pointer-events-none opacity-45"
                  : "w-full justify-center",
              })}
            >
              {socialPendingProvider === "Google" ? (
                <LoaderCircleIcon className="size-4 animate-spin" />
              ) : (
                <SiGoogle className="size-4" />
              )}
              {socialPendingProvider === "Google"
                ? m.login_social_pending({ provider: "Google" })
                : m.login_with_provider({ provider: "Google" })}
            </a>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {m.login_alternative()}
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">{m.login_email()}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                autoComplete="email"
                readOnly={isLoginPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="password">{m.login_password()}</Label>
                <Link to="/reset-password" className="text-sm underline underline-offset-4">
                  {m.password_reset_link()}
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={m.login_password_placeholder()}
                autoComplete="current-password"
                readOnly={isLoginPending}
                required
              />
            </div>
            <Button type="submit" className="mt-2 w-full" size="lg" disabled={isLoginPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isPending ? m.login_pending() : m.login()}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-center text-sm">
        {m.login_no_account()}{" "}
        <Link to="/signup" className="underline underline-offset-4">
          {m.signup()}
        </Link>
      </div>
    </div>
  );
}

function accountSocialLoginHref(provider: "github" | "google", redirectTo: string) {
  return `/api/account/login/${provider}/start?redirectTo=${encodeURIComponent(redirectTo)}`;
}
