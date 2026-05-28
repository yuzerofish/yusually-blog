import { type ApiToken, type ApiTokenScope, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, KeyRoundIcon, LinkIcon, UploadIcon, UserRoundIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import {
  AdminPageHeader,
  AdminPanel,
  adminPanelClassName,
  adminSelectClassName,
  adminTextareaClassName,
} from "#/components/admin/admin-ui";
import { apiTokenScopes } from "#/lib/cms-api-utils";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/settings")({
  component: AdminSettingsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
type EmailVerificationStatus = {
  enabled: boolean;
  requested: boolean;
  delivery: {
    configured: boolean;
    provider: "cloudflare" | "resend" | null;
    missing: string[];
  };
};
type PortabilityStatus = {
  tone: "success" | "error";
  message: string;
};
type ImportPayload = {
  data?: {
    post?: {
      title?: string;
    };
  };
  error?: string;
};

const defaultEmailVerificationStatus: EmailVerificationStatus = {
  delivery: {
    configured: false,
    missing: [],
    provider: null,
  },
  enabled: false,
  requested: false,
};

function AdminSettingsPage() {
  const locale = getCurrentLocale();
  const defaultSettings: SiteSettings = {
    name: "",
    description: "",
    url: "",
    authorName: "",
    authorBio: "",
    avatarUrl: "",
    defaultOgImage: "",
    socialLinks: [],
    navigation: [],
    rssEnabled: true,
    commentsEnabled: true,
    commentsRequireApproval: true,
    commentAutoBlockEnabled: false,
    commentBlockedKeywords: [],
    emailVerificationEnabled: false,
    indexingEnabled: true,
    themePreset: "maker",
    layoutPreset: "journal",
    locales: ["en", "zh"],
    primaryLanguage: "en",
  };
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [emailStatus, setEmailStatus] = useState<EmailVerificationStatus>(
    defaultEmailVerificationStatus,
  );
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [secret, setSecret] = useState<string | null>(null);
  const [settingsStatus, setSettingsStatus] = useState<"idle" | "saved" | "error">("idle");
  const [portabilityStatus, setPortabilityStatus] = useState<PortabilityStatus | null>(null);

  useEffect(() => {
    let ignore = false;

    void Promise.all([
      fetch("/api/site").then((response) => (response.ok ? response.json() : undefined)),
      fetch("/api/admin/email-status").then((response) =>
        response.ok ? response.json() : undefined,
      ),
      fetch("/api/tokens").then((response) => (response.ok ? response.json() : undefined)),
    ]).then(([sitePayload, emailPayload, tokenPayload]) => {
      const siteData = (sitePayload as { data?: SiteSettings } | undefined)?.data;
      const emailData = (emailPayload as { data?: EmailVerificationStatus } | undefined)?.data;
      const tokenData = (tokenPayload as { data?: ApiToken[] } | undefined)?.data;

      if (!ignore && siteData) {
        setSiteSettings(siteData);
      }

      if (!ignore && emailData) {
        setEmailStatus(emailData);
      }

      if (!ignore && tokenData) {
        setTokens(tokenData);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  const saveSettings: FormSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawBlockedKeywords = formData.get("commentBlockedKeywords");
    const blockedKeywords =
      typeof rawBlockedKeywords === "string"
        ? rawBlockedKeywords
            .split(/[\n,，]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    const response = await fetch("/api/site", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: formData.get("siteName"),
        url: formData.get("siteUrl"),
        description: formData.get("description"),
        authorName: formData.get("authorName"),
        authorBio: formData.get("authorBio"),
        avatarUrl: formData.get("avatarUrl"),
        defaultOgImage: formData.get("defaultOgImage"),
        socialLinks: parseLinkLines(formData.get("socialLinks")),
        navigation: parseLinkLines(formData.get("navigation")),
        themePreset: formData.get("themePreset"),
        primaryLanguage: formData.get("primaryLanguage"),
        rssEnabled: formData.get("rssEnabled") === "on",
        commentsEnabled: formData.get("commentsEnabled") === "on",
        commentsRequireApproval: formData.get("commentsRequireApproval") === "on",
        commentAutoBlockEnabled: formData.get("commentAutoBlockEnabled") === "on",
        commentBlockedKeywords: blockedKeywords,
        emailVerificationEnabled:
          emailStatus.delivery.configured && formData.get("emailVerificationEnabled") === "on",
        indexingEnabled: formData.get("indexingEnabled") === "on",
        layoutPreset: formData.get("layoutPreset"),
      }),
    });

    if (!response.ok) {
      setSettingsStatus("error");
      return;
    }

    const payload = (await response.json()) as { data: SiteSettings };
    setSiteSettings(payload.data);
    window.dispatchEvent(
      new CustomEvent("blogcms:site-settings-updated", { detail: payload.data }),
    );
    setSettingsStatus("saved");
  };

  const createToken: FormSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/tokens", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: formData.get("tokenName"),
        scopes: formData.getAll("scopes") as ApiTokenScope[],
      }),
    });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: ApiToken; secret: string };
    setTokens((current) => [payload.data, ...current]);
    setSecret(payload.secret);
    event.currentTarget.reset();
  };

  const revokeToken = async (id: string) => {
    const response = await fetch(`/api/tokens/${id}/revoke`, { method: "POST" });

    if (!response.ok) {
      return;
    }

    const payload = (await response.json()) as { data: ApiToken };
    setTokens((current) => current.map((token) => (token.id === id ? payload.data : token)));
  };

  const downloadExport = async (format: "json" | "zip") => {
    setPortabilityStatus(null);

    const response = await fetch(
      `/api/export?lang=${locale}${format === "zip" ? "&format=zip" : ""}`,
    );

    if (!response.ok) {
      setPortabilityStatus({ tone: "error", message: m.admin_export_error() });
      return;
    }

    if (format === "zip") {
      const blob = await response.blob();
      downloadBlob(blob, responseFilename(response) ?? exportFilename("zip"));
      setPortabilityStatus({ tone: "success", message: m.admin_export_started() });
      return;
    }

    const payload = (await response.json()) as { data?: unknown };
    const blob = new Blob([`${JSON.stringify(payload.data ?? payload, null, 2)}\n`], {
      type: "application/json",
    });
    downloadBlob(blob, exportFilename("json"));
    setPortabilityStatus({ tone: "success", message: m.admin_export_started() });
  };

  const createBackup = async () => {
    setPortabilityStatus(null);
    const response = await fetch("/api/backups", { method: "POST" });

    if (!response.ok) {
      setPortabilityStatus({ tone: "error", message: m.admin_backup_error() });
      return;
    }

    setPortabilityStatus({ tone: "success", message: m.admin_backup_created() });
  };

  const importContent: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setPortabilityStatus(null);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("importFile");
    const status = formData.get("importStatus");

    if (!(file instanceof File) || file.size === 0) {
      setPortabilityStatus({ tone: "error", message: m.admin_import_error() });
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const baseBody = {
      filename: file.name,
      status: status === "published" ? "published" : "draft",
      locale,
    };
    const request =
      extension === "zip"
        ? {
            endpoint: "/api/import/zip",
            body: {
              ...baseBody,
              contentBase64: await fileToBase64(file),
            },
          }
        : extension === "html" || extension === "htm"
          ? {
              endpoint: "/api/import/html",
              body: {
                ...baseBody,
                contentHtml: await file.text(),
              },
            }
          : {
              endpoint: "/api/import/markdown",
              body: {
                ...baseBody,
                contentMarkdown: await file.text(),
              },
            };

    const response = await fetch(request.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request.body),
    });
    const payload = (await response.json().catch(() => ({}))) as ImportPayload;

    if (!response.ok) {
      setPortabilityStatus({
        tone: "error",
        message: payload.error || m.admin_import_error(),
      });
      return;
    }

    event.currentTarget.reset();
    setPortabilityStatus({
      tone: "success",
      message: m.admin_import_success({
        title: payload.data?.post?.title || file.name,
      }),
    });
  };

  const emailProviderLabel =
    emailStatus.delivery.provider === "cloudflare"
      ? "Cloudflare Email"
      : emailStatus.delivery.provider === "resend"
        ? "Resend"
        : "";

  return (
    <div className="grid gap-5">
      <AdminPageHeader
        title={m.admin_settings_title()}
        description={m.admin_settings_help()}
        actions={
          settingsStatus !== "idle" ? (
            <p
              className={`self-center text-sm ${
                settingsStatus === "saved" ? "text-success" : "text-destructive"
              }`}
            >
              {settingsStatus === "saved" ? m.admin_settings_saved() : m.admin_settings_error()}
            </p>
          ) : null
        }
      />

      <section>
        <form
          key={[
            siteSettings.url,
            siteSettings.avatarUrl,
            siteSettings.emailVerificationEnabled,
            siteSettings.socialLinks.length,
            siteSettings.navigation.length,
          ].join("-")}
          onSubmit={saveSettings}
          className={`${adminPanelClassName} grid gap-5`}
        >
          <div className="flex justify-end">
            <Button type="submit">{m.admin_save_settings()}</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2 md:col-span-2">
              <UserRoundIcon className="size-4 text-link" />
              <h2 className="text-sm font-semibold">{m.admin_settings_identity()}</h2>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site-name">{m.admin_settings_site_name()}</Label>
              <Input id="site-name" name="siteName" defaultValue={siteSettings.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site-url">{m.admin_settings_site_url()}</Label>
              <Input id="site-url" name="siteUrl" defaultValue={siteSettings.url} />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="site-description">{m.admin_settings_description()}</Label>
              <Input
                id="site-description"
                name="description"
                defaultValue={siteSettings.description}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author-name">{m.admin_settings_author_name()}</Label>
              <Input id="author-name" name="authorName" defaultValue={siteSettings.authorName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar-url">{m.admin_settings_avatar_url()}</Label>
              <Input
                id="avatar-url"
                name="avatarUrl"
                defaultValue={siteSettings.avatarUrl}
                placeholder="/avatar.jpg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-og">{m.admin_settings_default_og()}</Label>
              <Input
                id="default-og"
                name="defaultOgImage"
                defaultValue={siteSettings.defaultOgImage}
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="author-bio">{m.admin_settings_author_bio()}</Label>
              <Input id="author-bio" name="authorBio" defaultValue={siteSettings.authorBio} />
            </div>
            <fieldset className="grid gap-3 rounded-md border border-border bg-muted/35 p-4 md:col-span-2">
              <legend className="px-1 text-sm font-medium">
                <span className="inline-flex items-center gap-2">
                  <LinkIcon className="size-4 text-link" />
                  {m.admin_settings_links()}
                </span>
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="social-links">{m.admin_settings_social_links()}</Label>
                  <textarea
                    id="social-links"
                    name="socialLinks"
                    defaultValue={formatLinkLines(siteSettings.socialLinks)}
                    placeholder="GitHub | https://github.com/01mvp/blog-starter"
                    rows={4}
                    className={`${adminTextareaClassName} min-h-24`}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="navigation-links">{m.admin_settings_navigation_links()}</Label>
                  <textarea
                    id="navigation-links"
                    name="navigation"
                    defaultValue={formatLinkLines(siteSettings.navigation)}
                    placeholder="Blog | /blog"
                    rows={4}
                    className={`${adminTextareaClassName} min-h-24`}
                  />
                </div>
              </div>
            </fieldset>
            <div className="grid gap-2">
              <Label htmlFor="primary-language">{m.admin_settings_language()}</Label>
              <select
                id="primary-language"
                name="primaryLanguage"
                defaultValue={siteSettings.primaryLanguage}
                className={adminSelectClassName}
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="theme-preset">{m.admin_settings_theme_preset()}</Label>
              <select
                id="theme-preset"
                name="themePreset"
                defaultValue={siteSettings.themePreset}
                className={adminSelectClassName}
              >
                <option value="maker">{m.theme_preset_maker()}</option>
                <option value="apple">{m.theme_preset_apple()}</option>
                <option value="claude">{m.theme_preset_claude()}</option>
                <option value="brutalist">{m.theme_preset_brutalist()}</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="layout-preset">{m.admin_settings_layout_preset()}</Label>
              <select
                id="layout-preset"
                name="layoutPreset"
                defaultValue={siteSettings.layoutPreset}
                className={adminSelectClassName}
              >
                <option value="shelf">{m.layout_preset_shelf()}</option>
                <option value="developer">{m.layout_preset_developer()}</option>
                <option value="journal">{m.layout_preset_journal()}</option>
              </select>
            </div>
            <div className="grid content-end gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="rssEnabled"
                  defaultChecked={siteSettings.rssEnabled}
                  className="size-4 rounded border-input"
                />
                {m.admin_settings_rss()}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="indexingEnabled"
                  defaultChecked={siteSettings.indexingEnabled}
                  className="size-4 rounded border-input"
                />
                {m.admin_settings_indexing()}
              </label>
            </div>
            <fieldset className="grid gap-3 rounded-md border border-border bg-muted/35 p-4 md:col-span-2">
              <legend className="px-1 text-sm font-medium">{m.admin_email_settings()}</legend>
              <div
                className={`flex items-start gap-3 text-sm ${
                  emailStatus.delivery.configured ? "" : "opacity-65"
                }`}
              >
                <input
                  id="email-verification-enabled"
                  type="checkbox"
                  name="emailVerificationEnabled"
                  defaultChecked={
                    siteSettings.emailVerificationEnabled && emailStatus.delivery.configured
                  }
                  disabled={!emailStatus.delivery.configured}
                  className="mt-0.5 size-4 rounded border-input"
                />
                <Label
                  htmlFor="email-verification-enabled"
                  className="grid gap-1 text-sm leading-5 font-normal"
                >
                  <span>{m.admin_email_verification()}</span>
                  <span className="text-xs leading-5 text-muted-foreground">
                    {m.admin_email_verification_help()}
                  </span>
                </Label>
              </div>
              <p
                className={`text-xs ${
                  emailStatus.delivery.configured ? "text-success" : "text-muted-foreground"
                }`}
              >
                {emailStatus.delivery.configured
                  ? m.admin_email_verification_provider({ provider: emailProviderLabel })
                  : m.admin_email_verification_unavailable()}
              </p>
            </fieldset>
            <fieldset className="grid gap-3 rounded-md border border-border bg-muted/35 p-4 md:col-span-2">
              <legend className="px-1 text-sm font-medium">{m.admin_comment_settings()}</legend>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="commentsEnabled"
                  defaultChecked={siteSettings.commentsEnabled}
                  className="size-4 rounded border-input"
                />
                {m.comments()}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="commentsRequireApproval"
                  defaultChecked={siteSettings.commentsRequireApproval}
                  className="size-4 rounded border-input"
                />
                {m.admin_comments_require_approval()}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="commentAutoBlockEnabled"
                  defaultChecked={siteSettings.commentAutoBlockEnabled}
                  className="size-4 rounded border-input"
                />
                {m.admin_comments_auto_block()}
              </label>
              <div className="grid gap-2">
                <Label htmlFor="comment-blocked-keywords">
                  {m.admin_comments_blocked_keywords()}
                </Label>
                <textarea
                  id="comment-blocked-keywords"
                  name="commentBlockedKeywords"
                  defaultValue={siteSettings.commentBlockedKeywords.join("\n")}
                  rows={5}
                  className={`${adminTextareaClassName} min-h-28`}
                />
                <p className="text-xs text-muted-foreground">
                  {m.admin_comments_blocked_keywords_help()}
                </p>
              </div>
            </fieldset>
          </div>
        </form>
      </section>

      <AdminPanel>
        <div className="flex items-start gap-3">
          <DownloadIcon className="mt-1 size-5 text-link" />
          <div>
            <h2 className="text-xl font-semibold">{m.admin_import_export_title()}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {m.admin_import_export_description()}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid content-start gap-3 rounded-md border border-border bg-muted/35 p-4">
            <h3 className="text-sm font-semibold">{m.admin_export_title()}</h3>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => void downloadExport("json")}>
                <DownloadIcon />
                {m.admin_export_json()}
              </Button>
              <Button type="button" variant="outline" onClick={() => void downloadExport("zip")}>
                <DownloadIcon />
                {m.admin_export_zip()}
              </Button>
              <Button type="button" onClick={() => void createBackup()}>
                {m.admin_create_backup()}
              </Button>
            </div>
          </div>

          <form
            onSubmit={importContent}
            className="grid gap-4 rounded-md border border-border bg-muted/35 p-4"
          >
            <div className="flex items-center gap-2">
              <UploadIcon className="size-4 text-link" />
              <h3 className="text-sm font-semibold">{m.admin_import_title()}</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
              <div className="grid gap-2">
                <Label htmlFor="import-file">{m.admin_import_file()}</Label>
                <Input
                  id="import-file"
                  name="importFile"
                  type="file"
                  accept=".md,.mdx,.html,.htm,.zip,text/markdown,text/html,application/zip"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="import-status">{m.admin_import_status()}</Label>
                <select id="import-status" name="importStatus" className={adminSelectClassName}>
                  <option value="draft">{m.admin_post_status_draft_label()}</option>
                  <option value="published">{m.admin_post_status_published_label()}</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-fit">
              <UploadIcon />
              {m.admin_import_submit()}
            </Button>
          </form>
        </div>

        {portabilityStatus ? (
          <p
            className={`mt-4 text-sm ${
              portabilityStatus.tone === "success" ? "text-success" : "text-destructive"
            }`}
          >
            {portabilityStatus.message}
          </p>
        ) : null}
      </AdminPanel>

      <AdminPanel>
        <div className="flex items-start gap-3">
          <KeyRoundIcon className="mt-1 size-5 text-link" />
          <div>
            <h2 className="text-xl font-semibold">{m.admin_tokens_title()}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{m.admin_tokens_description()}</p>
          </div>
        </div>

        <form onSubmit={createToken} className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="token-name">{m.admin_token_name()}</Label>
            <Input id="token-name" name="tokenName" defaultValue="AI publisher" required />
          </div>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium">{m.admin_token_scopes()}</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {apiTokenScopes.map((scope) => (
                <label key={scope} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="scopes"
                    value={scope}
                    defaultChecked={["posts:read", "posts:write", "posts:publish"].includes(scope)}
                    className="size-4 rounded border-input"
                  />
                  {scope}
                </label>
              ))}
            </div>
          </fieldset>
          <Button type="submit" className="w-fit">
            {m.admin_create_token()}
          </Button>
        </form>

        {secret ? (
          <p className="mt-4 rounded-md border border-border bg-muted/55 p-3 font-mono text-sm">
            {m.admin_token_secret_once()}: {secret}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          {tokens.map((token) => (
            <article key={token.id} className="rounded-lg border border-border bg-muted/45 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {token.tokenPrefix}... · {token.scopes.join(", ")}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={Boolean(token.revokedAt)}
                  onClick={() => void revokeToken(token.id)}
                >
                  {token.revokedAt ? m.admin_token_revoked() : m.admin_revoke_token()}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </AdminPanel>
    </div>
  );
}

function parseLinkLines(value: FormDataEntryValue | null): SiteSettings["socialLinks"] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf("|");
      const label = separator >= 0 ? line.slice(0, separator).trim() : "";
      const href = separator >= 0 ? line.slice(separator + 1).trim() : line;

      if (!href) {
        return null;
      }

      return {
        label: label || linkLabelFromHref(href),
        href,
      };
    })
    .filter((link): link is SiteSettings["socialLinks"][number] => Boolean(link));
}

function formatLinkLines(links: SiteSettings["socialLinks"]) {
  return links.map((link) => `${link.label} | ${link.href}`).join("\n");
}

function linkLabelFromHref(href: string) {
  if (href.startsWith("/")) {
    return href.replace(/^\/+/, "") || "Home";
  }

  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function exportFilename(format: "json" | "zip") {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `01mvp-blog-starter-${timestamp}.${format}`;
}

function responseFilename(response: Response) {
  const disposition = response.headers.get("content-disposition") ?? "";
  const match = /filename="([^"]+)"/.exec(disposition);

  return match?.[1];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.split(",")[1] ?? "");
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });
    reader.readAsDataURL(file);
  });
}
