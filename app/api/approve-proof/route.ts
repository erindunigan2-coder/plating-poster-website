import { NextRequest, NextResponse } from "next/server";
import { updateProofWorkflow, updateOrder } from "@/lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { proofRecordId, orderRecordId, decision, feedback } = await req.json();

    if (!proofRecordId || !decision) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["approved", "changes"].includes(decision)) {
      return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
    }

    const isApproved = decision === "approved";

    // Update the proof workflow record
    await updateProofWorkflow(proofRecordId, {
      "Customer Decision": isApproved ? "Approved" : "Changes Requested",
      "Customer Feedback": feedback || "",
      "Approval Date": isApproved ? new Date().toISOString().split("T")[0] : undefined,
    });

    // Also update the parent order status
    if (orderRecordId) {
      await updateOrder(orderRecordId, {
        Status: isApproved ? "Approved" : "Changes Requested",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Proof approval error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
