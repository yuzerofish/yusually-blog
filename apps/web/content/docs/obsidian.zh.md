---
title: Obsidian 发布
description: 在 Obsidian vault 中写作，只把选中的笔记发布到博客。
---

Obsidian 很适合个人站点写作，因为它把内容保存在普通 Markdown 文件里。草稿、参考资料、私人笔记都可以放在同一个 vault 中，最终只有你明确选择的文件会发布。

01mvp-blog-starter 会把 Obsidian 笔记当成普通博客文章的另一种来源。同步后的文章会共用博客页面、标签、RSS、sitemap、评论、审核和评论回复邮件。

## 使用方法

把 vault 文件放在 `content/notes`。这个目录可以按你的习惯自由组织。站点不会按文件夹展示文章，公开页面只按标签和发布时间组织。

只有带 `publish: true` 的文件会同步：

```md
---
publish: true
tags: [writing, ai]
---

# 我的第一篇 Obsidian 文章

按平时的方式在 Obsidian 中写作。
```

先预览一次：

```bash
pnpm sync:obsidian -- --dry-run
```

再同步到已部署站点：

```bash
CMS_PUBLIC_SITE_URL=https://your-site.example.com \
CMS_API_TOKEN=your-api-token \
pnpm sync:obsidian
```

API Token 需要 `posts:write`、`posts:publish` 和 `assets:write`。

部署时，`pnpm deploy:web` 会在部署完成后尝试运行 Obsidian 同步。如果配置了 `CMS_PUBLIC_SITE_URL` 和 `CMS_API_TOKEN`，它会自动同步；没有配置时会跳过，不影响部署。

## 图片和链接

同步命令会处理 Obsidian 常见的图片写法：

```md
![[cover.png]]
![[Assets/cover.png|Cover image]]
![Cover](../Assets/cover.png)
```

如果能在 `content/notes` 下找到引用的图片，它会通过现有资产 API 上传到 R2，并把 Markdown 改写成上传后的 URL。如果同名图片不止一个，命令会保留原引用，避免误传错图。

当目标笔记也被发布时，内部双链会转成站内链接：

```md
[[My other note]]
[[My other note|read the companion note]]
```

如果目标笔记没有发布，链接文字会保留为普通文本。

Obsidian callout 会保留为引用块：

```md
> [!NOTE] Small detail
```

`.mdx` 文件也会被扫描。与 Markdown 兼容的 MDX 可以正常同步；自定义 JSX 会留在 Markdown 正文中，仍然需要确保可以被博客页安全渲染。

## 实现原理

Worker 在请求时读不到 Git 文件，所以同步发生在本地或 CI 命令中。命令会扫描 `content/notes`，找到已发布的 `.md` 和 `.mdx` 文件，上传引用图片，改写 Obsidian 特有语法，然后把规范化后的 manifest 发送到 `/api/sync/obsidian`。

服务端会把同步后的笔记保存成普通文章，并在 `post_sources` 里记录源文件。记录包含：

- 来源类型：`obsidian_git`
- `content/notes` 内的源路径
- 内容 hash
- 最近同步时间

后台会把这些文章标记为 Obsidian 来源，并以只读方式展示。源文件才是真正的修改入口。要修改同步文章，编辑对应 Markdown 文件后重新运行同步即可。

如果某个已经同步过的源文件消失，或者移除了 `publish: true`，同步会把对应文章标记为已删除并从公开页面隐藏。它不会物理删除数据库行，所以评论和历史不会因为一次文件移动或临时 Git 错误直接丢失。
