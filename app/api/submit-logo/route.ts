import { NextRequest, NextResponse } from "next/server";
import { createOrder, createProofWorkflow } from "@/lib/airtable";

export async function POST(req: NextRequest) {
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

    // 1. Create the order record in Airtable
    const orderRecord = await createOrder({
      "Shopify Order Number": orderId,
      "Customer Name": customerName,
      "Customer Email": customerEmail,
      "Poster Title": posterTitle,
      Language: language,
      Size: size,
      Quantity: quantity,
      "Order Type": "Custom Logo",
      "Unit Price": 75,
      "Total Price": (75 + 35) * quantity,
      "Order Date": new Date().toISOString().split("T")[0],
      Status: "Logo Received",
      "Order Source": "Website",
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
