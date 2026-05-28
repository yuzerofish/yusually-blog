#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";

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
  blogcms push <markdown-file-folder-or-json>
  blogcms import <zip-or-html>
  blogcms upload <images-folder>
  blogcms export [--format json|zip] [--output backup.zip]
  blogcms backup
  blogcms site get
  blogcms site update --config <site.config.json>
  blogcms deploy [--target main] [--skip-build] [--skip-migrations] [--dry-run]
  blogcms admin create
  blogcms admin reset-password
  blogcms admin request-password-reset
  blogcms admin confirm-password-reset

Environment:
  BLOGCMS_SITE_URL
  BLOGCMS_API_TOKEN
  BLOGCMS_PRIMARY_LANGUAGE=en|zh
  BLOGCMS_DEPLOY_TARGET=main
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
      summary: "Store an API token for a 01mvp-blog-starter site",
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
      summary: "Publish Markdown or JSON through the API",
      run: async () => {
        requireArg(args[0], "Provide a Markdown file, Markdown folder, or JSON post payload.");
        const input = await readPostInput(args[0]);
        const api = getApiConfig();

        if (!api) {
          print(`Prepared post import for ${args[0]}. Configure API env to publish.`);
          return;
        }

        const response = await apiFetch(api, "/api/posts", {
          method: "POST",
          body: {
            title: input.title,
            slug: input.slug,
            excerpt: input.excerpt,
            contentMarkdown: input.contentMarkdown,
            status: input.status ?? "published",
            publishedAt: input.publishedAt,
            locale: input.locale,
            i18n: input.i18n,
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
        const { endpoint, body } = await importPayloadFor(args[0]);

        if (!api) {
          print(`Prepared import for ${args[0]}. Configure API env to send it to ${endpoint}.`);
          return;
        }

        const response = await apiFetch(api, endpoint, {
          method: "POST",
          body,
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
        const filePaths = await uploadPaths(args[0]);

        if (!api) {
          print(
            `Prepared ${filePaths.length} asset upload${filePaths.length === 1 ? "" : "s"} for ${args[0]}. Configure API env to upload assets.`,
          );
          return;
        }

        const responses = [];

        for (const filePath of filePaths) {
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

          responses.push(response.data);
        }

        print(JSON.stringify({ data: responses }, null, 2));
      },
    },
  ],
  [
    "export",
    {
      summary: "Export posts, assets, comments, and settings",
      run: async () => {
        const api = getApiConfig();
        const format = readOption(["--format"], "json");

        if (!api) {
          print(
            `Prepared site export as ${format}. Configure API env to fetch the export payload.`,
          );
          return;
        }

        if (format === "zip") {
          const response = await apiFetchRaw(api, "/api/export?format=zip", { method: "GET" });
          const arrayBuffer = await response.arrayBuffer();
          const outputPath =
            readOption(["--output", "-o"], undefined) ?? filenameFromResponse(response);

          await mkdir(dirname(outputPath), { recursive: true });
          await writeFile(outputPath, Buffer.from(arrayBuffer));
          print(
            JSON.stringify(
              {
                output: outputPath,
                sizeBytes: arrayBuffer.byteLength,
                backupKey: response.headers.get("x-blogcms-backup-key") || null,
                exportedAt: response.headers.get("x-blogcms-exported-at") || null,
              },
              null,
              2,
            ),
          );
          return;
        }

        if (format !== "json") {
          fail("Export format must be `json` or `zip`.");
        }

        const response = await apiFetch(api, "/api/export", { method: "GET" });
        print(JSON.stringify(response, null, 2));
      },
    },
  ],
  [
    "backup",
    {
      summary: "Create an R2 ZIP backup through the API",
      run: async () => {
        const api = getApiConfig();

        if (!api) {
          print("Prepared R2 backup. Configure API env to create it.");
          return;
        }

        const response = await apiFetch(api, "/api/backups", { method: "POST" });
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
      run: async () => {
        const plan = deployPlan();

        if (hasFlag(["--dry-run"])) {
          print(
            JSON.stringify(
              {
                target: plan.target,
                config: plan.config,
                generatedConfig: plan.generatedConfig,
                database: plan.database,
                steps: plan.steps,
              },
              null,
              2,
            ),
          );
          return;
        }

        if (plan.steps.length === 0) {
          print(
            JSON.stringify(
              {
                target: plan.target,
                skipped: true,
              },
              null,
              2,
            ),
          );
          return;
        }

        for (const step of plan.steps) {
          await runDeployStep(step);
        }

        print(
          JSON.stringify(
            {
              target: plan.target,
              config: plan.config,
              deployed: !hasFlag(["--skip-deploy"]),
              migrated: !hasFlag(["--skip-migrations"]),
            },
            null,
            2,
          ),
        );
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

        if (subcommand === "request-password-reset") {
          const siteUrl = getSiteUrl();

          if (!siteUrl) {
            fail("Set BLOGCMS_SITE_URL to request a password reset email.");
          }

          const email = readOption(["--email"], process.env.BLOGCMS_ADMIN_EMAIL);

          if (!email) {
            fail("Use `blogcms admin request-password-reset --email <email>`.");
          }

          const response = await siteFetch(siteUrl, "/api/admin/password-reset", {
            method: "POST",
            body: { email },
          });
          print(JSON.stringify(response, null, 2));
          return;
        }

        if (subcommand === "confirm-password-reset") {
          const siteUrl = getSiteUrl();

          if (!siteUrl) {
            fail("Set BLOGCMS_SITE_URL to confirm a password reset.");
          }

          const body = {
            token: readOption(["--token"], process.env.BLOGCMS_PASSWORD_RESET_TOKEN),
            password: readOption(["--password"], process.env.BLOGCMS_ADMIN_PASSWORD),
          };

          if (!body.token || !body.password) {
            fail(
              "Use `blogcms admin confirm-password-reset --token <token> --password <password>`.",
            );
          }

          const response = await siteFetch(siteUrl, "/api/admin/password-reset", {
            method: "POST",
            body,
          });
          print(JSON.stringify(response, null, 2));
          return;
        }

        fail(
          "Use `blogcms admin create`, `blogcms admin reset-password`, `blogcms admin request-password-reset`, or `blogcms admin confirm-password-reset`.",
        );
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
    const inline = args.find((arg) => arg.startsWith(`${name}=`));

    if (inline) {
      return inline.slice(name.length + 1) || fallback;
    }

    const index = args.indexOf(name);
    if (index !== -1) {
      return args[index + 1] ?? fallback;
    }
  }

  return fallback;
}

function hasFlag(names) {
  return names.some((name) => args.includes(name));
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

function deployPlan() {
  const target = normalizedDeployTarget(
    readOption(["--target"], process.env.BLOGCMS_DEPLOY_TARGET ?? "main"),
  );
  const generatedConfig = "dist/server/wrangler.json";
  const steps = [];

  if (!hasFlag(["--skip-build"])) {
    steps.push({
      name: "build",
      command: ["pnpm", target.buildScript],
    });
  }

  if (!hasFlag(["--skip-migrations"])) {
    steps.push({
      name: "migrate",
      command: [
        "pnpm",
        "--filter",
        "@repo/web",
        "exec",
        "wrangler",
        "d1",
        "migrations",
        "apply",
        target.database,
        "--remote",
        "--config",
        target.config,
      ],
    });
  }

  if (!hasFlag(["--skip-deploy"])) {
    steps.push({
      name: "deploy",
      command: [
        "pnpm",
        "--filter",
        "@repo/web",
        "exec",
        "wrangler",
        "deploy",
        "--config",
        generatedConfig,
      ],
    });
  }

  return {
    target: target.name,
    config: `apps/web/${target.config}`,
    generatedConfig: `apps/web/${generatedConfig}`,
    database: target.database,
    steps,
  };
}

function normalizedDeployTarget(value) {
  if (value === "main" || value === "template" || value === "production") {
    return {
      name: "main",
      buildScript: "build:web",
      config: "wrangler.jsonc",
      database: "blog-starter-cms",
    };
  }

  fail("Deploy target must be `main`.");
}

async function runDeployStep(step) {
  print(`$ ${step.command.join(" ")}`);

  const exitCode = await new Promise((resolve) => {
    const child = spawn(step.command[0], step.command.slice(1), {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", (error) => {
      process.stderr.write(`${error.message}\n`);
      resolve(1);
    });
    child.on("close", (code, signal) => {
      resolve(code ?? (signal ? 1 : 0));
    });
  });

  if (exitCode !== 0) {
    fail(`Deploy step failed: ${step.name}`);
  }
}

async function apiFetch(api, pathname, options) {
  return siteFetch(api.siteUrl, pathname, {
    ...options,
    token: api.token,
  });
}

async function apiFetchRaw(api, pathname, options) {
  const response = await fetch(`${api.siteUrl}${pathname}`, {
    method: options.method,
    headers: {
      authorization: `Bearer ${api.token}`,
    },
  });

  if (!response.ok) {
    const payload = await response.text();
    fail(payload || `Request failed with ${response.status}`);
  }

  return response;
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

function filenameFromResponse(response) {
  const disposition = response.headers.get("content-disposition") ?? "";
  const match = /filename="([^"]+)"/i.exec(disposition);

  return match?.[1] ?? "01mvp-blog-starter-export.zip";
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

async function readPostInput(inputPath) {
  if (extname(inputPath).toLowerCase() === ".json") {
    return readJsonFile(inputPath);
  }

  return readMarkdownInput(inputPath);
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

async function uploadPaths(inputPath) {
  const stats = await stat(inputPath);

  if (stats.isFile()) {
    return [inputPath];
  }

  const files = [];

  await collectUploadPaths(inputPath, files);

  if (!files.length) {
    fail("Folder must contain at least one supported image file.");
  }

  return files;
}

async function collectUploadPaths(currentPath, files) {
  const entries = await readdir(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = join(currentPath, entry.name);

    if (entry.isDirectory()) {
      await collectUploadPaths(fullPath, files);
      continue;
    }

    if (entry.isFile() && isUploadFilename(entry.name)) {
      files.push(fullPath);
    }
  }
}

function isUploadFilename(filename) {
  return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(
    extname(filename).toLowerCase(),
  );
}

function firstHeading(markdown) {
  return markdown
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();
}

async function importPayloadFor(inputPath) {
  const stats = await stat(inputPath);

  if (stats.isDirectory()) {
    return {
      endpoint: "/api/import/zip",
      body: {
        filename: basename(inputPath),
        files: await readImportFolder(inputPath),
      },
    };
  }

  const filename = basename(inputPath);
  const extension = extname(inputPath).toLowerCase();
  const content = await readFile(inputPath);

  if (extension === ".zip") {
    return {
      endpoint: "/api/import/zip",
      body: {
        filename,
        contentBase64: content.toString("base64"),
      },
    };
  }

  if (extension === ".html" || extension === ".htm") {
    return {
      endpoint: "/api/import/html",
      body: {
        filename,
        contentHtml: content.toString("utf8"),
      },
    };
  }

  return {
    endpoint: "/api/import/markdown",
    body: {
      filename,
      contentMarkdown: content.toString("utf8"),
    },
  };
}

async function readImportFolder(rootPath) {
  const files = [];

  await collectImportFiles(rootPath, rootPath, files);

  return files;
}

async function collectImportFiles(rootPath, currentPath, files) {
  const entries = await readdir(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const fullPath = join(currentPath, entry.name);

    if (entry.isDirectory()) {
      await collectImportFiles(rootPath, fullPath, files);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const content = await readFile(fullPath);

    files.push({
      path: relative(rootPath, fullPath).replace(/\\/g, "/"),
      contentType: contentTypeFor(entry.name),
      contentBase64: content.toString("base64"),
    });
  }
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
  if (extension === ".md" || extension === ".mdx") return "text/markdown; charset=utf-8";
  if (extension === ".html" || extension === ".htm") return "text/html; charset=utf-8";
  if (extension === ".zip") return "application/zip";

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
