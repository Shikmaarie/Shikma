import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import { gifts } from "@/data/home";

/**
 * Band 3 — the three free guides, as wide alternating blocks. Each carries a
 * badge in the outer corner, the way the reference layout does.
 */
export default function Gifts() {
  return (
    <section id="gifts" className="scroll-mt-24 bg-ivory px-5 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {gifts.map((gift, i) => {
          const flipped = i % 2 === 1;
          return (
            <Reveal key={gift.title} delay={i * 0.08}>
              <article className="relative overflow-hidden rounded-4xl border border-tiber/10 bg-linen/45">
                <span className="absolute top-6 left-6 z-10 rounded-full bg-laser px-4 py-1.5 text-xs font-bold text-tiber shadow-sm">
                  {gift.badge}
                </span>

                <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12">
                  {/* Copy leads in the DOM every time, so reading order stays
                      right; only the visual column swaps. */}
                  <div className={flipped ? "lg:order-2" : ""}>
                    <h3 className="font-display text-2xl leading-snug font-bold text-tiber sm:text-3xl">
                      {gift.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-tiber/70">
                      {gift.body}
                    </p>
                    <Link
                      href={gift.cta.href}
                      className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-bluestone px-6 py-3.5 font-bold text-ivory transition hover:bg-tiber"
                    >
                      {gift.cta.label}
                      <ArrowLeft className="size-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className={flipped ? "lg:order-1" : ""}>
                    <ImageSlot
                      slot={gift.image}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="mx-auto w-full max-w-sm rounded-3xl object-cover"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
