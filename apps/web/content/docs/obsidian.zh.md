---
title: Obsidian 兼容 Markdown
description: 通过 Git 工作流发布带 Obsidian 写法的 Markdown 或 MDX 笔记。
---

Obsidian 很适合个人站点写作，因为它把内容保存在普通 Markdown 文件里。01mvp-blog-starter 支持的是这种文件格式，并通过 Git 工作流把选中的 Markdown 发布成博客文章。

这不是 Obsidian 插件。站点不会连接 Obsidian 桌面应用，不会实时监听 vault，也不会从 Obsidian 内直接发布。它适合把选中的 Markdown 或 MDX 文件提交到项目仓库，再通过 Git / GitHub 部署流程发布。

同步后的笔记会成为普通博客文章，并共用博客页面、标签、RSS、sitemap、评论、审核和评论回复邮件。

## 适用场景

适合使用这条路径的情况：

- 你愿意把选中的笔记放进 Git
- 站点通过 GitHub 或其他 Git remote 部署
- 你希望文章源文件保持为 Markdown，而不是只存在后台编辑器里
- 你希望部署时处理 Obsidian 风格的图片、callout 和内部链接

如果你不使用 Git，请使用后台编辑器、Markdown 导入、ZIP 导入或 OpenAPI 发布。这些路径不要求 Obsidian vault，也不要求用仓库管理笔记文件。

## 使用方法

把 Markdown 文件放在 `content/notes`。这个目录可以按你的习惯自由组织。站点不会按文件夹展示文章，公开页面只按标签和发布时间组织。

只有带 `publish: true` 的文件会同步：

```md
---
publish: true
tags: [writing, ai]
---

# 我的第一篇 Obsidian 文章

按平时的方式在 Obsidian 中写作。
```

提交文件并部署站点。基于 GitHub 的常见流程是：

1. 在 `content/notes` 下写作或修改笔记。
2. 把变更 commit 并 push 到 GitHub。
3. 由 GitHub Actions 或你的部署命令运行 Web 部署。
4. 部署流程在配置好同步环境变量时，把已发布笔记同步到博客。

同步需要配置 `CMS_PUBLIC_SITE_URL` 和 `CMS_API_TOKEN`。API Token 需要 `posts:write`、`posts:publish` 和 `assets:write`。

调试某篇笔记时，可以先在本地预览：

```bash
pnpm sync:obsidian -- --dry-run
```

也可以在高级自动化里手动运行同步命令：

```bash
CMS_PUBLIC_SITE_URL=https://your-site.example.com \
CMS_API_TOKEN=your-api-token \
pnpm sync:obsidian
```

部署时，`pnpm deploy:web` 会在部署完成后尝试运行这一步。如果没有配置所需环境变量，它会跳过笔记同步，不影响部署。

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

Worker 在请求时读不到 Git 文件，所以同步发生在部署时，或由明确的自动化命令触发。同步会扫描 `content/notes`，找到已发布的 `.md` 和 `.mdx` 文件，上传引用图片，改写 Obsidian 特有语法，然后通过内部 API 把规范化后的 manifest 发送到已部署站点。

服务端会把同步后的笔记保存成普通文章，并在 `post_sources` 里记录源文件。记录包含：

- 来源类型：`obsidian_git`
- `content/notes` 内的源路径
- 内容 hash
- 最近同步时间

后台会把这些文章标记为 Git 管理的 Markdown 文章，并以只读方式展示。源文件才是真正的修改入口。要修改同步文章，编辑对应 Markdown 文件，提交后重新部署即可。

如果某个已经同步过的源文件消失，或者移除了 `publish: true`，同步会把对应文章标记为已删除并从公开页面隐藏。它不会物理删除数据库行，所以评论和历史不会因为一次文件移动或临时 Git 错误直接丢失。

修改文件路径会被视为发布另一篇文章。如果希望评论和原文章身份继续保留，请保持源文件路径不变。
