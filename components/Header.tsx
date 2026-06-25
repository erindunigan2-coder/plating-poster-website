"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";
  const mutedLight = "#9098A8";
  const borderDark = "#2A3048";

  return (
    <header style={{ background: gunmetal }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3">
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
                className="font-black text-white uppercase tracking-wide"
                style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "1.15rem" }}
              >
                Plating{" "}
              </span>
              <span
                className="font-black uppercase tracking-wide"
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "1.15rem",
                  color: amber,
                }}
              >
                Posters
              </span>
              <span
                className="hidden sm:inline font-mono text-xs ml-1"
                style={{ color: "#3A4055", verticalAlign: "middle" }}
              >
                Inc
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/categories", label: "Catalogue" },
              { href: "/manuals", label: "Manuals" },
              { href: "/build", label: "Build Your Line" },
              { href: "/contact", label: "Custom Series" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-semibold text-sm tracking-wider uppercase transition-colors"
                style={{ color: mutedLight }}
                onMouseEnter={(e) => (e.currentTarget.style.color = amber)}
                onMouseLeave={(e) => (e.currentTarget.style.color = mutedLight)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Contact Us button */}
            <a
              href="mailto:info@platingposters.com"
              className="hidden md:inline-flex items-center justify-center px-4 py-1.5 font-black text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
              style={{ background: amber, color: gunmetal }}
            >
              Contact Us
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              style={{ color: mutedLight }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{ background: "#141929", borderTop: `1px solid ${borderDark}` }}
          className="md:hidden px-4 pb-4 pt-3"
        >
          <nav className="flex flex-col gap-4">
            {[
              { href: "/categories", label: "Catalogue" },
              { href: "/manuals", label: "Manuals" },
              { href: "/build", label: "Build Your Line" },
              { href: "/contact", label: "Custom Series" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-bold text-sm tracking-widest uppercase"
                style={{ color: mutedLight }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
