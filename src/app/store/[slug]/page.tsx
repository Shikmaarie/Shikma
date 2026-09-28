import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import AddToCartButton from "@/components/store/AddToCartButton";
import PriceTag from "@/components/store/PriceTag";
import ProductCard from "@/components/store/ProductCard";
import ProductSigil from "@/components/store/ProductSigil";
import PageHeader from "@/components/ui/PageHeader";
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

      {/*
        The same opening band as every other route, so a program page is not
        the odd one out and the fixed header always has a dark ground to
        read against at the top of the page.
      */}
      <PageHeader
        eyebrow={categoryLabels[product.category]}
        title={product.name}
        accent={product.tagline}
        sub={product.summary}
        breadcrumb={
          <Link
            href={categoryHrefs[product.category]}
            className="group inline-flex items-center gap-2 text-sm text-fg3 transition hover:text-accent"
          >
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
            חזרה ל{categoryLabels[product.category]}
          </Link>
        }
      >
        {product.badge && (
          <span className="mt-7 inline-block rounded-full border border-line-strong bg-coral/20 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-accent">
            {product.badge}
          </span>
        )}
      </PageHeader>

      <article className="px-5 pt-16 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              {product.detail && (
                <p className="text-lg leading-relaxed text-fg2">
                  {product.detail}
                </p>
              )}

              <section className={product.detail ? "mt-14" : ""}>
                <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-fg">
                  <Sparkles className="size-5 text-accent" aria-hidden="true" />
                  מה מקבלים
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl panel px-5 py-4 text-sm leading-relaxed text-fg2"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-14">
                <h2 className="font-display text-2xl font-bold text-fg">
                  למי זה מיועד
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {product.forWho.map((item, i) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="ltr-nums mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-xs font-black text-accent"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-fg2">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sticky purchase panel */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-4xl panel">
                {/* Same generative motif as the product's card, for continuity. */}
                <div className="relative h-40 border-b border-line bg-gradient-to-b from-teal/50 to-shell">
                  <ProductSigil
                    product={product}
                    className="absolute inset-0 h-full w-full"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ivory to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-8">
                <PriceTag product={product} size="lg" />

                {product.mode === "purchase" && (
                  <p className="mt-2 text-sm text-fg3">כולל מע״מ</p>
                )}

                {product.recurring && (
                  <p className="ltr-nums mt-4 rounded-2xl border border-line bg-card-2 px-4 py-3 text-sm leading-relaxed text-fg2">
                    לאחר החודש הראשון החיוב הוא{" "}
                    {product.recurring.amount.toLocaleString("he-IL")} ₪ לחודש
                    בהוראת קבע, וניתן לבטל בכל עת.
                  </p>
                )}

                <div className="mt-7">
                  <AddToCartButton slug={product.slug} size="lg" />
                </div>

                {/* Kept beside the cart, not in place of it: this product can
                    be bought here, and the landing page is the fuller read. */}
                {product.landing && product.mode === "purchase" && (
                  <a
                    href={product.landing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-fg2 transition hover:text-accent"
                  >
                    כל הפרטים בעמוד התוכנית
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}

                {/* The notebook only makes sense alongside the book. */}
                {product.slug === "first-100k-book" && (
                  <div className="mt-4 rounded-2xl border border-line bg-card-2 p-4">
                    <p className="text-sm text-fg2">
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

                <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-xs leading-relaxed text-fg3">
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>
                    {product.landing && product.mode !== "purchase"
                      ? "הכפתור מוביל לעמוד התוכנית, שם נמצאים כל הפרטים וטופס ההרשמה. העמוד נפתח בלשונית חדשה."
                      : product.mode === "purchase"
                        ? "התשלום מתבצע בעמוד סליקה מאובטח של קארדקום בתקן PCI-DSS. פרטי האשראי אינם עוברים דרך האתר ואינם נשמרים בו."
                        : "נדבר בשיחה קצרה, נבין איפה אתם נמצאים, ורק אז נחליט ביחד אם זה מתאים."}
                  </span>
                </div>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <h2 className="mb-8 flex items-center gap-4 font-display text-2xl font-bold text-fg sm:text-3xl">
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
