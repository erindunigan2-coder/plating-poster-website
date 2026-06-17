import { POSTERS } from "@/lib/posters";
import PosterCard from "@/components/PosterCard";
import Link from "next/link";

export const metadata = {
  title: "Safety Posters — Plating Posters Inc",
  description:
    "18 process-specific safety posters for the surface finishing industry. Cyanide, chromium, acid burns, ventilation, spill response, and more. English and Spanish.",
};

export default function SafetyCollectionPage() {
  const posters = POSTERS.filter((p) => p.category === "Safety" && p.available);

  return (
    <div>
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#E05C5C" }}>
            Safety Series
          </p>
          <h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8" }}
          >
            Safety Posters
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "#9098A8" }}>
            {posters.length} process-specific safety posters for hazardous chemical and electrical
            operations in surface finishing. PPE, chemical handling, emergency response, ventilation,
            and more. English and Spanish. Dark and light editions.
          </p>
        </div>
      </section>
      <div style={{ height: "3px", background: "#E05C5C" }} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((poster) => (
            <PosterCard key={poster.id} poster={poster} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#catalogue"
            className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
            style={{ color: "#6B7080" }}
          >
            ← Back to Catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
