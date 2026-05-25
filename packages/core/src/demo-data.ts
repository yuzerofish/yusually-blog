import type { Asset, Comment, DashboardMetric, Post, Project, SiteSettings, Tag } from "./types";

export const siteSettings: SiteSettings = {
  name: "Cloud Blog CMS",
  description:
    "A Cloudflare-native personal blog CMS for visual writing, Markdown publishing, and AI automation.",
  url: "https://cms.01mvp.com",
  authorName: "01MVP",
  authorBio:
    "Builder notes, product essays, and durable personal knowledge on an edge-native publishing stack.",
  avatarUrl: "/og-default.svg",
  defaultOgImage: "/og-default.svg",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/01mvp/blog-starter" },
    { label: "RSS", href: "/rss.xml" },
  ],
  navigation: [
    { label: "Blog", href: "/blog" },
    { label: "Tags", href: "/tags" },
    { label: "Archive", href: "/archive" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],
  rssEnabled: true,
  commentsEnabled: true,
  indexingEnabled: true,
  themePreset: "claude",
  locales: ["en", "zh"],
  primaryLanguage: "en",
  i18n: {
    description: {
      zh: "面向个人创作者的 Cloudflare 原生博客 CMS，支持可视化写作、Markdown 发布和 AI 自动化。",
    },
    authorBio: {
      zh: "基于边缘原生发布栈记录构建笔记、产品文章和长期可沉淀的个人知识。",
    },
  },
};

export const tags: Tag[] = [
  {
    id: "tag-cloudflare",
    name: "Cloudflare",
    slug: "cloudflare",
    description: "Workers, D1, R2, Turnstile, and edge deployment notes.",
    i18n: {
      name: { zh: "Cloudflare" },
      description: { zh: "Workers、D1、R2、Turnstile 和边缘部署笔记。" },
    },
  },
  {
    id: "tag-cms",
    name: "CMS",
    slug: "cms",
    description: "Content workflows for writing, publishing, importing, and exporting.",
    i18n: {
      name: { zh: "内容管理" },
      description: { zh: "覆盖写作、发布、导入和导出的内容工作流。" },
    },
  },
  {
    id: "tag-ai",
    name: "AI Automation",
    slug: "ai-automation",
    description: "Agent-friendly APIs, CLI flows, and repeatable site initialization.",
    i18n: {
      name: { zh: "AI 自动化" },
      description: { zh: "面向 Agent 的 API、CLI 流程和可重复的网站初始化。" },
    },
  },
  {
    id: "tag-markdown",
    name: "Markdown",
    slug: "markdown",
    description: "Markdown-first authoring with rendered HTML, search text, and portable exports.",
    i18n: {
      name: { zh: "Markdown" },
      description: { zh: "以 Markdown 为核心的写作、HTML 渲染、搜索文本和可迁移导出。" },
    },
  },
];

const cloudflare = tags[0];
const cms = tags[1];
const ai = tags[2];
const markdown = tags[3];

