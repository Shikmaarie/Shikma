import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import ProgramDetail from "@/components/store/ProgramDetail";
import Contact from "@/components/sections/Contact";
import { byCategory } from "@/data/products";
import { wealthPage } from "@/data/site";

export const metadata: Metadata = {
  title: "שפע ומיינדסט",
  description:
    "ה-DNA של העושר, כנס „עושים אהבה עם הפחד מכסף” ואתגר הכסף והשפע — ריפוי פנימי, שבירת טראומות כספיות ובניית שושלת של שפע.",
};

export default function WealthPage() {
  const items = byCategory("wealth");

  return (
    <>
      <PageHeader
        eyebrow="שפע ומיינדסט"
        title={wealthPage.title}
        sub={wealthPage.sub}
      />

      <Section className="bg-void !pt-6">
        <div className="flex flex-col gap-8">
          {items.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.06}>
              <ProgramDetail product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Contact />
    </>
  );
}
