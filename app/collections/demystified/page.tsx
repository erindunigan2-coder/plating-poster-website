import { POSTERS } from "@/lib/posters";
import PosterCard from "@/components/PosterCard";
import Link from "next/link";

export const metadata = {
  title: "Demystified Series — Plating Posters Inc",
  description:
    "Big-picture process overviews that break down the chemistry, specs, and applications of each plating and finishing process. Perfect for training and orientation.",
};

export default function DemystifiedCollectionPage() {
  const posters = POSTERS.filter((p) => p.id.includes("demystified") && p.available);

  return (
    <div>
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "#27AE60" }}>
            Demystified Series
          </p>
          <h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F0EDE8" }}
          >
            Demystified Posters
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: "#9098A8" }}>
            {posters.length} big-picture process overviews — one poster per process that breaks
            down the chemistry, specifications, and applications. Perfect for training,
            orientation, and hanging in the engineering office.
          </p>
        </div>
      </section>
      <div style={{ height: "3px", background: "#27AE60" }} />

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
