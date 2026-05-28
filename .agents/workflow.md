# Workflow

## Essential Commands

| Command        | Purpose                             |
| -------------- | ----------------------------------- |
| `pnpm dev:web` | Start the web app locally           |
| `pnpm lint`    | Type-checking & type-aware linting  |
| `pnpm check`   | Run all checks (format, lint, etc.) |
| `pnpm build`   | Build all packages                  |
| `pnpm test`    | Run Vitest unit tests               |

## Validation Timing

Prefer narrow validation first.

- Use package-local `pnpm -F <pkg> <script>` in the app or package you changed when the work is scoped.
- Use root `pnpm lint` and `pnpm check` after substantial multi-package work or when a task explicitly asks for broad validation.
- Do not run broad validation for markdown-only edits, small documentation tweaks, or other changes that cannot affect formatting, linting, typechecking, build output, or runtime behavior unless the user explicitly asks.

Run focused checks first, then broaden to the root tasks when the changed surface crosses package boundaries.

## Build Usage

- `pnpm build` is only for build/bundler issues or verifying production output.
- Don't build after every change. If `pnpm lint` passes, assume changes work.

## Database Schema Changes

1. Edit schemas in `packages/db/src/schema/`
2. Run `pnpm -F @repo/db db generate` to create migration files
3. **Check Wrangler environment** — ensure you're targeting the local/dev D1 database, not production. If Wrangler is configured for a production binding, **stop and warn the user**.
4. Run `pnpm -F @repo/db db migrate` to apply. Features will silently fail without applied migrations.

## Other DB Commands

| Command                        | Purpose                  |
| ------------------------------ | ------------------------ |
| `pnpm -F @repo/db db generate` | Generate migration files |
| `pnpm -F @repo/db db migrate`  | Apply migrations         |
| `pnpm -F @repo/db db studio`   | Open Drizzle Studio      |

## Planning Artifacts

- Small fixes and docs edits can go straight from current task context to implementation and focused validation.
- Medium product changes may use a short Markdown spec when the product intent, page flow, or acceptance criteria need to survive beyond one chat.
- Large or risky changes that affect data, auth, or multiple packages should have an explicit proposal or spec before implementation.

## UI Components And shadcn

For UI component selection, shadcn install decisions, and visual coherence rules, use [UI guidelines](./ui.md). Keep the detailed UI policy there rather than duplicating it in workflow docs.

## Testing

Follow [Testing policy](./testing.md). Do not add or run tests unless requested, except when an existing task explicitly calls for them.

## Formatting

Oxfmt (via Vite+) is configured for consistent code formatting via `vp fmt`. It runs automatically on commit via Vite+ pre-commit hooks, so manual formatting is not necessary.

## Commits

Use conventional commit format when committing.
