import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import { BrandStar } from "@/components/ui/Wordmark";
import { greeting } from "@/data/home";

/**
 * Band 5 — the founder's note. No family names appear here by design; see
 * CLAUDE.md before editing the paragraphs in src/data/home.ts.
 */
export default function Greeting() {
  return (
    <section id="about" className="scroll-mt-24 bg-ivory px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-laser">
            <BrandStar className="size-3" />
            {greeting.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-tiber sm:text-4xl">
            {greeting.title}
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-tiber/75">
            {greeting.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <p className="mt-7 font-display text-2xl font-bold text-tiber">
            {greeting.signOff}
          </p>

          <Link
            href={greeting.cta.href}
            className="mt-7 inline-flex items-center gap-2 font-bold text-bluestone transition hover:text-laser"
          >
            {greeting.cta.label}
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <ImageSlot
            slot={greeting.portrait}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="w-full rounded-3xl object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
