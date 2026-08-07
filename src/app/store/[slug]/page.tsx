import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import AddToCartButton from "@/components/store/AddToCartButton";
import PriceTag from "@/components/store/PriceTag";
import ProductCard from "@/components/store/ProductCard";
import {
  categoryHrefs,
  categoryLabels,
  getProduct,
  products,
} from "@/data/products";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "המוצר לא נמצא" };

  return {
    title: product.name,
    description: product.summary,
    openGraph: { title: product.name, description: product.summary },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  // Only products with a real published price get Offer markup.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: site.name },
    ...(product.mode === "purchase" && product.price != null
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "ILS",
            availability: "https://schema.org/InStock",
            url: `${site.url}/store/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-5 pt-36 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href={categoryHrefs[product.category]}
            className="group inline-flex items-center gap-2 text-sm text-mist/55 transition hover:text-gold-lt"
          >
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
            חזרה ל{categoryLabels[product.category]}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <span className="rounded-full border border-gold/25 bg-plum/40 px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-gold/85">
                {categoryLabels[product.category]}
              </span>

              <h1 className="mt-6 font-display text-4xl leading-[1.1] font-black text-mist sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg font-medium text-gold/80">
                {product.tagline}
              </p>

              <p className="mt-8 text-lg leading-relaxed text-mist/70">
                {product.summary}
              </p>

              {product.detail && (
                <p className="mt-4 leading-relaxed text-mist/55">
                  {product.detail}
                </p>
              )}

              <section className="mt-14">
                <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-mist">
                  <Sparkles className="size-5 text-gold" aria-hidden="true" />
                  מה מקבלים
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl glass px-5 py-4 text-sm leading-relaxed text-mist/75"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold text-mist">
                  למי זה מיועד
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {product.forWho.map((item, i) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="ltr-nums mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-gold/35 text-xs font-black text-gold"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-mist/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sticky purchase panel */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-4xl glass p-8">
                {product.badge && (
                  <span className="mb-5 inline-block rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-lt">
                    {product.badge}
                  </span>
                )}

                <PriceTag product={product} size="lg" />

                {product.mode === "purchase" && (
                  <p className="mt-2 text-sm text-mist/50">כולל מע״מ</p>
                )}

                {product.recurring && (
                  <p className="ltr-nums mt-4 rounded-2xl border border-gold/20 bg-void/40 px-4 py-3 text-sm leading-relaxed text-mist/70">
                    לאחר החודש הראשון החיוב הוא{" "}
                    {product.recurring.amount.toLocaleString("he-IL")} ₪ לחודש
                    בהוראת קבע, וניתן לבטל בכל עת.
                  </p>
                )}

                <div className="mt-7">
                  <AddToCartButton slug={product.slug} size="lg" />
                </div>

                {/* The notebook only makes sense alongside the book. */}
                {product.slug === "first-100k-book" && (
                  <div className="mt-4 rounded-2xl border border-gold/20 bg-void/40 p-4">
                    <p className="text-sm text-mist/70">
                      רוצים גם את מחברת ההשראה? אפשר להוסיף אותה ב-25 ₪.
                    </p>
                    <div className="mt-3">
                      <AddToCartButton
                        slug="inspiration-notebook"
                        label="הוספת מחברת השראה"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-start gap-2.5 border-t border-gold/12 pt-5 text-xs leading-relaxed text-mist/50">
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-gold/70"
                    aria-hidden="true"
                  />
                  <span>
                    {product.mode === "purchase"
                      ? "התשלום מתבצע בעמוד סליקה מאובטח של קארדקום בתקן PCI-DSS. פרטי האשראי אינם עוברים דרך האתר ואינם נשמרים בו."
                      : "נדבר בשיחה קצרה, נבין איפה אתם נמצאים, ורק אז נחליט ביחד אם זה מתאים."}
                  </span>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <h2 className="mb-8 flex items-center gap-4 font-display text-2xl font-bold text-mist sm:text-3xl">
                אולי יתאים לכם גם
                <span
                  className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent"
                  aria-hidden="true"
                />
              </h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
