import Link from "next/link";

const values = [
  {
    icon: "🏭",
    title: "Built for the Shop Floor",
    description:
      "Every poster is designed with the realities of industrial environments in mind — bold visuals, clear language, and durable materials that hold up where it matters.",
  },
  {
    icon: "🌎",
    title: "English & Spanish",
    description:
      "Surface finishing teams are diverse. Our bilingual posters make sure safety and process information reaches every member of your crew.",
  },
  {
    icon: "🎨",
    title: "Your Brand, Your Poster",
    description:
      "Add your company logo for a professional, branded look. We handle the design work and send you a proof before anything goes to print.",
  },
];

const industries = [
  "Electroplating",
  "Anodizing",
  "Hard Chrome",
  "Zinc & Nickel Plating",
  "Powder Coating",
  "Passivation & Pickling",
  "E-Coat",
  "Chemical Milling",
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#1e1e1c" }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-black uppercase text-xs tracking-widest mb-3" style={{ color: "#d4532a" }}>
            Our Story
          </p>
          <h1
            className="font-black uppercase text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            About Plating Posters
          </h1>
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: "#888880" }}>
            Plating Posters was created by surface finishing industry professionals who got
            tired of searching for training and safety materials that actually spoke the
            language of the plating room.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Mission */}
        <div className="mb-14">
          <h2
            className="font-black uppercase text-xs tracking-widest mb-5"
            style={{ color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" }}
          >
            Why We Exist
          </h2>
          <div className="prose max-w-none text-base leading-relaxed space-y-4" style={{ color: "#4a4a42" }}>
            <p>
              Surface finishing is one of the most technically demanding and chemically intensive
              manufacturing disciplines in the world. Yet the training materials available to
              operators and supervisors have always lagged behind — generic safety posters that
              don't address the specific hazards and processes in a plating shop, or dense
              technical documents that never make it to the wall where they're needed.
            </p>
            <p>
              We set out to fix that. Plating Posters produces professionally designed, industry-specific
              reference and safety posters for the processes your team actually runs every day.
              Each poster is clear, visually strong, and built to inform — whether it's hanging
              in a new employee's line of sight or serving as a quick reference for a seasoned
              plating tech.
            </p>
          </div>
        </div>

        {/* What sets us apart */}
        <div className="mb-14">
          <h2
            className="font-black uppercase text-xs tracking-widest mb-5"
            style={{ color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" }}
          >
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6"
                style={{ background: "#fff", border: "1px solid #ddd8cc" }}
              >
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-black uppercase tracking-wide text-sm mb-2" style={{ color: "#1e1e1c" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7a72" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="mb-14 p-6" style={{ background: "#1e1e1c" }}>
          <h3 className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: "#d4532a" }}>
            Industries We Serve
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {industries.map((industry) => (
              <div
                key={industry}
                className="text-xs font-semibold px-3 py-2 text-center tracking-wide"
                style={{ background: "#2a2a28", color: "#c5bfb0", border: "1px solid #3a3a38" }}
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/posters"
            className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase text-white"
            style={{ background: "#d4532a" }}
          >
            Browse Posters
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase"
            style={{ background: "transparent", border: "2px solid #1e1e1c", color: "#1e1e1c" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
