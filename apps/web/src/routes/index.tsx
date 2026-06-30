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
  readonly meta: string;
};

type HomeMetric = {
  readonly label: string;
  readonly value: string;
};

type WorkbenchItem = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly category: string;
  readonly status: string;
  readonly keywords: readonly string[];
  readonly previewSrc: string;
  readonly previewAlt: string;
  readonly featured?: boolean;
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
      <section
        data-home-hero
        className="relative isolate overflow-hidden border-b-2 border-foreground bg-foreground text-background"
      >
        <img
          data-home-hero-image
          src="/home/yusually-atlas-lab-hero.png"
          alt={copy.heroImageAlt}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div data-home-hero-scrim className="absolute inset-0 z-[1]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] max-w-6xl flex-col justify-start px-4 pt-12 pb-36 sm:px-6 sm:pt-16 sm:pb-12 lg:min-h-[calc(100dvh-10rem)] lg:px-8 lg:pt-24 xl:px-12">
          <div className="max-w-4xl">
            <p
              data-home-reveal
              style={getRevealStyle(0)}
              className="text-sm font-semibold tracking-wide text-background/76 uppercase"
            >
              {copy.eyebrow}
            </p>
            <h1
              data-home-reveal
              style={getRevealStyle(90)}
              className="mt-5 max-w-4xl text-4xl leading-[0.95] font-semibold text-balance sm:text-6xl lg:text-7xl"
            >
              {copy.heroTitle}
            </h1>
            <p
              data-home-reveal
              style={getRevealStyle(180)}
              className="mt-6 max-w-2xl text-base leading-7 text-background/78 sm:text-lg"
            >
              {copy.heroBody}
            </p>
            <div data-home-reveal style={getRevealStyle(270)} className="mt-8 flex flex-wrap gap-3">
              <Button
                render={<Link to="/works" aria-label={copy.primaryCta} />}
                nativeButton={false}
                size="lg"
                className="border-background bg-background text-foreground hover:-translate-y-0.5 hover:bg-background/92"
              >
                {copy.primaryCta}
                <ArrowRightIcon />
              </Button>
              <Button
                render={<Link to="/blog" search={{ q: "", tag: "", series: "", page: 1 }} />}
                variant="outline"
                nativeButton={false}
                size="lg"
                className="border-background/48 bg-transparent text-background hover:-translate-y-0.5 hover:bg-background/12"
              >
                <FileTextIcon />
                {copy.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.3fr)] lg:items-end">
            <div
              data-home-reveal
              style={getRevealStyle(360)}
              className="grid max-w-3xl grid-cols-3 border border-background/28 bg-foreground/18 backdrop-blur-md"
            >
              {copy.heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-r border-background/24 p-4 last:border-r-0"
                >
                  <p className="text-2xl leading-none font-semibold tabular-nums sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs leading-4 font-medium text-background/68">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              data-home-reveal
              data-home-artifact-card
              style={getRevealStyle(450)}
              className="border border-background/24 bg-background/10 p-4 text-background shadow-2xl backdrop-blur-md"
            >
              <p className="text-xs font-semibold tracking-wide text-background/64 uppercase">
                {copy.artifactEyebrow}
              </p>
              <p className="mt-3 text-lg leading-tight font-semibold">{copy.artifactTitle}</p>
              <p className="mt-3 text-sm leading-6 text-background/72">{copy.artifactBody}</p>
            </div>
          </div>
        </div>
      </section>

      <WorkbenchSection copy={copy} />

      <LatestPostsSection copy={copy} latestPosts={latestPosts} locale={locale} />

      <CreatorSection copy={copy} />
    </div>
  );
}

