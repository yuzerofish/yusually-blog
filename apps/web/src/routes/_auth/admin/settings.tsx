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
        primaryLanguage: formData.get("primaryLanguage"),
        commentsEnabled: formData.get("commentsEnabled") === "on",
        indexingEnabled: formData.get("indexingEnabled") === "on",
      }),
    });

    if (!response.ok) {
      setSettingsStatus("error");
      return;
    }

    const payload = (await response.json()) as { data: SiteSettings };
    setSiteSettings(payload.data);
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
      <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
        <form key={siteSettings.url} onSubmit={saveSettings} className="grid gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal">{m.admin_settings_title()}</h1>
              <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
                {m.admin_settings_help()}
              </p>
              {settingsStatus !== "idle" ? (
                <p
                  className={`mt-2 text-sm ${
                    settingsStatus === "saved" ? "text-[#1f6f5b]" : "text-[#b9442f]"
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
                className="h-10 rounded-md border border-[#26312c]/15 bg-white px-3 text-sm dark:border-white/10 dark:bg-[#111614]"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <div className="grid content-end gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="commentsEnabled"
                  defaultChecked={siteSettings.commentsEnabled}
                  className="size-4 rounded border-[#26312c]/20"
                />
                {m.comments()}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="indexingEnabled"
                  defaultChecked={siteSettings.indexingEnabled}
                  className="size-4 rounded border-[#26312c]/20"
                />
                {m.admin_settings_indexing()}
              </label>
            </div>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-[#26312c]/10 bg-white p-6 dark:border-white/10 dark:bg-[#171d1a]">
        <div className="flex items-start gap-3">
          <KeyRoundIcon className="mt-1 size-5 text-[#1f6f5b]" />
          <div>
            <h2 className="text-xl font-semibold tracking-normal">{m.admin_tokens_title()}</h2>
            <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
              {m.admin_tokens_description()}
            </p>
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
                    defaultChecked={["posts:read", "posts:write"].includes(scope)}
                    className="size-4 rounded border-[#26312c]/20"
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
          <p className="mt-4 rounded-md bg-[#f8f5ef] p-3 font-mono text-sm text-[#26312c] dark:bg-white/10 dark:text-[#f5f1e8]">
            {m.admin_token_secret_once()}: {secret}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          {tokens.map((token) => (
            <article
              key={token.id}
              className="rounded-lg border border-[#26312c]/10 bg-[#f8f5ef] p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="mt-1 text-xs text-[#64716a] dark:text-[#aeb8b1]">
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
