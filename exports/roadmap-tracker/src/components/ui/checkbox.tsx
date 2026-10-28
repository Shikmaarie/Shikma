import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = ({ id, checked, disabled, onCheckedChange, className }: CheckboxProps) => (
  <button
    id={id}
    type="button"
    role="checkbox"
    aria-checked={!!checked}
    disabled={disabled}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      "peer flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
      checked && "bg-primary text-primary-foreground",
      className,
    )}
  >
    {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
  </button>
);
