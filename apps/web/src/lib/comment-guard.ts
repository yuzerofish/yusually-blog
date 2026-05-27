import "@tanstack/react-start/server-only";
import { env } from "cloudflare:workers";

const rateLimitWindowMs = 10 * 60 * 1000;
const perIpLimit = 5;
const perPostLimit = 3;

const buckets = new Map<string, number[]>();

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

export function checkCommentRateLimit({
  ip,
  postSlug,
}: {
  ip: string;
  postSlug: string;
}): CommentGuardResult {
  const now = Date.now();
  const ipKey = `ip:${ip}`;
  const postKey = `post:${postSlug}:${ip}`;
  const ipEvents = prune(ipKey, now);
  const postEvents = prune(postKey, now);

  if (ipEvents.length >= perIpLimit || postEvents.length >= perPostLimit) {
    return { ok: false, error: "Too many comments submitted recently" };
  }

  ipEvents.push(now);
  postEvents.push(now);
  buckets.set(ipKey, ipEvents);
  buckets.set(postKey, postEvents);

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

  if (!secret) {
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

function prune(key: string, now: number) {
  const events = buckets.get(key) ?? [];
  return events.filter((timestamp) => now - timestamp < rateLimitWindowMs);
}