export const posts: Post[] = [
  {
    id: "post-edge-cms",
    title: "Designing a permanent personal CMS on Cloudflare",
    slug: "designing-a-permanent-personal-cms-on-cloudflare",
    excerpt:
      "The template stores canonical content in D1, keeps media and backup archives in R2, and exposes the same publishing surface to humans, CLIs, and AI agents.",
    coverImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    contentMarkdown: `# Designing a permanent personal CMS on Cloudflare

Cloud Blog CMS treats the database as the source of truth and Markdown as the durable content format. Posts, pages, projects, comments, settings, and API tokens live in D1. Images, attachments, import packages, and backups live in R2.

The first release focuses on a reliable loop: sign in, write, upload, publish, render, comment, review, and export. Paid features such as email notifications stay optional so the free core remains usable.

## Core boundaries

- D1 owns structured content.
- R2 owns binary assets.
- Markdown remains exportable.
- HTML imports are sanitized before rendering.
- API tokens and the CLI use scoped permissions.
`,
    contentHtml:
      "<p>Cloud Blog CMS treats the database as the source of truth and Markdown as the durable content format.</p><p>The first release focuses on a reliable loop: sign in, write, upload, publish, render, comment, review, and export.</p>",
    contentText:
      "Cloud Blog CMS stores posts pages projects comments settings and API tokens in D1 and stores assets imports and backups in R2.",
    status: "published",
    source: "editor",
    featured: true,
    pinned: true,
    commentsEnabled: true,
    publishedAt: "2026-05-20T09:00:00.000Z",
    updatedAt: "2026-05-22T12:20:00.000Z",
    authorName: "01MVP",
    tags: [cloudflare, cms, markdown],
    seoTitle: "Designing a permanent personal CMS on Cloudflare",
    seoDescription:
      "How Cloud Blog CMS uses Cloudflare Workers, D1, R2, Markdown, and scoped automation for durable personal publishing.",
    i18n: {
      title: { zh: "在 Cloudflare 上设计一个长期可用的个人 CMS" },
      excerpt: {
        zh: "这个模板把标准内容存入 D1，把媒体和备份归档放进 R2，并向人类、CLI 和 AI Agent 暴露同一套发布能力。",
      },
      contentMarkdown: {
        zh: `# 在 Cloudflare 上设计一个长期可用的个人 CMS

Cloud Blog CMS 把数据库视为事实来源，把 Markdown 视为长期可迁移的内容格式。文章、页面、项目、评论、站点设置和 API Token 存在 D1，图片、附件、导入包和备份存在 R2。

第一版聚焦一个可靠闭环：登录、写作、上传、发布、渲染、评论、审核和导出。邮件通知等付费能力保持可选，让免费核心能力依旧完整可用。

## 核心边界

- D1 负责结构化内容。
- R2 负责二进制资源。
- Markdown 始终可以导出。
- HTML 导入会先清洗再渲染。
- API Token 和 CLI 使用受限权限。
`,
      },
      contentHtml: {
        zh: "<p>Cloud Blog CMS 把数据库视为事实来源，把 Markdown 视为长期可迁移的内容格式。</p><p>第一版聚焦一个可靠闭环：登录、写作、上传、发布、渲染、评论、审核和导出。</p>",
      },
      contentText: {
        zh: "Cloud Blog CMS 将文章、页面、项目、评论、设置和 API Token 存入 D1，并将资源、导入包和备份存入 R2。",
      },
      seoTitle: { zh: "在 Cloudflare 上设计长期可用的个人 CMS" },
      seoDescription: {
        zh: "Cloud Blog CMS 如何使用 Cloudflare Workers、D1、R2、Markdown 和受限自动化能力支持长期个人发布。",
      },
    },
  },
  {
    id: "post-skill-runner",
    title: "What the AI initialization Skill needs to automate",
    slug: "what-the-ai-initialization-skill-needs-to-automate",
    excerpt:
      "The Skill checks local tooling, creates Cloudflare resources, writes site config, deploys the Worker, validates routes, and creates the first post.",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    contentMarkdown: `# What the AI initialization Skill needs to automate

The Skill is not a tutorial. It is an execution workflow for agents.

It should collect the site name, author, domain, theme, comments preference, and email preference. Then it checks Node, pnpm, Vite+, Wrangler, and Cloudflare auth state before creating D1, R2, optional KV, and Turnstile resources.

Manual steps are reserved for login, token creation, paid-plan confirmation, DNS confirmation, and email verification.
`,
    contentHtml:
      "<p>The Skill is not a tutorial. It is an execution workflow for agents.</p><p>Manual steps are reserved for login, token creation, paid-plan confirmation, DNS confirmation, and email verification.</p>",
    contentText:
      "The AI initialization Skill checks local tooling creates Cloudflare resources writes config deploys validates and creates a first post.",
    status: "published",
    source: "ai",
    featured: true,
    pinned: false,
    commentsEnabled: true,
    publishedAt: "2026-05-21T10:30:00.000Z",
    updatedAt: "2026-05-21T10:30:00.000Z",
    authorName: "01MVP",
    tags: [ai, cloudflare],
    seoTitle: "AI Skill automation plan for Cloud Blog CMS",
    seoDescription:
      "The Cloud Blog CMS Skill initializes, configures, deploys, validates, and maintains a new Cloudflare-native blog.",
    i18n: {
      title: { zh: "AI 初始化 Skill 需要自动完成什么" },
      excerpt: {
        zh: "Skill 会检查本地工具、创建 Cloudflare 资源、写入站点配置、部署 Worker、验证路由并创建第一篇文章。",
      },
      contentMarkdown: {
        zh: `# AI 初始化 Skill 需要自动完成什么

这个 Skill 不是教程，而是面向 Agent 的执行工作流。

它需要收集站点名称、作者、域名、主题、评论偏好、邮件偏好和主语言，然后检查 Node、pnpm、Vite+、Wrangler 和 Cloudflare 登录状态，再创建 D1、R2、可选 KV 与 Turnstile 资源。

人工步骤只保留给登录、Token 创建、付费计划确认、DNS 确认和邮件验证。
`,
      },
      contentHtml: {
        zh: "<p>这个 Skill 不是教程，而是面向 Agent 的执行工作流。</p><p>人工步骤只保留给登录、Token 创建、付费计划确认、DNS 确认和邮件验证。</p>",
      },
      contentText: {
        zh: "AI 初始化 Skill 会检查本地工具、创建 Cloudflare 资源、写入配置、部署、验证并创建第一篇文章。",
      },
      seoTitle: { zh: "Cloud Blog CMS 的 AI Skill 自动化计划" },
      seoDescription: {
        zh: "Cloud Blog CMS Skill 会初始化、配置、部署、验证并维护一个新的 Cloudflare 原生博客。",
      },
    },
  },
  {
    id: "post-import-export",
    title: "A portable content model for Markdown, HTML, and ZIP backups",
    slug: "portable-content-model-markdown-html-zip-backups",
    excerpt:
      "Imports normalize Markdown, HTML, and bundled images into database records and R2 keys; exports produce a plain folder that other blog tools can read.",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    contentMarkdown: `# A portable content model for Markdown, HTML, and ZIP backups

Cloud Blog CMS keeps export paths boring on purpose. A complete export contains posts, pages, projects, assets, comments, and site settings. Markdown stays readable by other static blogs.

HTML import has two modes: sanitized HTML for normal use and trusted iframe rendering for admin-only legacy content.
`,
    contentHtml:
      "<p>Cloud Blog CMS keeps export paths boring on purpose. A complete export contains posts, pages, projects, assets, comments, and site settings.</p>",
    contentText:
      "Imports normalize Markdown HTML and image ZIP bundles and exports produce portable Markdown HTML assets comments and settings.",
    status: "published",
    source: "markdown_upload",
    featured: false,
    pinned: false,
    commentsEnabled: true,
    publishedAt: "2026-05-23T08:10:00.000Z",
    updatedAt: "2026-05-23T08:10:00.000Z",
    authorName: "01MVP",
    tags: [cms, markdown],
    seoTitle: "Portable Markdown, HTML, and ZIP backup model",
    seoDescription:
      "A Cloudflare-native CMS content model that imports Markdown and HTML and exports portable archives.",
    i18n: {
      title: { zh: "适配 Markdown、HTML 和 ZIP 备份的可迁移内容模型" },
      excerpt: {
        zh: "导入流程会把 Markdown、HTML 和图片压缩包规范化为数据库记录与 R2 key；导出结果则是其他博客工具也能读取的普通文件夹。",
      },
      contentMarkdown: {
        zh: `# 适配 Markdown、HTML 和 ZIP 备份的可迁移内容模型

Cloud Blog CMS 刻意让导出路径保持简单。一次完整导出包含文章、页面、项目、资源、评论和站点设置，Markdown 依旧能被其他静态博客读取。

HTML 导入提供两种模式：普通使用场景下的安全清洗 HTML，以及只在管理后台使用的可信 iframe 渲染。
`,
      },
      contentHtml: {
        zh: "<p>Cloud Blog CMS 刻意让导出路径保持简单。一次完整导出包含文章、页面、项目、资源、评论和站点设置。</p>",
      },
      contentText: {
        zh: "导入流程规范化 Markdown、HTML 和图片 ZIP，导出流程生成可迁移的 Markdown、HTML、资源、评论和设置。",
      },
      seoTitle: { zh: "可迁移的 Markdown、HTML 和 ZIP 备份模型" },
      seoDescription: {
        zh: "Cloudflare 原生 CMS 的内容模型，可导入 Markdown 与 HTML，并导出可迁移归档。",
      },
    },
  },
];

