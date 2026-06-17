"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Step = "form" | "submitting" | "success" | "error";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "application/postscript", // .ai, .eps
  "application/pdf",
  "application/illustrator",
];
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".ai", ".eps", ".pdf"];

function SubmitLogoForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
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

  // Pre-fill from URL params (passed from checkout success page)
  useEffect(() => {
    const order = searchParams.get("order");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const poster = searchParams.get("poster");
    setFormData((prev) => ({
      ...prev,
      orderId: order || prev.orderId,
      customerName: name || prev.customerName,
      customerEmail: email || prev.customerEmail,
      posterTitle: poster || prev.posterTitle,
    }));
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validateFile(file: File): string | null {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return `"${ext}" files are not accepted. Please upload a PNG, JPEG, SVG, AI, EPS, or PDF file.`;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Your file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the maximum is ${MAX_FILE_SIZE_MB} MB. Try saving as a high-quality PNG instead.`;
    }
    return null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFileName("");
      return;
    }
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFileName("");
      e.target.value = ""; // clear the input
      return;
    }
    setSelectedFileName(file.name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStep("submitting");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      const fileInput = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        const fileErr = validateFile(fileInput.files[0]);
        if (fileErr) throw new Error(fileErr);
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
          Questions? Email us at{" "}
          <a href="mailto:info@platingposters.com" className="underline" style={{ color: "#d4532a" }}>
            info@platingposters.com
          </a>
        </p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#d4532a" }}>
          Upload Failed
        </h1>
        <p className="text-sm mb-4" style={{ color: "#7a7a72" }}>{errorMessage}</p>
        <p className="text-xs mb-6" style={{ color: "#7a7a72" }}>
          If this keeps happening, email your logo directly to{" "}
          <a href="mailto:info@platingposters.com" className="underline" style={{ color: "#d4532a" }}>
            info@platingposters.com
          </a>{" "}
          with your order number and we&apos;ll take care of it.
        </p>
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
            placeholder="From your order confirmation email"
            value={formData.orderId}
            onChange={handleChange}
            style={inputStyle}
          />
          <p className="text-xs mt-1" style={{ color: "#7a7a72" }}>
            Check your email receipt from Stripe for the reference number
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
            <p className="text-xs mt-1" style={{ color: "#7a7a72" }}>
              We&apos;ll send your proof to this address
            </p>
          </div>
        </div>

        {/* Poster + Language + Size */}
        <div>
          <label style={labelStyle}>Poster Title(s)</label>
          <input
            name="posterTitle"
            required
            placeholder="e.g. Cyanide Safety — Never Add Acid"
            value={formData.posterTitle}
            onChange={handleChange}
            style={inputStyle}
          />
          <p className="text-xs mt-1" style={{ color: "#7a7a72" }}>
            If your order includes multiple posters, list them all
          </p>
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
              <option value='18" × 24"'>18&quot; × 24&quot;</option>
              <option value='24" × 36"'>24&quot; × 36&quot;</option>
              <option value='36" × 48"'>36&quot; × 48&quot;</option>
            </select>
          </div>
        </div>

        {/* Logo file upload */}
        <div>
          <label style={labelStyle}>Upload Your Logo</label>
          <input
            type="file"
            accept=".ai,.eps,.svg,.png,.jpg,.jpeg,.pdf"
            required
            onChange={handleFileChange}
            style={{ ...inputStyle, padding: "0.5rem" }}
          />
          {fileError && (
            <p className="text-xs mt-1 font-bold" style={{ color: "#d4532a" }}>
              {fileError}
            </p>
          )}
          {selectedFileName && !fileError && (
            <p className="text-xs mt-1" style={{ color: "#3d8a6e" }}>
              ✓ {selectedFileName}
            </p>
          )}

          {/* File requirements box */}
          <div className="mt-3 p-3" style={{ background: "#f9f8f5", border: "1px solid #eae7de" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "#1e1e1c" }}>
              Logo File Requirements
            </p>
            <ul className="text-xs space-y-1" style={{ color: "#7a7a72" }}>
              <li><strong>Best:</strong> Vector file — AI, EPS, or SVG</li>
              <li><strong>Good:</strong> High-resolution PNG or JPEG — 300 DPI at print size, minimum 1000px wide</li>
              <li><strong>OK:</strong> PDF with embedded vector artwork</li>
              <li><strong>Transparent background</strong> preferred (PNG or SVG)</li>
              <li><strong>Max file size:</strong> 10 MB</li>
            </ul>
            <p className="text-xs mt-2" style={{ color: "#7a7a72" }}>
              Low-resolution logos (small JPEGs, screenshots, logos pulled from websites) may not
              print clearly at poster size. If you&apos;re unsure, send what you have — we&apos;ll
              let you know if we need a higher quality version.
            </p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label style={labelStyle}>Notes for our team (optional)</label>
          <textarea
            name="customerNotes"
            rows={3}
            placeholder="Placement preferences, specific colors to match, or anything else we should know..."
            value={formData.customerNotes}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          disabled={step === "submitting" || !!fileError}
          className="w-full py-3 font-black text-sm tracking-widest uppercase text-white transition-opacity"
          style={{ background: "#d4532a", opacity: step === "submitting" || fileError ? 0.6 : 1 }}
        >
          {step === "submitting" ? "Submitting…" : "Submit Logo"}
        </button>
      </form>

      {/* Alternative contact */}
      <div className="mt-8 p-4 text-center" style={{ background: "#f9f8f5", border: "1px solid #eae7de" }}>
        <p className="text-xs" style={{ color: "#7a7a72" }}>
          Having trouble uploading? Email your logo directly to{" "}
          <a href="mailto:info@platingposters.com" className="underline" style={{ color: "#d4532a" }}>
            info@platingposters.com
          </a>{" "}
          with your order number and poster title.
        </p>
      </div>
    </div>
  );
}

export default function SubmitLogoPage() {
  return (
    <Suspense>
      <SubmitLogoForm />
    </Suspense>
  );
}
