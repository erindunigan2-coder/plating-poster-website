import Link from "next/link";
import { TOTAL_ENGLISH_DESIGNS } from "@/lib/catalog";

const amber = "#E8A020";
const gunmetal = "#1A1F2E";

export default function Home() {
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
              Your Process. Your Posters.
            </p>
            <p
              className="text-sm mb-8 pt-4 mt-4"
              style={{
                color: "#6B7080",
                borderTop: "1px solid #2A3048",
              }}
            >
              Build your actual process line — step by step, tank by tank — and get a custom poster set that matches your shop floor. {TOTAL_ENGLISH_DESIGNS}+ designs across 9 process categories. English and Spanish. Dark and light editions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ background: amber, color: gunmetal }}
              >
                Browse Our Catalogue
              </Link>
              <Link
                href="/build"
                className="inline-flex items-center justify-center px-7 py-3 font-black text-sm tracking-widest uppercase transition-colors"
                style={{ border: "1px solid #2A3048", color: "#9098A8" }}
              >
                Build Your Line
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

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: "#A06C00" }}>
            New
          </p>
          <h2
            className="font-black uppercase text-2xl tracking-wide"
            style={{ color: gunmetal, fontFamily: "var(--font-barlow-condensed)" }}
          >
            Build Your Line
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            {
              step: "1",
              title: "Pick Your Steps",
              body: "Choose process steps from our library — cleaning, plating, rinsing, coating, heat treatment, and more. Mix chemistries freely.",
            },
            {
              step: "2",
              title: "Arrange Your Line",
              body: "Drag steps into the order your shop actually runs. Rename them to match your team\u2019s terminology. Duplicate rinses, skip steps \u2014 your line, your way.",
            },
            {
              step: "3",
              title: "Order Your Set",
              body: "Preview your custom poster set, pick size and finish, and check out. Your posters ship in the order your line runs \u2014 ready to hang.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6"
              style={{ background: "#fff", border: "1px solid #DDD9D0", borderRadius: "8px" }}
            >
              <div
                className="w-10 h-10 mb-4 flex items-center justify-center rounded-full font-black text-sm"
                style={{ background: amber, color: gunmetal }}
              >
                {item.step}
              </div>
              <h3 className="font-black uppercase text-sm tracking-wider mb-2" style={{ color: gunmetal }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "#6B7080" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/build"
            className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
            style={{ background: amber, color: gunmetal }}
          >
            Start Building
          </Link>
        </div>
      </section>

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
