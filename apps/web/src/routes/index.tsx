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
  readonly role: string;
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

      {/* ── Why Permanently Free ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p className="text-sm font-semibold text-link uppercase">{copy.freeEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance">
            {copy.freeTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{copy.freeBody}</p>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {copy.freeHighlights.map((h) => (
              <FreeHighlightCard key={h.label} item={h} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Your Own Corner of the Internet ── */}
      <section className="border-b border-border bg-background">
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
      <section className="border-b border-border bg-muted/35">
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

      {/* ── AI Skill: One Command to Deploy ── */}
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

      {/* ── Publishing Workflow ── */}
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[0.36fr_0.64fr] lg:px-8 lg:py-16 xl:px-12">
          <div>
            <p className="text-sm font-semibold text-link uppercase">{copy.workflowEyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance">
              {copy.workflowTitle}
            </h2>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {copy.workflow.map((step) => (
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
      <section className="border-b border-border bg-background">
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
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-12">
          <p className="text-sm font-semibold text-link uppercase">{copy.techEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold text-balance">
            {copy.techTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{copy.techBody}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {copy.techItems.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Presets ── */}
      <section className="border-b border-border bg-background">
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

function TechCard({ item }: { readonly item: TechItem }) {
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <p className="text-base font-semibold">{item.name}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.role}</p>
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

function getHomeCopy(locale: SupportedLocale) {
  if (locale === "zh") {
    return {
      eyebrow: "个人站点 · Cloudflare 托管 · 永久免费",
      heroTitle: "搭建你的永久精神家园",
      heroBody:
        "在算法推荐和平台规则之外，有一个只属于你的地方。基于 Cloudflare 构建，长期免费，写作后台、评论、图床、RSS 开箱即用——你只需要一个 AI 编辑器和一个 Cloudflare 账号。",
      primaryCta: "查看示例内容",
      secondaryCta: "阅读使用文档",

      // ── Why Permanently Free ──
      freeEyebrow: "为什么是永久免费",
      freeTitle: "不需要自己买服务器，也不用担心跑路。",
      freeBody:
        "传统个人博客最大的门槛是「服务器」。你要租服务器、管域名、维护运维，每年还要续费。这套模板把一切运行在 Cloudflare 上——全球最大的 CDN 和边缘计算平台之一，慷慨的免费额度对绝大多数个人博客来说已经足够。Cloudflare 成立于 2009 年，是有公信力的国际知名厂商，基本不存在跑路风险。",
      freeHighlights: [
        {
          icon: ServerIcon,
          label: "无需购买服务器",
          body: "代码运行在 Cloudflare Workers 上，免费额度每天 10 万次请求。个人博客几乎永远用不完。",
        },
        {
          icon: GlobeIcon,
          label: "永久域名保障",
          body: "Cloudflare 默认提供 *.workers.dev 子域名，稳定长期存在。如需国内稳定访问，自购域名绑定即可。",
        },
        {
          icon: ShieldCheckIcon,
          label: "大厂背书，不会跑路",
          body: "Cloudflare 是全球知名基础设施厂商，每年服务数百万网站。成立超 15 年，大规模跑路概率极低。",
        },
      ] as (FreeHighlight & { icon: LucideIcon })[],

      // ── Your Own Corner ──
      ownershipEyebrow: "只属于你",
      ownershipTitle: "互联网上最后一片自留地。",
      ownershipBody:
        "在抖音、小红书、公众号发内容，你本质上是平台的打工人——算法决定谁看到你，平台规则决定你能说什么。个人博客是另一种选择：你的地盘，你制定规则。",
      ownershipPoints: [
        {
          icon: LockKeyholeIcon,
          title: "不被算法驯化",
          description:
            "平台推荐算法会引导你写「更容易爆」的内容，慢慢改变你的写作方向。在自己的站点上，你只写你想写的，不追热点，不讨好算法。",
        },
        {
          icon: PencilIcon,
          title: "没有平台审查",
          description:
            "不能发链接、不能引流、不能提竞品——这些在平台上都是限制。在你的博客里，你可以自由发布任何合法内容：分享链接、放联系方式、嵌入视频，一切你说了算。",
        },
        {
          icon: Share2Icon,
          title: "内容原点，多平台出口",
          description:
            "在博客写完内容，用 multipost 等工具同步分发到公众号、知乎、小红书，甚至让 AI 帮你改写成符合各平台风格的版本。博客是你的内容原点，平台只是出口。",
        },
      ] as { title: string; description: string; icon: LucideIcon }[],

      // ── Core Features ──
      featuresEyebrow: "核心功能",
      featuresTitle: "不只是静态博客——这是一个完整的动态 CMS。",
      featuresBody:
        "以前的个人博客本质是静态网站，没有后台，没有评论，图床靠第三方插件。基于 Cloudflare 的这套模板打破了这个限制：你有真正的数据库、真正的后台，以及完整的评论和媒体管理。",
      features: [
        {
          title: "可视化写作后台",
          description:
            "Markdown 编辑器、文章管理、标签、封面、定时发布，所见即所得，全在 /admin 一站搞定。不喜欢界面？直接编辑 Markdown 文件，让 AI 帮你一键发布。",
          icon: BookOpenIcon,
        },
        {
          title: "图床与媒体管理",
          description:
            "图片存储在 Cloudflare R2，免费额度 10 GB，下载流量免费。粘贴即上传，不需要折腾第三方图床。开通 R2 需绑定信用卡，但在免费额度内不会扣款。",
          icon: CloudIcon,
        },
        {
          title: "评论与互动",
          description:
            "自研评论系统基于 D1，读者留言先进审核队列，站长审核后公开展示。内置 Turnstile 防垃圾，不依赖 Disqus 等第三方服务。",
          icon: MessageSquareTextIcon,
        },
        {
          title: "AI 自由改造",
          description:
            "这是一套开源代码模板，默认黑白极简风格。你可以随时用 Cursor、Claude Code 等 AI 工具把它改造成任何你想要的样子——换主题、加功能、改布局，没有任何限制。",
          icon: SparklesIcon,
        },
        {
          title: "多平台分发",
          description:
            "配合 multipost 等工具，一篇文章同步到公众号、知乎、小红书，博客是原点，平台是出口。",
          icon: Share2Icon,
        },
        {
          title: "导出与迁移",
          description:
            "文章、图片、评论、设置全部可导出，Markdown 格式，随时能带走，不被任何平台锁死。",
          icon: ArchiveIcon,
        },
      ],

      // ── AI Skill ──
      skillEyebrow: "AI 初始化 Skill",
      skillTitle: "跟 AI 聊几句，博客全自动部署上线。",
      skillBody:
        "这套模板配套了一个专门给 AI 使用的 Skill。你只需要给 AI 编辑器安装好 Cloudflare 权限，然后告诉 AI「帮我用 blog-starter 创建一个博客」，剩下的——创建数据库、配置存储、部署 Workers、绑定域名——AI 全部自动搞定。",
      skillSteps: [
        {
          number: "01",
          title: "获取 Cloudflare 授权",
          description:
            "用 Cursor / Codex 等 AI 编辑器，安装 Cloudflare 插件或配置 API Token。只需操作一次，后续全部自动化。",
        },
        {
          number: "02",
          title: "告诉 AI 你的需求",
          description:
            "在 AI 编辑器里说「帮我用 blog-starter 部署一个博客，站点名叫 XXX」。AI 会加载 Skill 并开始自动执行。",
        },
        {
          number: "03",
          title: "AI 自动完成所有部署",
          description:
            "AI 自动创建 D1 数据库、R2 存储桶、Workers 实例，执行数据库迁移，写入默认配置，部署上线。",
        },
        {
          number: "04",
          title: "验证并开始写作",
          description:
            "部署完成后 AI 会给你站点地址。打开 /admin 设置管理员账号，然后开始写你的第一篇文章。",
        },
      ],

      // ── Publishing Workflow ──
      workflowEyebrow: "发布流程",
      workflowTitle: "两种发布方式，随你选。",
      workflow: [
        {
          number: "方式一",
          title: "后台可视化编辑",
          description:
            "打开 /admin，在 Markdown 编辑器里写文章，设置标签、封面、发布时间，点击发布。适合日常随手写作。",
        },
        {
          number: "方式二",
          title: "直接编辑 Markdown 文件",
          description:
            "在代码仓库里编辑 .md 文件，改完之后告诉 AI「帮我把这篇文章发布到博客」，AI 自动调用 API 发布。适合技术用户或批量导入。",
        },
        {
          number: "方式三",
          title: "多平台同步分发",
          description:
            "发布后，用 multipost 等工具把文章同步到公众号、知乎、小红书。也可以让 AI 帮你按平台口味改写后再发。",
        },
        {
          number: "方式四",
          title: "评论审核与互动",
          description:
            "读者评论先进审核队列，你在后台审核通过后公开展示，全程掌控，垃圾评论自动过滤。",
        },
      ],

      // ── Cloudflare Free Quota ──
      quotaEyebrow: "Cloudflare 免费额度",
      quotaTitle: "免费的边界在哪里？",
      quotaBody:
        "「永久免费」基于 Cloudflare 的免费额度。下面是核心服务的免费上限——对绝大多数个人博客来说完全够用。流量真的很大时才需要考虑开通付费计划。",
      quotaItems: [
        {
          service: "Workers（运行时）",
          quota: "每天 10 万次请求",
          note: "个人博客日常访问量远低于此，完全不用担心。",
        },
        {
          service: "D1（数据库）",
          quota: "5 GB 存储 + 每天 500 万次读取",
          note: "文章、评论、设置全部存在 D1，足够运营数年。",
        },
        {
          service: "R2（图床存储）",
          quota: "10 GB 存储，下载流量免费",
          note: "需绑定信用卡开通，但在 10 GB 内不会扣款。适合存图片和附件。",
        },
        {
          service: "KV（缓存）",
          quota: "10 万次读取 / 天，1 GB 存储",
          note: "用于页面缓存，加速博客加载速度。",
        },
      ],

      // ── Tech Stack ──
      techEyebrow: "技术栈",
      techTitle: "为什么选这套技术栈？",
      techBody:
        "选型原则：Cloudflare 原生、现代全栈、AI 友好、长期可维护。每一层都有充分的理由，也都可以用 AI 工具自由改造。",
      techItems: [
        {
          name: "TanStack Start",
          role: "全栈框架。Server Functions + React 19 + Vite，类型安全，AI 工具生成代码质量高。",
        },
        {
          name: "Cloudflare Workers",
          role: "运行时。边缘计算，全球低延迟，免费额度充足，无需管理服务器。",
        },
        {
          name: "Cloudflare D1",
          role: "数据库。SQLite on Cloudflare，免费，支持 Drizzle ORM，迁移方便。",
        },
        {
          name: "Cloudflare R2",
          role: "对象存储。存图片和附件，10 GB 免费，下载流量不计费，比 AWS S3 便宜得多。",
        },
        {
          name: "Drizzle ORM",
          role: "类型安全的 SQL ORM，支持 D1，Schema 即文档，AI 生成 SQL 准确率高。",
        },
        {
          name: "Better Auth",
          role: "认证框架。支持邮箱密码登录，Session 管理，可扩展 2FA、OAuth 等。",
        },
      ] as TechItem[],

      // ── Theme ──
      themeEyebrow: "内置风格",
      themeTitle: "四套预设覆盖不同写作气质。",
      themeBody:
        "默认黑白极简，适合技术写作和个人内容站。其他三套预设一键切换。嫌预设不够？用你的 AI 工具随意改造，代码完全开放。",
      themePreviews: [
        {
          themePreset: "maker",
          title: "黑白极简",
          description: "黑白、高对比、留白充足，适合个人内容站和技术文章。",
        },
        {
          themePreset: "apple",
          title: "苹果圆角",
          description: "蓝色主色、大圆角、柔和边框，适合产品说明和文档。",
        },
        {
          themePreset: "claude",
          title: "暖调人文",
          description: "温暖橙米色调，人文感柔软，适合长文、随笔和创意内容。",
        },
        {
          themePreset: "brutalist",
          title: "野兽派",
          description: "粗边框、高反差和亮色强调，适合更有态度的个人站点。",
        },
      ],

      // ── Content ──
      contentEyebrow: "站内内容",
      contentTitle: "看看用这套模板能写出什么。",
      contentBody: "",
    };
  }

  // ── English ──
  return {
    eyebrow: "Personal site · Cloudflare-hosted · Free forever",
    heroTitle: "Build your permanent home on the internet",
    heroBody:
      "Outside the algorithm and the platform's rules, a place that's entirely yours. Built on Cloudflare, free to run long-term — writing dashboard, comments, media storage, and RSS out of the box. All you need is an AI editor and a Cloudflare account.",
    primaryCta: "View sample content",
    secondaryCta: "Read the docs",

    // ── Why Permanently Free ──
    freeEyebrow: "Why permanently free",
    freeTitle: "No server to buy. No vendor to worry about disappearing.",
    freeBody:
      "The biggest barrier to a personal blog has always been infrastructure — renting a server, managing a domain, paying renewal fees every year. This template runs entirely on Cloudflare, one of the world's largest CDN and edge computing platforms. Its free tier is more than enough for almost any personal blog. Cloudflare has been around since 2009 and powers millions of websites — it's not going anywhere.",
    freeHighlights: [
      {
        icon: ServerIcon,
        label: "No server required",
        body: "Your site runs on Cloudflare Workers. The free tier includes 100,000 requests per day — a personal blog will almost never come close to that.",
      },
      {
        icon: GlobeIcon,
        label: "Permanent domain included",
        body: "Cloudflare provides a free *.workers.dev subdomain that stays active as long as your account exists. Bring your own domain anytime for a custom URL.",
      },
      {
        icon: ShieldCheckIcon,
        label: "Backed by a major vendor",
        body: "Cloudflare is a publicly listed company serving millions of websites globally. It's been operating for 15+ years. Your blog isn't going to disappear because a startup ran out of money.",
      },
    ] as (FreeHighlight & { icon: LucideIcon })[],

    // ── Your Own Corner ──
    ownershipEyebrow: "Ownership",
    ownershipTitle: "The last unclaimed territory on the internet.",
    ownershipBody:
      "When you publish on TikTok, YouTube, or Medium, you're working for the platform. Algorithms decide who sees you. Platform rules decide what you can say. A personal blog is a different model: your domain, your rules.",
    ownershipPoints: [
      {
        icon: LockKeyholeIcon,
        title: "Algorithm-free writing",
        description:
          "Social platforms gradually condition you to write content that performs well in their feed — chasing trends, optimizing for engagement. On your own site, you write what you want, when you want, with no performance pressure.",
      },
      {
        icon: PencilIcon,
        title: "No platform censorship",
        description:
          "Can't link out, can't mention competitors, can't put your email in the post — these are real restrictions on most platforms. On your blog, you can share links freely, publish contact info, embed anything, and say things platforms wouldn't allow.",
      },
      {
        icon: Share2Icon,
        title: "Your content hub, platforms as outlets",
        description:
          "Write once on your blog, then use tools like multipost to syndicate to other platforms. Let AI rewrite each version to match the platform's tone and rules. Your blog is the source of truth; everything else is distribution.",
      },
    ] as { title: string; description: string; icon: LucideIcon }[],

    // ── Core Features ──
    featuresEyebrow: "Core features",
    featuresTitle: "Not just a static blog — a full dynamic CMS.",
    featuresBody:
      "Old-school personal blogs were static sites: no admin panel, no comments, images hosted on third-party services. This template breaks that constraint. You get a real database, a real admin panel, and built-in comment and media management — all on Cloudflare's free tier.",
    features: [
      {
        title: "Visual writing dashboard",
        description:
          "Markdown editor, post management, tags, covers, scheduled publishing — all in /admin. Prefer files? Edit .md directly and ask your AI to publish it via the API.",
        icon: BookOpenIcon,
      },
      {
        title: "Media storage (image hosting)",
        description:
          "Images are stored in Cloudflare R2 — 10 GB free, with free egress bandwidth. Paste to upload, no third-party image host needed. R2 requires a credit card to activate, but you won't be charged within the free tier.",
        icon: CloudIcon,
      },
      {
        title: "Comments and engagement",
        description:
          "Self-hosted comment system built on D1. Reader comments go into a moderation queue; you approve before they appear publicly. Cloudflare Turnstile handles spam — no Disqus required.",
        icon: MessageSquareTextIcon,
      },
      {
        title: "AI-customizable",
        description:
          "This is an open-source code template. The default style is minimal monochrome. Use Cursor, Claude Code, or any AI coding tool to reshape it however you like — themes, layouts, new features. No restrictions.",
        icon: SparklesIcon,
      },
      {
        title: "Multi-platform distribution",
        description:
          "Use multipost and similar tools to sync posts to other platforms. Your blog is the source; social channels are the outlets.",
        icon: Share2Icon,
      },
      {
        title: "Export and migrate",
        description:
          "Posts, images, comments, and settings are all exportable in Markdown format. Leave any time — no lock-in.",
        icon: ArchiveIcon,
      },
    ],

    // ── AI Skill ──
    skillEyebrow: "AI Init Skill",
    skillTitle: "Chat with your AI editor. Blog goes live automatically.",
    skillBody:
      'This template ships with a Skill designed for AI coding assistants. Grant your AI editor Cloudflare permission once, then tell it: "Set up a blog for me using blog-starter." The AI handles everything — database creation, storage setup, Workers deployment, domain binding — without you touching a terminal.',
    skillSteps: [
      {
        number: "01",
        title: "Authorize Cloudflare",
        description:
          "Install the Cloudflare plugin in Cursor / Codex, or configure an API Token in Claude Code. One-time setup — everything after this is automatic.",
      },
      {
        number: "02",
        title: "Tell the AI what you want",
        description:
          'Say: "Deploy a blog using blog-starter, site name is [Your Name]." The AI loads the Skill and starts executing.',
      },
      {
        number: "03",
        title: "AI deploys everything",
        description:
          "The AI creates a D1 database, R2 bucket, and Workers instance, runs migrations, writes default config, and deploys — all automatically.",
      },
      {
        number: "04",
        title: "Verify and start writing",
        description:
          "The AI gives you the live URL. Open /admin, create your admin account, and publish your first post.",
      },
    ],

    // ── Publishing Workflow ──
    workflowEyebrow: "Publishing flow",
    workflowTitle: "Two ways to publish. Pick whichever fits.",
    workflow: [
      {
        number: "Option A",
        title: "Visual admin dashboard",
        description:
          "Open /admin, write in the Markdown editor, set tags, cover, and publish date, then click publish. Best for everyday writing.",
      },
      {
        number: "Option B",
        title: "Edit Markdown files directly",
        description:
          "Edit .md files in your code repo, then ask your AI to publish the post via the API. Best for technical users or bulk imports.",
      },
      {
        number: "Option C",
        title: "Syndicate to other platforms",
        description:
          "After publishing, use multipost or let AI rewrite the post for each platform's tone and distribute automatically.",
      },
      {
        number: "Option D",
        title: "Moderate comments",
        description:
          "New comments go into a queue. You approve in /admin before they appear publicly. Spam is filtered automatically.",
      },
    ],

    // ── Cloudflare Free Quota ──
    quotaEyebrow: "Cloudflare free tier",
    quotaTitle: 'Where does "free" end?',
    quotaBody:
      "\"Free forever\" is backed by Cloudflare's free tier. Here's what's included — more than enough for virtually any personal blog. You'd only need a paid plan if your site gets seriously large traffic.",
    quotaItems: [
      {
        service: "Workers (runtime)",
        quota: "100,000 requests / day",
        note: "A personal blog generates a tiny fraction of this. You will almost certainly never hit the limit.",
      },
      {
        service: "D1 (database)",
        quota: "5 GB storage + 5M reads / day",
        note: "Posts, comments, and settings live here. Enough for years of active writing.",
      },
      {
        service: "R2 (image storage)",
        quota: "10 GB storage, free egress",
        note: "Requires a credit card to activate, but no charge within 10 GB. Stores images and file attachments.",
      },
      {
        service: "KV (cache)",
        quota: "100K reads / day, 1 GB storage",
        note: "Used for page caching to speed up blog load times.",
      },
    ],

    // ── Tech Stack ──
    techEyebrow: "Tech stack",
    techTitle: "Why this stack?",
    techBody:
      "The guiding principles: Cloudflare-native, modern full-stack, AI-friendly, and maintainable for the long term. Every layer has a clear rationale — and every layer is yours to customize with AI tools.",
    techItems: [
      {
        name: "TanStack Start",
        role: "Full-stack framework. Server Functions + React 19 + Vite. Type-safe end-to-end, great AI code generation quality.",
      },
      {
        name: "Cloudflare Workers",
        role: "Runtime. Edge computing, global low latency, generous free tier, zero server management.",
      },
      {
        name: "Cloudflare D1",
        role: "Database. SQLite on Cloudflare. Free, Drizzle ORM support, easy migrations.",
      },
      {
        name: "Cloudflare R2",
        role: "Object storage. 10 GB free, free egress bandwidth. Much cheaper than AWS S3 at scale.",
      },
      {
        name: "Drizzle ORM",
        role: "Type-safe SQL ORM with D1 support. Schema-as-documentation. AI generates accurate queries.",
      },
      {
        name: "Better Auth",
        role: "Auth framework. Email + password login, session management, extensible to OAuth and 2FA.",
      },
    ] as TechItem[],

    // ── Theme ──
    themeEyebrow: "Built-in styles",
    themeTitle: "Four presets cover different writing moods.",
    themeBody:
      "Default is minimal monochrome — sharp, high-contrast, focused. Switch presets in one line, or use your AI tool to build something entirely different. The code is yours.",
    themePreviews: [
      {
        themePreset: "maker",
        title: "Monochrome",
        description: "Pure black and white, sharp corners, maximum contrast for technical writing.",
      },
      {
        themePreset: "apple",
        title: "Apple Rounded",
        description: "Blue primary color, larger radius, and softer borders for calm product docs.",
      },
      {
        themePreset: "claude",
        title: "Warm Editorial",
        description:
          "Warm cream-orange background, soft and humanistic, for essays and reflective posts.",
      },
      {
        themePreset: "brutalist",
        title: "Brutalist",
        description:
          "Thick borders, high contrast, and a bold accent for expressive personal sites.",
      },
    ],

    // ── Content ──
    contentEyebrow: "Site content",
    contentTitle: "See what this template looks like in practice.",
    contentBody: "",
  };
}
