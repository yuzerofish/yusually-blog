---
title: API
description: 01mvp-blog-starter 的 API 与自动化入口。
---

01mvp-blog-starter 在 `/openapi.json` 提供 OpenAPI 文档。

API 主要服务于：

- 后台管理界面
- 初始化与维护工作流
- 自定义自动化脚本

## 主要接口

```txt
POST   /api/posts
PATCH  /api/posts/:id
GET    /api/posts
GET    /api/posts/:id
DELETE /api/posts/:id

POST   /api/import/markdown
POST   /api/import/html
POST   /api/import/zip

POST   /api/assets
GET    /api/assets

GET    /api/export
POST   /api/backups

POST   /api/comments/:id/approve
POST   /api/comments/:id/spam
POST   /api/comments/:id/delete

GET    /api/comment-auth/me
POST   /api/comment-auth/login
POST   /api/comment-auth/signup
POST   /api/comment-auth/logout
GET    /api/comment-auth/github/start
GET    /api/comment-auth/verify-email
GET    /api/admin/email-status
```

API Token 有 scope。发布内容需要写权限，把文章切换到已发布或定时发布还需要 publish 权限。

API Token 在后台设置页创建。按任务选择最小权限：文章需要 `posts:read`、`posts:write`，发布或定时发布再加 `posts:publish`；评论审核需要 `comments:moderate`；导出需要 `export:read`；站点设置需要 `site:read` 或 `site:write`。

## 评论与读者登录

`POST /api/comments` 需要读者会话。请求包含评论内容、文章 id，以及用于回复的可选 parent id。服务端会执行 honeypot 检查、可选 Turnstile 校验、频率限制、正文长度限制、链接数量限制和屏蔽关键词检查。

读者和后台管理员共用 Better Auth。`/api/comment-auth/*` 保留评论区需要的响应结构，实际账号和会话都写入共享的 Better Auth 表。如果后台开启邮箱验证，邮箱密码评论账号需要完成邮件确认后才能登录。

开启人工审核时，新评论进入 `pending`。关闭人工审核时，新评论可以直接进入 `approved`。命中屏蔽关键词且开启自动屏蔽时，评论进入 `spam`。

## OpenAPI

打开机器可读 schema：

```txt
/openapi.json
```

生成客户端、测试集成或接入外部自动化时，可以直接使用这个 schema。
