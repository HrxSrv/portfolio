import type { Metadata } from "next";
import Link from "next/link";
import { resumeSource } from "@/content/site";
import { getAdmin } from "@/lib/auth";
import { getActiveId, listResumes, sourceUrl } from "@/lib/resumes";
import { Container, Eyebrow } from "@/components/ui";
import { ArrowUpRight, Github } from "@/components/icons";
import { MakeActiveButton } from "./make-active-button";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const admin = await getAdmin();
  if (!admin) return <SignIn />;

  let ids: string[] = [];
  let active: string | null = null;
  let loadError: string | null = null;
  try {
    [ids, active] = await Promise.all([listResumes(), getActiveId()]);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Couldn't reach GitHub.";
  }
  const { preview } = await searchParams;
  const selected = typeof preview === "string" && ids.includes(preview) ? preview : active;
  const canWrite = Boolean(process.env.GITHUB_TOKEN);
  const repoUrl = `https://github.com/${resumeSource.owner}/${resumeSource.repo}`;

  return (
    <Container>
      <section className="flex flex-col gap-10 py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Eyebrow>Admin</Eyebrow>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">Résumés</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-fg-2">
            <span className="inline-flex items-center gap-1.5">
              <Github size={16} /> {admin.login}
            </span>
            <form action="/admin/logout" method="post">
              <button type="submit" className="inline-flex h-9 items-center rounded-full border border-line px-4 font-medium text-fg hover:border-line-strong">
                Sign out
              </button>
            </form>
          </div>
        </div>

        {!canWrite && (
          <p className="rounded-xl border border-line bg-surface p-4 text-sm text-fg-2">
            Read-only: set <code className="font-mono text-fg">GITHUB_TOKEN</code> to a token with write access to{" "}
            {resumeSource.repo} to change the active résumé.
          </p>
        )}

        {loadError ? (
          <p role="alert" className="rounded-xl border border-line p-4 text-sm text-danger">
            {loadError}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col gap-4">
              <ul className="overflow-hidden rounded-xl border border-line">
                {ids.map((id) => (
                  <li
                    key={id}
                    className={`flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 last:border-0 ${
                      id === selected ? "bg-surface" : ""
                    }`}
                  >
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-mono text-[15px] font-medium">{id}</span>
                        {id === active && (
                          <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">Active</span>
                        )}
                      </div>
                      <div className="flex gap-4 text-[13px]">
                        <Link href={`/admin?preview=${encodeURIComponent(id)}`} className="text-accent hover:text-accent-hover">
                          Preview
                        </Link>
                        <a href={sourceUrl(id)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-fg-2 hover:text-fg">
                          Source <ArrowUpRight size={12} />
                        </a>
                      </div>
                    </div>
                    {id !== active && <MakeActiveButton id={id} disabled={!canWrite} />}
                  </li>
                ))}
              </ul>
              <p className="text-[13px] leading-relaxed text-fg-3">
                <code className="font-mono text-fg-2">/resume.pdf</code> always serves the active résumé, and{" "}
                <code className="font-mono text-fg-2">/resume/&lt;id&gt;.pdf</code> serves a specific one. To add a résumé, add a{" "}
                <code className="font-mono text-fg-2">.tex</code> file to{" "}
                <a href={`${repoUrl}/tree/${resumeSource.branch}/${resumeSource.dir}`} target="_blank" rel="noreferrer" className="text-accent hover:text-accent-hover">
                  {resumeSource.repo}/{resumeSource.dir}
                </a>
                ; its PDF appears here once the build finishes.
              </p>
            </div>

            {selected && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-fg-3">PREVIEW · {selected}</span>
                  <a href={`/resume/${selected}.pdf`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[13px] font-medium text-accent hover:text-accent-hover">
                    Open PDF <ArrowUpRight size={12} />
                  </a>
                </div>
                <iframe
                  key={selected}
                  src={`/resume/${selected}.pdf#navpanes=0&view=FitH`}
                  title={`Preview of ${selected}`}
                  className="aspect-[8.5/11] w-full rounded-xl border border-line bg-surface"
                />
              </div>
            )}
          </div>
        )}
      </section>
    </Container>
  );
}

function SignIn() {
  return (
    <Container>
      <section className="mx-auto flex max-w-sm flex-col items-center gap-6 py-28 text-center">
        <div className="flex flex-col gap-2">
          <Eyebrow>Admin</Eyebrow>
          <h1 className="text-[32px] font-semibold tracking-[-0.03em]">Sign in</h1>
          <p className="text-[15px] text-fg-2">Only the site owner&apos;s GitHub account can sign in.</p>
        </div>
        {/* A plain link, not <Link>, so the OAuth redirect is never prefetched. */}
        <a href="/admin/login" className="inline-flex h-11 items-center gap-2 rounded-full bg-invert px-5 text-[15px] font-medium text-invert-fg hover:opacity-85">
          <Github size={16} /> Sign in with GitHub
        </a>
      </section>
    </Container>
  );
}
