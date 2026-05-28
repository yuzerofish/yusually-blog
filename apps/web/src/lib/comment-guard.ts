import "@tanstack/react-start/server-only";
import { env } from "cloudflare:workers";

const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_PER_IP = 5;
const RATE_LIMIT_PER_POST = 3;

type CommentGuardResult = { ok: true } | { ok: false; error: string };

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip") ??
    forwardedFor ??
    request.headers.get("x-real-ip") ??
    "local"
  );
}

export async function checkCommentRateLimit({
  ip,
  postSlug,
}: {
  ip: string;
  postSlug: string;
}): Promise<CommentGuardResult> {
  const ipKey = `ratelimit:ip:${ip}`;
  const postKey = `ratelimit:post:${postSlug}:${ip}`;

  const [rawIpCount, rawPostCount] = await Promise.all([
    env.CMS_CACHE.get(ipKey, "json").catch(() => 0),
    env.CMS_CACHE.get(postKey, "json").catch(() => 0),
  ]);
  const ipCount = Number(rawIpCount ?? 0);
  const postCount = Number(rawPostCount ?? 0);

  if (ipCount >= RATE_LIMIT_PER_IP || postCount >= RATE_LIMIT_PER_POST) {
    return { ok: false, error: "Too many comments submitted recently" };
  }

  // Fire-and-forget increment — approximate rate limiting (KV is eventually consistent)
  await Promise.all([
    env.CMS_CACHE.put(ipKey, JSON.stringify(ipCount + 1), {
      expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
    }),
    env.CMS_CACHE.put(postKey, JSON.stringify(postCount + 1), {
      expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
    }),
  ]).catch(() => {});

  return { ok: true };
}

export async function verifyTurnstile({
  token,
  request,
}: {
  token: string | undefined;
  request: Request;
}): Promise<CommentGuardResult> {
  const secret = env.CMS_TURNSTILE_SECRET_KEY?.trim();
  const siteKey = env.VITE_TURNSTILE_SITE_KEY?.trim();

  if (!secret || !siteKey) {
    return { ok: true };
  }

  if (!token) {
    return { ok: false, error: "Turnstile token is required" };
  }

  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  formData.set("remoteip", getClientIp(request));

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });
  const payload = (await response.json()) as { success?: boolean };

  return payload.success ? { ok: true } : { ok: false, error: "Turnstile verification failed" };
}
