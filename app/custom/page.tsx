import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Choose Your Poster",
    description: "Select the poster title, language, and size that fits your operation.",
  },
  {
    number: "02",
    title: "Add the Logo Upgrade",
    description: 'Check the "Add Custom Logo" option and complete your order at checkout.',
  },
  {
    number: "03",
    title: "Send Us Your Logo",
    description: "After ordering, you'll receive an email with instructions for submitting your logo file.",
  },
  {
    number: "04",
    title: "Approve Your Proof",
    description: "We'll prepare a digital proof and send it to you for approval before anything goes to print.",
  },
  {
    number: "05",
    title: "Print & Ship",
    description: "Once you approve the proof, we print and ship your custom-branded poster.",
  },
];

export default function CustomPage() {
  return (
    <div>
      {/* Header */}
      <section style={{ background: "#1e1e1c" }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-black uppercase text-xs tracking-widest mb-3" style={{ color: "#d4532a" }}>
            Upgrade
          </p>
          <h1 className="font-black uppercase text-white leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Custom Logo
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "#888880" }}>
            Make any poster uniquely yours. Add your company logo for a professional,
            branded look that reinforces your identity on the shop floor.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Price callout */}
        <div className="flex items-center gap-6 p-6 mb-12" style={{ background: "#d4532a" }}>
          <div>
            <p className="font-black text-white uppercase text-xs tracking-widest mb-1">Upgrade Price</p>
            <p className="font-black text-white text-5xl leading-none">+$35</p>
          </div>
          <div style={{ width: "1px", background: "#b8461f", alignSelf: "stretch" }} />
          <p className="text-white/80 text-sm">
            Added to the base poster price. One upgrade covers one order of any size or language.
          </p>
        </div>

        {/* How it works */}
        <h2 className="font-black uppercase text-xs tracking-widest mb-5" style={{ color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" }}>
          How It Works
        </h2>
        <div className="space-y-3 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 items-start p-5"
              style={{ background: "#fff", border: "1px solid #ddd8cc" }}
            >
              <span className="font-black text-2xl shrink-0 w-10 text-right" style={{ color: "#d4532a" }}>
                {step.number}
              </span>
              <div>
                <h3 className="font-black uppercase tracking-wide mb-1" style={{ color: "#1e1e1c" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7a72" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Logo specs */}
        <div className="p-6 mb-10" style={{ background: "#1e1e1c" }}>
          <h3 className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: "#d4532a" }}>
            Logo File Requirements
          </h3>
          <ul className="text-sm space-y-2" style={{ color: "#888880" }}>
            <li className="flex gap-2">
              <span style={{ color: "#3d8a6e" }}>✔</span>
              <span>Preferred formats: <strong className="text-white">AI, EPS, PDF, or high-resolution PNG</strong></span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#3d8a6e" }}>✔</span>
              <span>Minimum resolution: <strong className="text-white">300 DPI</strong></span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#3d8a6e" }}>✔</span>
              <span>Transparent background preferred</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "#3d8a6e" }}>✔</span>
              <span>All fonts outlined if submitting AI or EPS</span>
            </li>
          </ul>
        </div>

        <Link
          href="/posters"
          className="inline-flex items-center justify-center px-8 py-3 font-black text-sm tracking-widest uppercase text-white"
          style={{ background: "#d4532a" }}
        >
          Browse Posters to Get Started
        </Link>
      </div>
    </div>
  );
}
