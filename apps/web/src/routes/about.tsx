import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapIcon,
  CameraIcon,
} from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getAboutPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";

export const Route = createFileRoute("/about")({
  loader: () => $getAboutPageData(),
  head: () => {
    const locale = getCurrentLocale();

    return {
      meta: [
        {
          title: locale === "zh" ? "关于 Yusually" : "About Yusually",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "了解 Yusualy —— 一个还在摸索世界的人。从地图开始，走向技术、旅行与自媒体。"
              : "Learn about Yusually — someone still figuring out the world, from maps to technology, travel, and self-media.",
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const copy = getAboutCopy(locale);

  return (
    <SiteShell siteSettings={siteSettings}>
      <div className="bg-background">
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(280px,0.38fr)] lg:px-8 lg:py-16">
            <div>
              <p className="text-sm font-semibold tracking-wide text-link uppercase">
                {copy.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] font-semibold text-balance sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                {copy.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  render={<a href="/blog" aria-label={copy.primaryAction} />}
                  nativeButton={false}
                >
                  {copy.primaryAction}
                  <ArrowRightIcon />
                </Button>
                <Button
                  render={<a href="https://traveltrace.life" aria-label={copy.secondaryAction} />}
                  variant="outline"
                  nativeButton={false}
                >
                  {copy.secondaryAction}
                  <ExternalLinkIcon />
                </Button>
              </div>
            </div>

            <aside className="border border-border bg-muted/35 p-5">
              <img
                src="/yusually-about-avatar.jpg"
                alt={copy.avatarAlt}
                width={1200}
                height={1200}
                decoding="async"
                className="aspect-square w-full border border-border bg-muted object-cover"
              />
              <div className="mt-5">
                <p className="text-sm font-semibold text-link uppercase">{copy.profileTag}</p>
                <p className="mt-2 text-2xl font-semibold">{copy.profileTitle}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.profileBody}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-border bg-muted/35">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.36fr_0.64fr] lg:px-8 lg:py-16">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.whyEyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold text-balance">{copy.whyTitle}</h2>
            </div>
            <div className="grid gap-4">
              {copy.principles.map((principle) => (
                <article key={principle.title} className="border-t border-border pt-4">
                  <div className="flex items-start gap-3">
                    {principle.icon}
                    <div>
                      <h3 className="text-xl font-semibold">{principle.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {copy.paths.map((path) => (
                <a
                  key={path.href}
                  href={path.href}
                  className="bg-background p-5 transition hover:bg-muted/45"
                >
                  <p className="text-xs font-semibold tracking-wide text-link uppercase">
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{path.description}</p>
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <a
                href="https://github.com/yuzerofish"
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-link hover:underline"
              >
                GitHub
                <ExternalLinkIcon className="size-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

function getAboutCopy(locale: ReturnType<typeof getCurrentLocale>) {
  if (locale === "zh") {
    return {
      eyebrow: "关于",
      title: "一个还在摸索世界的人。",
      description:
        "我是 Yusualy —— 一个还在摸索世界的人。从地图开始：路线追踪的乐趣、发现隐藏路径的惊喜、理解万物连接的快感。这份好奇心驱使我从地理走向技术，从旅行走向自媒体。在巴西 Bonito 的透明河流里，我学会了浮潜，也学会了相信自己可以漂浮。",
      primaryAction: "阅读博客",
      secondaryAction: "TravelTrace",
      avatarAlt: "Yusually 的个人头像",
      profileTag: "Explorer of Worlds",
      profileTitle: "Yusually",
      profileBody:
        "Someone still figuring out the world. It started with maps: the joy of tracing routes, discovering hidden paths, and understanding how places connect. That curiosity led from geography to technology, from travel to self-media.",
      whyEyebrow: "足迹",
      whyTitle: "从好奇心出发的项目",
      principles: [
        {
          icon: <MapIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "TravelTrace",
          description:
            "交互式旅行日记与路线可视化平台。源自对地图的热爱，用 React + Mapbox 搭建，记录旅程、标记回忆，通过优雅的地图界面分享冒险故事。",
        },
        {
          icon: <GlobeIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "Shape of World",
          description:
            "Treemap 数据探索平台，用可视化图表展示世界的构成 — GDP、人口、贸易等。通过美观的交互式地图观察复杂数据。",
        },
        {
          icon: <CameraIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "自媒体运营全维度调研",
          description:
            "关于 2025–2026 年中国主流平台自媒体运营的全维度研究报告。深度分析内容策略、变现模式和平台算法机制。",
        },
        {
          icon: <BookOpenIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "US Immigration 数据可视化",
          description: "美国人口增长与移民来源的数据可视化项目，通过交互式图表展示人口变迁趋势。",
        },
        {
          icon: <CameraIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "浮潜哲学",
          description:
            "一个关于浮潜的、第一人称的、全屏入水的网站。打开它，你就下水了。每个人的生命体验都可以被做成产品。",
        },
      ],
      paths: [
        {
          eyebrow: "Maps",
          title: "TravelTrace",
          description: "交互式旅行日记与路线可视化平台，用地图和路线记录每一段旅程。",
          href: "https://traveltrace.life",
        },
        {
          eyebrow: "Data",
          title: "Shape of World",
          description: "Treemap 数据探索平台，用可视化展示世界的构成。",
          href: "https://shapeof.world",
        },
        {
          eyebrow: "Research",
          title: "自媒体运营全维度调研",
          description: "2025-2026 年中国主流平台自媒体运营研究报告。",
          href: "/self-media-report/自媒体运营全维度调研整合.html",
        },
        {
          eyebrow: "Tools",
          title: "Skills 技能库",
          description: "交互式技能库目录，展示全部 Claude Code 自定义技能。",
          href: "/skills-portfolio/",
        },
        {
          eyebrow: "Water",
          title: "感受自己的浪",
          description: "从浮潜到人生的完整叙事 —— 一篇关于信任、节奏和自我发现的文章。",
          href: "/blog/感受自己的浪",
        },
      ],
    };
  }

  return {
    eyebrow: "About",
    title: "Someone still figuring out the world.",
    description:
      "I'm Yusualy — someone still figuring out the world. It started with maps: the joy of tracing routes, discovering hidden paths, and understanding how places connect. That curiosity led me from geography to technology, from travel to self-media.",
    primaryAction: "Read the blog",
    secondaryAction: "TravelTrace",
    avatarAlt: "Portrait of Yusually",
    profileTag: "Explorer of Worlds",
    profileTitle: "Yusually",
    profileBody:
      "Someone still figuring out the world. From maps to technology, from travel to self-media.",
    whyEyebrow: "Footprints",
    whyTitle: "Projects born from curiosity",
    principles: [
      {
        icon: <MapIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "TravelTrace",
        description:
          "Interactive travel journal and route visualization platform. Built with React + Mapbox, born from a love of maps. Trace journeys, pin memories, and share adventures.",
      },
      {
        icon: <GlobeIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "Shape of World",
        description:
          "Treemap data exploration platform that visualizes how the world is composed — GDP, population, trade, and more. Beautiful, interactive data maps.",
      },
      {
        icon: <CameraIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "Self-Media Research",
        description:
          "A comprehensive research report on self-media operations across major Chinese platforms in 2025–2026. Deep analysis of content strategies, monetization, and platform algorithms.",
      },
      {
        icon: <BookOpenIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "US Immigration Data Viz",
        description:
          "US population growth and immigration origins data visualization project with interactive charts and demographic trends.",
      },
      {
        icon: <CameraIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "Snorkeling Philosophy",
        description:
          "A first-person, full-screen underwater website. Open it and you're in the water. Turning a life-changing experience into a product.",
      },
    ],
    paths: [
      {
        eyebrow: "Maps",
        title: "TravelTrace",
        description: "Interactive travel journal and route visualization platform.",
        href: "https://traveltrace.life",
      },
      {
        eyebrow: "Data",
        title: "Shape of World",
        description: "Treemap data exploration visualizing global composition.",
        href: "https://shapeof.world",
      },
      {
        eyebrow: "Research",
        title: "Self-Media Research",
        description: "Comprehensive report on China's self-media landscape 2025-2026.",
        href: "/self-media-report/自媒体运营全维度调研整合.html",
      },
      {
        eyebrow: "Tools",
        title: "Skills Portfolio",
        description: "Interactive directory of all Claude Code skills.",
        href: "/skills-portfolio/",
      },
      {
        eyebrow: "Water",
        title: "Feeling My Own Waves",
        description:
          "A full narrative from snorkeling to life — a story about trust, rhythm, and self-discovery.",
        href: "/blog/感受自己的浪",
      },
    ],
  };
}
