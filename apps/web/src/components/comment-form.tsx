import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { LoaderCircleIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { m } from "#/paraglide/messages.js";

type CommentFormProps = {
  readonly postSlug: string;
  readonly parentId?: string | null;
  readonly replyingTo?: string | null;
  readonly onCancelReply?: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";
type AuthState = "idle" | "submitting" | "error" | "verification";
type AuthMode = "login" | "signup";
type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

type CommentAuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  provider: "email" | "github";
};

export function CommentForm({ onCancelReply, parentId, postSlug, replyingTo }: CommentFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<CommentAuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    void fetch("/api/comment-auth/me")
      .then(async (response) =>
        response.ok ? ((await response.json()) as { data?: CommentAuthUser | null }) : undefined,
      )
      .then((payload) => {
        if (!ignore) {
          setUser(payload?.data ?? null);
          setAuthLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setAuthLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        postSlug,
        authorWebsite: formData.get("authorWebsite"),
        body: formData.get("body"),
        parentId,
        honeypot: formData.get("company"),
        turnstileToken: formData.get("cf-turnstile-response"),
      }),
    });

    setState(response.ok ? "success" : "error");
    if (response.ok) {
      event.currentTarget.reset();
      onCancelReply?.();
    }
  };

  const handleEmailAuth: FormSubmitHandler = async (event) => {
    event.preventDefault();
    if (authState === "submitting") return;

    setAuthState("submitting");
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/comment-auth/${authMode}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const payload = (await response.json()) as {
      data?: CommentAuthUser | null;
      verificationRequired?: boolean;
    };

    if (payload.verificationRequired) {
      setAuthState("verification");
      event.currentTarget.reset();
      return;
    }

    if (!response.ok || !payload.data) {
      setAuthState("error");
      return;
    }

    setUser(payload.data);
    setAuthState("idle");
    event.currentTarget.reset();
  };

  const handleLogout = async () => {
    await fetch("/api/comment-auth/logout", { method: "POST" });
    setUser(null);
  };

  if (authLoading) {
    return (
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <LoaderCircleIcon className="size-4 animate-spin" />
        {m.comment_auth_loading()}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-6 grid gap-4">
        <div>
          <h3 className="font-semibold">{m.comment_login_required()}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{m.comment_login_description()}</p>
        </div>

        <div className="grid gap-3">
          <a
            href={githubLoginHref(postSlug)}
            className={buttonVariants({ variant: "secondary", className: "w-full justify-center" })}
          >
            <SiGithub className="size-4" />
            {m.comment_continue_github()}
          </a>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {m.login_alternative()}
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleEmailAuth} className="grid gap-3">
            {authMode === "signup" ? (
              <div className="grid gap-2">
                <Label htmlFor="comment-auth-name">{m.signup_name()}</Label>
                <Input id="comment-auth-name" name="name" required />
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label htmlFor="comment-auth-email">{m.login_email()}</Label>
              <Input id="comment-auth-email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment-auth-password">{m.login_password()}</Label>
              <Input
                id="comment-auth-password"
                name="password"
                type="password"
                minLength={8}
                required
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={authState === "submitting"}>
                {authState === "submitting" ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : null}
                {authMode === "login" ? m.login() : m.signup()}
              </Button>
              <button
                type="button"
                className="text-sm text-link hover:underline"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  setAuthState("idle");
                }}
              >
                {authMode === "login" ? m.comment_switch_to_signup() : m.comment_switch_to_login()}
              </button>
            </div>
            {authState === "error" ? (
              <p className="text-sm text-destructive">{m.comment_auth_error()}</p>
            ) : null}
            {authState === "verification" ? (
              <p className="text-sm text-success">{m.comment_email_verification_sent()}</p>
            ) : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3 text-sm">
        <span className="text-muted-foreground">{m.comment_signed_in_as({ name: user.name })}</span>
        <button
          type="button"
          onClick={() => void handleLogout()}
          className="inline-flex items-center gap-1 font-medium text-link hover:underline"
        >
          <LogOutIcon className="size-3.5" />
          {m.sign_out()}
        </button>
      </div>
      {replyingTo ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3 text-sm text-muted-foreground">
          <span>{m.comment_replying_to({ name: replyingTo })}</span>
          <button
            type="button"
            onClick={onCancelReply}
            className="font-medium text-link hover:underline"
          >
            {m.comment_cancel_reply()}
          </button>
        </div>
      ) : null}
      <div className="grid gap-2">
        <Label htmlFor="comment-author-website">{m.comment_website()}</Label>
        <Input id="comment-author-website" name="authorWebsite" type="url" />
      </div>
      <div className="hidden">
        <Label htmlFor="comment-company">{m.comment_company()}</Label>
        <Input id="comment-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="comment-body">{m.comment_body()}</Label>
        <textarea
          id="comment-body"
          name="body"
          required
          minLength={2}
          maxLength={4000}
          className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      {turnstileSiteKey ? (
        <div>
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? m.comment_submitting() : m.submit_comment()}
        </Button>
        {state === "success" ? <p className="text-sm text-success">{m.comment_success()}</p> : null}
        {state === "error" ? <p className="text-sm text-destructive">{m.comment_error()}</p> : null}
      </div>
    </form>
  );
}

function githubLoginHref(postSlug: string) {
  const redirectTo =
    typeof window === "undefined"
      ? `/blog/${postSlug}#comments`
      : `${window.location.pathname}${window.location.search}#comments`;

  return `/api/comment-auth/github/start?redirectTo=${encodeURIComponent(redirectTo)}`;
}
