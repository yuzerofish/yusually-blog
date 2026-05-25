import { env } from "cloudflare:workers";

export type CommentUser = {
  id: string;
  name: string;
  email: string;
  emailHash: string;
  avatarUrl: string | null;
  provider: "email" | "github";
  createdAt: string;
  lastLoginAt: string | null;
};

type CommentUserRow = {
  id: string;
  name: string;
  email: string;
  email_hash: string;
  avatar_url: string | null;
  provider: "email" | "github";
  provider_account_id: string | null;
  password_hash: string | null;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

type CommentSessionRow = CommentUserRow & {
  expires_at: string;
};

type GitHubUser = {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};

const commentSessionCookie = "blog_comment_session";
const githubStateCookie = "blog_comment_github_state";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;
const githubStateMaxAgeSeconds = 60 * 10;

export async function getCommentUserFromRequest(request: Request) {
  const token = readCookie(request, commentSessionCookie);

  if (!token) {
    return null;
  }

  const row = await env.CMS_DB.prepare(
    `select
      comment_users.id, comment_users.name, comment_users.email, comment_users.email_hash,
      comment_users.avatar_url, comment_users.provider, comment_users.provider_account_id,
      comment_users.password_hash, comment_users.created_at, comment_users.updated_at,
      comment_users.last_login_at, comment_sessions.expires_at
    from comment_sessions
    join comment_users on comment_users.id = comment_sessions.user_id
    where comment_sessions.token_hash = ? and comment_sessions.expires_at > ?
    limit 1`,
  )
    .bind(await digestText(token), new Date().toISOString())
    .first<CommentSessionRow>();

  return row ? rowToCommentUser(row) : null;
}

export async function signupCommentUser(
  input: { email?: string; name?: string; password?: string },
  request: Request,
) {
  const email = normalizeEmail(input.email);
  const password = input.password ?? "";
  const name = input.name?.trim() || email.split("@")[0] || email;

  assertPassword(password);

  const existing = await getCommentUserByEmail(email);

  if (existing) {
    return { error: "Comment account already exists" } as const;
  }

  const now = new Date().toISOString();
  const row: CommentUserRow = {
    id: `comment_user_${crypto.randomUUID()}`,
    name,
    email,
    email_hash: await digestText(email),
    avatar_url: null,
    provider: "email",
    provider_account_id: null,
    password_hash: await hashPassword(password),
    created_at: now,
    updated_at: now,
    last_login_at: now,
  };

  await env.CMS_DB.prepare(
    `insert into comment_users (
      id, name, email, email_hash, avatar_url, provider, provider_account_id,
      password_hash, created_at, updated_at, last_login_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      row.id,
      row.name,
      row.email,
      row.email_hash,
      row.avatar_url,
      row.provider,
      row.provider_account_id,
      row.password_hash,
      row.created_at,
      row.updated_at,
      row.last_login_at,
    )
    .run();

  return createCommentSession(rowToCommentUser(row), request);
}

export async function loginCommentUser(
  input: { email?: string; password?: string },
  request: Request,
) {
  const user = await getCommentUserByEmail(input.email);

  if (!user?.password_hash || !(await verifyPassword(input.password ?? "", user.password_hash))) {
    return { error: "Invalid email or password" } as const;
  }

  await touchLastLogin(user.id);

  return createCommentSession(
    rowToCommentUser({ ...user, last_login_at: new Date().toISOString() }),
    request,
  );
}

export async function logoutCommentUser(request: Request) {
  const token = readCookie(request, commentSessionCookie);

  if (token) {
    await env.CMS_DB.prepare("delete from comment_sessions where token_hash = ?")
      .bind(await digestText(token))
      .run();
  }

  return {
    headers: {
      "set-cookie": serializeExpiredCookie(commentSessionCookie, request),
    },
  };
}

export function redirectToGitHubForCommentLogin(request: Request) {
  const clientId = getGitHubClientId();

  if (!clientId || !getGitHubClientSecret()) {
    return Response.json({ error: "GitHub login is not configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const redirectTo = safeRedirectPath(url.searchParams.get("redirectTo") ?? "/");
  const state = crypto.randomUUID();
  const githubUrl = new URL("https://github.com/login/oauth/authorize");

  githubUrl.searchParams.set("client_id", clientId);
  githubUrl.searchParams.set("redirect_uri", getGitHubCallbackUrl(request));
  githubUrl.searchParams.set("scope", "read:user user:email");
  githubUrl.searchParams.set("state", state);

  const response = Response.redirect(githubUrl.toString(), 302);
  response.headers.append(
    "set-cookie",
    serializeCookie(
      githubStateCookie,
      JSON.stringify({ redirectTo, state }),
      request,
      githubStateMaxAgeSeconds,
    ),
  );

  return response;
}

export async function handleGitHubCommentCallback(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const stateCookie = parseGithubState(readCookie(request, githubStateCookie));
  const expectedState = stateCookie?.state;
  const redirectPath = stateCookie?.redirectTo ?? "/";

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirectWithCommentAuthError("/", request);
  }

  const token = await exchangeGitHubCode(code, request);

  if (!token) {
    return redirectWithCommentAuthError(redirectPath, request);
  }

  const githubUser = await fetchGitHubUser(token);
  const email = await resolveGitHubEmail(token, githubUser);
  const user = await upsertGitHubCommentUser(githubUser, email);
  const session = await createCommentSession(user, request);
  const response = Response.redirect(new URL(redirectPath, request.url), 302);

  response.headers.append("set-cookie", session.headers["set-cookie"]);
  response.headers.append("set-cookie", serializeExpiredCookie(githubStateCookie, request));

  return response;
}

export function publicCommentUser(user: CommentUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    provider: user.provider,
  };
}

async function createCommentSession(user: CommentUser, request: Request) {
  const now = new Date();
  const token = `comment_${crypto.randomUUID().replace(/-/g, "")}`;
  const expiresAt = new Date(now.getTime() + sessionMaxAgeSeconds * 1000).toISOString();

  await env.CMS_DB.prepare(
    "insert into comment_sessions (id, user_id, token_hash, expires_at, created_at) values (?, ?, ?, ?, ?)",
  )
    .bind(
      `comment_session_${crypto.randomUUID()}`,
      user.id,
      await digestText(token),
      expiresAt,
      now.toISOString(),
    )
    .run();

  return {
    data: user,
    headers: {
      "set-cookie": serializeCookie(commentSessionCookie, token, request, sessionMaxAgeSeconds),
    },
  } as const;
}

async function upsertGitHubCommentUser(githubUser: GitHubUser, email: string) {
  const providerAccountId = String(githubUser.id);
  const now = new Date().toISOString();
  const existingProvider = await env.CMS_DB.prepare(
    "select * from comment_users where provider = ? and provider_account_id = ? limit 1",
  )
    .bind("github", providerAccountId)
    .first<CommentUserRow>();
  const name = githubUser.name?.trim() || githubUser.login || email.split("@")[0] || email;
  const avatarUrl = githubUser.avatar_url ?? null;

  if (existingProvider) {
    await env.CMS_DB.prepare(
      "update comment_users set name = ?, email = ?, email_hash = ?, avatar_url = ?, updated_at = ?, last_login_at = ? where id = ?",
    )
      .bind(name, email, await digestText(email), avatarUrl, now, now, existingProvider.id)
      .run();

    return rowToCommentUser({
      ...existingProvider,
      name,
      email,
      email_hash: await digestText(email),
      avatar_url: avatarUrl,
      updated_at: now,
      last_login_at: now,
    });
  }

  const existingEmail = await getCommentUserByEmail(email);

  if (existingEmail) {
    await env.CMS_DB.prepare(
      "update comment_users set name = ?, avatar_url = ?, provider = ?, provider_account_id = ?, updated_at = ?, last_login_at = ? where id = ?",
    )
      .bind(name, avatarUrl, "github", providerAccountId, now, now, existingEmail.id)
      .run();

    return rowToCommentUser({
      ...existingEmail,
      name,
      avatar_url: avatarUrl,
      provider: "github",
      provider_account_id: providerAccountId,
      updated_at: now,
      last_login_at: now,
    });
  }

  const row: CommentUserRow = {
    id: `comment_user_${crypto.randomUUID()}`,
    name,
    email,
    email_hash: await digestText(email),
    avatar_url: avatarUrl,
    provider: "github",
    provider_account_id: providerAccountId,
    password_hash: null,
    created_at: now,
    updated_at: now,
    last_login_at: now,
  };

  await env.CMS_DB.prepare(
    `insert into comment_users (
      id, name, email, email_hash, avatar_url, provider, provider_account_id,
      password_hash, created_at, updated_at, last_login_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      row.id,
      row.name,
      row.email,
      row.email_hash,
      row.avatar_url,
      row.provider,
      row.provider_account_id,
      row.password_hash,
      row.created_at,
      row.updated_at,
      row.last_login_at,
    )
    .run();

  return rowToCommentUser(row);
}

async function exchangeGitHubCode(code: string, request: Request) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: getGitHubClientId(),
      client_secret: getGitHubClientSecret(),
      code,
      redirect_uri: getGitHubCallbackUrl(request),
    }),
  });
  const payload = (await response.json()) as { access_token?: string };

  return payload.access_token ?? null;
}

