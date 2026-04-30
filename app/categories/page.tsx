import Link from "next/link";
import { CATEGORIES, TOTAL_ENGLISH_DESIGNS } from "@/lib/catalog";

export const metadata = {
  title: "Browse by Category — Plating Posters Inc",
  description:
    "Browse the Metal Finishing Reference Series by process category. 9 categories, 80+ processes, 690+ poster designs.",
};

export default function CategoriesPage() {
  return (
    <div>
      {/* Page header */}
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "#E8A020" }}
          >
            Metal Finishing Reference Series
          </p>
          <h1
            className="font-black uppercase leading-none mb-3"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              color: "#F0EDE8",
            }}
          >
            Browse by{" "}
            <em style={{ color: "#E8A020", fontStyle: "italic" }}>Category</em>
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "#9098A8" }}>
            {TOTAL_ENGLISH_DESIGNS}+ poster designs across 9 process
            categories. Select a category to explore the processes and poster
            series within it.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#E8A020" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <span className="font-black text-2xl" style={{ color: "#1A1F2E" }}>9</span>
              <span className="font-bold text-xs uppercase tracking-wider ml-2" style={{ color: "#1A1F2E" }}>Categories</span>
            </div>
            <div className="text-center">
              <span className="font-black text-2xl" style={{ color: "#1A1F2E" }}>80+</span>
              <span className="font-bold text-xs uppercase tracking-wider ml-2" style={{ color: "#1A1F2E" }}>Processes</span>
            </div>
            <div className="text-center">
              <span className="font-black text-2xl" style={{ color: "#1A1F2E" }}>{TOTAL_ENGLISH_DESIGNS}+</span>
              <span className="font-bold text-xs uppercase tracking-wider ml-2" style={{ color: "#1A1F2E" }}>Poster Designs</span>
            </div>
            <div className="text-center">
              <span className="font-black text-2xl" style={{ color: "#1A1F2E" }}>EN / ES</span>
              <span className="font-bold text-xs uppercase tracking-wider ml-2" style={{ color: "#1A1F2E" }}>English & Spanish</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
              style={{
                background: "#1A1F2E",
                border: "1px solid #2A3048",
                borderRadius: "12px",
              }}
            >
              {/* Accent top strip */}
              <div
                style={{ height: "3px", background: cat.accentColor }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Category label */}
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-3"
                  style={{ color: cat.accentColor }}
                >
                  {cat.processes.length} Processes &nbsp;·&nbsp;{" "}
                  {cat.totalPosters}+ Posters
                </p>

                {/* Title */}
                <h2
                  className="font-black uppercase leading-tight mb-3"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "1.6rem",
                    color: "#F0EDE8",
                  }}
                >
                  {cat.title}
                </h2>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#9098A8" }}
                >
                  {cat.description.split(".")[0]}.
                </p>

                {/* CTA */}
                <div
                  className="flex items-center justify-between mt-5 pt-4"
                  style={{ borderTop: "1px solid #2A3048" }}
                >
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: "#3A4055" }}
                  >
                    {cat.processes.slice(0, 3).map(p => p.title.split(" ")[0]).join(" · ")}
                    {cat.processes.length > 3 ? ` · +${cat.processes.length - 3} more` : ""}
                  </span>
                  <span
                    className="font-black text-xs uppercase tracking-widest transition-colors"
                    style={{ color: cat.accentColor }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Logo CTA */}
      <section style={{ background: "#F5F4F0", borderTop: "1px solid #DDD9D0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "#A06C00" }}>
              Custom Branding
            </p>
            <h3 className="font-black uppercase text-xl mb-1" style={{ color: "#1A1F2E" }}>
              Add your company logo to any poster
            </h3>
            <p className="text-sm" style={{ color: "#6B7080" }}>
              Professional logo placement on any design — digital proof before print.
            </p>
          </div>
          <Link
            href="/custom"
            className="shrink-0 inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase"
            style={{ background: "#E8A020", color: "#1A1F2E" }}
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
