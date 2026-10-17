"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { Close, Github, Linkedin, Menu } from "./icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#hackathons", label: "Hackathons" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-[15px] font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-invert font-mono text-xs text-invert-fg">
            {site.initials}
          </span>
          {site.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center px-3 text-sm transition-colors hover:text-fg ${active ? "font-medium text-fg" : "text-fg-2"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            className="ml-1 inline-flex h-9 items-center rounded-full bg-invert px-4 text-sm font-medium text-invert-fg transition-opacity hover:opacity-85"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {open &&
        createPortal(
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-[15px] font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-invert font-mono text-xs text-invert-fg">
                {site.initials}
              </span>
              {site.name}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
            >
              <Close />
            </button>
          </div>
          <div className="flex flex-col px-5 py-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between border-b border-line text-3xl font-semibold tracking-[-0.03em]"
              >
                {l.label}
                <span className="font-mono text-xs font-normal tracking-normal text-fg-3">0{i + 1}</span>
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 px-5 pb-10">
            <a
              href={`mailto:${site.email}`}
              className="flex h-12 items-center justify-center rounded-full bg-invert text-base font-medium text-invert-fg"
            >
              Email me
            </a>
            <div className="flex gap-2.5">
              <a href={site.github} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[15px] font-medium">
                <Github size={16} /> GitHub
              </a>
              <a href={site.linkedin} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[15px] font-medium">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </header>
  );
}
