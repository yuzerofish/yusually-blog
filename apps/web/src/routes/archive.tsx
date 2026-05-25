import { localizeSiteSettings } from "@repo/core";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { $getArchivePage, type ArchivePageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/archive")({
  loader: (): Promise<ArchivePageData> => $getArchivePage({ data: { locale: getCurrentLocale() } }),
  component: ArchivePage,
});

function ArchivePage() {
  const { groups, siteSettings }: ArchivePageData = Route.useLoaderData();
  const localizedSiteSettings = localizeSiteSettings(siteSettings, getCurrentLocale());

  return (
    <SiteShell siteSettings={localizedSiteSettings}>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">{m.archive_title()}</h1>
        <div className="mt-8 grid gap-5">
          {groups.map((group) => (
            <section
              key={group.key}
              className="rounded-lg border border-border/80 bg-card p-5 shadow-xs"
            >
              <h2 className="text-xl font-semibold">{group.label}</h2>
              <div className="mt-4 grid gap-3">
                {group.posts.map((post) => (
                  <Link
                    key={post.id}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="flex flex-col justify-between gap-2 rounded-md bg-muted/55 p-4 transition hover:bg-muted hover:text-link sm:flex-row sm:items-center"
                  >
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {post.publishedAt.slice(0, 10)}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
