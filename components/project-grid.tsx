"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, Project } from "@/content/site";
import { ArrowLeft, ArrowRight } from "./icons";
import { Chip } from "./ui";
import { ProjectCover } from "./project-cover";

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full stack" },
  { id: "oss", label: "Open source" },
];

// Stacked on mobile; from md up, a horizontal scroller that shows exactly two cards within the container edges.
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const available = FILTERS.filter((f) => f.id === "all" || projects.some((p) => p.category === f.id));
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [filter, update]);

  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const scrollable = !(atStart && atEnd);
  const navBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition hover:border-line-strong disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="flex flex-col gap-8">
      {(available.length > 2 || scrollable) && (
        <div className="flex items-center justify-between gap-4">
          {available.length > 2 ? (
            <div role="group" aria-label="Filter projects" className="inline-flex flex-wrap gap-1 rounded-full bg-surface-2 p-1">
              {available.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-9 rounded-full px-3 text-sm font-medium transition sm:px-4 ${
                    filter === f.id ? "bg-bg text-fg shadow-sm" : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          {scrollable && (
            <div className="hidden gap-2 md:flex">
              <button type="button" aria-label="Previous projects" disabled={atStart} onClick={() => page(-1)} className={navBtn}>
                <ArrowLeft />
              </button>
              <button type="button" aria-label="Next projects" disabled={atEnd} onClick={() => page(1)} className={navBtn}>
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      )}
      {/* The 4px padding, offset by negative margins, keeps focus rings from being clipped without moving the cards. */}
      <div
        ref={scroller}
        onScroll={update}
        className="no-scrollbar grid grid-cols-1 gap-6 md:-m-1 md:flex md:snap-x md:snap-mandatory md:scroll-px-1 md:overflow-x-auto md:p-1"
      >
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-line bg-bg p-3 pb-6 transition hover:border-line-strong md:w-[calc((100%_-_1.5rem)/2)] md:shrink-0 md:snap-start"
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
