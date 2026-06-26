import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getStripe } from "@/lib/stripe";
import { getManual } from "@/lib/manuals";

export const runtime = "nodejs";

// Gated digital delivery: streams a training-manual PDF only when the caller presents a
// PAID Stripe session that actually contains that manual as a DIGITAL purchase.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const sessionId = sp.get("session_id");
  const manualId = sp.get("manualId");
  const language = sp.get("language") === "es" ? "es" : "en";

  if (!sessionId || !manualId) {
    return NextResponse.json({ error: "Missing session_id or manualId" }, { status: 400 });
  }

  const manual = getManual(manualId);
  if (!manual) {
    return NextResponse.json({ error: "Unknown manual" }, { status: 404 });
  }

  // Verify the Stripe session is paid and contains this manual as a digital purchase
  let entitled = false;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Order not paid" }, { status: 403 });
    }
    const manualsJson = session.metadata?.manuals_json;
    if (manualsJson) {
      const purchased = JSON.parse(manualsJson) as Array<{ manualId: string; language: string; format: string }>;
      entitled = purchased.some(
        (p) => p.manualId === manualId && p.language === language && (p.format ?? "digital") === "digital"
      );
    }
  } catch {
    return NextResponse.json({ error: "Could not verify order" }, { status: 403 });
  }

  if (!entitled) {
    return NextResponse.json({ error: "This order does not include the digital download for this manual." }, { status: 403 });
  }

  // Stream the bundled PDF
  try {
    const filePath = path.join(process.cwd(), "private", "manuals", `${manualId}-${language}.pdf`);
    const buf = await readFile(filePath);
    const downloadName = `${manual.seriesLabel} Training Manual (${language === "es" ? "ES" : "EN"}).pdf`;
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not available" }, { status: 404 });
  }
}
