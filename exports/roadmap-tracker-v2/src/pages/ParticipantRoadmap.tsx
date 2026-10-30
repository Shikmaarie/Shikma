import { useState } from "react";
import { ChevronDown, Flag, Map as MapIcon, Info, UserRound } from "lucide-react";
import * as copy from "@/data/copy";
import { Card, CardContent } from "@/components/ui/card";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { MonthForm } from "@/components/roadmap/MonthForm";
import { RoadmapOverview } from "@/components/roadmap/RoadmapOverview";
import {
  definitions,
  howToUse,
  months,
  personalGoalsNote,
  programName,
  roadmapTitle,
  startingPoints,
} from "@/data/roadmap";
import { useTracker } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";

export default function ParticipantRoadmap({ participantId }: { participantId: string }) {
  const tracker = useTracker();
  const participant = tracker.participants.find((p) => p.id === participantId);
  const [selected, setSelected] = useState(participant?.openMonth ?? 1);
  const [guideOpen, setGuideOpen] = useState(false);

  if (!participant) return null;
  const mentor = tracker.mentors.find((m) => m.id === participant.mentorId);
  const month = months.find((m) => m.number === Math.min(selected, participant.openMonth))!;
  const entry = tracker.getEntry(participant.id, month.number);

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <BrandStar className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 text-gold/15" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
            <BrandStar className="h-3.5 w-3.5 text-gold" />
            {programName}
          </p>
          <h1 className="mt-2 text-[clamp(1.9rem,5vw,3rem)] font-extrabold leading-tight">{copy.greeting(participant.name.split(" ")[0])}</h1>
          <p className="mt-2 max-w-2xl text-primary-foreground/85">{copy.greetingSub}</p>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-primary-foreground/85">
            <div className="flex items-center gap-1.5">
              <dt className="flex items-center gap-1.5"><MapIcon className="h-4 w-4 text-gold" aria-hidden />{roadmapTitle}:</dt>
              <dd className="font-semibold text-primary-foreground">{participant.name}</dd>
            </div>
            {mentor && (
              <div className="flex items-center gap-1.5">
                <dt className="flex items-center gap-1.5"><UserRound className="h-4 w-4 text-gold" aria-hidden />המלווה שלך:</dt>
                <dd className="font-semibold text-primary-foreground">{mentor.name}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Starting point: set once, everything is compared against it */}
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:gap-6 sm:pt-5">
            <p className="flex shrink-0 items-center gap-2 font-bold text-primary"><Flag className="h-4 w-4 text-gold-deep" aria-hidden />{copy.startingPointQuestion}</p>
            <div role="radiogroup" aria-label="נקודת פתיחה" className="flex flex-wrap gap-2">
              {startingPoints.map((sp) => {
                const on = participant.startingPoint === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => tracker.setStartingPoint(participant.id, sp.id)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
                    )}
                  >
                    {sp.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* How to use */}
        <Card className="rounded-2xl">
          <button
            type="button"
            onClick={() => setGuideOpen((v) => !v)}
            aria-expanded={guideOpen}
            className="flex w-full items-center justify-between gap-3 p-5 text-right"
          >
            <span className="flex items-center gap-2 font-bold text-primary">
              <Info className="h-4 w-4" aria-hidden />
              {copy.guideTitle}
            </span>
            <ChevronDown className={cn("h-5 w-5 transition-transform", guideOpen && "rotate-180")} aria-hidden />
          </button>
          {guideOpen && (
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>{howToUse}</p>
              <dl className="grid gap-2 sm:grid-cols-2">
                {definitions.map((d) => (
                  <div key={d.term} className="rounded-md bg-secondary/60 p-3">
                    <dt className="font-bold text-primary">{d.term}</dt>
                    <dd className="text-muted-foreground">{d.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted-foreground">{personalGoalsNote}</p>
            </CardContent>
          )}
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-primary">{copy.overviewTitle}</h2>
          <RoadmapOverview
            openMonth={participant.openMonth}
            selectedMonth={month.number}
            getEntry={(n) => tracker.getEntry(participant.id, n)}
            onSelect={setSelected}
          />
        </section>

        <MonthForm
          key={month.number}
          month={month}
          entry={entry}
          onChange={(patch) => tracker.saveEntry(participant.id, month.number, { ...patch, status: entry.status === "returned" ? "returned" : "draft" })}
          onSubmit={() => tracker.submitEntry(participant.id, month.number)}
        />
      </main>
    </div>
  );
}
