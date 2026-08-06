import { NextResponse } from "next/server";
import { getLowProfileResult, isCardcomConfigured } from "@/lib/cardcom";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cardcom calls this server-to-server when a deal reaches a final state.
 *
 * The posted body is treated purely as a pointer: we take the LowProfileId
 * from it and then ask Cardcom directly what happened. Anyone can POST here,
 * so nothing is fulfilled on the strength of the callback body alone.
 */
export async function POST(request: Request) {
  if (!isCardcomConfigured()) {
    console.error("[cardcom-webhook] received a callback but Cardcom is not configured");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const lowProfileId = await extractLowProfileId(request);

  if (!lowProfileId) {
    return NextResponse.json({ ok: false, error: "missing LowProfileId" }, { status: 400 });
  }

  try {
    const result = await getLowProfileResult(lowProfileId);
    const paid = result.ResponseCode === 0;
    const orderId = result.ReturnValue ?? "unknown";

    if (paid) {
      await fulfilOrder({
        orderId,
        lowProfileId,
        amount: result.Amount ?? 0,
        transactionId: result.TranzactionId,
      });
    } else {
      console.warn(
        `[cardcom-webhook] order ${orderId} not paid: ${result.ResponseCode} ${result.Description ?? ""}`,
      );
    }

    // Always 200 on a processed callback so Cardcom stops retrying.
    return NextResponse.json({ ok: true, paid });
  } catch (error) {
    console.error("[cardcom-webhook] verification failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function extractLowProfileId(request: Request): Promise<string> {
  const fromQuery = new URL(request.url).searchParams.get("lowprofilecode");
  if (fromQuery) return fromQuery;

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as Record<string, unknown>;
      const value = body.LowProfileId ?? body.lowprofilecode ?? body.LowProfileCode;
      return typeof value === "string" ? value : "";
    } catch {
      return "";
    }
  }

  try {
    const form = await request.formData();
    const value =
      form.get("LowProfileId") ??
      form.get("lowprofilecode") ??
      form.get("LowProfileCode");
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

/**
 * Fulfilment hook.
 *
 * Right now this only records the successful payment in the server log, which
 * is enough for the payment flow itself to be correct end to end. Wire the
 * real actions here — granting course access, adding the buyer to the CRM /
 * mailing list, sending the welcome email — once those systems are chosen.
 */
async function fulfilOrder(order: {
  orderId: string;
  lowProfileId: string;
  amount: number;
  transactionId?: number;
}) {
  console.info(
    `[cardcom-webhook] PAID order=${order.orderId} amount=${order.amount} tx=${order.transactionId ?? "-"}`,
  );
}
