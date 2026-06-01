---
title: 发布
description: 通过后台、OpenAPI、AI Skill 或 Git 文档发布内容。
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

## OpenAPI 发布

需要本地自动化、外部集成或 AI 辅助发布时，使用 `/openapi.json`。发送鉴权请求前，先在后台设置页创建受限 API Token。

发布流程使用和后台相同的鉴权 HTTP API。写入文章需要 `posts:write`，发布或定时发布还需要 `posts:publish`。

## 导入和导出

API 支持 Markdown、HTML、ZIP 和文件夹导入。导出内容包含文章、评论、资产、标签、站点设置和 manifest。

备份会写入 R2，便于后续恢复或迁移站点。

## Obsidian 发布

需要在 Obsidian vault 中写作时，使用 `content/notes`。只有带 `publish: true` 的 `.md` 和 `.mdx` 文件会同步，同步后的笔记会成为普通博客文章，并共用评论、标签、RSS 和 sitemap。

完整流程见 [Obsidian 发布](/zh/docs/obsidian)。

## Docs 发布

Docs 页面以 Markdown 或 MDX 文件提交到 `apps/web/content/docs`。它们随 Web 应用一起部署，并由 Fumadocs 渲染到 `/docs` 和 `/zh/docs`。
