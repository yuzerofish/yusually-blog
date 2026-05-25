import { env } from "cloudflare:workers";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt: string;
  lastLoginAt: string | null;
};

type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "admin";
  created_at: string;
  last_login_at: string | null;
};

type AdminSessionRow = AdminUserRow & {
  expires_at: string;
};

type AdminUserInput = {
  name?: string;
  email?: string;
  password?: string;
};

const adminSessionCookie = "cms_admin_session";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;

export async function countAdminUsers() {
  const row = await env.CMS_DB.prepare("select count(*) as count from admin_users").first<{
    count: number;
  }>();

  return Number(row?.count ?? 0);
}

export async function createAdminUser(input: AdminUserInput) {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email;
  const password = input.password ?? "";

  assertPassword(password);

  const existing = await getAdminUserByEmail(email);

  if (existing) {
    return { error: "Admin user already exists" } as const;
  }

  const now = new Date().toISOString();
  const row: AdminUserRow = {
    id: `admin_${crypto.randomUUID()}`,
    name,
    email,
    password_hash: await hashPassword(password),
    role: "admin",
    created_at: now,
    last_login_at: null,
  };

  await env.CMS_DB.prepare(
    "insert into admin_users (id, name, email, password_hash, role, created_at, updated_at, last_login_at) values (?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(
      row.id,
      row.name,
      row.email,
      row.password_hash,
      row.role,
      row.created_at,
      now,
      row.last_login_at,
    )
    .run();

  return { data: rowToAdminUser(row) } as const;
}

export async function resetAdminPassword(
  emailInput: string | undefined,
  password: string | undefined,
) {
  const email = normalizeEmail(emailInput);
  assertPassword(password ?? "");

  const user = await getAdminUserByEmail(email);

  if (!user) {
    return { error: "Admin user not found" } as const;
  }

  await env.CMS_DB.prepare("update admin_users set password_hash = ?, updated_at = ? where id = ?")
    .bind(await hashPassword(password ?? ""), new Date().toISOString(), user.id)
    .run();

  await env.CMS_DB.prepare("delete from admin_sessions where user_id = ?").bind(user.id).run();

  return { data: rowToAdminUser(user) } as const;
}

export async function loginAdmin(input: { email?: string; password?: string }, request: Request) {
  const email = normalizeEmail(input.email);
  const user = await getAdminUserByEmail(email);

  if (!user || !(await verifyPassword(input.password ?? "", user.password_hash))) {
    return { error: "Invalid email or password" } as const;
  }

  const now = new Date();
  const token = `admin_${crypto.randomUUID().replace(/-/g, "")}`;
  const expiresAt = new Date(now.getTime() + sessionMaxAgeSeconds * 1000).toISOString();

  await env.CMS_DB.prepare(
    "insert into admin_sessions (id, user_id, token_hash, expires_at, created_at) values (?, ?, ?, ?, ?)",
  )
    .bind(
      `session_${crypto.randomUUID()}`,
      user.id,
      await digestText(token),
      expiresAt,
      now.toISOString(),
    )
    .run();

  await env.CMS_DB.prepare("update admin_users set last_login_at = ?, updated_at = ? where id = ?")
    .bind(now.toISOString(), now.toISOString(), user.id)
    .run();

  return {
    data: rowToAdminUser({ ...user, last_login_at: now.toISOString() }),
    headers: {
      "set-cookie": serializeSessionCookie(token, request),
    },
  } as const;
}

export async function logoutAdmin(request: Request) {
  const token = readSessionCookie(request);

  if (token) {
    await env.CMS_DB.prepare("delete from admin_sessions where token_hash = ?")
      .bind(await digestText(token))
      .run();
  }

  return {
    headers: {
      "set-cookie": serializeExpiredSessionCookie(request),
    },
  };
}

export async function getAdminUserFromRequest(request: Request) {
  const token = readSessionCookie(request);

  if (!token) {
    return null;
  }

  const row = await env.CMS_DB.prepare(
    `select
      admin_users.id, admin_users.name, admin_users.email, admin_users.password_hash,
      admin_users.role, admin_users.created_at, admin_users.last_login_at,
      admin_sessions.expires_at
    from admin_sessions
    join admin_users on admin_users.id = admin_sessions.user_id
    where admin_sessions.token_hash = ? and admin_sessions.expires_at > ?
    limit 1`,
  )
    .bind(await digestText(token), new Date().toISOString())
    .first<AdminSessionRow>();

  return row ? rowToAdminUser(row) : null;
}

export function publicAdminUser(user: AdminUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}

async function getAdminUserByEmail(email: string) {
  return env.CMS_DB.prepare("select * from admin_users where email = ? limit 1")
    .bind(email)
    .first<AdminUserRow>();
}

function rowToAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  };
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
      salt: copyBytes(salt),
      iterations,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return new Uint8Array(bits);
}

function copyBytes(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy;
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left[index]! ^ right[index]!;
  }

  return result === 0;
}

function readSessionCookie(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const pair = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminSessionCookie}=`));

  return pair ? decodeURIComponent(pair.slice(adminSessionCookie.length + 1)) : null;
}

function serializeSessionCookie(token: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${adminSessionCookie}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${sessionMaxAgeSeconds}${secure}`;
}

function serializeExpiredSessionCookie(request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${adminSessionCookie}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}

async function digestText(value: string) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function toBase64(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}
