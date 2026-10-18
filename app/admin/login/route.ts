import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { STATE_COOKIE, cookieOptions } from "@/lib/auth";

// Starts GitHub sign-in. The random state is checked in /admin/callback to block forged callbacks.
export function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return new Response("GITHUB_CLIENT_ID is not set.", { status: 500 });

  const state = randomBytes(16).toString("base64url");
  const url = new URL("https://github.com/login/oauth/authorize");
  url.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: new URL("/admin/callback", req.nextUrl.origin).toString(),
    state,
    allow_signup: "false",
  }).toString();

  const res = NextResponse.redirect(url);
  res.cookies.set(STATE_COOKIE, state, cookieOptions(10 * 60));
  return res;
}
