import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "התשלום לא הושלם",
  robots: { index: false, follow: false },
};

export default async function FailedPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center px-5 pt-32 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-2xl text-center">
        <span className="mx-auto grid size-24 place-items-center rounded-full border border-coral/35 bg-coral/10">
          <XCircle className="size-12 text-coral" aria-hidden="true" />
        </span>

        <h1 className="mt-10 font-display text-4xl font-black text-cream sm:text-5xl">
          התשלום לא הושלם
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-cream/65">
          לא בוצע חיוב. זה קורה — לרוב בגלל פרט שגוי בכרטיס או סירוב זמני של
          חברת האשראי. הפריטים עדיין מחכים לך בעגלה.
        </p>

        {order && (
          <p className="ltr-nums mt-6 inline-block rounded-full border border-gold/20 bg-void/50 px-5 py-2 text-sm text-cream/55">
            מספר הזמנה: <span className="font-bold text-gold-lt">{order}</span>
          </p>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/checkout"
            className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void transition hover:brightness-110"
          >
            לניסיון נוסף
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3.5 font-semibold text-cream transition hover:border-gold/70 hover:text-gold-lt"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            צריכה עזרה
          </a>
        </div>
      </div>
    </div>
  );
}
