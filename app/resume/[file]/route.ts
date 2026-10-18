import { resumeResponse } from "@/lib/resumes";

// Unlisted links to a specific résumé, e.g. /resume/backend.pdf, for sending a tailored one.
export async function GET(_req: Request, ctx: RouteContext<"/resume/[file]">) {
  const { file } = await ctx.params;
  const id = file.endsWith(".pdf") ? file.slice(0, -".pdf".length) : null;
  return resumeResponse(id);
}
