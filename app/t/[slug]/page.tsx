import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_TANKS, getDemoTank } from "@/lib/placards";

// Tank chemistry pages — the destination behind each placard's QR code.
// Currently serves the four generic DEMO tanks; customer facilities get their
// own slugs after setup. Mobile-first: scans happen on a phone at the tank.

const amber = "#8C5A00";
const teal = "#0F6B62";
const ink = "#1B2030";

export function generateStaticParams() {
  return DEMO_TANKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tank = getDemoTank(slug);
  if (!tank) return { title: "Tank Not Found" };
  return {
    title: `Tank ${tank.tankNumber} — ${tank.name} | Tank Chemistry Page`,
    description: `Live chemistry page for Tank ${tank.tankNumber} (${tank.name}): current makeup, operating data, hazards, and SDS access.`,
    robots: { index: false },
  };
}

export default async function TankPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tank = getDemoTank(slug);
  if (!tank) notFound();

  return (
    <main className="min-h-screen bg-[#F4F1E8] text-[#1B2030]">
      <div className="mx-auto max-w-md px-5 pb-16">
        {/* Sample banner */}
        <div
          className="mt-4 rounded-lg px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-white"
          style={{ background: teal }}
        >
          Sample page — generic demo chemistry, not a live bath
        </div>

        {/* Identity */}
        <header className="mt-6 rounded-2xl p-6 text-center" style={{ background: amber }}>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            Tank
          </div>
          <div className="text-7xl font-extrabold leading-none text-white">
            {tank.tankNumber}
          </div>
          <div className="mt-2 text-2xl font-extrabold uppercase tracking-wide text-white">
            {tank.name}
          </div>
        </header>

        {/* Verified chip */}
        <div
          className="mt-4 rounded-full border px-4 py-2 text-center text-xs font-semibold"
          style={{ borderColor: teal, color: teal }}
        >
          ✓ Chemistry verified {tank.verified}
        </div>

        {/* Current chemistry */}
        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: teal }}>
            Current chemistry
          </h2>
          <p className="mt-2 text-lg font-extrabold leading-snug">{tank.makeup}</p>
          {tank.makeupDetail && (
            <p className="mt-1 text-sm font-semibold" style={{ color: teal }}>
              {tank.makeupDetail}
            </p>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-[#F4F1E8] p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                Operating temp
              </div>
              <div className="font-bold">{tank.temp}</div>
            </div>
            <div className="rounded-lg bg-[#F4F1E8] p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                Volume
              </div>
              <div className="font-bold">{tank.volume}</div>
            </div>
          </div>

          {/* Documents */}
          <div className="mt-5 space-y-3">
            <a
              href="#"
              className="block rounded-xl px-5 py-4 text-center text-sm font-bold uppercase tracking-wider text-white"
              style={{ background: ink }}
            >
              Safety Data Sheet (SDS)
            </a>
            <p className="text-center font-mono text-[11px] text-black/50">
              SDS is free to anyone who scans — no login required
            </p>
            <a
              href="#"
              className="block rounded-xl border-2 px-5 py-4 text-center text-sm font-bold uppercase tracking-wider"
              style={{ borderColor: ink, color: ink }}
            >
              Technical Data Sheet (TDS)
            </a>
            <p className="text-center font-mono text-[11px] text-black/50">
              TDS access included with the facility subscription
            </p>
          </div>
        </section>

        {/* Hazards */}
        <section className="mt-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#9B2825" }}>
            {tank.signalWord} — hazard summary
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {tank.hazards.map((h) => (
              <li key={h} className="flex gap-2">
                <span style={{ color: "#9B2825" }}>▪</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#005BA6" }}>
            Required PPE / actions
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {tank.ppe.map((p) => (
              <li key={p} className="flex gap-2">
                <span style={{ color: "#005BA6" }}>●</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] leading-relaxed text-black/50">{tank.finePrint}</p>
        </section>

        {/* Transport */}
        <section className="mt-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/60">
            Transport (concentrate)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-black/70">{tank.transport}</p>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-[11px] leading-relaxed text-black/50">
            Operator reference only. Follow your facility SOPs and hazard communication
            program. Sample page by Plating Posters Inc.
          </p>
          <Link
            href="/placards"
            className="mt-4 inline-block rounded-lg px-5 py-3 text-xs font-bold uppercase tracking-wider text-white"
            style={{ background: amber }}
          >
            Get placards for your line
          </Link>
        </footer>
      </div>
    </main>
  );
}
