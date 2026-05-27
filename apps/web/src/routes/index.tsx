import {
  formatDate,
  localizePost,
  localizeSiteSettings,
  localizeTag,
  type Post,
  type SiteSettings,
  type SupportedLocale,
  type Tag,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, CalendarDaysIcon, HashIcon } from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getHomePageData, type HomePageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/")({
  loader: (): Promise<HomePageData> => $getHomePageData(),
  component: HomePage,
});

type HomeViewProps = {
  readonly posts: Post[];
  readonly featuredPosts: Post[];
  readonly siteSettings: SiteSettings;
  readonly tags: Tag[];
  readonly locale: SupportedLocale;
};

function HomePage() {
  const data: HomePageData = Route.useLoaderData();
  const locale = getCurrentLocale();
  const posts = data.posts.map((post) => localizePost(post, locale));
  const featuredPosts = data.featuredPosts.map((post) => localizePost(post, locale));
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const tags = data.tags.map((tag) => localizeTag(tag, locale));
  const homeProps = { posts, featuredPosts, siteSettings, tags, locale };

  return (
    <SiteShell siteSettings={siteSettings}>
      <ShelfHome {...homeProps} />
    </SiteShell>
  );
}

function ShelfHome({ posts, featuredPosts, siteSettings, tags, locale }: HomeViewProps) {
  const copy = getHomeCopy(locale);
  const primaryPost = featuredPosts[0] ?? posts[0];
  const secondaryPosts = (
    featuredPosts.length > 1 ? featuredPosts.slice(1, 4) : posts.slice(1, 4)
  ).filter(Boolean);
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-10">
      <aside className="self-start border-border/80 lg:sticky lg:top-24 lg:border-r lg:pr-7">
        <div className="flex items-center gap-4 lg:block">
          <img
            src={siteSettings.avatarUrl}
            alt=""
            className="size-16 rounded-lg border border-border bg-card object-cover lg:size-20"
          />
          <div className="min-w-0 lg:mt-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {copy.personalSite}
            </p>
            <h1 className="mt-1 text-2xl leading-tight font-semibold text-balance">
              {siteSettings.name}
            </h1>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">{siteSettings.authorBio}</p>

        <div className="mt-7">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.entry}
          </p>
          <div className="mt-3 grid gap-2">
            {siteSettings.navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {item.label}
                <ArrowRightIcon className="size-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.channels}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {siteSettings.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <section className="border-b border-border pb-8">
          <p className="text-sm font-semibold tracking-wide text-link uppercase">
            {m.home_eyebrow()}
          </p>
          <h2 className="mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {copy.heroTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
            {locale === "zh" ? m.home_bilingual_intro_zh() : m.home_bilingual_intro_en()}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              render={<Link to="/blog" search={{ q: "", tag: "", page: 1 }} />}
              nativeButton={false}
            >
              {m.read_latest_posts()}
              <ArrowRightIcon />
            </Button>
            <Button render={<Link to="/projects" />} variant="outline" nativeButton={false}>
              {m.nav_projects()}
            </Button>
          </div>
        </section>

        {primaryPost ? (
          <section className="grid gap-5 border-b border-border py-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-lg border border-border bg-card p-6 transition hover:border-foreground">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {m.featured()}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: primaryPost.slug }}
                className="group mt-6 block"
              >
                <h2 className="max-w-3xl text-4xl leading-[1.02] font-semibold text-balance group-hover:text-link">
                  {primaryPost.title}
                </h2>
              </Link>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                {primaryPost.excerpt}
              </p>
              <PostMeta post={primaryPost} locale={locale} className="mt-8" />
            </article>
            <div className="grid gap-3">
              {secondaryPosts.map((post) => (
                <CompactPostLink key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card">
              <HashIcon className="size-5" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{m.tags_title()}</h2>
          </div>
          <div className="flex flex-wrap content-start gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to="/tags/$slug"
                params={{ slug: tag.slug }}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div>
            <h2 className="text-2xl font-semibold">{m.latest_posts()}</h2>
          </div>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <ArticleRow key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CompactPostLink({
  post,
  locale,
}: {
  readonly post: Post;
  readonly locale: SupportedLocale;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-4 transition hover:border-foreground">
      <PostMeta post={post} locale={locale} />
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="group mt-3 block">
        <h3 className="text-xl leading-tight font-semibold text-balance group-hover:text-link">
          {post.title}
        </h3>
      </Link>
    </article>
  );
}

function ArticleRow({ post, locale }: { readonly post: Post; readonly locale: SupportedLocale }) {
  return (
    <article className="grid gap-3 py-5 transition hover:bg-muted/35 sm:grid-cols-[130px_minmax(0,1fr)] sm:px-3">
      <PostMeta post={post} locale={locale} />
      <div className="min-w-0">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
          <h3 className="text-xl leading-tight font-semibold text-balance group-hover:text-link">
            {post.title}
          </h3>
        </Link>
      </div>
    </article>
  );
}

function PostMeta({
  post,
  locale,
  className = "",
}: {
  readonly post: Post;
  readonly locale: SupportedLocale;
  readonly className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-muted-foreground ${className}`}>
      <span className="inline-flex items-center gap-1">
        <CalendarDaysIcon className="size-3.5" />
        {formatDate(post.publishedAt, locale)}
      </span>
      {post.tags.slice(0, 2).map((tag) => (
        <Link
          key={tag.slug}
          to="/tags/$slug"
          params={{ slug: tag.slug }}
          className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-0.5 transition hover:text-foreground"
        >
          <HashIcon className="size-3" />
          {tag.name}
        </Link>
      ))}
    </div>
  );
}

function getHomeCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      personalSite: "个人网站",
      entry: "站内入口",
      channels: "社交账号",
      heroTitle: "把文章、视频和想法先放回自己的博客。",
    };
  }

  return {
    personalSite: "Personal site",
    entry: "Start here",
    channels: "Channels",
    heroTitle: "Publish articles, videos, and working notes on your own site first.",
  };
}
