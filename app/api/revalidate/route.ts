import { createHmac } from "node:crypto";
import { revalidateTag } from "next/cache";
import { safeEqual } from "@/lib/auth";
import { RESUMES_TAG } from "@/lib/resumes";

// GitHub webhook for the résumé repo (push events). Any push, to main or to the pdfs branch the build
// workflow writes, drops the cached résumé data so the site picks up the change on the next request.
export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return new Response("GITHUB_WEBHOOK_SECRET is not set.", { status: 500 });

  const body = await req.text();
  const signature = req.headers.get("x-hub-signature-256") ?? "";
  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  if (!safeEqual(signature, expected)) return new Response("Invalid signature.", { status: 401 });

  revalidateTag(RESUMES_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
