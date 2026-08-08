"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] unhandled error", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center px-5 pt-32 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="font-display text-7xl font-black text-gradient-gold">
          אופס
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold text-mist sm:text-4xl">
          משהו נשבר כאן
        </h1>
        <p className="mt-4 leading-relaxed text-mist/60">
          זו תקלה אצלנו, לא אצלכם. נסו לרענן — ואם זה חוזר, נשמח שתספרו לנו.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void transition hover:brightness-110"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            לנסות שוב
          </button>
          <Link
            href="/"
            className="rounded-full border border-gold/30 px-8 py-3.5 font-semibold text-mist transition hover:border-gold/70 hover:text-gold-lt"
          >
            לעמוד הבית
          </Link>
        </div>

        {error.digest && (
          <p className="ltr-nums mt-8 text-xs text-mist/35">
            קוד שגיאה: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
