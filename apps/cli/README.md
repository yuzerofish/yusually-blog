# blogcms CLI

`blogcms` is the automation surface for Cloud Blog CMS. It is used by admins, scripts, and the `cloud-blog-cms` Skill.

## Local Check

```sh
pnpm --filter @repo/cli check
```

## Initialization

```sh
blogcms init --primary-language en
blogcms init --primary-language zh
```

English and Chinese stay enabled for every generated site. The selected primary language controls initial settings, feed copy, and first-run content defaults. UI translation remains Paraglide.js.

## Remote Environment

```sh
export BLOGCMS_SITE_URL=https://demo.01mvp.com
export BLOGCMS_API_TOKEN=...
```

## Remote Commands

```sh
blogcms login --email admin@example.com --password "..."
blogcms site get
blogcms site update --config /absolute/path/to/site.config.json
blogcms push ./post.md
blogcms push ./post-folder
blogcms push ./first-post.json
blogcms page list
blogcms page push ./about.md
blogcms project list
blogcms project push ./project.json
blogcms import ./post-folder
blogcms import ./post.md
blogcms import ./legacy.html
blogcms import ./site.zip
blogcms upload ./images
blogcms export
blogcms export --format zip --output ./cloud-blog-cms-export.zip
blogcms backup
blogcms deploy --target main
blogcms deploy --target demo
blogcms admin create --email admin@example.com --password "..."
blogcms admin reset-password --email admin@example.com --password "..."
blogcms admin request-password-reset --email admin@example.com
blogcms admin confirm-password-reset --token reset_... --password "..."
```

`blogcms push` accepts Markdown files, Markdown folders, or JSON post payloads. JSON payloads can include bilingual `i18n` fields for title, excerpt, body, rendered HTML, text, and SEO metadata.

`blogcms page` manages static Markdown pages such as About. `blogcms project` manages portfolio entries with links, tags, screenshots, and Markdown body content. Both commands use the same authenticated API as the admin UI.

`blogcms import` accepts Markdown, HTML, ZIP archives, or a local folder. Folder imports send a file manifest to the ZIP import API so Markdown/HTML and local images can be processed together.

`blogcms upload` accepts one image file or a folder of images. Folder uploads are processed recursively and return all uploaded asset records.

`blogcms export --format zip` downloads the full archive written by `/api/export?format=zip`. `blogcms backup` creates the same ZIP archive directly in the configured R2 backups bucket.

`blogcms deploy` runs the production sequence for `main` or `demo`: Vite+ build, remote D1 migrations, then Wrangler deploy with the generated Cloudflare Vite config. Use `--dry-run` to print the command plan, or `--skip-build`, `--skip-migrations`, and `--skip-deploy` for targeted maintenance.

`blogcms admin request-password-reset` uses the optional Email Sending path. When email is disabled, direct `blogcms admin reset-password` remains available with an API token.
