---
title: 使用指南
description: 如何发布文章、维护文档，以及运行这个博客模板。
---

文章放在 `/blog`，长期文档放在 `/docs`。模板默认同时开启两套内容系统。

## 写博客文章

需要正常写作流程时，使用管理后台：

- 在浏览器里写 Markdown
- 保存草稿
- 上传封面图和媒体资源
- 立即发布或定时发布
- 审核评论

发布后的文章会出现在 `/blog`、标签页、RSS、feeds 和 sitemap 中。

## 通过 CLI 或 API 发布

本地草稿、自动化发布、AI 辅助发布适合走 CLI：

使用 `apps/cli` 里的发布命令，并先在 shell 中配置站点地址和 API Token。

接入外部工具或生成 API client 时，使用 `/openapi.json`。

## 维护文档

需要跟代码仓库一起维护的内容放在 Fumadocs：

- 产品手册
- 开发者文档
- API 使用说明
- 部署说明
- 模板初始化指南

Docs 内容放在 `apps/web/content/docs`。英文页面使用 `*.md` 或 `*.mdx`，中文页面使用 `*.zh.md` 或 `*.zh.mdx`。

`README.md` 指向英文文档首页。仓库里的 `docs/site` 是到同一份 Fumadocs 源文件的便捷入口，`docs/specs` 继续作为项目规格和实现记录区域。

## 选择内容系统

```txt
/blog   = 后台管理的文章
/docs   = Git 管理的 Markdown/MDX 文档
/admin  = 发布管理后台
RSS     = 只包含博客文章
sitemap = 公开页面 + 博客 + 文档 + 项目 + 标签
```

经常编辑、需要后台管理的文章放在发布后台。长期稳定的产品说明、开发者参考和模板指南放在 docs。

## 部署

发布前先构建 Web 应用：

```sh
pnpm build:web
```

部署生产站点：

```sh
pnpm deploy:web
```
