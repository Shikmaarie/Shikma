import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Section, SectionTitle, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import AddToCartButton from "@/components/store/AddToCartButton";
import { formatILS, products } from "@/data/products";

const accentRing: Record<string, string> = {
  gold: "hover:border-gold/60 hover:shadow-[0_28px_80px_-40px_rgba(212,169,95,0.7)]",
  rose: "hover:border-rose/60 hover:shadow-[0_28px_80px_-40px_rgba(227,163,182,0.6)]",
  orchid:
    "hover:border-orchid/60 hover:shadow-[0_28px_80px_-40px_rgba(154,113,214,0.6)]",
};

export default function Programs() {
  const featured = products.filter((p) => p.featured);

  return (
    <Section id="programs" className="bg-void">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>התוכניות</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-6">
            שלוש דרכים <span className="text-gradient-gold">להיכנס פנימה</span>
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 text-lg leading-relaxed text-mist/60">
            כל אחת נמצאת בשלב אחר. בחרי את נקודת הכניסה שמתאימה לך — אפשר
            להתחיל בקטן ולעלות מדרגה בכל רגע.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {featured.map((product, i) => (
          <Reveal key={product.slug} delay={0.1 + i * 0.1} className="h-full">
            <article
              className={`relative flex h-full flex-col overflow-hidden rounded-5xl glass p-8 transition duration-500 ${
                accentRing[product.accent]
              }`}
            >
              {product.badge && (
                <span className="absolute left-7 top-7 rounded-full border border-gold/35 bg-gold/12 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-gold-lt">
                  {product.badge}
                </span>
              )}

              <h3 className="mt-10 font-display text-2xl font-bold text-mist">
                {product.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-gold/75">
                {product.tagline}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-mist/60">
                {product.summary}
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {product.includes.slice(0, 5).map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-mist/70">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gold/12 pt-6">
                <p className="flex items-baseline gap-2">
                  <span className="ltr-nums font-display text-4xl font-black text-gradient-gold">
                    {formatILS(product.price)}
                  </span>
                  {product.recurring && (
                    <span className="text-xs text-mist/50">
                      ואז {formatILS(product.recurring.amount)} לחודש
                    </span>
                  )}
                </p>
                {product.maxPayments > 1 && (
                  <p className="ltr-nums mt-1 text-xs text-mist/45">
                    עד {product.maxPayments} תשלומים
                  </p>
                )}

                <div className="mt-5 flex flex-col gap-3">
                  <AddToCartButton slug={product.slug} />
                  <Link
                    href={`/store/${product.slug}`}
                    className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-mist/65 transition hover:text-gold-lt"
                  >
                    כל הפרטים
                    <ArrowLeft
                      className="size-4 transition-transform group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="mt-12 text-center">
          <Link
            href="/store"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-4 font-semibold text-mist transition hover:border-gold/70 hover:text-gold-lt"
          >
            לכל הקורסים, הכנסים והספרים
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
