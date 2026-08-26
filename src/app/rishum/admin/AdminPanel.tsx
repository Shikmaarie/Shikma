"use client";

import { useState } from "react";
import { Download, Loader2, RefreshCw } from "lucide-react";

type Sheet = { columns: string[]; rows: string[][]; count: number };

export default function AdminPanel() {
  const [key, setKey] = useState("");
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"none" | "loading" | "downloading">("none");

  async function load(event?: React.FormEvent) {
    event?.preventDefault();
    setError("");
    setBusy("loading");
    try {
      const response = await fetch("/api/registrations/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setError(body.error ?? "לא הצלחנו לטעון את הנתונים.");
        setSheet(null);
        return;
      }
      setSheet((await response.json()) as Sheet);
    } catch {
      setError("אין חיבור לשרת.");
    } finally {
      setBusy("none");
    }
  }

  async function download() {
    setError("");
    setBusy("downloading");
    try {
      const response = await fetch("/api/registrations/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, format: "xlsx" }),
      });
      if (!response.ok) {
        setError("ההורדה נכשלה. נסו לטעון מחדש.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `רישום ילדים ${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("ההורדה נכשלה. נסו שוב.");
    } finally {
      setBusy("none");
    }
  }

  if (!sheet) {
    return (
      <form onSubmit={load} className="mx-auto max-w-sm space-y-4">
        <label
          htmlFor="key"
          className="block text-sm font-bold text-cream/80"
        >
          סיסמת ניהול
        </label>
        <input
          id="key"
          type="password"
          value={key}
          autoComplete="current-password"
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-2xl border border-gold/25 bg-void/50 px-4 py-3 text-cream outline-none transition focus:border-gold"
        />
        {error && <p className="text-sm font-bold text-coral">{error}</p>}
        <button
          type="submit"
          disabled={busy !== "none"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-black text-void transition hover:brightness-110 disabled:opacity-60"
        >
          {busy === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "כניסה"
          )}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-cream/70">
          {sheet.count === 0
            ? "עוד לא נרשם אף אחד."
            : `${sheet.count} רשומות (שורה לכל ילד/ה).`}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => load()}
            disabled={busy !== "none"}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 font-bold text-gold transition hover:bg-gold/10 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${busy === "loading" ? "animate-spin" : ""}`}
            />
            רענון
          </button>
          <button
            type="button"
            onClick={download}
            disabled={busy !== "none" || sheet.count === 0}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-black text-void transition hover:brightness-110 disabled:opacity-50"
          >
            {busy === "downloading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            הורדת האקסל
          </button>
        </div>
      </div>

      {error && <p className="text-sm font-bold text-coral">{error}</p>}

      {sheet.count > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-gold/20">
          <table className="w-full min-w-[46rem] text-right text-sm">
            <thead className="bg-teal/60 text-cream">
              <tr>
                {sheet.columns.map((column) => (
                  <th key={column} className="px-4 py-3 font-bold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-gold/10 text-cream/85 odd:bg-night/40"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
