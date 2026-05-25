import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { authClient } from "@repo/auth/auth-client";
import { getSiteSettingsForLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { SignInSocialButton } from "#/components/sign-in-social-button";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_guest/login")({
  component: LoginForm,
});

function LoginForm() {
  const { redirectUrl } = Route.useRouteContext();
  const siteSettings = getSiteSettingsForLocale(getCurrentLocale());

  const { mutate: emailLoginMutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      await authClient.signIn.email(
        {
          ...data,
          callbackURL: redirectUrl,
        },
        {
          onError: ({ error }) => {
            toast.error(error.message || m.login_error());
          },
          // better-auth seems to trigger a hard navigation on login,
          // so we don't have to revalidate & navigate ourselves
          // onSuccess: () => {
          //   queryClient.removeQueries({ queryKey: authQueryOptions().queryKey });
          //   navigate({ to: redirectUrl });
          // },
        },
      ),
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1f6f5b] text-white">
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
              <Label htmlFor="password">{m.login_password()}</Label>
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
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              {m.login_alternative()}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SignInSocialButton
              provider="github"
              callbackURL={redirectUrl}
              disabled={isPending}
              icon={<SiGithub className="size-4" />}
            />
            <SignInSocialButton
              provider="google"
              callbackURL={redirectUrl}
              disabled={isPending}
              icon={<SiGoogle className="size-4" />}
            />
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
