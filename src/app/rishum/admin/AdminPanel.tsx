"use client";

import { useState } from "react";
import { Download, Loader2, RefreshCw, Trash2 } from "lucide-react";

type Sheet = {
  columns: string[];
  rows: string[][];
  ids: string[];
  count: number;
};

export default function AdminPanel() {
  const [key, setKey] = useState("");
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<"none" | "loading" | "downloading">("none");

  async function load(event?: React.FormEvent, deleteId?: string) {
    event?.preventDefault();
    setError("");
    setBusy("loading");
    try {
      const response = await fetch("/api/registrations/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteId ? { key, deleteId } : { key }),
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

  function remove(index: number) {
    const name = sheet?.rows[index]?.[5] ?? "";
    if (!window.confirm(`למחוק את השורה של ${name}?`)) return;
    void load(undefined, sheet?.ids[index]);
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
      <form
        onSubmit={load}
        className="mx-auto max-w-sm space-y-4 rounded-[2rem] bg-kid-card p-7 shadow-[0_18px_40px_-28px_rgba(43,42,74,0.35)]"
      >
        <label htmlFor="key" className="block text-sm font-bold text-kid-ink">
          סיסמת ניהול
        </label>
        <input
          id="key"
          type="password"
          value={key}
          autoComplete="current-password"
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-2xl border-2 border-kid-line bg-kid-card px-4 py-3 text-kid-ink outline-none transition focus:border-kid-teal"
        />
        {error && <p className="text-sm font-bold text-kid-coral">{error}</p>}
        <button
          type="submit"
          disabled={busy !== "none"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-kid-teal px-6 py-3 font-black text-white transition hover:brightness-110 disabled:opacity-60"
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
        <p className="font-bold text-kid-ink-soft">
          {sheet.count === 0
            ? "עוד לא נרשם אף אחד."
            : `${sheet.count} רשומות (שורה לכל ילד/ה).`}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => load()}
            disabled={busy !== "none"}
            className="inline-flex items-center gap-2 rounded-full bg-kid-teal-lt px-5 py-2.5 font-bold text-kid-teal transition hover:brightness-95 disabled:opacity-60"
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-kid-sun-dp via-kid-sun to-kid-sun-dp px-5 py-2.5 font-black text-kid-ink shadow-[0_10px_22px_-14px_rgba(255,162,43,0.9)] transition hover:brightness-105 disabled:opacity-50"
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

      {error && <p className="text-sm font-bold text-kid-coral">{error}</p>}

      {sheet.count > 0 && (
        <div className="overflow-x-auto rounded-[1.75rem] bg-kid-card p-2 shadow-[0_18px_40px_-28px_rgba(43,42,74,0.35)]">
          <table className="w-full min-w-[46rem] text-right text-sm">
            <thead>
              <tr className="bg-kid-teal text-white">
                {sheet.columns.map((column, i) => (
                  <th
                    key={column}
                    className={`px-4 py-3 font-bold ${i === 0 ? "rounded-r-2xl" : ""}`}
                  >
                    {column}
                  </th>
                ))}
                <th className="rounded-l-2xl px-4 py-3">
                  <span className="sr-only">מחיקה</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sheet.rows.map((row, i) => (
                <tr key={i} className="text-kid-ink even:bg-kid-bg">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      disabled={busy !== "none"}
                      aria-label={`מחיקת השורה של ${row[5]}`}
                      className="rounded-full p-1.5 text-kid-ink-soft transition hover:bg-kid-coral/10 hover:text-kid-coral disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
