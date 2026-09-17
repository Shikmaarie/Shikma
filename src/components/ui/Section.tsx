import type { ReactNode } from "react";
import { BrandStar } from "./Wordmark";

export type Surface = "light" | "dark";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.28em] text-accent ${className}`}
    >
      <BrandStar className="size-2.5 shrink-0" />
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[1.95rem] leading-[1.14] font-black text-fg sm:text-[2.6rem] lg:text-[3.1rem] ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * A full-bleed horizontal band of one colour.
 *
 * The page is read as a stack of bands rather than one continuous
 * ground, so each declares the surface it presents and the semantic
 * colour utilities inside it resolve against that. `bleed` drops the
 * vertical padding for bands that own their own spacing (a hero, a
 * marquee).
 */
export function Section({
  id,
  children,
  className = "",
  surface = "light",
  bleed = false,
  full = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  surface?: Surface;
  /** Skip the standard vertical rhythm. */
  bleed?: boolean;
  /** Skip the centred max-width wrapper — for edge-to-edge content. */
  full?: boolean;
}) {
  const pad = bleed ? "" : "py-20 sm:py-24 lg:py-28";

  return (
    <section
      id={id}
      data-surface={surface}
      className={`relative scroll-mt-24 ${pad} ${className}`}
    >
      {full ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
      )}
    </section>
  );
}
