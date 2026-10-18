import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { ProjectCover } from "@/components/project-cover";
import { Button, Chip, Container, Eyebrow } from "@/components/ui";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} — ${p.tagline}`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const cs = p.caseStudy;

  return (
    <Container>
      <div className="flex items-center justify-between pt-6">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg-2 hover:text-fg">
          <ArrowLeft /> All work
        </Link>
        <span className="font-mono text-xs text-fg-3">
          CASE STUDY · {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <section className="flex max-w-[820px] flex-col gap-6 pb-12 pt-14 sm:pt-20">
        <div className="flex flex-wrap gap-2">
          <Chip>{p.categoryLabel}</Chip>
          <Chip>{p.tagline}</Chip>
        </div>
        <h1 className="text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">{p.name}</h1>
        <p className="text-xl leading-relaxed text-fg-2 sm:text-[21px]">{p.summary}</p>
      </section>

      <section className="grid grid-cols-1 border-y border-line sm:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-1.5 py-6 pr-6">
          <span className="font-mono text-xs text-fg-3">LINKS</span>
          <div className="flex flex-wrap gap-x-4">
            {p.links.map((l) => {
              const cls = "inline-flex min-h-11 items-center gap-1 text-[15px] font-medium text-accent hover:text-accent-hover";
              return l.href.startsWith("/") ? (
                <Link key={l.href} href={l.href} className={cls}>
                  {l.label} <ArrowRight size={14} />
                </Link>
              ) : (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={cls}>
                  {l.label} <ArrowUpRight size={14} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6">
          <span className="font-mono text-xs text-fg-3">STACK</span>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </section>

      <div className="my-12">
        <ProjectCover project={p} large />
      </div>

      <article className="mx-auto flex max-w-[720px] flex-col gap-20 pb-8 pt-8">
        {cs && (
          <section className="flex flex-col gap-4">
            <Eyebrow>01 — The problem</Eyebrow>
            <p className="text-[17px] leading-[1.7] text-fg-2">{cs.problem}</p>
          </section>
        )}

        {cs && (
          <section className="flex flex-col gap-6">
            <Eyebrow>02 — Approach</Eyebrow>
            <ol className="flex flex-col gap-4">
              {cs.approach.map((a, i) => (
                <li key={a} className="flex gap-4 text-[17px] leading-[1.7] text-fg-2">
                  <span className="pt-1 font-mono text-[13px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
            <div className="mt-2 overflow-hidden rounded-xl border border-line">
              <div className="border-b border-line bg-surface px-4 py-2.5 font-mono text-xs text-fg-3">Architecture</div>
              <ol className="flex flex-col">
                {cs.architecture.map((s, i) => (
                  <li key={s.step} className="flex items-baseline gap-4 border-b border-line px-4 py-3.5 last:border-0">
                    <span className="w-6 font-mono text-xs text-fg-3">{i + 1}</span>
                    <span className="w-24 font-mono text-sm font-medium">{s.step}</span>
                    <span className="text-[15px] text-fg-2">{s.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-6">
          <Eyebrow>03 — Highlights</Eyebrow>
          <ul className="grid grid-cols-1 gap-3">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-xl border border-line p-5 text-[15px] leading-relaxed text-fg">
                {h}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            {p.links.map((l, i) => (
              <Button key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>
                {l.label}
              </Button>
            ))}
          </div>
        </section>
      </article>

      {next.slug !== p.slug && (
        <Link
          href={`/projects/${next.slug}`}
          className="mb-24 mt-24 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-8 transition hover:border-line-strong sm:p-10"
        >
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-fg-3">NEXT PROJECT</span>
            <span className="text-[28px] font-semibold tracking-[-0.03em]">{next.name}</span>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-invert text-invert-fg">
            <ArrowRight size={18} />
          </span>
        </Link>
      )}
    </Container>
  );
}
