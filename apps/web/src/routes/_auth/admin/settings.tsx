import {
  apiTokens,
  getSiteSettingsForLocale,
  type ApiToken,
  type ApiTokenScope,
  type SiteSettings,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRoundIcon } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { apiTokenScopes } from "#/lib/cms-api";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/settings")({
  component: AdminSettingsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminSettingsPage() {
  const locale = getCurrentLocale();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettingsForLocale(locale));
  const [tokens, setTokens] = useState<ApiToken[]>(apiTokens);
  const [secret, setSecret] = useState<string | null>(null);
  const [settingsStatus, setSettingsStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    let ignore = false;

    void Promise.all([
      fetch("/api/site").then((response) => (response.ok ? response.json() : undefined)),
      fetch("/api/tokens").then((response) => (response.ok ? response.json() : undefined)),
    ]).then(([sitePayload, tokenPayload]) => {
      const siteData = (sitePayload as { data?: SiteSettings } | undefined)?.data;
      const tokenData = (tokenPayload as { data?: ApiToken[] } | undefined)?.data;

      if (!ignore && siteData) {
        setSiteSettings(siteData);
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
        defaultOgImage: formData.get("defaultOgImage"),
        themePreset: formData.get("themePreset"),
        primaryLanguage: formData.get("primaryLanguage"),
        rssEnabled: formData.get("rssEnabled") === "on",
        commentsEnabled: formData.get("commentsEnabled") === "on",
        commentsRequireApproval: formData.get("commentsRequireApproval") === "on",
        commentAutoBlockEnabled: formData.get("commentAutoBlockEnabled") === "on",
        commentBlockedKeywords: blockedKeywords,
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

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
        <form key={siteSettings.url} onSubmit={saveSettings} className="grid gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold">{m.admin_settings_title()}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{m.admin_settings_help()}</p>
              {settingsStatus !== "idle" ? (
                <p
                  className={`mt-2 text-sm ${
                    settingsStatus === "saved" ? "text-success" : "text-destructive"
                  }`}
                >
                  {settingsStatus === "saved" ? m.admin_settings_saved() : m.admin_settings_error()}
                </p>
              ) : null}
            </div>
            <Button type="submit">{m.admin_save_settings()}</Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
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
            <div className="grid gap-2">
              <Label htmlFor="primary-language">{m.admin_settings_language()}</Label>
              <select
                id="primary-language"
                name="primaryLanguage"
                defaultValue={siteSettings.primaryLanguage}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
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
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="maker">Maker</option>
                <option value="apple">{m.theme_preset_apple()}</option>
                <option value="editorial">{m.theme_preset_editorial()}</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="layout-preset">Homepage layout</Label>
              <select
                id="layout-preset"
                name="layoutPreset"
                defaultValue={siteSettings.layoutPreset}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="shelf">Shelf</option>
                <option value="developer">Developer</option>
                <option value="journal">Journal</option>
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
                  className="min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20"
                />
                <p className="text-xs text-muted-foreground">
                  {m.admin_comments_blocked_keywords_help()}
                </p>
              </div>
            </fieldset>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-border/80 bg-card p-6 shadow-xs">
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
      </section>
    </div>
  );
}
