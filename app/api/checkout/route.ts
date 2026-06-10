import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, type CheckoutItem } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, logoUpgrade } = body as {
      items: CheckoutItem[];
      logoUpgrade: boolean;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://platingposters.com";

    const url = await createCheckoutSession({
      items,
      logoUpgrade: !!logoUpgrade,
      successUrl: `${origin}/checkout/success`,
      cancelUrl: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
