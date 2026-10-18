import { getActiveId, resumeResponse } from "@/lib/resumes";

// The public résumé link: always the active résumé, so the URL never changes when you switch.
export async function GET() {
  try {
    return resumeResponse(await getActiveId());
  } catch (err) {
    console.error(err);
    return new Response("Couldn't load the résumé right now. Please try again shortly.", { status: 502 });
  }
}
