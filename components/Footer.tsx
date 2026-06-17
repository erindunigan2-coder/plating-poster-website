"use client";

import Link from "next/link";

export default function Footer() {
  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";
  const navy = "#0D1020";
  const muted = "#9098A8";
  const dimmed = "#3A4055";
  const borderDark = "#2A3048";

  return (
    <footer style={{ background: gunmetal, borderTop: `3px solid ${amber}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center font-black text-xs rounded"
                style={{
                  background: `linear-gradient(135deg, ${amber}, #2EC4B6)`,
                  color: gunmetal,
                  fontFamily: "var(--font-barlow-condensed)",
                }}
              >
                PP
              </div>
              <div className="leading-none">
                <span
                  className="font-black uppercase tracking-wide text-white"
                  style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "1.05rem" }}
                >
                  Plating{" "}
                </span>
                <span
                  className="font-black uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "1.05rem", color: amber }}
                >
                  Posters
                </span>
                <span className="font-mono text-xs ml-1" style={{ color: dimmed }}>Inc</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: muted }}>
              The Metal Finishing Reference Series. Professional process posters for electroplating, anodizing, coating, and more. English and Spanish.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: amber }}>
              Catalog
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/categories", label: "Browse All Categories" },
                { href: "/categories/electroplating", label: "Electroplating" },
                { href: "/categories/anodizing", label: "Anodizing" },
                { href: "/categories/chemical-treatment", label: "Chemical Treatment" },
                { href: "/custom", label: "Custom Logo Upgrade" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors"
                    style={{ color: muted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EDE8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: amber }}>
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/submit-logo", label: "Submit Your Logo" },
                { href: "/review-proof", label: "Review a Proof" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/returns", label: "Return Policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors"
                    style={{ color: muted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EDE8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: `1px solid ${borderDark}`, color: dimmed }}
        >
          <span>© {new Date().getFullYear()} Plating Posters Inc. All rights reserved.</span>
          <span className="font-mono" style={{ color: "#252B3D" }}>
            Metal Finishing Reference Series
          </span>
        </div>
      </div>

      {/* Navy base strip */}
      <div style={{ background: navy, borderTop: `1px solid ${borderDark}` }} className="py-2">
        <p className="text-center font-mono text-xs" style={{ color: "#1E2435" }}>
          Plating Posters Inc · info@platingposters.com
        </p>
      </div>
    </footer>
  );
}
