import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProcess, CATEGORIES } from "@/lib/catalog";
import { getPostersByProcess, getPostersByProcessAndType } from "@/lib/posters";
import PosterCard from "@/components/PosterCard";
import PosterPlaceholder from "@/components/PosterPlaceholder";

type Props = {
  params: Promise<{ category: string; process: string }>;
};

export async function generateStaticParams() {
  const paths: { category: string; process: string }[] = [];
  CATEGORIES.forEach((cat) => {
    cat.processes.forEach((proc) => {
      paths.push({ category: cat.slug, process: proc.id });
    });
  });
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { category, process } = await params;
  const cat = getCategory(category);
  const proc = getProcess(category, process);
  if (!cat || !proc) return {};
  return {
    title: `${proc.title} — ${cat.title} | Plating Posters Inc`,
    description: `${proc.posterCount}-poster reference series covering the complete ${proc.title} process. Available in English and Spanish, dark and light editions.`,
  };
}

// Generate generic poster series titles based on the process and category pattern
function getSeriesTitles(categoryId: string, processTitle: string): string[] {
  const name = processTitle;

  switch (categoryId) {
    case "electroplating":
      return [
        `${name} — Process Flow`,
        `Cleaning — ${name}`,
        `Rinse — Pre-Activation`,
        `Activation — ${name}`,
        `Rinse — Pre-Plate`,
        `${name} — Main Tank`,
        `Rinse — Post-Plate`,
        `Post Treatment — ${name}`,
      ];
    case "anodizing":
      return [
        `${name} — Process Flow`,
        `Cleaning — ${name}`,
        `Rinse — Pre-Etch`,
        `Etch — ${name}`,
        `Deoxidize / Desmut — ${name}`,
        `Rinse — Pre-Anodize`,
        `Anodize — ${name}`,
        `Seal / Post Treatment — ${name}`,
      ];
    case "electroless":
      return [
        `${name} — Process Flow`,
        `Cleaning — ${name}`,
        `Rinse — Pre-Activation`,
        `Activation — ${name}`,
        `Rinse — Pre-Plate`,
        `${name} — Main Tank`,
        `Rinse — Post-Plate`,
        `Post Treatment — ${name}`,
      ];
    case "conversion-coating":
      return [
        `${name} — Process Flow`,
        `Cleaning — ${name}`,
        `Rinse — Pre-Condition`,
        `Surface Conditioning — ${name}`,
        `Rinse — Pre-Coat`,
        `${name} — Conversion Stage`,
        `Rinse — Post-Coat`,
        `Seal / Post Treatment — ${name}`,
      ];
    case "chemical-treatment":
      return [
        `${name} — Process Flow`,
        `Safety & PPE — ${name}`,
        `Bath Preparation — ${name}`,
        `Treatment Stage — ${name}`,
        `Rinse — Post-Treatment`,
        `Secondary Treatment (if required)`,
        `Inspection & Handling`,
      ];
    case "painting-coating":
      return [
        `${name} — Process Flow`,
        `Surface Preparation — ${name}`,
        `Cleaning — ${name}`,
        `Rinse — ${name}`,
        `Pretreatment — ${name}`,
        `Drying — ${name}`,
        `Application Stage — ${name}`,
        `Cure — ${name}`,
        `Inspection & Handling — ${name}`,
      ];
    case "diffusion-heat-treatment":
      return [
        `${name} — Process Flow`,
        `Safety & PPE — ${name}`,
        `Part Preparation — ${name}`,
        `Loading & Fixturing — ${name}`,
        `Furnace / Equipment Setup — ${name}`,
        `Heat / Process Cycle — ${name}`,
        `Quench / Cooling — ${name}`,
        `Post Treatment — ${name}`,
        `Inspection & QA — ${name}`,
      ];
    case "specialty-advanced":
      return [
        `${name} — Process Flow`,
        `Safety & PPE — ${name}`,
        `Part Preparation — ${name}`,
        `Cleaning — ${name}`,
        `Fixturing & Loading — ${name}`,
        `System / Reactor Setup — ${name}`,
        `Parameter Setup — ${name}`,
        `Deposition / Process Stage — ${name}`,
        `Cooling & Unloading — ${name}`,
        `Inspection & QA — ${name}`,
      ];
    case "thermal-spray":
      return [
        `${name} — Process Flow`,
        `Safety & PPE — ${name}`,
        `Cleaning — ${name}`,
        `Grit Blasting — ${name}`,
        `Masking & Fixturing — ${name}`,
        `Equipment Setup — ${name}`,
        `Gun / System Parameter Setup — ${name}`,
        `Spray Application — ${name}`,
        `Post Treatment — ${name}`,
        `Inspection & QA — ${name}`,
      ];
    default:
      return [`${name} — Process Flow`];
  }
}

