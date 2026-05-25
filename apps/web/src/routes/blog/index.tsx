import { getPublishedPostsForLocale } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/blog/")({
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const locale = getCurrentLocale();
  const posts = getPublishedPostsForLocale(locale);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
            {m.blog_eyebrow()}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[#1e2b25] sm:text-5xl dark:text-white">
            {m.blog_title()}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#64716a] dark:text-[#aeb8b1]">
            {m.blog_description()}
          </p>
        </div>
        <div className="mt-8 grid gap-5">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} locale={locale} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
