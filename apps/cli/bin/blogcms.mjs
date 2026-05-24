#!/usr/bin/env node

const command = process.argv[2] ?? "help";
const args = process.argv.slice(3);

const commands = new Map([
  [
    "help",
    {
      summary: "Show available commands",
      run: () => {
        print(`blogcms

Usage:
  blogcms login
  blogcms status
  blogcms push <markdown-file-or-folder>
  blogcms import <zip-or-html>
  blogcms upload <images-folder>
  blogcms export
  blogcms deploy
  blogcms admin create
  blogcms admin reset-password

Environment:
  BLOGCMS_SITE_URL
  BLOGCMS_API_TOKEN
`);
      },
    },
  ],
  [
    "login",
    {
      summary: "Store an API token for a Cloud Blog CMS site",
      run: () => {
        print(
          "Set BLOGCMS_SITE_URL and BLOGCMS_API_TOKEN, then run `blogcms status` to verify connectivity.",
        );
      },
    },
  ],
  [
    "status",
    {
      summary: "Check local CLI configuration",
      run: () => {
        const siteUrl = process.env.BLOGCMS_SITE_URL;
        const token = process.env.BLOGCMS_API_TOKEN;

        print(
          JSON.stringify({ siteUrl: siteUrl ?? null, apiTokenConfigured: Boolean(token) }, null, 2),
        );
      },
    },
  ],
  [
    "push",
    {
      summary: "Publish Markdown through the API",
      run: () => {
        requireArg(args[0], "Provide a Markdown file or folder.");
        print(`Prepared Markdown import for ${args[0]}. API mutation lands in Phase 2.`);
      },
    },
  ],
  [
    "import",
    {
      summary: "Import Markdown, HTML, or ZIP content",
      run: () => {
        requireArg(args[0], "Provide an import file.");
        print(`Prepared import for ${args[0]}. ZIP and HTML parsing lands in Phase 2.`);
      },
    },
  ],
  [
    "upload",
    {
      summary: "Upload media assets",
      run: () => {
        requireArg(args[0], "Provide an images folder.");
        print(
          `Prepared asset upload for ${args[0]}. R2 upload mutation lands in Phase 1 hardening.`,
        );
      },
    },
  ],
  [
    "export",
    {
      summary: "Export posts, pages, projects, assets, comments, and settings",
      run: () => {
        print("Prepared site export. Remote ZIP generation lands in Phase 2.");
      },
    },
  ],
  [
    "deploy",
    {
      summary: "Run the Cloudflare deploy sequence",
      run: () => {
        print("Run `pnpm build:web`, apply D1 migrations, then `wrangler deploy` from apps/web.");
      },
    },
  ],
  [
    "admin",
    {
      summary: "Admin user operations",
      run: () => {
        const subcommand = args[0];

        if (subcommand === "create") {
          print(
            "Admin creation will call the auth adapter after the D1 auth migration is complete.",
          );
          return;
        }

        if (subcommand === "reset-password") {
          print(
            "Password reset will update the auth credential record after the D1 auth migration is complete.",
          );
          return;
        }

        fail("Use `blogcms admin create` or `blogcms admin reset-password`.");
      },
    },
  ],
]);

const entry = commands.get(command);

if (!entry) {
  fail(`Unknown command: ${command}`);
}

entry.run();

function print(message) {
  process.stdout.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function requireArg(value, message) {
  if (!value) {
    fail(message);
  }
}
