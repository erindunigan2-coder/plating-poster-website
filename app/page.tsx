import Link from "next/link";
import { CATEGORIES, TOTAL_ENGLISH_DESIGNS } from "@/lib/catalog";
import { getAvailablePosters } from "@/lib/posters";

export default function Home() {
  const availablePosters = getAvailablePosters();
  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";

  return (
    <>
      {/* Hero */}
      <section style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: amber }}
            >
              Metal Finishing Reference Series
            </p>
            <h1
              className="font-black uppercase leading-none mb-3"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                color: "#F0EDE8",
              }}
            >
              Plating
            </h1>
            <h1
              className="font-black uppercase leading-none mb-6"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                color: amber,
              }}
            >
              Posters <em style={{ color: "#F0EDE8", fontStyle: "italic", fontSize: "0.5em", verticalAlign: "middle" }}>Inc</em>
            </h1>
            <p
              className="font-semibold italic mb-2"
              style={{ color: "#9098A8", fontSize: "1.1rem" }}
            >
              The Foundation of Every Flawless Finish
            </p>
            <p
              className="text-sm mb-8 pt-4 mt-4"
              style={{
                color: "#6B7080",
                borderTop: "1px solid #2A3048",
              }}
            >
              Professional process reference posters for metal finishing and electroplating facilities. {TOTAL_ENGLISH_DESIGNS}+ designs across 9 process categories. English and Spanish. Dark and light editions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ background: amber, color: gunmetal }}
              >
                Browse Catalog
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase transition-colors"
                style={{ border: "1px solid #2A3048", color: "#9098A8" }}
              >
                Add Your Logo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat bar */}
      <section style={{ background: amber }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <div className="text-center md:text-left">
              <span className="font-black text-4xl" style={{ color: gunmetal }}>80%+</span>
              <span className="font-semibold text-sm ml-3" style={{ color: gunmetal }}>
                of plating failures originate in surface preparation
              </span>
            </div>
            <div className="hidden md:block h-8 w-px" style={{ background: "#B87200" }} />
            <p className="text-sm font-medium text-center md:text-left" style={{ color: "#7A4800" }}>
              Give your team the visual reference they need — right on the shop floor.
            </p>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section style={{ background: "#F5F4F0", borderBottom: "1px solid #DDD9D0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "#DDD9D0" }}
          >
            {[
              { eyebrow: "Scope", title: "9 Categories", body: "Electroplating, anodizing, coating, heat treatment, specialty processes and more." },
              { eyebrow: "Bilingual", title: "EN & ES", body: "Every poster available in English and Spanish to serve your full team." },
              { eyebrow: "Editions", title: "Dark & Light", body: "Flagship dark edition and light edition — choose what works for your environment." },
              { eyebrow: "Branding", title: "Logo Upgrade", body: "Add your company logo for a professional, facility-specific look." },
            ].map((item, i) => (
              <div key={i} className={`py-6 md:py-0 ${i === 0 ? "md:pr-8" : i === 3 ? "md:pl-8" : "md:px-8"}`}>
                <p className="font-mono font-black uppercase text-xs tracking-widest mb-2" style={{ color: "#A06C00" }}>
                  {item.eyebrow}
                </p>
                <h3 className="font-black text-lg mb-1" style={{ color: gunmetal }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "#6B7080" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category preview grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="flex items-end justify-between mb-8"
          style={{ borderBottom: `2px solid ${gunmetal}`, paddingBottom: "0.75rem" }}
        >
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "#A06C00" }}>
              Full Catalog
            </p>
            <h2
              className="font-black uppercase text-2xl tracking-wide"
              style={{ color: gunmetal, fontFamily: "var(--font-barlow-condensed)" }}
            >
              Browse by Process Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="font-black text-xs tracking-widest uppercase"
            style={{ color: amber }}
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
              style={{
                background: "#fff",
                border: "1px solid #DDD9D0",
                borderRadius: "8px",
                borderLeft: `4px solid ${cat.accentColor}`,
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs mb-0.5" style={{ color: cat.accentColor }}>
                  {cat.processes.length} processes
                </p>
                <h3
                  className="font-black uppercase leading-tight"
                  style={{ color: gunmetal, fontFamily: "var(--font-barlow-condensed)", fontSize: "1.05rem" }}
                >
                  {cat.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#6B7080" }}>
                  {cat.totalPosters}+ designs
                </p>
              </div>
              <span className="font-black text-xs shrink-0" style={{ color: cat.accentColor }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Available now */}
      {availablePosters.length > 0 && (
        <section style={{ background: "#F5F4F0", borderTop: "1px solid #DDD9D0" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-end justify-between mb-8" style={{ borderBottom: `2px solid ${gunmetal}`, paddingBottom: "0.75rem" }}>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "#A06C00" }}>
                  Available Now
                </p>
                <h2
                  className="font-black uppercase text-2xl"
                  style={{ color: gunmetal, fontFamily: "var(--font-barlow-condensed)" }}
                >
                  Ready to Order
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePosters.map((poster) => (
                <Link
                  key={poster.id}
                  href={`/posters/${poster.id}`}
                  className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
                  style={{ background: "#fff", border: "1px solid #DDD9D0", borderRadius: "8px" }}
                >
                  <div className="aspect-[3/4] overflow-hidden" style={{ background: gunmetal }}>
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
                      <p className="font-mono text-xs tracking-widest uppercase" style={{ color: amber }}>
                        {poster.category}
                      </p>
                      <p
                        className="font-black uppercase text-center leading-tight text-2xl"
                        style={{ color: "#F0EDE8", fontFamily: "var(--font-barlow-condensed)" }}
                      >
                        {poster.title}
                      </p>
                      <p className="font-medium italic text-center text-sm" style={{ color: "#6B7080" }}>
                        {poster.titleEs}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between" style={{ borderTop: "1px solid #DDD9D0" }}>
                    <span className="font-black text-xl" style={{ color: gunmetal }}>From ${poster.price}</span>
                    <span className="font-black text-xs uppercase tracking-widest" style={{ color: amber }}>
                      Order →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Logo CTA */}
      <section style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono font-black uppercase text-xs tracking-widest mb-2" style={{ color: amber }}>
              Custom Branding
            </p>
            <h2
              className="font-black uppercase text-xl text-white mb-2"
              style={{ fontFamily: "var(--font-barlow-condensed)" }}
            >
              Want your company logo on the poster?
            </h2>
            <p className="text-sm" style={{ color: "#6B7080" }}>
              Upgrade any poster with custom branding. High-res JPEG, PNG, or vector accepted.
            </p>
          </div>
          <Link
            href="/custom"
            className="shrink-0 inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            style={{ background: amber, color: gunmetal }}
          >
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
