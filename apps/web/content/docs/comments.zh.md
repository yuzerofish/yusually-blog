---
title: 评论
description: 读者登录、评论审核和关键词屏蔽。
---

评论是公开站点能力，但默认需要读者登录后才能发布。

## 登录方式

GitHub 和 Google OAuth 为读者评论提供一键登录。邮箱和密码登录作为备用方式保留。

为每个 provider 和需要独立 callback URL 的环境创建 OAuth app/client：

```txt
http://localhost:3000/api/auth/callback/github
http://localhost:3000/api/auth/callback/google
https://your-domain.com/api/auth/callback/github
https://your-domain.com/api/auth/callback/google
```

GitHub OAuth app 只有一个 authorization callback URL，所以本地和生产通常使用两个 OAuth app。Google OAuth client 可以配置多个 authorized redirect URIs，但本地和生产分开会让 secret 轮换更清楚。

`GITHUB_CLIENT_ID` 和 `GOOGLE_CLIENT_ID` 可以放在 Wrangler vars 或 Cloudflare dashboard。生产环境把 `GITHUB_CLIENT_SECRET` 和 `GOOGLE_CLIENT_SECRET` 存成 Wrangler secret，本地开发放在 `apps/web/.env`。

## 审核默认行为

开启人工审核时，新评论会先进入审核队列。审核通过后才会公开展示。被屏蔽的评论不会显示在公开页面。

后台设置页可以控制：

- 是否开启评论
- 评论是否需要审核后才公开
- 命中屏蔽关键词后是否自动隐藏
- 屏蔽关键词列表
- 邮箱密码评论账号是否需要验证邮箱后再登录

## 关键词屏蔽

屏蔽关键词适合处理垃圾评论、攻击性内容，以及不适合公开展示的内容。关键词匹配在提交评论时由服务端完成。

开启自动屏蔽时，命中的评论会被标记为 `spam`。关闭自动屏蔽时，评论仍会进入审核队列，由管理员手动判断。

## 管理流程

在 `/admin/comments` 处理待审核和已屏蔽评论。管理员可以审核通过、标记为垃圾评论或删除评论。

在 `/admin/settings` 调整默认审核模式、关键词屏蔽规则和可选邮箱验证，不需要重新部署站点。邮箱验证需要先配置 Cloudflare Email Sending 或 Resend。
