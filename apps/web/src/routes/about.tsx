import { localizeSiteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { $getAboutPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/about")({
  loader: () => $getAboutPageData(),
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="border-b border-border/80 pb-8">
          <img
            src={siteSettings.avatarUrl}
            alt=""
            className="size-20 rounded-md border border-border object-cover"
          />
          <h1 className="mt-6 text-4xl font-semibold">
            {m.nav_about()} {siteSettings.authorName}
          </h1>
        </div>

        <div className="mt-8 grid gap-4 text-base leading-7 text-muted-foreground">
          <p>{siteSettings.authorBio}</p>
          <p>{m.home_bilingual_intro_en()}</p>
          <p>{m.home_bilingual_intro_zh()}</p>
        </div>
      </section>
    </SiteShell>
  );
}