async function fetchGitHubUser(token: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: gitHubHeaders(token),
  });

  return (await response.json()) as GitHubUser;
}

async function resolveGitHubEmail(token: string, githubUser: GitHubUser) {
  if (githubUser.email) {
    return normalizeEmail(githubUser.email);
  }

  const response = await fetch("https://api.github.com/user/emails", {
    headers: gitHubHeaders(token),
  });

  if (response.ok) {
    const emails = (await response.json()) as GitHubEmail[];
    const primary =
      emails.find((item) => item.primary && item.verified) ?? emails.find((item) => item.verified);

    if (primary) {
      return normalizeEmail(primary.email);
    }
  }

  return `github_${githubUser.id}@users.noreply.github.com`;
}

function gitHubHeaders(token: string) {
  return {
    accept: "application/vnd.github+json",
    authorization: `Bearer ${token}`,
    "user-agent": "cloud-blog-cms-comment-auth",
    "x-github-api-version": "2022-11-28",
  };
}

async function getCommentUserByEmail(emailInput: string | undefined) {
  const email = normalizeEmail(emailInput);

  return env.CMS_DB.prepare("select * from comment_users where email = ? limit 1")
    .bind(email)
    .first<CommentUserRow>();
}

async function touchLastLogin(userId: string) {
  await env.CMS_DB.prepare(
    "update comment_users set last_login_at = ?, updated_at = ? where id = ?",
  )
    .bind(new Date().toISOString(), new Date().toISOString(), userId)
    .run();
}

