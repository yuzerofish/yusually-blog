---
title: 发布
description: 在后台编辑、API 发布、Git 管理 Markdown、导入和文档之间选择。
---

01mvp-blog-starter 支持多种发布路径。

默认路径是后台编辑。其他路径只在匹配现有工作流时使用；每增加一种来源，就会增加一份集成面，所以每条路径都保持清晰边界。

## 博客文章

需要正常写作工作流时，使用后台：

- 在浏览器中写 Markdown
- 上传封面图和媒体资源
- 保存草稿
- 发布或定时发布文章
- 审核评论

发布后的文章会出现在 `/blog`、feeds、标签页和 sitemap 中。

## OpenAPI 发布

需要本地自动化、外部集成或 AI 辅助发布时，使用 `/openapi.json`。发送鉴权请求前，先在后台设置页创建受限 API Token。

发布流程使用和后台相同的鉴权 HTTP API。写入文章需要 `posts:write`，发布或定时发布还需要 `posts:publish`。

## 导入和导出

API 支持 Markdown、HTML、ZIP 和文件夹导入。导出内容包含文章、评论、资产、标签、站点设置和 manifest。

备份会写入 R2，便于后续恢复或迁移站点。

## Git 管理的 Markdown

需要把博客文章作为 Markdown 或 MDX 文件放在 Git 中管理时，使用 `content/notes`。这条路径兼容常见 Obsidian Markdown 写法，但它是 Git / 部署工作流，不是 Obsidian 桌面插件。

只有带 `publish: true` 的文件会同步。同步后的笔记会成为普通博客文章，并共用评论、标签、RSS 和 sitemap。

完整流程见 [Obsidian 兼容 Markdown](/zh/docs/obsidian)。

## Docs 发布

Docs 页面以 Markdown 或 MDX 文件提交到 `apps/web/content/docs`。它们随 Web 应用一起部署，并由 Fumadocs 渲染到 `/docs` 和 `/zh/docs`。

Fumadocs 继续用于产品文档和部署指南。`content/notes` 用于按标签和发布时间组织的博客文章。这两条路径服务的内容类型不同，暂时不要互相替代。
