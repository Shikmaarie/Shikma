import { NextResponse } from "next/server";
import { cities, tickets } from "@/data/usaSeminar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  cityId?: unknown;
  ticketId?: unknown;
  notes?: unknown;
};

const MAX_NOTES = 1000;

/**
 * Seat reservations for the US seminar. This takes no payment — there is no
 * US checkout link yet — it captures the lead so Racheli's team can follow up.
 *
 * City and ticket are resolved from `usaSeminar.ts` rather than trusted from
 * the request, the same principle the Cardcom checkout uses when it re-prices
 * every line from the catalog.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const fullName = str(body.fullName);
  const email = str(body.email);
  const phone = str(body.phone);

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "יש למלא שם מלא, אימייל וטלפון." },
      { status: 400 },
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "כתובת האימייל אינה תקינה." },
      { status: 400 },
    );
  }

  const city = cities.find((c) => c.id === str(body.cityId));
  if (!city) {
    return NextResponse.json({ error: "יש לבחור עיר." }, { status: 400 });
  }

  const ticket = tickets.find((t) => t.id === str(body.ticketId));
  if (!ticket) {
    return NextResponse.json({ error: "יש לבחור סוג כרטיס." }, { status: 400 });
  }

  const registration = {
    fullName,
    email,
    phone,
    notes: str(body.notes).slice(0, MAX_NOTES) || undefined,
    city: { id: city.id, name: city.name, dates: city.dates },
    ticket: { id: ticket.id, name: ticket.name, price: ticket.price },
    receivedAt: new Date().toISOString(),
  };

  try {
    await recordRegistration(registration);
  } catch (error) {
    console.error("[usa-register] failed to record", error);
    return NextResponse.json(
      { error: "שמירת הפרטים נכשלה. נסו שוב בעוד רגע." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export type Registration = {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  city: { id: string; name: string; dates: string };
  ticket: { id: string; name: string; price: string | null };
  receivedAt: string;
};

/**
 * TODO before launch — nothing is persisted yet, exactly like `fulfilOrder`
 * in `api/cardcom/webhook/route.ts`. Wire this to whichever of these applies:
 *   - push the lead into the CRM / mailing list
 *   - send Racheli's team a notification
 *   - send the registrant a confirmation email
 *
 * Until then registrations only reach the server log, so someone has to be
 * watching it. Do not announce the page publicly before this is connected.
 */
async function recordRegistration(registration: Registration): Promise<void> {
  console.info("[usa-register] registration received", registration);
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
