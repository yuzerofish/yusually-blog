import { authQueryOptions } from "@repo/auth/tanstack/queries";
import { getSiteSettingsForLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpenIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_guest/login")({
  component: LoginForm,
});

function LoginForm() {
  const { redirectUrl } = Route.useRouteContext();
  const siteSettings = getSiteSettingsForLocale(getCurrentLocale());
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: emailLoginMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || m.login_error());
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.login_error());
    },
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: authQueryOptions().queryKey });
      await navigate({ to: redirectUrl });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    emailLoginMutate({ email, password });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
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
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">{m.login_email()}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                readOnly={isPending}
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
                readOnly={isPending}
                required
              />
            </div>
            <Button type="submit" className="mt-2 w-full" size="lg" disabled={isPending}>
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
