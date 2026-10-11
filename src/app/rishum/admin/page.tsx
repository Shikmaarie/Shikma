import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "ניהול הרשמות",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="kid-theme min-h-screen bg-gradient-to-b from-kid-bg via-kid-bg to-kid-bg-2 px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-8 text-center font-display text-3xl font-black text-kid-ink">
          הרשמות שהתקבלו
        </h1>
        <AdminPanel />
      </div>
    </div>
  );
}
