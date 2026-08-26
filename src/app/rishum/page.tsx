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
    <div className="min-h-screen bg-gradient-to-b from-void via-night to-void px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <header className="text-center">
          <BrandStar className="mx-auto h-8 w-8 text-gold" />
          <h1 className="mt-5 font-display text-4xl font-black text-gold-lt sm:text-5xl">
            רישום פרטי ילדים והורים
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-cream/70">
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
