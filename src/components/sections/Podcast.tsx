import { Headphones, ArrowLeft } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { podcast } from "@/data/site";

export default function Podcast() {
  return (
    <Section id="podcast" className="bg-void">
      <Reveal>
        <div className="relative overflow-hidden rounded-5xl border border-gold/20 bg-gradient-to-bl from-teal via-night to-void px-7 py-16 sm:px-14 lg:px-20">
          <span
            className="absolute -left-24 -top-24 size-80 rounded-full bg-peri/12 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-28 -right-16 size-80 rounded-full bg-gold/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>{podcast.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-black text-cream sm:text-5xl">
                {podcast.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-cream/65">
                {podcast.body}
              </p>

              <a
                href={podcast.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dp via-gold to-gold-lt px-7 py-3.5 font-bold text-void transition hover:brightness-110"
              >
                <Headphones className="size-5" aria-hidden="true" />
                להאזנה לפרקים
                <ArrowLeft
                  className="size-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            <Waveform />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/** Purely decorative equaliser bars. */
function Waveform() {
  const bars = [42, 78, 30, 96, 58, 84, 36, 68, 24, 88, 46, 72];

  return (
    <div className="flex h-32 items-end gap-2" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-2 rounded-full bg-gradient-to-t from-gold-dp to-gold-lt animate-pulse-glow sm:w-3"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${2.4 + (i % 4) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