export default async function ProcessSeriesPage({ params }: Props) {
  const { category, process } = await params;
  const cat = getCategory(category);
  const proc = getProcess(category, process);
  if (!cat || !proc) notFound();

  const seriesTitles = getSeriesTitles(cat.id, proc.title);
  const availablePosters = getPostersByProcess(proc.id);
  const technicalPosters = getPostersByProcessAndType(proc.id, "technical");
  const shopFloorPosters = getPostersByProcessAndType(proc.id, "shop-floor");
  const hasSections = technicalPosters.length > 0 || shopFloorPosters.length > 0;
  const isAvailable = proc.available && availablePosters.length > 0;

  return (
    <div>
      {/* Header */}
      <section style={{ background: "#1A1F2E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-xs font-mono flex-wrap" style={{ color: "#3A4055" }}>
            <Link href="/categories" style={{ color: "#9098A8" }} className="hover:underline">
              Categories
            </Link>
            <span>/</span>
            <Link href={`/categories/${cat.slug}`} style={{ color: "#9098A8" }} className="hover:underline">
              {cat.title}
            </Link>
            <span>/</span>
            <span style={{ color: cat.accentColor }}>{proc.title}</span>
          </nav>

          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: cat.accentColor }}
          >
            {cat.title}
          </p>
          <h1
            className="font-black uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#F0EDE8",
            }}
          >
            {proc.title}
          </h1>
          <p className="text-sm" style={{ color: "#9098A8" }}>
            {proc.posterCount}-poster reference series covering each stage of the{" "}
            {proc.title} process. Available in English and Spanish, dark and light editions.
          </p>

          {/* Availability badge */}
          {isAvailable ? (
            <div
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-mono"
              style={{
                background: "rgba(39,174,96,0.10)",
                border: "1px solid rgba(39,174,96,0.35)",
                color: "#27AE60",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5" />
              </svg>
              Available now — order today
            </div>
          ) : (
            <div
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-mono"
              style={{
                background: "rgba(46,196,182,0.08)",
                border: "1px solid rgba(46,196,182,0.25)",
                color: "#2EC4B6",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="6" y1="4" x2="6" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="6" cy="8.5" r="0.75" fill="currentColor" />
              </svg>
              Artwork in production — this series is coming soon
            </div>
          )}
        </div>
      </section>

      <div style={{ height: "3px", background: cat.accentColor }} />

      {/* Poster series grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hasSections ? (
          <>
            {/* Technical Reference Posters */}
            {technicalPosters.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8" style={{ borderBottom: "2px solid #1A1F2E", paddingBottom: "0.75rem" }}>
                  <h2
                    className="font-black uppercase text-xl"
                    style={{ fontFamily: "var(--font-barlow-condensed)", color: "#1A1F2E" }}
                  >
                    Technical Reference Posters
                  </h2>
                  <span className="font-mono text-xs" style={{ color: "#6B7080" }}>
                    {technicalPosters.length} designs · EN / ES · Dark / Light
                  </span>
                </div>
                <p className="text-sm mb-6" style={{ color: "#6B7080" }}>
                  Deep-dive engineering references — chemistry, specifications, and operating parameters for engineers, chemists, and lead operators.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technicalPosters.map((poster) => (
                    <PosterCard key={poster.id} poster={poster} />
                  ))}
                </div>
              </div>
            )}

            {/* Shop Floor Posters */}
            {shopFloorPosters.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8" style={{ borderBottom: "2px solid #1A1F2E", paddingBottom: "0.75rem" }}>
                  <h2
                    className="font-black uppercase text-xl"
                    style={{ fontFamily: "var(--font-barlow-condensed)", color: "#1A1F2E" }}
                  >
                    Shop Floor Posters
                  </h2>
                  <span className="font-mono text-xs" style={{ color: "#6B7080" }}>
                    {shopFloorPosters.length} designs · EN / ES · Dark / Light
                  </span>
                </div>
                <p className="text-sm mb-6" style={{ color: "#6B7080" }}>
                  Clean, visual quick-reference for operators — key parameters at a glance, built to hang right on the line.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shopFloorPosters.map((poster) => (
                    <PosterCard key={poster.id} poster={poster} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8" style={{ borderBottom: "2px solid #1A1F2E", paddingBottom: "0.75rem" }}>
              <h2
                className="font-black uppercase text-xl"
                style={{ fontFamily: "var(--font-barlow-condensed)", color: "#1A1F2E" }}
              >
                Poster Series
              </h2>
              <span className="font-mono text-xs" style={{ color: "#6B7080" }}>
                {proc.posterCount} designs · EN / ES · Dark / Light
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {seriesTitles.map((title, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden"
                  style={{ borderRadius: "10px", border: "1px solid #2A3048" }}
                >
                  <div className="aspect-[3/4] overflow-hidden" style={{ background: "#1A1F2E" }}>
                    <PosterPlaceholder
                      categoryTitle={cat.title}
                      processTitle={proc.title}
                      posterTitle={title}
                      accentColor={cat.accentColor}
                      isMainSummary={i === 0}
                    />
                  </div>
                  <div
                    className="p-3"
                    style={{ background: "#1A1F2E", borderTop: "1px solid #2A3048" }}
                  >
                    <p
                      className="font-bold uppercase leading-tight text-xs"
                      style={{ color: "#F0EDE8", fontFamily: "var(--font-barlow-condensed)" }}
                    >
                      {title}
                    </p>
                    {i === 0 && (
                      <p className="font-mono text-xs mt-1" style={{ color: cat.accentColor }}>
                        Main Summary
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* What's in every series */}
        <div
          className="mt-12 p-6 rounded-xl"
          style={{ background: "#1A1F2E", border: "1px solid #2A3048" }}
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#E8A020" }}>
            What you get in every series
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Sizes", "18×24  ·  24×36  ·  36×48"],
              ["Editions", "Dark (flagship)  ·  Light"],
              ["Languages", "English  ·  Spanish"],
              ["Finish", "Matte Laminate  ·  Shop Tough"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-xs mb-1" style={{ color: "#3A4055" }}>{label}</p>
                <p className="font-bold text-sm" style={{ color: "#F0EDE8" }}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2A3048" }}>
            <p className="text-xs" style={{ color: "#6B7080" }}>
              All posters available with optional custom logo placement. High-res JPEG or PNG accepted (300 dpi at print size preferred; vector files always welcome).
            </p>
          </div>
        </div>

        {/* Notify CTA — only show for coming-soon series */}
        {!isAvailable && (
          <div
            className="mt-8 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: "#F5F4F0", border: "1px solid #DDD9D0" }}
          >
            <div>
              <p className="font-black uppercase text-base mb-1" style={{ color: "#1A1F2E" }}>
                Interested in this series?
              </p>
              <p className="text-sm" style={{ color: "#6B7080" }}>
                Contact us to be notified when the {proc.title} series is available.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center px-6 py-2.5 font-black text-sm tracking-widest uppercase"
              style={{ background: "#E8A020", color: "#1A1F2E", borderRadius: "4px" }}
            >
              Get Notified
            </Link>
          </div>
        )}
      </section>

      {/* Back nav */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href={`/categories/${cat.slug}`}
          className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          style={{ color: "#6B7080" }}
        >
          ← {cat.title} Processes
        </Link>
      </div>
    </div>
  );
}
