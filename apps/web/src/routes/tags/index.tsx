import { localizePost, localizeTag } from "@repo/core";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { $getTagsPage } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/tags/")({
  loader: () => $getTagsPage(),
  component: TagsPage,
});

function TagsPage() {
  const locale = getCurrentLocale();
  const data = Route.useLoaderData();
  const posts = data.posts.map((post) => localizePost(post, locale));
  const tags = data.tags.map((tag) => localizeTag(tag, locale));

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
          {m.tags_title()}
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tags.map((tag) => {
            const count = posts.filter((post) =>
              post.tags.some((postTag) => postTag.slug === tag.slug),
            ).length;

            return (
              <Link
                key={tag.slug}
                to="/tags/$slug"
                params={{ slug: tag.slug }}
                className="rounded-lg border border-[#26312c]/10 bg-white p-5 shadow-sm hover:border-[#1f6f5b] dark:border-white/10 dark:bg-[#171d1a]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold">{tag.name}</h2>
                  <span className="rounded-sm bg-[#e7d36a] px-2 py-1 text-xs text-[#26312c]">
                    {m.posts_count({ count })}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
                  {tag.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
