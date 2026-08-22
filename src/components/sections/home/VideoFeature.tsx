import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import { BrandStar } from "@/components/ui/Wordmark";
import { videoFeature } from "@/data/home";

/**
 * Band 4 — copy beside a video. Until a YouTube id is set in src/data/home.ts
 * the slot renders the poster stand-in, so the band never ships an empty
 * iframe or a dead player.
 */
export default function VideoFeature() {
  const { youtubeId } = videoFeature;

  return (
    <section className="bg-shell px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-laser">
            <BrandStar className="size-3" />
            {videoFeature.eyebrow}
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight font-bold text-tiber sm:text-4xl">
            {videoFeature.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-tiber/70">
            {videoFeature.body}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-tiber/10 bg-tiber/5 shadow-sm">
            {youtubeId ? (
              <iframe
                className="aspect-video w-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title={videoFeature.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <ImageSlot
                slot={videoFeature.poster}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="w-full object-cover"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
