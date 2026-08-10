import type { ReactNode } from "react";

/**
 * A full-width horizontal band, the unit the event landing page is built
 * from. The page alternates dark and cream bands the way the printed-style
 * landing pages do, so each band publishes its own ink colours as custom
 * properties and the pieces inside read them instead of hard-coding a
 * palette. That way a section can be moved between bands without every
 * text colour inside it having to be rewritten.
 */
export type BandTone = "dark" | "cream" | "teal" | "sand";

/**
 * Ink values per tone. The accent in particular has to change with the
 * ground: the brand gold clears AA comfortably on the dark grounds but only
 * reaches ~2.5:1 on cream, so light bands take the deep teal as their accent
 * instead and the teal band takes the lighter gold.
 */
const tone: Record<BandTone, string> = {
  // Deep brand background — the same ground the rest of the site sits on.
  dark: "bg-void [--band-ink:var(--color-cream)] [--band-body:color-mix(in_oklab,var(--color-cream)_68%,transparent)] [--band-quiet:color-mix(in_oklab,var(--color-cream)_55%,transparent)] [--band-accent:var(--color-gold)] [--band-rule:color-mix(in_oklab,var(--color-gold)_20%,transparent)] [--band-panel:color-mix(in_oklab,var(--color-teal)_40%,transparent)]",
  // Deep teal — used for the accent bands that break up the cream.
  teal: "bg-teal [--band-ink:var(--color-cream)] [--band-body:color-mix(in_oklab,var(--color-cream)_82%,transparent)] [--band-quiet:color-mix(in_oklab,var(--color-cream)_70%,transparent)] [--band-accent:var(--color-gold-lt)] [--band-rule:color-mix(in_oklab,var(--color-gold)_28%,transparent)] [--band-panel:color-mix(in_oklab,var(--color-void)_35%,transparent)]",
  // The light body of the page. Ink is the darkest brand neutral, never
  // pure black, so the cream never reads as plain white-on-black.
  cream:
    "bg-cream [--band-ink:var(--color-void)] [--band-body:color-mix(in_oklab,var(--color-void)_78%,transparent)] [--band-quiet:color-mix(in_oklab,var(--color-void)_68%,transparent)] [--band-accent:var(--color-teal)] [--band-rule:color-mix(in_oklab,var(--color-teal)_22%,transparent)] [--band-panel:color-mix(in_oklab,var(--color-void)_5%,transparent)]",
  // A half-step warmer than cream, for two light bands in a row.
  sand: "bg-[color-mix(in_oklab,var(--color-cream)_88%,var(--color-gold))] [--band-ink:var(--color-void)] [--band-body:color-mix(in_oklab,var(--color-void)_78%,transparent)] [--band-quiet:color-mix(in_oklab,var(--color-void)_68%,transparent)] [--band-accent:var(--color-teal)] [--band-rule:color-mix(in_oklab,var(--color-teal)_22%,transparent)] [--band-panel:color-mix(in_oklab,var(--color-void)_5%,transparent)]",
};

export function Band({
  id,
  children,
  tone: t = "cream",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: BandTone;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-20 text-[var(--band-body)] sm:px-8 lg:py-28 ${tone[t]} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/** Small gold kicker above a band title. */
export function BandEyebrow({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.28em] text-[var(--band-accent)] ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-8 bg-gradient-to-l from-[var(--band-accent)] to-transparent" />
      {children}
    </span>
  );
}

export function BandTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-display text-3xl leading-[1.2] font-black text-[var(--band-ink)] sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

/** The recurring gold pill that acts as the page's stopping point. */
export function PillLink({
  href,
  children,
  external = false,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-center font-bold transition";
  const look =
    variant === "solid"
      ? "bg-gradient-to-l from-gold-dp via-gold to-gold-lt text-void shadow-[0_14px_45px_-16px_rgba(211,169,106,0.9)] hover:brightness-110"
      : "border border-[var(--band-rule)] text-[var(--band-ink)] hover:border-[var(--band-accent)] hover:text-[var(--band-accent)]";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${look} ${className}`}
    >
      {children}
    </a>
  );
}
