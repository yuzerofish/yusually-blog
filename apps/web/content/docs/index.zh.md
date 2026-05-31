---
title: 01mvp-blog-starter
description: 基于 Cloudflare 的个人博客，并内置 Git 管理的文档系统。
---

01mvp-blog-starter 是 `github.com/01mvp/blog-starter` 的 Cloudflare 原生个人博客与 AI 初始化工作流。

默认同时提供两套内容系统：

- `/blog` 由发布后台驱动，适合公开文章、后台写作、评论、RSS、OpenAPI 发布、导入、导出和备份。
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
- OpenAPI 用于 API 与 Skill 自动化

## 工作区

```txt
apps/web                 TanStack Start 应用、管理后台、公开站点、文档和 API 路由
packages/core            内容类型、演示数据、Markdown 与 i18n helper
packages/db              Drizzle schema 与 D1 migrations
packages/ui              共享 UI primitives
skills                   AI 初始化与 OpenAPI 维护 Skill
apps/web/content/docs    公开 Fumadocs 文档源，docs/site 指向这里
docs/specs               项目规格、部署记录和实现记录
```

## 文档来源

公开文档的源文件放在 `apps/web/content/docs`。它会渲染到 `/docs` 和 `/zh/docs`，同时 `README.md` 指向英文首页，让仓库首页和文档首页保持一致。

根目录下的 `docs/specs` 用于项目规格、部署记录、验收记录和实现证据，不作为公开 Fumadocs 内容整包发布。

## 配置入口

配置新站点时优先看这几页：

- [部署](./deployment)：Cloudflare Workers、D1、R2、KV、migrations、环境变量和部署 target。
- [评论](./comments)：读者登录、社交账号 OAuth、邮箱登录、审核模式、关键词屏蔽和评论管理。
- [进阶配置](./advanced-configuration)：可选邮件发送、评论 OAuth 和 Turnstile 状态检测。
- [API](./api)：自动化接口、OpenAPI 和评论登录接口。

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

生产站点：

```sh
pnpm deploy:web
```

## 自动化

创建站点和维护已有博客都通过 `skills/01mvp-blog` 里的 `01mvp-blog` Skill 完成。生成后的站点会暴露 `/openapi.json`，接入外部自动化前先在后台设置页创建受限 API Token。

## License

MIT. See `LICENSE`.