function WorkbenchSection({ copy }: { readonly copy: ReturnType<typeof getHomeCopy> }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div data-home-reveal className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.workbenchEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.workbenchTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.workbenchBody}</p>
          </div>

          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {copy.workbenchItems.map((item, index) => (
              <WorkbenchCard key={item.href} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkbenchCard({ index, item }: { readonly index: number; readonly item: WorkbenchItem }) {
  const isExternal = item.href.startsWith("http");

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      data-home-reveal
      data-home-card
      data-home-workbench-card
      style={getRevealStyle(index * 70)}
      className={`group flex min-h-full flex-col bg-background transition hover:bg-muted/35 ${
        item.featured ? "md:col-span-2" : ""
      }`}
    >
      <span
        data-home-workbench-preview
        className={`relative block overflow-hidden bg-muted ${
          item.featured ? "aspect-[16/7]" : "aspect-[4/3]"
        }`}
      >
        <img src={item.previewSrc} alt={item.previewAlt} className="h-full w-full object-cover" />
        <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-foreground/72 to-transparent" />
        <span className="absolute bottom-3 left-3 border border-background/28 bg-foreground/48 px-2.5 py-1 text-xs font-semibold text-background backdrop-blur-md">
          {item.category}
        </span>
      </span>

      <span className="flex flex-1 flex-col p-5">
        <span className="flex items-start justify-between gap-4">
          <span className="text-xl leading-tight font-semibold text-balance group-hover:text-link">
            {item.title}
          </span>
          <span className="shrink-0 bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
            {item.status}
          </span>
        </span>
        <span className="mt-3 block text-sm leading-6 text-muted-foreground">
          {item.description}
        </span>
        <span className="mt-4 flex flex-wrap gap-2">
          {item.keywords.map((keyword) => (
            <span
              key={keyword}
              className="border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </span>
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-link">
          {item.cta}
          <ExternalLinkIcon className="size-4" />
        </span>
      </span>
    </a>
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
      <span className="mt-2 block text-xs font-semibold text-link uppercase">{item.meta}</span>
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
      eyebrow: "Yusually atlas lab · 地图 · 数据 · 旅行 · 创作工具",
      heroTitle: "把世界的路径、浪和数据做成作品。",
      heroBody:
        "这里不是普通博客入口，而是一个持续生长的个人工作台：旅行路线、世界数据、水下叙事、小游戏和创作工具，都被整理成可以直接进入的作品。",
      heroImageAlt: "一张由地图、水纹、旅行照片和创作工具组成的桌面主视觉",
      primaryCta: "进入作品集",
      secondaryCta: "阅读最新文章",
      heroMetrics: [
        { label: "公开作品入口", value: "25" },
        { label: "视觉与交互类型", value: "5" },
        { label: "精选项目", value: "4" },
      ] satisfies HomeMetric[],
      artifactEyebrow: "当前主视觉",
      artifactTitle: "个人地图仪器",
      artifactBody: "地图、数据片、海水高光和创作工具，组成这个站点的新视觉锚点。",

      // ── Workbench ──
      workbenchEyebrow: "作品入口",
      workbenchTitle: "从一张画面进入一个作品。",
      workbenchBody:
        "每个入口都先露出一点现场感：地图的纹理、数据的结构、海水的光、游戏的界面。你可以顺着感兴趣的画面继续走进去。",
      workbenchItems: [
        {
          title: "Yusually Works",
          description: "完整作品墙，按地图数据、视觉叙事、游戏 App、研究内容和工具练习筛选。",
          href: "/works",
          cta: "浏览作品墙",
          category: "作品集",
          status: "25 个入口",
          keywords: ["地图", "影像", "工具"],
          previewSrc: "/works/portfolio-hero-imagen.png",
          previewAlt: "地图、数据、旅行和水下光线融合的作品集主视觉",
          featured: true,
        },
        {
          title: "TravelTrace",
          description: "把旅行路线、停留点和记忆整理成可分享的地图轨迹。",
          href: "https://traveltrace.life",
          cta: "打开项目",
          category: "地图产品",
          status: "已上线",
          keywords: ["路线", "Mapbox", "旅行记录"],
          previewSrc: "/works/portfolio-hero-imagen.png",
          previewAlt: "旅行路线和世界地图的视觉预览",
        },
        {
          title: "Shape of World",
          description: "用树图和世界数据展示国家、人口、经济和结构关系。",
          href: "https://shapeof.world",
          cta: "查看数据",
          category: "数据产品",
          status: "已上线",
          keywords: ["Treemap", "世界数据", "交互探索"],
          previewSrc: "/works/previews/shape-of-world.webp",
          previewAlt: "Shape of World 数据树图界面预览",
        },
        {
          title: "真实的水之道",
          description: "把水、独木舟和人生叙事做成带有展览感的视觉页面。",
          href: "/true-waterway/",
          cta: "进入叙事",
          category: "视觉叙事",
          status: "可阅读",
          keywords: ["水", "独木舟", "影像叙事"],
          previewSrc: "/true-waterway/assets/waterway-visuals/01-hero-museum-canoe.png",
          previewAlt: "真实的水之道页面中的独木舟视觉",
        },
        {
          title: "Skills 技能库",
          description: "把创作、视频、研究和人物视角技能整理成可检索的工具目录。",
          href: "/skills-portfolio/",
          cta: "探索工具",
          category: "创作工具",
          status: "可浏览",
          keywords: ["技能库", "工作流", "创作系统"],
          previewSrc: "/works/previews/skills-portfolio.webp",
          previewAlt: "Skills 技能库目录界面预览",
        },
      ] satisfies WorkbenchItem[],

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
          meta: "地图产品",
          icon: MapIcon,
        },
        {
          title: "Shape of World",
          description: "Treemap 数据探索平台，用可视化展示世界的构成 — GDP、人口、贸易等。",
          href: "https://shapeof.world",
          cta: "查看",
          meta: "数据可视化",
          icon: GlobeIcon,
        },
        {
          title: "自媒体运营全维度调研",
          description: "2025–2026 年中国主流平台自媒体运营的全维度研究报告。",
          href: "/self-media-report/自媒体运营全维度调研整合.html",
          cta: "阅读",
          meta: "研究报告",
          icon: BookOpenIcon,
        },
        {
          title: "Skills 技能库",
          description:
            "交互式技能库目录，展示全部 Claude Code 自定义技能 — 视频管线、内容创作、人物视角等。",
          href: "/skills-portfolio/",
          cta: "探索",
          meta: "工具目录",
          icon: BarChart3Icon,
        },
        {
          title: "感受自己的浪",
          description: "从浮潜到人生的完整叙事 —— 一篇关于信任、节奏和自我发现的文章。",
          href: "/blog/感受自己的浪",
          cta: "阅读",
          meta: "个人叙事",
          icon: CameraIcon,
        },
      ] satisfies CreatorSpotlight[],
    };
  }

  // ── English ──
  return {
    eyebrow: "Yusually atlas lab · Maps · Data · Travel · Creative tools",
    heroTitle: "Turning routes, waves, and data into visible work.",
    heroBody:
      "This is a growing personal workbench, not just a blog front door. Travel routes, world data, underwater stories, small games, and creative tools are collected as things you can open and inspect.",
    heroImageAlt:
      "A desk scene combining maps, water light, travel photos, and creative tools into a personal atlas object",
    primaryCta: "Enter the works",
    secondaryCta: "Read latest posts",
    heroMetrics: [
      { label: "Works to open", value: "25" },
      { label: "Ways to browse", value: "5" },
      { label: "Featured works", value: "4" },
    ] satisfies HomeMetric[],
    artifactEyebrow: "Current view",
    artifactTitle: "A personal atlas in motion",
    artifactBody:
      "Maps, data, ocean light, and studio tools come together as the front door of the site.",

    // ── Workbench ──
    workbenchEyebrow: "Works to open",
    workbenchTitle: "Step into each work through its first image.",
    workbenchBody:
      "Each work gives you a glimpse of the place inside: map texture, data structure, ocean light, game interface, or a tool surface worth opening.",
    workbenchItems: [
      {
        title: "Yusually Works",
        description:
          "A collected wall of maps, visual stories, small apps, research pieces, and creative tools.",
        href: "/works",
        cta: "Browse the wall",
        category: "Portfolio",
        status: "25 works",
        keywords: ["Maps", "Images", "Tools"],
        previewSrc: "/works/portfolio-hero-imagen.png",
        previewAlt: "Portfolio hero visual combining maps, data, travel, and underwater light",
        featured: true,
      },
      {
        title: "TravelTrace",
        description:
          "A map product for turning journeys, stops, and memories into shareable traces.",
        href: "https://traveltrace.life",
        cta: "Open project",
        category: "Map product",
        status: "Live",
        keywords: ["Routes", "Mapbox", "Travel journal"],
        previewSrc: "/works/portfolio-hero-imagen.png",
        previewAlt: "Travel route and world map visual preview",
      },
      {
        title: "Shape of World",
        description:
          "Treemap exploration for countries, population, economics, and global structure.",
        href: "https://shapeof.world",
        cta: "View data",
        category: "Data product",
        status: "Live",
        keywords: ["Treemap", "World data", "Exploration"],
        previewSrc: "/works/previews/shape-of-world.webp",
        previewAlt: "Shape of World treemap interface preview",
      },
      {
        title: "The real way of water",
        description:
          "A visual essay around water, canoes, and life, staged with an exhibition feeling.",
        href: "/true-waterway/",
        cta: "Enter story",
        category: "Visual story",
        status: "Readable",
        keywords: ["Water", "Canoe", "Image-led"],
        previewSrc: "/true-waterway/assets/waterway-visuals/01-hero-museum-canoe.png",
        previewAlt: "Canoe visual from The real way of water",
      },
      {
        title: "Skills Portfolio",
        description:
          "A searchable directory for creation, video, research, and perspective-shifting skills.",
        href: "/skills-portfolio/",
        cta: "Explore tools",
        category: "Creative tools",
        status: "Open",
        keywords: ["Skill library", "Workflow", "System"],
        previewSrc: "/works/previews/skills-portfolio.webp",
        previewAlt: "Skills Portfolio directory interface preview",
      },
    ] satisfies WorkbenchItem[],

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
        meta: "Map product",
        icon: MapIcon,
      },
      {
        title: "Shape of World",
        description:
          "Treemap data exploration visualizing how the world is composed — GDP, population, trade.",
        href: "https://shapeof.world",
        cta: "View",
        meta: "Data visualization",
        icon: GlobeIcon,
      },
      {
        title: "Self-Media Research",
        description:
          "Comprehensive report on China's self-media operations across major platforms 2025-2026.",
        href: "/self-media-report/自媒体运营全维度调研整合.html",
        cta: "Read",
        meta: "Research report",
        icon: BookOpenIcon,
      },
      {
        title: "Skills Portfolio",
        description:
          "Interactive skill directory of all Claude Code skills — video pipeline, content creation, perspectives, and more.",
        href: "/skills-portfolio/",
        cta: "Explore",
        meta: "Tool directory",
        icon: BarChart3Icon,
      },
      {
        title: "Feeling My Own Waves",
        description:
          "A full narrative from snorkeling to life — a story about trust, rhythm, and self-discovery.",
        href: "/blog/感受自己的浪",
        cta: "Read",
        meta: "Personal essay",
        icon: CameraIcon,
      },
    ] satisfies CreatorSpotlight[],
  };
}
