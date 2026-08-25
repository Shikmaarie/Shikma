import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { connectionsCta } from "@/data/connections";

/**
 * The page's one call to action. `tone` picks the two treatments used in the
 * design: a small sand pill in the hero corner, a wide forest pill on the
 * parchment.
 */
export default function LandingCta({
  tone = "forest",
  label = connectionsCta.label,
  className = "",
}: {
  tone?: "forest" | "sand";
  label?: string;
  className?: string;
}) {
  const tones = {
    forest:
      "bg-forest text-parchment hover:bg-forest-dp px-8 py-4 text-base sm:px-10 sm:text-lg",
    sand: "bg-sand text-forest-dp hover:bg-sand/90 px-5 py-2.5 text-sm",
  };

  return (
    <Link
      href={connectionsCta.href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors ${tones[tone]} ${className}`}
    >
      {label}
      <ArrowLeft className="size-4 shrink-0" aria-hidden />
    </Link>
  );
}
