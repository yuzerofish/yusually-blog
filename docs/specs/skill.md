# Skill

The `cloud-blog-cms` Skill lives at `skills/cloud-blog-cms/SKILL.md`.

Its job is to let an AI agent initialize a new blog from this template, configure Cloudflare resources, deploy the Worker, create a first post, and validate the generated site.

## Required Inputs

The Skill must collect a primary language of `en` or `zh`. English and Chinese stay enabled either way.

## Automation Preference

The Skill should use local commands and Cloudflare APIs first. It should ask the user to intervene only for Cloudflare login, paid-plan confirmation, API token creation, DNS confirmation, domain verification, and email verification.

## I18n Initialization

The generated site must keep `i18n: "paraglide-js"`, `locales: ["en", "zh"]`, and the selected `primaryLanguage` in site config. First-run content should include bilingual site introduction copy and a first post with English and Chinese title, excerpt, Markdown body, SEO title, and SEO description.

## Generated Site

The acceptance demo target is `blog-demo.01mvp.com`. It must be generated through the Skill workflow, not manually assembled. The demo must show the selected primary language and still allow switching to the other language.
