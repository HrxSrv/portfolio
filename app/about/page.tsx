import type { Metadata } from "next";
import { bio, education, site, skills } from "@/content/site";
import { Button, Chip, Container, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <Container>
        <section className="flex flex-wrap items-start gap-16 border-b border-line pb-20 pt-20 sm:pb-24 sm:pt-28">
          <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              I like turning messy problems into <span className="text-fg-3">simple, dependable software.</span>
            </h1>
            {bio.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg leading-[1.65] text-fg-2">
                {p}
              </p>
            ))}
          </div>
          <aside className="flex flex-[1_1_280px] flex-col gap-0 rounded-2xl border border-line bg-surface p-6">
            {[
              ["Role", site.role],
              ["Company", "Rimo LLC"],
              ["Based in", site.location],
              ["Timezone", site.timezone],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line py-3 last:border-0">
                <span className="font-mono text-xs text-fg-3">{k}</span>
                <span className="text-right text-sm font-medium">{v}</span>
              </div>
            ))}
          </aside>
        </section>
      </Container>

      <Container>
        <section className="flex flex-wrap gap-12 border-b border-line py-20 sm:py-24">
          <div className="flex-[1_1_260px]">
            <SectionHeading index="01" label="Toolbox" title="What I use" />
          </div>
          <div className="min-w-0 flex-[999_1_560px] border-t border-line">
            {skills.map((s) => (
              <div key={s.group} className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line py-5">
                <span className="w-[120px] pt-1 font-mono text-[13px] text-fg-3">{s.group}</span>
                <div className="flex flex-[1_1_300px] flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <Chip key={i}>{i}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="flex flex-wrap gap-12 border-b border-line py-20 sm:py-24">
          <div className="flex-[1_1_260px]">
            <SectionHeading index="02" label="Education" title="Background" />
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

      <Container>
        <section className="my-20 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-8 sm:my-24 sm:p-14">
          <div className="flex max-w-[560px] flex-col gap-2">
            <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[32px]">Want to work together?</h2>
            <p className="text-[17px] leading-relaxed text-fg-2">I&apos;m always happy to talk about backend systems, real-time AI and interesting engineering problems.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`}>Email me</Button>
            <Button href={site.linkedin} variant="secondary">
              LinkedIn
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
