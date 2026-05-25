---
title: 评论
description: 读者登录、评论审核和关键词屏蔽。
---

评论是公开站点能力，但默认需要读者登录后才能发布。

## 登录方式

GitHub OAuth 是推荐的读者评论登录方式。邮箱和密码登录作为备用方式保留。

GitHub OAuth callback URL 配置为：

```txt
http://localhost:3000/api/comment-auth/github/callback
https://your-domain.com/api/comment-auth/github/callback
```

`GITHUB_CLIENT_ID` 可以放在 Wrangler vars 或 Cloudflare dashboard。生产环境把 `GITHUB_CLIENT_SECRET` 存成 Wrangler secret，本地开发放在 `apps/web/.env`。

## 审核默认行为

开启人工审核时，新评论会先进入审核队列。审核通过后才会公开展示。被屏蔽的评论不会显示在公开页面。

后台设置页可以控制：

- 是否开启评论
- 评论是否需要审核后才公开
- 命中屏蔽关键词后是否自动隐藏
- 屏蔽关键词列表

## 关键词屏蔽

屏蔽关键词适合处理垃圾评论、攻击性内容，以及不适合公开展示的内容。关键词匹配在提交评论时由服务端完成。

开启自动屏蔽时，命中的评论会被标记为 `spam`。关闭自动屏蔽时，评论仍会进入审核队列，由管理员手动判断。

## 管理流程

在 `/admin/comments` 处理待审核和已屏蔽评论。管理员可以审核通过、标记为垃圾评论或删除评论。

在 `/admin/settings` 调整默认审核模式和关键词屏蔽规则，不需要重新部署站点。
