import { useState } from "react";
import { RotateCcw } from "lucide-react";
import ParticipantRoadmap from "@/pages/ParticipantRoadmap";
import ReviewDashboard from "@/pages/ReviewDashboard";
import { useTracker } from "@/lib/tracker-store";
import { cn } from "@/lib/utils";

// PREVIEW SHELL ONLY. In the real app each role reaches its own route after
// login (/roadmap, /mentor, /admin) and this switcher does not exist.
type View = "participant" | "mentor" | "admin";

const views: { id: View; label: string }[] = [
  { id: "participant", label: "משתתפת" },
  { id: "mentor", label: "מלווה" },
  { id: "admin", label: "מנהלת התוכנית" },
];

export default function App() {
  const [view, setView] = useState<View>("participant");
  const tracker = useTracker();

  return (
    <>
      <div className="sticky top-[env(safe-area-inset-top,0px)] z-50 flex flex-wrap items-center justify-center gap-2 border-b bg-foreground px-3 py-2 text-xs text-background">
        <span className="opacity-70">גרסה ב׳ · צפייה בתור:</span>
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={cn("rounded-full px-3 py-1 font-semibold", view === v.id ? "bg-gold text-accent-foreground" : "hover:bg-background/10")}
          >
            {v.label}
          </button>
        ))}
        <button type="button" onClick={tracker.resetDemo} className="inline-flex items-center gap-1 rounded-full px-3 py-1 opacity-70 hover:bg-background/10 hover:opacity-100">
          <RotateCcw className="h-3 w-3" aria-hidden />
          איפוס נתוני דוגמה
        </button>
      </div>
      {view === "participant" && <ParticipantRoadmap participantId="p1" />}
      {view === "mentor" && <ReviewDashboard role="mentor" mentorId="mentor-1" />}
      {view === "admin" && <ReviewDashboard role="admin" />}
    </>
  );
}
