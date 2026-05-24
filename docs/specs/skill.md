# Skill

The `cloud-blog-cms` Skill lives at `skills/cloud-blog-cms/SKILL.md`.

Its job is to let an AI agent initialize a new blog from this template, configure Cloudflare resources, deploy the Worker, create a first post, and validate the generated site.

## Automation Preference

The Skill should use local commands and Cloudflare APIs first. It should ask the user to intervene only for Cloudflare login, paid-plan confirmation, API token creation, DNS confirmation, domain verification, and email verification.

## Generated Site

The acceptance demo target is `blog-demo.01mvp.com`. It must be generated through the Skill workflow, not manually assembled.
