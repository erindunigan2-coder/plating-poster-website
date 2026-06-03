"use client";

import { useState } from "react";
import { Poster } from "@/lib/posters";
import { createCartAndCheckout, LOGO_UPGRADE_VARIANT_ID, toShopifySize, toShopifyLanguage } from "@/lib/shopify";

type Props = {
  poster: Poster;
  variantMap: Record<string, string>;
  edition?: "Dark" | "Light";
  onEditionChange?: (edition: "Dark" | "Light") => void;
};

const FINISHES = [
  {
    id: "Matte Laminate",
    label: "Matte Laminate",
    description: "100# photo stock with matte laminate. Clean, professional look.",
  },
  {
    id: "Shop Tough",
    label: "Shop Tough",
    description: ".030 styrene with matte laminate. Rigid, durable — built for harsh shop environments.",
  },
];

const EDITIONS: { id: "Dark" | "Light"; label: string; description: string }[] = [
  { id: "Dark", label: "Dark Edition", description: "Gunmetal background — flagship series." },
  { id: "Light", label: "Light Edition", description: "Warm off-white background — bright environments." },
];

export default function OrderForm({ poster, variantMap, edition: editionProp, onEditionChange }: Props) {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [size, setSize] = useState(poster.sizes[0]);
  const [finish, setFinish] = useState("Matte Laminate");
  const [editionInternal, setEditionInternal] = useState<"Dark" | "Light">("Dark");

  const edition = editionProp ?? editionInternal;
  const setEdition = (ed: "Dark" | "Light") => {
    setEditionInternal(ed);
    onEditionChange?.(ed);
  };
  const [logoUpgrade, setLogoUpgrade] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Retail pricing — finalized 2026-05-18. Free shipping on orders $99+, $9.95 flat rate under $99.
  const PRICES: Record<string, Record<string, number>> = {
    "Matte Laminate": { "18×24": 59, "24×36": 99, "36×48": 169 },
    "Shop Tough":     { "18×24": 69, "24×36": 115, "36×48": 189 },
  };
  const unitPrice = PRICES[finish]?.[size] ?? poster.price;
  const total = (unitPrice + (logoUpgrade ? poster.logoUpgradePrice : 0)) * quantity;

  const shopifySize = toShopifySize(size);
  // Key format matches Shopify variant titles: "Edition / Size / Finish"
  const variantKey = `${edition} / ${shopifySize} / ${finish}`;
  const variantId = variantMap[variantKey];

  async function handleAddToCart() {
    if (!variantId) {
      setError("This combination is not yet available. Please try different options or contact us.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const lineItems = [{ merchandiseId: variantId, quantity }];
      if (logoUpgrade) {
        lineItems.push({ merchandiseId: LOGO_UPGRADE_VARIANT_ID, quantity: 1 });
      }
      const cart = await createCartAndCheckout(lineItems);
      window.location.href = cart.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";

  const btnBase =
    "px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-colors cursor-pointer text-left";
  const btnActive = { background: gunmetal, color: "#F0EDE8", borderColor: gunmetal };
  const btnInactive = { background: "#fff", color: "#6B7080", borderColor: "#DDD9D0" };

  return (
    <div className="space-y-6">
      {/* Edition */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
          Edition
        </label>
        <div className="flex flex-col gap-2">
          {EDITIONS.map((ed) => (
            <button
              key={ed.id}
              onClick={() => setEdition(ed.id)}
              className={btnBase}
              style={edition === ed.id ? { ...btnActive, borderLeftColor: amber, borderLeftWidth: "3px" } : btnInactive}
            >
              <span className="block font-black">{ed.label}</span>
              <span className="block text-xs font-normal mt-0.5 opacity-70">{ed.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
          Language
        </label>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setLanguage("en")} className={btnBase} style={language === "en" ? btnActive : btnInactive}>
            🇺🇸 English
          </button>
          {poster.languages.includes("es") ? (
            <button onClick={() => setLanguage("es")} className={btnBase} style={language === "es" ? btnActive : btnInactive}>
              🇪🇸 Español
            </button>
          ) : (
            <div className="relative">
              <button
                disabled
                className={btnBase}
                style={{ ...btnInactive, color: "#bbb8b0", borderColor: "#ede9e0", cursor: "not-allowed", paddingRight: "80px" }}
              >
                🇪🇸 Español
              </button>
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-wider px-2 py-0.5"
                style={{ background: "#FFF3D6", color: "#E8A020", borderRadius: "3px", whiteSpace: "nowrap" }}
              >
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Size */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {poster.sizes.map((s) => (
            <button key={s} onClick={() => setSize(s)} className={btnBase} style={size === s ? btnActive : btnInactive}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
          Finish
        </label>
        <div className="flex flex-col gap-2">
          {FINISHES.map((f) => (
            <button
              key={f.id}
              onClick={() => setFinish(f.id)}
              className={btnBase}
              style={finish === f.id ? { ...btnActive, borderLeftColor: amber, borderLeftWidth: "3px" } : btnInactive}
            >
              <span className="block font-black">{f.label}</span>
              <span className="block text-xs font-normal mt-0.5 opacity-70">{f.description}</span>
            </button>
          ))}
        </div>
        {finish === "Shop Tough" && (
          <p className="text-xs mt-2" style={{ color: "#17857A" }}>
            ✔ Shop Tough prints on rigid .030 styrene — holds up in wet and chemical environments.
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 font-black text-lg flex items-center justify-center border"
            style={{ borderColor: "#DDD9D0", color: gunmetal, background: "#fff" }}
          >−</button>
          <span className="text-xl font-black w-6 text-center" style={{ color: gunmetal }}>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 font-black text-lg flex items-center justify-center border"
            style={{ borderColor: "#DDD9D0", color: gunmetal, background: "#fff" }}
          >+</button>
        </div>
      </div>

      {/* Logo Upgrade */}
      <div className="p-4 rounded" style={{ background: gunmetal }}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={logoUpgrade}
            onChange={(e) => setLogoUpgrade(e.target.checked)}
            className="mt-0.5 w-4 h-4"
            style={{ accentColor: amber }}
          />
          <div>
            <span className="font-black uppercase text-sm text-white block tracking-wide">
              Add Custom Logo{" "}
              <span style={{ color: amber }}>+${poster.logoUpgradePrice}</span>
            </span>
            <span className="text-xs leading-relaxed block mt-1" style={{ color: "#9098A8" }}>
              We&apos;ll place your company logo on the poster. You&apos;ll receive a digital proof for approval before anything prints.
            </span>
            <span className="text-xs mt-1 block" style={{ color: "#3A4055" }}>
              Accepted: High-res JPEG or PNG (300 dpi at print size) · Vector files preferred
            </span>
          </div>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm font-semibold" style={{ color: "#E05C5C" }}>{error}</p>
      )}

      {/* Shipping */}
      <div className="flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ background: "#F0FAF8", border: "1px solid #D0EDE8" }}>
        <span style={{ color: "#2EC4B6" }}>✓</span>
        <span style={{ color: "#1A1F2E" }}>
          {total >= 99
            ? <strong>Free shipping</strong>
            : <><strong>$9.95 flat rate shipping</strong> · Free on orders $99+</>
          }
        </span>
      </div>

      {/* Total + CTA */}
      <div className="pt-2">
        <div
          className="flex items-center justify-between mb-4"
          style={{ borderBottom: "1px solid #DDD9D0", paddingBottom: "1rem" }}
        >
          <span className="font-black uppercase text-xs tracking-widest" style={{ color: "#6B7080" }}>Total</span>
          <span className="font-black text-3xl" style={{ color: gunmetal }}>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full py-3 font-black text-sm tracking-widest uppercase transition-opacity"
          style={{ background: amber, color: gunmetal, opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Redirecting to checkout…" : "Add to Cart"}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: "#6B7080" }}>
          Secure checkout via Shopify. Printed and shipped by our print partner.
        </p>
      </div>
    </div>
  );
}
