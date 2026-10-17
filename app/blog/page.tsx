import type { Metadata } from "next";
import { posts, site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = { title: "Blog" };

export default function Blog() {
  return (
    <Container>
      <section className="flex flex-col gap-6 border-b border-line pb-14 pt-20 sm:pt-28">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.045em]">Writing</h1>
        <p className="max-w-[640px] text-lg leading-relaxed text-fg-2">Notes on backend systems, real-time AI and the things I learn while building them.</p>
      </section>
      <section className="pb-24 pt-6">
        {posts.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-line-strong p-8 text-[15px] text-fg-2">
            No posts yet. Follow along on{" "}
            <a href={site.github} className="text-accent hover:text-accent-hover">GitHub</a> or{" "}
            <a href={site.linkedin} className="text-accent hover:text-accent-hover">LinkedIn</a> in the meantime.
          </div>
        ) : (
          posts.map((p) => (
            <a key={p.href} href={p.href} className="group flex flex-col gap-1.5 border-b border-line py-6">
              <div className="flex items-baseline justify-between gap-6">
                <span className="inline-flex items-center gap-1.5 text-xl font-semibold tracking-[-0.02em] group-hover:text-accent">
                  {p.title} <ArrowUpRight size={14} />
                </span>
                <span className="whitespace-nowrap font-mono text-[13px] text-fg-3">{p.date}</span>
              </div>
              {p.summary && <p className="text-[15px] text-fg-2">{p.summary}</p>}
            </a>
          ))
        )}
      </section>
    </Container>
  );
}
