import { localizeSiteSettings } from "@repo/core";
import { portfolioItems, type PortfolioItem, type SupportedLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ActivityIcon,
  ArrowRightIcon,
  BarChart3Icon,
  BookOpenIcon,
  CameraIcon,
  CompassIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  MapIcon,
  NetworkIcon,
  RadioIcon,
  RouteIcon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type CSSProperties } from "react";

import { SiteShell } from "#/components/site-shell";
import { $getSiteSettingsPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";

export const Route = createFileRoute("/works")({
  loader: () => $getSiteSettingsPageData(),
  head: () => {
    const locale = getCurrentLocale();
    return {
      meta: [
        {
          title: locale === "zh" ? "个人作品 Dashboard" : "Works Dashboard",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "Yusually 个人网址的作品 dashboard：地图、数据、视觉实验、研究报告与生活叙事。"
              : "A personal works dashboard for Yusually: maps, data, visual labs, research, and life essays.",
        },
      ],
    };
  },
  component: WorksPage,
});

const iconMap: Record<string, LucideIcon> = {
  MapIcon,
  GlobeIcon,
  BookOpenIcon,
  CameraIcon,
  BarChart3Icon,
};

const featuredWorkIds = new Set(["traveltrace", "shape-of-world", "talk-shower", "true-waterway"]);

type CategoryGroup = {
  readonly name: string;
  readonly items: PortfolioItem[];
};

type DashboardStat = {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly icon: LucideIcon;
};

type DashboardSignal = {
  readonly label: string;
  readonly value: string;
  readonly icon: LucideIcon;
};

type WorksRevealStyle = CSSProperties & {
  readonly "--work-reveal-delay": string;
};

function WorksPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const copy = getWorksCopy(locale);
  const categoryGroups = getCategoryGroups(locale);
  const featuredItems = portfolioItems.filter((item) => featuredWorkIds.has(item.id));
  const stats = getDashboardStats(locale, categoryGroups.length);

  return (
    <SiteShell siteSettings={siteSettings}>
      <WorksDashboard
        categoryGroups={categoryGroups}
        copy={copy}
        featuredItems={featuredItems}
        locale={locale}
        stats={stats}
      />
    </SiteShell>
  );
}

