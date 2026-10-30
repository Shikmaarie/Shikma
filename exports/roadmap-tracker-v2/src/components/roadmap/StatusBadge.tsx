import { CheckCircle2, Clock, PencilLine, Undo2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { EntryStatus } from "@/lib/tracker-store";

const config: Record<EntryStatus, { label: string; variant: "secondary" | "gold" | "warning" | "success"; Icon: typeof Clock }> = {
  draft: { label: "בעבודה", variant: "secondary", Icon: PencilLine },
  submitted: { label: "ממתין לאישור המלווה", variant: "gold", Icon: Clock },
  returned: { label: "הוחזר להשלמה", variant: "warning", Icon: Undo2 },
  approved: { label: "אושר", variant: "success", Icon: CheckCircle2 },
};

export const StatusBadge = ({ status, short }: { status: EntryStatus; short?: boolean }) => {
  const { label, variant, Icon } = config[status];
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {short && status === "submitted" ? "ממתין לאישור" : label}
    </Badge>
  );
};
