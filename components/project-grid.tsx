"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category, Project } from "@/content/site";
import { Chip } from "./ui";
import { ProjectCover } from "./project-cover";

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full stack" },
  { id: "oss", label: "Open source" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const available = FILTERS.filter((f) => f.id === "all" || projects.some((p) => p.category === f.id));
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-8">
      {available.length > 2 && (
        <div role="group" aria-label="Filter projects" className="inline-flex flex-wrap gap-1 self-start rounded-full bg-surface-2 p-1">
          {available.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`min-h-9 rounded-full px-4 text-sm font-medium transition ${
                filter === f.id ? "bg-bg text-fg shadow-sm" : "text-fg-2 hover:text-fg"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-line bg-bg p-3 pb-6 transition hover:border-line-strong"
          >
            <ProjectCover project={p} />
            <div className="flex flex-col gap-2.5 px-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[22px] font-semibold tracking-[-0.02em]">{p.name}</span>
                <span className="font-mono text-xs text-fg-3">{p.categoryLabel}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-fg-2">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.stack.slice(0, 4).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
