/**
 * Cardcom LowProfile (API v11) integration.
 *
 * Flow:
 *   1. Client posts cart line items (slug + qty) to /api/checkout.
 *   2. Server re-prices every line from the local catalog — the client never
 *      supplies an amount — and opens a LowProfile session with Cardcom.
 *   3. Server returns the hosted payment page URL; the browser redirects there.
 *   3b. A ?ref= referral travels in ReturnValue, so the deal itself records
 *      which partner brought the sale (see src/lib/ref.ts).
 *   4. Cardcom redirects the payer back to /checkout/success | /checkout/failed
 *      and independently calls /api/cardcom/webhook server-to-server.
 *   5. The webhook re-verifies the deal against Cardcom before fulfilment,
 *      so a forged callback cannot mark an order as paid.
 *
 * Required environment variables (see .env.example):
 *   CARDCOM_TERMINAL   — terminal number from the Cardcom back office
 *   CARDCOM_API_NAME   — API user name
 *   NEXT_PUBLIC_SITE_URL — public origin used to build the return URLs
 */

const CARDCOM_BASE = "https://secure.cardcom.solutions/api/v11";

/** ISO currency id for the Israeli Shekel in Cardcom's table. */
const ISO_ILS = 1;

export type CheckoutLine = {
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type CheckoutCustomer = {
  fullName: string;
  email: string;
  phone: string;
  idNumber?: string;
};

export type CreateLowProfileArgs = {
  orderId: string;
  amount: number;
  maxPayments: number;
  lines: CheckoutLine[];
  customer: CheckoutCustomer;
  /** Partner slug from ?ref=, or "" when the visit was not referred. */
  ref?: string;
  origin: string;
};

type LowProfileCreateResponse = {
  ResponseCode: number;
  Description?: string;
  LowProfileId?: string;
  Url?: string;
  UrlToBit?: string;
  UrlToPayPal?: string;
};

export type CardcomConfig = {
  terminalNumber: number;
  apiName: string;
};

export class CardcomNotConfiguredError extends Error {
  constructor() {
    super(
      "Cardcom is not configured. Set CARDCOM_TERMINAL and CARDCOM_API_NAME.",
    );
    this.name = "CardcomNotConfiguredError";
  }
}

export function getCardcomConfig(): CardcomConfig {
  const terminal = process.env.CARDCOM_TERMINAL;
  const apiName = process.env.CARDCOM_API_NAME;

  if (!terminal || !apiName) throw new CardcomNotConfiguredError();

  const terminalNumber = Number(terminal);
  if (!Number.isFinite(terminalNumber)) {
    throw new Error("CARDCOM_TERMINAL must be numeric.");
  }

  return { terminalNumber, apiName };
}

export function isCardcomConfigured(): boolean {
  return Boolean(process.env.CARDCOM_TERMINAL && process.env.CARDCOM_API_NAME);
}

/**
 * Opens a hosted payment session and returns the URL to redirect the payer to.
 */
export async function createLowProfileSession(
  args: CreateLowProfileArgs,
): Promise<{ url: string; lowProfileId: string }> {
  const { terminalNumber, apiName } = getCardcomConfig();
  const { orderId, amount, maxPayments, lines, customer, ref, origin } = args;

  const payload = {
    TerminalNumber: terminalNumber,
    ApiName: apiName,
    Operation: "ChargeOnly",
    ReturnValue: buildReturnValue(orderId, ref),
    Amount: amount,
    ISOCoinId: ISO_ILS,
    Language: "he",
    MaxNumOfPayments: Math.max(1, maxPayments),
    SuccessRedirectUrl: `${origin}/checkout/success?order=${encodeURIComponent(orderId)}`,
    FailedRedirectUrl: `${origin}/checkout/failed?order=${encodeURIComponent(orderId)}`,
    WebHookUrl: `${origin}/api/cardcom/webhook`,
    ProductName: buildProductName(lines),
    UIDefinition: {
      IsHideCardOwnerName: false,
      CardOwnerName: customer.fullName,
      CardOwnerEmail: customer.email,
      CardOwnerPhone: customer.phone,
    },
    Document: {
      To: customer.fullName,
      Email: customer.email,
      Mobile: customer.phone,
      IsSendByEmail: true,
      Products: lines.map((line) => ({
        Description: line.name,
        UnitCost: line.unitPrice,
        Quantity: line.quantity,
      })),
    },
  };

  const res = await fetch(`${CARDCOM_BASE}/LowProfile/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Cardcom HTTP ${res.status}`);
  }

  const data = (await res.json()) as LowProfileCreateResponse;

  if (data.ResponseCode !== 0 || !data.Url) {
    throw new Error(
      `Cardcom error ${data.ResponseCode}: ${data.Description ?? "unknown"}`,
    );
  }

  return { url: data.Url, lowProfileId: data.LowProfileId ?? "" };
}

export type LowProfileResult = {
  ResponseCode: number;
  Description?: string;
  ReturnValue?: string;
  LowProfileId?: string;
  TranzactionId?: number;
  Amount?: number;
  TranzactionInfo?: Record<string, unknown>;
};

/**
 * Server-to-server verification of a completed deal. Always call this before
 * fulfilling an order — the webhook body on its own is not trustworthy.
 */
export async function getLowProfileResult(
  lowProfileId: string,
): Promise<LowProfileResult> {
  const { terminalNumber, apiName } = getCardcomConfig();

  const res = await fetch(`${CARDCOM_BASE}/LowProfile/GetLpResult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      TerminalNumber: terminalNumber,
      ApiName: apiName,
      LowProfileId: lowProfileId,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Cardcom HTTP ${res.status}`);
  return (await res.json()) as LowProfileResult;
}

/**
 * Cardcom echoes ReturnValue back in the webhook and shows it on the deal in
 * the back office, so it is where the referral rides along with the order id.
 * Format: "RH-XXXX" for a direct sale, "RH-XXXX|ref=inbal" for a referred one.
 */
export function buildReturnValue(orderId: string, ref?: string): string {
  return ref ? `${orderId}|ref=${ref}` : orderId;
}

export function parseReturnValue(value: string | undefined): {
  orderId: string;
  ref: string;
} {
  const [orderId = "", tail = ""] = (value ?? "").split("|");
  return { orderId, ref: tail.startsWith("ref=") ? tail.slice(4) : "" };
}

function buildProductName(lines: CheckoutLine[]): string {
  const label =
    lines.length === 1
      ? lines[0].name
      : `${lines[0].name} +${lines.length - 1}`;
  // Cardcom truncates long descriptors; keep it well under the limit.
  return label.slice(0, 50);
}
