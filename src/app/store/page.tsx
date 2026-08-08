import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/store/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { categoryHrefs, categoryLabels, purchasable } from "@/data/products";

export const metadata: Metadata = {
  title: "החנות",
  description:
    "כל מה שאפשר לרכוש ישירות — הספר, המדריכים, אתגר הכסף ומועדון העסקים. תשלום מאובטח דרך קארדקום.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="החנות"
        title="כל מה שאפשר להתחיל איתו"
        accent="כבר היום"
        sub="כאן מרוכז כל מה שנרכש ישירות באתר — מ-29 ₪ ומעלה. תוכניות הליווי הגדולות נסגרות בשיחת התאמה, ואפשר להגיע אליהן דרך עמודי התוכניות."
      >
        <nav aria-label="מעבר לעמודי התוכניות" className="mt-10 flex flex-wrap gap-2.5">
          {(Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map(
            (category) => (
              <Link
                key={category}
                href={categoryHrefs[category]}
                className="rounded-full border border-gold/25 px-5 py-2 text-sm font-medium text-cream/75 transition hover:border-gold/60 hover:text-gold-lt"
              >
                {categoryLabels[category]}
              </Link>
            ),
          )}
        </nav>
      </PageHeader>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {purchasable.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.06} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
