import { useAuthSuspense } from "@repo/auth/tanstack/hooks";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { MailIcon } from "lucide-react";
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
      setEmailPreference(payload.data.emailPreference);
      setMarketingOptOut(payload.data.marketingOptOut);
    }

    setStatus("saved");
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <div className="grid gap-5 text-sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-2xl font-semibold">{m.account_title()}</h1>
        <p className="text-muted-foreground">{m.account_signed_in_as()}</p>
        <span className="rounded-md border bg-card px-3 py-2 font-mono text-xs text-card-foreground">
          {user?.name}
        </span>
      </div>

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
        {status === "saved" ? <p className="mt-3 text-success">{copy.saved}</p> : null}
      </section>
    </div>
  );
}

type EmailPreference = "none" | "instant_posts" | "biweekly_digest";

type AccountEmailPreferences = {
  emailPreference: EmailPreference;
  marketingOptOut: boolean;
};

function getAccountEmailCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      allowAnnouncements: "恢复站点公告",
      blogFrequency: "博客更新频率",
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
    description: "Manage how this account receives blog updates and site announcements.",
    digest: "Biweekly digest",
    instant: "Every new post",
    none: "No blog emails",
    saved: "Email preference saved",
    stopAnnouncements: "Stop announcements",
    title: "Email preferences",
  };
}
