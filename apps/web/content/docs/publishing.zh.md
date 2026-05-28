---
title: 发布
description: 通过后台、CLI、API 或 Git 文档发布内容。
---

01mvp-blog-starter 支持多种发布路径。

## 博客文章

需要正常写作工作流时，使用后台：

- 在浏览器中写 Markdown
- 上传封面图和媒体资源
- 保存草稿
- 发布或定时发布文章
- 审核评论

发布后的文章会出现在 `/blog`、feeds、标签页和 sitemap 中。

## CLI 发布

需要本地或自动化发布时，使用 `apps/cli` 里的 CLI。运行需要鉴权的命令前，先在 shell 中配置站点地址和 API Token。

CLI 使用和后台相同的鉴权 HTTP API。

## 导入和导出

API 支持 Markdown、HTML、ZIP 和文件夹导入。导出内容包含文章、评论、资产、标签、站点设置和 manifest。

备份会写入 R2，便于后续恢复或迁移站点。

## Docs 发布

Docs 页面以 Markdown 或 MDX 文件提交到 `apps/web/content/docs`。它们随 Web 应用一起部署，并由 Fumadocs 渲染到 `/docs` 和 `/zh/docs`。
