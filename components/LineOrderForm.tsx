"use client";

import { useEffect, useState } from "react";
import { createCartAndCheckout, LOGO_UPGRADE_VARIANT_ID, toShopifySize } from "@/lib/shopify";
import { VARIANT_MAP } from "@/lib/variants";
import { getGroupInfo, type ProcessStep } from "@/lib/steps";

type LineStep = {
  instanceId: string;
  step: ProcessStep;
  customName?: string;
};

type Props = {
  lineSteps: LineStep[];
};

const FINISHES = [
  { id: "Matte Laminate", label: "Matte Laminate", description: "100# photo stock with matte laminate." },
  { id: "Shop Tough", label: "Shop Tough", description: ".030 styrene with matte laminate. Built for shop environments." },
];

const EDITIONS: { id: "Dark" | "Light"; label: string }[] = [
  { id: "Dark", label: "Dark Edition" },
  { id: "Light", label: "Light Edition" },
];

const PRICES: Record<string, Record<string, number>> = {
  "Matte Laminate": { "18×24": 59, "24×36": 99, "36×48": 169 },
  "Shop Tough":     { "18×24": 69, "24×36": 115, "36×48": 189 },
};

const amber = "#E8A020";
const gunmetal = "#1A1F2E";

function PosterLightbox({ posterId, label, edition, onClose }: { posterId: string; label: string; edition: "Dark" | "Light"; onClose: () => void }) {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    function calc() {
      const s = Math.min((window.innerWidth * 0.9) / 900, (window.innerHeight * 0.82) / 1200);
      setScale(s);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const scaledW = 900 * scale;
  const scaledH = 1200 * scale;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.92)" }}
      onClick={onClose}
    >
      {/* Poster name */}
      <div
        className="mb-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-black uppercase text-sm tracking-widest" style={{ color: amber }}>
          {label}
        </span>
      </div>

      {/* Scaled poster */}
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ width: scaledW, height: scaledH }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`/posters/shop-${posterId}-en.html${edition === "Light" ? "#light" : ""}`}
          title={label}
          className="absolute top-0 left-0 border-0"
          style={{
            width: "900px",
            height: "1200px",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        />
      </div>

      {/* Back button — prominent, below the poster */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="mt-4 px-8 py-3 font-black text-sm tracking-widest uppercase transition-colors cursor-pointer"
        style={{ background: amber, color: gunmetal }}
      >
        Back to My Posters
      </button>
    </div>
  );
}

export default function LineOrderForm({ lineSteps }: Props) {
  const [edition, setEdition] = useState<"Dark" | "Light">("Dark");
  const [size, setSize] = useState("18×24");
  const [finish, setFinish] = useState("Matte Laminate");
  const [logoUpgrade, setLogoUpgrade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [lightboxLabel, setLightboxLabel] = useState("");
  const [lightboxPosterId, setLightboxPosterId] = useState<string | null>(null);

  const orderableSteps = lineSteps.filter((ls) => ls.step.posterId);
  const comingSoonSteps = lineSteps.filter((ls) => !ls.step.posterId);

  const unitPrice = PRICES[finish]?.[size] ?? 75;
  const subtotal = unitPrice * orderableSteps.length;
  const logoPrice = logoUpgrade ? 35 : 0;
  const total = subtotal + logoPrice;

  const btnBase = "px-4 py-2 text-sm font-bold uppercase tracking-wider border transition-colors cursor-pointer";
  const btnActive = { background: gunmetal, color: "#F0EDE8", borderColor: gunmetal };
  const btnInactive = { background: "#fff", color: "#6B7080", borderColor: "#DDD9D0" };

  async function handleCheckout() {
    if (orderableSteps.length === 0) {
      setError("No posters in your line are available yet.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const shopifySize = toShopifySize(size);
      const variantKey = `${edition} / ${shopifySize} / ${finish}`;

      const lineItems: { merchandiseId: string; quantity: number }[] = [];

      for (const ls of orderableSteps) {
        const posterId = ls.step.posterId!;
        const posterVariants = VARIANT_MAP[posterId];
        if (!posterVariants) {
          setError(`Variant data not found for "${ls.step.name}". Please contact us.`);
          setLoading(false);
          return;
        }
        const variantId = posterVariants[variantKey];
        if (!variantId) {
          setError(`"${ls.step.name}" is not available in ${edition} / ${size} / ${finish}. Try different options.`);
          setLoading(false);
          return;
        }
        lineItems.push({ merchandiseId: variantId, quantity: 1 });
      }

      if (logoUpgrade) {
        lineItems.push({ merchandiseId: LOGO_UPGRADE_VARIANT_ID, quantity: 1 });
      }

      const cart = await createCartAndCheckout(lineItems);
      window.location.href = cart.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (lineSteps.length === 0) return null;

  return (
    <>
      <div className="space-y-5">
        <h3
          className="font-black uppercase text-sm tracking-widest"
          style={{ color: gunmetal }}
        >
          Order Your Set
        </h3>

        {/* Edition */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
            Edition
          </label>
          <div className="flex gap-2">
            {EDITIONS.map((ed) => (
              <button key={ed.id} onClick={() => setEdition(ed.id)} className={btnBase} style={edition === ed.id ? btnActive : btnInactive}>
                {ed.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
            Size (all posters)
          </label>
          <div className="flex gap-2">
            {["18×24", "24×36", "36×48"].map((s) => (
              <button key={s} onClick={() => setSize(s)} className={btnBase} style={size === s ? btnActive : btnInactive}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Finish */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
            Finish (all posters)
          </label>
          <div className="flex flex-col gap-2">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                onClick={() => setFinish(f.id)}
                className={`${btnBase} text-left`}
                style={finish === f.id ? { ...btnActive, borderLeftColor: amber, borderLeftWidth: "3px" } : btnInactive}
              >
                <span className="block font-black">{f.label}</span>
                <span className="block text-xs font-normal mt-0.5 opacity-70">{f.description}</span>
              </button>
            ))}
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
                <span style={{ color: amber }}>+$35</span>
              </span>
              <span className="text-xs block mt-1" style={{ color: "#9098A8" }}>
                Your company logo on every poster in the set.
              </span>
            </div>
          </label>
        </div>

        {/* Pricing breakdown */}
        <div className="pt-2">
          <div className="space-y-1 mb-3" style={{ borderBottom: "1px solid #DDD9D0", paddingBottom: "0.75rem" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "#6B7080" }}>
                {orderableSteps.length} poster{orderableSteps.length !== 1 ? "s" : ""} x ${unitPrice}
              </span>
              <span className="font-bold" style={{ color: gunmetal }}>${subtotal.toFixed(2)}</span>
            </div>
            {logoUpgrade && (
              <div className="flex justify-between text-sm">
                <span style={{ color: "#6B7080" }}>Logo upgrade</span>
                <span className="font-bold" style={{ color: gunmetal }}>$35.00</span>
              </div>
            )}
            {comingSoonSteps.length > 0 && (
              <div className="flex justify-between text-xs">
                <span style={{ color: amber }}>
                  {comingSoonSteps.length} poster{comingSoonSteps.length !== 1 ? "s" : ""} coming soon (not included)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="font-black uppercase text-xs tracking-widest" style={{ color: "#6B7080" }}>Total</span>
            <span className="font-black text-3xl" style={{ color: gunmetal }}>${total.toFixed(2)}</span>
          </div>

          {error && (
            <p className="text-sm font-semibold mb-3" style={{ color: "#E05C5C" }}>{error}</p>
          )}

          <button
            onClick={() => setShowPreview(true)}
            disabled={orderableSteps.length === 0}
            className="w-full py-3 font-black text-sm tracking-widest uppercase transition-opacity"
            style={{ background: amber, color: gunmetal, opacity: orderableSteps.length === 0 ? 0.5 : 1 }}
          >
            {orderableSteps.length === 0
              ? "No posters available yet"
              : `Preview ${orderableSteps.length} Poster Set`}
          </button>

          <p className="text-xs text-center mt-3" style={{ color: "#6B7080" }}>
            Review your set before checkout.
          </p>
        </div>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
          style={{ background: "rgba(13, 16, 32, 0.85)" }}
        >
          <div
            className="w-full max-w-4xl mx-4 my-8 rounded-lg overflow-hidden shadow-2xl"
            style={{ background: "#F5F4F0" }}
          >
            {/* Preview header */}
            <div className="px-6 py-5 flex items-center justify-between" style={{ background: gunmetal }}>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: amber }}>
                  Review Your Order
                </p>
                <h2
                  className="font-black uppercase text-xl"
                  style={{ fontFamily: "var(--font-barlow-condensed)", color: "#F0EDE8" }}
                >
                  Your Poster Set
                </h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold hover:bg-white/10 transition-colors"
                style={{ color: "#9098A8" }}
              >
                x
              </button>
            </div>

            {/* Order specs bar */}
            <div className="px-6 py-3 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider" style={{ background: "#E8E6E0", color: gunmetal }}>
              <span>{edition} Edition</span>
              <span style={{ color: "#9098A8" }}>|</span>
              <span>{size}</span>
              <span style={{ color: "#9098A8" }}>|</span>
              <span>{finish}</span>
              {logoUpgrade && (
                <>
                  <span style={{ color: "#9098A8" }}>|</span>
                  <span style={{ color: amber }}>Custom Logo</span>
                </>
              )}
            </div>

            {/* Line preview */}
            <div className="px-6 py-6">
              <p className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: gunmetal }}>
                Process Line — {lineSteps.length} Step{lineSteps.length !== 1 ? "s" : ""}
              </p>

              {/* Poster thumbnail strip */}
              <div className="flex gap-3 overflow-x-auto pb-4 mb-6" style={{ borderBottom: "1px solid #DDD9D0" }}>
                {lineSteps.map((ls, index) => {

                  const groupInfo = getGroupInfo(ls.step.group);
                  const color = groupInfo?.color ?? "#6B7080";
                  const hasHtml = !!ls.step.posterId;
                  const displayName = ls.customName || ls.step.name;

                  return (
                    <div key={ls.instanceId} className="shrink-0 w-32 flex flex-col items-center">
                      {/* Thumbnail */}
                      <div
                        className={`w-32 h-44 rounded overflow-hidden relative flex items-center justify-center ${hasHtml ? "cursor-pointer hover:ring-2 hover:ring-amber-400 transition-shadow" : ""}`}
                        style={{
                          background: hasHtml ? (edition === "Dark" ? gunmetal : "#E8E6E0") : "#E8E6E0",
                          border: `1px solid ${hasHtml ? "#DDD9D0" : color}`,
                        }}
                        onClick={() => {
                          if (hasHtml) {
                            setLightboxLabel(displayName);
                            setLightboxPosterId(ls.step.posterId ?? null);
                          }
                        }}
                      >
                        {hasHtml ? (
                          <div className="w-full h-full relative overflow-hidden pointer-events-none">
                            <iframe
                              src={`/posters/shop-${ls.step.posterId}-en.html${edition === "Light" ? "#light" : ""}`}
                              title={displayName}
                              className="absolute top-0 left-0 border-0"
                              style={{ width: "900px", height: "1200px", transform: "scale(0.1422)", transformOrigin: "top left" }}
                              tabIndex={-1}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 px-2 text-center">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: `${color}22` }}
                            >
                              <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                            </div>
                            <span
                              className="font-bold uppercase text-center leading-tight"
                              style={{ color: "#6B7080", fontSize: "0.55rem", letterSpacing: "0.05em" }}
                            >
                              {displayName}
                            </span>
                            <span
                              className="font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                              style={{ background: "#FFF3D6", color: amber, fontSize: "0.5rem" }}
                            >
                              Coming Soon
                            </span>
                          </div>
                        )}
                        {/* Step number badge */}
                        <span
                          className="absolute top-1.5 left-1.5 w-5 h-5 flex items-center justify-center rounded-full text-xs font-black"
                          style={{ background: gunmetal, color: amber, fontSize: "0.6rem" }}
                        >
                          {index + 1}
                        </span>
                      </div>
                      {/* Step label */}
                      <span
                        className="font-bold uppercase text-center mt-1.5 leading-tight w-full truncate"
                        style={{ color: gunmetal, fontSize: "0.6rem", letterSpacing: "0.04em" }}
                      >
                        {displayName}
                      </span>
                      <span
                        className="text-center"
                        style={{ color: hasHtml ? "#27AE60" : amber, fontSize: "0.5rem", fontWeight: 700 }}
                      >
                        {hasHtml ? `$${unitPrice}` : "Coming Soon"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Detailed step list */}
              <p className="font-black uppercase text-xs tracking-widest mb-3" style={{ color: "#6B7080" }}>
                Step Details
              </p>
              <div className="space-y-0">
                {lineSteps.map((ls, index) => {

                  const groupInfo = getGroupInfo(ls.step.group);
                  const color = groupInfo?.color ?? "#6B7080";
                  const isAvailable = !!ls.step.posterId;
                  const displayName = ls.customName || ls.step.name;
                  const isRenamed = ls.customName && ls.customName !== ls.step.name;
                  const hasHtml2 = !!ls.step.posterId;

                  return (
                    <div key={ls.instanceId}>
                      <div className="flex items-center gap-3 py-3">
                        {/* Step number */}
                        <span
                          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-xs font-black"
                          style={{ background: gunmetal, color: amber }}
                        >
                          {index + 1}
                        </span>

                        {/* Mini thumbnail */}
                        <div
                          className={`shrink-0 w-10 h-14 rounded overflow-hidden relative flex items-center justify-center ${hasHtml2 ? "cursor-pointer hover:ring-2 hover:ring-amber-400 transition-shadow" : ""}`}
                          style={{
                            background: hasHtml2 ? (edition === "Dark" ? gunmetal : "#E8E6E0") : "#E8E6E0",
                            border: `1px solid ${hasHtml2 ? "#DDD9D0" : color}`,
                          }}
                          onClick={() => {
                            if (hasHtml2) {
                              setLightboxLabel(displayName);
                              setLightboxPosterId(ls.step.posterId ?? null);
                            }
                          }}
                        >
                          {hasHtml2 ? (
                            <div className="w-full h-full relative overflow-hidden pointer-events-none">
                              <iframe
                                src={`/posters/shop-${ls.step.posterId}-en.html${edition === "Light" ? "#light" : ""}`}
                                title={displayName}
                                className="absolute top-0 left-0 border-0"
                                style={{ width: "900px", height: "1200px", transform: "scale(0.0444)", transformOrigin: "top left" }}
                                tabIndex={-1}
                              />
                            </div>
                          ) : (
                            <div className="w-3 h-3 rounded-full" style={{ background: color, opacity: 0.4 }} />
                          )}
                        </div>

                        {/* Step info */}
                        <div className="flex-1 min-w-0">
                          <span className="font-black text-sm uppercase tracking-wide block" style={{ color: gunmetal }}>
                            {displayName}
                          </span>
                          {isRenamed && (
                            <span className="text-xs block" style={{ color: "#9098A8" }}>
                              Poster: {ls.step.name}
                            </span>
                          )}
                          <span className="text-xs block" style={{ color: "#6B7080" }}>
                            {ls.step.description}
                          </span>
                        </div>

                        {/* Status */}
                        <span
                          className="shrink-0 text-xs font-black uppercase tracking-wider"
                          style={{ color: isAvailable ? "#27AE60" : amber, fontSize: "0.65rem" }}
                        >
                          {isAvailable ? "Included" : "Coming Soon"}
                        </span>

                        {/* Price */}
                        <span
                          className="shrink-0 font-black text-sm w-16 text-right"
                          style={{ color: isAvailable ? gunmetal : "#9098A8" }}
                        >
                          {isAvailable ? `$${unitPrice}` : "\u2014"}
                        </span>
                      </div>

                      {/* Connector line */}
                      {index < lineSteps.length - 1 && (
                        <div className="flex items-center gap-3">
                          <div className="w-7 flex justify-center">
                            <div className="w-px h-3" style={{ background: "#DDD9D0" }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Totals footer */}
            <div className="px-6 py-5" style={{ background: "#E8E6E0", borderTop: "1px solid #DDD9D0" }}>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "#6B7080" }}>
                    {orderableSteps.length} poster{orderableSteps.length !== 1 ? "s" : ""} x ${unitPrice} ({size} {finish})
                  </span>
                  <span className="font-bold" style={{ color: gunmetal }}>${subtotal.toFixed(2)}</span>
                </div>
                {logoUpgrade && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#6B7080" }}>Custom logo upgrade</span>
                    <span className="font-bold" style={{ color: gunmetal }}>$35.00</span>
                  </div>
                )}
                {comingSoonSteps.length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span style={{ color: amber }}>
                      {comingSoonSteps.length} poster{comingSoonSteps.length !== 1 ? "s" : ""} not yet available — will not be charged
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-between items-center pt-3"
                  style={{ borderTop: "2px solid #DDD9D0" }}
                >
                  <span className="font-black uppercase text-xs tracking-widest" style={{ color: "#6B7080" }}>
                    Order Total
                  </span>
                  <span className="font-black text-3xl" style={{ color: gunmetal }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-sm font-semibold mb-3" style={{ color: "#E05C5C" }}>{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-3 font-black text-sm tracking-widest uppercase border transition-colors hover:bg-white/50"
                  style={{ borderColor: "#DDD9D0", color: "#6B7080", background: "#fff" }}
                >
                  Go Back & Edit
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="flex-1 py-3 font-black text-sm tracking-widest uppercase transition-opacity"
                  style={{ background: amber, color: gunmetal, opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? "Redirecting..." : "Confirm & Checkout"}
                </button>
              </div>

              <p className="text-xs text-center mt-3" style={{ color: "#6B7080" }}>
                Secure checkout via Shopify. Printed and shipped by our print partner.
              </p>
            </div>
          </div>

          {/* ── Poster Lightbox (inside preview so closing returns here) ── */}
          {lightboxPosterId && (
            <PosterLightbox
              posterId={lightboxPosterId}
              label={lightboxLabel}
              edition={edition}
              onClose={() => setLightboxPosterId(null)}
            />
          )}
        </div>
      )}
    </>
  );
}
