import { NextResponse } from "next/server";
import {
  appendRegistrations,
  listRegistrations,
  validate,
  type RegistrationInput,
} from "@/lib/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = Partial<RegistrationInput> & {
  /** Honeypot: a real parent never sees this field, bots fill it in. */
  website?: unknown;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    // Pretend it worked — no reason to tell a bot what gave it away.
    return NextResponse.json({ saved: 0, duplicates: 0 });
  }

  const result = validate({
    parentName: String(body.parentName ?? ""),
    phone: String(body.phone ?? ""),
    children: Array.isArray(body.children) ? body.children : [],
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  let existing: Awaited<ReturnType<typeof listRegistrations>>;
  try {
    existing = await listRegistrations();
  } catch (error) {
    console.error("registrations: read failed", error);
    return NextResponse.json(
      { error: "לא הצלחנו לשמור כרגע. נסו שוב בעוד רגע." },
      { status: 503 },
    );
  }

  // A parent who submits the same child twice (double tap, refreshed page)
  // shouldn't end up with two rows.
  const known = new Set(
    existing.map((e) => `${e.phone}|${e.childName}|${e.grade}`),
  );
  const fresh = result.entries.filter(
    (e) => !known.has(`${e.phone}|${e.childName}|${e.grade}`),
  );

  if (fresh.length > 0) {
    try {
      await appendRegistrations(fresh);
    } catch (error) {
      console.error("registrations: write failed", error);
      return NextResponse.json(
        { error: "לא הצלחנו לשמור כרגע. נסו שוב בעוד רגע." },
        { status: 503 },
      );
    }
  }

  return NextResponse.json({
    saved: fresh.length,
    duplicates: result.entries.length - fresh.length,
  });
}
