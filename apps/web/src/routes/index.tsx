import {
  SiCloudflare,
  SiDrizzle,
  SiReact,
  SiTypescript,
  SiVite,
} from "@icons-pack/react-simple-icons";
import {
  formatDate,
  localizePost,
  localizeSiteSettings,
  localizeTag,
  type Post,
  type SupportedLocale,
  type Tag,
} from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArchiveIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CloudIcon,
  FileTextIcon,
  GlobeIcon,
  HashIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  PencilIcon,
  ServerIcon,
  Share2Icon,
  ShieldCheckIcon,
  ShieldIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

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
  readonly tags: Tag[];
  readonly locale: SupportedLocale;
};

type FeatureItem = {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
};

type ThemePreview = {
  readonly themePreset: string;
  readonly title: string;
  readonly description: string;
};

type FreeHighlight = {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly body: string;
};

type TechItem = {
  readonly name: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

function HomePage() {
  const data: HomePageData = Route.useLoaderData();
  const locale = getCurrentLocale();
  const posts = data.posts.map((post) => localizePost(post, locale));
  const featuredPosts = data.featuredPosts.map((post) => localizePost(post, locale));
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const tags = data.tags.map((tag) => localizeTag(tag, locale));
  const homeProps = { posts, featuredPosts, tags, locale };

  return (
    <SiteShell siteSettings={siteSettings}>
      <ShelfHome {...homeProps} />
    </SiteShell>
  );
}

function ShelfHome({ posts, featuredPosts, tags, locale }: HomeViewProps) {
  const copy = getHomeCopy(locale);
  const primaryPost = featuredPosts[0] ?? posts[0];
  const displayPosts = primaryPost
    ? [primaryPost, ...posts.filter((post) => post.id !== primaryPost.id)].slice(0, 5)
    : posts.slice(0, 5);
  const visibleTags = tags.slice(0, 16);

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20 xl:px-12">
          <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.98] font-semibold text-balance sm:text-6xl lg:text-7xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {copy.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link to="/blog" search={{ q: "", tag: "", page: 1 }} />}
              nativeButton={false}
              size="lg"
            >
              {copy.primaryCta}
              <ArrowRightIcon />
            </Button>
            <Button
              render={<Link to="/docs/$" params={{ _splat: "" }} />}
              variant="outline"
              nativeButton={false}
              size="lg"
            >
              <FileTextIcon />
              {copy.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Your Own Corner ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div className="grid gap-9 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.ownershipEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.ownershipTitle}
              </h2>
            </div>
            <p className="self-end text-sm leading-7 text-muted-foreground">{copy.ownershipBody}</p>
          </div>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {copy.ownershipPoints.map((point) => (
              <OwnershipRow key={point.title} point={point} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8 lg:py-16 xl:px-12">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-link uppercase">{copy.featuresEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.featuresTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.featuresBody}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {copy.features.map((feature) => (
              <FeatureRow key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Permanently Free ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p className="text-sm font-semibold text-link uppercase">{copy.freeEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance">
            {copy.freeTitle}
          </h2>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {copy.freeHighlights.map((h) => (
              <FreeHighlightCard key={h.label} item={h} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div className="grid gap-9 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.skillEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.skillTitle}
              </h2>
            </div>
            <p className="self-end text-sm leading-7 text-muted-foreground">{copy.skillBody}</p>
          </div>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {copy.skillSteps.map((step) => (
              <li key={step.number} className="grid gap-3 py-5 sm:grid-cols-[92px_minmax(0,1fr)]">
                <span className="text-sm font-semibold text-muted-foreground">{step.number}</span>
                <span>
                  <span className="block text-lg font-semibold">{step.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Cloudflare Free Quota ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div className="grid gap-9 lg:grid-cols-[0.44fr_0.56fr]">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.quotaEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.quotaTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{copy.quotaBody}</p>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {copy.quotaItems.map((item) => (
                <QuotaRow key={item.service} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p className="text-sm font-semibold text-link uppercase">{copy.techEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance">
            {copy.techTitle}
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {copy.techItems.map((item) => (
              <TechBadge key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Presets ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div className="grid gap-6 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.themeEyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
                {copy.themeTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{copy.themeBody}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {copy.themePreviews.map((preview) => (
              <ThemePreviewCard key={preview.themePreset} preview={preview} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Site Content ── */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <div className="border-t border-border pt-10">
            <p className="text-sm font-semibold text-link uppercase">{copy.contentEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.contentTitle}
            </h2>
          </div>

          {visibleTags.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <Link
                  key={tag.slug}
                  to="/tags/$slug"
                  params={{ slug: tag.slug }}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-semibold transition hover:bg-foreground hover:text-background"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          ) : null}

          {displayPosts.length ? (
            <div className="mt-10 divide-y divide-border border-y border-border">
              {displayPosts.map((post) => (
                <ArticleRow key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : null}

          <div className="mt-7">
            <Button
              render={<Link to="/blog" search={{ q: "", tag: "", page: 1 }} />}
              variant="outline"
              nativeButton={false}
            >
              {m.read_latest_posts()}
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FreeHighlightCard({ item }: { readonly item: FreeHighlight }) {
  const Icon = item.icon;
  return (
    <div className="bg-background px-6 py-7">
      <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <p className="mt-5 text-lg font-semibold">{item.label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
    </div>
  );
}

function OwnershipRow({
  point,
}: {
  readonly point: { title: string; description: string; icon: LucideIcon };
}) {
  const Icon = point.icon;
  return (
    <article className="grid gap-4 py-5 sm:grid-cols-[48px_minmax(0,1fr)]">
      <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-lg font-semibold">{point.title}</span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {point.description}
        </span>
      </span>
    </article>
  );
}

function FeatureRow({ feature }: { readonly feature: FeatureItem }) {
  const Icon = feature.icon;

  return (
    <article className="grid gap-4 py-5 sm:grid-cols-[48px_minmax(0,1fr)]">
      <span className="flex size-10 items-center justify-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-lg font-semibold">{feature.title}</span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {feature.description}
        </span>
      </span>
    </article>
  );
}

function QuotaRow({ item }: { readonly item: { service: string; quota: string; note: string } }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[160px_minmax(0,1fr)]">
      <span className="text-sm font-semibold">{item.service}</span>
      <span>
        <span className="block text-sm font-semibold text-link">{item.quota}</span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.note}</span>
      </span>
    </div>
  );
}

function TechBadge({ item }: { readonly item: TechItem }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background px-3 py-5 text-center">
      <Icon className="size-7 shrink-0" />
      <span className="text-xs leading-tight font-semibold">{item.name}</span>
      <span className="text-xs text-muted-foreground">{item.label}</span>
    </div>
  );
}

function ThemePreviewCard({ preview }: { readonly preview: ThemePreview }) {
  return (
    <article
      data-theme-preset={preview.themePreset}
      data-layout-preset="shelf"
      className="rounded-lg border border-border bg-background p-4 text-foreground"
    >
      <div className="flex items-center gap-2">
        <span className="size-4 rounded-full bg-primary" />
        <span className="size-4 rounded-full bg-muted" />
        <span className="size-4 rounded-full bg-accent" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{preview.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{preview.description}</p>
    </article>
  );
}

function ArticleRow({ post, locale }: { readonly post: Post; readonly locale: SupportedLocale }) {
  return (
    <article className="grid gap-4 py-7 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-start">
      <div className="min-w-0">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="group">
          <h3 className="text-2xl leading-tight font-semibold text-balance group-hover:text-link">
            {post.title}
          </h3>
        </Link>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <PostTags post={post} />
      </div>
      <time dateTime={post.publishedAt} className="text-sm text-muted-foreground sm:text-right">
        {formatDate(post.publishedAt, locale)}
      </time>
    </article>
  );
}

function PostTags({ post }: { readonly post: Post }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {post.tags.slice(0, 3).map((tag) => (
        <Link
          key={tag.slug}
          to="/tags/$slug"
          params={{ slug: tag.slug }}
          className="inline-flex items-center gap-1 rounded-sm bg-muted px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <HashIcon className="size-3" />
          {tag.name}
        </Link>
      ))}
    </div>
  );
}

// Cloudflare brand color
const CF_ORANGE = "#F6821F";

function getHomeCopy(locale: SupportedLocale) {
  const techItems: TechItem[] = [
    {
      name: "Cloudflare",
      label: locale === "zh" ? "运行 / 存储 / DB" : "Runtime · Storage · DB",
      icon: (props) => <SiCloudflare {...props} style={{ color: CF_ORANGE }} />,
    },
    {
      name: "TanStack Start",
      label: locale === "zh" ? "全栈框架" : "Full-stack framework",
      icon: (props) => <SiReact {...props} style={{ color: "#61DAFB" }} />,
    },
    {
      name: "TypeScript",
      label: locale === "zh" ? "类型安全" : "Type safety",
      icon: (props) => <SiTypescript {...props} style={{ color: "#3178C6" }} />,
    },
    {
      name: "Vite",
      label: locale === "zh" ? "构建工具" : "Build tool",
      icon: (props) => <SiVite {...props} style={{ color: "#646CFF" }} />,
    },
    {
      name: "Drizzle ORM",
      label: locale === "zh" ? "数据库 ORM" : "Database ORM",
      icon: (props) => <SiDrizzle {...props} style={{ color: "#C5F74F" }} />,
    },
    {
      name: "Better Auth",
      label: locale === "zh" ? "认证" : "Auth",
      icon: (props) => <ShieldIcon {...props} />,
    },
  ];

  if (locale === "zh") {
    return {
      eyebrow: "个人站点 · Cloudflare 托管 · 永久免费",
      heroTitle: "搭建你的永久精神家园",
      heroBody:
        "在算法和平台规则之外，属于你自己的地方。基于 Cloudflare 构建，长期免费，后台、评论、图床、RSS 开箱即用。只需一个 AI 编辑器 + 一个 Cloudflare 账号。",
      primaryCta: "查看示例内容",
      secondaryCta: "阅读使用文档",

      // ── Why Permanently Free ──
      freeEyebrow: "为什么是永久免费",
      freeTitle: "服务器级能力，永久免费。",
      freeHighlights: [
        {
          icon: ServerIcon,
          label: "无需购买服务器",
          body: "运行在 Cloudflare Workers，免费额度每天 10 万次请求，个人博客基本用不完。",
        },
        {
          icon: GlobeIcon,
          label: "永久域名",
          body: "默认提供 *.workers.dev 子域名，长期稳定。如需国内访问，自购域名绑定即可。",
        },
        {
          icon: ShieldCheckIcon,
          label: "大厂背书",
          body: "Cloudflare 成立超 15 年，服务全球数百万网站，不存在跑路风险。",
        },
      ] as (FreeHighlight & { icon: LucideIcon })[],

      // ── Your Own Corner ──
      ownershipEyebrow: "只属于你",
      ownershipTitle: "互联网上最后一片自留地。",
      ownershipBody:
        "在平台发内容，你是打工人——算法决定谁看到你，规则决定你能说什么。个人博客是你的地盘，你制定规则。",
      ownershipPoints: [
        {
          icon: LockKeyholeIcon,
          title: "不被算法驯化",
          description: "只写你想写的，不追热点，不讨好算法，不被平台牵着鼻子走。",
        },
        {
          icon: PencilIcon,
          title: "没有平台审查",
          description: "发链接、留联系方式、引用竞品——在自己的博客里，这些都没有限制。",
        },
        {
          icon: Share2Icon,
          title: "内容原点，多平台出口",
          description:
            "在博客写完，用 multipost 等工具分发到各平台，或让 AI 按平台风格改写后再发。",
        },
      ] as { title: string; description: string; icon: LucideIcon }[],

      // ── Core Features ──
      featuresEyebrow: "核心功能",
      featuresTitle: "完整动态 CMS，不是静态博客。",
      featuresBody:
        "真正的数据库、真正的后台，评论和媒体管理全部内置，运行在 Cloudflare 免费额度上。",
      features: [
        {
          title: "可视化写作后台",
          description: "Markdown 编辑器、标签、封面、定时发布，全在 /admin 搞定。",
          icon: BookOpenIcon,
        },
        {
          title: "图床（R2 存储）",
          description:
            "粘贴即上传，10 GB 免费，下载流量不计费。开通需绑定信用卡，免费额度内不扣款。",
          icon: CloudIcon,
        },
        {
          title: "评论系统",
          description: "自研评论，审核后公开，内置 Turnstile 防垃圾，不依赖第三方。",
          icon: MessageSquareTextIcon,
        },
        {
          title: "AI 自由改造",
          description: "开源模板，用 Cursor / Claude Code 随时改主题、加功能，代码完全属于你。",
          icon: SparklesIcon,
        },
        {
          title: "多平台分发",
          description: "配合 multipost 把文章同步到公众号、知乎、小红书，博客是原点，平台是出口。",
          icon: Share2Icon,
        },
        {
          title: "导出与迁移",
          description: "文章、图片、评论、设置全部可导出，随时带走，不被锁死。",
          icon: ArchiveIcon,
        },
      ],

      // ── AI Skill ──
      skillEyebrow: "AI 初始化 Skill",
      skillTitle: "跟 AI 聊几句，博客全自动部署上线。",
      skillBody: "配套了专为 AI 设计的 Skill。授权 Cloudflare 一次，之后全靠 AI 自动完成。",
      skillSteps: [
        {
          number: "01",
          title: "获取 Cloudflare 授权",
          description: "在 AI 编辑器里安装 Cloudflare 插件，或配置 API Token。只做一次。",
        },
        {
          number: "02",
          title: "告诉 AI 你的需求",
          description:
            "说「帮我用 blog-starter 部署一个博客，站点名叫 XXX」，AI 加载 Skill 自动执行。",
        },
        {
          number: "03",
          title: "AI 完成所有部署",
          description: "自动创建 D1、R2、Workers，执行迁移，写入配置，部署上线。",
        },
        {
          number: "04",
          title: "开始写作",
          description: "AI 给你站点地址，打开 /admin 设置账号，写第一篇文章。",
        },
      ],

      // ── Cloudflare Free Quota ──
      quotaEyebrow: "Cloudflare 免费额度",
      quotaTitle: "免费的边界在哪里？",
      quotaBody: "对绝大多数个人博客完全够用，流量真的很大时才需要付费计划。",
      quotaItems: [
        {
          service: "Workers",
          quota: "10 万次请求 / 天",
          note: "个人博客日常远低于此上限。",
        },
        {
          service: "D1 数据库",
          quota: "5 GB + 500 万次读 / 天",
          note: "文章、评论、设置，够运营数年。",
        },
        {
          service: "R2 图床",
          quota: "10 GB，下载免费",
          note: "需绑信用卡开通，额度内不扣款。",
        },
        {
          service: "KV 缓存",
          quota: "10 万次读 / 天，1 GB",
          note: "用于页面缓存加速。",
        },
      ],

      // ── Tech Stack ──
      techEyebrow: "技术栈",
      techTitle: "Cloudflare 原生 · 现代全栈 · AI 友好",
      techItems,

      // ── Theme ──
      themeEyebrow: "内置风格",
      themeTitle: "四套预设，随时用 AI 改造。",
      themeBody: "默认黑白极简。其余三套一键切换，或用 AI 工具改成任意风格。",
      themePreviews: [
        {
          themePreset: "maker",
          title: "黑白极简",
          description: "高对比、留白充足，适合技术文章和个人内容站。",
        },
        {
          themePreset: "apple",
          title: "苹果圆角",
          description: "蓝色主色、大圆角、柔和边框，适合产品文档。",
        },
        {
          themePreset: "claude",
          title: "暖调人文",
          description: "橙米色调、人文感柔软，适合长文随笔。",
        },
        {
          themePreset: "brutalist",
          title: "野兽派",
          description: "粗边框、高反差，适合有态度的个人站点。",
        },
      ],

      // ── Content ──
      contentEyebrow: "最新文章",
      contentTitle: "从这里开始阅读。",
      contentBody: "",
    };
  }

  // ── English ──
  return {
    eyebrow: "Personal site · Cloudflare-hosted · Free forever",
    heroTitle: "Build your permanent home on the internet",
    heroBody:
      "Outside the algorithm and the platform's rules, a place that's entirely yours. Built on Cloudflare, free long-term — writing dashboard, comments, image hosting, and RSS out of the box. All you need: an AI editor and a Cloudflare account.",
    primaryCta: "View sample content",
    secondaryCta: "Read the docs",

    // ── Why Permanently Free ──
    freeEyebrow: "Why permanently free",
    freeTitle: "Server-grade infrastructure. Permanent. Free.",
    freeHighlights: [
      {
        icon: ServerIcon,
        label: "No server required",
        body: "Runs on Cloudflare Workers — 100K free requests per day. A personal blog will never come close.",
      },
      {
        icon: GlobeIcon,
        label: "Permanent domain",
        body: "Free *.workers.dev subdomain included. Bring your own domain anytime for a custom URL.",
      },
      {
        icon: ShieldCheckIcon,
        label: "Backed by a major vendor",
        body: "Cloudflare has operated for 15+ years and serves millions of websites. Not a startup risk.",
      },
    ] as (FreeHighlight & { icon: LucideIcon })[],

    // ── Your Own Corner ──
    ownershipEyebrow: "Ownership",
    ownershipTitle: "The last unclaimed territory on the internet.",
    ownershipBody:
      "Publishing on TikTok or Medium means you're working for the platform — algorithms control your reach, rules control your voice. Your blog, your rules.",
    ownershipPoints: [
      {
        icon: LockKeyholeIcon,
        title: "Algorithm-free writing",
        description:
          "Write what you want, when you want. No feed performance anxiety, no trend-chasing.",
      },
      {
        icon: PencilIcon,
        title: "No platform censorship",
        description:
          "Link freely, share contact info, mention competitors — none of the usual platform restrictions.",
      },
      {
        icon: Share2Icon,
        title: "Blog as hub, platforms as outlets",
        description:
          "Write once on your blog, then use multipost or AI to syndicate to each platform in its own voice.",
      },
    ] as { title: string; description: string; icon: LucideIcon }[],

    // ── Core Features ──
    featuresEyebrow: "Core features",
    featuresTitle: "A full dynamic CMS, not just a static blog.",
    featuresBody:
      "Real database, real admin panel, built-in comments and media management — all on Cloudflare's free tier.",
    features: [
      {
        title: "Writing dashboard",
        description: "Markdown editor, tags, covers, scheduled publishing — all in /admin.",
        icon: BookOpenIcon,
      },
      {
        title: "Image hosting (R2)",
        description:
          "Paste to upload. 10 GB free, free egress. Credit card required to activate, but no charge within the free tier.",
        icon: CloudIcon,
      },
      {
        title: "Comments",
        description:
          "Self-hosted on D1. Moderation queue, Cloudflare Turnstile spam protection — no Disqus required.",
        icon: MessageSquareTextIcon,
      },
      {
        title: "AI-customizable",
        description:
          "Open-source template. Use Cursor, Claude Code, or any AI tool to restyle or extend it however you like.",
        icon: SparklesIcon,
      },
      {
        title: "Multi-platform distribution",
        description:
          "Use multipost to sync posts to other platforms. Your blog is the source; social channels are outlets.",
        icon: Share2Icon,
      },
      {
        title: "Export and migrate",
        description: "Posts, images, comments, and settings are all exportable. No lock-in.",
        icon: ArchiveIcon,
      },
    ],

    // ── AI Skill ──
    skillEyebrow: "AI Init Skill",
    skillTitle: "Chat with your AI editor. Blog goes live automatically.",
    skillBody:
      "Ships with a Skill for AI coding assistants. Authorize Cloudflare once, then let the AI handle everything.",
    skillSteps: [
      {
        number: "01",
        title: "Authorize Cloudflare",
        description:
          "Install the Cloudflare plugin in Cursor / Codex, or configure an API Token. One-time setup.",
      },
      {
        number: "02",
        title: "Tell the AI what you want",
        description:
          'Say: "Deploy a blog using blog-starter, site name is [Your Name]." The AI loads the Skill and starts.',
      },
      {
        number: "03",
        title: "AI deploys everything",
        description:
          "Creates D1, R2, Workers — runs migrations, writes config, deploys. Fully automatic.",
      },
      {
        number: "04",
        title: "Start writing",
        description:
          "AI gives you the live URL. Open /admin, create your account, publish your first post.",
      },
    ],

    // ── Cloudflare Free Quota ──
    quotaEyebrow: "Cloudflare free tier",
    quotaTitle: 'Where does "free" end?',
    quotaBody:
      "More than enough for virtually any personal blog. You'd only need a paid plan with seriously large traffic.",
    quotaItems: [
      {
        service: "Workers",
        quota: "100,000 requests / day",
        note: "Personal blogs typically use a tiny fraction of this.",
      },
      {
        service: "D1 database",
        quota: "5 GB + 5M reads / day",
        note: "Posts, comments, settings — enough for years.",
      },
      {
        service: "R2 image storage",
        quota: "10 GB, free egress",
        note: "Credit card to activate; no charge within 10 GB.",
      },
      {
        service: "KV cache",
        quota: "100K reads / day, 1 GB",
        note: "Page caching for faster load times.",
      },
    ],

    // ── Tech Stack ──
    techEyebrow: "Tech stack",
    techTitle: "Cloudflare-native · Modern full-stack · AI-friendly",
    techItems,

    // ── Theme ──
    themeEyebrow: "Built-in styles",
    themeTitle: "Four presets. Customize freely with AI.",
    themeBody:
      "Default is minimal monochrome. Switch presets in one line — or use your AI tool to build something entirely different.",
    themePreviews: [
      {
        themePreset: "maker",
        title: "Monochrome",
        description: "Pure black and white, sharp corners, maximum contrast for technical writing.",
      },
      {
        themePreset: "apple",
        title: "Apple Rounded",
        description: "Blue primary, larger radius, softer borders for calm product docs.",
      },
      {
        themePreset: "claude",
        title: "Warm Editorial",
        description: "Warm cream-orange, soft and humanistic, for essays and reflective posts.",
      },
      {
        themePreset: "brutalist",
        title: "Brutalist",
        description: "Thick borders, high contrast, bold accent for expressive personal sites.",
      },
    ],

    // ── Content ──
    contentEyebrow: "Blog",
    contentTitle: "Latest posts.",
    contentBody: "",
  };
}
