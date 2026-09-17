import { Headphones, ArrowLeft } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Photo, pill } from "@/components/ui/Editorial";
import { podcast } from "@/data/site";
import { photos } from "@/data/media";

export default function Podcast() {
  return (
    <Section id="podcast" surface="dark" className="bg-night" bleed>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:py-24">
        <Reveal>
          <div className="max-w-xl">
            <Eyebrow>{podcast.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-[2rem] font-black text-fg sm:text-[2.8rem]">
              {podcast.title}
            </h2>
            <p className="mt-5 leading-relaxed text-fg2 sm:text-lg">
              {podcast.body}
            </p>

            <a
              href={podcast.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-8 ${pill.gold}`}
            >
              <Headphones className="size-5" aria-hidden="true" />
              להאזנה לפרקים
              <ArrowLeft
                className="size-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <Photo
              slot={photos.podcast}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="aspect-4/3 w-full rounded-[2rem] rounded-tr-[6rem]"
            />
            <Waveform className="absolute -bottom-5 right-6 left-6" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Purely decorative equaliser bars. */
function Waveform({ className = "" }: { className?: string }) {
  const bars = [42, 78, 30, 96, 58, 84, 36, 68, 24, 88, 46, 72];

  return (
    <div
      className={`flex h-14 items-end justify-center gap-1.5 rounded-full border border-gold/25 bg-void/85 px-6 backdrop-blur-md ${className}`}
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-gold-dp to-gold-lt animate-pulse-glow"
          style={{
            height: `${h * 0.55}%`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${2.4 + (i % 4) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
