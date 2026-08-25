import Reveal from "@/components/ui/Reveal";
import NetworkGraphic from "./NetworkGraphic";
import { connectionsQuote } from "@/data/connections";

export default function ClosingQuote() {
  const [emphasis, rest] = connectionsQuote.lines;

  return (
    <section className="relative overflow-hidden bg-forest px-5 pt-20 pb-28 sm:px-8 lg:pt-28 lg:pb-36">
      <blockquote className="relative mx-auto w-full max-w-4xl text-center">
        <span
          aria-hidden
          className="mb-1 block text-right font-display text-6xl leading-none text-sand/50 sm:text-7xl"
        >
          &rdquo;
        </span>
        <p className="text-3xl leading-[1.3] font-black text-white sm:text-4xl lg:text-5xl">
          {emphasis}
        </p>
        <p className="mt-1 text-2xl leading-[1.3] font-light text-parchment/90 sm:text-3xl lg:text-4xl">
          {rest}
        </p>
      </blockquote>

      <NetworkGraphic className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-40 sm:h-36" />
    </section>
  );
}
