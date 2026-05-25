# blogcms CLI

`blogcms` is the automation surface for Cloud Blog CMS.

The current package defines the command contract used by the Skill and Phase 2 API work. Mutating commands are intentionally wired as command stubs until D1-backed API routes and token validation are implemented.

## Local Check

```sh
pnpm --filter @repo/cli check
```

## Initialization

```sh
blogcms init --primary-language en
blogcms init --primary-language zh
```

The CLI keeps English and Chinese enabled for every generated site. The selected primary language controls initial settings, feed copy, and the first post defaults. Translation runtime remains Paraglide.js.
