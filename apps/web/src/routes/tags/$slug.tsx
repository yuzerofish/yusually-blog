import { getPostsByTag, getTagBySlug, localizePost, localizeTag } from "@repo/core";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/tags/$slug")({
  loader: ({ params }) => {
    const tag = getTagBySlug(params.slug);

    if (!tag) {
      throw notFound();
    }

    return {
      tag,
      posts: getPostsByTag(tag.slug),
    };
  },
  component: TagDetailPage,
});

function TagDetailPage() {
  const { posts, tag } = Route.useLoaderData();
  const locale = getCurrentLocale();
  const localizedTag = localizeTag(tag, locale);
  const localizedPosts = posts.map((post) => localizePost(post, locale));

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
          {m.tag_eyebrow()}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
          {localizedTag.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
          {localizedTag.description}
        </p>
        <div className="mt-8 grid gap-5">
          {localizedPosts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
