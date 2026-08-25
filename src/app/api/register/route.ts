import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Free-registration endpoint for the landing pages.
 *
 * Nothing is charged here, so unlike /api/checkout there is no catalogue to
 * re-price against — the job is to validate the lead and hand it to whatever
 * list the campaign runs on.
 *
 * `LEADS_WEBHOOK_URL` is where it goes: a Make/Zapier/CRM hook that adds the
 * person to the mailing list and sends the joining link. Until that is set the
 * lead is only written to the server log, and the response says so — see the
 * launch checklist in the README.
 */

type Body = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  source?: unknown;
};

/** Long enough for any real name or address, short enough to bound the payload. */
const MAX_FIELD = 120;

/** Israeli mobile/landline, with or without country code and separators. */
const PHONE = /^(?:\+?972|0)(?:[23489]|5[0-9]|7[0-9])\d{7}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Campaign labels the form is allowed to report. */
const SOURCES = ["partnerships-masterclass"];

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
  // Free text from the client, so it is clamped to a known set rather than
  // trusted — it ends up in the CRM as a campaign label.
  const source = SOURCES.includes(str(body.source)) ? str(body.source) : "unknown";

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "יש למלא שם מלא, טלפון ואימייל." },
      { status: 400 },
    );
  }

  if (fullName.length > MAX_FIELD || email.length > MAX_FIELD) {
    return NextResponse.json({ error: "אחד השדות ארוך מדי." }, { status: 400 });
  }

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "כתובת האימייל אינה תקינה." },
      { status: 400 },
    );
  }

  if (!PHONE.test(phone.replace(/[\s-]/g, ""))) {
    return NextResponse.json(
      { error: "מספר הטלפון אינו תקין." },
      { status: 400 },
    );
  }

  const lead = {
    fullName,
    email,
    phone: phone.replace(/[\s-]/g, ""),
    source,
    registeredAt: new Date().toISOString(),
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;

  if (!webhook) {
    // Not an error the visitor can act on — they filled the form correctly.
    // The registration is recorded in the log and the launch checklist covers
    // connecting the list.
    console.warn("[register] LEADS_WEBHOOK_URL is not set — lead only logged", {
      source: lead.source,
      registeredAt: lead.registeredAt,
    });
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("[register] webhook rejected the lead", res.status);
      return NextResponse.json(
        { error: "ההרשמה נכשלה. נסו שוב בעוד רגע." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[register] webhook call failed", error);
    return NextResponse.json(
      { error: "ההרשמה נכשלה. נסו שוב בעוד רגע." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}


function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
