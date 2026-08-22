import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
import { successStories } from "@/data/home";
import { testimonials } from "@/data/site";

/**
 * Band 6 — the two real testimonials the site holds. Only quotes people
 * actually gave belong here; see CLAUDE.md.
 */
export default function SuccessStories() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-shell px-5 py-24 sm:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-laser">
            <BrandStar className="size-3" />
            {successStories.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-tiber sm:text-4xl">
            {successStories.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-tiber/70">
            {successStories.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-tiber/10 bg-ivory p-8">
                <Quote
                  className="size-7 text-laser"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 text-lg leading-relaxed text-tiber/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-tiber/10 pt-4">
                  <span className="block font-bold text-tiber">{t.name}</span>
                  <span className="block text-sm text-tiber/60">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mt-10 text-center">
          <Link
            href={successStories.cta.href}
            className="inline-flex items-center gap-2 font-bold text-bluestone transition hover:text-laser"
          >
            {successStories.cta.label}
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
