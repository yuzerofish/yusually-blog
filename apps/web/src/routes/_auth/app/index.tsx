import type { EmailPreference } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  KeyRoundIcon,
  LoaderCircleIcon,
  MailIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = Route.useRouteContext();
  const locale = getCurrentLocale();
  const copy = getAccountEmailCopy(locale);
  const pageCopy = getAccountPageCopy(locale);
  const isAdmin = user?.role === "admin";
  const emailAddress = user?.email?.trim() ?? "";
  const [profileName, setProfileName] = useState(user?.name?.trim() ?? "");
  const displayName = profileName || emailAddress || pageCopy.fallbackName;
  const avatarInitial = displayName.slice(0, 1).toUpperCase();
  const [commentReplyNotificationsEnabled, setCommentReplyNotificationsEnabled] = useState(true);
  const [emailPreference, setEmailPreference] = useState<EmailPreference>("none");
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileMessage, setProfileMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    void fetch("/api/account/email-preferences")
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        const data = (payload as { data?: AccountEmailPreferences } | undefined)?.data;

        if (!ignore && data) {
          setCommentReplyNotificationsEnabled(data.commentReplyNotificationsEnabled);
          setEmailPreference(data.emailPreference);
          setMarketingOptOut(data.marketingOptOut);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const savePreference = async (input: Partial<AccountEmailPreferences>) => {
    setStatus("saving");
    const response = await fetch("/api/account/email-preferences", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    }).catch(() => null);

    if (!response?.ok) {
      setStatus("idle");
      return;
    }

    const payload = (await response.json()) as { data?: AccountEmailPreferences };

    if (payload.data) {
      setCommentReplyNotificationsEnabled(payload.data.commentReplyNotificationsEnabled);
      setEmailPreference(payload.data.emailPreference);
      setMarketingOptOut(payload.data.marketingOptOut);
    }

    setStatus("saved");
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  const changePassword = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordStatus === "saving") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = formDataString(formData, "current_password");
    const newPassword = formDataString(formData, "new_password");
    const confirmPassword = formDataString(formData, "confirm_password");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordStatus("error");
      setPasswordMessage(pageCopy.passwordRequired);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus("error");
      setPasswordMessage(pageCopy.passwordMismatch);
      return;
    }

    setPasswordStatus("saving");
    setPasswordMessage("");

    const response = await fetch("/api/account/password", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    }).catch(() => null);

    if (!response?.ok) {
      const payload = response
        ? ((await response.json().catch(() => null)) as { error?: string } | null)
        : null;
      setPasswordStatus("error");
      setPasswordMessage(payload?.error || pageCopy.passwordError);
      return;
    }

    form.reset();
    setPasswordStatus("saved");
    setPasswordMessage(pageCopy.passwordSaved);
    window.setTimeout(() => {
      setPasswordStatus("idle");
      setPasswordMessage("");
    }, 2400);
  };

  const updateProfile = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (profileStatus === "saving") {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = formDataString(formData, "name").replace(/\s+/g, " ").trim();

    if (!name) {
      setProfileStatus("error");
      setProfileMessage(pageCopy.profileRequired);
      return;
    }

    setProfileStatus("saving");
    setProfileMessage("");

    const response = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    }).catch(() => null);

    if (!response?.ok) {
      const payload = response
        ? ((await response.json().catch(() => null)) as { error?: string } | null)
        : null;
      setProfileStatus("error");
      setProfileMessage(payload?.error || pageCopy.profileError);
      return;
    }

    const payload = (await response.json()) as { data?: { name?: string } };
    setProfileName(payload.data?.name?.trim() || name);
    setProfileStatus("saved");
    setProfileMessage(pageCopy.profileSaved);
    window.setTimeout(() => {
      setProfileStatus("idle");
      setProfileMessage("");
    }, 1800);
  };

  return (
    <div className="grid gap-5 text-sm">
      <section className="rounded-md border border-border bg-card p-5 shadow-xs sm:p-6">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {pageCopy.eyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              {m.account_title()}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{pageCopy.description}</p>
          </div>

          {isAdmin ? (
            <Button render={<Link to="/admin" />} nativeButton={false} className="w-full md:w-auto">
              <ShieldCheckIcon className="size-4" />
              {m.open_admin()}
              <ArrowRightIcon className="size-4" />
            </Button>
          ) : null}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="grid gap-5">
          <section className="rounded-md border border-border bg-card p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground">
                {avatarInitial}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">{pageCopy.profileTitle}</h2>
                  {isAdmin ? (
                    <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {pageCopy.adminBadge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-muted-foreground">{m.account_signed_in_as()}</p>
                {emailAddress ? (
                  <p className="mt-1 font-mono text-xs break-all text-muted-foreground">
                    {emailAddress}
                  </p>
                ) : null}
              </div>
            </div>

            <dl className="mt-5 grid gap-4">
              <div className="grid gap-1">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">
                  {pageCopy.nameLabel}
                </dt>
                <dd className="font-medium break-words">{displayName}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">
                  {pageCopy.emailLabel}
                </dt>
                <dd className="font-mono text-xs break-all text-muted-foreground">
                  {emailAddress}
                </dd>
              </div>
            </dl>
            <form
              onSubmit={updateProfile}
              className="mt-5 grid gap-3 border-t border-border/80 pt-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="account-profile-name">{pageCopy.nameEditLabel}</Label>
                <Input
                  id="account-profile-name"
                  name="name"
                  type="text"
                  defaultValue={displayName}
                  maxLength={80}
                  readOnly={profileStatus === "saving"}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full sm:w-fit"
                disabled={profileStatus === "saving"}
              >
                {profileStatus === "saving" ? <LoaderCircleIcon className="animate-spin" /> : null}
                {profileStatus === "saving" ? pageCopy.profileSaving : pageCopy.profileAction}
              </Button>
              {profileMessage ? (
                <p
                  className={`text-sm ${
                    profileStatus === "error" ? "text-destructive" : "text-muted-foreground"
                  }`}
                  aria-live="polite"
                >
                  {profileMessage}
                </p>
              ) : null}
            </form>
          </section>

          <section className="rounded-md border border-border bg-card p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <KeyRoundIcon className="mt-1 size-5 text-link" />
              <div>
                <h2 className="font-semibold">{pageCopy.securityTitle}</h2>
                <p className="mt-1 text-muted-foreground">{pageCopy.securityDescription}</p>
              </div>
            </div>

            <form onSubmit={changePassword} className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current_password">{pageCopy.currentPassword}</Label>
                <Input
                  id="current_password"
                  name="current_password"
                  type="password"
                  autoComplete="current-password"
                  readOnly={passwordStatus === "saving"}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new_password">{pageCopy.newPassword}</Label>
                <Input
                  id="new_password"
                  name="new_password"
                  type="password"
                  autoComplete="new-password"
                  readOnly={passwordStatus === "saving"}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">{pageCopy.confirmPassword}</Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  readOnly={passwordStatus === "saving"}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-fit"
                disabled={passwordStatus === "saving"}
              >
                {passwordStatus === "saving" ? <LoaderCircleIcon className="animate-spin" /> : null}
                {passwordStatus === "saving" ? pageCopy.passwordSaving : pageCopy.passwordAction}
              </Button>
            </form>

            {passwordMessage ? (
              <p
                className={`mt-4 text-sm ${
                  passwordStatus === "error" ? "text-destructive" : "text-muted-foreground"
                }`}
                aria-live="polite"
              >
                {passwordMessage}
              </p>
            ) : null}
          </section>
        </div>

        <section className="rounded-md border border-border bg-card p-5 text-left shadow-xs">
          <div className="flex items-start gap-3">
            <MailIcon className="mt-1 size-5 text-link" />
            <div>
              <h2 className="font-semibold">{copy.title}</h2>
              <p className="mt-1 text-muted-foreground">{copy.description}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <p className="font-medium">{copy.blogFrequency}</p>
              <div
                className="grid gap-2 sm:grid-cols-2"
                role="radiogroup"
                aria-label={copy.blogFrequency}
              >
                {copy.blogOptions.map((option) => {
                  const selected = emailPreference === option.value;

                  return (
                    <label
                      key={option.value}
                      onClick={(event) => {
                        if (selected || status === "saving") {
                          return;
                        }

                        event.preventDefault();
                        void savePreference({ emailPreference: option.value });
                      }}
                      className={`grid min-h-24 gap-2 rounded-md border p-4 text-left transition ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground shadow-xs"
                          : "border-border bg-muted/35 text-muted-foreground hover:border-primary/45 hover:bg-muted/55"
                      } ${status === "saving" ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name="account-email-preference"
                        value={option.value}
                        checked={selected}
                        disabled={status === "saving"}
                        onChange={() => void savePreference({ emailPreference: option.value })}
                        className="sr-only"
                      />
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-medium text-foreground">{option.label}</span>
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background"
                          }`}
                        >
                          {selected ? <CheckIcon className="size-3.5" /> : null}
                        </span>
                      </span>
                      <span className="text-xs leading-5">{option.description}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-muted/40 p-3">
              <input
                id="account-comment-reply-notifications"
                type="checkbox"
                checked={commentReplyNotificationsEnabled}
                disabled={status === "saving"}
                onChange={(event) =>
                  void savePreference({
                    commentReplyNotificationsEnabled: event.currentTarget.checked,
                  })
                }
                className="mt-1 size-4 rounded border-input accent-primary"
              />
              <label htmlFor="account-comment-reply-notifications" className="cursor-pointer">
                <span className="font-medium">{copy.commentReplies}</span>
                <span className="mt-1 block text-muted-foreground">
                  {copy.commentRepliesDescription}
                </span>
              </label>
            </div>

            <div className="grid gap-3 rounded-md bg-muted/40 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="flex items-start gap-3">
                <BellIcon className="mt-1 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{copy.announcements}</h3>
                  <p className="mt-1 text-muted-foreground">{copy.announcementsDescription}</p>
                </div>
              </div>
              <Button
                type="button"
                variant={marketingOptOut ? "outline" : "secondary"}
                size="sm"
                disabled={status === "saving"}
                onClick={() => void savePreference({ marketingOptOut: !marketingOptOut })}
                className="w-full sm:w-auto"
              >
                {marketingOptOut ? copy.allowAnnouncements : copy.stopAnnouncements}
              </Button>
            </div>
          </div>

          {status !== "idle" ? (
            <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
              {status === "saving" ? copy.saving : copy.saved}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}

type AccountEmailPreferences = {
  commentReplyNotificationsEnabled: boolean;
  emailPreference: EmailPreference;
  marketingOptOut: boolean;
};

function formDataString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function getAccountPageCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      adminBadge: "站点管理",
      description: "查看登录信息，调整评论回复和博客更新邮件。",
      emailLabel: "邮箱",
      eyebrow: "账号中心",
      fallbackName: "用户",
      nameLabel: "姓名",
      confirmPassword: "确认新密码",
      currentPassword: "当前密码",
      newPassword: "新密码",
      passwordAction: "更新密码",
      passwordError: "密码更新失败。",
      passwordMismatch: "两次输入的新密码不一致。",
      passwordRequired: "请填写当前密码和新密码。",
      passwordSaved: "密码已更新，请使用新密码登录其他设备。",
      passwordSaving: "正在更新...",
      nameEditLabel: "显示名称",
      profileTitle: "登录信息",
      profileAction: "保存名称",
      profileError: "名称保存失败。",
      profileRequired: "请填写显示名称。",
      profileSaved: "显示名称已保存",
      profileSaving: "正在保存...",
      securityDescription:
        "修改 email/password 登录方式的密码。社交登录账号可通过重置密码邮件添加密码。",
      securityTitle: "账号安全",
    };
  }

  return {
    adminBadge: "Site management",
    description: "Review your sign-in details and choose which email updates you receive.",
    emailLabel: "Email",
    eyebrow: "Account",
    fallbackName: "User",
    nameLabel: "Name",
    confirmPassword: "Confirm new password",
    currentPassword: "Current password",
    newPassword: "New password",
    passwordAction: "Update password",
    passwordError: "Password could not be updated.",
    passwordMismatch: "New passwords do not match.",
    passwordRequired: "Current password and new password are required.",
    passwordSaved: "Password updated. Use the new password on other devices.",
    passwordSaving: "Updating...",
    nameEditLabel: "Display name",
    profileTitle: "Sign-in details",
    profileAction: "Save name",
    profileError: "Name could not be saved.",
    profileRequired: "Display name is required.",
    profileSaved: "Display name saved",
    profileSaving: "Saving...",
    securityDescription:
      "Change the password used for email/password sign-in. Social accounts can add a password through the reset email flow.",
    securityTitle: "Security",
  };
}

function getAccountEmailCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      allowAnnouncements: "恢复通知",
      announcements: "重要通知",
      announcementsDescription: "接收产品更新和账号相关邮件。",
      blogFrequency: "博客更新",
      blogOptions: [
        {
          description: "不接收新文章邮件。",
          label: "不订阅",
          value: "none",
        },
        {
          description: "每周汇总新文章发送到邮箱。",
          label: "订阅每周博客更新",
          value: "weekly_blog_updates",
        },
      ] satisfies Array<{ description: string; label: string; value: EmailPreference }>,
      commentReplies: "评论回复通知",
      commentRepliesDescription: "有人回复你的评论时发送邮件。",
      description: "选择你想收到的邮件。",
      saved: "邮件设置已保存",
      saving: "正在保存...",
      stopAnnouncements: "暂停通知",
      title: "邮件偏好",
    };
  }

  return {
    allowAnnouncements: "Resume updates",
    announcements: "Important updates",
    announcementsDescription: "Receive product updates and account-related email.",
    blogFrequency: "Blog updates",
    blogOptions: [
      {
        description: "Do not receive new post emails.",
        label: "Do not subscribe",
        value: "none",
      },
      {
        description: "Get a weekly email with the latest posts.",
        label: "Weekly blog updates",
        value: "weekly_blog_updates",
      },
    ] satisfies Array<{ description: string; label: string; value: EmailPreference }>,
    commentReplies: "Comment reply notifications",
    commentRepliesDescription: "Send an email when someone replies to one of your comments.",
    description: "Choose the emails you want to receive.",
    saved: "Email settings saved",
    saving: "Saving...",
    stopAnnouncements: "Pause updates",
    title: "Email preferences",
  };
}
