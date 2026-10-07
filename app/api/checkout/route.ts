import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, type CheckoutItem, type ManualCheckoutItem } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const blocked = rateLimit(ip, "checkout", { maxRequests: 10, windowMs: 60_000 });
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const { items, manualItems, logoUpgrade, heardAbout, referrer } = body as {
      items?: CheckoutItem[];
      manualItems?: ManualCheckoutItem[];
      logoUpgrade: boolean;
      heardAbout?: string;
      referrer?: string;
    };

    const posterItems = Array.isArray(items) ? items : [];
    const manuals = Array.isArray(manualItems) ? manualItems : [];
    if (posterItems.length === 0 && manuals.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "https://platingposters.com";

    const url = await createCheckoutSession({
      items: posterItems,
      manualItems: manuals,
      logoUpgrade: !!logoUpgrade,
      successUrl: `${origin}/checkout/success`,
      cancelUrl: `${origin}/checkout/cancel`,
      heardAbout: typeof heardAbout === "string" ? heardAbout : undefined,
      referrer: typeof referrer === "string" ? referrer : undefined,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Checkout error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
