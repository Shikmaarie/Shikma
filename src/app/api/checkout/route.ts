import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { sanitizeRef } from "@/lib/ref";
import {
  CardcomNotConfiguredError,
  createLowProfileSession,
  type CheckoutLine,
} from "@/lib/cardcom";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  items?: { slug?: unknown; quantity?: unknown }[];
  customer?: {
    fullName?: unknown;
    email?: unknown;
    phone?: unknown;
    idNumber?: unknown;
  };
  ref?: unknown;
};

const MAX_QTY_PER_LINE = 10;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const customer = {
    fullName: str(body.customer?.fullName),
    email: str(body.customer?.email),
    phone: str(body.customer?.phone),
    idNumber: str(body.customer?.idNumber) || undefined,
  };

  if (!customer.fullName || !customer.email || !customer.phone) {
    return NextResponse.json(
      { error: "יש למלא שם מלא, אימייל וטלפון." },
      { status: 400 },
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) {
    return NextResponse.json(
      { error: "כתובת האימייל אינה תקינה." },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "העגלה ריקה." }, { status: 400 });
  }

  // Re-price everything from the catalog. Amounts sent by the client are ignored.
  const lines: CheckoutLine[] = [];
  for (const raw of body.items) {
    const product = getProduct(str(raw?.slug));
    // Application-only and free items have no price and must never be charged.
    if (!product || product.mode !== "purchase" || product.price == null) {
      return NextResponse.json(
        { error: "אחד המוצרים בעגלה אינו זמין לרכישה." },
        { status: 400 },
      );
    }

    const quantity = Math.floor(Number(raw?.quantity ?? 1));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY_PER_LINE) {
      return NextResponse.json({ error: "כמות לא תקינה." }, { status: 400 });
    }

    lines.push({
      slug: product.slug,
      name: product.name,
      quantity,
      unitPrice: product.price,
    });
  }

  const amount = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  if (amount <= 0) {
    return NextResponse.json({ error: "סכום לא תקין." }, { status: 400 });
  }

  // A mixed cart can only offer the lowest instalment ceiling among its items.
  const maxPayments = Math.min(
    ...lines.map((l) => getProduct(l.slug)?.maxPayments ?? 1),
  );

  const orderId = `RH-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;

  try {
    const { url } = await createLowProfileSession({
      orderId,
      amount,
      maxPayments,
      lines,
      customer,
      // Re-sanitised here: the browser supplies the referral, so it never
      // reaches Cardcom's reports unchecked.
      ref: sanitizeRef(body.ref),
      origin: resolveOrigin(request),
    });

    return NextResponse.json({ url, orderId });
  } catch (error) {
    if (error instanceof CardcomNotConfiguredError) {
      console.error("[checkout] Cardcom credentials missing");
      return NextResponse.json(
        {
          error:
            "הסליקה אינה מוגדרת עדיין. הגדירו CARDCOM_TERMINAL ו-CARDCOM_API_NAME.",
        },
        { status: 503 },
      );
    }

    console.error("[checkout] failed", error);
    return NextResponse.json(
      { error: "פתיחת עמוד התשלום נכשלה. נסו שוב בעוד רגע." },
      { status: 502 },
    );
  }
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Prefers the configured public origin so the URLs Cardcom redirects back to
 * are always ones we control, rather than whatever Host header arrived.
 */
function resolveOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return new URL(request.url).origin;
}
