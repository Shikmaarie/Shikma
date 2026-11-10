import { RotateCcw } from "lucide-react";
import Login from "@/pages/Login";
import ParticipantRoadmap from "@/pages/ParticipantRoadmap";
import ReviewDashboard from "@/pages/ReviewDashboard";
import { useSession, useTracker } from "@/lib/tracker-store";

// In the real app each role lands on its own route after sign-in
// (/roadmap, /mentor, /admin). The preview bar does not exist there.
export default function App() {
  const { session } = useSession();
  const tracker = useTracker();

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 bg-foreground px-3 py-1.5 text-xs text-background">
        <span className="opacity-70">תצוגה מקדימה · גרסה ב׳ · הנתונים נשמרים רק בדפדפן הזה</span>
        <button type="button" onClick={tracker.resetDemo} className="inline-flex items-center gap-1 rounded-full px-3 py-0.5 opacity-70 hover:bg-background/10 hover:opacity-100">
          <RotateCcw className="h-3 w-3" aria-hidden />
          איפוס נתוני דוגמה
        </button>
      </div>
      {!session && <Login />}
      {session?.role === "participant" && session.participantId && <ParticipantRoadmap participantId={session.participantId} />}
      {session?.role === "mentor" && <ReviewDashboard role="mentor" mentorId={session.mentorId} />}
      {session?.role === "admin" && <ReviewDashboard role="admin" />}
    </>
  );
}
