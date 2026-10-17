import type { Project } from "@/content/site";

// A typographic cover built from the project's own architecture, used until real screenshots exist.
export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  const steps = project.caseStudy?.architecture ?? [];
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-line bg-surface ${
        large ? "aspect-[16/8] p-6 sm:p-10" : "aspect-[16/10] p-5"
      }`}
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
