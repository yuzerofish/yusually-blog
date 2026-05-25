import { localizePost, localizeTag } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { $getBlogIndexPage } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/blog/")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    tag: typeof search.tag === "string" ? search.tag : "",
    page: Math.max(1, Number(search.page) || 1),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    $getBlogIndexPage({
      data: {
        query: deps.q,
        tagSlug: deps.tag || undefined,
      },
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const locale = getCurrentLocale();
  const search = Route.useSearch();
  const data = Route.useLoaderData();
  const pageSize = 6;
  const tags = data.tags.map((tag) => localizeTag(tag, locale));
  const matchedPosts = data.posts.map((post) => localizePost(post, locale));
  const pageCount = Math.max(1, Math.ceil(matchedPosts.length / pageSize));
  const currentPage = Math.min(search.page, pageCount);
  const posts = matchedPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
        <form className="mt-8 grid gap-4 rounded-lg border border-[#26312c]/10 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_auto] dark:border-white/10 dark:bg-[#171d1a]">
          <label className="relative block">
            <span className="sr-only">{m.blog_search_placeholder()}</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64716a]" />
            <Input
              name="q"
              defaultValue={search.q}
              placeholder={m.blog_search_placeholder()}
              className="pl-9"
            />
          </label>
          <Button type="submit">{m.blog_search_submit()}</Button>
          <div className="flex flex-wrap gap-2 md:col-span-2" aria-label={m.blog_filter_label()}>
            <Button
              render={
                <a
                  href={search.q ? `/blog?q=${encodeURIComponent(search.q)}` : "/blog"}
                  aria-label={m.blog_filter_all()}
                />
              }
              nativeButton={false}
              variant={search.tag ? "outline" : "default"}
              size="sm"
            >
              {m.blog_filter_all()}
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag.slug}
                render={
                  <a
                    href={`/blog?${new URLSearchParams({
                      ...(search.q ? { q: search.q } : {}),
                      tag: tag.slug,
                    }).toString()}`}
                    aria-label={tag.name}
                  />
                }
                nativeButton={false}
                variant={search.tag === tag.slug ? "default" : "outline"}
                size="sm"
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </form>
        <div className="mt-8 grid gap-5">
          {posts.length ? (
            posts.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index === 0} locale={locale} />
            ))
          ) : (
            <p className="rounded-lg border border-[#26312c]/10 bg-white p-6 text-sm text-[#64716a] dark:border-white/10 dark:bg-[#171d1a] dark:text-[#aeb8b1]">
              {m.blog_no_results()}
            </p>
          )}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#64716a] dark:text-[#aeb8b1]">
            {m.pagination_page({ current: currentPage, total: pageCount })}
          </p>
          <div className="flex gap-2">
            <Button
              render={
                <a
                  href={`/blog?${new URLSearchParams({
                    ...(search.q ? { q: search.q } : {}),
                    ...(search.tag ? { tag: search.tag } : {}),
                    page: String(Math.max(1, currentPage - 1)),
                  }).toString()}`}
                  aria-label={m.pagination_previous()}
                />
              }
              nativeButton={false}
              variant="outline"
              disabled={currentPage <= 1}
            >
              {m.pagination_previous()}
            </Button>
            <Button
              render={
                <a
                  href={`/blog?${new URLSearchParams({
                    ...(search.q ? { q: search.q } : {}),
                    ...(search.tag ? { tag: search.tag } : {}),
                    page: String(Math.min(pageCount, currentPage + 1)),
                  }).toString()}`}
                  aria-label={m.pagination_next()}
                />
              }
              nativeButton={false}
              variant="outline"
              disabled={currentPage >= pageCount}
            >
              {m.pagination_next()}
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
