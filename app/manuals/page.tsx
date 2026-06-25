import Link from "next/link";
import Image from "next/image";
import { getAvailableManuals } from "@/lib/manuals";

export const metadata = {
  title: "Training Manuals — Plating Posters Inc",
  description:
    "Complete operator training manuals for the surface finishing industry — plain-language, beginner-friendly courses with integrated safety, a completion test, and a certificate. English and Spanish.",
};

export default function ManualsPage() {
  const manuals = getAvailableManuals();
  const teal = "#17857A";
  const gunmetal = "#1A1F2E";

  return (
    <div>
      <section style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#2EC4B6" }}>
            New · Training Manuals
          </p>
          <h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8" }}
          >
            Training Manuals
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "#9098A8" }}>
            Where a poster is the glance at the tank, a manual is the whole course. Plain-language,
            “assumes-you-know-nothing” operator training for an entire process line — the “why” behind
            every step, safety built into every station, a completion test, and a printable certificate.
            English &amp; Spanish. Instant digital PDF.
          </p>
        </div>
      </section>
      <div style={{ height: "3px", background: teal }} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {manuals.map((m) => (
            <Link key={m.id} href={`/manuals/${m.id}`} className="group block rounded-xl overflow-hidden border transition-shadow hover:shadow-xl" style={{ borderColor: "#E2DED5", background: "#fff" }}>
              <div className="relative bg-[#F4F2EC] flex items-center justify-center p-4">
                <Image src={m.coverImage} alt={`${m.seriesLabel} Training Manual`} width={400} height={518} className="w-full h-auto shadow-md rounded" />
                <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded" style={{ background: teal, color: "#fff" }}>
                  {m.pages} pp · EN/ES
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-black text-lg leading-tight" style={{ color: gunmetal }}>{m.seriesLabel} — Training Manual</h2>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6B7080" }}>{m.tagline}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-black text-xl" style={{ color: gunmetal }}>${m.price}</span>
                  <span className="text-xs font-black uppercase tracking-widest group-hover:underline" style={{ color: teal }}>View →</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming soon */}
          <div className="rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-8" style={{ borderColor: "#D4D0C6", background: "#FAF9F6", minHeight: "320px" }}>
            <span className="text-3xl mb-3">📚</span>
            <h2 className="font-black text-lg" style={{ color: gunmetal }}>More manuals coming</h2>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "#6B7080" }}>
              We&apos;re building a training manual for every finished poster series — Acid Zinc, Hard Chrome,
              Zinc-Nickel, Anodize, and more. Bright Nickel is first.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest" style={{ color: "#6B7080" }}>
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
