import { NextRequest, NextResponse } from "next/server";
import { createOrder, createProofWorkflow } from "@/lib/airtable";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const blocked = rateLimit(ip, "submit-logo", { maxRequests: 5, windowMs: 60_000 });
  if (blocked) return blocked;

  try {
    const formData = await req.formData();

    const orderId = formData.get("orderId") as string;
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const posterTitle = formData.get("posterTitle") as string;
    const language = formData.get("language") as string;
    const size = formData.get("size") as string;
    const quantity = parseInt(formData.get("quantity") as string, 10) || 1;
    const customerNotes = formData.get("customerNotes") as string;

    if (!orderId || !customerName || !customerEmail || !posterTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Enforce length limits
    if (customerName.length > 100 || customerEmail.length > 254 || posterTitle.length > 200 || (customerNotes && customerNotes.length > 5000)) {
      return NextResponse.json({ error: "One or more fields exceed maximum length" }, { status: 400 });
    }

    // 1. Create the order record in Airtable
    const orderRecord = await createOrder({
      "Customer Name": customerName,
      "Customer Email": customerEmail,
      "Product Description": `${posterTitle} — ${language === "es" ? "Spanish" : "English"} — Custom Logo`,
      Size: size,
      Quantity: quantity,
      Status: "In Progress",
      Source: "Website",
      "Order Notes": orderId ? `Order Reference: ${orderId}\nCustomer Notes: ${customerNotes || "None"}` : "",
    });

    // 2. Create a linked Logo & Proof Workflow record
    await createProofWorkflow({
      Order: [orderRecord.id],
      "Customer Logo Notes": customerNotes || "",
      "Logo Submitted Date": new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ success: true, recordId: orderRecord.id });
  } catch (err) {
    console.error("Logo submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
