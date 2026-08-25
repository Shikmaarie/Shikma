import Reveal from "@/components/ui/Reveal";
import { connectionsCurriculum } from "@/data/connections";

/** The last two cards centre themselves under the first three. */
const OFFSET = "lg:col-start-2";

export default function Curriculum() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="text-center text-3xl leading-[1.3] font-black text-forest sm:text-4xl lg:text-5xl">
            {connectionsCurriculum.title}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8">
          {connectionsCurriculum.items.map((item, i) => (
            <Reveal
              key={item.number}
              delay={0.06 + i * 0.06}
              className={`lg:col-span-2 ${i === 3 ? OFFSET : ""}`}
            >
              <article className="relative h-full rounded-3xl border border-sand-lt bg-white px-6 pt-12 pb-7 text-center shadow-[0_2px_18px_rgba(12,84,76,0.07)]">
                <span
                  aria-hidden
                  className="absolute top-0 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest"
                />
                <h3 className="text-lg font-black text-forest sm:text-xl">
                  {item.number} • {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-forest-dp/80 sm:text-lg">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
