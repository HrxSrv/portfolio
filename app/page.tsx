import Image from "next/image";
import Link from "next/link";
import { achievements, education, experience, hackathons, posts, projects, site, type Job } from "@/content/site";
import { ProjectGrid } from "@/components/project-grid";
import { Button, Container, SectionHeading } from "@/components/ui";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Trophy } from "@/components/icons";
import { RESUME_FILENAME } from "@/lib/resumes";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Container>
        <section className="flex flex-col gap-8 border-b border-line pb-20 pt-20 sm:pb-24 sm:pt-32">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-line px-3 py-1.5 text-[13px] font-medium">
            <span className="h-2 w-2 rounded-full bg-success" />
            {site.status}
          </span>
          <h1 className="max-w-[920px] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            {site.headline} <span className="text-fg-3">{site.headlineMuted}</span>
          </h1>
          <p className="max-w-[640px] text-lg leading-relaxed text-fg-2 sm:text-[19px]">{site.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/#work">
              See my work <ArrowDown />
            </Button>
            <Button href="/resume.pdf" variant="secondary" external>
              View résumé <ArrowUpRight />
            </Button>
            <a href="/resume.pdf" download={RESUME_FILENAME} aria-label="Download résumé" title="Download résumé" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-line-strong">
              <Download />
            </a>
            <a href={site.github} aria-label="GitHub" target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-line-strong">
              <Github />
            </a>
            <a href={site.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-line-strong">
              <Linkedin />
            </a>
          </div>
        </section>
      </Container>

      {/* Work */}
      <Container>
        <section id="work" className="flex flex-col gap-10 border-b border-line py-20 sm:py-24">
          <SectionHeading index="01" label="Selected work" title="Things I've built" />
          <ProjectGrid projects={projects} />
        </section>
      </Container>

      {/* Experience */}
      <Container>
        <section id="experience" className="flex flex-wrap gap-12 border-b border-line py-20 sm:py-24">
          <div className="flex-[1_1_260px]">
            <SectionHeading index="02" label="Experience" title="Where I've worked" />
          </div>
          <div className="min-w-0 flex-[999_1_560px] border-t border-line">
            {experience.map((job) => (
              <div key={job.company} className="border-b border-line py-6">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <div className="flex items-center gap-3">
                    <CompanyLogo job={job} />
                    <span className="text-[17px] font-semibold">
                      {job.company}
                      {job.now && <span className="font-normal text-fg-3"> (now {job.now})</span>}
                    </span>
                  </div>
                  <span className="font-mono text-[13px] text-fg-3">{job.location}</span>
                </div>
                <div className="mt-4 flex flex-col gap-5 sm:pl-11">
                  {job.roles.map((r) => (
                    <div key={r.title} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <span className="text-[15px] text-fg">{r.title}</span>
                        <span className="font-mono text-[13px] text-fg-3">{r.dates}</span>
                      </div>
                      {r.points.length > 0 && (
                        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-relaxed text-fg-2 marker:text-fg-3">
                          {r.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Hackathons & achievements */}
      <Container>
        <section id="hackathons" className="flex flex-col gap-10 border-b border-line py-20 sm:py-24">
          <SectionHeading index="03" label="Hackathons & achievements" title="Competitions" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {hackathons.map((h) => (
              <div key={h.title} className="flex flex-col overflow-hidden rounded-xl border border-line">
                {h.photo && (
                  <div className="relative aspect-[16/10] border-b border-line bg-surface-2">
                    <Image
                      src={h.photo.src}
                      alt={h.photo.alt}
                      fill
                      sizes="(min-width: 1120px) 528px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: h.photo.position }}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4 p-7">
                  {!h.photo && (
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-fg">
                      <Trophy />
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-[28px] font-semibold tracking-[-0.03em]">{h.result}</span>
                    <span className="text-[17px] font-medium">{h.title}</span>
                    <span className="text-sm text-fg-2">{h.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {achievements.map((a) => (
              <div key={a.title} className="flex flex-col gap-1 border-b border-line py-5 sm:odd:pr-6 sm:even:pl-6">
                <span className="text-[15px] font-semibold">{a.title}</span>
                <span className="text-sm text-fg-2">{a.detail}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Education */}
      <Container>
        <section id="education" className="flex flex-wrap gap-12 border-b border-line py-20 sm:py-24">
          <div className="flex-[1_1_260px]">
            <SectionHeading index="04" label="Education" title="Background" />
          </div>
          <div className="min-w-0 flex-[999_1_560px] border-t border-line">
            {education.map((e) => (
              <div key={e.degree} className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-line py-6">
                <div className="flex max-w-[560px] flex-col gap-1">
                  <span className="text-[17px] font-semibold">{e.degree}</span>
                  <span className="text-[15px] text-fg-2">{e.school}</span>
                  <span className="text-sm text-fg-3">{e.note}</span>
                </div>
                <span className="font-mono text-[13px] text-fg-3">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* Blog */}
      <Container>
        <section id="blog" className="flex flex-wrap gap-12 border-b border-line py-20 sm:py-24">
          <div className="flex-[1_1_260px]">
            <SectionHeading index="05" label="Blog" title="Writing" />
          </div>
          <div className="min-w-0 flex-[999_1_560px]">
            {posts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong p-8 text-[15px] text-fg-2">
                Posts are on the way. In the meantime, the code lives on{" "}
                <a href={site.github} className="text-accent hover:text-accent-hover">
                  GitHub
                </a>
                .
              </div>
            ) : (
              <>
                {posts.slice(0, 3).map((p) => (
                  <a key={p.href} href={p.href} className="flex items-center justify-between gap-6 border-b border-line py-5 hover:text-accent">
                    <span className="text-[17px] font-medium">{p.title}</span>
                    <span className="whitespace-nowrap font-mono text-[13px] text-fg-3">{p.date}</span>
                  </a>
                ))}
                <Link href="/blog" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent-hover">
                  All posts <ArrowUpRight />
                </Link>
              </>
            )}
          </div>
        </section>
      </Container>

      {/* Contact */}
      <Container>
        <section id="contact" className="flex flex-col items-start gap-6 py-24 sm:py-32">
          <span className="font-mono text-[13px] text-fg-3">06 — CONTACT</span>
          <h2 className="max-w-[760px] text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Have a hard problem? Let&apos;s talk.
          </h2>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 font-mono text-base text-accent hover:text-accent-hover sm:text-[17px]">
            {site.email} <ArrowUpRight />
          </a>
        </section>
      </Container>
    </>
  );
}

// Small square company mark; falls back to the company's initials when no logo file is set.
function CompanyLogo({ job }: { job: Job }) {
  const box = "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line";
  if (job.logo) {
    return (
      <span className={box}>
        <Image src={job.logo} alt="" fill sizes="32px" className="object-cover" />
      </span>
    );
  }
  const initials = job.company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span aria-hidden className={`${box} bg-surface-2 font-mono text-[11px] font-medium text-fg-2`}>
      {initials}
    </span>
  );
}
