import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Admin sign-in is GitHub OAuth (app/admin/login and app/admin/callback). Only ADMIN_LOGIN gets a session,
// which is a cookie holding `<payload>.<HMAC>` signed with SESSION_SECRET: no database needed.

export const ADMIN_LOGIN = "hrxsrv"; // GitHub username allowed into /admin, compared case-insensitively
export const SESSION_COOKIE = "admin_session";
export const STATE_COOKIE = "admin_oauth_state";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // seconds

export const isAdmin = (login: string) => login.toLowerCase() === ADMIN_LOGIN;

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

function sign(data: string): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set to at least 32 characters");
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function createSession(login: string): { value: string; maxAge: number } {
  const payload = Buffer.from(JSON.stringify({ login, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return { value: `${payload}.${sign(payload)}`, maxAge: SESSION_MAX_AGE };
}

function verifySession(value: string | undefined): { login: string } | null {
  const [payload, sig] = value?.split(".") ?? [];
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const { login, exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof login === "string" && isAdmin(login) && exp > Date.now() ? { login } : null;
  } catch {
    return null;
  }
}

/** The signed-in admin, or null. Check this in every admin page and Server Action. */
export async function getAdmin(): Promise<{ login: string } | null> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}
