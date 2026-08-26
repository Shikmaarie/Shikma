import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildRegistrationsWorkbook,
  listRegistrations,
  toRow,
  COLUMNS,
} from "@/lib/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { key?: unknown; format?: unknown };

export async function POST(request: Request) {
  const password = process.env.REGISTRATIONS_ADMIN_PASSWORD ?? "";
  if (!password) {
    return NextResponse.json(
      {
        error:
          "הצפייה בנתונים לא הופעלה. יש להגדיר REGISTRATIONS_ADMIN_PASSWORD בשרת.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key : "";
  if (!matches(key, password)) {
    return NextResponse.json({ error: "סיסמה שגויה." }, { status: 401 });
  }

  const entries = await listRegistrations();
  entries.sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));

  if (body.format === "xlsx") {
    const file = buildRegistrationsWorkbook(entries);
    const stamp = new Date().toISOString().slice(0, 10);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="registrations-${stamp}.xlsx"; filename*=UTF-8''${encodeURIComponent(`רישום ילדים ${stamp}.xlsx`)}`,
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json({
    columns: COLUMNS.map((c) => c.header),
    rows: entries.map(toRow),
    count: entries.length,
  });
}

function matches(candidate: string, expected: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
