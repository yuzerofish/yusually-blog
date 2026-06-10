import {
  formatDate,
  localizePost,
  localizeSiteSettings,
  type Post,
  type SupportedLocale,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BarChart3Icon,
  BookOpenIcon,
  CameraIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  MapIcon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type CSSProperties } from "react";

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
  readonly locale: SupportedLocale;
};

type CreatorSpotlight = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly icon: LucideIcon;
};

type HomeRevealStyle = CSSProperties & {
  readonly "--home-reveal-delay": string;
};

function HomePage() {
  const data: HomePageData = Route.useLoaderData();
  const locale = getCurrentLocale();
  const posts = data.posts.map((post) => localizePost(post, locale)).filter(isReaderFacingPost);
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const homeProps = { posts, locale };

  return (
    <SiteShell siteSettings={siteSettings}>
      <ShelfHome {...homeProps} />
    </SiteShell>
  );
}

function ShelfHome({ posts, locale }: HomeViewProps) {
  const copy = getHomeCopy(locale);
  const latestPosts = posts.slice(0, 3);

  return (
    <div data-home-surface className="bg-background">
      <HomeMotionController />
      {/* ── Hero ── */}
      <section
        data-home-hero
        className="relative isolate overflow-hidden border-b-2 border-foreground"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-20 xl:px-12">
          <p
            data-home-reveal
            style={getRevealStyle(0)}
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase"
          >
            {copy.eyebrow}
          </p>
          <h1
            data-home-reveal
            style={getRevealStyle(90)}
            className="mt-6 max-w-5xl text-4xl leading-[0.98] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            {copy.heroTitle}
          </h1>
          <p
            data-home-reveal
            style={getRevealStyle(180)}
            className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {copy.heroBody}
          </p>
          <div data-home-reveal style={getRevealStyle(270)} className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<a href={"/blog"} aria-label={copy.primaryCta} />}
              nativeButton={false}
              size="lg"
              className="hover:-translate-y-0.5"
            >
              {copy.primaryCta}
              <ArrowRightIcon />
            </Button>
            <Button
              render={<Link to="/about" />}
              variant="outline"
              nativeButton={false}
              size="lg"
              className="hover:-translate-y-0.5"
            >
              <FileTextIcon />
              {copy.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      <LatestPostsSection copy={copy} latestPosts={latestPosts} locale={locale} />

      <CreatorSection copy={copy} />
    </div>
  );
}

function CreatorSection({ copy }: { readonly copy: ReturnType<typeof getHomeCopy> }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <div className="grid gap-9 lg:grid-cols-[0.4fr_0.6fr]">
          <div data-home-reveal className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.creatorEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.creatorTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.creatorBody}</p>
          </div>

          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {copy.creatorSpotlights.map((item, index) => (
              <CreatorSpotlightCard key={item.href} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorSpotlightCard({
  index,
  item,
}: {
  readonly index: number;
  readonly item: CreatorSpotlight;
}) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="group bg-background p-5 transition hover:bg-muted/35"
    >
      <span
        data-home-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span className="mt-5 block text-lg leading-tight font-semibold group-hover:text-link">
        {item.title}
      </span>
      <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
      <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-link">
        {item.cta}
        <ExternalLinkIcon className="size-4" />
      </span>
    </a>
  );
}

function LatestPostsSection({
  copy,
  latestPosts,
  locale,
}: {
  readonly copy: ReturnType<typeof getHomeCopy>;
  readonly latestPosts: Post[];
  readonly locale: SupportedLocale;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <div data-home-reveal className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-link uppercase">{copy.contentEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold">{copy.contentTitle}</h2>
          </div>
        </div>

        {latestPosts.length ? (
          <div
            className={`mt-7 grid gap-px border border-border bg-border ${getLatestPostsGridClassName(
              latestPosts.length,
            )}`}
          >
            {latestPosts.map((post, index) => (
              <LatestPostCard key={post.id} post={post} locale={locale} index={index} />
            ))}
          </div>
        ) : null}

        <div data-home-reveal className="mt-7">
          <Button
            render={<Link to="/blog" search={{ q: "", tag: "", series: "", page: 1 }} />}
            variant="outline"
            nativeButton={false}
            className="hover:-translate-y-0.5"
          >
            {m.view_all_posts()}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}

function getLatestPostsGridClassName(count: number) {
  if (count <= 1) {
    return "md:grid-cols-1";
  }

  if (count === 2) {
    return "md:grid-cols-2";
  }

  return "md:grid-cols-3";
}

function LatestPostCard({
  index,
  locale,
  post,
}: {
  readonly index: number;
  readonly locale: SupportedLocale;
  readonly post: Post;
}) {
  return (
    <article
      data-home-reveal
      data-home-card
      style={getRevealStyle(index * 70)}
      className="flex min-h-44 flex-col bg-background p-4 transition hover:bg-muted/35"
    >
      <div className="flex items-start justify-between gap-3">
        <time dateTime={post.publishedAt} className="text-xs font-medium text-muted-foreground">
          {formatDate(post.publishedAt, locale)}
        </time>
        <PostBadges post={post} />
      </div>
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="group mt-5 block">
        <h3 className="line-clamp-2 text-lg leading-tight font-semibold text-balance group-hover:text-link">
          {post.title}
        </h3>
      </Link>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
    </article>
  );
}

function HomeMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-surface]");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));

    const reveal = (element: HTMLElement) => {
      element.dataset.homeReveal = "visible";
    };

    const isInView = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();

      return rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(reveal);
      return;
    }

    elements.filter(isInView).forEach(reveal);
    root?.setAttribute("data-home-motion-ready", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    elements
      .filter((element) => element.dataset.homeReveal !== "visible")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}

