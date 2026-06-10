import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, ExternalLinkIcon, GlobeIcon, MapIcon, CameraIcon } from "lucide-react";

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
              <div className="flex aspect-square w-full items-center justify-center bg-muted">
                <MapIcon className="size-16 text-link/50" />
              </div>
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
      profileTag: "Explorer of Worlds",
      profileTitle: "Yusually",
      profileBody:
        "Someone still figuring out the world. It started with maps: the joy of tracing routes, discovering hidden paths, and understanding how places connect. That curiosity led from geography to technology, from travel to self-media.",
      whyEyebrow: "足迹",
      whyTitle: "从好奇心出发的项目",
      principles: [
        {
          icon: <MapIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "旅行轨迹",
          description:
            "TravelTrace.life —— 用地图和路线记录走过的每一段旅程，把旅行体验变成可追溯的轨迹。",
        },
        {
          icon: <GlobeIcon className="mt-1 size-4 shrink-0 text-link" />,
          title: "世界的形状",
          description:
            "Shape of World —— 用数据可视化制作知识短视频，把抽象的数字变成可感知的排名和分布。",
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
          description: "用路线和地图记录旅行的痕迹。",
          href: "https://traveltrace.life",
        },
        {
          eyebrow: "Data",
          title: "Shape of World",
          description: "用数据可视化的方式呈现世界的排名和分布。",
          href: "https://shapeof.world",
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
    profileTag: "Explorer of Worlds",
    profileTitle: "Yusually",
    profileBody:
      "Someone still figuring out the world. From maps to technology, from travel to self-media.",
    whyEyebrow: "Footprints",
    whyTitle: "Projects born from curiosity",
    principles: [
      {
        icon: <MapIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "Travel Maps",
        description:
          "TravelTrace.life — Record every journey through maps and routes, turning travel experiences into traceable paths.",
      },
      {
        icon: <GlobeIcon className="mt-1 size-4 shrink-0 text-link" />,
        title: "Shape of World",
        description:
          "Shape of World — Data visualization knowledge videos that turn abstract numbers into visible rankings and distributions.",
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
        description: "Record travel traces through routes and maps.",
        href: "https://traveltrace.life",
      },
      {
        eyebrow: "Data",
        title: "Shape of World",
        description: "Visualize world rankings and distributions through data.",
        href: "https://shapeof.world",
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
