import NetworkGraphic from "./NetworkGraphic";
import { connectionsPhoto } from "@/data/connections";

const { cutout } = connectionsPhoto;

export default function PhotoBand() {
  return (
    <section className="relative bg-forest">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={connectionsPhoto.src}
          alt={connectionsPhoto.alt}
          className="block w-full object-cover"
        />

        {cutout ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cutout.src}
            alt=""
            aria-hidden
            style={{
              height: `${cutout.heightPct}%`,
              bottom: `${cutout.bottomPct}%`,
            }}
            className="pointer-events-none absolute left-1/2 z-10 w-auto max-w-none -translate-x-1/2 select-none"
          />
        ) : null}
      </div>

      <div className="relative bg-parchment">
        <NetworkGraphic className="h-28 w-full sm:h-36 lg:h-48" />
      </div>
    </section>
  );
}
