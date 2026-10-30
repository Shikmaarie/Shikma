import { cn } from "@/lib/utils";

export const Progress = ({ value = 0, className }: { value?: number; className?: string }) => (
  <div
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(value)}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
  >
    <div className="h-full bg-gold transition-all" style={{ width: `${value}%` }} />
  </div>
);
