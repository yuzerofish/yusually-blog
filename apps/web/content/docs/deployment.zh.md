---
title: 部署
description: 将 CMS 模板与生成的 demo 部署到 Cloudflare Workers。
---

Cloud Blog CMS 面向 Cloudflare Workers、D1、R2 和可选 KV 设计。

## 模板站点

```sh
blogcms deploy --target main
```

这会构建 Web 应用、应用 D1 migrations，并使用生成的 Cloudflare 配置部署 Worker。

## Demo 站点

```sh
blogcms deploy --target demo
```

Demo target 使用 demo Cloudflare 配置，适合端到端验证模板工作流。

## 运行时资源

```txt
Workers: 公开站点、后台、API 路由、feeds、sitemap、robots
D1: 文章、页面、项目、评论、设置、用户、会话、tokens
R2: 资产、导入包、导出包、备份
KV: 缓存元数据和可选短期记录
```

Turnstile 和 Cloudflare Email Sending 是可选能力。未配置可选 binding 不应该阻塞登录、发布、导入、导出、备份或评论审核。

## 必要 Migration

启用读者评论前，先应用 D1 migrations：

```sh
pnpm --filter @repo/web exec wrangler d1 migrations apply blog-starter-cms --remote --config wrangler.jsonc
```

评论登录和审核相关表由 `packages/db/migrations/0004_comment_auth_moderation.sql` 创建。

## 环境变量

本地开发读取 `apps/web/.env`。Cloudflare preview 和 production 读取 Wrangler vars 与 secrets。

```txt
CMS_PUBLIC_SITE_URL=https://your-domain.com
CMS_BACKUP_RETENTION_DAYS=30
CMS_EMAIL_SENDING_ENABLED=false
CMS_TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

生产环境把 `GITHUB_CLIENT_SECRET` 写成 Wrangler secret：

```sh
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

## GitHub 评论登录

GitHub OAuth 是推荐的读者评论登录方式。创建 GitHub OAuth app 后，为每个环境添加 callback URL：

```txt
http://localhost:3000/api/comment-auth/github/callback
https://your-domain.com/api/comment-auth/github/callback
```

`GITHUB_CLIENT_ID` 可以放在对应的 Wrangler 配置或 Cloudflare dashboard。没有配置 GitHub OAuth 时，邮箱和密码登录仍然可用。

## 评论审核

评论需要读者会话。站点所有者可以在后台设置里配置评论行为：

- 评论是否必须审核通过后才公开展示
- 命中屏蔽关键词时是否自动拦截
- 不改代码直接维护屏蔽关键词
- 在评论队列里处理待审核和已拦截评论
