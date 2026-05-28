import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock runtime-only modules before importing the module under test
vi.mock("@tanstack/react-start/server-only", () => ({}));

const mockCacheStore = new Map<string, string>();
const mockEnv = { CMS_CACHE: null as any, CMS_TURNSTILE_SECRET_KEY: "" };

vi.mock("cloudflare:workers", () => ({
  get env() {
    return mockEnv;
  },
}));

// Import after mocks are set up
import { getClientIp, checkCommentRateLimit, verifyTurnstile } from "../comment-guard";

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/test", { headers });
}

describe("getClientIp", () => {
  it("prefers cf-connecting-ip over other headers", () => {
    const req = makeRequest({
      "cf-connecting-ip": "1.2.3.4",
      "x-forwarded-for": "5.6.7.8",
      "x-real-ip": "9.10.11.12",
    });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("falls back to x-forwarded-for (first entry) when cf-connecting-ip is absent", () => {
    const req = makeRequest({ "x-forwarded-for": "10.0.0.1, 10.0.0.2, 10.0.0.3" });
    expect(getClientIp(req)).toBe("10.0.0.1");
  });

  it("falls back to x-real-ip when cf-connecting-ip and x-forwarded-for are absent", () => {
    const req = makeRequest({ "x-real-ip": "192.168.1.1" });
    expect(getClientIp(req)).toBe("192.168.1.1");
  });

  it('returns "local" when no IP headers are present', () => {
    const req = makeRequest({});
    expect(getClientIp(req)).toBe("local");
  });

  it("trims whitespace from x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "  10.0.0.99 , 10.0.0.1" });
    expect(getClientIp(req)).toBe("10.0.0.99");
  });
});

describe("checkCommentRateLimit", () => {
  beforeEach(() => {
    mockCacheStore.clear();
    mockEnv.CMS_CACHE = {
      get: vi.fn(async (key: string) => mockCacheStore.get(key) ?? null),
      put: vi.fn(async (key: string, value: string) => {
        mockCacheStore.set(key, value);
      }),
    };
  });

  it("allows comments when no prior rate-limit data exists", async () => {
    const result = await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(result).toEqual({ ok: true });
  });

  it("blocks when IP rate limit (5) is exceeded", async () => {
    mockCacheStore.set("ratelimit:ip:1.2.3.4", "5");
    const result = await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(result).toEqual({ ok: false, error: "Too many comments submitted recently" });
  });

  it("blocks when per-post rate limit (3) is exceeded", async () => {
    mockCacheStore.set("ratelimit:post:post-1:1.2.3.4", "3");
    const result = await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(result).toEqual({ ok: false, error: "Too many comments submitted recently" });
  });

  it("allows when IP count is below limit", async () => {
    mockCacheStore.set("ratelimit:ip:1.2.3.4", "4");
    const result = await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(result).toEqual({ ok: true });
  });

  it("increments both KV keys on success", async () => {
    await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(mockCacheStore.get("ratelimit:ip:1.2.3.4")).toBe("1");
    expect(mockCacheStore.get("ratelimit:post:post-1:1.2.3.4")).toBe("1");
  });

  it("handles KV get errors gracefully (returns 0)", async () => {
    mockEnv.CMS_CACHE = {
      get: vi.fn(async () => {
        throw new Error("KV unavailable");
      }),
      put: vi.fn(async () => {}),
    };
    const result = await checkCommentRateLimit({ ip: "1.2.3.4", postSlug: "post-1" });
    expect(result).toEqual({ ok: true });
  });
});

describe("verifyTurnstile", () => {
  const mockFetch = vi.fn();
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockReset();
    globalThis.fetch = mockFetch;
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("skips verification when no secret key is configured", async () => {
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "";
    const result = await verifyTurnstile({ token: "any-token", request: makeRequest() });
    expect(result).toEqual({ ok: true });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("skips verification when secret key is whitespace only", async () => {
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "   ";
    const result = await verifyTurnstile({ token: "any-token", request: makeRequest() });
    expect(result).toEqual({ ok: true });
  });

  it("rejects when token is undefined", async () => {
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "secret-key";
    const result = await verifyTurnstile({ token: undefined, request: makeRequest() });
    expect(result).toEqual({ ok: false, error: "Turnstile token is required" });
  });

  it("returns ok when Turnstile API responds with success", async () => {
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "secret-key";
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    const result = await verifyTurnstile({ token: "valid-token", request: makeRequest() });
    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("returns error when Turnstile API responds with failure", async () => {
    mockEnv.CMS_TURNSTILE_SECRET_KEY = "secret-key";
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });
    const result = await verifyTurnstile({ token: "bad-token", request: makeRequest() });
    expect(result).toEqual({ ok: false, error: "Turnstile verification failed" });
  });
});
