import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import { BrandStar } from "@/components/ui/Wordmark";
import { communityCta } from "@/data/home";
import { site } from "@/data/site";

/**
 * Band 7 — the closing call to action, back on deep teal so it hands off
 * cleanly to the footer. The WhatsApp number comes from site.ts.
 */
export default function CommunityCta() {
  return (
    <section id="community" className="scroll-mt-24 overflow-hidden bg-tiber">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-laser">
            <BrandStar className="size-3" />
            {communityCta.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-bold text-ivory sm:text-4xl lg:text-5xl">
            {communityCta.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-linen/80">
            {communityCta.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-laser px-7 py-4 font-bold text-tiber transition hover:bg-linen"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {communityCta.cta.label}
            </a>
            <Link
              href={communityCta.secondary.href}
              className="inline-flex items-center gap-2 rounded-2xl border border-linen/25 px-7 py-4 font-bold text-linen transition hover:border-laser/60 hover:text-laser"
            >
              {communityCta.secondary.label}
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ImageSlot
            slot={communityCta.image}
            tone="dark"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="w-full rounded-[2rem] object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
