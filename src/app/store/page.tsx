import type { Metadata } from "next";
import ProductCard from "@/components/store/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { categoryLabels, products, type ProductCategory } from "@/data/products";

export const metadata: Metadata = {
  title: "החנות",
  description:
    "כל התוכניות, הקורסים הדיגיטליים, הכנסים והספרים של רחלי חדד — במקום אחד.",
};

const order: ProductCategory[] = ["club", "mentoring", "course", "event", "book"];

export default function StorePage() {
  const grouped = order
    .map((category) => ({
      category,
      items: products.filter((p) => p.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden px-5 pt-40 pb-16 sm:px-8">
        <span
          className="absolute left-1/2 top-0 h-72 w-[52rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <Eyebrow>החנות</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.08] font-black text-mist sm:text-6xl lg:text-7xl">
            כל מה שבניתי,{" "}
            <span className="text-gradient-gold">פתוח לפנייך</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist/65">
            מנקודת כניסה של 10 ₪ ועד ליווי צמוד לשנתיים. בחרי את מה שנכון לך
            עכשיו — התשלום מאובטח ומתבצע דרך קארדקום.
          </p>

          <nav aria-label="קטגוריות" className="mt-10 flex flex-wrap gap-2.5">
            {grouped.map(({ category }) => (
              <a
                key={category}
                href={`#${category}`}
                className="rounded-full border border-gold/25 px-5 py-2 text-sm font-medium text-mist/75 transition hover:border-gold/60 hover:text-gold-lt"
              >
                {categoryLabels[category]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {grouped.map(({ category, items }) => (
        <section
          key={category}
          id={category}
          className="scroll-mt-28 px-5 py-14 sm:px-8"
        >
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-8 flex items-center gap-4 font-display text-2xl font-bold text-mist sm:text-3xl">
              {categoryLabels[category]}
              <span
                className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent"
                aria-hidden="true"
              />
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.07} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="h-20" />
    </>
  );
}
