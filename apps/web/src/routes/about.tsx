import { getSiteSettingsForLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const siteSettings = getSiteSettingsForLocale(getCurrentLocale());

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#26312c]/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-[#171d1a]">
          <img
            src={siteSettings.avatarUrl}
            alt=""
            className="size-20 rounded-md border border-[#26312c]/10 object-cover dark:border-white/10"
          />
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
            {m.nav_about()} {siteSettings.authorName}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#56625c] dark:text-[#cbd3cd]">
            {siteSettings.authorBio}
          </p>
          <p className="mt-5 text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
            {m.home_bilingual_intro_en()}
          </p>
          <p className="mt-3 text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
            {m.home_bilingual_intro_zh()}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
