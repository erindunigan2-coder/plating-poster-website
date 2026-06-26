import Stripe from "stripe";
import { getUnitPrice, getShippingCost, LOGO_UPGRADE_PRICE, VALID_SIZES, VALID_FINISHES, VALID_EDITIONS, VALID_LANGUAGES } from "./pricing";
import { getManual, manualUnitPrice, formatIsPhysical, type ManualFormat } from "./manuals";

// Lazy init — avoids crash during Next.js static page generation at build time
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

export type CheckoutItem = {
  posterId: string;
  posterTitle: string;
  edition: string;
  size: string;
  finish: string;
  language: string;
  quantity: number;
};

// Training manuals — digital download, printed hard copy, or both (combo).
export type ManualCheckoutItem = {
  manualId: string;
  language: string;
  quantity: number;
  format: "digital" | "print" | "combo";
};

export async function createCheckoutSession(params: {
  items: CheckoutItem[];
  manualItems?: ManualCheckoutItem[];
  logoUpgrade: boolean;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const { items, manualItems = [], logoUpgrade, successUrl, cancelUrl } = params;

  // Validate and build line items with server-side pricing
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotal = 0;

  for (const item of items) {
    if (!VALID_EDITIONS.includes(item.edition as typeof VALID_EDITIONS[number])) {
      throw new Error(`Invalid edition: ${item.edition}`);
    }
    if (!VALID_SIZES.includes(item.size as typeof VALID_SIZES[number])) {
      throw new Error(`Invalid size: ${item.size}`);
    }
    if (!VALID_FINISHES.includes(item.finish as typeof VALID_FINISHES[number])) {
      throw new Error(`Invalid finish: ${item.finish}`);
    }
    if (!VALID_LANGUAGES.includes(item.language as typeof VALID_LANGUAGES[number])) {
      throw new Error(`Invalid language: ${item.language}`);
    }

    const unitPrice = getUnitPrice(item.finish, item.size);
    if (unitPrice === null) {
      throw new Error(`No price for ${item.finish} / ${item.size}`);
    }

    subtotal += unitPrice * item.quantity;

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.posterTitle,
          description: `${item.edition} Edition · ${item.size} · ${item.finish} · ${item.language === "es" ? "Spanish" : "English"}`,
          metadata: {
            posterId: item.posterId,
            edition: item.edition,
            size: item.size,
            finish: item.finish,
            language: item.language,
          },
        },
        unit_amount: unitPrice * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    });
  }

  if (logoUpgrade) {
    subtotal += LOGO_UPGRADE_PRICE;
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Custom Logo Upgrade",
          description: "Your company logo placed on the poster with digital proof approval",
        },
        unit_amount: LOGO_UPGRADE_PRICE * 100,
      },
      quantity: 1,
    });
  }

  // Training manuals — digital download (no shipping), printed hard copy (ships), or combo (both)
  let manualPhysicalSubtotal = 0;
  for (const m of manualItems) {
    const manual = getManual(m.manualId);
    if (!manual) throw new Error(`Invalid manual: ${m.manualId}`);
    if (!VALID_LANGUAGES.includes(m.language as typeof VALID_LANGUAGES[number])) {
      throw new Error(`Invalid language: ${m.language}`);
    }
    const format: ManualFormat = m.format === "print" ? "print" : m.format === "combo" ? "combo" : "digital";
    const qty = Math.max(1, Math.floor(m.quantity || 1));
    const unit = manualUnitPrice(manual, format, qty);
    if (formatIsPhysical(format)) manualPhysicalSubtotal += unit * qty;
    const lang = m.language === "es" ? "Spanish" : "English";
    const desc = format === "combo"
      ? `Printed hard copy + Digital PDF · ${lang}`
      : format === "print"
      ? `Printed hard copy · ${lang}`
      : `Digital PDF download · ${lang}`;
    const fmtMeta = format === "combo" ? "print+digital" : format === "print" ? "print-hardcopy" : "digital-pdf";
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${manual.title} (Training Manual)`,
          description: desc,
          metadata: { manualId: manual.id, type: "manual", language: m.language, format: fmtMeta },
        },
        unit_amount: unit * 100,
      },
      quantity: qty,
    });
  }

  if (lineItems.length === 0) {
    throw new Error("No line items to check out");
  }

  // Shipping applies to physical items only — posters and printed hard-copy manuals. Digital downloads ship nothing.
  const hasPhysical = items.length > 0 || manualPhysicalSubtotal > 0;
  const shippingCost = hasPhysical ? getShippingCost(subtotal + manualPhysicalSubtotal) : 0;

  const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = shippingCost === 0
    ? [{
        shipping_rate_data: {
          display_name: "Free Shipping",
          type: "fixed_amount" as const,
          fixed_amount: { amount: 0, currency: "usd" },
        },
      }]
    : [{
        shipping_rate_data: {
          display_name: "Standard Shipping",
          type: "fixed_amount" as const,
          fixed_amount: { amount: Math.round(shippingCost * 100), currency: "usd" },
        },
      }];

  // Store order summary in metadata for webhook processing
  const orderSummary = [
    ...items.map(i => `${i.posterTitle} (${i.edition}/${i.size}/${i.finish}/${i.language}) x${i.quantity}`),
    ...manualItems.map(m => { const man = getManual(m.manualId); return `${man ? man.title : m.manualId} [Training Manual/${m.language === "es" ? "ES" : "EN"}] x${m.quantity}`; }),
  ].join(" | ");

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_options: shippingOptions,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    automatic_tax: { enabled: true },
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      order_summary: orderSummary.slice(0, 500),
      logo_upgrade: logoUpgrade ? "true" : "false",
      items_json: JSON.stringify(items).slice(0, 400),
      manuals_json: JSON.stringify(manualItems).slice(0, 300),
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return session.url;
}
