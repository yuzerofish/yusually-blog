import { localizeSiteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { $getSiteSettingsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/about")({
  loader: () => $getSiteSettingsPageData(),
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  const siteSettings = localizeSiteSettings(data.siteSettings, getCurrentLocale());

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border/80 bg-card p-7 shadow-xs">
          <img
            src={siteSettings.avatarUrl}
            alt=""
            className="size-20 rounded-md border border-border object-cover"
          />
          <h1 className="mt-6 text-4xl font-semibold">
            {m.nav_about()} {siteSettings.authorName}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{siteSettings.authorBio}</p>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {m.home_bilingual_intro_en()}
          </p>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {m.home_bilingual_intro_zh()}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
