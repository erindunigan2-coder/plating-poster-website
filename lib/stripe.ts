import Stripe from "stripe";
import { getUnitPrice, getShippingCost, LOGO_UPGRADE_PRICE, VALID_SIZES, VALID_FINISHES, VALID_EDITIONS, VALID_LANGUAGES } from "./pricing";

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

export async function createCheckoutSession(params: {
  items: CheckoutItem[];
  logoUpgrade: boolean;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const { items, logoUpgrade, successUrl, cancelUrl } = params;

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

  // Determine shipping
  const shippingCost = getShippingCost(subtotal);

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
  const orderSummary = items.map(i =>
    `${i.posterTitle} (${i.edition}/${i.size}/${i.finish}/${i.language}) x${i.quantity}`
  ).join(" | ");

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
      items_json: JSON.stringify(items).slice(0, 500),
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return session.url;
}
