"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Step = "review" | "submitting" | "approved" | "changes" | "error";

function ProofReviewForm() {
  const searchParams = useSearchParams();
  const recordId = searchParams.get("id") || "";
  const rawProofUrl = searchParams.get("proof") || "";
  const customerName = searchParams.get("name") || "there";
  const token = searchParams.get("token") || "";

  // Only allow real HTTPS URLs for the proof image — block javascript: and data: schemes
  const proofUrl = rawProofUrl.startsWith("https://") ? rawProofUrl : "";

  const [step, setStep] = useState<Step>("review");
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDecision(decision: "approved" | "changes") {
    if (decision === "changes" && !feedback.trim()) {
      alert("Please describe the changes you need before submitting.");
      return;
    }
    setStep("submitting");
    try {
      const res = await fetch("/api/approve-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, decision, feedback, token }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setStep(decision === "approved" ? "approved" : "changes");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStep("error");
    }
  }

  if (step === "approved") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-black"
          style={{ background: "#3d8a6e" }}>
          ✓
        </div>
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#1e1e1c" }}>
          Proof Approved!
        </h1>
        <p className="text-sm" style={{ color: "#7a7a72" }}>
          Your approval has been sent to our print team. Your poster is now in the print queue.
          You will receive a shipping confirmation once it&apos;s on its way.
        </p>
      </div>
    );
  }

  if (step === "changes") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-black"
          style={{ background: "#d4532a" }}>
          ↩
        </div>
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#1e1e1c" }}>
          Changes Noted
        </h1>
        <p className="text-sm" style={{ color: "#7a7a72" }}>
          We&apos;ve received your feedback and will revise the proof. You&apos;ll get a new proof
          link by email shortly.
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
          onClick={() => setStep("review")}
          className="font-black uppercase text-sm tracking-widest px-6 py-3 text-white"
          style={{ background: "#d4532a" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!recordId) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-black uppercase text-2xl mb-3" style={{ color: "#d4532a" }}>
          Invalid Link
        </h1>
        <p className="text-sm" style={{ color: "#7a7a72" }}>
          This proof review link is invalid or has expired. Please check your email
          for the correct link.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8" style={{ borderBottom: "2px solid #1e1e1c", paddingBottom: "1rem" }}>
        <p className="font-black uppercase text-xs tracking-widest mb-1" style={{ color: "#d4532a" }}>
          Proof Review
        </p>
        <h1 className="font-black uppercase text-3xl" style={{ color: "#1e1e1c" }}>
          Your Poster Proof
        </h1>
        <p className="text-sm mt-2" style={{ color: "#7a7a72" }}>
          Hi {customerName} — please review your proof below and either approve it or
          request changes. Nothing prints until you approve.
        </p>
      </div>

      {/* Proof display */}
      <div className="mb-8 flex items-center justify-center" style={{ background: "#1e1e1c", minHeight: "400px" }}>
        {proofUrl ? (
          <img src={proofUrl} alt="Your poster proof" className="max-w-full max-h-[600px] object-contain" />
        ) : (
          <div className="text-center py-20">
            <p className="font-bold uppercase text-xs tracking-widest mb-2" style={{ color: "#d4532a" }}>
              Proof
            </p>
            <p className="text-sm" style={{ color: "#888880" }}>
              Your proof image will appear here when sent via the link in your email.
            </p>
          </div>
        )}
      </div>

      {/* Decision */}
      <div className="space-y-5">
        <div>
          <label className="block font-black uppercase text-xs tracking-widest mb-2"
            style={{ color: "#1e1e1c" }}>
            Request Changes (describe below, then click Request Changes)
          </label>
          <textarea
            rows={4}
            placeholder="Describe any changes needed — logo placement, size adjustments, etc."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{
              background: "#fff",
              border: "1px solid #ddd8cc",
              padding: "0.6rem 0.75rem",
              width: "100%",
              fontSize: "0.95rem",
              resize: "vertical",
              color: "#1e1e1c",
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleDecision("approved")}
            disabled={step === "submitting"}
            className="flex-1 py-3 font-black text-sm tracking-widest uppercase text-white"
            style={{ background: "#3d8a6e", opacity: step === "submitting" ? 0.6 : 1 }}
          >
            ✓ Approve & Go to Print
          </button>
          <button
            onClick={() => handleDecision("changes")}
            disabled={step === "submitting"}
            className="flex-1 py-3 font-black text-sm tracking-widest uppercase"
            style={{
              background: "#fff",
              border: "2px solid #d4532a",
              color: "#d4532a",
              opacity: step === "submitting" ? 0.6 : 1,
            }}
          >
            ↩ Request Changes
          </button>
        </div>

        <p className="text-xs text-center" style={{ color: "#7a7a72" }}>
          By clicking &quot;Approve &amp; Go to Print&quot; you confirm the proof is correct
          and authorize printing.
        </p>
      </div>
    </div>
  );
}

export default function ReviewProofPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Loading proof…</div>}>
      <ProofReviewForm />
    </Suspense>
  );
}
