import NetworkGraphic from "./NetworkGraphic";
import { connectionsPhoto } from "@/data/connections";

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

        {/* On wide screens the captions sit on their arches. Below `md` the
            arches are too narrow to label in place, so they become a row of
            chips underneath the photo instead. */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {connectionsPhoto.archways.map((arch) => (
            <span
              key={arch.label}
              style={{ left: `${arch.x}%` }}
              className="absolute top-[20%] -translate-x-1/2 rounded-full bg-forest px-4 py-1.5 text-sm font-bold whitespace-nowrap text-parchment lg:px-5 lg:py-2 lg:text-base"
            >
              {arch.label}
            </span>
          ))}
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-2 bg-forest px-5 pt-5 pb-6 md:hidden">
        {connectionsPhoto.archways.map((arch) => (
          <li
            key={arch.label}
            className="rounded-full border border-parchment/25 px-3.5 py-1.5 text-xs font-bold text-parchment"
          >
            {arch.label}
          </li>
        ))}
      </ul>

      <div className="relative bg-parchment">
        <NetworkGraphic className="h-24 w-full sm:h-32 lg:h-40" />
      </div>
    </section>
  );
}
