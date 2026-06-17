import { NextRequest, NextResponse } from "next/server";
import { createOrder, createProofWorkflow, uploadAttachment } from "@/lib/airtable";
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
        { error: "Please fill in all required fields: order number, name, email, and poster title." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address — we need it to send your proof." }, { status: 400 });
    }

    // Enforce length limits
    if (customerName.length > 100 || customerEmail.length > 254 || posterTitle.length > 200 || (customerNotes && customerNotes.length > 5000)) {
      return NextResponse.json({ error: "One or more fields are too long. Please shorten and try again." }, { status: 400 });
    }

    // Check file size (if present)
    const logoFile = formData.get("logoFile") as File | null;
    if (logoFile && logoFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: `Your logo file is too large (${(logoFile.size / 1024 / 1024).toFixed(1)} MB). Maximum is 10 MB. Try saving as a high-quality PNG.` },
        { status: 400 }
      );
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
    const proofRecord = await createProofWorkflow({
      Order: [orderRecord.id],
      "Customer Logo Notes": customerNotes || "",
      "Logo Submitted Date": new Date().toISOString().split("T")[0],
    });

    // 3. Upload logo file to the proof workflow record
    if (logoFile && logoFile.size > 0) {
      try {
        await uploadAttachment(
          "Logo & Proof Workflow",
          proofRecord.id,
          "Customer Logo File",
          logoFile
        );
      } catch (uploadErr) {
        // Log but don't fail the whole submission — the order and proof records are already created
        console.error("Logo file upload failed:", uploadErr);
      }
    }

    return NextResponse.json({ success: true, recordId: orderRecord.id });
  } catch (err) {
    console.error("Logo submission error:", err);
    return NextResponse.json(
      { error: "We couldn't process your submission. Please try again, or email your logo directly to info@platingposters.com with your order number." },
      { status: 500 }
    );
  }
}
