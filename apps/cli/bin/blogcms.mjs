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
  blogcms site get
  blogcms site update --config <site.config.json>
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
      run: async () => {
        const siteUrl = getSiteUrl();
        const email = readOption(["--email"], process.env.BLOGCMS_ADMIN_EMAIL);
        const password = readOption(["--password"], process.env.BLOGCMS_ADMIN_PASSWORD);

        if (!siteUrl || !email || !password) {
          print(
            "Set BLOGCMS_SITE_URL, then run `blogcms login --email <email> --password <password>` to create an API token.",
          );
          return;
        }

        const session = await adminLogin(siteUrl, email, password);
        const response = await apiFetchWithCookie(siteUrl, session.cookie, "/api/tokens", {
          method: "POST",
          body: {
            name: "CLI automation token",
            scopes: [
              "posts:read",
              "posts:write",
              "posts:publish",
              "assets:write",
              "comments:moderate",
              "site:read",
              "site:write",
              "export:read",
            ],
          },
        });

        print(JSON.stringify({ siteUrl, apiToken: response.secret }, null, 2));
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
        const payload = await importPayloadFor(args[0]);

        if (!api) {
          print(`Prepared import for ${args[0]}. Configure API env to send it to ${endpoint}.`);
          return;
        }

        const response = await apiFetch(api, endpoint, {
          method: "POST",
          body: payload,
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

        const filePath = await firstUploadPath(args[0]);
        const filename = basename(filePath);
        const content = await readFile(filePath);
        const response = await apiFetch(api, "/api/assets", {
          method: "POST",
          body: {
            filename,
            contentType: contentTypeFor(filename),
            contentBase64: content.toString("base64"),
          },
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
    "site",
    {
      summary: "Read or update site settings",
      run: async () => {
        const subcommand = args[0];
        const api = getApiConfig();

        if (!api) {
          fail("Set BLOGCMS_SITE_URL and BLOGCMS_API_TOKEN to manage site settings.");
        }

        if (subcommand === "get") {
          const response = await apiFetch(api, "/api/site", { method: "GET" });
          print(JSON.stringify(response, null, 2));
          return;
        }

        if (subcommand === "update") {
          const configPath = readOption(["--config"], undefined);

          if (!configPath) {
            fail("Use `blogcms site update --config <site.config.json>`.");
          }

          const response = await apiFetch(api, "/api/site", {
            method: "PUT",
            body: await readJsonFile(configPath),
          });
          print(JSON.stringify(response, null, 2));
          return;
        }

        fail("Use `blogcms site get` or `blogcms site update --config <site.config.json>`.");
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
      run: async () => {
        const subcommand = args[0];

        if (subcommand === "create") {
          const siteUrl = getSiteUrl();

          if (!siteUrl) {
            print("Set BLOGCMS_SITE_URL to create an admin user through the deployed API.");
            return;
          }

          const api = getApiConfig();
          const body = {
            name: readOption(["--name"], process.env.BLOGCMS_ADMIN_NAME ?? "Admin"),
            email: readOption(["--email"], process.env.BLOGCMS_ADMIN_EMAIL),
            password: readOption(["--password"], process.env.BLOGCMS_ADMIN_PASSWORD),
          };

          if (!body.email || !body.password) {
            fail("Use `blogcms admin create --email <email> --password <password>`.");
          }

          const response = await siteFetch(siteUrl, "/api/admin/users", {
            method: "POST",
            token: api?.token,
            body,
          });
          print(JSON.stringify(response, null, 2));
          return;
        }

        if (subcommand === "reset-password") {
          const api = getApiConfig();

          if (!api) {
            fail("Set BLOGCMS_SITE_URL and BLOGCMS_API_TOKEN to reset an admin password.");
          }

          const body = {
            email: readOption(["--email"], process.env.BLOGCMS_ADMIN_EMAIL),
            password: readOption(["--password"], process.env.BLOGCMS_ADMIN_PASSWORD),
          };

          if (!body.email || !body.password) {
            fail("Use `blogcms admin reset-password --email <email> --password <password>`.");
          }

          const response = await apiFetch(api, "/api/admin/password", {
            method: "PATCH",
            body,
          });
          print(JSON.stringify(response, null, 2));
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
  const siteUrl = getSiteUrl();
  const token = process.env.BLOGCMS_API_TOKEN;

  if (!siteUrl || !token) {
    return null;
  }

  return { siteUrl: siteUrl.replace(/\/$/, ""), token };
}

function getSiteUrl() {
  return process.env.BLOGCMS_SITE_URL?.replace(/\/$/, "") || null;
}

async function apiFetch(api, pathname, options) {
  return siteFetch(api.siteUrl, pathname, {
    ...options,
    token: api.token,
  });
}

async function siteFetch(siteUrl, pathname, options) {
  const headers = {
    "content-type": "application/json",
  };

  if (options.token) {
    headers.authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${siteUrl}${pathname}`, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json();

  if (!response.ok) {
    fail(JSON.stringify(payload, null, 2));
  }

  return payload;
}

async function adminLogin(siteUrl, email, password) {
  const response = await fetch(`${siteUrl}/api/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json();

  if (!response.ok) {
    fail(JSON.stringify(payload, null, 2));
  }

  const cookie = response.headers.get("set-cookie")?.split(";")[0];

  if (!cookie) {
    fail("Login did not return a session cookie.");
  }

  return { payload, cookie };
}

async function apiFetchWithCookie(siteUrl, cookie, pathname, options) {
  const response = await fetch(`${siteUrl}${pathname}`, {
    method: options.method,
    headers: {
      "content-type": "application/json",
      cookie,
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

async function firstUploadPath(inputPath) {
  const stats = await stat(inputPath);

  if (stats.isFile()) {
    return inputPath;
  }

  const entries = await readdir(inputPath);
  const upload = entries.find((entry) =>
    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(extname(entry).toLowerCase()),
  );

  if (!upload) {
    fail("Folder must contain at least one image file.");
  }

  return join(inputPath, upload);
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

async function importPayloadFor(inputPath) {
  const filename = basename(inputPath);
  const extension = extname(inputPath).toLowerCase();
  const content = await readFile(inputPath);

  if (extension === ".zip") {
    return {
      filename,
      contentBase64: content.toString("base64"),
    };
  }

  if (extension === ".html" || extension === ".htm") {
    return {
      filename,
      contentHtml: content.toString("utf8"),
    };
  }

  return {
    filename,
    contentMarkdown: content.toString("utf8"),
  };
}

async function readJsonFile(inputPath) {
  try {
    return JSON.parse(await readFile(inputPath, "utf8"));
  } catch (error) {
    fail(error instanceof Error ? error.message : `Could not read ${inputPath}`);
  }
}

function contentTypeFor(filename) {
  const extension = extname(filename).toLowerCase();

  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".png") return "image/png";
  if (extension === ".gif") return "image/gif";
  if (extension === ".webp") return "image/webp";
  if (extension === ".svg") return "image/svg+xml";

  return "application/octet-stream";
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
