import Link from "next/link";
import { CATEGORIES, TOTAL_ENGLISH_DESIGNS } from "@/lib/catalog";

const amber = "#E8A020";
const gunmetal = "#1A1F2E";
const borderDark = "#2A3048";
const mutedText = "#9098A8";
const dimText = "#6B7080";

const THREE_WAYS = [
  {
    label: "Browse Our Catalogue",
    description:
      "Explore 690+ poster designs across 9 process categories. General Knowledge, Demystified overviews, Safety, and deep process references.",
    href: "#catalogue",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Build Your Line",
    description:
      "Drag-and-drop your actual process line — step by step, tank by tank — and order a custom poster set that matches your shop floor.",
    href: "#build",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    label: "Design a Custom Series",
    description:
      "Need a poster for a process we don't carry yet, a different language, or a fully custom design? Let's talk.",
    href: "#custom",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

/* Featured collections for the catalogue section */
const FEATURED_COLLECTIONS = [
  {
    title: "General Knowledge",
    subtitle: "15 posters",
    description:
      "Foundational topics every plating shop needs — surface prep, water quality, hydrogen embrittlement, bath analysis, troubleshooting, and more.",
    href: "/categories",
    accentColor: "#E8A020",
    tag: "Popular",
  },
  {
    title: "Demystified Series",
    subtitle: "Process overviews",
    description:
      "The big-picture overview for each process. One poster that breaks down the chemistry, specs, and applications — perfect for training and orientation.",
    href: "/categories",
    accentColor: "#27AE60",
    tag: "Essential",
  },
  {
    title: "Safety Series",
    subtitle: "18 topics",
    description:
      "PPE, chemical handling, emergency response, ventilation, and more. English and Spanish. Dark and light editions for every shop environment.",
    href: "/categories",
    accentColor: "#E05C5C",
    tag: "New",
  },
];

/* All process categories for Build Your Line section */

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
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
              Posters{" "}
              <em
                style={{
                  color: "#F0EDE8",
                  fontStyle: "italic",
                  fontSize: "0.5em",
                  verticalAlign: "middle",
                }}
              >
                Inc
              </em>
            </h1>
            <p
              className="font-semibold italic mb-2"
              style={{ color: mutedText, fontSize: "1.1rem" }}
            >
              Your Process. Your Posters.
            </p>
            <p
              className="text-sm mb-2 pt-4 mt-4"
              style={{ color: dimText, borderTop: `1px solid ${borderDark}` }}
            >
              {TOTAL_ENGLISH_DESIGNS}+ designs across 9 process categories.
              English and Spanish. Dark and light editions.
            </p>
          </div>

          {/* Three Ways to Shop */}
          <div>
            <p
              className="font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: amber }}
            >
              Three Ways to Shop
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {THREE_WAYS.map((way) => (
                <a
                  key={way.label}
                  href={way.href}
                  className="group flex flex-col p-6 transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#141929",
                    border: `1px solid ${borderDark}`,
                    borderRadius: "12px",
                  }}
                >
                  <div
                    className="w-11 h-11 mb-4 flex items-center justify-center rounded-lg"
                    style={{ background: amber, color: gunmetal }}
                  >
                    {way.icon}
                  </div>
                  <h3
                    className="font-black uppercase text-sm tracking-wider mb-2"
                    style={{ color: "#F0EDE8" }}
                  >
                    {way.label}
                  </h3>
                  <p className="text-sm flex-1" style={{ color: dimText }}>
                    {way.description}
                  </p>
                  <span
                    className="mt-4 font-black text-xs uppercase tracking-widest transition-colors"
                    style={{ color: amber }}
                  >
                    Explore →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: BROWSE OUR CATALOGUE ── */}
      <section id="catalogue" style={{ background: "#F8F7F4" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Section header */}
          <div className="mb-10">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: "#A06C00" }}
            >
              Way 01
            </p>
            <h2
              className="font-black uppercase text-3xl md:text-4xl tracking-wide mb-3"
              style={{
                color: gunmetal,
                fontFamily: "var(--font-barlow-condensed)",
              }}
            >
              Browse Our Catalogue
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: dimText }}>
              Start here if you know what you need. Explore our full library of
              poster designs — organized by topic, process, and application.
            </p>
          </div>

          {/* Featured collections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {FEATURED_COLLECTIONS.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                className="group flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
                style={{
                  background: gunmetal,
                  border: `1px solid ${borderDark}`,
                  borderRadius: "12px",
                }}
              >
                <div style={{ height: "3px", background: col.accentColor }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-mono text-xs tracking-widest uppercase"
                      style={{ color: col.accentColor }}
                    >
                      {col.subtitle}
                    </span>
                    <span
                      className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-sm"
                      style={{
                        background: col.accentColor,
                        color: gunmetal,
                      }}
                    >
                      {col.tag}
                    </span>
                  </div>
                  <h3
                    className="font-black uppercase leading-tight mb-3"
                    style={{
                      fontFamily: "var(--font-barlow-condensed)",
                      fontSize: "1.5rem",
                      color: "#F0EDE8",
                    }}
                  >
                    {col.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: mutedText }}
                  >
                    {col.description}
                  </p>
                  <div
                    className="flex items-center justify-end mt-5 pt-4"
                    style={{ borderTop: `1px solid ${borderDark}` }}
                  >
                    <span
                      className="font-black text-xs uppercase tracking-widest"
                      style={{ color: col.accentColor }}
                    >
                      Browse →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* All process categories grid */}
          <div
            className="pt-10"
            style={{ borderTop: "1px solid #DDD9D0" }}
          >
            <h3
              className="font-black uppercase text-lg tracking-wide mb-6"
              style={{
                color: gunmetal,
                fontFamily: "var(--font-barlow-condensed)",
              }}
            >
              All Process Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5"
                  style={{
                    background: "#fff",
                    border: "1px solid #DDD9D0",
                    borderRadius: "8px",
                    borderLeft: `3px solid ${cat.accentColor}`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-black uppercase text-sm tracking-wide mb-1"
                      style={{ color: gunmetal }}
                    >
                      {cat.title}
                    </h4>
                    <p className="text-xs" style={{ color: dimText }}>
                      {cat.processes.length} processes &middot;{" "}
                      {cat.totalPosters}+ posters
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold shrink-0"
                    style={{ color: cat.accentColor }}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ background: amber, color: gunmetal }}
              >
                View Full Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: BUILD YOUR LINE ── */}
      <section id="build" style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Section header */}
          <div className="mb-10">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: amber }}
            >
              Way 02
            </p>
            <h2
              className="font-black uppercase text-3xl md:text-4xl tracking-wide mb-3"
              style={{
                color: "#F0EDE8",
                fontFamily: "var(--font-barlow-condensed)",
              }}
            >
              Build Your Line
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: mutedText }}>
              Drag-and-drop your actual process line — step by step, tank by
              tank. Pick from our step library, arrange them in your order, and
              get a custom poster set that matches your shop floor.
            </p>
          </div>

          {/* How it works — 3 steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: "1",
                title: "Pick Your Steps",
                body: "Choose process steps from our library — cleaning, plating, rinsing, coating, heat treatment, and more.",
              },
              {
                step: "2",
                title: "Arrange Your Line",
                body: "Drag steps into the order your shop actually runs. Rename them to match your team's terminology.",
              },
              {
                step: "3",
                title: "Order Your Set",
                body: "Preview your custom poster set, pick size and finish, and check out. Your posters ship in the order your line runs.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6"
                style={{
                  background: "#141929",
                  border: `1px solid ${borderDark}`,
                  borderRadius: "8px",
                }}
              >
                <div
                  className="w-10 h-10 mb-4 flex items-center justify-center rounded-full font-black text-sm"
                  style={{ background: amber, color: gunmetal }}
                >
                  {item.step}
                </div>
                <h3
                  className="font-black uppercase text-sm tracking-wider mb-2"
                  style={{ color: "#F0EDE8" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: dimText }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Browse by process */}
          <div
            className="pt-10 mb-10"
            style={{ borderTop: `1px solid ${borderDark}` }}
          >
            <h3
              className="font-black uppercase text-lg tracking-wide mb-2"
              style={{
                color: "#F0EDE8",
                fontFamily: "var(--font-barlow-condensed)",
              }}
            >
              Browse by Process
            </h3>
            <p className="text-sm mb-6" style={{ color: dimText }}>
              Jump straight into a process, or start from scratch in the line
              builder.
            </p>
            <div className="space-y-5">
              {CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: cat.accentColor }}
                    />
                    <span
                      className="font-bold uppercase text-xs tracking-wider"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.processes.map((process) => (
                      <Link
                        key={process.id}
                        href={`/categories/${cat.slug}/${process.id}`}
                        className="px-2 py-1 text-xs transition-colors hover:opacity-80"
                        style={{
                          background: borderDark,
                          color: mutedText,
                          borderRadius: "3px",
                        }}
                      >
                        {process.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/build"
              className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
              style={{ background: amber, color: gunmetal }}
            >
              Start Building Your Line
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DESIGN A CUSTOM SERIES ── */}
      <section id="custom" style={{ background: "#F8F7F4" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Section header */}
          <div className="mb-10">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: "#A06C00" }}
            >
              Way 03
            </p>
            <h2
              className="font-black uppercase text-3xl md:text-4xl tracking-wide mb-3"
              style={{
                color: gunmetal,
                fontFamily: "var(--font-barlow-condensed)",
              }}
            >
              Design a Custom Series
            </h2>
            <p className="text-sm max-w-2xl" style={{ color: dimText }}>
              Don't see your process? Need posters in a language we don't
              carry yet? Want a fully custom design tailored to your operation?
              We'll work with you to create it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* What we can do */}
            <div
              className="p-8"
              style={{
                background: gunmetal,
                borderRadius: "12px",
              }}
            >
              <h3
                className="font-black uppercase text-lg tracking-wide mb-6"
                style={{
                  color: "#F0EDE8",
                  fontFamily: "var(--font-barlow-condensed)",
                }}
              >
                What We Can Build for You
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "New Process Series",
                    body: "A process we haven't covered yet? We'll research, design, and produce a full poster series — Technical and Shop Floor editions.",
                  },
                  {
                    title: "Additional Languages",
                    body: "Need posters in French, German, Portuguese, Mandarin, or another language? We'll produce accurate, professionally translated editions.",
                  },
                  {
                    title: "Custom Branding",
                    body: "Add your company logo to any poster for a professional, branded look that reinforces your identity on the shop floor.",
                  },
                  {
                    title: "Fully Custom Designs",
                    body: "Proprietary processes, internal SOPs, or training materials — designed in the Plating Posters style and built to your specs.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4"
                  >
                    <div
                      className="w-1 shrink-0 rounded-full"
                      style={{ background: amber }}
                    />
                    <div>
                      <h4
                        className="font-black uppercase text-xs tracking-wider mb-1"
                        style={{ color: "#F0EDE8" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm" style={{ color: mutedText }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works + CTA */}
            <div className="flex flex-col">
              <div
                className="p-8 flex-1"
                style={{
                  background: "#fff",
                  border: "1px solid #DDD9D0",
                  borderRadius: "12px",
                }}
              >
                <h3
                  className="font-black uppercase text-lg tracking-wide mb-6"
                  style={{
                    color: gunmetal,
                    fontFamily: "var(--font-barlow-condensed)",
                  }}
                >
                  How It Works
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Tell Us What You Need",
                      body: "Email us your requests — tell us about your process, language, branding, or custom requirements.",
                    },
                    {
                      step: "02",
                      title: "We'll Design a Proposal",
                      body: "Our team will research your process, draft the poster content, and send you a design proposal.",
                    },
                    {
                      step: "03",
                      title: "Review & Approve",
                      body: "You'll get a digital proof for review. Once you approve, we produce and ship your custom series.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span
                        className="font-black text-lg shrink-0 w-8 text-right"
                        style={{ color: amber }}
                      >
                        {item.step}
                      </span>
                      <div>
                        <h4
                          className="font-black uppercase text-xs tracking-wider mb-1"
                          style={{ color: gunmetal }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-sm" style={{ color: dimText }}>
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-8 py-4 font-black text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
                  style={{
                    background: amber,
                    color: gunmetal,
                    borderRadius: "8px",
                  }}
                >
                  Get in Touch — Start Your Custom Series
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STAT BAR ── */}
      <section style={{ background: amber }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <div className="text-center md:text-left">
              <span
                className="font-black text-4xl"
                style={{ color: gunmetal }}
              >
                {TOTAL_ENGLISH_DESIGNS}+
              </span>
              <span
                className="font-semibold text-sm ml-3"
                style={{ color: gunmetal }}
              >
                poster designs and growing
              </span>
            </div>
            <div
              className="hidden md:block h-8 w-px"
              style={{ background: "#B87200" }}
            />
            <p
              className="text-sm font-medium text-center md:text-left"
              style={{ color: "#7A4800" }}
            >
              Give your team the visual reference they need — right on the shop
              floor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
