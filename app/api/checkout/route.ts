import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, type CheckoutItem } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const blocked = rateLimit(ip, "checkout", { maxRequests: 10, windowMs: 60_000 });
  if (blocked) return blocked;

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
    console.error("Checkout error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
