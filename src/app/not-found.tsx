import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center px-5 pt-32 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="ltr-nums font-display text-8xl font-black text-gradient-gold">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold text-cream sm:text-4xl">
          העמוד הזה לא קיים
        </h1>
        <p className="mt-4 text-cream/60">
          יכול להיות שהקישור השתנה, או שהגעת לכאן בטעות.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void transition hover:brightness-110"
          >
            לעמוד הבית
          </Link>
          <Link
            href="/store"
            className="rounded-full border border-gold/30 px-8 py-3.5 font-semibold text-cream transition hover:border-gold/70 hover:text-gold-lt"
          >
            לחנות
          </Link>
        </div>
      </div>
    </div>
  );
}
