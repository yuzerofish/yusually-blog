import { SiGithub } from "@icons-pack/react-simple-icons";
import { type ApiToken, type ApiTokenScope, type SiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { cn } from "@repo/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  BotIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  DownloadIcon,
  ExternalLinkIcon,
  KeyRoundIcon,
  Loader2Icon,
  LinkIcon,
  MailIcon,
  Settings2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  Trash2Icon,
  UploadIcon,
  UserRoundIcon,
} from "lucide-react";
import { useEffect, useState, type ComponentProps, type ComponentType } from "react";
import { toast } from "sonner";

import {
  AdminPageHeader,
  AdminPanel,
  adminPanelClassName,
  adminSelectClassName,
  adminTextareaClassName,
} from "#/components/admin/admin-ui";
import { getResponseErrorMessage } from "#/lib/admin-notifications";
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
type OptionalEnvStatus = {
  configured: boolean;
  missing: string[];
};
type AdvancedConfigStatus = {
  email: EmailVerificationStatus["delivery"];
  github: OptionalEnvStatus;
  turnstile: OptionalEnvStatus;
};
type AdvancedConfigItem = {
  id: "email" | "github" | "turnstile";
  configured: boolean;
  description: string;
  detail: string;
  docsHref: string;
  icon: ComponentType<{ className?: string }>;
  missing: string[];
  title: string;
};
type PortabilityStatus = {
  tone: "success" | "error" | "info";
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
type AiProviderSettings = {
  apiKeyConfigured: boolean;
  baseUrl: string;
  configured: boolean;
  model: string;
};
type AiActionState = "idle" | "saving" | "testing" | "clearing";

const defaultEmailVerificationStatus: EmailVerificationStatus = {
  delivery: {
    configured: false,
    missing: [],
    provider: null,
  },
  enabled: false,
  requested: false,
};
const defaultAdvancedConfigStatus: AdvancedConfigStatus = {
  email: defaultEmailVerificationStatus.delivery,
  github: {
    configured: false,
    missing: [],
  },
  turnstile: {
    configured: false,
    missing: [],
  },
};
const defaultAiProviderSettings: AiProviderSettings = {
  apiKeyConfigured: false,
  baseUrl: "",
  configured: false,
  model: "",
};
const aiSettingsEndpoint = "/api/admin/ai-settings";
const aiSettingsTestEndpoint = `${aiSettingsEndpoint}/test`;
const aiSettingsKeyEndpoint = `${aiSettingsEndpoint}/api-key`;

function AdminSettingsPage() {
  const locale = getCurrentLocale();
  const actionCopy = getSettingsActionCopy(locale);
  const aiCopy = getAiProviderCopy(locale);
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
    aiCommentModerationEnabled: false,
    aiCommentModerationRules: "",
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
  const [advancedConfig, setAdvancedConfig] = useState<AdvancedConfigStatus>(
    defaultAdvancedConfigStatus,
  );
  const [aiProviderSettings, setAiProviderSettings] =
    useState<AiProviderSettings>(defaultAiProviderSettings);
  const [aiApiKey, setAiApiKey] = useState("");
  const [aiActionState, setAiActionState] = useState<AiActionState>("idle");
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [secret, setSecret] = useState<string | null>(null);
  const [settingsStatus, setSettingsStatus] = useState<"idle" | "saved" | "error">("idle");
  const [portabilityStatus, setPortabilityStatus] = useState<PortabilityStatus | null>(null);
  const [exportFormat, setExportFormat] = useState<"json" | "zip" | null>(null);

  useEffect(() => {
    let ignore = false;

    void Promise.all([
      fetch("/api/site").then((response) => (response.ok ? response.json() : undefined)),
      fetch("/api/admin/email-status").then((response) =>
        response.ok ? response.json() : undefined,
      ),
      fetch(aiSettingsEndpoint)
        .then((response) => (response.ok ? response.json() : undefined))
        .catch(() => undefined),
      fetch("/api/tokens").then((response) => (response.ok ? response.json() : undefined)),
    ]).then(([sitePayload, emailPayload, aiPayload, tokenPayload]) => {
      const siteData = (sitePayload as { data?: SiteSettings } | undefined)?.data;
      const emailData = (emailPayload as { data?: EmailVerificationStatus } | undefined)?.data;
      const advancedData = (
        emailPayload as
          | { advanced?: AdvancedConfigStatus; data?: EmailVerificationStatus }
          | undefined
      )?.advanced;
      const aiData = aiPayload as unknown;
      const tokenData = (tokenPayload as { data?: ApiToken[] } | undefined)?.data;

      if (!ignore && siteData) {
        setSiteSettings(siteData);
      }

      if (!ignore && emailData) {
        setEmailStatus(emailData);
      }

      if (!ignore && advancedData) {
        setAdvancedConfig(advancedData);
      }

      if (!ignore && aiData) {
        setAiProviderSettings(normalizeAiProviderSettings(aiData));
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
        emailVerificationEnabled:
          emailStatus.delivery.configured && formData.get("emailVerificationEnabled") === "on",
        indexingEnabled: formData.get("indexingEnabled") === "on",
        layoutPreset: formData.get("layoutPreset"),
      }),
    }).catch(() => null);

    if (!response?.ok) {
      setSettingsStatus("error");
      toast.error(actionCopy.settingsError, {
        description: response
          ? await getResponseErrorMessage(response, actionCopy.settingsError)
          : actionCopy.networkError,
      });
      return;
    }

    const payload = (await response.json()) as { data: SiteSettings };
    setSiteSettings(payload.data);
    window.dispatchEvent(
      new CustomEvent("blogcms:site-settings-updated", { detail: payload.data }),
    );
    setSettingsStatus("saved");
    toast.success(actionCopy.settingsSaved);
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
    }).catch(() => null);

    if (!response?.ok) {
      toast.error(actionCopy.tokenCreateError, {
        description: response
          ? await getResponseErrorMessage(response, actionCopy.tokenCreateError)
          : actionCopy.networkError,
      });
      return;
    }

    const payload = (await response.json()) as { data: ApiToken; secret: string };
    setTokens((current) => [payload.data, ...current]);
    setSecret(payload.secret);
    event.currentTarget.reset();
    toast.success(actionCopy.tokenCreated);
  };

  const revokeToken = async (id: string) => {
    const response = await fetch(`/api/tokens/${id}/revoke`, { method: "POST" }).catch(() => null);

    if (!response?.ok) {
      toast.error(actionCopy.tokenRevokeError, {
        description: response
          ? await getResponseErrorMessage(response, actionCopy.tokenRevokeError)
          : actionCopy.networkError,
      });
      return;
    }

    const payload = (await response.json()) as { data: ApiToken };
    setTokens((current) => current.map((token) => (token.id === id ? payload.data : token)));
    toast.success(actionCopy.tokenRevoked);
  };

  const saveAiProviderSettings: FormSubmitHandler = async (event) => {
    event.preventDefault();
    const nextBaseUrl = aiProviderSettings.baseUrl.trim();
    const nextModel = aiProviderSettings.model.trim();
    const nextApiKey = aiApiKey.trim();

    setAiActionState("saving");

    const response = await fetch(aiSettingsEndpoint, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        baseUrl: nextBaseUrl,
        model: nextModel,
        ...(nextApiKey ? { apiKey: nextApiKey } : {}),
      }),
    }).catch(() => null);

    if (!response?.ok) {
      setAiActionState("idle");
      toast.error(aiCopy.saveError, {
        description: response
          ? await getResponseErrorMessage(response, aiCopy.saveError)
          : actionCopy.networkError,
      });
      return;
    }

    const payload = await response.json().catch(() => ({}));
    const normalized = normalizeAiProviderSettings(payload);
    const apiKeyConfigured =
      normalized.apiKeyConfigured || Boolean(nextApiKey) || aiProviderSettings.apiKeyConfigured;
    const savedBaseUrl = normalized.baseUrl || nextBaseUrl;
    const savedModel = normalized.model || nextModel;

    setAiProviderSettings({
      apiKeyConfigured,
      baseUrl: savedBaseUrl,
      configured: normalized.configured || Boolean(apiKeyConfigured && savedBaseUrl && savedModel),
      model: savedModel,
    });
    setAiApiKey("");
    setAiActionState("idle");
    toast.success(aiCopy.saved);
  };

  const testAiProviderConnection = async () => {
    setAiActionState("testing");

    const response = await fetch(aiSettingsTestEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        baseUrl: aiProviderSettings.baseUrl.trim(),
        model: aiProviderSettings.model.trim(),
        ...(aiApiKey.trim() ? { apiKey: aiApiKey.trim() } : {}),
      }),
    }).catch(() => null);

    if (!response?.ok) {
      setAiActionState("idle");
      toast.error(aiCopy.testError, {
        description: response
          ? await getResponseErrorMessage(response, aiCopy.testError)
          : actionCopy.networkError,
      });
      return;
    }

    setAiActionState("idle");
    toast.success(aiCopy.tested);
  };

  const clearAiProviderKey = async () => {
    setAiActionState("clearing");

    const response = await fetch(aiSettingsKeyEndpoint, { method: "DELETE" }).catch(() => null);

    if (!response?.ok) {
      setAiActionState("idle");
      toast.error(aiCopy.clearError, {
        description: response
          ? await getResponseErrorMessage(response, aiCopy.clearError)
          : actionCopy.networkError,
      });
      return;
    }

    setAiProviderSettings((current) => ({
      ...current,
      apiKeyConfigured: false,
      configured: false,
    }));
    setAiApiKey("");
    setAiActionState("idle");
    toast.success(aiCopy.keyCleared);
  };

  const downloadExport = async (format: "json" | "zip") => {
    if (exportFormat) {
      return;
    }

    setExportFormat(format);
    setPortabilityStatus({
      tone: "info",
      message: format === "zip" ? actionCopy.exportPreparingZip : actionCopy.exportPreparingJson,
    });

    const response = await fetch(
      `/api/export?lang=${locale}${format === "zip" ? "&format=zip" : ""}`,
    ).catch(() => null);

    if (!response?.ok) {
      setPortabilityStatus({ tone: "error", message: m.admin_export_error() });
      toast.error(actionCopy.exportError, {
        description: response
          ? await getResponseErrorMessage(response, actionCopy.exportError)
          : actionCopy.networkError,
      });
      setExportFormat(null);
      return;
    }

    if (format === "zip") {
      const blob = await response.blob();
      downloadBlob(blob, responseFilename(response) ?? exportFilename("zip"));
      setPortabilityStatus({ tone: "success", message: m.admin_export_started() });
      toast.success(actionCopy.exportStarted);
      setExportFormat(null);
      return;
    }

    const payload = (await response.json()) as { data?: unknown };
    const blob = new Blob([`${JSON.stringify(payload.data ?? payload, null, 2)}\n`], {
      type: "application/json",
    });
    downloadBlob(blob, exportFilename("json"));
    setPortabilityStatus({ tone: "success", message: m.admin_export_started() });
    toast.success(actionCopy.exportStarted);
    setExportFormat(null);
  };

  const createBackup = async () => {
    setPortabilityStatus(null);
    const response = await fetch("/api/backups", { method: "POST" }).catch(() => null);

    if (!response?.ok) {
      setPortabilityStatus({ tone: "error", message: m.admin_backup_error() });
      toast.error(actionCopy.backupError, {
        description: response
          ? await getResponseErrorMessage(response, actionCopy.backupError)
          : actionCopy.networkError,
      });
      return;
    }

    setPortabilityStatus({ tone: "success", message: m.admin_backup_created() });
    toast.success(actionCopy.backupCreated);
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
    }).catch(() => null);
    const payload = ((await response?.json().catch(() => ({}))) ?? {}) as ImportPayload;

    if (!response?.ok) {
      setPortabilityStatus({
        tone: "error",
        message: payload.error || m.admin_import_error(),
      });
      toast.error(actionCopy.importError, {
        description: payload.error || actionCopy.networkError,
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
    toast.success(actionCopy.importSuccess(payload.data?.post?.title || file.name));
  };

  const emailProviderLabel =
    emailStatus.delivery.provider === "cloudflare"
      ? "Cloudflare Email"
      : emailStatus.delivery.provider === "resend"
        ? "Resend"
        : "";
  const advancedItems = getAdvancedConfigItems(locale, advancedConfig);
  const advancedCopy = getAdvancedConfigCopy(locale);
  const aiBusy = aiActionState !== "idle";
  const aiConnectionReady =
    aiProviderSettings.baseUrl.trim().length > 0 &&
    aiProviderSettings.model.trim().length > 0 &&
    (aiProviderSettings.apiKeyConfigured || aiApiKey.trim().length > 0);

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
          </div>
        </form>
      </section>

      <AdminPanel>
        <div className="flex items-start gap-3">
          <BotIcon className="mt-1 size-5 text-link" />
          <div>
            <h2 className="text-xl font-semibold">{aiCopy.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{aiCopy.description}</p>
          </div>
        </div>

        <form onSubmit={saveAiProviderSettings} className="mt-6 grid gap-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)]">
            <div className="grid gap-2">
              <Label htmlFor="ai-base-url">{aiCopy.baseUrl}</Label>
              <Input
                id="ai-base-url"
                name="baseUrl"
                type="url"
                required
                value={aiProviderSettings.baseUrl}
                placeholder="https://api.openai.com/v1"
                onChange={(event) =>
                  setAiProviderSettings((current) => ({
                    ...current,
                    baseUrl: event.currentTarget.value,
                    configured: Boolean(
                      current.apiKeyConfigured &&
                      event.currentTarget.value.trim() &&
                      current.model.trim(),
                    ),
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ai-model">{aiCopy.model}</Label>
              <Input
                id="ai-model"
                name="model"
                required
                value={aiProviderSettings.model}
                placeholder="gpt-4o-mini"
                onChange={(event) =>
                  setAiProviderSettings((current) => ({
                    ...current,
                    configured: Boolean(
                      current.apiKeyConfigured &&
                      current.baseUrl.trim() &&
                      event.currentTarget.value.trim(),
                    ),
                    model: event.currentTarget.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label htmlFor="ai-api-key">{aiCopy.apiKey}</Label>
                <span
                  className={cn(
                    "inline-flex min-h-7 items-center gap-1 rounded-md border px-2 text-xs font-medium",
                    aiProviderSettings.apiKeyConfigured
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {aiProviderSettings.apiKeyConfigured ? (
                    <CircleCheckIcon className="size-3.5" />
                  ) : (
                    <CircleAlertIcon className="size-3.5" />
                  )}
                  {aiProviderSettings.apiKeyConfigured ? aiCopy.keyConfigured : aiCopy.keyMissing}
                </span>
              </div>
              <Input
                id="ai-api-key"
                name="apiKey"
                type="password"
                autoComplete="new-password"
                required={!aiProviderSettings.apiKeyConfigured}
                value={aiApiKey}
                placeholder={
                  aiProviderSettings.apiKeyConfigured
                    ? aiCopy.apiKeyPlaceholderConfigured
                    : "sk-..."
                }
                onChange={(event) => setAiApiKey(event.currentTarget.value)}
              />
              <p className="text-xs leading-5 text-muted-foreground">{aiCopy.apiKeyHelp}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-md border border-border bg-muted/35 p-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <SparklesIcon className="size-4 text-link" />
                <h3 className="text-sm font-semibold">{aiCopy.automationTitle}</h3>
                <span
                  className={cn(
                    "inline-flex min-h-7 items-center rounded-md border px-2 text-xs font-medium",
                    aiProviderSettings.configured
                      ? "border-success/25 bg-success/10 text-success"
                      : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {aiProviderSettings.configured ? aiCopy.automationReady : aiCopy.automationOff}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {aiCopy.automationDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {aiCopy.automationItems.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={aiBusy}>
              {aiActionState === "saving" ? <Loader2Icon className="animate-spin" /> : null}
              {aiProviderSettings.apiKeyConfigured ? aiCopy.update : aiCopy.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={aiBusy || !aiConnectionReady}
              onClick={() => void testAiProviderConnection()}
            >
              {aiActionState === "testing" ? <Loader2Icon className="animate-spin" /> : null}
              {aiCopy.test}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={aiBusy || !aiProviderSettings.apiKeyConfigured}
              onClick={() => void clearAiProviderKey()}
            >
              {aiActionState === "clearing" ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Trash2Icon />
              )}
              {aiCopy.clearKey}
            </Button>
          </div>
        </form>
      </AdminPanel>

      <AdminPanel>
        <div className="flex items-start gap-3">
          <Settings2Icon className="mt-1 size-5 text-link" />
          <div>
            <h2 className="text-xl font-semibold">{advancedCopy.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{advancedCopy.description}</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border border-border">
          {advancedItems.map((item, index) => {
            const Icon = item.icon;
            const StatusIcon = item.configured ? CircleCheckIcon : CircleAlertIcon;

            return (
              <article
                key={item.id}
                className={cn(
                  "grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center",
                  index > 0 && "border-t border-border",
                )}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-md bg-muted text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <span
                      className={cn(
                        "inline-flex min-h-7 items-center gap-1 rounded-md border px-2 text-xs font-medium",
                        item.configured
                          ? "border-success/25 bg-success/10 text-success"
                          : "border-border bg-muted text-muted-foreground",
                      )}
                    >
                      <StatusIcon className="size-3.5" />
                      {item.configured ? advancedCopy.configured : advancedCopy.needsSetup}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  <p className="mt-2 text-sm leading-6">{item.detail}</p>
                  {item.missing.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.missing.map((name) => (
                        <code
                          key={name}
                          className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs"
                        >
                          {name}
                        </code>
                      ))}
                    </div>
                  ) : null}
                </div>
                <Button
                  render={
                    <a href={item.docsHref} aria-label={`${advancedCopy.docs}: ${item.title}`} />
                  }
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  className="w-fit md:justify-self-end"
                >
                  {advancedCopy.docs}
                  <ExternalLinkIcon />
                </Button>
              </article>
            );
          })}
        </div>
      </AdminPanel>

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
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(exportFormat)}
                onClick={() => void downloadExport("json")}
              >
                {exportFormat === "json" ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <DownloadIcon />
                )}
                {m.admin_export_json()}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(exportFormat)}
                onClick={() => void downloadExport("zip")}
              >
                {exportFormat === "zip" ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <DownloadIcon />
                )}
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
              portabilityStatus.tone === "success"
                ? "text-success"
                : portabilityStatus.tone === "error"
                  ? "text-destructive"
                  : "text-muted-foreground"
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

function getAdvancedConfigItems(
  locale: ReturnType<typeof getCurrentLocale>,
  status: AdvancedConfigStatus,
): AdvancedConfigItem[] {
  const copy = getAdvancedConfigCopy(locale);
  const docsPrefix = locale === "zh" ? "/zh/docs" : "/docs";
  const emailDocsHash = locale === "zh" ? "邮件发送" : "email-delivery";
  const emailProviderLabel =
    status.email.provider === "cloudflare"
      ? "Cloudflare Email"
      : status.email.provider === "resend"
        ? "Resend"
        : "";

  return [
    {
      id: "email",
      configured: status.email.configured,
      description: copy.emailDescription,
      detail: status.email.configured
        ? copy.emailConfigured(emailProviderLabel)
        : copy.emailMissing,
      docsHref: `${docsPrefix}/advanced-configuration#${emailDocsHash}`,
      icon: MailIcon,
      missing: status.email.missing,
      title: copy.emailTitle,
    },
    {
      id: "github",
      configured: status.github.configured,
      description: copy.githubDescription,
      detail: status.github.configured ? copy.githubConfigured : copy.githubMissing,
      docsHref: `${docsPrefix}/advanced-configuration#github-oauth`,
      icon: SiGithub,
      missing: status.github.missing,
      title: copy.githubTitle,
    },
    {
      id: "turnstile",
      configured: status.turnstile.configured,
      description: copy.turnstileDescription,
      detail: status.turnstile.configured ? copy.turnstileConfigured : copy.turnstileMissing,
      docsHref: `${docsPrefix}/advanced-configuration#cloudflare-turnstile`,
      icon: ShieldCheckIcon,
      missing: status.turnstile.missing,
      title: copy.turnstileTitle,
    },
  ];
}

function getSettingsActionCopy(locale: "en" | "zh") {
  if (locale === "zh") {
    return {
      backupCreated: "备份已创建",
      backupError: "备份创建失败",
      exportError: "导出失败",
      exportPreparingJson: "正在准备导出数据，完成后会自动下载。",
      exportPreparingZip: "正在后台创建导出包，完成后会自动下载。",
      exportStarted: "导出已开始",
      importError: "导入失败",
      importSuccess: (title: string) => `“${title}”已导入`,
      networkError: "网络异常，请稍后再试。",
      settingsError: "设置保存失败",
      settingsSaved: "设置已保存",
      tokenCreateError: "Token 创建失败",
      tokenCreated: "Token 已创建，请立即保存密钥。",
      tokenRevokeError: "Token 撤销失败",
      tokenRevoked: "Token 已撤销",
    };
  }

  return {
    backupCreated: "Backup created",
    backupError: "Backup could not be created",
    exportError: "Export failed",
    exportPreparingJson: "Preparing export data. The download will start automatically.",
    exportPreparingZip:
      "Creating the ZIP export in the background. The download will start automatically.",
    exportStarted: "Export started",
    importError: "Import failed",
    importSuccess: (title: string) => `"${title}" imported`,
    networkError: "Network error. Try again in a moment.",
    settingsError: "Settings could not be saved",
    settingsSaved: "Settings saved",
    tokenCreateError: "Token could not be created",
    tokenCreated: "Token created. Save the secret now.",
    tokenRevokeError: "Token could not be revoked",
    tokenRevoked: "Token revoked",
  };
}

function getAiProviderCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      apiKey: "API Key",
      apiKeyHelp: "留空会保留当前密钥；输入新密钥会替换已有密钥。",
      apiKeyPlaceholderConfigured: "已保存密钥，留空表示不修改",
      automationDescription:
        "配置完成后，发布文章时会自动生成摘要、Slug、标签，并同步生成英文版本。",
      automationItems: ["摘要", "Slug 和标签", "英文版本"],
      automationOff: "未启用",
      automationReady: "自动生效",
      automationTitle: "内容自动化",
      baseUrl: "Base URL",
      clearError: "API Key 清除失败",
      clearKey: "清除 Key",
      description:
        "可选配置 OpenAI-compatible Chat 模型。配置后，编辑器发布流程会默认使用内容自动化能力。",
      keyCleared: "API Key 已清除",
      keyConfigured: "Key 已保存",
      keyMissing: "未保存 Key",
      model: "Model name",
      save: "保存配置",
      saveError: "AI 配置保存失败",
      saved: "AI 配置已保存",
      test: "测试连接",
      testError: "AI 连接测试失败",
      tested: "AI 连接测试通过",
      title: "AI Provider",
      update: "更新配置",
    };
  }

  return {
    apiKey: "API key",
    apiKeyHelp: "Leave blank to keep the current key; enter a new key to replace it.",
    apiKeyPlaceholderConfigured: "Key is saved. Leave blank to keep it.",
    automationDescription:
      "When configured, publishing a post automatically generates the summary, slug, tags, and English version.",
    automationItems: ["Summary", "Slug and tags", "English version"],
    automationOff: "Not active",
    automationReady: "Runs automatically",
    automationTitle: "Content automation",
    baseUrl: "Base URL",
    clearError: "API key could not be cleared",
    clearKey: "Clear key",
    description:
      "Optionally connect an OpenAI-compatible chat model. Once configured, the editor uses content automation during publishing.",
    keyCleared: "API key cleared",
    keyConfigured: "Key saved",
    keyMissing: "No key saved",
    model: "Model name",
    save: "Save provider",
    saveError: "AI settings could not be saved",
    saved: "AI settings saved",
    test: "Test connection",
    testError: "AI connection test failed",
    tested: "AI connection test passed",
    title: "AI Provider",
    update: "Update provider",
  };
}

function getAdvancedConfigCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      configured: "已配置",
      description:
        "这些集成默认可不配置。后台只检测当前环境变量和绑定状态，真正的 Cloudflare、GitHub 或邮件服务配置在文档里完成。",
      docs: "查看文档",
      emailConfigured: (provider: string) => `已检测到邮件服务：${provider}。`,
      emailDescription: "用于密码重置、后台通知、导入导出通知，以及可选的评论账号邮箱验证。",
      emailMissing: "未检测到 Cloudflare Email Sending 或 Resend，核心发布和评论审核仍可正常使用。",
      emailTitle: "邮件发送",
      githubConfigured: "已检测到 GitHub OAuth client id 和 secret。",
      githubDescription: "为读者评论提供 GitHub 登录；未配置时仍可使用邮箱和密码登录。",
      githubMissing: "未检测到 GitHub OAuth 环境变量。",
      githubTitle: "GitHub 登录",
      needsSetup: "未配置",
      title: "进阶配置",
      turnstileConfigured: "已检测到 Turnstile site key 和 secret key，评论提交会启用校验。",
      turnstileDescription: "为评论提交增加 Cloudflare Turnstile 防滥用校验。",
      turnstileMissing: "未检测到完整 Turnstile 配置，评论会继续使用登录、限流和审核保护。",
      turnstileTitle: "Cloudflare Turnstile",
    };
  }

  return {
    configured: "Configured",
    description:
      "These integrations are optional by default. The admin area only detects current environment variables and bindings; setup happens in Cloudflare, GitHub, or the email provider.",
    docs: "Open docs",
    emailConfigured: (provider: string) => `Email provider detected: ${provider}.`,
    emailDescription:
      "Enables password resets, admin notifications, import/export notices, and optional comment email verification.",
    emailMissing:
      "Cloudflare Email Sending or Resend was not detected. Publishing and comment moderation still work.",
    emailTitle: "Email delivery",
    githubConfigured: "GitHub OAuth client id and secret were detected.",
    githubDescription:
      "Adds GitHub login for reader comments; email/password login remains available without it.",
    githubMissing: "GitHub OAuth environment variables were not detected.",
    githubTitle: "GitHub login",
    needsSetup: "Needs setup",
    title: "Advanced configuration",
    turnstileConfigured: "Turnstile site key and secret key were detected for comment checks.",
    turnstileDescription: "Adds Cloudflare Turnstile abuse protection to comment submission.",
    turnstileMissing:
      "Turnstile is not fully configured. Comments still use login, rate limits, and moderation.",
    turnstileTitle: "Cloudflare Turnstile",
  };
}

function normalizeAiProviderSettings(payload: unknown): AiProviderSettings {
  const root = asRecord(payload);
  const record = asRecord(root?.data) ?? root;

  if (!record) {
    return defaultAiProviderSettings;
  }

  const baseUrl = readString(record, ["baseUrl", "baseURL", "apiBaseUrl"]) ?? "";
  const model = readString(record, ["model", "modelName"]) ?? "";
  const configuredValue = readBoolean(record, ["configured", "enabled", "ready"]);
  const apiKeyConfigured =
    readBoolean(record, ["apiKeyConfigured", "hasApiKey", "keyConfigured"]) ??
    configuredValue ??
    false;

  return {
    apiKeyConfigured,
    baseUrl,
    configured: configuredValue ?? Boolean(apiKeyConfigured && baseUrl && model),
    model,
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function readString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string") {
      return value;
    }
  }

  return undefined;
}

function readBoolean(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "boolean") {
      return value;
    }
  }

  return undefined;
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
