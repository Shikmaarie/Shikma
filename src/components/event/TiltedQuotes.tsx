import Reveal from "@/components/ui/Reveal";
import type { Testimonial } from "@/data/site";

/**
 * Testimonials as tilted message cards, echoing the pinned-screenshot look
 * of the reference landing page — but built from type rather than from
 * images, so the quotes stay selectable, searchable and readable to a
 * screen reader.
 *
 * These are the site's real testimonials. Nothing here is filler: if the
 * array grows the scatter keeps working, and if it shrinks to one the row
 * simply centres.
 */
export default function TiltedQuotes({ items }: { items: Testimonial[] }) {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-7">
      {items.map((t, i) => (
        <Reveal
          key={t.name}
          delay={0.08 * i}
          className="w-full max-w-sm sm:w-[22rem]"
        >
          <figure
            className={`flex h-full flex-col rounded-3xl bg-cream p-7 shadow-[0_28px_60px_-30px_rgba(0,0,0,0.75)] transition-transform duration-500 ${
              i % 2 === 0 ? "rotate-[-1.6deg]" : "rotate-[1.9deg]"
            } motion-safe:hover:rotate-0`}
          >
            <span
              className="font-display text-5xl leading-none text-gold-dp/45"
              aria-hidden="true"
            >
              ”
            </span>

            <blockquote className="mt-1 flex-1 text-lg leading-relaxed text-void/85">
              {t.quote}
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-teal/20 pt-4">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-teal font-display text-base font-bold text-gold-lt"
                aria-hidden="true"
              >
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-bold text-void">{t.name}</span>
                <span className="block text-sm text-void/68">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
