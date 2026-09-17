import type { ReactNode } from "react";
import Image from "next/image";
import { BrandStar } from "./Wordmark";

/* ------------------------------------------------------------------ */
/* Handwritten aside                                                   */
/* ------------------------------------------------------------------ */

/**
 * A short spoken aside under a headline.
 *
 * The obvious move — copying the reference's handwritten script — does
 * not survive translation. Hebrew has no italic, and the handwriting
 * faces that do cover Hebrew are built for teaching children to write;
 * set beside Rubik they read as a mistake, not as an aside. So the
 * "said out loud" register is carried by weight and a drawn underline
 * instead: Rubik at its lightest, over a pen stroke.
 *
 * Keep it to one line. It stops working at two.
 */
export function ScriptLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`relative inline-block font-display text-xl leading-relaxed font-light text-accent sm:text-2xl ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 300 10"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-2 h-2.5 w-full text-coral-dp/70"
        aria-hidden="true"
      >
        <path
          d="M2 7C52 2 118 1 165 4c34 2 78 1 133-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Oversized ghost band                                                */
/* ------------------------------------------------------------------ */

/**
 * The outsized repeating wordmark that introduces a chapter. It is
 * decoration, not content — the real heading follows underneath — so it
 * is hidden from assistive tech entirely.
 */
export function GhostBand({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  // Two identical runs, each half the track, so the marquee loops seamlessly.
  const run = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div
      className={`pointer-events-none relative flex overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex shrink-0 animate-marquee items-center gap-8 pl-8"
        >
          {run.map((i) => (
            <span key={i} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-[clamp(3rem,11vw,8rem)] leading-none font-black whitespace-nowrap text-accent-soft opacity-15">
                {text}
              </span>
              <BrandStar className="size-[clamp(1rem,2.6vw,2rem)] shrink-0 text-accent-soft opacity-40" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Circular seal                                                       */
/* ------------------------------------------------------------------ */

/**
 * The rotating stamp that sits over the hero portrait.
 *
 * The caption is set on a circular path. The path is drawn
 * counter-clockwise on purpose: the browser lays Hebrew out right to
 * left along it, and on a clockwise arc that would stack the words
 * backwards around the ring.
 */
export function Seal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  // The fragment id has to be plain ASCII: a Hebrew `href="#…"` resolves
  // inconsistently across engines, and a textPath that cannot find its
  // path silently collapses to a single glyph.
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 1e6;
  const id = `seal-${h}`;
  const ring = `${text} · ${text} · `;

  return (
    <span className={`pointer-events-none block ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" className="size-full animate-spin-slow">
        <defs>
          {/* Counter-clockwise circle: sweep flag 0. */}
          <path
            id={id}
            d="M80 14 A66 66 0 0 0 80 146 A66 66 0 0 0 80 14"
            fill="none"
          />
        </defs>
        <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="80" cy="80" r="58" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        {/*
          `direction: ltr` is load-bearing. The document is RTL, and an RTL
          <text> lays a textPath out from startOffset *backwards* along the
          path, which clips the whole ring down to a single glyph. Forcing
          LTR here only sets the direction the run advances in; the bidi
          algorithm still shapes the Hebrew itself right to left.
        */}
        <text
          className="font-sans"
          style={{ direction: "ltr" }}
          fill="currentColor"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.5"
        >
          <textPath href={`#${id}`} startOffset="0%">
            {ring}
          </textPath>
        </text>
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hand-drawn marks                                                    */
/* ------------------------------------------------------------------ */

/** An ink circle drawn around a word, the way you'd ring it by hand. */
export function CircleMark({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-2">
      {children}
      <svg
        viewBox="0 0 120 48"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -inset-y-1.5 h-[calc(100%+0.75rem)] w-full text-coral-dp"
        aria-hidden="true"
      >
        <path
          d="M104 12C96 3 66 1 42 4 18 7 4 16 6 27c2 11 26 18 54 17 26-1 52-9 56-19 2-5-4-10-14-13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </span>
  );
}

/** The looping arrow that points from an aside to what it refers to. */
export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 96"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M112 6c-6 22-20 40-40 52-14 8-30 12-46 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.1 7"
      />
      <path
        d="M34 56c-4 5-8 9-13 13 7 1 13 4 18 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition";

export const pill = {
  /** Deep teal — the primary action on light ground. */
  solid: `${pillBase} bg-teal text-ivory hover:bg-teal-2`,
  /** Gold — the primary action on dark ground. */
  gold: `${pillBase} bg-gradient-to-l from-gold-dp via-gold to-gold-lt text-void hover:brightness-110`,
  /** Coral — the warm secondary, borrowed from the swatch sheet. */
  coral: `${pillBase} bg-coral text-ink hover:bg-coral-dp hover:text-ivory`,
  /** Outline that reads on whichever ground it lands on. */
  ghost: `${pillBase} border border-line-strong text-fg hover:border-current hover:text-accent`,
} as const;

/* ------------------------------------------------------------------ */
/* Photography slots                                                   */
/* ------------------------------------------------------------------ */

export type PhotoSlot = {
  /** Path under /public, or null while the real photograph is missing. */
  src: string | null;
  alt: string;
  /** Shown in the placeholder and listed in the README. */
  brief: string;
};

/**
 * A photograph, or — until the file lands in /public — a branded stand-in
 * that says what belongs there.
 *
 * Deliberately not a stock photo: an obviously-placeholder frame is
 * honest, and it makes the missing asset impossible to ship by accident.
 */
export function Photo({
  slot,
  className = "",
  sizes = "(min-width: 1024px) 45vw, 100vw",
  priority = false,
}: {
  slot: PhotoSlot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (slot.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-teal via-teal-2 to-night ${className}`}
      role="img"
      aria-label={slot.alt}
    >
      <span
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 14px)",
        }}
        aria-hidden="true"
      />
      <span className="relative flex max-w-[16rem] flex-col items-center gap-3 px-6 text-center">
        <BrandStar className="size-7 text-gold-lt/80" />
        <span className="text-xs leading-relaxed font-medium text-cream/70">
          {slot.brief}
        </span>
      </span>
    </div>
  );
}
