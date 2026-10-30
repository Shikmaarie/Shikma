import { cn } from "@/lib/utils";

export const ProgressRing = ({ value, size = 64, className }: { value: number; size?: number; className?: string }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="7" className="stroke-secondary" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={cn("transition-[stroke-dashoffset] duration-700 ease-out", value === 100 ? "stroke-success" : "stroke-gold")}
        />
      </svg>
      <span className="ltr-nums absolute inset-0 flex items-center justify-center text-sm font-bold">{value}%</span>
    </div>
  );
};
