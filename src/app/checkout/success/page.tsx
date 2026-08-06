import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react";
import ClearCart from "./ClearCart";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "התשלום התקבל",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center px-5 pt-32 pb-20 sm:px-8">
      <ClearCart />

      <div className="mx-auto w-full max-w-2xl text-center">
        <span className="mx-auto grid size-24 place-items-center rounded-full border border-gold/35 bg-gold/10">
          <CheckCircle2 className="size-12 text-gold" aria-hidden="true" />
        </span>

        <h1 className="mt-10 font-display text-4xl font-black text-mist sm:text-5xl">
          קיבלנו את התשלום.{" "}
          <span className="text-gradient-gold">ברוכה הבאה.</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-mist/65">
          החשבונית והגישה נשלחות אלייך למייל ברגעים אלו. אם היא לא מגיעה תוך כמה
          דקות, שווה להציץ גם בתיקיית הספאם.
        </p>

        {order && (
          <p className="ltr-nums mt-6 inline-block rounded-full border border-gold/20 bg-void/50 px-5 py-2 text-sm text-mist/55">
            מספר הזמנה: <span className="font-bold text-gold-lt">{order}</span>
          </p>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-8 py-3.5 font-bold text-void transition hover:brightness-110"
          >
            חזרה לעמוד הבית
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3.5 font-semibold text-mist transition hover:border-gold/70 hover:text-gold-lt"
          >
            <Mail className="size-4" aria-hidden="true" />
            יש לי שאלה
          </a>
        </div>
      </div>
    </div>
  );
}
