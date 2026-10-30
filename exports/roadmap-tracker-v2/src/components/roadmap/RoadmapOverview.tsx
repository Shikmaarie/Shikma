import { Check, Lock } from "lucide-react";
import { lockedHint } from "@/data/copy";
import { monthIcons } from "@/data/icons";
import { months } from "@/data/roadmap";
import type { MonthEntry } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface Props {
  openMonth: number;
  selectedMonth: number;
  getEntry: (month: number) => MonthEntry;
  onSelect: (month: number) => void;
}

/**
 * The six-month path. Every month's title and program target are visible so the
 * participant sees where she is heading; only opened months can be entered.
 */
export const RoadmapOverview = ({ openMonth, selectedMonth, getEntry, onSelect }: Props) => (
  <nav aria-label="חודשי התוכנית">
    <ol className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
      {months.map((m) => {
        const locked = m.number > openMonth;
        const entry = getEntry(m.number);
        const approved = entry.status === "approved";
        const selected = m.number === selectedMonth;
        const Icon = monthIcons[m.number];
        return (
          <li key={m.number} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <button
              type="button"
              disabled={locked}
              onClick={() => onSelect(m.number)}
              aria-current={selected ? "step" : undefined}
              className={cn(
                "group flex h-full w-full flex-col gap-2 rounded-2xl border p-3 text-right transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                locked && "cursor-not-allowed border-dashed bg-muted/60 text-muted-foreground",
                !locked && "bg-card hover:-translate-y-0.5 hover:border-gold hover:shadow-md",
                selected && "border-primary bg-primary text-primary-foreground shadow-md hover:shadow-md",
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-enabled:group-hover:scale-110",
                    selected ? "bg-gold text-accent-foreground" : approved ? "bg-success text-success-foreground" : "bg-secondary text-primary",
                    locked && "bg-transparent",
                  )}
                >
                  {locked ? <Lock className="h-4 w-4" aria-hidden /> : approved ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : <Icon className="h-5 w-5" aria-hidden />}
                </span>
                <span className={cn("text-xs font-medium", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>חודש {m.number}</span>
              </span>
              <span className="text-sm font-bold leading-snug">{m.title}</span>
              <span className={cn("text-xs leading-snug", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {m.overviewTarget}
              </span>
              <span className="mt-auto pt-1">
                {locked ? (
                  <span className="text-xs">{lockedHint}</span>
                ) : (
                  !selected && <StatusBadge status={entry.status} short />
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);
