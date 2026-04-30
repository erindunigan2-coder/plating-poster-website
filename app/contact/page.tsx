"use client";

import { useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "info@platingposters.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "#1e1e1c" }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-black uppercase text-xs tracking-widest mb-3" style={{ color: "#d4532a" }}>
            Get in Touch
          </p>
          <h1
            className="font-black uppercase text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Contact Us
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "#888880" }}>
            Questions about an order, a custom project, or something else? We&apos;re happy to help.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Contact info */}
          <div className="md:col-span-2">
            <h2
              className="font-black uppercase text-xs tracking-widest mb-5"
              style={{ color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" }}
            >
              Contact Info
            </h2>
            <div className="space-y-6 text-sm" style={{ color: "#4a4a42" }}>
              <div>
                <p className="font-black uppercase tracking-wide text-xs mb-1" style={{ color: "#1e1e1c" }}>
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors"
                  style={{ color: "#d4532a" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#b8461f")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#d4532a")}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className="font-black uppercase tracking-wide text-xs mb-1" style={{ color: "#1e1e1c" }}>
                  Response Time
                </p>
                <p style={{ color: "#7a7a72" }}>
                  We typically respond within 1–2 business days.
                </p>
              </div>
              <div>
                <p className="font-black uppercase tracking-wide text-xs mb-1" style={{ color: "#1e1e1c" }}>
                  Order Questions
                </p>
                <p style={{ color: "#7a7a72" }}>
                  For questions about an existing order, please include your order number in your message.
                </p>
              </div>
            </div>

            <div className="mt-8 p-5" style={{ background: "#1e1e1c" }}>
              <p className="font-black uppercase text-xs tracking-widest mb-2" style={{ color: "#d4532a" }}>
                Custom Projects
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#888880" }}>
                Need a poster in a language we don&apos;t carry yet, or a fully custom design? Reach out — we&apos;d love to talk.
              </p>
              <Link
                href="/custom"
                className="text-xs font-bold uppercase tracking-widest transition-colors"
                style={{ color: "#3d8a6e" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#3d8a6e")}
              >
                Learn About Logo Upgrades →
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <h2
              className="font-black uppercase text-xs tracking-widest mb-5"
              style={{ color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" }}
            >
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-black uppercase text-xs tracking-widest mb-2"
                  style={{ color: "#1e1e1c" }}
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd8cc",
                    color: "#1e1e1c",
                  }}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-black uppercase text-xs tracking-widest mb-2"
                  style={{ color: "#1e1e1c" }}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd8cc",
                    color: "#1e1e1c",
                  }}
                  placeholder="jane@yourcompany.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-black uppercase text-xs tracking-widest mb-2"
                  style={{ color: "#1e1e1c" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 text-sm outline-none resize-none"
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd8cc",
                    color: "#1e1e1c",
                  }}
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-black text-sm tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: "#d4532a" }}
              >
                Send Message
              </button>
              <p className="text-xs text-center" style={{ color: "#aaa8a0" }}>
                Clicking &ldquo;Send Message&rdquo; will open your email client with your message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
