import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { BrandStar } from "@/components/ui/Wordmark";
import { imagine } from "@/data/usaSeminar";

/**
 * The promise. Each line is set large and given its own rule, so the section
 * reads as a slow list of futures rather than a dense paragraph of benefits.
 */
export default function UsaImagine() {
  return (
    <section className="relative overflow-hidden bg-teal/25 px-5 py-24 sm:px-8 lg:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <Reveal>
          <div className="text-center">
            <Eyebrow>{imagine.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-tight font-black text-cream sm:text-5xl">
              {imagine.title}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-14">
          {imagine.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="flex items-start gap-4 border-b border-gold/12 py-6">
                <BrandStar className="mt-2 size-4 shrink-0 text-gold" />
                <span className="font-display text-xl leading-snug font-medium text-cream sm:text-2xl lg:text-[1.7rem]">
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <p className="font-display text-2xl font-black text-gradient-gold sm:text-3xl">
              {imagine.outro[0]}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
              {imagine.outro[1]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
