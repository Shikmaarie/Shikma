/**
 * Brand marks as inline SVG. lucide-react dropped its brand icon set, and
 * these are simple enough that pulling in a second icon package isn't worth it.
 * All are decorative — the accessible name lives on the wrapping link.
 */

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 8.5V6.9c0-.8.2-1.2 1.4-1.2H17V2.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v1.7H8v3h2.6V21h3.2v-9.2h2.6l.4-3H14Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Route motifs                                                        */
/* ------------------------------------------------------------------ */

/**
 * The four routes on the home page, drawn as line motifs rather than
 * emoji. They repeat the category motifs the product covers already use
 * (`ProductSigil`), so a visitor meets the same shape twice: once when
 * choosing a route, once on the product it leads to.
 */
export type PathMotif = "growth" | "ripple" | "circle" | "pages";

const motifPaths: Record<PathMotif, React.ReactNode> = {
  // Rising columns — growth and scale.
  growth: (
    <>
      <path d="M5 27V19" />
      <path d="M13 27V13" />
      <path d="M21 27V17" />
      <path d="M29 27V7" />
      <path d="M3 31h30" />
    </>
  ),
  // Expanding rings — inner work spreading outward.
  ripple: (
    <>
      <circle cx="18" cy="18" r="3.5" />
      <circle cx="18" cy="18" r="9" />
      <circle cx="18" cy="18" r="14.5" />
    </>
  ),
  // Interlocking circles — the community.
  circle: (
    <>
      <circle cx="13" cy="18" r="8.5" />
      <circle cx="23" cy="18" r="8.5" />
      <circle cx="18" cy="9" r="8.5" />
    </>
  ),
  // Unfolding pages — the books and guides.
  pages: (
    <>
      <path d="M18 10.5C15 8 11 7 6.5 7.5v18C11 25 15 26 18 28.5" />
      <path d="M18 10.5C21 8 25 7 29.5 7.5v18C25 25 21 26 18 28.5" />
      <path d="M18 10.5v18" />
    </>
  ),
};

export function PathIcon({
  motif,
  className,
}: IconProps & { motif: PathMotif }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {motifPaths[motif]}
    </svg>
  );
}
