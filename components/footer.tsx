import { site } from "@/content/site";
import { Github, Linkedin, Mail } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-[13px] text-fg-3 sm:px-6">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex items-center gap-1">
          <a href={`mailto:${site.email}`} aria-label="Email" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2 hover:text-fg">
            <Mail size={16} />
          </a>
          <a href={site.github} aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2 hover:text-fg">
            <Github size={16} />
          </a>
          <a href={site.linkedin} aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-2 hover:text-fg">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
