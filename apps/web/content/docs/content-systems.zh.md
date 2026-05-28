---
title: 内容系统
description: 博客后台与 Fumadocs 文档系统的职责边界。
---

模板默认开启两套内容系统，并且刻意保持边界清晰。

## `/blog`：博客内容

适合放在发布后台里的内容通常需要运行时管理：

- 公开文章
- 草稿、定时发布和归档文章
- 后台可视化写作
- 评论和审核
- 媒体上传到 R2
- RSS 和 feed 输出
- API 与 CLI 发布
- 导入、导出和备份

博客内容存储在 D1 中。作者仍然可以用 Markdown 写作，公开页面使用渲染后的 HTML。

## `/docs`：Git Markdown/MDX

适合放在 Fumadocs 里的内容应该跟随代码仓库一起版本化：

- 产品文档
- 开发者指南
- API 使用说明
- 部署和模板初始化说明
- 需要跟代码一起 review 的长期参考资料

Docs 内容放在 `apps/web/content/docs`。文档通过 Git review、版本化，并随 Web 应用一起部署。

## 边界

```txt
/blog   = 博客内容
/docs   = Git Markdown/MDX 文档
/admin  = 管理后台
RSS     = 只包含博客文章
sitemap = 首页 + 博客 + 文档 + 标签 + 关于
```

后台不编辑 Git 管理的 docs。站点所有者如果只想保留博客或只想保留文档，可以在项目定制时删除不用的路由和导航入口。
