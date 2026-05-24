import type { Asset, Comment, DashboardMetric, Post, Project, SiteSettings, Tag } from "./types";

export const siteSettings: SiteSettings = {
  name: "Cloud Blog CMS",
  description:
    "A Cloudflare-native personal blog CMS for visual writing, Markdown publishing, and AI automation.",
  url: "https://blog-starter.01mvp.com",
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
};

export const tags: Tag[] = [
  {
    id: "tag-cloudflare",
    name: "Cloudflare",
    slug: "cloudflare",
    description: "Workers, D1, R2, Turnstile, and edge deployment notes.",
  },
  {
    id: "tag-cms",
    name: "CMS",
    slug: "cms",
    description: "Content workflows for writing, publishing, importing, and exporting.",
  },
  {
    id: "tag-ai",
    name: "AI Automation",
    slug: "ai-automation",
    description: "Agent-friendly APIs, CLI flows, and repeatable site initialization.",
  },
  {
    id: "tag-markdown",
    name: "Markdown",
    slug: "markdown",
    description: "Markdown-first authoring with rendered HTML, search text, and portable exports.",
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
    projectUrl: "https://blog-starter.01mvp.com",
    githubUrl: "https://github.com/01mvp/blog-starter",
    tags: [cloudflare, cms],
    publishedAt: "2026-05-24T10:00:00.000Z",
  },
  {
    id: "project-skill",
    title: "cloud-blog-cms Skill",
    slug: "cloud-blog-cms-skill",
    excerpt:
      "Agent workflow for initializing a new blog, provisioning Cloudflare resources, deploying, and validating.",
    coverImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://blog-demo.01mvp.com",
    githubUrl: "https://github.com/01mvp/blog-starter/tree/main/skills/cloud-blog-cms",
    tags: [ai, cloudflare],
    publishedAt: "2026-05-24T11:00:00.000Z",
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
  { label: "Published posts", value: "3", detail: "2 featured, 1 pinned" },
  { label: "Pending comments", value: "1", detail: "Default moderation queue" },
  { label: "R2 assets", value: "2", detail: "Site OG plus one cover image" },
  { label: "Automation scopes", value: "8", detail: "API token permissions planned" },
];
