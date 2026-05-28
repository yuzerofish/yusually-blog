import { expect, test, type Page } from "@playwright/test";

const localAdmin = {
  email: process.env.BLOGCMS_LOCAL_ADMIN_EMAIL ?? "a@a.test",
  password: process.env.BLOGCMS_LOCAL_ADMIN_PASSWORD ?? "1",
};

test.describe("Comments", () => {
  test("submits a reader comment and shows it after admin approval", async ({ page }) => {
    test.setTimeout(120_000);

    const runId = `${Date.now()}-${test.info().parallelIndex}`;
    const postTitle = `E2E comment flow ${runId}`;
    const postSlug = `e2e-comment-flow-${runId}`;
    const readerName = `E2E Reader ${runId}`;
    const readerEmail = `reader-${runId}@example.test`;
    const commentBody = `E2E visible comment ${runId}`;
    const clientIp = `2001:db8::${runId.replaceAll("-", "")}`;

    await logInAsLocalAdmin(page);
    await ensureCommentSettings(page);

    const createPostResponse = await page.context().request.post("/api/posts", {
      data: {
        title: postTitle,
        slug: postSlug,
        excerpt: "Post used by the Playwright comment flow.",
        contentMarkdown: `# ${postTitle}\n\nThis post is created by the comment e2e flow.`,
        status: "published",
        commentsEnabled: true,
      },
    });
    expect(createPostResponse.status()).toBe(201);

    await page.context().clearCookies();
    await page.route("**/api/comments", async (route) => {
      await route.continue({
        headers: {
          ...route.request().headers(),
          "x-forwarded-for": clientIp,
        },
      });
    });

    await page.goto(`/blog/${postSlug}#comments`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: postTitle })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();

    await page.getByRole("button", { name: "Create email account" }).click();
    await page.locator("#comment-auth-name").fill(readerName);
    await page.locator("#comment-auth-email").fill(readerEmail);
    await page.locator("#comment-auth-password").fill("password123");
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByText(`Commenting as ${readerName}`)).toBeVisible();

    const createCommentResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/comments") && response.request().method() === "POST",
    );
    await page.locator("#comment-body").fill(commentBody);
    await page.getByRole("button", { name: "Submit comment" }).click();

    const commentResponse = await createCommentResponse;
    expect(commentResponse.status()).toBe(201);
    await expect(page.getByText("Comment submitted.")).toBeVisible();

    await page.context().clearCookies();
    await logInAsLocalAdmin(page);
    const commentsResponse = await page.context().request.get("/api/comments");
    expect(commentsResponse.status()).toBe(200);
    const commentsPayload = (await commentsResponse.json()) as {
      data?: Array<{
        id?: string;
        body?: string;
      }>;
    };
    const persistedComment = commentsPayload.data?.find((comment) => comment.body === commentBody);
    expect(persistedComment?.id).toBeTruthy();

    const approveResponse = await page
      .context()
      .request.post(`/api/comments/${persistedComment?.id}/approve`);
    expect(approveResponse.status()).toBe(200);

    await page.context().clearCookies();
    await page.goto(`/blog/${postSlug}#comments`, { waitUntil: "domcontentloaded" });
    await expect(page.getByText(readerName)).toBeVisible();
    await expect(page.getByText(commentBody)).toBeVisible();
  });
});

async function logInAsLocalAdmin(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(localAdmin.email);
  await page.getByLabel("Password").fill(localAdmin.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/admin\/?$/);
  await expect(page.getByRole("heading", { name: "Publishing overview" })).toBeVisible();
}

async function ensureCommentSettings(page: Page) {
  const response = await page.context().request.put("/api/site", {
    data: {
      commentsEnabled: true,
      commentsRequireApproval: true,
      emailVerificationEnabled: false,
    },
  });

  expect(response.status()).toBe(200);
}
