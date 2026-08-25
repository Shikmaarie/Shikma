import Reveal from "@/components/ui/Reveal";
import { connectionsAbout } from "@/data/connections";

export default function AboutRacheli() {
  const [topBadge, bottomBadge] = connectionsAbout.badges;

  return (
    <section className="bg-forest px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-3xl leading-[1.3] font-black text-white sm:text-4xl lg:text-5xl">
            {connectionsAbout.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-parchment/85 sm:text-lg">
            {connectionsAbout.body.map((para) => (
              <p key={para.lead}>
                <strong className="font-bold text-sand">{para.lead}</strong>
                {para.text}
              </p>
            ))}
            <p className="font-bold text-white">{connectionsAbout.closer}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-sm">
            {/* The arch the portrait sits in, echoing the lobby doorways */}
            <div className="overflow-hidden rounded-t-full rounded-b-4xl bg-sand/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={connectionsAbout.photo.src}
                alt={connectionsAbout.photo.alt}
                className="block w-full object-cover"
              />
            </div>

            <span className="absolute top-8 -left-2 rounded-2xl bg-white px-4 py-2 text-center shadow-lg sm:-left-6">
              <span className="block text-xs font-bold text-forest-lt">
                {topBadge.value}
              </span>
              <span className="block text-sm font-black text-forest">
                {topBadge.label}
              </span>
            </span>

            <span className="absolute bottom-10 -left-2 rounded-2xl bg-white px-4 py-2 text-center shadow-lg sm:-left-10">
              <span className="block text-xs font-bold text-forest-lt">
                {bottomBadge.value}
              </span>
              <span className="block text-sm font-black text-forest">
                {bottomBadge.label}
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
