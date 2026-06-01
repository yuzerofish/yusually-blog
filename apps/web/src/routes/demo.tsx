import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  BrushIcon,
  FileTextIcon,
  LayersIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getSiteSettingsPageData } from "#/lib/cms-server";
import { getDocsUrl } from "#/lib/docs-i18n";
import { getCurrentLocale } from "#/lib/i18n";

export const Route = createFileRoute("/demo")({
  loader: () => $getSiteSettingsPageData(),
  head: () => {
    const locale = getCurrentLocale();

    return {
      meta: [
        {
          title:
            locale === "zh"
              ? "博客风格 Demo | 01MVP Blog Starter"
              : "Blog Style Demo | 01MVP Blog Starter",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "查看 6 种可用于个人博客首页的视觉方向，从极简产品感到黑白个人站都可以继续改造。"
              : "Explore six homepage directions for a personal blog, from minimal product-style layouts to monochrome personal sites.",
        },
      ],
    };
  },
  component: DemoBlogPage,
});

type DemoPost = {
  readonly title: string;
  readonly excerpt: string;
  readonly meta: string;
  readonly tag: string;
};

type DemoSignal = {
  readonly label: string;
  readonly value: string;
};

type StyleVariant = "saas" | "brutalist" | "maker" | "editorial" | "garden" | "terminal";

type StylePreview = {
  readonly id: string;
  readonly variant: StyleVariant;
  readonly eyebrow: string;
  readonly name: string;
  readonly headline: string;
  readonly description: string;
  readonly author: string;
  readonly image: string;
  readonly tags: readonly string[];
  readonly stats: readonly DemoSignal[];
  readonly posts: readonly DemoPost[];
};

