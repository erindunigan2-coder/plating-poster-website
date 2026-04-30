import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, CATEGORIES } from "@/lib/catalog";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.title} Posters — Plating Posters Inc`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <div>
      {/* Breadcrumb + header */}
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-xs font-mono" style={{ color: "#3A4055" }}>
            <Link href="/categories" style={{ color: "#9098A8" }} className="hover:underline">
              Categories
            </Link>
            <span>/</span>
            <span style={{ color: cat.accentColor }}>{cat.title}</span>
          </nav>

          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{
              background: `${cat.accentColor}1A`,
              border: `1px solid ${cat.accentColor}40`,
              color: cat.accentColor,
            }}
          >
            {cat.processes.length} Processes &nbsp;·&nbsp; {cat.totalPosters}+ Poster Designs
          </div>

          <h1
            className="font-black uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "#F0EDE8",
            }}
          >
            <em style={{ color: cat.accentColor, fontStyle: "italic" }}>
              {cat.title.split(" ")[0]}
            </em>{" "}
            {cat.title.split(" ").slice(1).join(" ")}
          </h1>

          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: "#9098A8" }}>
            {cat.description}
          </p>
        </div>
      </section>

      {/* Accent bar */}
      <div style={{ height: "3px", background: cat.accentColor }} />

      {/* Process grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8" style={{ borderBottom: "2px solid #1A1F2E", paddingBottom: "0.75rem" }}>
          <h2 className="font-black uppercase text-xl tracking-wide" style={{ color: "#1A1F2E", fontFamily: "var(--font-barlow-condensed)" }}>
            Processes in this Series
          </h2>
          <span className="font-mono text-xs" style={{ color: "#6B7080" }}>
            {cat.processes.length} total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat.processes.map((process, i) => (
            <Link
              key={process.id}
              href={`/categories/${cat.slug}/${process.id}`}
              className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background: "#fff",
                border: "1px solid #DDD9D0",
                borderRadius: "8px",
              }}
            >
              {/* Accent top */}
              <div style={{ height: "2px", background: cat.accentColor }} />

              <div className="p-5 flex flex-col flex-1">
                {/* Number */}
                <span
                  className="font-mono text-xs mb-3"
                  style={{ color: "#DDD9D0" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Process name */}
                <h3
                  className="font-black uppercase leading-tight mb-2 flex-1"
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "1.15rem",
                    color: "#1A1F2E",
                  }}
                >
                  {process.title}
                </h3>

                {/* Poster count + coming soon */}
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #DDD9D0" }}>
                  <span className="font-mono text-xs" style={{ color: "#6B7080" }}>
                    {process.posterCount} posters in series
                  </span>
                  {process.available ? (
                    <span className="font-black text-xs uppercase tracking-widest" style={{ color: cat.accentColor }}>
                      Available →
                    </span>
                  ) : (
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(46,196,182,0.08)",
                        border: "1px solid rgba(46,196,182,0.2)",
                        color: "#17857A",
                      }}
                    >
                      coming soon
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Back nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          style={{ color: "#6B7080" }}
        >
          ← All Categories
        </Link>
      </div>
    </div>
  );
}