function getRevealStyle(delayMs: number): HomeRevealStyle {
  return {
    "--home-reveal-delay": `${delayMs}ms`,
  };
}

function PostBadges({ post }: { readonly post: Post }) {
  if (!post.pinned && !post.featured) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {post.pinned ? (
        <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {m.pinned()}
        </span>
      ) : null}
      {post.featured ? (
        <span className="rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
          {m.featured()}
        </span>
      ) : null}
    </div>
  );
}

function isReaderFacingPost(post: { title: string; slug: string }) {
  const normalized = `${post.title} ${post.slug}`.toLowerCase();

  return !["e2e comment flow", "smoke post", "e2e edit smoke"].some((marker) =>
    normalized.includes(marker),
  );
}

function getHomeCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      eyebrow: "个人博客 · 地图 · 旅行 · 技术 · 自媒体",
      heroTitle: "一个还在摸索世界的人。",
      heroBody:
        "从地图开始：路线追踪的乐趣、发现隐藏路径的惊喜、理解万物连接的快感。这份好奇心驱使我从地理走向技术，从旅行走向自媒体。",
      primaryCta: "阅读博客",
      secondaryCta: "关于 Yusually",

      // ── Content ──
      contentEyebrow: "博客",
      contentTitle: "最新文章",

      // ── Creator ──
      creatorEyebrow: "出品方",
      creatorTitle: "由 Yusually 持续维护。",
      creatorBody:
        "这里展示 Yusualy 从地理到技术、从旅行到自媒体的探索轨迹，以及亲手搭建的项目和沉淀的思考。",
      creatorSpotlights: [
        {
          title: "TravelTrace",
          description:
            "交互式旅行日记与路线可视化平台。用 React + Mapbox 搭建，记录旅程、标记回忆。",
          href: "https://traveltrace.life",
          cta: "查看",
          icon: MapIcon,
        },
        {
          title: "Shape of World",
          description: "Treemap 数据探索平台，用可视化展示世界的构成 — GDP、人口、贸易等。",
          href: "https://shapeof.world",
          cta: "查看",
          icon: GlobeIcon,
        },
        {
          title: "自媒体运营全维度调研",
          description: "2025–2026 年中国主流平台自媒体运营的全维度研究报告。",
          href: "/self-media-report/自媒体运营全维度调研整合.html",
          cta: "阅读",
          icon: BookOpenIcon,
        },
        {
          title: "Skills 技能库",
          description:
            "交互式技能库目录，展示全部 Claude Code 自定义技能 — 视频管线、内容创作、人物视角等。",
          href: "/skills-portfolio/",
          cta: "探索",
          icon: BarChart3Icon,
        },
        {
          title: "感受自己的浪",
          description: "从浮潜到人生的完整叙事 —— 一篇关于信任、节奏和自我发现的文章。",
          href: "/blog/感受自己的浪",
          cta: "阅读",
          icon: CameraIcon,
        },
      ] satisfies CreatorSpotlight[],
    };
  }

  // ── English ──
  return {
    eyebrow: "Personal blog · Maps · Travel · Tech · Self-media",
    heroTitle: "Someone still figuring out the world.",
    heroBody:
      "It started with maps: the joy of tracing routes, discovering hidden paths, and understanding how places connect. That curiosity led from geography to technology, from travel to self-media.",
    primaryCta: "Read the blog",
    secondaryCta: "About Yusually",

    // ── Content ──
    contentEyebrow: "Blog",
    contentTitle: "Latest posts",

    // ── Creator ──
    creatorEyebrow: "Made by",
    creatorTitle: "Maintained by Yusually.",
    creatorBody:
      "Follow Yusually's journey from geography to technology, travel to self-media — with hand-built projects and thoughtful reflections.",
    creatorSpotlights: [
      {
        title: "TravelTrace",
        description:
          "Record every journey through maps and routes, turning travel experiences into visual traces.",
        href: "https://traveltrace.life",
        cta: "View",
        icon: MapIcon,
      },
      {
        title: "Shape of World",
        description:
          "Treemap data exploration visualizing how the world is composed — GDP, population, trade.",
        href: "https://shapeof.world",
        cta: "View",
        icon: GlobeIcon,
      },
      {
        title: "Self-Media Research",
        description:
          "Comprehensive report on China's self-media operations across major platforms 2025-2026.",
        href: "/self-media-report/自媒体运营全维度调研整合.html",
        cta: "Read",
        icon: BookOpenIcon,
      },
      {
        title: "Skills Portfolio",
        description:
          "Interactive skill directory of all Claude Code skills — video pipeline, content creation, perspectives, and more.",
        href: "/skills-portfolio/",
        cta: "Explore",
        icon: BarChart3Icon,
      },
      {
        title: "Feeling My Own Waves",
        description:
          "A full narrative from snorkeling to life — a story about trust, rhythm, and self-discovery.",
        href: "/blog/感受自己的浪",
        cta: "Read",
        icon: CameraIcon,
      },
    ] satisfies CreatorSpotlight[],
  };
}