function DemoBlogPage() {
  const { siteSettings } = Route.useLoaderData();
  const locale = getCurrentLocale();
  const localizedSiteSettings = localizeSiteSettings(siteSettings, locale);
  const copy = getDemoCopy(locale);
  const docsHref = getDocsUrl([], locale);

  return (
    <SiteShell siteSettings={localizedSiteSettings}>
      <div className="bg-background">
        <section className="border-b border-border bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:px-8 lg:py-16">
            <div className="flex min-h-[34rem] flex-col justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-link uppercase">
                  <PaletteIcon className="size-4" />
                  {copy.eyebrow}
                </p>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold text-balance sm:text-6xl lg:text-7xl">
                  {copy.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {copy.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    render={<a href="#style-gallery" aria-label={copy.primaryAction} />}
                    nativeButton={false}
                    size="lg"
                  >
                    <BrushIcon />
                    {copy.primaryAction}
                  </Button>
                  <Button
                    render={<a href={docsHref} aria-label={copy.docsAction} />}
                    variant="outline"
                    nativeButton={false}
                    size="lg"
                  >
                    <FileTextIcon />
                    {copy.docsAction}
                  </Button>
                </div>
              </div>

              <div className="mt-10 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
                {copy.signals.map((signal) => (
                  <div key={signal.label}>
                    <p className="text-2xl font-semibold">{signal.value}</p>
                    <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {signal.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <HeroStyleBoard label={copy.boardLabel} styles={copy.styles} />
          </div>
        </section>

        <section id="style-gallery" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-link uppercase">{copy.galleryEyebrow}</p>
                <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                  {copy.galleryTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground lg:justify-self-end">
                {copy.galleryDescription}
              </p>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {copy.styles.map((style, index) => (
                <StylePreviewCard key={style.id} index={index} style={style} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.42fr)] lg:px-8 lg:py-16">
            <div className="border-y border-border">
              {copy.customization.map((item, index) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-b border-border py-5 last:border-b-0 sm:grid-cols-[72px_minmax(0,1fr)]"
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="flex flex-col justify-between border border-border bg-background p-5">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-link uppercase">
                  <SparklesIcon className="size-4" />
                  {copy.sidebarEyebrow}
                </p>
                <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                  {copy.sidebarTitle}
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.sidebarBody}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  render={<a href={docsHref} aria-label={copy.docsAction} />}
                  nativeButton={false}
                >
                  <FileTextIcon />
                  {copy.docsAction}
                </Button>
                <Button
                  render={<Link to="/blog" search={{ q: "", tag: "", series: "", page: 1 }} />}
                  variant="outline"
                  nativeButton={false}
                >
                  {copy.articlesAction}
                  <ArrowRightIcon />
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

function HeroStyleBoard({
  label,
  styles,
}: {
  readonly label: string;
  readonly styles: readonly StylePreview[];
}) {
  return (
    <aside className="flex min-h-[34rem] flex-col justify-between border border-border bg-background p-4">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-sm font-semibold">{label}</p>
          <LayersIcon className="size-5 text-muted-foreground" />
        </div>
        <div className="mt-4 grid gap-2">
          {styles.map((style, index) => (
            <a
              key={style.id}
              href={`#${style.id}`}
              className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)] items-center gap-3 border border-border bg-muted/35 px-3 transition hover:border-foreground hover:bg-background"
            >
              <span className="text-xs font-semibold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{style.name}</span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  {style.eyebrow}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <div className="grid grid-cols-6 gap-1">
          {styles.map((style) => (
            <span
              key={style.id}
              className={styleSwatchClassName[style.variant]}
              aria-label={style.name}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function StylePreviewCard({
  index,
  style,
}: {
  readonly index: number;
  readonly style: StylePreview;
}) {
  return (
    <article
      id={style.id}
      className="scroll-mt-24 overflow-hidden border border-border bg-background"
    >
      <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(190px,0.68fr)]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-wide text-link uppercase">
              {String(index + 1).padStart(2, "0")} / {style.eyebrow}
            </p>
            <span className={styleSwatchClassName[style.variant]} />
          </div>
          <h3 className="mt-4 text-3xl leading-tight font-semibold text-balance">{style.name}</h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{style.description}</p>
        </div>

        <div className="sm:border-l sm:border-border sm:pl-5">
          <div className="flex flex-wrap gap-2">
            {style.tags.map((tag) => (
              <span key={tag} className="border border-border bg-muted/40 px-2.5 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
            {style.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-semibold">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StyleMockup style={style} />
    </article>
  );
}

function StyleMockup({ style }: { readonly style: StylePreview }) {
  switch (style.variant) {
    case "saas":
      return <SaasMockup style={style} />;
    case "brutalist":
      return <BrutalistMockup style={style} />;
    case "maker":
      return <MakerMockup style={style} />;
    case "editorial":
      return <EditorialMockup style={style} />;
    case "garden":
      return <GardenMockup style={style} />;
    case "terminal":
      return <TerminalMockup style={style} />;
  }
}

function SaasMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-[#f4f6fb] p-3 text-slate-950">
      <div className="grid h-full gap-3 md:grid-cols-[112px_minmax(0,1fr)]">
        <aside className="border border-slate-200 bg-white/90 p-3 shadow-sm">
          <div className="h-2.5 w-16 rounded-full bg-slate-950" />
          <div className="mt-5 space-y-2">
            {["Home", "Notes", "Ideas", "Archive"].map((item, index) => (
              <div
                key={item}
                className={
                  index === 0
                    ? "rounded-md bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-700"
                    : "rounded-md px-2 py-2 text-xs text-slate-500"
                }
              >
                {index === 0 ? "✨ " : ""}
                {item}
              </div>
            ))}
          </div>
        </aside>
        <div className="space-y-3">
          <div className="border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {style.author}
              </span>
              <span className="text-xs text-slate-400">📌 weekly memo</span>
            </div>
            <h4 className="mt-6 text-2xl leading-tight font-semibold tracking-tight">
              {style.headline}
            </h4>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              {style.posts[0].excerpt}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
            <div className="space-y-2">
              {style.posts.map((post) => (
                <div key={post.title} className="border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold text-blue-700">{post.tag}</p>
                  <p className="mt-2 text-sm leading-tight font-semibold">{post.title}</p>
                </div>
              ))}
            </div>
            <img
              src={style.image}
              alt=""
              loading="lazy"
              className="hidden h-full min-h-40 w-full object-cover sm:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrutalistMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-[#f0e733] p-4 text-black">
      <div className="grid min-h-full border-4 border-black bg-white shadow-[8px_8px_0_#000]">
        <div className="grid border-b-4 border-black sm:grid-cols-[1fr_120px]">
          <div className="p-4">
            <p className="font-mono text-xs font-black uppercase">{style.author}</p>
            <h4 className="mt-5 text-4xl leading-[0.9] font-black uppercase">{style.headline}</h4>
          </div>
          <div className="flex items-center justify-center border-t-4 border-black bg-[#ff4f3a] p-4 font-mono text-xl font-black uppercase sm:border-t-0 sm:border-l-4">
            New
          </div>
        </div>
        <div className="grid gap-0 sm:grid-cols-[0.9fr_1fr]">
          <img src={style.image} alt="" loading="lazy" className="h-full min-h-48 object-cover" />
          <div className="divide-y-4 divide-black border-t-4 border-black sm:border-t-0 sm:border-l-4">
            {style.posts.map((post) => (
              <div key={post.title} className="p-4">
                <p className="font-mono text-[11px] font-black uppercase">{post.meta}</p>
                <p className="mt-2 text-xl leading-tight font-black">{post.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MakerMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-white p-5 text-black">
      <div className="mx-auto max-w-xl">
        <header className="flex items-center justify-between gap-4 border-b border-black/20 pb-3">
          <p className="text-lg font-black tracking-tight">{style.author}</p>
          <nav className="flex gap-4 text-xs font-medium text-black/60">
            <span>Blog</span>
            <span>Notes</span>
            <span>Projects</span>
          </nav>
        </header>
        <div className="grid gap-5 border-b border-black/20 py-6 sm:grid-cols-[1fr_120px]">
          <div>
            <p className="inline-flex border border-black/20 bg-black px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-white uppercase">
              Personal site
            </p>
            <h4 className="mt-5 text-4xl leading-none font-bold tracking-tight">
              {style.headline}
            </h4>
            <p className="mt-4 text-sm leading-6 text-black/62">{style.posts[0].excerpt}</p>
          </div>
          <img
            src={style.image}
            alt=""
            loading="lazy"
            className="aspect-square w-full border border-black/20 object-cover grayscale"
          />
        </div>
        <div className="divide-y divide-black/15">
          {style.posts.map((post) => (
            <div key={post.title} className="grid gap-3 py-4 sm:grid-cols-[1fr_96px]">
              <div>
                <p className="text-xs font-semibold text-black/50">{post.tag}</p>
                <p className="mt-1 text-lg leading-tight font-bold">{post.title}</p>
              </div>
              <p className="font-mono text-xs text-black/50 sm:text-right">{post.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-[#f5ecd9] p-5 font-serif text-[#21170e]">
      <div className="border-y border-[#21170e] py-3 text-center text-xs tracking-[0.32em] uppercase">
        {style.author}
      </div>
      <div className="grid gap-5 py-6 sm:grid-cols-[1fr_180px]">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase">{style.eyebrow}</p>
          <h4 className="mt-4 text-5xl leading-[0.88] font-bold">{style.headline}</h4>
        </div>
        <img
          src={style.image}
          alt=""
          loading="lazy"
          className="aspect-[4/5] w-full object-cover sepia"
        />
      </div>
      <div className="grid gap-4 border-t border-[#21170e] pt-4 sm:grid-cols-3">
        {style.posts.map((post) => (
          <div key={post.title}>
            <p className="text-[11px] tracking-[0.16em] uppercase">{post.meta}</p>
            <p className="mt-2 text-lg leading-tight font-bold">{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GardenMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-[#e8f0df] p-5 text-[#172416]">
      <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
        <img
          src={style.image}
          alt=""
          loading="lazy"
          className="aspect-[3/4] w-full rounded-lg object-cover"
        />
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#5f7b49] uppercase">
            {style.author}
          </p>
          <h4 className="mt-4 text-4xl leading-[0.96] font-semibold">{style.headline}</h4>
          <p className="mt-4 text-sm leading-6 text-[#4d6048]">{style.posts[0].excerpt}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {style.posts.map((post) => (
          <div key={post.title} className="border border-[#b7c8a9] bg-[#f7faef] p-3">
            <p className="text-xs font-semibold text-[#6b8a53]">{post.tag}</p>
            <p className="mt-2 text-base leading-tight font-semibold">{post.title}</p>
            <p className="mt-3 text-xs text-[#65765d]">{post.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalMockup({ style }: { readonly style: StylePreview }) {
  return (
    <div className="min-h-[28rem] bg-[#090f0c] p-4 font-mono text-[#d9ffe7]">
      <div className="border border-[#2f6f4b] bg-[#0f1713]">
        <div className="flex items-center gap-2 border-b border-[#2f6f4b] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5d5d]" />
          <span className="size-2 rounded-full bg-[#ffd166]" />
          <span className="size-2 rounded-full bg-[#52e08d]" />
          <span className="ml-2 text-[11px] text-[#7ab891]">~/blog/index.md</span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_150px]">
          <div>
            <p className="text-xs text-[#7ab891]">$ open {style.author}</p>
            <h4 className="mt-5 text-3xl leading-tight font-bold text-[#f2fff7]">
              # {style.headline}
            </h4>
            <p className="mt-4 text-sm leading-6 text-[#9bd6af]">{style.posts[0].excerpt}</p>
          </div>
          <img
            src={style.image}
            alt=""
            loading="lazy"
            className="aspect-square w-full border border-[#2f6f4b] object-cover opacity-80 mix-blend-screen"
          />
        </div>
        <div className="divide-y divide-[#2f6f4b] border-t border-[#2f6f4b]">
          {style.posts.map((post) => (
            <div key={post.title} className="grid gap-2 px-4 py-3 sm:grid-cols-[84px_1fr]">
              <p className="text-xs text-[#7ab891]">{post.meta}</p>
              <p className="text-sm leading-tight text-[#f2fff7]">- {post.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styleSwatchClassName: Record<StyleVariant, string> = {
  brutalist: "block h-5 w-full border-2 border-black bg-[#f0e733]",
  editorial: "block h-5 w-full border border-[#8a6d3e] bg-[#f5ecd9]",
  garden: "block h-5 w-full border border-[#8aa477] bg-[#dceccc]",
  maker: "block h-5 w-full border border-foreground bg-foreground",
  saas: "block h-5 w-full border border-[#b9c7df] bg-[#eaf1ff]",
  terminal: "block h-5 w-full border border-[#2f6f4b] bg-[#0f1713]",
};

function getDemoCopy(locale: ReturnType<typeof getCurrentLocale>) {
  const images = {
    desk: "/demo/desk.jpg",
    garden: "/demo/garden.jpg",
    library: "/demo/library.jpg",
    notes: "/demo/notes.jpg",
    server: "/demo/server.jpg",
    writing: "/demo/writing.jpg",
  };

  if (locale === "zh") {
    return {
      eyebrow: "博客首页风格展厅",
      title: "同一套博客，可以长成 6 种完全不同的样子。",
      description:
        "读者看到的不应该只是模板，而应该是作者自己的气质。下面这些方向都适合个人博客，也都可以继续换布局、配色、栏目和封面比例。",
      primaryAction: "查看 6 种风格",
      docsAction: "阅读部署文档",
      articlesAction: "查看官网文章",
      boardLabel: "可选方向",
      signals: [
        { label: "首页方向", value: "6" },
        { label: "可改模块", value: "12+" },
        { label: "博客适配", value: "100%" },
      ] satisfies DemoSignal[],
      galleryEyebrow: "Design directions",
      galleryTitle: "每一张都是可继续改造的博客首页。",
      galleryDescription:
        "可以选择一种直接作为起点，也可以把多个方向混合：例如用极简 SaaS 的信息密度，配上黑白个人站的语气和杂志封面的首屏。",
      sidebarEyebrow: "自由改造",
      sidebarTitle: "把风格变成你自己的站点，而不是套一个固定皮肤。",
      sidebarBody:
        "这些 demo 只展示起点：你可以继续调整导航、作者介绍、文章列表、标签、专题、订阅入口、图片比例和整套视觉语言。",
      customization: [
        {
          title: "先选气质",
          description: "博客可以像产品工作台、个人名片、电子杂志、研究笔记，也可以像开发者终端。",
        },
        {
          title: "再改首页结构",
          description:
            "作者介绍、精选文章、最新列表、项目入口、订阅区和社交链接都能按你的内容重排。",
        },
        {
          title: "最后统一视觉系统",
          description:
            "字体、留白、卡片边框、封面比例、强调色和深浅色模式一起收敛，站点才会像你本人。",
        },
      ],
      styles: [
        {
          author: "Startup Notes",
          description:
            "白色卡片、浅灰背景、Notion 式侧栏和 Linear 式文章列表，适合 AI 产品、创业复盘、工具教程。",
          eyebrow: "苹果感极简 SaaS",
          headline: "Build notes for a calm internet business",
          id: "style-saas-minimal",
          image: images.desk,
          name: "轻量产品工作台",
          stats: [
            { label: "留白", value: "高" },
            { label: "信息密度", value: "中" },
            { label: "强调色", value: "蓝" },
          ],
          tags: ["Notion sidebar", "Linear list", "Blue accent", "Emoji stickers"],
          posts: [
            {
              excerpt: "把路线图、复盘和长期文章放在同一个安静界面里，适合读者快速扫读。",
              meta: "06 min",
              tag: "Build log",
              title: "How I shipped a small AI product in public",
            },
            {
              excerpt: "A quiet archive for shipping notes.",
              meta: "04 min",
              tag: "Notes",
              title: "Decision logs that survive launch week",
            },
            {
              excerpt: "Organize writing like a product roadmap.",
              meta: "08 min",
              tag: "System",
              title: "A blog homepage for weekly product thinking",
            },
          ],
          variant: "saas",
        },
        {
          author: "Raw Dispatch",
          description:
            "粗黑边框、高饱和强调块、强烈标题和海报感分区，适合观点强、节奏快、愿意有态度的作者。",
          eyebrow: "野兽现代派",
          headline: "Noisy ideas, clean archive",
          id: "style-modern-brutalist",
          image: images.server,
          name: "野兽现代派快报",
          stats: [
            { label: "冲击力", value: "强" },
            { label: "边框", value: "重" },
            { label: "节奏", value: "快" },
          ],
          tags: ["Poster grid", "Heavy borders", "Yellow signal", "Opinionated"],
          posts: [
            {
              excerpt: "Opinionated writing with a loud front page.",
              meta: "TODAY",
              tag: "Essay",
              title: "Stop making personal sites look apologetic",
            },
            {
              excerpt: "A raw archive can still be easy to scan.",
              meta: "FIELD",
              tag: "Field note",
              title: "Every border should mean something",
            },
            {
              excerpt: "Let the homepage carry editorial tension.",
              meta: "LOG",
              tag: "Build",
              title: "Brutalist does not mean careless",
            },
          ],
          variant: "brutalist",
        },
        {
          author: "Maker Jackie",
          description:
            "接近 makerjackie.com 的黑白极简个人站气质：作者、入口、文章和作品集都很克制，重点是人和判断。",
          eyebrow: "极简黑白个人站",
          headline: "记录 AI、产品、独立开发和实验",
          id: "style-maker-monochrome",
          image: images.writing,
          name: "Maker 黑白首页",
          stats: [
            { label: "颜色", value: "黑白" },
            { label: "装饰", value: "少" },
            { label: "作者感", value: "强" },
          ],
          tags: ["Monochrome", "Personal intro", "Project links", "Sharp text"],
          posts: [
            {
              excerpt: "把文章、作品和联系方式放在同一个清晰入口里。",
              meta: "2026.05",
              tag: "Essay",
              title: "你好，我是 Maker Jackie",
            },
            {
              excerpt: "Personal publishing with a direct voice.",
              meta: "2026.05",
              tag: "Project",
              title: "How this blog became my home base",
            },
            {
              excerpt: "Minimal does not need to feel empty.",
              meta: "2026.04",
              tag: "Note",
              title: "A small page can still carry a real person",
            },
          ],
          variant: "maker",
        },
        {
          author: "The Slow Letter",
          description:
            "大标题、杂志分栏、温暖纸感和精选封面，适合长文、访谈、书影音、年度总结和审美型个人博客。",
          eyebrow: "编辑部杂志感",
          headline: "Essays for the slower part of the week",
          id: "style-editorial-magazine",
          image: images.library,
          name: "周末电子杂志",
          stats: [
            { label: "阅读感", value: "强" },
            { label: "封面", value: "大" },
            { label: "语气", value: "慢" },
          ],
          tags: ["Serif type", "Magazine cover", "Columns", "Warm paper"],
          posts: [
            {
              excerpt: "Long-form writing with a slower rhythm.",
              meta: "Issue 18",
              tag: "Essay",
              title: "The archive as a living reading room",
            },
            {
              excerpt: "A homepage that feels edited, not generated.",
              meta: "Column",
              tag: "Culture",
              title: "Notes from a small personal library",
            },
            {
              excerpt: "Featured essays need room to breathe.",
              meta: "Letter",
              tag: "Letter",
              title: "Why the first screen should feel deliberate",
            },
          ],
          variant: "editorial",
        },
        {
          author: "Garden Log",
          description:
            "自然绿色、轻微手帐感、图文并排和安静标签，适合生活记录、阅读笔记、旅行、园艺和慢节奏创作。",
          eyebrow: "自然手帐博客",
          headline: "Small notes from a growing life",
          id: "style-garden-journal",
          image: images.garden,
          name: "花园手帐",
          stats: [
            { label: "氛围", value: "柔和" },
            { label: "内容", value: "生活" },
            { label: "节奏", value: "慢" },
          ],
          tags: ["Soft green", "Daily notes", "Photo first", "Gentle archive"],
          posts: [
            {
              excerpt: "轻松记录日常，也保留能被长期翻回来的线索。",
              meta: "May 28",
              tag: "Journal",
              title: "The quiet advantage of writing after dinner",
            },
            {
              excerpt: "A small archive for observations and routines.",
              meta: "May 21",
              tag: "Reading",
              title: "Books, walks, and the notes between them",
            },
            {
              excerpt: "Let photos and paragraphs share the surface.",
              meta: "May 12",
              tag: "Life",
              title: "How a seasonal page keeps memories alive",
            },
          ],
          variant: "garden",
        },
        {
          author: "devlog.sh",
          description:
            "深色终端、等宽字体、命令行式索引和清晰日志流，适合技术博客、开源项目、研究记录和工程笔记。",
          eyebrow: "终端极客日志",
          headline: "Ship notes, patches, and field reports",
          id: "style-terminal-devlog",
          image: images.notes,
          name: "终端 Devlog",
          stats: [
            { label: "字体", value: "Mono" },
            { label: "模式", value: "Dark" },
            { label: "入口", value: "Log" },
          ],
          tags: ["Terminal UI", "Dark mode", "Code notes", "Readable index"],
          posts: [
            {
              excerpt: "把提交记录、技术复盘和研究摘要变成可浏览的公开日志。",
              meta: "r42",
              tag: "Patch",
              title: "Refactor notes from a weekend release",
            },
            {
              excerpt: "A technical archive with enough personality.",
              meta: "r41",
              tag: "Research",
              title: "What broke when I moved the worker runtime",
            },
            {
              excerpt: "CLI aesthetics without sacrificing readability.",
              meta: "r40",
              tag: "Guide",
              title: "Designing a devlog that non-developers can read",
            },
          ],
          variant: "terminal",
        },
      ] satisfies StylePreview[],
    };
  }

  return {
    eyebrow: "Blog homepage style gallery",
    title: "One blog starter can become six completely different homepages.",
    description:
      "Readers should feel the author before they notice the template. These directions are all suited to personal blogs and can keep changing across layout, color, sections, and image rhythm.",
    primaryAction: "Explore six styles",
    docsAction: "Read deployment docs",
    articlesAction: "Read site articles",
    boardLabel: "Available directions",
    signals: [
      { label: "Homepage styles", value: "6" },
      { label: "Editable blocks", value: "12+" },
      { label: "Blog-ready", value: "100%" },
    ] satisfies DemoSignal[],
    galleryEyebrow: "Design directions",
    galleryTitle: "Each card is a blog homepage starting point.",
    galleryDescription:
      "Pick one direction or mix several: product-like density, monochrome personal voice, editorial first screens, garden journals, or developer logs.",
    sidebarEyebrow: "Customize freely",
    sidebarTitle: "Turn a direction into your own site, not a fixed skin.",
    sidebarBody:
      "These demos show starting points. Navigation, author intro, featured writing, latest posts, series, subscription entry, image ratio, and the full visual language can all change.",
    customization: [
      {
        title: "Choose the tone first",
        description:
          "A blog can feel like a product workspace, personal profile, magazine, field journal, or developer terminal.",
      },
      {
        title: "Reshape the homepage",
        description:
          "Author intro, featured posts, latest lists, project links, subscriptions, and social links can be rearranged around your content.",
      },
      {
        title: "Unify the visual system",
        description:
          "Typography, spacing, borders, cover ratios, accent colors, and light or dark mode make the site feel like the author.",
      },
    ],
    styles: [
      {
        author: "Startup Notes",
        description:
          "White cards, gray surfaces, a Notion-like sidebar, and Linear-style post lists for AI products, startup notes, and practical tutorials.",
        eyebrow: "Apple-like SaaS minimal",
        headline: "Build notes for a calm internet business",
        id: "style-saas-minimal",
        image: images.desk,
        name: "Light Product Workspace",
        stats: [
          { label: "Whitespace", value: "High" },
          { label: "Density", value: "Mid" },
          { label: "Accent", value: "Blue" },
        ],
        tags: ["Notion sidebar", "Linear list", "Blue accent", "Emoji stickers"],
        posts: [
          {
            excerpt:
              "Roadmaps, retrospectives, and durable essays can live together in a quiet scanning surface.",
            meta: "06 min",
            tag: "Build log",
            title: "How I shipped a small AI product in public",
          },
          {
            excerpt: "A quiet archive for shipping notes.",
            meta: "04 min",
            tag: "Notes",
            title: "Decision logs that survive launch week",
          },
          {
            excerpt: "Organize writing like a product roadmap.",
            meta: "08 min",
            tag: "System",
            title: "A blog homepage for weekly product thinking",
          },
        ],
        variant: "saas",
      },
      {
        author: "Raw Dispatch",
        description:
          "Heavy borders, high-signal color blocks, loud headlines, and poster-like sections for writers with sharper opinions.",
        eyebrow: "Modern brutalist",
        headline: "Noisy ideas, clean archive",
        id: "style-modern-brutalist",
        image: images.server,
        name: "Modern Brutalist Dispatch",
        stats: [
          { label: "Impact", value: "Hard" },
          { label: "Border", value: "Heavy" },
          { label: "Pace", value: "Fast" },
        ],
        tags: ["Poster grid", "Heavy borders", "Yellow signal", "Opinionated"],
        posts: [
          {
            excerpt: "Opinionated writing with a loud front page.",
            meta: "TODAY",
            tag: "Essay",
            title: "Stop making personal sites look apologetic",
          },
          {
            excerpt: "A raw archive can still be easy to scan.",
            meta: "FIELD",
            tag: "Field note",
            title: "Every border should mean something",
          },
          {
            excerpt: "Let the homepage carry editorial tension.",
            meta: "LOG",
            tag: "Build",
            title: "Brutalist does not mean careless",
          },
        ],
        variant: "brutalist",
      },
      {
        author: "Maker Jackie",
        description:
          "A monochrome personal-site direction close to makerjackie.com: restrained author signal, practical links, articles, and projects.",
        eyebrow: "Minimal monochrome personal site",
        headline: "Notes on AI, products, indie building, and experiments",
        id: "style-maker-monochrome",
        image: images.writing,
        name: "Maker Monochrome Home",
        stats: [
          { label: "Color", value: "B/W" },
          { label: "Decor", value: "Low" },
          { label: "Author", value: "High" },
        ],
        tags: ["Monochrome", "Personal intro", "Project links", "Sharp text"],
        posts: [
          {
            excerpt: "Articles, projects, and contact paths share one direct surface.",
            meta: "2026.05",
            tag: "Essay",
            title: "Hello, I am Maker Jackie",
          },
          {
            excerpt: "Personal publishing with a direct voice.",
            meta: "2026.05",
            tag: "Project",
            title: "How this blog became my home base",
          },
          {
            excerpt: "Minimal does not need to feel empty.",
            meta: "2026.04",
            tag: "Note",
            title: "A small page can still carry a real person",
          },
        ],
        variant: "maker",
      },
      {
        author: "The Slow Letter",
        description:
          "Large type, magazine columns, warm paper, and a featured cover for essays, interviews, reading notes, and yearly reviews.",
        eyebrow: "Editorial magazine",
        headline: "Essays for the slower part of the week",
        id: "style-editorial-magazine",
        image: images.library,
        name: "Weekend Digital Magazine",
        stats: [
          { label: "Reading", value: "Deep" },
          { label: "Cover", value: "Large" },
          { label: "Voice", value: "Slow" },
        ],
        tags: ["Serif type", "Magazine cover", "Columns", "Warm paper"],
        posts: [
          {
            excerpt: "Long-form writing with a slower rhythm.",
            meta: "Issue 18",
            tag: "Essay",
            title: "The archive as a living reading room",
          },
          {
            excerpt: "A homepage that feels edited, not generated.",
            meta: "Column",
            tag: "Culture",
            title: "Notes from a small personal library",
          },
          {
            excerpt: "Featured essays need room to breathe.",
            meta: "Letter",
            tag: "Letter",
            title: "Why the first screen should feel deliberate",
          },
        ],
        variant: "editorial",
      },
      {
        author: "Garden Log",
        description:
          "Soft greens, journal-like blocks, calm tags, and image-led sections for life writing, travel, reading, gardening, and slow creation.",
        eyebrow: "Natural notebook blog",
        headline: "Small notes from a growing life",
        id: "style-garden-journal",
        image: images.garden,
        name: "Garden Notebook",
        stats: [
          { label: "Mood", value: "Soft" },
          { label: "Content", value: "Life" },
          { label: "Pace", value: "Slow" },
        ],
        tags: ["Soft green", "Daily notes", "Photo first", "Gentle archive"],
        posts: [
          {
            excerpt: "Daily writing can stay light while still becoming a durable archive.",
            meta: "May 28",
            tag: "Journal",
            title: "The quiet advantage of writing after dinner",
          },
          {
            excerpt: "A small archive for observations and routines.",
            meta: "May 21",
            tag: "Reading",
            title: "Books, walks, and the notes between them",
          },
          {
            excerpt: "Let photos and paragraphs share the surface.",
            meta: "May 12",
            tag: "Life",
            title: "How a seasonal page keeps memories alive",
          },
        ],
        variant: "garden",
      },
      {
        author: "devlog.sh",
        description:
          "A dark terminal surface, monospace rhythm, command-line indexing, and clean log streams for technical blogs and open-source notes.",
        eyebrow: "Terminal devlog",
        headline: "Ship notes, patches, and field reports",
        id: "style-terminal-devlog",
        image: images.notes,
        name: "Terminal Devlog",
        stats: [
          { label: "Type", value: "Mono" },
          { label: "Mode", value: "Dark" },
          { label: "Entry", value: "Log" },
        ],
        tags: ["Terminal UI", "Dark mode", "Code notes", "Readable index"],
        posts: [
          {
            excerpt:
              "Commits, release notes, and technical research become a public archive with personality.",
            meta: "r42",
            tag: "Patch",
            title: "Refactor notes from a weekend release",
          },
          {
            excerpt: "A technical archive with enough personality.",
            meta: "r41",
            tag: "Research",
            title: "What broke when I moved the worker runtime",
          },
          {
            excerpt: "CLI aesthetics without sacrificing readability.",
            meta: "r40",
            tag: "Guide",
            title: "Designing a devlog that non-developers can read",
          },
        ],
        variant: "terminal",
      },
    ] satisfies StylePreview[],
  };
}
