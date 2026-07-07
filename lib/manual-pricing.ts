// Manual pricing + purchase-metadata helpers.
// Kept in a small standalone module so client components (ManualOrderForm)
// can import pricing logic without pulling the full ~110 KB manuals registry
// into the browser bundle. Only the `Manual` TYPE is imported (erased at build).
import type { Manual } from "./manuals";

export type ManualFormat = "digital" | "print" | "combo";

/** Per-unit price for a format at a given quantity (print has volume tiers). */
export function manualUnitPrice(m: Manual, format: ManualFormat, quantity = 1): number {
  if (format === "digital") return m.priceDigital;
  if (format === "combo") return m.priceCombo;
  const q = Math.max(1, Math.floor(quantity || 1));
  for (const t of m.printVolumeTiers) {
    if (q >= t.min) return t.price;
  }
  return m.pricePrint;
}

/** Formats that include the digital PDF download (entitle a download). */
export function formatIncludesDigital(format: ManualFormat): boolean {
  return format === "digital" || format === "combo";
}

/** Formats that ship a physical copy. */
export function formatIsPhysical(format: ManualFormat): boolean {
  return format === "print" || format === "combo";
}

// ─── Stripe-session metadata encoding for purchased manuals ────────────────
// Stripe metadata values are capped at 500 chars. The old approach stored
// JSON.stringify(...).slice(0, 300), which silently truncated to INVALID JSON
// on larger orders — the customer was charged but the download page could not
// verify the purchase. This compact, validated encoding never truncates:
// "manualId:language:format" joined with commas.

export type PurchasedManual = { manualId: string; language: string; format: string };

export function encodePurchasedManuals(items: PurchasedManual[]): string {
  return items.map((m) => `${m.manualId}:${m.language}:${m.format}`).join(",");
}

/**
 * Parse the manuals metadata from a Stripe session. Supports both the compact
 * encoding and the legacy JSON format (so downloads from orders placed before
 * the changeover keep working). Returns [] for anything unparseable.
 */
export function parsePurchasedManuals(meta: string | undefined | null): PurchasedManual[] {
  if (!meta) return [];
  const trimmed = meta.trim();
  if (trimmed.startsWith("[")) {
    // Legacy JSON format (may be truncated — parse failure returns [])
    try {
      const parsed = JSON.parse(trimmed) as Array<{ manualId?: string; language?: string; format?: string }>;
      return parsed
        .filter((p) => typeof p.manualId === "string")
        .map((p) => ({
          manualId: p.manualId as string,
          language: p.language === "es" ? "es" : "en",
          // Legacy entries without a format were digital purchases
          format: p.format == null ? "digital" : String(p.format),
        }));
    } catch {
      return [];
    }
  }
  return trimmed
    .split(",")
    .filter(Boolean)
    .map((s) => {
      const [manualId, language, format] = s.split(":");
      return { manualId: manualId || "", language: language === "es" ? "es" : "en", format: format || "digital" };
    })
    .filter((p) => p.manualId);
}
