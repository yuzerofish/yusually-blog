import {
  getFeaturedPostsForLocale,
  getPublishedPostsForLocale,
  getSiteSettingsForLocale,
  getTagsForLocale,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  UploadCloudIcon,
  WorkflowIcon,
} from "lucide-react";

import { PostCard } from "#/components/post-card";
import { SiteShell } from "#/components/site-shell";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const locale = getCurrentLocale();
  const posts = getPublishedPostsForLocale(locale);
  const featuredPosts = getFeaturedPostsForLocale(locale);
  const siteSettings = getSiteSettingsForLocale(locale);
  const tags = getTagsForLocale(locale);

  return (
    <SiteShell>
      <section className="border-b border-[#26312c]/10 bg-[#eee8da] dark:border-white/10 dark:bg-[#171d1a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold tracking-[0.18em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
              {m.home_eyebrow()}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] font-semibold tracking-normal text-balance text-[#1e2b25] sm:text-6xl dark:text-white">
              {siteSettings.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#56625c] dark:text-[#cbd3cd]">
              {siteSettings.description}
            </p>
            <div className="mt-5 grid max-w-2xl gap-2 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
              <p>{m.home_bilingual_intro_en()}</p>
              <p>{m.home_bilingual_intro_zh()}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                render={<Link to="/blog" search={{ q: "", tag: "", page: 1 }} />}
                size="lg"
                nativeButton={false}
              >
                {m.read_latest_posts()}
                <ArrowRightIcon />
              </Button>
              <Button
                render={<Link to="/admin" />}
                variant="outline"
                size="lg"
                nativeButton={false}
              >
                {m.open_cms()}
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-[#1f6f5b] p-5 text-white shadow-sm">
              <DatabaseIcon className="size-6" />
              <p className="mt-8 text-3xl font-semibold">D1</p>
              <p className="mt-2 text-sm leading-6 text-white/82">{m.feature_d1_body()}</p>
            </div>
            <div className="rounded-lg bg-[#e7d36a] p-5 text-[#26312c] shadow-sm">
              <UploadCloudIcon className="size-6" />
              <p className="mt-8 text-3xl font-semibold">R2</p>
              <p className="mt-2 text-sm leading-6 text-[#26312c]/72">{m.feature_r2_body()}</p>
            </div>
            <div className="rounded-lg bg-[#4b8fbf] p-5 text-white shadow-sm">
              <WorkflowIcon className="size-6" />
              <p className="mt-8 text-3xl font-semibold">{m.feature_api_title()}</p>
              <p className="mt-2 text-sm leading-6 text-white/82">{m.feature_api_body()}</p>
            </div>
            <div className="rounded-lg bg-[#e96f3a] p-5 text-white shadow-sm">
              <ShieldCheckIcon className="size-6" />
              <p className="mt-8 text-3xl font-semibold">{m.feature_moderation_title()}</p>
              <p className="mt-2 text-sm leading-6 text-white/82">{m.feature_moderation_body()}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#1f6f5b] uppercase dark:text-[#75c5ad]">
              {m.featured()}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
              {m.home_featured_title()}
            </h2>
          </div>
          <Button
            render={<Link to="/blog" search={{ q: "", tag: "", page: 1 }} />}
            variant="outline"
            nativeButton={false}
          >
            {m.view_all_posts()}
            <ArrowRightIcon />
          </Button>
        </div>
        <div className="mt-6 grid gap-5">
          {featuredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-t border-[#26312c]/10 bg-white/60 dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
              {m.tags_title()}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
              {m.home_tags_description()}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to="/tags/$slug"
                params={{ slug: tag.slug }}
                className="rounded-lg border border-[#26312c]/10 bg-white px-4 py-3 text-sm font-medium text-[#26312c] shadow-sm hover:border-[#1f6f5b] hover:text-[#1f6f5b] dark:border-white/10 dark:bg-[#171d1a] dark:text-[#f5f1e8]"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-normal text-[#1e2b25] dark:text-white">
            {m.latest_posts()}
          </h2>
          <span className="text-sm text-[#64716a] dark:text-[#aeb8b1]">
            {m.published_count({ count: posts.length })}
          </span>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-[#26312c]/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#171d1a]"
            >
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
                <h3 className="text-xl font-semibold tracking-normal group-hover:text-[#1f6f5b]">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#64716a] dark:text-[#aeb8b1]">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
