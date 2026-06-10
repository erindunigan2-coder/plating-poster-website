/**
 * Single source of truth for poster pricing, shipping, and logo upgrades.
 * Used by both client components (display) and server routes (validation).
 */

export const PRICES: Record<string, Record<string, number>> = {
  "Matte Laminate": { "18×24": 59, "24×36": 99, "36×48": 169 },
  "Shop Tough":     { "18×24": 69, "24×36": 115, "36×48": 189 },
};

export const VALID_SIZES = ["18×24", "24×36", "36×48"] as const;
export const VALID_FINISHES = ["Matte Laminate", "Shop Tough"] as const;
export const VALID_EDITIONS = ["Dark", "Light"] as const;
export const VALID_LANGUAGES = ["en", "es"] as const;

export const LOGO_UPGRADE_PRICE = 35;
export const SHIPPING_THRESHOLD = 99;
export const SHIPPING_FLAT_RATE = 9.95;

export function getUnitPrice(finish: string, size: string): number | null {
  return PRICES[finish]?.[size] ?? null;
}

export function getShippingCost(subtotal: number): number {
  return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
}
