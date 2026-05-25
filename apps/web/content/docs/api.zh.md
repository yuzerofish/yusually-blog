---
title: API
description: Cloud Blog CMS 的 API 与自动化入口。
---

Cloud Blog CMS 在 `/openapi.json` 提供 OpenAPI 文档。

API 主要服务于：

- 后台管理界面
- `blogcms` CLI
- AI 初始化工作流
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
```

API Token 有 scope。发布内容需要写权限，把文章切换到已发布或定时发布还需要 publish 权限。

## OpenAPI

打开机器可读 schema：

```txt
/openapi.json
```

生成客户端、测试集成或接入外部自动化时，可以直接使用这个 schema。
