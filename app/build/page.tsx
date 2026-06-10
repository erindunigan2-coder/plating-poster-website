"use client";

import { useState } from "react";
import LineBuilder from "@/components/LineBuilder";
import LineOrderForm from "@/components/LineOrderForm";
import type { ProcessStep } from "@/lib/steps";

type LineStep = {
  instanceId: string;
  step: ProcessStep;
  customName?: string;
};

const amber = "#E8A020";
const gunmetal = "#1A1F2E";

export default function BuildPage() {
  const [lineSteps, setLineSteps] = useState<LineStep[]>([]);

  return (
    <>
      {/* Hero */}
      <section style={{ background: gunmetal }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: amber }}
            >
              Build Your Line
            </p>
            <h1
              className="font-black uppercase leading-none mb-4"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "#F0EDE8",
              }}
            >
              Your Process.{" "}
              <span style={{ color: amber }}>Your Posters.</span>
            </h1>
            <p
              className="text-sm mb-2"
              style={{ color: "#9098A8" }}
            >
              Build your actual process line — step by step, tank by tank — and
              get a custom poster set that matches your shop floor, not a
              textbook.
            </p>
            <p className="text-xs" style={{ color: "#3A4055" }}>
              Drag steps from the library. Reorder to match your line. Mix
              chemistries freely. Order the set when you&apos;re ready.
            </p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Builder (left + center) */}
          <div className="flex-1 min-w-0">
            <LineBuilder onLineChange={setLineSteps} />
          </div>

          {/* Order form (right sidebar) */}
          {lineSteps.length > 0 && (
            <div className="xl:w-80 shrink-0">
              <div className="sticky top-20">
                <LineOrderForm lineSteps={lineSteps} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: gunmetal }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2
            className="font-black uppercase text-xl mb-8 text-center"
            style={{ fontFamily: "var(--font-barlow-condensed)", color: "#F0EDE8" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Build Your Line",
                body: "Pick process steps from the library and arrange them to match your actual shop floor setup — not a textbook sequence.",
              },
              {
                step: "2",
                title: "Choose Your Options",
                body: "Select size, finish, edition, and language. Add your company logo for a professional, branded look.",
              },
              {
                step: "3",
                title: "Order Your Set",
                body: "Check out securely via Stripe. Your custom poster set ships ready to hang — in the order your line runs.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full font-black text-sm"
                  style={{ background: amber, color: gunmetal }}
                >
                  {item.step}
                </div>
                <h3 className="font-black uppercase text-sm tracking-wider mb-2" style={{ color: "#F0EDE8" }}>
                  {item.title}
                </h3>
                <p className="text-xs" style={{ color: "#6B7080" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
