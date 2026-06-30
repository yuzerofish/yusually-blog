import { localizeSiteSettings } from "@repo/core";
import { portfolioItems, type PortfolioItem, type SupportedLocale } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  CameraIcon,
  ExternalLinkIcon,
  Gamepad2Icon,
  Layers3Icon,
  MapIcon,
  PaintbrushIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

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
          title: locale === "zh" ? "Yusually 作品集" : "Yusually Works",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "Yusually 的个人作品集：地图、数据、视觉实验、游戏、研究内容和创作工具。"
              : "Yusually's portfolio across maps, data, visual experiments, games, research, and creative tools.",
        },
      ],
    };
  },
  component: WorksPage,
});

const featuredWorkIds = ["traveltrace", "shape-of-world", "talk-shower", "true-waterway"];

const workCategoryDefinitions = [
  {
    id: "all",
    label: "All",
    labelZh: "全部",
    summary: "Every public work in the portfolio.",
    summaryZh: "所有已经公开的作品入口。",
    icon: Layers3Icon,
  },
  {
    id: "maps-data",
    label: "Maps & data",
    labelZh: "地图与数据",
    summary: "World maps, route systems, population signals, and data products.",
    summaryZh: "世界地图、路线系统、人口信号和数据产品。",
    icon: MapIcon,
  },
  {
    id: "visual-stories",
    label: "Visual stories",
    labelZh: "视觉叙事",
    summary: "Image-led pages, underwater scenes, and cinematic web essays.",
    summaryZh: "以图像为主的页面、水下场景和沉浸式网页叙事。",
    icon: CameraIcon,
  },
  {
    id: "games-apps",
    label: "Games & apps",
    labelZh: "游戏与 App",
    summary: "Playable browser games, iPhone game sites, and product prototypes.",
    summaryZh: "可玩的网页小游戏、iPhone 游戏官网和产品原型。",
    icon: Gamepad2Icon,
  },
  {
    id: "research-content",
    label: "Research",
    labelZh: "研究内容",
    summary: "Structured research, content studies, and process writing.",
    summaryZh: "结构化调研、内容研究和创作过程说明。",
    icon: SearchIcon,
  },
  {
    id: "tools-practice",
    label: "Tools & practice",
    labelZh: "工具与练习",
    summary: "Creative tools, skill libraries, and small daily practice products.",
    summaryZh: "创作工具、技能库，以及日常练习型小产品。",
    icon: PaintbrushIcon,
  },
] as const;

type WorkCategoryId = (typeof workCategoryDefinitions)[number]["id"];
type FilterCategoryId = WorkCategoryId;
type WorkLaneId = Exclude<WorkCategoryId, "all">;

type WorkPresentation = {
  readonly categoryId: WorkLaneId;
  readonly kind: string;
  readonly kindZh: string;
  readonly status: string;
  readonly statusZh: string;
  readonly assetLabel: string;
  readonly assetLabelZh: string;
  readonly tags: readonly string[];
  readonly tagsZh: readonly string[];
  readonly previewSrc: string;
  readonly videoSrc?: string;
};

type PresentedWork = {
  readonly item: PortfolioItem;
  readonly presentation: WorkPresentation;
};

type WorksCopy = ReturnType<typeof getWorksCopy>;

type WorksRevealStyle = CSSProperties & {
  readonly "--work-reveal-delay": string;
};

