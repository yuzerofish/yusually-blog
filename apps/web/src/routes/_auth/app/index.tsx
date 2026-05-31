import { useAuthSuspense } from "@repo/auth/tanstack/hooks";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, MailIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/app/")({
  component: AppIndex,
});

function AppIndex() {
  const { user } = useAuthSuspense();
  const locale = getCurrentLocale();
  const copy = getAccountEmailCopy(locale);
  const pageCopy = getAccountPageCopy(locale);
  const isAdmin = user?.role === "admin";
  const [commentReplyNotificationsEnabled, setCommentReplyNotificationsEnabled] = useState(true);
  const [emailPreference, setEmailPreference] = useState<EmailPreference>("none");
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

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

  return (
    <div className="grid gap-5 text-sm">
      <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {pageCopy.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-semibold">{m.account_title()}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{pageCopy.description}</p>
        </div>
        {isAdmin ? (
          <Button render={<Link to="/admin" />} nativeButton={false} className="w-full sm:w-auto">
            <ShieldCheckIcon className="size-4" />
            {m.open_admin()}
            <ArrowRightIcon className="size-4" />
          </Button>
        ) : null}
      </header>

      <section className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-md border bg-card p-4">
          <div className="flex items-start gap-3">
            <UserRoundIcon className="mt-1 size-5 text-link" />
            <div className="min-w-0">
              <h2 className="font-semibold">{pageCopy.profileTitle}</h2>
              <p className="mt-1 text-muted-foreground">{m.account_signed_in_as()}</p>
            </div>
          </div>
          <dl className="mt-4 grid gap-3">
            <div className="grid gap-1">
              <dt className="text-xs font-semibold text-muted-foreground uppercase">
                {pageCopy.nameLabel}
              </dt>
              <dd className="font-medium break-words">{user?.name}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-semibold text-muted-foreground uppercase">
                {pageCopy.emailLabel}
              </dt>
              <dd className="font-mono text-xs break-all">{user?.email}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border bg-card p-4">
          <div className="flex items-start gap-3">
            <ShieldCheckIcon className="mt-1 size-5 text-link" />
            <div>
              <h2 className="font-semibold">{pageCopy.accessTitle}</h2>
              <p className="mt-1 text-muted-foreground">
                {isAdmin ? pageCopy.adminAccessDescription : pageCopy.readerAccessDescription}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-md border bg-muted/30 px-3 py-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              {pageCopy.roleLabel}
            </span>
            <p className="mt-1 font-medium">{isAdmin ? pageCopy.adminRole : pageCopy.readerRole}</p>
          </div>
        </div>
      </section>

      <section className="rounded-md border bg-card p-4 text-left">
        <div className="flex items-start gap-3">
          <MailIcon className="mt-1 size-5 text-link" />
          <div>
            <h2 className="font-semibold">{copy.title}</h2>
            <p className="mt-1 text-muted-foreground">{copy.description}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="grid gap-2">
            <label htmlFor="account-email-preference" className="font-medium">
              {copy.blogFrequency}
            </label>
            <select
              id="account-email-preference"
              value={emailPreference}
              onChange={(event) =>
                void savePreference({
                  emailPreference: event.currentTarget.value as EmailPreference,
                })
              }
              disabled={status === "saving"}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
            >
              <option value="none">{copy.none}</option>
              <option value="instant_posts">{copy.instant}</option>
              <option value="biweekly_digest">{copy.digest}</option>
            </select>
          </div>
          <Button
            type="button"
            variant={marketingOptOut ? "default" : "outline"}
            disabled={status === "saving"}
            onClick={() => void savePreference({ marketingOptOut: !marketingOptOut })}
          >
            {marketingOptOut ? copy.allowAnnouncements : copy.stopAnnouncements}
          </Button>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
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
          <label htmlFor="account-comment-reply-notifications">
            <span className="font-medium">{copy.commentReplies}</span>
            <span className="mt-1 block text-muted-foreground">
              {copy.commentRepliesDescription}
            </span>
          </label>
        </div>
        {status === "saved" ? <p className="mt-3 text-success">{copy.saved}</p> : null}
      </section>
    </div>
  );
}

type EmailPreference = "none" | "instant_posts" | "biweekly_digest";

type AccountEmailPreferences = {
  commentReplyNotificationsEnabled: boolean;
  emailPreference: EmailPreference;
  marketingOptOut: boolean;
};

function getAccountPageCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      accessTitle: "访问权限",
      adminAccessDescription: "这个账号可以进入后台管理文章、评论、资源和站点设置。",
      adminRole: "管理员",
      description:
        "这是所有登录用户的统一入口。管理员可以从这里进入后台，普通用户可以管理评论和邮件设置。",
      emailLabel: "邮箱",
      eyebrow: "账号中心",
      nameLabel: "姓名",
      profileTitle: "个人资料",
      readerAccessDescription: "这个账号可以阅读、评论，并管理自己的邮件偏好。",
      readerRole: "普通用户",
      roleLabel: "角色",
    };
  }

  return {
    accessTitle: "Access",
    adminAccessDescription:
      "This account can open the admin area to manage posts, comments, assets, and site settings.",
    adminRole: "Admin",
    description:
      "A single account area for every signed-in user. Admin accounts can open the admin area from here; reader accounts can manage comments and email settings.",
    emailLabel: "Email",
    eyebrow: "Account center",
    nameLabel: "Name",
    profileTitle: "Profile",
    readerAccessDescription:
      "This account can read, comment, and manage its own email preferences.",
    readerRole: "Reader",
    roleLabel: "Role",
  };
}

function getAccountEmailCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      allowAnnouncements: "恢复站点公告",
      blogFrequency: "博客更新频率",
      commentReplies: "评论回复通知",
      commentRepliesDescription: "有人回复你的评论时发送邮件。",
      description: "管理这个账号接收博客更新和站点公告的方式。",
      digest: "每 2 周摘要",
      instant: "每篇新文章",
      none: "不接收博客邮件",
      saved: "邮件偏好已保存",
      stopAnnouncements: "停止站点公告",
      title: "邮件偏好",
    };
  }

  return {
    allowAnnouncements: "Allow announcements",
    blogFrequency: "Blog update frequency",
    commentReplies: "Comment reply notifications",
    commentRepliesDescription: "Send an email when someone replies to one of your comments.",
    description: "Manage how this account receives blog updates and site announcements.",
    digest: "Biweekly digest",
    instant: "Every new post",
    none: "No blog emails",
    saved: "Email preference saved",
    stopAnnouncements: "Stop announcements",
    title: "Email preferences",
  };
}
