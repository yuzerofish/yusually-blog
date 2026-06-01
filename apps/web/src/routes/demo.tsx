import { localizeSiteSettings } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  FileTextIcon,
  MessageSquareIcon,
  RssIcon,
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
            locale === "zh" ? "博客 Demo | 01MVP Blog Starter" : "Blog Demo | 01MVP Blog Starter",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "查看用 01MVP Blog Starter 创建出来的个人博客首页样例。"
              : "See a sample personal blog homepage built with 01MVP Blog Starter.",
        },
      ],
    };
  },
  component: DemoBlogPage,
});

type DemoPost = {
  readonly title: string;
  readonly excerpt: string;
  readonly date: string;
  readonly tag: string;
  readonly image: string;
  readonly readingTime: string;
};

type DemoSignal = {
  readonly label: string;
  readonly value: string;
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
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.68fr)] lg:px-8 lg:py-16">
            <div className="flex min-h-[34rem] flex-col justify-between">
              <div>
                <p className="text-sm font-semibold tracking-wide text-link uppercase">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[0.96] font-semibold text-balance sm:text-6xl lg:text-7xl">
                  {copy.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {copy.description}
                </p>
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

            <article className="overflow-hidden border border-border bg-background">
              <img
                src={copy.featured.image}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <SparklesIcon className="size-3.5 text-link" />
                  {copy.featured.tag}
                  <span>·</span>
                  {copy.featured.readingTime}
                </div>
                <h2 className="mt-4 text-3xl leading-tight font-semibold text-balance">
                  {copy.featured.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDaysIcon className="size-4" />
                  {copy.featured.date}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="demo-latest" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-link uppercase">{copy.latestEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-balance">{copy.latestTitle}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground lg:justify-self-end">
                {copy.latestDescription}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {copy.posts.map((post) => (
                <DemoPostCard key={post.title} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.42fr)] lg:px-8 lg:py-16">
            <div className="border-y border-border">
              {copy.workflow.map((item, index) => (
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
                <p className="text-sm font-semibold text-link uppercase">{copy.sidebarEyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-balance">{copy.sidebarTitle}</h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy.sidebarBody}</p>
              </div>
              <div className="mt-8 grid gap-3">
                <a
                  href="/rss.xml"
                  className="inline-flex min-h-11 items-center gap-2 border border-border px-3 text-sm font-semibold transition hover:border-foreground"
                >
                  <RssIcon className="size-4" />
                  {copy.rssAction}
                </a>
                <a
                  href="#demo-latest"
                  className="inline-flex min-h-11 items-center gap-2 border border-border px-3 text-sm font-semibold transition hover:border-foreground"
                >
                  <MessageSquareIcon className="size-4" />
                  {copy.commentsAction}
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-sm font-semibold text-link uppercase">{copy.ctaEyebrow}</p>
              <h2 className="mt-2 text-3xl font-semibold text-balance">{copy.ctaTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                render={<a href={docsHref} aria-label={copy.docsAction} />}
                nativeButton={false}
              >
                <FileTextIcon />
                {copy.docsAction}
              </Button>
              <Button
                render={<a href="/blog" aria-label={copy.articlesAction} />}
                variant="outline"
                nativeButton={false}
              >
                {copy.articlesAction}
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}

function DemoPostCard({ post }: { readonly post: DemoPost }) {
  return (
    <article className="overflow-hidden border border-border bg-background">
      <img src={post.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span>{post.tag}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-xl leading-tight font-semibold text-balance">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-xs font-medium text-muted-foreground">{post.date}</p>
      </div>
    </article>
  );
}

function getDemoCopy(locale: ReturnType<typeof getCurrentLocale>) {
  const images = {
    desk: "/demo/desk.jpg",
    notes: "/demo/notes.jpg",
    garden: "/demo/garden.jpg",
    library: "/demo/library.jpg",
  };

  if (locale === "zh") {
    return {
      eyebrow: "博客模板成品样例",
      title: "一个用这个模板搭出来的个人博客首页",
      description:
        "这里模拟一个真实作者的公开站点：第一屏给出作者气质和精选文章，后面承接最新文章、订阅、评论与长期栏目。",
      signals: [
        { label: "文章", value: "128" },
        { label: "专栏", value: "6" },
        { label: "评论", value: "2.4k" },
      ] satisfies DemoSignal[],
      featured: {
        date: "2026 年 5 月 28 日",
        excerpt: "为什么个人站点应该先服务于长期表达，再考虑分发、订阅和自动化。",
        image: images.desk,
        readingTime: "6 分钟",
        tag: "精选",
        title: "我如何把写作系统搬到自己的 Cloudflare 站点",
      } satisfies DemoPost,
      latestEyebrow: "最新文章",
      latestTitle: "像博客，而不是产品目录",
      latestDescription:
        "Demo 首页会优先突出作者、内容和阅读节奏；后台能力留在文章背后，不抢读者注意力。",
      posts: [
        {
          date: "2026 年 5 月 24 日",
          excerpt: "把项目日志、产品复盘和个人笔记放在同一个站点里，如何避免越写越乱。",
          image: images.notes,
          readingTime: "4 分钟",
          tag: "工作流",
          title: "个人知识库和公开博客之间的边界",
        },
        {
          date: "2026 年 5 月 20 日",
          excerpt: "用标签和专栏组织长期内容，让后来的人能从任意入口进入同一条脉络。",
          image: images.garden,
          readingTime: "5 分钟",
          tag: "内容系统",
          title: "专栏承载持续推进的问题",
        },
        {
          date: "2026 年 5 月 16 日",
          excerpt: "AI 可以协助整理、改写、发布，但最终呈现出来的仍然应该是人的判断。",
          image: images.library,
          readingTime: "7 分钟",
          tag: "AI 写作",
          title: "让 AI 参与发布流程，但不替你决定表达",
        },
      ] satisfies DemoPost[],
      workflow: [
        {
          title: "先把作者放在前面",
          description: "读者进入博客时先理解这个人是谁、长期写什么，而不是先看到工具清单。",
        },
        {
          title: "文章承接长期栏目",
          description: "精选、标签、专栏和搜索共同组成阅读路径，适合长期积累。",
        },
        {
          title: "后台能力保持克制",
          description: "评论、RSS、图床、导入导出和 AI 发布能力都存在，但不打断公开阅读体验。",
        },
      ],
      sidebarEyebrow: "读者入口",
      sidebarTitle: "订阅、评论和持续更新都已经接好",
      sidebarBody:
        "真实站点可以打开 RSS、评论审核、邮件订阅和文章导出。这个页面只展示读者能看到的那一面。",
      rssAction: "查看 RSS 入口",
      commentsAction: "查看文章列表",
      ctaEyebrow: "开始搭建",
      ctaTitle: "官网讲能力，Demo 展示成品。",
      docsAction: "阅读部署文档",
      articlesAction: "查看官网文章",
    };
  }

  return {
    eyebrow: "Blog template demo",
    title: "A personal blog homepage built with this template",
    description:
      "This demo shows the reader-facing result: a clear author signal, featured writing, recent notes, subscriptions, comments, and long-running series.",
    signals: [
      { label: "Posts", value: "128" },
      { label: "Series", value: "6" },
      { label: "Comments", value: "2.4k" },
    ] satisfies DemoSignal[],
    featured: {
      date: "May 28, 2026",
      excerpt:
        "Why a personal site should serve durable expression first, then distribution, subscriptions, and automation.",
      image: images.desk,
      readingTime: "6 min",
      tag: "Featured",
      title: "How I moved my writing system onto a Cloudflare site",
    } satisfies DemoPost,
    latestEyebrow: "Latest writing",
    latestTitle: "A blog, not a product catalog",
    latestDescription:
      "The demo prioritizes author, content, and reading rhythm. The admin and automation stack stays behind the reading surface.",
    posts: [
      {
        date: "May 24, 2026",
        excerpt:
          "How to keep project logs, product retrospectives, and personal notes in one site without losing the thread.",
        image: images.notes,
        readingTime: "4 min",
        tag: "Workflow",
        title: "The boundary between a public blog and a private knowledge base",
      },
      {
        date: "May 20, 2026",
        excerpt:
          "Tags, series, and search make long-running writing discoverable from more than one entry point.",
        image: images.garden,
        readingTime: "5 min",
        tag: "Content system",
        title: "A series is not a category. It is a question that keeps moving",
      },
      {
        date: "May 16, 2026",
        excerpt:
          "AI can help organize, rewrite, and publish, but the visible site still needs a human editorial point of view.",
        image: images.library,
        readingTime: "7 min",
        tag: "AI writing",
        title: "Let AI join the publishing flow without taking over the voice",
      },
    ] satisfies DemoPost[],
    workflow: [
      {
        title: "Lead with the author",
        description:
          "A reader should understand who is writing and what they keep returning to before they see tooling details.",
      },
      {
        title: "Make posts part of longer arcs",
        description:
          "Featured posts, tags, series, and search work together as paths through an accumulating archive.",
      },
      {
        title: "Keep the admin stack quiet",
        description:
          "Comments, RSS, media storage, import/export, and AI publishing are present without interrupting the reading experience.",
      },
    ],
    sidebarEyebrow: "Reader surface",
    sidebarTitle: "Subscriptions, comments, and updates are already wired",
    sidebarBody:
      "A real site can enable RSS, moderated comments, email subscriptions, and portable exports. This page only shows what readers see.",
    rssAction: "Open the RSS entry",
    commentsAction: "Browse the article list",
    ctaEyebrow: "Start building",
    ctaTitle: "The homepage explains the stack. The demo shows the result.",
    docsAction: "Read deployment docs",
    articlesAction: "Read site articles",
  };
}
