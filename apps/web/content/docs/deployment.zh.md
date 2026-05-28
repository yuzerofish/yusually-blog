---
title: 部署
description: 将 CMS 站点部署到 Cloudflare Workers。
---

01mvp-blog-starter 面向 Cloudflare Workers、D1、R2 和可选 KV 设计。

## 本地开发管理员

给本地 Wrangler D1 数据库写入固定管理员账号：

```sh
pnpm db:seed:local-admin
```

默认本地登录信息：

```txt
email: a@a.test
password: 1
```

这个命令只会写入 `.wrangler/state` 下的本地 D1，不会创建生产管理员账号。需要覆盖默认值时，可以设置 `BLOGCMS_LOCAL_ADMIN_EMAIL`、`BLOGCMS_LOCAL_ADMIN_NAME` 或 `BLOGCMS_LOCAL_ADMIN_PASSWORD`。

## 生产站点

```sh
blogcms deploy --target main
```

这会构建 Web 应用、应用 D1 migrations，并使用生成的 Cloudflare 配置部署 Worker。

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

Better Auth 表由 `0002_better_auth_d1.sql` 创建；评论作者关联由 `0004_comment_moderation.sql` 创建。

## 环境变量

本地开发读取 `apps/web/.env`。Cloudflare preview 和 production 读取 Wrangler vars 与 secrets。

```txt
CMS_PUBLIC_SITE_URL=https://blog.01mvp.com
CMS_BACKUP_RETENTION_DAYS=30
CMS_EMAIL_SENDING_ENABLED=false
CMS_TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

生产环境把 `BETTER_AUTH_SECRET` 和 `GITHUB_CLIENT_SECRET` 写成 Wrangler secret：

```sh
pnpm --filter @repo/web exec wrangler secret put BETTER_AUTH_SECRET --config wrangler.jsonc
pnpm --filter @repo/web exec wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.jsonc
```

## 可选 Email Sending

Cloudflare Email Sending 默认关闭，因为出站邮件需要 Workers Paid。按 Cloudflare 当前价格，Workers Paid 每月包含 3,000 封出站邮件，超出后按 $0.35 / 1,000 封计费。Email Routing 的收信转发仍然是 unlimited。

需要密码重置链接、后台通知、导入导出完成通知、备份通知，或在后台开启评论账号邮箱验证时，再配置 Email Sending 或 Resend。邮箱验证默认关闭，保持关闭或未配置出站邮件时，站点的后台登录、发布、评论、审核、导入、导出和备份仍然可用。

当前 Cloudflare 限制包括：

- 新账号刚开始可能只能发给 Cloudflare 账号内已验证的邮箱
- 付费账号可以发给任意收件人，但受每日发送限制
- 单封邮件最多包含 50 个 `to`、`cc`、`bcc` 收件人
- 单封邮件总大小最多 5 MiB，包含附件
- Workers binding 发送还受标准 Workers CPU、subrequest 和内存限制

启用生产邮件前，先查看 Cloudflare 的 [Email Service pricing](https://developers.cloudflare.com/email-service/platform/pricing/) 和 [Email Service limits](https://developers.cloudflare.com/email-service/platform/limits/)。

## GitHub 评论登录

GitHub OAuth 是推荐的读者评论登录方式。创建 GitHub OAuth app 后，为每个环境添加 callback URL：

```txt
http://localhost:3000/api/auth/callback/github
https://blog.01mvp.com/api/auth/callback/github
```

`GITHUB_CLIENT_ID` 可以放在对应的 Wrangler 配置或 Cloudflare dashboard。没有配置 GitHub OAuth 时，邮箱和密码登录仍然可用。

## 评论审核

评论需要读者会话。站点所有者可以在后台设置里配置评论行为：

- 评论是否必须审核通过后才公开展示
- 命中屏蔽关键词时是否自动拦截
- 不改代码直接维护屏蔽关键词
- 在评论队列里处理待审核和已拦截评论
