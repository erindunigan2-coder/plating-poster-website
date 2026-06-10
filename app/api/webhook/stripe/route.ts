import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createOrder } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature verification failed";
    console.error("Webhook signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Retrieve line items for the order details
      const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });

      const logoUpgrade = session.metadata?.logo_upgrade === "true";

      // Build poster titles and details from line items
      const posterItems = lineItems.data.filter(
        (li) => li.description !== "Custom Logo Upgrade" &&
                !li.description?.includes("Custom Logo")
      );

      const posterTitles = posterItems
        .map((li) => li.description ? `${li.description} (x${li.quantity})` : `Item (x${li.quantity})`)
        .join(", ");

      // Get first poster's details for the main fields
      const firstItem = posterItems[0];
      const descParts = firstItem?.description?.split(" · ") || [];

      // Extract size from description (e.g., "Dark Edition · 18×24 · Matte Laminate · English")
      const size = descParts[1] || "";
      const language = descParts[3] === "Spanish" ? "Spanish" : "English";

      // Calculate totals
      const subtotal = lineItems.data.reduce(
        (sum, li) => sum + (li.amount_total || 0), 0
      ) / 100;
      const totalQuantity = posterItems.reduce(
        (sum, li) => sum + (li.quantity || 1), 0
      );

      // Build detailed internal notes
      const itemDetails = lineItems.data
        .map((li) => `- ${li.description || "Item"} x${li.quantity} — $${((li.amount_total || 0) / 100).toFixed(2)}`)
        .join("\n");

      const shippingCost = (session.shipping_cost?.amount_total || 0) / 100;
      const taxAmount = (session.total_details?.amount_tax || 0) / 100;

      const notes = [
        `Stripe Session: ${session.id}`,
        `Payment: ${session.payment_status}`,
        "",
        "Items:",
        itemDetails,
        "",
        `Subtotal: $${subtotal.toFixed(2)}`,
        shippingCost > 0 ? `Shipping: $${shippingCost.toFixed(2)}` : "Shipping: Free",
        taxAmount > 0 ? `Tax: $${taxAmount.toFixed(2)}` : "",
        `Total charged: $${((session.amount_total || 0) / 100).toFixed(2)}`,
      ].filter(Boolean).join("\n");

      // Build shipping address string
      // Use type assertion — shipping_details is present when shipping_address_collection is enabled
      const shippingDetails = (session as unknown as Record<string, unknown>).shipping_details as {
        name?: string;
        address?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string };
      } | null;
      const addr = shippingDetails?.address;
      const shippingAddress = addr
        ? [
            shippingDetails?.name,
            addr.line1,
            addr.line2,
            `${addr.city}, ${addr.state} ${addr.postal_code}`,
            addr.country,
          ].filter(Boolean).join("\n")
        : "";

      await createOrder({
        "Customer Name": session.customer_details?.name || "Unknown",
        "Customer Email": session.customer_details?.email || "",
        "Shipping Address": shippingAddress,
        "Product Description": posterItems.length === 1
          ? (firstItem?.description || "Poster")
          : `${posterItems.length} posters: ${posterTitles}`,
        Size: size,
        Quantity: totalQuantity,
        Status: logoUpgrade ? "In Progress" : "New",
        Source: "Website",
        "Order Notes": notes,
      });

      console.log(`Order created for session ${session.id}`);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`Failed to create Airtable order: ${errMsg}`);
      // Return 200 anyway to prevent Stripe retries — log the error for investigation
      // A failed Airtable write shouldn't cause Stripe to retry the webhook
    }
  }

  return NextResponse.json({ received: true });
}
