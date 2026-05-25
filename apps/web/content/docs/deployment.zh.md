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
