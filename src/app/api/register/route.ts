import { NextResponse } from "next/server";
import { moneyFearLanding } from "@/data/landing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  event?: unknown;
};

/** The landing pages allowed to register through this route. */
const EVENTS = new Set<string>([moneyFearLanding.slug]);

/**
 * Registration for the free events.
 *
 * The lead is forwarded to whatever system actually holds the list — a mailing
 * platform, a CRM, or an automation webhook — configured through
 * `REGISTRATION_WEBHOOK_URL`. Without it the route refuses the registration
 * loudly rather than swallowing a lead that nobody will ever see.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const lead = {
    fullName: str(body.fullName),
    email: str(body.email),
    phone: str(body.phone),
    event: str(body.event),
  };

  if (!EVENTS.has(lead.event)) {
    return NextResponse.json({ error: "אירוע לא מוכר." }, { status: 400 });
  }

  if (!lead.fullName || !lead.email || !lead.phone) {
    return NextResponse.json(
      { error: "יש למלא שם מלא, אימייל וטלפון." },
      { status: 400 },
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json(
      { error: "כתובת האימייל אינה תקינה." },
      { status: 400 },
    );
  }

  // Israeli numbers, with or without country code and separators.
  const digits = lead.phone.replace(/[\s-]/g, "");
  if (!/^(\+?972|0)\d{8,9}$/.test(digits)) {
    return NextResponse.json(
      { error: "מספר הטלפון אינו תקין." },
      { status: 400 },
    );
  }

  const endpoint = process.env.REGISTRATION_WEBHOOK_URL;
  if (!endpoint) {
    console.error("[register] REGISTRATION_WEBHOOK_URL is not set");
    return NextResponse.json(
      {
        error:
          "טופס ההרשמה אינו מחובר עדיין. כתבו לנו במייל ונרשום אתכם ידנית.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, phone: digits, source: "landing" }),
    });

    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error("[register] forwarding failed", error);
    return NextResponse.json(
      { error: "ההרשמה נכשלה. נסו שוב בעוד רגע." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
