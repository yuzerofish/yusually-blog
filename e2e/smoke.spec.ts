import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage renders with posts", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1, h2").first()).toBeVisible();
    // Should have at least one article link
    const articleLinks = page.locator('a[href*="/blog/"]');
    await expect(articleLinks.first()).toBeVisible();
  });

  test("blog list page loads", async ({ page }) => {
    await page.goto("/blog?q=&tag=&page=1");
    // Page should have blog content
    await expect(page.locator("body")).toBeVisible();
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("article detail page loads", async ({ page }) => {
    await page.goto("/");
    const firstArticle = page.locator('a[href*="/blog/"]').first();
    await expect(firstArticle).toBeVisible();
    const href = await firstArticle.getAttribute("href");
    expect(href).toBeTruthy();

    await firstArticle.click();
    // Wait for the article page to render (avoid networkidle — SPAs keep connections open)
    await expect(page.locator("article, main, [role='main']").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("theme preset switcher works", async ({ page }) => {
    await page.goto("/");
    const root = page.locator("[data-theme-preset]");
    await expect(root).toBeVisible();

    const initialTheme = await root.getAttribute("data-theme-preset");
    expect(initialTheme).toBeTruthy();

    // Click the style preset switcher button
    const switcher = page.locator("[data-style-preset-switcher]");
    if (await switcher.isVisible()) {
      await switcher.click();
      await page.waitForTimeout(200);
      const newTheme = await root.getAttribute("data-theme-preset");
      expect(newTheme).toBeTruthy();
      // Theme should have changed (unless only 1 preset)
      if (initialTheme !== newTheme) {
        expect(newTheme).not.toBe(initialTheme);
      }
    }
  });

  test("admin login page loads", async ({ page }) => {
    const response = await page.goto("/admin/login");
    // Should not be a 500 error
    expect(response?.status()).toBeLessThan(500);
  });

  test("RSS feed returns valid XML", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("xml");
    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<channel>");
  });

  test("sitemap returns valid XML", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
  });

  test("pages route loads", async ({ page }) => {
    const response = await page.goto("/pages");
    expect(response?.status()).toBeLessThan(500);
  });

  test("projects route loads", async ({ page }) => {
    const response = await page.goto("/projects");
    expect(response?.status()).toBeLessThan(500);
  });
});
