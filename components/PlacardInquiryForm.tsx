"use client";

import { useMemo, useState } from "react";
import { PLACARD_PRICING, estimateSet } from "@/lib/placards";

const amber = "#E8A020";
const borderDark = "#2A3048";
const mutedText = "#9098A8";

const inputCls =
  "w-full rounded-lg border bg-[#12162280] px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8A020]/60";

export default function PlacardInquiryForm() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tanks, setTanks] = useState(10);
  const [finish, setFinish] = useState("shopTough");
  const [notes, setNotes] = useState("");

  const est = useMemo(() => estimateSet(tanks, finish), [tanks, finish]);

  const mailto = useMemo(() => {
    const subject = `Tank Placard Set Inquiry — ${company || "my facility"} (${tanks} tanks)`;
    const body = [
      `Company: ${company}`,
      `Contact: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      ``,
      `Tanks: ${tanks}`,
      `Finish: ${est.finishLabel}`,
      ``,
      `Website estimate:`,
      `  Placards: $${est.placards}${est.discount ? ` (${est.discount * 100}% volume discount applied)` : ""}`,
      `  Facility setup: $${est.setup}`,
      `  First-year subscription: $${est.subscription}`,
      `  Estimated first year: $${est.firstYear}`,
      `  Renewal: $${est.renewal}/yr`,
      ``,
      `Notes / line details:`,
      notes,
      ``,
      `— sent from platingposters.com/placards`,
    ].join("\n");
    return `mailto:info@platingposters.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [company, name, email, phone, tanks, finish, notes, est]);

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: borderDark, background: "#161B2C" }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} style={{ borderColor: borderDark }} placeholder="Company / facility *" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input className={inputCls} style={{ borderColor: borderDark }} placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inputCls} style={{ borderColor: borderDark }} placeholder="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputCls} style={{ borderColor: borderDark }} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: mutedText }}>
            How many tanks? <span style={{ color: amber }}>{tanks}</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={tanks}
            onChange={(e) => setTanks(parseInt(e.target.value, 10))}
            className="w-full accent-[#E8A020]"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: mutedText }}>
            Finish
          </label>
          <div className="flex flex-wrap gap-2">
            {PLACARD_PRICING.finishes.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFinish(f.key)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={
                  finish === f.key
                    ? { background: amber, color: "#141B2D", borderColor: amber }
                    : { color: mutedText, borderColor: borderDark }
                }
              >
                {f.label} ${f.price}
              </button>
            ))}
          </div>
        </div>
      </div>

      <textarea
        className={`${inputCls} mt-6 min-h-[110px]`}
        style={{ borderColor: borderDark }}
        placeholder="Tell us about your line — processes, tank numbering, anything special. We'll follow up for the full tank list."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div
        className="mt-6 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: borderDark, background: "#12162280" }}
      >
        <div className="text-sm" style={{ color: mutedText }}>
          <div>
            <span className="font-semibold text-gray-100">
              Estimated first year: <span style={{ color: amber }}>${est.firstYear.toLocaleString()}</span>
            </span>{" "}
            · renews at ${est.renewal}/yr
          </div>
          <div className="mt-1 text-xs">
            {tanks} × {est.finishLabel}
            {est.discount ? ` (−${est.discount * 100}% volume)` : ""} + $
            {est.setup} setup + ${est.subscription}/yr hosting. Estimate only —
            final quote follows your tank list.
          </div>
        </div>
        <a
          href={mailto}
          className="inline-block shrink-0 rounded-lg px-6 py-3 text-center text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
          style={{ background: amber, color: "#141B2D" }}
        >
          Request my quote
        </a>
      </div>

      <p className="mt-4 text-xs" style={{ color: "#6B7080" }}>
        Opens your email client with everything pre-filled — or write us directly at{" "}
        <a href="mailto:info@platingposters.com" className="underline">
          info@platingposters.com
        </a>
        .
      </p>
    </div>
  );
}
