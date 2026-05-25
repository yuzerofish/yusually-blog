#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";

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
  blogcms init --primary-language <en|zh>
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
  BLOGCMS_PRIMARY_LANGUAGE=en|zh
`);
      },
    },
  ],
  [
    "init",
    {
      summary: "Prepare site initialization settings",
      run: () => {
        const primaryLanguage = readOption(
          ["--primary-language", "--primaryLanguage"],
          process.env.BLOGCMS_PRIMARY_LANGUAGE ?? "en",
        );

        validatePrimaryLanguage(primaryLanguage);

        print(
          JSON.stringify(
            {
              primaryLanguage,
              locales: ["en", "zh"],
              i18n: "paraglide-js",
              nextStep: "Write these values into the generated site config before provisioning.",
            },
            null,
            2,
          ),
        );
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
        const primaryLanguage = process.env.BLOGCMS_PRIMARY_LANGUAGE ?? "en";

        validatePrimaryLanguage(primaryLanguage);

        print(
          JSON.stringify(
            {
              siteUrl: siteUrl ?? null,
              apiTokenConfigured: Boolean(token),
              primaryLanguage,
              locales: ["en", "zh"],
              i18n: "paraglide-js",
            },
            null,
            2,
          ),
        );
      },
    },
  ],
  [
    "push",
    {
      summary: "Publish Markdown through the API",
      run: async () => {
        requireArg(args[0], "Provide a Markdown file or folder.");
        const input = await readMarkdownInput(args[0]);
        const api = getApiConfig();

        if (!api) {
          print(`Prepared bilingual Markdown import for ${args[0]}. Configure API env to publish.`);
          return;
        }

        const response = await apiFetch(api, "/api/posts", {
          method: "POST",
          body: {
            title: input.title,
            slug: input.slug,
            contentMarkdown: input.contentMarkdown,
            status: "published",
          },
        });

        print(JSON.stringify(response, null, 2));
      },
    },
  ],
  [
    "import",
    {
      summary: "Import Markdown, HTML, or ZIP content",
      run: async () => {
        requireArg(args[0], "Provide an import file.");
        const api = getApiConfig();
        const endpoint = importEndpointFor(args[0]);

        if (!api) {
          print(`Prepared import for ${args[0]}. Configure API env to send it to ${endpoint}.`);
          return;
        }

        const response = await apiFetch(api, endpoint, {
          method: "POST",
          body: { filename: basename(args[0]) },
        });

        print(JSON.stringify(response, null, 2));
      },
    },
  ],
  [
    "upload",
    {
      summary: "Upload media assets",
      run: async () => {
        requireArg(args[0], "Provide an images folder.");
        const api = getApiConfig();

        if (!api) {
          print(`Prepared asset upload for ${args[0]}. Configure API env to upload assets.`);
          return;
        }

        const filename = await firstFilename(args[0]);
        const response = await apiFetch(api, "/api/assets", {
          method: "POST",
          body: { filename },
        });

        print(JSON.stringify(response, null, 2));
      },
    },
  ],
  [
    "export",
    {
      summary: "Export posts, pages, projects, assets, comments, and settings",
      run: async () => {
        const api = getApiConfig();

        if (!api) {
          print("Prepared site export. Configure API env to fetch the export payload.");
          return;
        }

        const response = await apiFetch(api, "/api/export", { method: "GET" });
        print(JSON.stringify(response, null, 2));
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

await Promise.resolve(entry.run());

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

function readOption(names, fallback) {
  for (const name of names) {
    const index = args.indexOf(name);
    if (index !== -1) {
      return args[index + 1] ?? fallback;
    }
  }

  return fallback;
}

function validatePrimaryLanguage(value) {
  if (value !== "en" && value !== "zh") {
    fail("Primary language must be `en` or `zh`.");
  }
}

function getApiConfig() {
  const siteUrl = process.env.BLOGCMS_SITE_URL;
  const token = process.env.BLOGCMS_API_TOKEN;

  if (!siteUrl || !token) {
    return null;
  }

  return { siteUrl: siteUrl.replace(/\/$/, ""), token };
}

async function apiFetch(api, pathname, options) {
  const response = await fetch(`${api.siteUrl}${pathname}`, {
    method: options.method,
    headers: {
      authorization: `Bearer ${api.token}`,
      "content-type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json();

  if (!response.ok) {
    fail(JSON.stringify(payload, null, 2));
  }

  return payload;
}

async function readMarkdownInput(inputPath) {
  const filePath = await firstMarkdownPath(inputPath);
  const contentMarkdown = await readFile(filePath, "utf8");
  const filename = basename(filePath, extname(filePath));

  return {
    title: firstHeading(contentMarkdown) ?? filename,
    slug: slugify(filename),
    contentMarkdown,
  };
}

async function firstMarkdownPath(inputPath) {
  const stats = await stat(inputPath);

  if (stats.isFile()) {
    return inputPath;
  }

  const entries = await readdir(inputPath);
  const markdown = entries.find((entry) => [".md", ".mdx"].includes(extname(entry)));

  if (!markdown) {
    fail("Folder must contain at least one .md or .mdx file.");
  }

  return join(inputPath, markdown);
}

async function firstFilename(inputPath) {
  const stats = await stat(inputPath);

  if (stats.isFile()) {
    return basename(inputPath);
  }

  const entries = await readdir(inputPath);
  return entries[0] ?? "upload.jpg";
}

function firstHeading(markdown) {
  return markdown
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();
}

function importEndpointFor(inputPath) {
  const extension = extname(inputPath).toLowerCase();

  if (extension === ".zip") {
    return "/api/import/zip";
  }

  if (extension === ".html" || extension === ".htm") {
    return "/api/import/html";
  }

  return "/api/import/markdown";
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
