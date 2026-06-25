"use client";

import { useState } from "react";
import { Manual } from "@/lib/manuals";

export default function ManualOrderForm({ manual }: { manual: Manual }) {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = manual.price * quantity;

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manualItems: [{ manualId: manual.id, language, quantity }],
          logoUpgrade: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";
  const btnBase = "px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-colors cursor-pointer text-left";
  const btnActive = { background: gunmetal, color: "#F0EDE8", borderColor: gunmetal };
  const btnInactive = { background: "#fff", color: "#6B7080", borderColor: "#DDD9D0" };

  return (
    <div className="space-y-6">
      {/* Format */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>Format</label>
        <div className="px-4 py-3 border" style={{ borderColor: "#DDD9D0", background: "#fff" }}>
          <span className="block font-black text-sm" style={{ color: gunmetal }}>📄 Digital PDF — {manual.pages} pages</span>
          <span className="block text-xs mt-1" style={{ color: "#6B7080" }}>Instant download after checkout. Print-ready (8.5×11). Single-shop license.</span>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>Language</label>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setLanguage("en")} className={btnBase} style={language === "en" ? btnActive : btnInactive}>🇺🇸 English</button>
          {manual.languages.includes("es") && (
            <button onClick={() => setLanguage("es")} className={btnBase} style={language === "es" ? btnActive : btnInactive}>🇪🇸 Español</button>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>Licensed Copies</label>
        <div className="flex items-center gap-3">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 font-black text-lg flex items-center justify-center border" style={{ borderColor: "#DDD9D0", color: gunmetal, background: "#fff" }}>−</button>
          <span className="text-xl font-black w-6 text-center" style={{ color: gunmetal }}>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 font-black text-lg flex items-center justify-center border" style={{ borderColor: "#DDD9D0", color: gunmetal, background: "#fff" }}>+</button>
        </div>
      </div>

      {error && <p className="text-sm font-semibold" style={{ color: "#E05C5C" }}>{error}</p>}

      <div className="flex items-center gap-2 px-3 py-2 rounded text-xs" style={{ background: "#F0FAF8", border: "1px solid #D0EDE8" }}>
        <span style={{ color: "#2EC4B6" }}>✓</span>
        <span style={{ color: "#1A1F2E" }}><strong>Instant digital delivery</strong> · no shipping</span>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4" style={{ borderBottom: "1px solid #DDD9D0", paddingBottom: "1rem" }}>
          <span className="font-black uppercase text-xs tracking-widest" style={{ color: "#6B7080" }}>Total</span>
          <span className="font-black text-3xl" style={{ color: gunmetal }}>${total.toFixed(2)}</span>
        </div>
        <button onClick={handleBuy} disabled={loading} className="w-full py-3 font-black text-sm tracking-widest uppercase transition-opacity" style={{ background: amber, color: gunmetal, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Redirecting to checkout…" : "Buy Now"}
        </button>
        <p className="text-xs text-center mt-3" style={{ color: "#6B7080" }}>Secure checkout via Stripe. Digital PDF delivered after purchase.</p>
      </div>
    </div>
  );
}
