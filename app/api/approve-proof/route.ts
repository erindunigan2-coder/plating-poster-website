import { NextRequest, NextResponse } from "next/server";
import { updateProofWorkflow, updateOrder } from "@/lib/airtable";
import { rateLimit } from "@/lib/rate-limit";
import { verifyProofToken } from "@/lib/proof-token";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const blocked = rateLimit(ip, "approve-proof", { maxRequests: 10, windowMs: 60_000 });
  if (blocked) return blocked;

  try {
    const body = await req.json();
    // Accept both "recordId" (from frontend) and "proofRecordId" for backwards compat
    const proofRecordId = body.proofRecordId || body.recordId;
    const orderRecordId = body.orderRecordId;
    const decision = body.decision;
    const token = body.token;
    const feedback = typeof body.feedback === "string" ? body.feedback.slice(0, 5000) : "";

    if (!proofRecordId || !decision) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["approved", "changes"].includes(decision)) {
      return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
    }

    // Verify signed token — REQUIRED. Every proof link must carry a valid
    // HMAC token (generated with generateProofToken / _make-proof-link.js);
    // without this, anyone with a record ID could approve proofs.
    if (!token || typeof token !== "string" || !verifyProofToken(proofRecordId, token)) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
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
