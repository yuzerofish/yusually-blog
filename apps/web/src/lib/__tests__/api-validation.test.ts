import { describe, it, expect } from "vitest";

import { CreateCommentSchema, validateBody } from "../api-validation";

describe("CreateCommentSchema", () => {
  const validComment = {
    postSlug: "my-post",
    body: "This is a great article!",
    turnstileToken: "cf-turnstile-token-123",
  };

  it("accepts a valid minimal comment", () => {
    const result = CreateCommentSchema.safeParse(validComment);
    expect(result.success).toBe(true);
  });

  it("accepts optional fields when provided", () => {
    const result = CreateCommentSchema.safeParse({
      ...validComment,
      authorWebsite: "https://example.com",
      parentId: "comment-abc",
      honeypot: "",
    });
    expect(result.success).toBe(true);
  });

  it("defaults honeypot to empty string when omitted", () => {
    const result = CreateCommentSchema.safeParse(validComment);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.honeypot).toBe("");
    }
  });

  it("rejects when postSlug is empty", () => {
    const result = CreateCommentSchema.safeParse({ ...validComment, postSlug: "" });
    expect(result.success).toBe(false);
  });

  it("rejects when body is too short (1 char)", () => {
    const result = CreateCommentSchema.safeParse({ ...validComment, body: "x" });
    expect(result.success).toBe(false);
  });

  it("rejects when body exceeds 4000 characters", () => {
    const result = CreateCommentSchema.safeParse({
      ...validComment,
      body: "a".repeat(4001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects when postSlug exceeds 200 characters", () => {
    const result = CreateCommentSchema.safeParse({
      ...validComment,
      postSlug: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects when turnstileToken is empty", () => {
    const result = CreateCommentSchema.safeParse({ ...validComment, turnstileToken: "" });
    expect(result.success).toBe(false);
  });

  it("rejects when turnstileToken is missing", () => {
    const { turnstileToken: _turnstileToken, ...noToken } = validComment;
    const result = CreateCommentSchema.safeParse(noToken);
    expect(result.success).toBe(false);
  });

  it("rejects invalid authorWebsite URL", () => {
    const result = CreateCommentSchema.safeParse({
      ...validComment,
      authorWebsite: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty string for authorWebsite", () => {
    const result = CreateCommentSchema.safeParse({
      ...validComment,
      authorWebsite: "",
    });
    expect(result.success).toBe(true);
  });
});

describe("validateBody", () => {
  const schema = CreateCommentSchema;

  it("returns [data, null] for valid input", () => {
    const input = {
      postSlug: "post",
      body: "Hello world!",
      turnstileToken: "token",
    };
    const [data, error] = validateBody(schema, input);
    expect(data).toBeDefined();
    expect(error).toBeNull();
    expect(data!.postSlug).toBe("post");
  });

  it("returns [null, Response] for invalid input", () => {
    const [data, error] = validateBody(schema, { postSlug: "" });
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Response);
  });

  it("error response has status 400", async () => {
    const [, error] = validateBody(schema, {});
    expect(error).toBeInstanceOf(Response);
    expect(error!.status).toBe(400);
  });

  it("error response body contains validation details", async () => {
    const [, error] = validateBody(schema, { postSlug: "" });
    const body = (await error!.json()) as {
      error: string;
      details: Array<{ path: string; message: string }>;
    };
    expect(body.error).toBe("Validation failed");
    expect(body.details).toBeInstanceOf(Array);
    expect(body.details.length).toBeGreaterThan(0);
    expect(body.details[0]).toHaveProperty("path");
    expect(body.details[0]).toHaveProperty("message");
  });

  it("error details include the correct field path", async () => {
    const [, error] = validateBody(schema, { postSlug: "ok", body: "x", turnstileToken: "" });
    const body = (await error!.json()) as { details: Array<{ path: string }> };
    const paths = body.details.map((d) => d.path);
    expect(paths).toContain("turnstileToken");
    expect(paths).toContain("body");
  });
});
