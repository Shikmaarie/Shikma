import type { Metadata } from "next";
import RegistrationForm from "./RegistrationForm";
import { BrandStar } from "@/components/ui/Wordmark";

export const metadata: Metadata = {
  title: "רישום פרטי ילדים והורים",
  description: "טופס רישום לילדים ונוער, מגילאי גן ועד כיתה י״ב.",
  // A private registration link — it shouldn't turn up in search results.
  robots: { index: false, follow: false },
};

export default function RegistrationPage() {
  return (
    <div className="kid-theme relative min-h-screen overflow-hidden bg-gradient-to-b from-kid-bg via-kid-bg to-kid-bg-2 px-5 py-14 sm:px-8">
      {/* Soft confetti blobs — decoration only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-kid-sun/25 blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-kid-teal/15 blur-3xl" />
        <div className="absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-kid-lilac/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        <header className="text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-kid-sun/25">
            <BrandStar className="h-7 w-7 text-kid-sun-dp" />
          </span>
          <h1 className="mt-5 font-display text-4xl font-black text-kid-ink sm:text-5xl">
            רישום פרטי ילדים והורים
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-kid-ink-soft">
            מגילאי גן ועד כיתה י״ב. ממלאים את פרטי ההורה פעם אחת, ומוסיפים
            שורה לכל ילד/ה. לוקח פחות מדקה.
          </p>
        </header>

        <div className="mt-10">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
