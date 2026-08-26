import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";

export const metadata: Metadata = {
  title: "ניהול הרשמות",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-void via-night to-void px-5 py-14 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-8 text-center font-display text-3xl font-black text-gold-lt">
          הרשמות שהתקבלו
        </h1>
        <AdminPanel />
      </div>
    </div>
  );
}
