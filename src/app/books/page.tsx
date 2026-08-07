import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import ProductCard from "@/components/store/ProductCard";
import { byCategory } from "@/data/products";
import { booksPage, freeTrainings, site } from "@/data/site";

export const metadata: Metadata = {
  title: "ספרים ומדריכים",
  description:
    "ספר „ה-100K הראשון שלי”, המדריך לחופש כלכלי ב-7 צעדים, נוסחת ההכפלה והדרכות חינמיות.",
};

export default function BooksPage() {
  const items = byCategory("books");

  return (
    <>
      <PageHeader
        eyebrow="ספרים ומדריכים"
        title={booksPage.title}
        sub={booksPage.sub}
      />

      <Section className="bg-void !pt-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.07} className="h-full">
              <ProductCard product={product} showCategory={false} showIncludes />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Free trainings */}
      <Section className="bg-gradient-to-b from-void via-night to-void">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>הדרכות והרצאות חינמיות</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-6">
              להתחיל <span className="text-gradient-gold">בלי לשלם שקל</span>
            </SectionTitle>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {freeTrainings.map((training, i) => (
            <Reveal key={training.title} delay={0.08 + i * 0.09} className="h-full">
              <article className="flex h-full flex-col rounded-4xl glass p-8">
                <BookOpen className="size-6 text-gold" aria-hidden="true" />

                <h3 className="mt-5 font-display text-xl font-bold text-mist">
                  {training.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-mist/60">
                  {training.body}
                </p>

                <p className="mt-5 font-display text-2xl font-black text-gradient-gold">
                  חינם
                </p>

                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-mist transition hover:border-gold/80 hover:text-gold-lt"
                >
                  {training.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
