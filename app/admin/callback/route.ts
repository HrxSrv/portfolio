import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, STATE_COOKIE, cookieOptions, createSession, isAdmin, safeEqual } from "@/lib/auth";

// GitHub redirects here after sign-in. Swaps the code for a token, looks up the user, and starts a session
// only for the admin account. The token is used once for the lookup and not kept.
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expected = req.cookies.get(STATE_COOKIE)?.value;
  if (!code || !state || !expected || !safeEqual(state, expected)) {
    return new Response("Sign-in failed: invalid or expired request. Try again from /admin.", { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    cache: "no-store",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: new URL("/admin/callback", req.nextUrl.origin).toString(),
    }),
  });
  const { access_token: token } = (await tokenRes.json()) as { access_token?: string };
  if (!token) return new Response("Sign-in failed: GitHub didn't return a token.", { status: 502 });

  const userRes = await fetch("https://api.github.com/user", {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}` },
  });
  const { login } = (await userRes.json()) as { login?: string };
  if (!login || !isAdmin(login)) return new Response("This GitHub account isn't allowed here.", { status: 403 });

  const session = createSession(login);
  const res = NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  res.cookies.set(SESSION_COOKIE, session.value, cookieOptions(session.maxAge));
  res.cookies.delete(STATE_COOKIE);
  return res;
}
