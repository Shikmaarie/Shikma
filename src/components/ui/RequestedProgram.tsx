"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";

/**
 * Echoes back the program a visitor arrived from, when they came through a
 * program's own call to action.
 *
 * Client-side on purpose: reading `searchParams` in the page itself makes
 * the whole contact page dynamic, for one optional sentence. This keeps the
 * page static and renders the sentence once the query string is known.
 */
export default function RequestedProgram() {
  const slug = useSearchParams().get("program");
  // Only echo a slug that actually exists, so the URL can't inject text.
  const requested = products.find((p) => p.slug === slug);
  if (!requested) return null;

  return (
    <p className="mb-10 rounded-3xl border border-line-strong bg-mint/20 px-6 py-5 text-center text-fg">
      מתעניינים ב<span className="font-bold text-accent">{requested.name}</span>{" "}
      — נהדר. ציינו את זה בפנייה ואחזור אליכם עם כל הפרטים.
    </p>
  );
}
