import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1120px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[13px] uppercase text-fg-3">{children}</span>;
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>
        {index} — {label}
      </Eyebrow>
      <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[40px]">{title}</h2>
    </div>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg">{children}</span>;
}

type BtnProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary"; external?: boolean };

export function Button({ href, children, variant = "primary", external }: BtnProps) {
  const cls =
    variant === "primary"
      ? "bg-invert text-invert-fg hover:opacity-85"
      : "border border-line bg-bg text-fg hover:border-line-strong";
  const className = `inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-medium transition ${cls}`;
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={className} {...(external || href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
