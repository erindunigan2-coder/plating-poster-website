import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import PlacardInquiryForm from "@/components/PlacardInquiryForm";
import { DEMO_TANKS, PLACARD_PRICING } from "@/lib/placards";

const amber = "#E8A020";
const borderDark = "#2A3048";
const mutedText = "#9098A8";
const dimText = "#6B7080";

const STEPS = [
  {
    n: "1",
    title: "Send us your tank list",
    body: "Tank numbers, functions, chemistry, temps. We turn it into a placard set and a live chemistry page per tank.",
  },
  {
    n: "2",
    title: "Mount the placards",
    body: "One placard per tank — standard 18×12 or compact 11×8.5 — tank ID and makeup on top, hazard & PPE pictographs below, QR on the right.",
  },
  {
    n: "3",
    title: "Scan for what's current",
    body: "The QR opens that tank's live page: current chemistry, operating data, SDS and TDS. Bath changes? The page updates — the placard survives.",
  },
];

export default function PlacardsPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0F1320" }}>
      {/* Hero video — hidden on phones: the 1920×800 frame shrinks to an
          unreadable strip and the intro below carries the same headline */}
      <section className="relative hidden sm:block">
        <video
          className="w-full"
          autoPlay
          muted
          loop
          playsInline
          poster="/placards/banner-poster.jpg"
        >
          <source src="/placards/banner.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: "#5FB3A9" }}>
          New from Plating Posters
        </p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-gray-50 sm:text-5xl">
          Tank Spec <span style={{ color: amber }}>Placards</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg" style={{ color: mutedText }}>
          Every tank on your line, identified: number, function, and makeup readable
          across the aisle — hazards and PPE in pictographs — and a QR code that opens
          the tank&rsquo;s <em>live</em> chemistry page. The SDS behind every code is
          free to anyone who scans. No login. Ever.
        </p>
      </section>

      {/* Demo placards — scan them */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-50">
            Don&rsquo;t take our word for it — <span style={{ color: amber }}>scan one</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: mutedText }}>
            These four demo placards carry real QR codes. Point your phone at any of
            them and land on that tank&rsquo;s live sample page.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {DEMO_TANKS.map((t) => (
            <div
              key={t.slug}
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: borderDark, background: "#161B2C" }}
            >
              <Image
                src={t.image}
                alt={`Demo placard — Tank ${t.tankNumber} ${t.name}`}
                width={1200}
                height={800}
                className="w-full"
              />
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-gray-100">
                    Tank {t.tankNumber} — {t.name}
                  </div>
                  <div className="text-xs" style={{ color: dimText }}>
                    {t.makeup}
                  </div>
                </div>
                <Link
                  href={`/t/${t.slug}`}
                  className="shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-white/5"
                  style={{ color: amber, borderColor: borderDark }}
                >
                  View live page
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs" style={{ color: dimText }}>
          Demo placards show generic textbook chemistry — your placards carry your
          tanks, your chemistry, your numbering.
        </p>
      </section>

      {/* How it works */}
      <section className="border-y py-16" style={{ borderColor: borderDark, background: "#12162280" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-gray-50">
            How it works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-xl font-extrabold"
                  style={{ background: amber, color: "#141B2D" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 font-bold uppercase tracking-wide text-gray-100">{s.title}</h3>
                <p className="mt-2 text-sm" style={{ color: mutedText }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-gray-50">
          Straightforward pricing
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="min-w-0 rounded-2xl border p-6" style={{ borderColor: borderDark, background: "#161B2C" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: amber }}>
              Per placard — customized to your line
            </h3>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-3 gap-y-3 text-sm text-gray-200 sm:gap-x-6">
              <span />
              {PLACARD_PRICING.sizes.map((s) => (
                <span
                  key={s.key}
                  className="text-right text-[10px] font-semibold uppercase tracking-wide sm:text-xs sm:tracking-wider"
                  style={{ color: mutedText }}
                >
                  {s.label}
                  <br />
                  {s.dims}
                </span>
              ))}
              {PLACARD_PRICING.finishes.map((f) => (
                <Fragment key={f.key}>
                  <span>
                    {f.label}
                    {"recommended" in f && f.recommended ? (
                      <span className="block text-xs sm:ml-2 sm:inline-block sm:whitespace-nowrap" style={{ color: "#5FB3A9" }}>
                        recommended tank-side
                      </span>
                    ) : null}
                  </span>
                  {PLACARD_PRICING.sizes.map((s) => (
                    <span key={s.key} className="text-right font-bold">
                      ${f.prices[s.key]}
                    </span>
                  ))}
                </Fragment>
              ))}
            </div>
            <div className="mt-3 space-y-1 text-xs" style={{ color: dimText }}>
              {PLACARD_PRICING.finishes.map((f) => (
                <p key={f.key}>
                  <span className="text-gray-300">{f.label}:</span> {f.material}.
                </p>
              ))}
              <p>
                Standard 18″×12″ reads across the aisle; compact 11″×8.5″ fits tight
                spots and small tanks. Same layout, same QR, either way.
              </p>
            </div>
            <ul className="mt-4 space-y-3 border-t pt-3 text-sm text-gray-200" style={{ borderColor: borderDark }}>
              <li className="flex items-baseline justify-between">
                <span>Volume: 10+ placards</span>
                <span className="font-bold">−10%</span>
              </li>
              <li className="flex items-baseline justify-between">
                <span>25+ placards</span>
                <span className="font-bold">−15%</span>
              </li>
              <li className="border-t pt-3 text-gray-300" style={{ borderColor: borderDark }}>
                Change the chemistry in the process? Have us do a quick re-print:
              </li>
              {PLACARD_PRICING.reprints.map((r) => (
                <li key={r.finishKey} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span>Re-print — {r.label}</span>
                  <span className="font-bold whitespace-nowrap">
                    ${r.prices.standard} / ${r.prices.compact}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs" style={{ color: dimText }}>
              Re-print prices are standard / compact. {PLACARD_PRICING.reprintShippingNote}
            </p>
          </div>
          <div className="min-w-0 rounded-2xl border p-6" style={{ borderColor: borderDark, background: "#161B2C" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: amber }}>
              Hosting subscription — per facility, per year
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              {PLACARD_PRICING.subscription.map((s) => (
                <li key={s.maxTanks} className="flex items-baseline justify-between">
                  <span>{s.label}</span>
                  <span className="font-bold">${s.price}/yr</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between border-t pt-3" style={{ borderColor: borderDark }}>
                <span>One-time facility setup</span>
                <span className="font-bold">${PLACARD_PRICING.setupFee}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: dimText }}>
              The subscription keeps every tank page current — chemistry, SDS, and TDS
              updated when your baths change, with an updated placard PDF included. If a
              subscription lapses, pages freeze with a notice — but{" "}
              <span className="text-gray-300">the SDS stays free and scannable, always</span>.
              That&rsquo;s the point.
            </p>
          </div>
        </div>
      </section>

      {/* Intake form */}
      <section id="quote" className="border-t py-16" style={{ borderColor: borderDark, background: "#12162280" }}>
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-gray-50">
            Build my placard set
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm" style={{ color: mutedText }}>
            Tell us roughly what your line looks like and get an instant estimate —
            we&rsquo;ll follow up for the full tank list and turn it into a formal quote.
          </p>
          <div className="mt-10">
            <PlacardInquiryForm />
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="mx-auto max-w-4xl px-6 py-12 text-center text-xs" style={{ color: dimText }}>
        Placards are operator reference, not a substitute for your facility&rsquo;s SOPs,
        training, or hazard communication program. Hazard pictographs reflect the tank&rsquo;s
        service chemistry; exact classifications live on the SDS behind each QR code.
      </section>
    </main>
  );
}
