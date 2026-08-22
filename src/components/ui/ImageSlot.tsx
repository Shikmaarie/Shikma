import Image from "next/image";
import { BrandStar } from "@/components/ui/Wordmark";
import type { Slot } from "@/data/home";

/**
 * Renders a photo from /public once one exists, and a branded stand-in until
 * then. The stand-in holds the exact aspect ratio the design calls for, so
 * dropping the real file in never reflows the page around it.
 *
 * To fill a slot: put the file in /public, then set `src` on the slot in
 * src/data/home.ts. Nothing here needs editing.
 */
export default function ImageSlot({
  slot,
  className = "",
  imgClassName = "",
  priority = false,
  tone = "light",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  slot: Slot;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  sizes?: string;
}) {
  if (slot.src) {
    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        priority={priority}
        sizes={sizes}
        className={`${className} ${imgClassName}`.trim()}
      />
    );
  }

  const dark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`מקום שמור לתמונה: ${slot.alt}`}
      style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
      className={`flex w-full flex-col items-center justify-center gap-3 border border-dashed p-6 text-center ${
        dark
          ? "border-laser/35 bg-tiber/60 text-linen/75"
          : "border-tiber/20 bg-linen/60 text-tiber/65"
      } ${className}`}
    >
      <BrandStar className={dark ? "size-6 text-laser" : "size-6 text-laser"} />
      <span className="text-sm leading-relaxed font-medium">{slot.alt}</span>
      <span
        className="ltr-nums text-[11px] tracking-wider opacity-60"
        aria-hidden="true"
      >
        {slot.width} × {slot.height}
      </span>
    </div>
  );
}
