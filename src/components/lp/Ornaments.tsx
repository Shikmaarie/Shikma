/**
 * The line-art furniture from the campaign creative: thin gold arcs, loose
 * dots, and the dotted rule that separates its blocks.
 *
 * All strokes are flat colour on purpose. An SVG gradient here would need
 * `gradientUnits="userSpaceOnUse"` to survive on straight lines, and none of
 * these shapes gain anything from one.
 */

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 8"
      className={`h-2 w-full max-w-60 text-gold-ink ${className}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <line
        x1="8"
        y1="4"
        x2="232"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="4" cy="4" r="3.5" fill="currentColor" />
      <circle cx="120" cy="4" r="3.5" fill="currentColor" />
      <circle cx="236" cy="4" r="3.5" fill="currentColor" />
    </svg>
  );
}

/** Concentric arcs with a scatter of dots — the creative's corner motif. */
export function ArcScatter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`text-gold-ink ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.5">
        <circle cx="160" cy="160" r="150" />
        <circle cx="160" cy="160" r="126" />
        <circle cx="160" cy="160" r="98" strokeDasharray="3 9" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="290" cy="96" r="4" />
        <circle cx="262" cy="52" r="2.5" />
        <circle cx="228" cy="24" r="3.5" />
        <circle cx="300" cy="150" r="2.5" />
        <circle cx="180" cy="12" r="2" />
      </g>
    </svg>
  );
}

/** The mint marker the creative paints behind a phrase it wants read first. */
export function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-mist px-2 py-0.5 box-decoration-clone">
      {children}
    </span>
  );
}