const workPresentationById: Record<string, WorkPresentation> = {
  traveltrace: {
    categoryId: "maps-data",
    kind: "Product",
    kindZh: "地图产品",
    status: "Live site",
    statusZh: "已上线",
    assetLabel: "Route map preview",
    assetLabelZh: "路线地图预览",
    tags: ["Mapbox", "Travel journal", "Routes"],
    tagsZh: ["地图路线", "旅行记录", "可分享"],
    previewSrc: "/works/portfolio-hero-imagen.png",
  },
  "shape-of-world": {
    categoryId: "maps-data",
    kind: "Data product",
    kindZh: "数据产品",
    status: "Live site",
    statusZh: "已上线",
    assetLabel: "Treemap interface",
    assetLabelZh: "数据树图界面",
    tags: ["Treemap", "World data", "Exploration"],
    tagsZh: ["世界数据", "树图", "交互探索"],
    previewSrc: "/works/previews/shape-of-world.webp",
  },
  "sun-glint-lagoon": {
    categoryId: "visual-stories",
    kind: "WebGL study",
    kindZh: "WebGL 实验",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Water light study",
    assetLabelZh: "水面高光实验",
    tags: ["Three.js", "Water", "Light"],
    tagsZh: ["Three.js", "水面", "光影"],
    previewSrc: "/works/previews/sun-glint-lagoon.webp",
  },
  "seewish-wish-veil": {
    categoryId: "visual-stories",
    kind: "Prototype",
    kindZh: "产品原型",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Veil canvas",
    assetLabelZh: "愿望光幕画布",
    tags: ["Vision board", "Media upload", "Soft motion"],
    tagsZh: ["愿景板", "媒体上传", "柔性动效"],
    previewSrc: "/works/previews/seewish-wish-veil.webp",
  },
  "electronic-fluid": {
    categoryId: "visual-stories",
    kind: "Visual lab",
    kindZh: "视觉实验",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Fluid canvas",
    assetLabelZh: "电子流体画布",
    tags: ["Pointer motion", "Glow", "Canvas"],
    tagsZh: ["鼠标跟随", "辉光", "Canvas"],
    previewSrc: "/works/previews/electronic-fluid.webp",
  },
  "information-rain": {
    categoryId: "visual-stories",
    kind: "Audiovisual page",
    kindZh: "视听网页",
    status: "Video-based",
    statusZh: "视频驱动",
    assetLabel: "Video scene",
    assetLabelZh: "视频场景",
    tags: ["Video", "Data rain", "Ambient"],
    tagsZh: ["视频", "信息雨", "氛围声音"],
    previewSrc: "/works/previews/information-rain.webp",
    videoSrc: "/information-rain/assets/source-video.mp4",
  },
  "data-tide": {
    categoryId: "visual-stories",
    kind: "Audiovisual page",
    kindZh: "视听网页",
    status: "Scroll-driven",
    statusZh: "滚动驱动",
    assetLabel: "Scroll video",
    assetLabelZh: "滚动视频场景",
    tags: ["Video scrub", "Portrait", "Sound"],
    tagsZh: ["视频擦动", "人像", "配乐"],
    previewSrc: "/data-tide/assets/poster.jpg",
    videoSrc: "/data-tide/assets/information-rain.mp4",
  },
  "grasping-sand-hand": {
    categoryId: "visual-stories",
    kind: "Visual essay",
    kindZh: "视觉短篇",
    status: "Scroll-driven",
    statusZh: "滚动驱动",
    assetLabel: "Frame sequence",
    assetLabelZh: "帧序列画面",
    tags: ["Release", "Frame sequence", "Motion"],
    tagsZh: ["释放", "帧动画", "滚动叙事"],
    previewSrc: "/works/previews/grasping-sand-hand.webp",
  },
  "life-props": {
    categoryId: "tools-practice",
    kind: "Interactive gallery",
    kindZh: "互动展柜",
    status: "Playable",
    statusZh: "可体验",
    assetLabel: "Prop card gallery",
    assetLabelZh: "人生道具卡片",
    tags: ["Cards", "Playful writing", "Objects"],
    tagsZh: ["抽卡", "生活想象", "道具"],
    previewSrc: "/works/previews/life-props.webp",
  },
  "spiritual-wealth-freedom": {
    categoryId: "tools-practice",
    kind: "Reflection page",
    kindZh: "自我提问",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Quiet question screen",
    assetLabelZh: "安静提问画面",
    tags: ["Financial freedom", "Voice", "Reflection"],
    tagsZh: ["财富自由", "语音", "自我觉察"],
    previewSrc: "/works/previews/spiritual-wealth-freedom.png",
  },
  "release-practice": {
    categoryId: "tools-practice",
    kind: "Guided practice",
    kindZh: "引导练习",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Quiet input flow",
    assetLabelZh: "安静输入流程",
    tags: ["Voice", "Reflection", "Calm UI"],
    tagsZh: ["语音", "自我觉察", "安静界面"],
    previewSrc: "/works/previews/release-practice.webp",
  },
  "talk-shower": {
    categoryId: "research-content",
    kind: "Research product",
    kindZh: "研究产品",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Stage data view",
    assetLabelZh: "舞台数据视图",
    tags: ["Stand-up", "Timeline", "Filters"],
    tagsZh: ["脱口秀", "时间线", "筛选"],
    previewSrc: "/talk-shower/assets/hero-stage.png",
  },
  "novel-to-comic-lab": {
    categoryId: "research-content",
    kind: "Process note",
    kindZh: "过程说明",
    status: "Published",
    statusZh: "已发布",
    assetLabel: "Adaptation note",
    assetLabelZh: "改编说明页",
    tags: ["Storyboard", "Adaptation", "Rights-aware"],
    tagsZh: ["分镜", "改编", "版权边界"],
    previewSrc: "/works/previews/novel-to-comic-lab.webp",
  },
  "true-waterway": {
    categoryId: "visual-stories",
    kind: "Visual essay",
    kindZh: "视觉叙事",
    status: "Published",
    statusZh: "已发布",
    assetLabel: "Museum canoe scene",
    assetLabelZh: "博物馆独木舟场景",
    tags: ["Ocean culture", "Museum", "Canoe"],
    tagsZh: ["海洋文化", "博物馆", "独木舟"],
    previewSrc: "/true-waterway/assets/waterway-visuals/01-hero-museum-canoe.png",
  },
  "ocean-fish-nursery": {
    categoryId: "games-apps",
    kind: "Browser game",
    kindZh: "网页小游戏",
    status: "Playable",
    statusZh: "可游玩",
    assetLabel: "Game screen",
    assetLabelZh: "游戏画面",
    tags: ["Canvas", "Fish raising", "Pixel assets"],
    tagsZh: ["Canvas", "养鱼", "像素素材"],
    previewSrc: "/works/previews/ocean-fish-nursery.webp",
  },
  "let-go-2048": {
    categoryId: "games-apps",
    kind: "iPhone game",
    kindZh: "iPhone 游戏",
    status: "Product site",
    statusZh: "官网展示",
    assetLabel: "Mobile game screen",
    assetLabelZh: "手游画面",
    tags: ["2048", "Release", "Mobile"],
    tagsZh: ["2048", "释放", "手机游戏"],
    previewSrc: "/let-go-2048/assets/generated/game-screen.png",
  },
  "zen-stress-shot": {
    categoryId: "games-apps",
    kind: "iPhone game",
    kindZh: "iPhone 游戏",
    status: "Product site",
    statusZh: "官网展示",
    assetLabel: "Bubble shooter screen",
    assetLabelZh: "泡泡射击画面",
    tags: ["Bubble shooter", "Zen garden", "App"],
    tagsZh: ["泡泡射击", "禅意花园", "App"],
    previewSrc: "/zen-stress-shot/assets/game-screen.png",
  },
  "stress-merge-shot": {
    categoryId: "games-apps",
    kind: "iPhone game",
    kindZh: "iPhone 游戏",
    status: "Product site",
    statusZh: "官网展示",
    assetLabel: "Gameplay concept",
    assetLabelZh: "玩法概念图",
    tags: ["Shooting", "Merging", "Release"],
    tagsZh: ["击打", "合成", "释放"],
    previewSrc: "/stress-merge-shot/site-assets/generated/gameplay-concept.png",
  },
  "sandfall-match": {
    categoryId: "games-apps",
    kind: "iPhone game",
    kindZh: "iPhone 游戏",
    status: "Product site",
    statusZh: "官网展示",
    assetLabel: "Match board",
    assetLabelZh: "消除棋盘",
    tags: ["Match-3", "Pressure stones", "Mobile"],
    tagsZh: ["消消乐", "压力石", "手机游戏"],
    previewSrc: "/sandfall-match/assets/screenshots/02-board.png",
  },
  "ocean-canoe-museum": {
    categoryId: "games-apps",
    kind: "Educational game",
    kindZh: "教育小游戏",
    status: "Playable",
    statusZh: "可游玩",
    assetLabel: "Museum game UI",
    assetLabelZh: "博物馆游戏界面",
    tags: ["Museum", "Canoe culture", "Pixel"],
    tagsZh: ["博物馆", "独木舟文化", "像素"],
    previewSrc: "/ocean-canoe-museum/assets/reference-game-ui.png",
  },
  "self-media-research": {
    categoryId: "research-content",
    kind: "Research report",
    kindZh: "研究报告",
    status: "Published",
    statusZh: "已发布",
    assetLabel: "Report page",
    assetLabelZh: "报告页面",
    tags: ["Self-media", "Platforms", "Monetization"],
    tagsZh: ["自媒体", "平台机制", "变现"],
    previewSrc: "/works/previews/self-media-research.webp",
  },
  "feeling-my-own-waves": {
    categoryId: "visual-stories",
    kind: "Life essay",
    kindZh: "生活叙事",
    status: "Published",
    statusZh: "已发布",
    assetLabel: "Underwater story visual",
    assetLabelZh: "水下叙事主视觉",
    tags: ["Snorkeling", "Trust", "Rhythm"],
    tagsZh: ["浮潜", "信任", "节奏"],
    previewSrc: "/works/portfolio-hero-imagen.png",
  },
  "us-immigration-data-viz": {
    categoryId: "maps-data",
    kind: "Data visualization",
    kindZh: "数据可视化",
    status: "Live site",
    statusZh: "已上线",
    assetLabel: "Population data view",
    assetLabelZh: "人口数据视图",
    tags: ["Immigration", "Population", "Charts"],
    tagsZh: ["移民", "人口", "图表"],
    previewSrc: "/works/previews/us-immigration-data-viz.webp",
  },
  "skills-portfolio": {
    categoryId: "tools-practice",
    kind: "Directory",
    kindZh: "技能目录",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Skill library",
    assetLabelZh: "技能库界面",
    tags: ["Claude Code", "Skills", "Search"],
    tagsZh: ["Claude Code", "技能", "搜索"],
    previewSrc: "/works/previews/skills-portfolio.webp",
  },
  "webgl-watercolor-tool": {
    categoryId: "tools-practice",
    kind: "Creative tool",
    kindZh: "创作工具",
    status: "Interactive",
    statusZh: "可交互",
    assetLabel: "Painting canvas",
    assetLabelZh: "水彩画布",
    tags: ["WebGL", "Watercolor", "Export"],
    tagsZh: ["WebGL", "水彩", "导出"],
    previewSrc: "/works/previews/webgl-watercolor-tool.webp",
  },
  "snorkeling-philosophy": {
    categoryId: "visual-stories",
    kind: "Immersive page",
    kindZh: "沉浸页面",
    status: "Live site",
    statusZh: "已上线",
    assetLabel: "Underwater experience",
    assetLabelZh: "水下体验主视觉",
    tags: ["Snorkeling", "First-person", "Travel"],
    tagsZh: ["浮潜", "第一人称", "旅行"],
    previewSrc: "/works/portfolio-hero-imagen.png",
  },
};

function WorksPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);

  return (
    <SiteShell siteSettings={siteSettings}>
      <WorksPortfolio locale={locale} />
    </SiteShell>
  );
}

function WorksPortfolio({ locale }: { readonly locale: SupportedLocale }) {
  const copy = getWorksCopy(locale);
  const [activeCategoryId, setActiveCategoryId] = useState<FilterCategoryId>("all");
  const presentedWorks = useMemo(() => getPresentedWorks(), []);
  const featuredWorks = presentedWorks.filter(({ item }) => featuredWorkIds.includes(item.id));
  const filteredWorks = presentedWorks.filter(({ presentation }) => {
    return activeCategoryId === "all" || presentation.categoryId === activeCategoryId;
  });
  const activeCategory = getCategoryDefinition(activeCategoryId);

  return (
    <div data-work-surface className="bg-background">
      <WorksMotionController refreshKey={activeCategoryId} />

      <WorksHero copy={copy} locale={locale} totalCount={presentedWorks.length} />

      <FeaturedWorksSection copy={copy} featuredWorks={featuredWorks} locale={locale} />

      <section id="work-library" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
            <div data-work-reveal className="lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-link">{copy.libraryEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.libraryTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.libraryBody}</p>

              <CategoryFilterList
                activeCategoryId={activeCategoryId}
                locale={locale}
                onCategoryChange={setActiveCategoryId}
                works={presentedWorks}
              />
            </div>

            <div>
              <ActiveCategorySummary
                activeCategory={activeCategory}
                count={filteredWorks.length}
                locale={locale}
              />

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {filteredWorks.map((work, index) => (
                  <PortfolioWorkCard key={work.item.id} index={index} locale={locale} work={work} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorksHero({
  copy,
  locale,
  totalCount,
}: {
  readonly copy: WorksCopy;
  readonly locale: SupportedLocale;
  readonly totalCount: number;
}) {
  return (
    <section data-work-hero className="relative isolate overflow-hidden border-b border-border">
      <img
        src="/works/portfolio-hero-imagen.png"
        alt={
          locale === "zh"
            ? "融合地图、数据、旅行笔记和水下光影的作品集主视觉"
            : "Portfolio hero visual combining maps, data, travel notes, and underwater light"
        }
        data-work-hero-image
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(7,12,13,0.86),rgba(7,12,13,0.52)_45%,rgba(7,12,13,0.1)_78%),linear-gradient(180deg,rgba(7,12,13,0.18),rgba(7,12,13,0.72))]" />

      <div className="relative z-20 mx-auto flex min-h-[580px] max-w-7xl flex-col justify-end px-4 py-10 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p
            data-work-reveal
            style={getRevealStyle(0)}
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white/78 backdrop-blur-md"
          >
            <SparklesIcon className="size-4 text-white" />
            {copy.eyebrow}
          </p>
          <h1
            data-work-reveal
            style={getRevealStyle(90)}
            className="mt-5 max-w-4xl text-4xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            {copy.title}
          </h1>
          <p
            data-work-reveal
            style={getRevealStyle(180)}
            className="mt-5 max-w-2xl text-base leading-7 text-white/76 sm:text-lg"
          >
            {copy.body}
          </p>
          <div data-work-reveal style={getRevealStyle(270)} className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<a href="#featured-works" aria-label={copy.primaryCta} />}
              nativeButton={false}
              size="lg"
              className="bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-white/92"
            >
              {copy.primaryCta}
              <ArrowRightIcon />
            </Button>
            <Button
              render={<a href="#work-library" aria-label={copy.secondaryCta} />}
              variant="outline"
              nativeButton={false}
              size="lg"
              className="border-white/30 bg-white/5 text-white hover:-translate-y-0.5 hover:bg-white/12"
            >
              <Layers3Icon />
              {copy.secondaryCta}
            </Button>
          </div>
        </div>

        <div
          data-work-reveal
          style={getRevealStyle(360)}
          className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/16 bg-white/16 backdrop-blur-md sm:grid-cols-3 lg:max-w-3xl"
        >
          <HeroMetric label={copy.metrics[0].label} value={String(totalCount)} />
          <HeroMetric
            label={copy.metrics[1].label}
            value={String(workCategoryDefinitions.length - 1)}
          />
          <HeroMetric label={copy.metrics[2].label} value={String(featuredWorkIds.length)} />
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="bg-slate-950/42 px-4 py-3">
      <p className="text-xs font-medium text-white/62">{label}</p>
      <p className="mt-1 text-2xl leading-none font-semibold text-white">{value}</p>
    </div>
  );
}

function FeaturedWorksSection({
  copy,
  featuredWorks,
  locale,
}: {
  readonly copy: WorksCopy;
  readonly featuredWorks: PresentedWork[];
  readonly locale: SupportedLocale;
}) {
  return (
    <section id="featured-works" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div data-work-reveal className="max-w-2xl">
          <p className="text-sm font-semibold text-link">{copy.featuredEyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
            {copy.featuredTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.featuredBody}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featuredWorks.map((work, index) => (
            <FeaturedWorkCard key={work.item.id} index={index} locale={locale} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({
  index,
  locale,
  work,
}: {
  readonly index: number;
  readonly locale: SupportedLocale;
  readonly work: PresentedWork;
}) {
  const { item, presentation } = work;
  const openInNewTab = shouldOpenInNewTab(item);

  return (
    <a
      href={item.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      data-work-reveal
      data-work-card
      style={getRevealStyle(index * 80)}
      className="group overflow-hidden rounded-lg border border-border bg-background transition hover:border-foreground/40"
    >
      <WorkPreview locale={locale} presentation={presentation} title={getItemTitle(item, locale)} />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <WorkPill>{getLocalizedKind(presentation, locale)}</WorkPill>
          <WorkPill>{getLocalizedStatus(presentation, locale)}</WorkPill>
        </div>
        <h3 className="mt-5 text-2xl leading-tight font-semibold text-balance group-hover:text-link">
          {getItemTitle(item, locale)}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {getItemDescription(item, locale)}
        </p>
        <WorkTags className="mt-5" locale={locale} presentation={presentation} />
        <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-link">
          {getItemCta(item, locale)}
          <ExternalLinkIcon className="size-4" />
        </span>
      </div>
    </a>
  );
}

function CategoryFilterList({
  activeCategoryId,
  locale,
  onCategoryChange,
  works,
}: {
  readonly activeCategoryId: FilterCategoryId;
  readonly locale: SupportedLocale;
  readonly onCategoryChange: (categoryId: FilterCategoryId) => void;
  readonly works: PresentedWork[];
}) {
  return (
    <div className="mt-7 grid gap-2">
      {workCategoryDefinitions.map((category) => {
        const Icon = category.icon;
        const active = category.id === activeCategoryId;
        const count = getCategoryWorkCount(category.id, works);

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={active}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "group flex min-h-12 w-full items-center justify-between gap-3 rounded-md border px-3 text-left text-sm font-semibold transition",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted/40",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{getCategoryLabel(category, locale)}</span>
            </span>
            <span
              className={cn(
                "rounded-sm px-2 py-0.5 text-xs",
                active ? "bg-background/16 text-background" : "bg-muted text-muted-foreground",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ActiveCategorySummary({
  activeCategory,
  count,
  locale,
}: {
  readonly activeCategory: (typeof workCategoryDefinitions)[number];
  readonly count: number;
  readonly locale: SupportedLocale;
}) {
  const Icon = activeCategory.icon;

  return (
    <div
      data-work-reveal
      className="flex flex-col gap-4 rounded-lg border border-border bg-muted/28 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-background text-foreground">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-semibold">
            {getCategoryLabel(activeCategory, locale)}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {getCategorySummary(activeCategory, locale)}
          </p>
        </div>
      </div>
      <p className="shrink-0 text-sm font-semibold text-muted-foreground">
        {locale === "zh" ? `${count} 个入口` : `${count} works`}
      </p>
    </div>
  );
}

function PortfolioWorkCard({
  index,
  locale,
  work,
}: {
  readonly index: number;
  readonly locale: SupportedLocale;
  readonly work: PresentedWork;
}) {
  const { item, presentation } = work;
  const openInNewTab = shouldOpenInNewTab(item);

  return (
    <article
      data-work-reveal
      data-work-card
      style={getRevealStyle(index * 42)}
      className="group overflow-hidden rounded-lg border border-border bg-background transition hover:border-foreground/35"
    >
      <a
        href={item.href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className="block"
      >
        <WorkPreview
          compact
          locale={locale}
          presentation={presentation}
          title={getItemTitle(item, locale)}
        />
      </a>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <WorkPill>{getLocalizedKind(presentation, locale)}</WorkPill>
          <WorkPill>{getLocalizedStatus(presentation, locale)}</WorkPill>
        </div>
        <a
          href={item.href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="mt-4 block"
        >
          <h3 className="line-clamp-2 text-xl leading-tight font-semibold text-balance group-hover:text-link">
            {getItemTitle(item, locale)}
          </h3>
        </a>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {getItemDescription(item, locale)}
        </p>
        <WorkTags className="mt-4" locale={locale} presentation={presentation} />
        <a
          href={item.href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-link"
        >
          {getItemCta(item, locale)}
          <ExternalLinkIcon className="size-4" />
        </a>
      </div>
    </article>
  );
}

function WorkPreview({
  compact = false,
  locale,
  presentation,
  title,
}: {
  readonly compact?: boolean;
  readonly locale: SupportedLocale;
  readonly presentation: WorkPresentation;
  readonly title: string;
}) {
  const assetLabel = getLocalizedAssetLabel(presentation, locale);

  return (
    <figure
      data-work-preview
      className={cn(
        "relative overflow-hidden bg-muted",
        compact ? "aspect-[4/3]" : "aspect-[16/10]",
      )}
    >
      {presentation.videoSrc ? (
        <video
          src={presentation.videoSrc}
          poster={presentation.previewSrc}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={presentation.previewSrc} alt={title} className="h-full w-full object-cover" />
      )}
      <figcaption className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-3 rounded-md border border-white/16 bg-slate-950/62 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
        <span className="truncate">{assetLabel}</span>
        {presentation.videoSrc ? <span>{locale === "zh" ? "视频" : "Video"}</span> : null}
      </figcaption>
    </figure>
  );
}

function WorkPill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
      {children}
    </span>
  );
}

function WorkTags({
  className,
  locale,
  presentation,
}: {
  readonly className?: string;
  readonly locale: SupportedLocale;
  readonly presentation: WorkPresentation;
}) {
  const tags = locale === "zh" ? presentation.tagsZh : presentation.tags;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function WorksMotionController({ refreshKey }: { readonly refreshKey: string }) {
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
  }, [refreshKey]);

  return null;
}

function getPresentedWorks(): PresentedWork[] {
  return portfolioItems.map((item) => ({
    item,
    presentation: workPresentationById[item.id] ?? getFallbackPresentation(item),
  }));
}

function getFallbackPresentation(item: PortfolioItem): WorkPresentation {
  return {
    categoryId: "tools-practice",
    kind: item.category,
    kindZh: item.categoryZh,
    status: "Published",
    statusZh: "已发布",
    assetLabel: "Preview",
    assetLabelZh: "作品预览",
    tags: [item.category, "Portfolio", "Web"],
    tagsZh: [item.categoryZh, "作品集", "网页"],
    previewSrc: "/works/portfolio-hero-imagen.png",
  };
}

function getCategoryDefinition(categoryId: WorkCategoryId) {
  return (
    workCategoryDefinitions.find((category) => category.id === categoryId) ??
    workCategoryDefinitions[0]
  );
}

function getCategoryWorkCount(categoryId: WorkCategoryId, works: PresentedWork[]) {
  if (categoryId === "all") {
    return works.length;
  }

  return works.filter(({ presentation }) => presentation.categoryId === categoryId).length;
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

function getItemCta(item: PortfolioItem, locale: SupportedLocale) {
  return locale === "zh" ? item.ctaZh : item.cta;
}

function getCategoryLabel(
  category: (typeof workCategoryDefinitions)[number],
  locale: SupportedLocale,
) {
  return locale === "zh" ? category.labelZh : category.label;
}

function getCategorySummary(
  category: (typeof workCategoryDefinitions)[number],
  locale: SupportedLocale,
) {
  return locale === "zh" ? category.summaryZh : category.summary;
}

function getLocalizedKind(presentation: WorkPresentation, locale: SupportedLocale) {
  return locale === "zh" ? presentation.kindZh : presentation.kind;
}

function getLocalizedStatus(presentation: WorkPresentation, locale: SupportedLocale) {
  return locale === "zh" ? presentation.statusZh : presentation.status;
}

function getLocalizedAssetLabel(presentation: WorkPresentation, locale: SupportedLocale) {
  return locale === "zh" ? presentation.assetLabelZh : presentation.assetLabel;
}

function shouldOpenInNewTab(item: PortfolioItem) {
  return item.newTab || item.href.startsWith("http");
}

function getWorksCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      eyebrow: "Yusually 作品集",
      title: "把地图、数据、旅行和视觉实验，整理成一个可浏览的作品宇宙。",
      body: "先看画面，再进入作品。这里把地图的纹理、数据的结构、海水的光和游戏的界面放到台前，让你顺着感兴趣的视觉继续探索。",
      primaryCta: "查看精选作品",
      secondaryCta: "筛选全部作品",
      metrics: [{ label: "可进入作品" }, { label: "浏览方向" }, { label: "精选作品" }],
      featuredEyebrow: "精选作品",
      featuredTitle: "先看最能代表当前气质的几件作品。",
      featuredBody:
        "这些入口覆盖地图产品、世界数据、内容研究和海洋视觉叙事，也最能说明这个个人网站正在积累的能力。",
      libraryEyebrow: "作品墙",
      libraryTitle: "按作品类型筛选，看见每个项目里面到底有什么。",
      libraryBody:
        "点击左侧分类，右侧会直接切换对应作品。每张卡都先给出一眼能判断的画面、主题和去处，不用只靠标题猜内容。",
    };
  }

  return {
    eyebrow: "Yusually works",
    title: "A visual universe for maps, data, travel, and web experiments.",
    body: "Start with the image, then choose where to go. Maps, data structures, ocean light, game screens, and tool surfaces sit up front so each work can be understood before you open it.",
    primaryCta: "View featured work",
    secondaryCta: "Browse by type",
    metrics: [{ label: "Works to open" }, { label: "Browsing paths" }, { label: "Featured works" }],
    featuredEyebrow: "Featured work",
    featuredTitle: "Start with the works that carry the clearest point of view.",
    featuredBody:
      "These projects span map products, world data, content research, and oceanic visual storytelling.",
    libraryEyebrow: "Work wall",
    libraryTitle: "Filter by format and see what is inside each project.",
    libraryBody:
      "Choose a category on the left and the matching works appear on the right. Each card gives enough visual context to decide what is worth opening next.",
  };
}
