import { localizePost, localizeSiteSettings, localizeTag } from "@repo/core";
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
import { $getHomePageData, type HomePageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";

export const Route = createFileRoute("/")({
  loader: (): Promise<HomePageData> => $getHomePageData(),
  component: HomePage,
});

function HomePage() {
  const data: HomePageData = Route.useLoaderData();
  const locale = getCurrentLocale();
  const posts = data.posts.map((post) => localizePost(post, locale));
  const featuredPosts = data.featuredPosts.map((post) => localizePost(post, locale));
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const tags = data.tags.map((tag) => localizeTag(tag, locale));

  return (
    <SiteShell siteSettings={siteSettings}>
      <section className="border-b border-border/80 bg-muted/35">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-link uppercase">{m.home_eyebrow()}</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl">
              {siteSettings.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteSettings.description}
            </p>
            <div className="mt-5 grid max-w-2xl gap-2 text-sm leading-6 text-muted-foreground">
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
            <div className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
              <span className="flex size-10 items-center justify-center rounded-md bg-muted text-link">
                <DatabaseIcon className="size-5" />
              </span>
              <p className="mt-8 text-3xl font-semibold">D1</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.feature_d1_body()}</p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <UploadCloudIcon className="size-5" />
              </span>
              <p className="mt-8 text-3xl font-semibold">R2</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.feature_r2_body()}</p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
              <span className="flex size-10 items-center justify-center rounded-md bg-muted text-link">
                <WorkflowIcon className="size-5" />
              </span>
              <p className="mt-8 text-3xl font-semibold">{m.feature_api_title()}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.feature_api_body()}</p>
            </div>
            <div className="rounded-lg border border-border/80 bg-card p-5 shadow-xs">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <ShieldCheckIcon className="size-5" />
              </span>
              <p className="mt-8 text-3xl font-semibold">{m.feature_moderation_title()}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {m.feature_moderation_body()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-link uppercase">{m.featured()}</p>
            <h2 className="mt-2 text-3xl font-semibold">{m.home_featured_title()}</h2>
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

      <section className="border-y border-border/80 bg-card/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold">{m.tags_title()}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {m.home_tags_description()}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to="/tags/$slug"
                params={{ slug: tag.slug }}
                className="rounded-md border border-border bg-background px-4 py-3 text-sm font-medium shadow-xs transition hover:border-ring/50 hover:bg-muted hover:text-foreground"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">{m.latest_posts()}</h2>
          <span className="text-sm text-muted-foreground">
            {m.published_count({ count: posts.length })}
          </span>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-border/80 bg-card p-5 shadow-xs transition hover:border-ring/45 hover:bg-card/85"
            >
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
                <h3 className="text-xl font-semibold group-hover:text-link">{post.title}</h3>
              </Link>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
