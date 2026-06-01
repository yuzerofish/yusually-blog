import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import type { EmailPreference } from "@repo/core";
import { Button, buttonVariants } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { CheckIcon, LoaderCircleIcon, LogOutIcon, MailIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

type CommentFormProps = {
  readonly postSlug: string;
  readonly turnstileSiteKey?: string | null;
  readonly parentId?: string | null;
  readonly replyingTo?: string | null;
  readonly onCancelReply?: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";
type AuthState = "idle" | "submitting" | "error" | "verification";
type AuthMode = "login" | "signup";
type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

type CommentAuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  provider: "email" | "github" | "google";
  commentStatus?: "active" | "muted";
  commentReplyNotificationsEnabled: boolean;
  emailPreference: EmailPreference;
  marketingOptOut: boolean;
};

export function CommentForm({
  onCancelReply,
  parentId,
  postSlug,
  replyingTo,
  turnstileSiteKey,
}: CommentFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [user, setUser] = useState<CommentAuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [emailPreferenceStatus, setEmailPreferenceStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const emailCopy = getCommentEmailPreferenceCopy(getCurrentLocale());

  useEffect(() => {
    let ignore = false;

    void fetch("/api/comment-auth/me", { credentials: "same-origin" })
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
    const form = event.currentTarget;
    const formData = new FormData(form);
    const turnstileToken = turnstileSiteKey ? formData.get("cf-turnstile-response") : undefined;

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          postSlug,
          body: formData.get("body"),
          ...(parentId ? { parentId } : {}),
          honeypot: formData.get("company"),
          turnstileToken,
        }),
      });

      setState(response.ok ? "success" : "error");
      if (response.ok) {
        form.reset();
        onCancelReply?.();
      }
    } catch {
      setState("error");
    }
  };

  const handleEmailAuth: FormSubmitHandler = async (event) => {
    event.preventDefault();
    if (authState === "submitting") return;

    setAuthState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    let response: Response;
    let payload: {
      data?: CommentAuthUser | null;
      verificationRequired?: boolean;
    };

    try {
      const nameInput = formData.get("name");
      const name = typeof nameInput === "string" ? nameInput.trim() : "";

      if (authMode === "signup" && !name) {
        setAuthState("error");
        return;
      }

      response = await fetch(`/api/comment-auth/${authMode}`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email: formData.get("email"),
          emailPreference: formData.get("emailPreference"),
          password: formData.get("password"),
        }),
      });
      payload = (await response.json().catch(() => ({}))) as typeof payload;
    } catch {
      setAuthState("error");
      return;
    }

    if (payload.verificationRequired) {
      setAuthState("verification");
      form.reset();
      return;
    }

    if (!response.ok || !payload.data) {
      setAuthState("error");
      return;
    }

    setUser(payload.data);
    setAuthState("idle");
    form.reset();
  };

  const updateEmailPreference = async (
    input: Partial<Pick<CommentAuthUser, "commentReplyNotificationsEnabled" | "emailPreference">>,
  ) => {
    setEmailPreferenceStatus("saving");
    const response = await fetch("/api/account/email-preferences", {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }).catch(() => null);

    if (!response?.ok) {
      setEmailPreferenceStatus("idle");
      return;
    }

    const payload = (await response.json()) as {
      data?: {
        commentReplyNotificationsEnabled: boolean;
        emailPreference: EmailPreference;
        marketingOptOut: boolean;
      };
    };

    if (payload.data) {
      setUser((current) => (current ? { ...current, ...payload.data } : current));
    }

    setEmailPreferenceStatus("saved");
    window.setTimeout(() => setEmailPreferenceStatus("idle"), 1800);
  };

  const handleLogout = async () => {
    await fetch("/api/comment-auth/logout", { method: "POST", credentials: "same-origin" });
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
            href={socialLoginHref("github", postSlug)}
            className={buttonVariants({ variant: "secondary", className: "w-full justify-center" })}
          >
            <SiGithub className="size-4" />
            {m.comment_continue_github()}
          </a>
          <a
            href={socialLoginHref("google", postSlug)}
            className={buttonVariants({ variant: "secondary", className: "w-full justify-center" })}
          >
            <SiGoogle className="size-4" />
            {m.comment_continue_google()}
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
                <Input
                  id="comment-auth-name"
                  name="name"
                  autoComplete="username"
                  maxLength={80}
                  required
                />
              </div>
            ) : null}
            <div className="grid gap-2">
              <Label htmlFor="comment-auth-email">{m.login_email()}</Label>
              <Input
                id="comment-auth-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment-auth-password">{m.login_password()}</Label>
              <Input
                id="comment-auth-password"
                name="password"
                type="password"
                autoComplete={authMode === "login" ? "current-password" : "new-password"}
                minLength={8}
                required
              />
            </div>
            {authMode === "signup" ? (
              <div className="flex items-start gap-2 rounded-md border border-border bg-muted/30 p-3 text-sm">
                <input
                  id="comment-auth-email-preference"
                  type="checkbox"
                  name="emailPreference"
                  value="biweekly_digest"
                  className="mt-0.5 size-4 rounded border-input accent-primary"
                />
                <label htmlFor="comment-auth-email-preference" className="cursor-pointer">
                  <span className="block font-medium">{emailCopy.weekly}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {emailCopy.weeklyDescription}
                  </span>
                </label>
              </div>
            ) : null}
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

  if (user.commentStatus === "muted") {
    return (
      <div className="mt-6 rounded-md border border-border bg-muted/35 p-4">
        <h3 className="font-semibold">{m.comment_account_muted()}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {m.comment_account_muted_description()}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => void handleLogout()}
        >
          <LogOutIcon className="size-4" />
          {m.sign_out()}
        </Button>
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
      <div className="grid gap-2 rounded-md border border-border bg-muted/30 p-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(190px,0.6fr)] sm:items-center">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MailIcon className="mt-0.5 size-4 text-link" />
          <div>
            <p className="font-medium text-foreground">{emailCopy.title}</p>
            <p className="mt-1 text-xs leading-5">{emailCopy.description}</p>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={emailCopy.title}>
            {emailCopy.options.map((option) => {
              const selected = user.emailPreference === option.value;

              return (
                <label
                  key={option.value}
                  className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border px-2 text-xs font-medium transition ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/45"
                  } ${
                    emailPreferenceStatus === "saving"
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="comment-email-preference"
                    value={option.value}
                    checked={selected}
                    disabled={emailPreferenceStatus === "saving"}
                    onChange={() => void updateEmailPreference({ emailPreference: option.value })}
                    className="sr-only"
                  />
                  {selected ? <CheckIcon className="size-3.5" /> : null}
                  {option.label}
                </label>
              );
            })}
          </div>
          {emailPreferenceStatus === "saved" ? (
            <p className="text-xs text-success">{emailCopy.saved}</p>
          ) : null}
          <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <input
              type="checkbox"
              checked={user.commentReplyNotificationsEnabled}
              disabled={emailPreferenceStatus === "saving"}
              onChange={(event) =>
                void updateEmailPreference({
                  commentReplyNotificationsEnabled: event.currentTarget.checked,
                })
              }
              className="mt-0.5 size-3.5 rounded border-input accent-primary"
            />
            <span>{emailCopy.commentReplies}</span>
          </label>
        </div>
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

function socialLoginHref(provider: "github" | "google", postSlug: string) {
  const redirectTo =
    typeof window === "undefined"
      ? `/blog/${postSlug}#comments`
      : `${window.location.pathname}${window.location.search}#comments`;

  return `/api/comment-auth/${provider}/start?redirectTo=${encodeURIComponent(redirectTo)}`;
}

function getCommentEmailPreferenceCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      commentReplies: "有人回复我的评论时通知我",
      description: "选择这个账号是否接收每周博客更新。",
      options: [
        { label: "不订阅", value: "none" },
        { label: "每周更新", value: "biweekly_digest" },
      ] satisfies Array<{ label: string; value: EmailPreference }>,
      saved: "邮件偏好已保存",
      title: "博客更新邮件",
      weekly: "订阅每周博客更新",
      weeklyDescription: "每周汇总新文章发送到邮箱。",
    };
  }

  return {
    commentReplies: "Notify me when someone replies to my comments",
    description: "Choose whether this account receives weekly blog updates.",
    options: [
      { label: "No email", value: "none" },
      { label: "Weekly", value: "biweekly_digest" },
    ] satisfies Array<{ label: string; value: EmailPreference }>,
    saved: "Email preference saved",
    title: "Blog update emails",
    weekly: "Subscribe to weekly blog updates",
    weeklyDescription: "Get a weekly email with the latest posts.",
  };
}