export const projects: Project[] = [
  {
    id: "project-template",
    title: "Cloud Blog CMS Template",
    slug: "cloud-blog-cms-template",
    excerpt:
      "Reusable TanStack Start template with Workers, D1, R2, RSS, sitemap, comments, and admin workflows.",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://cms.01mvp.com",
    githubUrl: "https://github.com/01mvp/blog-starter",
    tags: [cloudflare, cms],
    publishedAt: "2026-05-24T10:00:00.000Z",
    i18n: {
      title: { zh: "Cloud Blog CMS 模板" },
      excerpt: {
        zh: "可复用的 TanStack Start 模板，内置 Workers、D1、R2、RSS、站点地图、评论和管理后台工作流。",
      },
    },
  },
  {
    id: "project-skill",
    title: "cloud-blog-cms Skill",
    slug: "cloud-blog-cms-skill",
    excerpt:
      "Agent workflow for initializing a new blog, provisioning Cloudflare resources, deploying, and validating.",
    coverImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://demo.01mvp.com",
    githubUrl: "https://github.com/01mvp/blog-starter/tree/main/skills/cloud-blog-cms",
    tags: [ai, cloudflare],
    publishedAt: "2026-05-24T11:00:00.000Z",
    i18n: {
      title: { zh: "cloud-blog-cms Skill" },
      excerpt: {
        zh: "用于初始化新博客、创建 Cloudflare 资源、部署并验证结果的 Agent 工作流。",
      },
    },
  },
];

