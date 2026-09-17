import { site } from "@/data/site";

/**
 * The brand lockup, rebuilt in type: the name, a rule broken by the
 * four-point star, and the tagline split either side of it.
 *
 * This is a faithful reconstruction, not the official artwork. If the real
 * logo file is added at `public/brand/logo.svg`, swap this for that asset —
 * a vector original will always beat a rebuild for letterform fidelity.
 */

export function BrandStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {/* Four-point star with concave sides, matching the logo's spark. */}
      <path
        d="M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Wordmark({
  size = "md",
  className = "",
}: {
  /** `sm` drops the tagline — use it where vertical space is tight. */
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const name =
    size === "lg"
      ? "text-4xl sm:text-5xl"
      : size === "md"
        ? "text-xl"
        : "text-lg";

  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      {/* Colour follows the surrounding band, so the same lockup works on
          the teal header and on ivory once the page is scrolled. */}
      <span className={`font-display font-black text-fg ${name}`}>
        {site.name}
      </span>

      {size !== "sm" && (
        <span
          className={`mt-2 flex items-center gap-2 text-accent ${
            size === "lg" ? "text-sm" : "text-[9px]"
          }`}
        >
          <span className="h-px w-6 bg-current opacity-40 sm:w-10" aria-hidden="true" />
          <span className="whitespace-nowrap">{site.roleParts[0]}</span>
          <BrandStar className={size === "lg" ? "size-3.5" : "size-2.5"} />
          <span className="whitespace-nowrap">{site.roleParts[1]}</span>
          <span className="h-px w-6 bg-current opacity-40 sm:w-10" aria-hidden="true" />
        </span>
      )}
    </span>
  );
}
