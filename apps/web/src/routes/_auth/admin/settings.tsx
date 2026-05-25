import { getSiteSettingsForLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { createFileRoute } from "@tanstack/react-router";

import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/_auth/admin/settings")({
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const locale = getCurrentLocale();
  const siteSettings = getSiteSettingsForLocale(locale);

  return (
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
  );
}
