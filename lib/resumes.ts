import { resumeSource as src, site } from "@/content/site";

// Reads and updates résumés in the GitHub repo named by `resumeSource`. Reads are cached and tagged with
// RESUMES_TAG, so the GitHub webhook (app/api/revalidate) and the admin page can refresh them on demand.

export const RESUMES_TAG = "resumes";
export const RESUME_FILENAME = `${site.name.replace(/\s+/g, "_")}_Resume.pdf`;

const API = `https://api.github.com/repos/${src.owner}/${src.repo}`;
const CACHED = { next: { revalidate: 600, tags: [RESUMES_TAG] } };
const FRESH = { cache: "no-store" as const };

function gh(path: string, opts: { fresh?: boolean; raw?: boolean; init?: RequestInit } = {}) {
  const token = process.env.GITHUB_TOKEN;
  return fetch(`${API}${path}`, {
    ...(opts.fresh ? FRESH : CACHED),
    ...opts.init,
    headers: {
      Accept: opts.raw ? "application/vnd.github.raw" : "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

async function json<T>(res: Response, what: string): Promise<T> {
  if (!res.ok) throw new Error(`GitHub returned ${res.status} for ${what}`);
  return res.json() as Promise<T>;
}

/** Ids of all résumés: the names of the .tex files in the résumé folder. */
export async function listResumes(fresh = false): Promise<string[]> {
  const items = await json<{ name: string; type: string }[]>(
    await gh(`/contents/${src.dir}?ref=${src.branch}`, { fresh }),
    src.dir,
  );
  return items
    .filter((i) => i.type === "file" && i.name.endsWith(".tex"))
    .map((i) => i.name.slice(0, -".tex".length))
    .sort();
}

async function readManifest(fresh = false): Promise<{ active?: string; sha?: string }> {
  const res = await gh(`/contents/${src.manifest}?ref=${src.branch}`, { fresh });
  if (res.status === 404) return {};
  const file = await json<{ content: string; sha: string }>(res, src.manifest);
  try {
    return { ...JSON.parse(Buffer.from(file.content, "base64").toString("utf8")), sha: file.sha };
  } catch {
    return { sha: file.sha };
  }
}

/** The résumé the manifest marks active, falling back to the first one if it names none or a missing one. */
export async function getActiveId(): Promise<string | null> {
  const [ids, manifest] = await Promise.all([listResumes(), readManifest()]);
  return manifest.active && ids.includes(manifest.active) ? manifest.active : (ids[0] ?? null);
}

/** The built PDF for a résumé id, or null if the id is unknown or its PDF hasn't been built yet. */
export async function getResumePdf(id: string): Promise<ArrayBuffer | null> {
  if (!(await listResumes()).includes(id)) return null;
  const res = await gh(`/contents/${encodeURIComponent(id)}.pdf?ref=${src.pdfBranch}`, { raw: true });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub returned ${res.status} for ${id}.pdf`);
  return res.arrayBuffer();
}

/** Serves a résumé PDF inline, with a friendly filename for saving. */
export async function resumeResponse(id: string | null): Promise<Response> {
  try {
    const pdf = id ? await getResumePdf(id) : null;
    if (!pdf) return new Response("Résumé not found.", { status: 404 });
    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${RESUME_FILENAME}"`,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Couldn't load the résumé right now. Please try again shortly.", { status: 502 });
  }
}

/** Commits a new manifest that marks `id` active. Needs GITHUB_TOKEN with write access to the repo. */
export async function setActiveResume(id: string): Promise<void> {
  if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");
  const [ids, manifest] = await Promise.all([listResumes(true), readManifest(true)]);
  if (!ids.includes(id)) throw new Error(`Unknown résumé "${id}"`);
  const { sha, ...rest } = manifest;
  const content = `${JSON.stringify({ ...rest, active: id }, null, 2)}\n`;
  await json(
    await gh(`/contents/${src.manifest}`, {
      fresh: true,
      init: {
        method: "PUT",
        body: JSON.stringify({
          message: `Make ${id} the active résumé`,
          content: Buffer.from(content).toString("base64"),
          branch: src.branch,
          ...(sha ? { sha } : {}),
        }),
      },
    }),
    `updating ${src.manifest}`,
  );
}

export const sourceUrl = (id: string) =>
  `https://github.com/${src.owner}/${src.repo}/blob/${src.branch}/${src.dir}/${id}.tex`;
