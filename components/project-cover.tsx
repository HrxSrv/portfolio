import Image from "next/image";
import type { Project } from "@/content/site";

// Shows the project's cover image if it has one, otherwise a typographic cover built from its architecture.
export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  const frame = `relative overflow-hidden rounded-xl border border-line ${large ? "aspect-[16/8]" : "aspect-[16/10]"}`;
  const sizes = large ? "(min-width: 1120px) 1072px, 100vw" : "(min-width: 1120px) 524px, (min-width: 768px) 50vw, 100vw";
  const cover = project.cover;

  if (cover?.kind === "art") {
    return (
      <div className={frame} style={{ background: cover.background }}>
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes} className="object-contain" priority={large} />
      </div>
    );
  }

  if (cover?.kind === "logo") {
    return (
      <div className={`${frame} flex items-center justify-center gap-[4%]`} style={{ background: cover.background }}>
        <div className="relative aspect-square h-[38%]">
          <Image src={cover.src} alt={cover.alt} fill sizes={large ? "256px" : "160px"} className="object-contain" priority={large} />
        </div>
        <span
          className={`font-semibold tracking-[-0.04em] ${large ? "text-6xl sm:text-8xl" : "text-5xl"}`}
          style={{ color: cover.ink }}
        >
          {project.name}
        </span>
      </div>
    );
  }

  const steps = project.caseStudy?.architecture ?? [];
  return (
    <div
      className={`${frame} flex flex-col justify-between bg-surface ${large ? "p-6 sm:p-10" : "p-5"}`}
      style={{
        backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="flex items-center justify-between font-mono text-xs text-fg-3">
        <span>{project.tagline}</span>
        <span>{project.stack[0]}</span>
      </div>
      <ol aria-label={`${project.name} pipeline`} className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <li key={s.step} className="flex items-center gap-2">
            <span
              className={`rounded-md border border-line bg-bg font-mono text-fg shadow-sm ${
                large ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs"
              }`}
            >
              {s.step}
            </span>
            {i < steps.length - 1 && <span aria-hidden className="text-fg-3">→</span>}
          </li>
        ))}
      </ol>
      <span className={`font-semibold tracking-[-0.04em] text-fg ${large ? "text-5xl sm:text-7xl" : "text-4xl"}`}>
        {project.name}
      </span>
    </div>
  );
}
