import Reveal from "@/components/ui/Reveal";
import { connectionsForm } from "@/data/connections";

/** Until `connectionsForm.action` is set there is nowhere to send a lead. */
const isWired = connectionsForm.action.length > 0;

export default function RegisterForm() {
  return (
    <section id="register" className="scroll-mt-8 bg-white px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="mx-auto w-full max-w-3xl rounded-[2.5rem] bg-parchment px-6 py-12 sm:px-12 lg:py-16">
        <Reveal>
          <h2 className="text-center text-3xl leading-tight font-black text-forest sm:text-4xl lg:text-5xl">
            {connectionsForm.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            action={connectionsForm.action || undefined}
            method="post"
            className="mx-auto mt-10 grid max-w-xl gap-4"
          >
            {connectionsForm.fields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-1.5 block text-sm font-bold text-forest">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  autoComplete={field.autoComplete}
                  required
                  className="w-full rounded-xl border border-sand-lt bg-white px-4 py-3 text-forest-dp outline-none focus:border-forest"
                />
              </label>
            ))}

            <button
              type="submit"
              disabled={!isWired}
              className="mt-2 rounded-full bg-forest px-8 py-4 text-lg font-bold text-parchment transition-colors hover:bg-forest-dp disabled:cursor-not-allowed disabled:opacity-50"
            >
              {connectionsForm.submit}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-8 text-center text-sm text-forest-dp/70">
            {connectionsForm.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
