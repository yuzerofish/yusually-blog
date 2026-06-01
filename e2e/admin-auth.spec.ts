import { expect, test, type APIResponse, type Page } from "@playwright/test";

const localAdmin = {
  email: process.env.BLOGCMS_LOCAL_ADMIN_EMAIL ?? "a@a.test",
  password: process.env.BLOGCMS_LOCAL_ADMIN_PASSWORD ?? "1",
};
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${process.env.PLAYWRIGHT_PORT ?? "3000"}`;

const adminRoutes = [
  { path: "/admin", heading: "Publishing overview" },
  { path: "/admin/posts", heading: "Posts" },
  { path: "/admin/series", heading: "Series" },
  { path: "/admin/assets", heading: "Assets" },
  { path: "/admin/comments", heading: "Comments" },
  { path: "/admin/users", heading: "Users" },
  { path: "/admin/settings", heading: "Site settings" },
] as const;

test.describe("Admin authentication", () => {
  test("rejects anonymous access to admin UI and APIs", async ({ page, request }) => {
    const meResponse = await request.get(
      "/api/admin/me?disableCookieCache=true&disableRefresh=true",
    );
    expect(meResponse.status()).toBe(401);

    const usersResponse = await request.get("/api/admin/users");
    expect(usersResponse.status()).toBe(401);

    const pageResponse = await page.goto("/admin", { waitUntil: "domcontentloaded" });
    expect(pageResponse?.status()).toBeLessThan(500);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();
  });

  test("logs in as the local admin and loads core admin pages", async ({ page }) => {
    await logInAsLocalAdmin(page);

    const meResponse = await page
      .context()
      .request.get("/api/admin/me?disableCookieCache=true&disableRefresh=true");
    expect(meResponse.status()).toBe(200);
    await expectAdminPayload(meResponse);

    const usersResponse = await page.context().request.get("/api/admin/users");
    expect(usersResponse.status()).toBe(200);

    for (const route of adminRoutes) {
      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${route.path} should not return a server error`).toBeLessThan(
        500,
      );
      await expect(page.getByRole("heading", { name: route.heading }).first()).toBeVisible();
    }
  });

  test("loads the new post editor without client runtime errors", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await logInAsLocalAdmin(page);

    const response = await page.goto("/admin/posts/new", { waitUntil: "domcontentloaded" });
    expect(response?.status(), "new post editor should not return a server error").toBeLessThan(
      500,
    );
    await expect(page.getByRole("heading", { name: "New post" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Editor" })).toBeVisible();
    await expect(page.locator('[contenteditable="true"]').first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText("Something went wrong")).toHaveCount(0);
    expect(pageErrors).toEqual([]);
  });

  test("logs in with the native form fallback", async ({ browser }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/login", { waitUntil: "domcontentloaded" });
    await expect(page.locator('form[action="/api/account/login"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    await page.locator("#email").fill(localAdmin.email);
    await page.locator("#password").fill(localAdmin.password);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/app\/?$/);
    await expect(page.getByRole("heading", { name: "Account" })).toBeVisible();
    await page.getByRole("button", { name: /Open admin/ }).click();
    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByRole("heading", { name: "Publishing overview" })).toBeVisible();

    await context.close();
  });

  test("signs out of the admin shell", async ({ page }) => {
    await logInAsLocalAdmin(page);

    await page.getByRole("button", { name: "Sign out" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: /Welcome back/ })).toBeVisible();

    const meResponse = await page
      .context()
      .request.get("/api/admin/me?disableCookieCache=true&disableRefresh=true");
    expect(meResponse.status()).toBe(401);
  });
});

async function logInAsLocalAdmin(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(localAdmin.email);
  await page.getByLabel("Password").fill(localAdmin.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/app\/?$/);
  await expect(page.getByRole("heading", { name: "Account" })).toBeVisible();
  await page.getByRole("button", { name: /Open admin/ }).click();
  await expect(page).toHaveURL(/\/admin\/?$/);
  await expect(page.getByRole("heading", { name: "Publishing overview" })).toBeVisible();
}

async function expectAdminPayload(response: APIResponse) {
  const payload = (await response.json()) as {
    data?: {
      email?: string;
      role?: string;
    };
  };

  expect(payload.data).toMatchObject({
    email: localAdmin.email,
    role: "admin",
  });
}
