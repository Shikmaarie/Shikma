import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { CircleMark, Photo, pill } from "@/components/ui/Editorial";
import HeroCanvas from "@/components/three/HeroCanvas";
import { painPromise } from "@/data/site";
import { photos } from "@/data/media";

/**
 * The claim that reframes the visitor's problem, set as a dark card
 * floating on the pale band — the one moment on the page that stops the
 * scroll rather than continuing it.
 *
 * The double-helix scene lives here rather than in the hero: this is the
 * section that argues results follow the DNA underneath them, so the
 * object illustrates the argument instead of decorating an entrance.
 */
export default function PainPromise() {
  const [opening, pivot, ...rest] = painPromise.paragraphs;

  return (
    <Section className="bg-mist" surface="light">
      <Reveal>
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] bg-night px-6 py-14 sm:px-12 sm:py-20 lg:px-20"
        >
          <div className="absolute inset-0 opacity-55" aria-hidden="true">
            <HeroCanvas />
          </div>
          <span
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_10%,rgba(4,23,26,0.72)_70%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
            <Eyebrow>{painPromise.kicker}</Eyebrow>

            <h2 className="mt-6 font-display text-[1.9rem] leading-[1.18] font-bold text-fg sm:text-4xl lg:text-[2.9rem]">
              רוב בעלי העסקים לא תקועים בגלל שיווק.
              <br />
              הם תקועים בגלל <CircleMark>{painPromise.mark}</CircleMark>.
            </h2>

            <p className="mt-8 leading-relaxed text-fg2 sm:text-lg">{opening}</p>

            <p className="mt-7 border-r-2 border-gold/60 pr-6 font-display text-xl leading-snug font-bold text-gold-lt sm:text-2xl">
              {pivot}
            </p>

            {rest.map((p) => (
              <p key={p} className="mt-7 leading-relaxed text-fg2 sm:text-lg">
                {p}
              </p>
            ))}

            <Link href={painPromise.cta.href} className={`group mt-10 ${pill.coral}`}>
              {painPromise.cta.label}
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* The snapshot that breaks the card's edge — the reference's
              "photo taped to the page" gesture. */}
          <Photo
            slot={photos.quote}
            sizes="220px"
            className="absolute -left-6 bottom-10 hidden aspect-3/4 w-44 rotate-[-6deg] rounded-2xl border-4 border-ivory shadow-[0_24px_60px_-28px_rgba(2,12,14,0.8)] xl:block"
          />
        </div>
      </Reveal>
    </Section>
  );
}