function WorksDashboard({
  categoryGroups,
  copy,
  featuredItems,
  locale,
  stats,
}: {
  readonly categoryGroups: CategoryGroup[];
  readonly copy: ReturnType<typeof getWorksCopy>;
  readonly featuredItems: PortfolioItem[];
  readonly locale: SupportedLocale;
  readonly stats: DashboardStat[];
}) {
  return (
    <div data-work-surface className="bg-background">
      <WorksMotionController />

      <section
        data-work-hero
        className="relative isolate overflow-hidden border-b-2 border-foreground"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(22rem,0.52fr)] lg:px-8 lg:py-16">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <div>
              <p
                data-work-reveal
                style={getRevealStyle(0)}
                className="inline-flex min-h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold text-muted-foreground shadow-xs"
              >
                <LayoutDashboardIcon className="size-4 text-link" />
                {copy.eyebrow}
              </p>
              <h1
                data-work-reveal
                style={getRevealStyle(90)}
                className="mt-5 max-w-5xl text-4xl leading-[1.02] font-semibold text-balance sm:text-5xl lg:text-6xl"
              >
                {copy.title}
              </h1>
              <p
                data-work-reveal
                style={getRevealStyle(180)}
                className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg"
              >
                {copy.body}
              </p>
              <div
                data-work-reveal
                style={getRevealStyle(270)}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Button
                  render={<a href="/blog" aria-label={copy.primaryCta} />}
                  nativeButton={false}
                  size="lg"
                  className="hover:-translate-y-0.5"
                >
                  {copy.primaryCta}
                  <ArrowRightIcon />
                </Button>
                <Button
                  render={<a href="/about" aria-label={copy.secondaryCta} />}
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

            <div
              data-work-reveal
              style={getRevealStyle(360)}
              className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
            >
              {stats.map((stat) => (
                <DashboardStatTile key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          <DashboardConsole copy={copy} />
        </div>
      </section>

      <CategoryMapSection categoryGroups={categoryGroups} copy={copy} locale={locale} />

      <FeaturedWorksSection copy={copy} featuredItems={featuredItems} locale={locale} />

      <ProjectMatrixSection copy={copy} locale={locale} />
    </div>
  );
}

function DashboardConsole({ copy }: { readonly copy: ReturnType<typeof getWorksCopy> }) {
  return (
    <aside
      data-work-reveal
      data-work-console
      style={getRevealStyle(220)}
      className="border-2 border-foreground bg-background"
    >
      <div className="flex min-h-14 items-center justify-between gap-3 border-b-2 border-foreground px-4">
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold">
          <RadioIcon className="size-4 shrink-0 text-link" />
          <span className="truncate">{copy.consoleTitle}</span>
        </span>
        <span className="rounded-sm bg-foreground px-2 py-1 text-xs font-semibold text-background">
          {copy.consoleStatus}
        </span>
      </div>

      <div data-work-radar className="relative min-h-56 overflow-hidden border-b border-border p-4">
        <RouteNode className="top-5 left-4" label={copy.routeNodes[0]} />
        <RouteNode className="top-12 right-5" label={copy.routeNodes[1]} />
        <RouteNode
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          label={copy.routeNodes[2]}
        />
        <RouteNode className="bottom-5 left-6" label={copy.routeNodes[3]} />
        <RouteNode className="right-4 bottom-6" label={copy.routeNodes[4]} />
      </div>

      <div className="grid gap-px bg-border">
        {copy.consoleSignals.map((signal) => (
          <DashboardSignalRow key={signal.label} signal={signal} />
        ))}
      </div>
    </aside>
  );
}

function RouteNode({ className, label }: { readonly className: string; readonly label: string }) {
  return (
    <span
      className={`absolute z-10 inline-flex max-w-28 items-center gap-2 rounded-md border border-border bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-xs backdrop-blur ${className}`}
    >
      <span className="size-2 shrink-0 rounded-full bg-link" />
      <span className="truncate">{label}</span>
    </span>
  );
}

function DashboardSignalRow({ signal }: { readonly signal: DashboardSignal }) {
  const Icon = signal.icon;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 bg-background px-4 py-3">
      <span className="flex size-9 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{signal.label}</p>
        <p className="mt-1 truncate text-sm font-semibold">{signal.value}</p>
      </div>
    </div>
  );
}

function DashboardStatTile({ stat }: { readonly stat: DashboardStat }) {
  const Icon = stat.icon;

  return (
    <div className="bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
        <Icon className="size-4 shrink-0 text-link" />
      </div>
      <p className="mt-4 text-3xl leading-none font-semibold">{stat.value}</p>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{stat.detail}</p>
    </div>
  );
}

function CategoryMapSection({
  categoryGroups,
  copy,
  locale,
}: {
  readonly categoryGroups: CategoryGroup[];
  readonly copy: ReturnType<typeof getWorksCopy>;
  readonly locale: SupportedLocale;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-8 lg:py-16">
        <div data-work-reveal className="max-w-md">
          <p className="text-sm font-semibold text-link">{copy.categoryEyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
            {copy.categoryTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.categoryBody}</p>
        </div>

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {categoryGroups.map((group, index) => (
            <CategoryTile key={group.name} group={group} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  group,
  index,
  locale,
}: {
  readonly group: CategoryGroup;
  readonly index: number;
  readonly locale: SupportedLocale;
}) {
  return (
    <div
      data-work-reveal
      data-work-card
      style={getRevealStyle(index * 55)}
      className="min-h-40 bg-background p-5 transition hover:bg-muted/35"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl leading-tight font-semibold">{group.name}</h3>
        <span className="rounded-sm bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
          {group.items.length}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {group.items
          .slice(0, 3)
          .map((item) => getItemTitle(item, locale))
          .join(" / ")}
      </p>
    </div>
  );
}

function FeaturedWorksSection({
  copy,
  featuredItems,
  locale,
}: {
  readonly copy: ReturnType<typeof getWorksCopy>;
  readonly featuredItems: PortfolioItem[];
  readonly locale: SupportedLocale;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div data-work-reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-link">{copy.featuredEyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
            {copy.featuredTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.featuredBody}</p>
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
          {featuredItems.map((item, index) => (
            <FeaturedWorkCard key={item.id} index={index} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({
  index,
  item,
  locale,
}: {
  readonly index: number;
  readonly item: PortfolioItem;
  readonly locale: SupportedLocale;
}) {
  const Icon = iconMap[item.iconName] ?? ExternalLinkIcon;
  const openInNewTab = shouldOpenInNewTab(item);

  return (
    <a
      href={item.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      data-work-reveal
      data-work-card
      style={getRevealStyle(index * 70)}
      className="group flex min-h-72 flex-col bg-background p-5 transition hover:bg-muted/35 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          data-work-icon
          className="flex size-11 items-center justify-center rounded-md bg-muted text-foreground"
        >
          <Icon className="size-5" />
        </span>
        <span className="rounded-sm bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
          {getItemCategory(item, locale)}
        </span>
      </div>
      <h3 className="mt-8 text-2xl leading-tight font-semibold text-balance group-hover:text-link">
        {getItemTitle(item, locale)}
      </h3>
      <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
        {getItemDescription(item, locale)}
      </p>
      <span className="mt-7 flex items-center gap-2 text-sm font-semibold text-link">
        {getItemCta(item, locale)}
        <ExternalLinkIcon className="size-4" />
      </span>
    </a>
  );
}

function ProjectMatrixSection({
  copy,
  locale,
}: {
  readonly copy: ReturnType<typeof getWorksCopy>;
  readonly locale: SupportedLocale;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.3fr_0.7fr] lg:px-8 lg:py-16">
        <div data-work-reveal className="max-w-md lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-semibold text-link">{copy.matrixEyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
            {copy.matrixTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.matrixBody}</p>
        </div>

        <div className="border-y border-border">
          {portfolioItems.map((item, index) => (
            <ProjectMatrixRow key={item.id} index={index} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMatrixRow({
  index,
  item,
  locale,
}: {
  readonly index: number;
  readonly item: PortfolioItem;
  readonly locale: SupportedLocale;
}) {
  const Icon = iconMap[item.iconName] ?? ExternalLinkIcon;
  const openInNewTab = shouldOpenInNewTab(item);

  return (
    <a
      href={item.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      data-work-reveal
      data-work-row
      style={getRevealStyle(index * 35)}
      className="group grid gap-4 border-b border-border py-5 transition last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:items-start"
    >
      <span
        data-work-icon
        className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-lg leading-tight font-semibold group-hover:text-link">
            {getItemTitle(item, locale)}
          </span>
          <span className="rounded-sm bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
            {getItemCategory(item, locale)}
          </span>
        </span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {getItemDescription(item, locale)}
        </span>
      </span>
      <span className="flex items-center gap-2 text-sm font-semibold text-link sm:justify-end">
        {getItemCta(item, locale)}
        <ExternalLinkIcon className="size-4" />
      </span>
    </a>
  );
}

function WorksMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-work-surface]");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-work-reveal]"));

    const reveal = (element: HTMLElement) => {
      element.dataset.workReveal = "visible";
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
    root?.setAttribute("data-work-motion-ready", "true");

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
      .filter((element) => element.dataset.workReveal !== "visible")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}

function getDashboardStats(locale: SupportedLocale, categoryCount: number): DashboardStat[] {
  const externalProductCount = portfolioItems.filter((item) => item.href.startsWith("http")).length;
  const localLabCount = portfolioItems.filter(
    (item) => item.href.startsWith("/") && item.newTab,
  ).length;

  if (locale === "zh") {
    return [
      {
        label: "公开入口",
        value: String(portfolioItems.length),
        detail: "作品、文章、工具与实验",
        icon: NetworkIcon,
      },
      {
        label: "探索领域",
        value: String(categoryCount),
        detail: "地图、数据、研究、生活等",
        icon: CompassIcon,
      },
      {
        label: "外部产品",
        value: String(externalProductCount),
        detail: "独立域名与可分享项目",
        icon: GlobeIcon,
      },
      {
        label: "站内实验",
        value: String(localLabCount),
        detail: "沉浸式页面和浏览器工具",
        icon: ActivityIcon,
      },
    ];
  }

  return [
    {
      label: "Public entries",
      value: String(portfolioItems.length),
      detail: "Projects, essays, tools, and labs",
      icon: NetworkIcon,
    },
    {
      label: "Active lanes",
      value: String(categoryCount),
      detail: "Maps, data, research, life, and more",
      icon: CompassIcon,
    },
    {
      label: "Live products",
      value: String(externalProductCount),
      detail: "Standalone domains and shareable work",
      icon: GlobeIcon,
    },
    {
      label: "Site labs",
      value: String(localLabCount),
      detail: "Immersive pages and browser tools",
      icon: ActivityIcon,
    },
  ];
}

function getCategoryGroups(locale: SupportedLocale): CategoryGroup[] {
  const groups = new Map<string, PortfolioItem[]>();

  for (const item of portfolioItems) {
    const category = getItemCategory(item, locale);
    const items = groups.get(category) ?? [];
    items.push(item);
    groups.set(category, items);
  }

  return [...groups.entries()]
    .map(([name, items]) => ({ name, items }))
    .sort((left, right) => {
      const countDifference = right.items.length - left.items.length;
      if (countDifference !== 0) return countDifference;

      return left.name.localeCompare(right.name, locale === "zh" ? "zh-CN" : "en-US");
    });
}

function getRevealStyle(delayMs: number): WorksRevealStyle {
  return {
    "--work-reveal-delay": `${delayMs}ms`,
  };
}

function getItemTitle(item: PortfolioItem, locale: SupportedLocale) {
  return locale === "zh" ? item.titleZh : item.title;
}

function getItemDescription(item: PortfolioItem, locale: SupportedLocale) {
  return locale === "zh" ? item.descriptionZh : item.description;
}

function getItemCategory(item: PortfolioItem, locale: SupportedLocale) {
  return locale === "zh" ? item.categoryZh : item.category;
}

function getItemCta(item: PortfolioItem, locale: SupportedLocale) {
  return locale === "zh" ? item.ctaZh : item.cta;
}

function shouldOpenInNewTab(item: PortfolioItem) {
  return item.newTab || item.href.startsWith("http");
}

function getWorksCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      eyebrow: "个人网址 Dashboard",
      title: "把作品、文章和实验放进同一个控制台。",
      body: "这里不只是作品列表，而是 Yusually 探索世界的仪表盘：地图、数据、旅行、自媒体研究和水下叙事，各自是一个正在发亮的入口。",
      primaryCta: "阅读最新文章",
      secondaryCta: "关于 Yusually",
      consoleTitle: "探索控制台",
      consoleStatus: "在线",
      routeNodes: ["地图", "数据", "旅行", "研究", "叙事"],
      consoleSignals: [
        {
          label: "起点",
          value: "从地图理解世界",
          icon: MapIcon,
        },
        {
          label: "当前模式",
          value: "把体验做成产品",
          icon: ActivityIcon,
        },
        {
          label: "下一段路",
          value: "旅行、数据、自媒体",
          icon: RouteIcon,
        },
      ] satisfies DashboardSignal[],
      categoryEyebrow: "领域分布",
      categoryTitle: "每个分类都是一条探索航线。",
      categoryBody:
        "Dashboard 先看方向，再看作品。你可以快速判断这个个人站点正在积累哪些能力、哪些主题已经长成独立项目。",
      featuredEyebrow: "重点入口",
      featuredTitle: "最能代表这个站点气质的几件作品。",
      featuredBody:
        "这些项目把路线、世界数据、中文内容研究和视觉叙事连在一起，构成 Yusually 当前最清晰的公开作品面。",
      matrixEyebrow: "全部项目",
      matrixTitle: "从产品到实验，完整展开。",
      matrixBody: "保留原来的快速跳转效率，但用更清晰的层级展示每个入口的角色、主题和去向。",
    };
  }

  return {
    eyebrow: "Personal site dashboard",
    title: "One control room for projects, writing, and experiments.",
    body: "This is more than a works list. It turns Yusually's maps, data products, travel notes, self-media research, and underwater stories into a dashboard of where the curiosity is going.",
    primaryCta: "Read latest writing",
    secondaryCta: "About Yusually",
    consoleTitle: "Explorer console",
    consoleStatus: "Online",
    routeNodes: ["Maps", "Data", "Travel", "Research", "Stories"],
    consoleSignals: [
      {
        label: "Starting point",
        value: "Understand the world through maps",
        icon: MapIcon,
      },
      {
        label: "Build mode",
        value: "Turn experience into products",
        icon: ActivityIcon,
      },
      {
        label: "Current route",
        value: "Travel, data, self-media",
        icon: RouteIcon,
      },
    ] satisfies DashboardSignal[],
    categoryEyebrow: "Operating map",
    categoryTitle: "Every category is a route through the work.",
    categoryBody:
      "The dashboard starts with direction before listing projects, so the site reads as a living personal system instead of a flat archive.",
    featuredEyebrow: "Priority signals",
    featuredTitle: "The entries that carry the clearest point of view.",
    featuredBody:
      "These works connect route systems, world data, Chinese content research, and visual essays into Yusually's strongest public surface right now.",
    matrixEyebrow: "All entries",
    matrixTitle: "From products to experiments, fully unfolded.",
    matrixBody:
      "The original quick-jump utility stays intact, with stronger hierarchy around each entry's role, subject, and destination.",
  };
}
