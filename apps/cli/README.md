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
blogcms import ./post-folder
blogcms import ./post.md
blogcms import ./legacy.html
blogcms import ./site.zip
blogcms upload ./images
blogcms export
blogcms export --format zip --output ./cloud-blog-cms-export.zip
blogcms backup
blogcms admin create --email admin@example.com --password "..."
blogcms admin reset-password --email admin@example.com --password "..."
```

`blogcms push` accepts Markdown files, Markdown folders, or JSON post payloads. JSON payloads can include bilingual `i18n` fields for title, excerpt, body, rendered HTML, text, and SEO metadata.

`blogcms import` accepts Markdown, HTML, ZIP archives, or a local folder. Folder imports send a file manifest to the ZIP import API so Markdown/HTML and local images can be processed together.

`blogcms export --format zip` downloads the full archive written by `/api/export?format=zip`. `blogcms backup` creates the same ZIP archive directly in the configured R2 backups bucket.