function rowToCommentUser(row: CommentUserRow): CommentUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    emailHash: row.email_hash,
    avatarUrl: row.avatar_url,
    provider: row.provider,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  };
}

function getGitHubClientId() {
  return env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || "";
}

function getGitHubClientSecret() {
  return env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET || "";
}

function getGitHubCallbackUrl(request: Request) {
  return new URL("/api/comment-auth/github/callback", request.url).toString();
}

function safeRedirectPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function redirectWithCommentAuthError(path: string, request: Request) {
  const url = new URL(safeRedirectPath(path), request.url);
  url.searchParams.set("commentAuth", "github_error");

  return Response.redirect(url, 302);
}

function parseGithubState(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as { redirectTo?: string; state?: string };

    if (!parsed.state || !parsed.redirectTo) {
      return null;
    }

    return {
      state: parsed.state,
      redirectTo: safeRedirectPath(parsed.redirectTo),
    };
  } catch {
    return null;
  }
}

function normalizeEmail(value: string | undefined) {
  const email = value?.trim().toLowerCase() ?? "";

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error("A valid email is required");
  }

  return email;
}

function assertPassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
}

async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iterations = 100_000;
  const hash = await derivePasswordHash(password, salt, iterations);

  return `pbkdf2_sha256$${iterations}$${toBase64(salt)}$${toBase64(hash)}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationsRaw, saltRaw, hashRaw] = storedHash.split("$");

  if (algorithm !== "pbkdf2_sha256" || !iterationsRaw || !saltRaw || !hashRaw) {
    return false;
  }

  const iterations = Number(iterationsRaw);
  const salt = fromBase64(saltRaw);
  const expected = fromBase64(hashRaw);
  const actual = await derivePasswordHash(password, salt, iterations);

  return timingSafeEqual(actual, expected);
}

async function derivePasswordHash(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: copyBytes(salt),
      iterations,
    },
    key,
    256,
  );

  return new Uint8Array(bits);
}

async function digestText(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  let diff = 0;

  for (let index = 0; index < a.byteLength; index += 1) {
    diff |= a[index]! ^ b[index]!;
  }

  return diff === 0;
}

function toBase64(value: Uint8Array) {
  let binary = "";

  for (const byte of value) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function copyBytes(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);

  return copy;
}

function readCookie(request: Request, name: string) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function serializeCookie(name: string, value: string, request: Request, maxAge: number) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";

  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

function serializeExpiredCookie(name: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";

  return `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
}
