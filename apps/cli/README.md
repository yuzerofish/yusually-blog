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
blogcms import ./site.zip
blogcms upload ./images
blogcms export
blogcms admin create --email admin@example.com --password "..."
blogcms admin reset-password --email admin@example.com --password "..."
```

`blogcms push` accepts Markdown files, Markdown folders, or JSON post payloads. JSON payloads can include bilingual `i18n` fields for title, excerpt, body, rendered HTML, text, and SEO metadata.
