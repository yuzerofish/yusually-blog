import { apiTokens, getSiteSettingsForLocale, type ApiToken, type ApiTokenScope } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRoundIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";

import { apiTokenScopes } from "#/lib/cms-api";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/settings")({
  component: AdminSettingsPage,
});

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

function AdminSettingsPage() {
  const locale = getCurrentLocale();
  const siteSettings = getSiteSettingsForLocale(locale);
  const [tokens, setTokens] = useState<ApiToken[]>(apiTokens);
  const [secret, setSecret] = useState<string | null>(null);

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
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">{m.admin_settings_title()}</h1>
            <p className="mt-2 text-sm text-[#64716a] dark:text-[#aeb8b1]">
              {m.admin_settings_help()}
            </p>
          </div>
          <Button>{m.admin_save_settings()}</Button>
        </div>

        <form className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="site-name">{m.admin_settings_site_name()}</Label>
            <Input id="site-name" defaultValue={siteSettings.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="site-url">{m.admin_settings_site_url()}</Label>
            <Input id="site-url" defaultValue={siteSettings.url} />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="site-description">{m.admin_settings_description()}</Label>
            <Input id="site-description" defaultValue={siteSettings.description} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author-name">{m.admin_settings_author_name()}</Label>
            <Input id="author-name" defaultValue={siteSettings.authorName} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="default-og">{m.admin_settings_default_og()}</Label>
            <Input id="default-og" defaultValue={siteSettings.defaultOgImage} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="primary-language">{m.admin_settings_language()}</Label>
            <Input id="primary-language" defaultValue={siteSettings.primaryLanguage} />
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