export const comments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-edge-cms",
    parentId: null,
    authorName: "Reader",
    authorEmailHash: "demo-email-hash",
    authorWebsite: null,
    body: "The split between D1 records and Markdown exports makes migration feel realistic.",
    status: "approved",
    createdAt: "2026-05-22T13:15:00.000Z",
    i18n: {
      body: { zh: "D1 记录和 Markdown 导出的分工让迁移路径看起来很扎实。" },
    },
  },
  {
    id: "comment-2",
    postId: "post-skill-runner",
    parentId: null,
    authorName: "Automation tester",
    authorEmailHash: "pending-email-hash",
    authorWebsite: "https://example.com",
    body: "Please add the exact fallback path for Cloudflare API token creation.",
    status: "pending",
    createdAt: "2026-05-23T06:45:00.000Z",
    i18n: {
      body: { zh: "请补上 Cloudflare API Token 创建失败时的明确兜底路径。" },
    },
  },
];

export const assets: Asset[] = [
  {
    id: "asset-og",
    key: "site/og-default.svg",
    url: "/og-default.svg",
    filename: "og-default.svg",
    contentType: "image/svg+xml",
    sizeBytes: 4096,
    createdAt: "2026-05-20T08:00:00.000Z",
    attachedPostId: null,
  },
  {
    id: "asset-cover",
    key: "posts/edge-cms-cover.jpg",
    url: posts[0].coverImage,
    filename: "edge-cms-cover.jpg",
    contentType: "image/jpeg",
    sizeBytes: 184320,
    createdAt: "2026-05-20T09:10:00.000Z",
    attachedPostId: "post-edge-cms",
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Published posts",
    value: "3",
    detail: "2 featured, 1 pinned",
    i18n: { label: { zh: "已发布文章" }, detail: { zh: "2 篇精选，1 篇置顶" } },
  },
  {
    label: "Pending comments",
    value: "1",
    detail: "Default moderation queue",
    i18n: { label: { zh: "待审评论" }, detail: { zh: "默认审核队列" } },
  },
  {
    label: "R2 assets",
    value: "2",
    detail: "Site OG plus one cover image",
    i18n: { label: { zh: "R2 资源" }, detail: { zh: "站点 OG 图和一张封面图" } },
  },
  {
    label: "Automation scopes",
    value: "8",
    detail: "API token permissions planned",
    i18n: { label: { zh: "自动化权限" }, detail: { zh: "计划中的 API Token 权限" } },
  },
];
