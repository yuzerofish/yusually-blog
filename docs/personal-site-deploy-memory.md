# Personal Site Deployment Memory

Use this note when deploying standalone HTML/static projects to Yusually's personal site.

| Item                   | Value                                 |
| ---------------------- | ------------------------------------- |
| Domain                 | `yusually.it.com`                     |
| Platform               | Cloudflare Workers via Wrangler       |
| Static files directory | `apps/web/public/`                    |
| Deploy command         | `pnpm run deploy:web`                 |
| GitHub repository      | `github.com/yuzerofish/yusually-blog` |

Existing public subpaths include:

- `/skills-portfolio/`
- `/self-media-report/`
- `/demo/`

Workflow for future requests:

1. Place static output under `apps/web/public/<requested-path>/`.
2. Update `packages/core/src/portfolio.ts` when the project should appear on `/works`.
3. Run the focused validation needed for the change.
4. Deploy with `pnpm run deploy:web`.

Example user request: "帮我把这个 html 项目部署到我的个人网站上，路径命名为 /xxx".
