import type { Metadata } from "next";
import { Gift, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import AddToCartButton from "@/components/store/AddToCartButton";
import PriceTag from "@/components/store/PriceTag";
import Faq from "@/components/sections/Faq";
import { getProduct } from "@/data/products";
import { clubPage } from "@/data/site";

export const metadata: Metadata = {
  title: "מועדון עסקים",
  description:
    "מועדון העסקים של רחלי חדד — זום שבועי חי, פודקאסטים קצרים וקהילה פעילה, בפחות מ-1.20 ₪ ליום.",
};

export default function ClubPage() {
  const club = getProduct("business-club");

  return (
    <>
      <PageHeader
        eyebrow="מועדון עסקים"
        title={clubPage.title}
        accent={clubPage.titleAccent}
        sub={clubPage.sub}
      />

      {/* The problem */}
      <Section className="bg-void !pt-6">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-5xl border border-rose/25 bg-gradient-to-b from-plum/40 to-void px-8 py-10 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-rose sm:text-3xl">
              {clubPage.problem.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-mist/70">
              {clubPage.problem.body}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* What's inside */}
      <Section className="bg-gradient-to-b from-void via-night to-void">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>מה מקבלים במועדון</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              המסגרת ש<span className="text-gradient-gold">מחזיקה אתכם</span>
            </SectionTitle>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {clubPage.includes.map((item, i) => (
            <Reveal key={item.title} delay={0.08 + i * 0.08}>
              <article className="h-full rounded-4xl glass p-8">
                <Sparkles className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-bold text-mist">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mist/60">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Join */}
      {club && (
        <Section className="bg-void">
          <Reveal>
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-5xl border border-gold/30 bg-gradient-to-t from-void via-plum/50 to-void px-8 py-12 text-center sm:px-14">
              <span
                className="absolute left-1/2 top-0 h-56 w-[38rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/14 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative">
                <h2 className="font-display text-3xl font-black text-mist sm:text-4xl">
                  מחיר השקה מיוחד
                </h2>

                <div className="mt-8 flex justify-center">
                  <PriceTag product={club} size="lg" />
                </div>

                <div className="mx-auto mt-8 max-w-sm">
                  <AddToCartButton
                    slug={club.slug}
                    label="הצטרפו למועדון"
                    size="lg"
                  />
                </div>

                <p className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl border border-gold/25 bg-void/50 px-5 py-4 text-sm leading-relaxed text-gold-lt">
                  <Gift className="size-5 shrink-0" aria-hidden="true" />
                  {clubPage.bonus}
                </p>

                <p className="mt-5 text-xs text-mist/45">
                  התשלום מתבצע בעמוד סליקה מאובטח של קארדקום.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      <Faq />
    </>
  );
}
