import { BrandStar } from "@/components/ui/Wordmark";
import { usaSeminar } from "@/data/usaSeminar";

/**
 * Gold band between the hero and the argument. Dark type on gold — the one
 * inverted moment on the page, so the eye gets a hard reset.
 *
 * The track is duplicated and the animation travels exactly -50%, which is
 * what makes the loop seamless. The copy is marked `aria-hidden` and the
 * meaning is carried by a single visually-hidden line instead, so screen
 * readers don't hear it twice.
 */
export default function UsaMarquee() {
  const beats = [usaSeminar.title, "MIAMI", usaSeminar.year, "LOS ANGELES"];
  const track = [...beats, ...beats, ...beats];

  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-gold-dp via-gold to-gold-dp py-4">
      <p className="sr-only">
        {usaSeminar.title} — {usaSeminar.year}
      </p>

      <div
        className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none"
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8">
            {track.map((beat, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8">
                <span
                  className="whitespace-nowrap text-sm font-black tracking-[0.2em] text-void/85 sm:text-base"
                  dir={/^[A-Z ]+$/.test(beat) ? "ltr" : undefined}
                >
                  {beat}
                </span>
                <BrandStar className="size-3 shrink-0 text-void/45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
