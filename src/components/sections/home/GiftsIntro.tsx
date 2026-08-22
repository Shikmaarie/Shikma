import Reveal from "@/components/ui/Reveal";
import { BrandStar } from "@/components/ui/Wordmark";
import { giftsIntro } from "@/data/home";

/**
 * Band 2 — the pause between the opener and the three guides. The header
 * already carries the wordmark, so this band marks the turn with the brand
 * star alone rather than repeating the lockup on a light ground.
 */
export default function GiftsIntro() {
  return (
    <section className="bg-ivory px-5 pt-24 pb-4 text-center sm:px-8 lg:pt-32">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <BrandStar className="mx-auto size-8 text-laser" />
          <p className="mt-6 inline-block rounded-full bg-bluestone/10 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-bluestone">
            {giftsIntro.badge}
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight font-bold text-tiber sm:text-5xl">
            {giftsIntro.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-tiber/70">
            {giftsIntro.sub}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
