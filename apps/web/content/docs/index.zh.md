---
title: Cloud Blog CMS
description: 基于 Cloudflare 的个人博客 CMS，并内置 Git 管理的文档系统。
---

Cloud Blog CMS 是 `github.com/01mvp/blog-starter` 的 Cloudflare 原生个人博客 CMS 与 AI 初始化工作流。

默认同时提供两套内容系统：

- `/blog` 由 CMS 驱动，适合公开文章、后台写作、评论、RSS、CLI 发布、导入、导出和备份。
- `/docs` 由 Fumadocs 与 GitHub Markdown/MDX 驱动，适合产品文档、开发者文档、API 指南和模板使用说明。

这个模板面向想长期维护个人网站的人：文章可以在后台和自动化工具里快速发布，文档则跟随代码仓库一起 review、版本化和部署。

## 技术栈

- TanStack Start + TanStack Router
- React 19 + React Compiler
- Tailwind CSS + shadcn/ui + Base UI
- Fumadocs 管理 Git 文档
- Paraglide.js 编译英文和中文 UI 文案
- Cloudflare Workers runtime，通过 `@cloudflare/vite-plugin` 集成
- Cloudflare D1 存储文章、评论、设置、用户、会话和 API Token
- Cloudflare R2 存储媒体、导入包、导出包和备份
- `blogcms` CLI 用于 API 与 Skill 自动化

## 工作区

```txt
apps/web                 TanStack Start 应用、后台 CMS、公开站点、文档和 API 路由
apps/cli                 blogcms CLI
packages/core            内容类型、演示数据、Markdown 与 i18n helper
packages/db              Drizzle schema 与 D1 migrations
packages/ui              共享 UI primitives
skills/cloud-blog-cms    AI 初始化 Skill
docs/specs               项目规格与实现记录
```

## 本地开发

```sh
pnpm install
pnpm dev:web
```

本地 Web 应用默认运行在 `http://localhost:3000`。如果端口被占用，Vite+ 会自动使用下一个可用端口。

## 构建

```sh
pnpm build:web
```

构建会编译 Paraglide 输出、构建 TanStack Start，并生成 Cloudflare Worker bundle。

## 部署

模板站点：

```sh
blogcms deploy --target main
```

Skill 演示站点：

```sh
blogcms deploy --target demo
```

## CLI

```sh
BLOGCMS_SITE_URL=https://demo.01mvp.com pnpm --filter @repo/cli exec node bin/blogcms.mjs login --email <email> --password <password>
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs site get
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs push "$PWD/skills/cloud-blog-cms/examples/first-post.json"
BLOGCMS_SITE_URL=https://demo.01mvp.com BLOGCMS_API_TOKEN=<token> pnpm --filter @repo/cli exec node bin/blogcms.mjs export
```

## License

MIT. See `LICENSE`.
