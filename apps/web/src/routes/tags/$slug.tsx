import { getPostsByTag, getTagBySlug } from "@repo/core";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";

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

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
          Tag
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
          {tag.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
          {tag.description}
        </p>
        <div className="mt-8 grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
