"use client";

import { useState } from "react";

type Step = "form" | "submitting" | "success" | "error";

export default function SubmitLogoPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    customerEmail: "",
    posterTitle: "",
    language: "English",
    size: "",
    quantity: "1",
    customerNotes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStep("submitting");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      // Also grab the file
      const fileInput = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        data.append("logoFile", fileInput.files[0]);
      }

      const res = await fetch("/api/submit-logo", { method: "POST", body: data });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Unknown error");
      setStep("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStep("error");
    }
  }

  const inputStyle = {
    background: "#fff",
    border: "1px solid #ddd8cc",
    color: "#1e1e1c",
    padding: "0.6rem 0.75rem",
    width: "100%",
    fontSize: "0.95rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 900,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: "0.4rem",
    color: "#1e1e1c",
  };

  if (step === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-black"
          style={{ background: "#3d8a6e" }}>
          ✓
        </div>
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#1e1e1c" }}>
          Logo Received!
        </h1>
        <p className="text-sm mb-6" style={{ color: "#7a7a72" }}>
          Thank you. We have your logo and order details. Our team will prepare your proof
          and email you a link to review it — usually within 2 business days.
        </p>
        <p className="text-xs" style={{ color: "#7a7a72" }}>
          Questions? Reply to your order confirmation email.
        </p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#d4532a" }}>
          Something went wrong
        </h1>
        <p className="text-sm mb-6" style={{ color: "#7a7a72" }}>{errorMessage}</p>
        <button
          onClick={() => setStep("form")}
          className="font-black uppercase text-sm tracking-widest px-6 py-3 text-white"
          style={{ background: "#d4532a" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8" style={{ borderBottom: "2px solid #1e1e1c", paddingBottom: "1rem" }}>
        <p className="font-black uppercase text-xs tracking-widest mb-1" style={{ color: "#d4532a" }}>
          Custom Logo Upgrade
        </p>
        <h1 className="font-black uppercase text-3xl" style={{ color: "#1e1e1c" }}>
          Submit Your Logo
        </h1>
        <p className="text-sm mt-2" style={{ color: "#7a7a72" }}>
          Fill in your order details and upload your logo file. We&apos;ll send you a proof
          for approval before anything prints.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Order ID */}
        <div>
          <label style={labelStyle}>Order Number</label>
          <input
            name="orderId"
            required
            placeholder="e.g. #1001"
            value={formData.orderId}
            onChange={handleChange}
            style={inputStyle}
          />
          <p className="text-xs mt-1" style={{ color: "#7a7a72" }}>
            Found in your order confirmation email
          </p>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Your Name</label>
            <input
              name="customerName"
              required
              placeholder="Jane Smith"
              value={formData.customerName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              name="customerEmail"
              type="email"
              required
              placeholder="jane@company.com"
              value={formData.customerEmail}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Poster + Language + Size */}
        <div>
          <label style={labelStyle}>Poster Title</label>
          <input
            name="posterTitle"
            required
            placeholder="e.g. Surface Preparation"
            value={formData.posterTitle}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>English</option>
              <option>Spanish</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value='18" × 24"'>18" × 24"</option>
              <option value='24" × 36"'>24" × 36"</option>
              <option value='36" × 48"'>36" × 48"</option>
            </select>
          </div>
        </div>

        {/* Logo file upload */}
        <div>
          <label style={labelStyle}>Upload Your Logo</label>
          <input
            type="file"
            accept=".ai,.eps,.pdf,.png,.svg"
            required
            style={{ ...inputStyle, padding: "0.5rem" }}
          />
          <p className="text-xs mt-1" style={{ color: "#7a7a72" }}>
            AI, EPS, PDF, SVG, or PNG (300 DPI minimum). Transparent background preferred.
          </p>
        </div>

        {/* Notes */}
        <div>
          <label style={labelStyle}>Notes for our team (optional)</label>
          <textarea
            name="customerNotes"
            rows={3}
            placeholder="Placement preferences, colors, or anything else we should know..."
            value={formData.customerNotes}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          disabled={step === "submitting"}
          className="w-full py-3 font-black text-sm tracking-widest uppercase text-white transition-opacity"
          style={{ background: "#d4532a", opacity: step === "submitting" ? 0.6 : 1 }}
        >
          {step === "submitting" ? "Submitting…" : "Submit Logo"}
        </button>
      </form>
    </div>
  );
}
