"use client";

import { useState } from "react";
import Image from "next/image";
import OrderForm from "@/components/OrderForm";
import { Poster } from "@/lib/posters";

type Props = {
  poster: Poster;
  variantMap: Record<string, string>;
};

export default function PosterDetailClient({ poster, variantMap }: Props) {
  const [edition, setEdition] = useState<"Dark" | "Light">("Dark");

  const hasLight = !!poster.previewImageLight;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Preview */}
      <div>
        <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "#1e1e1c" }}>
          {/* Dark edition — always mounted */}
          <Image
            src={poster.previewImage}
            alt={`${poster.title} — dark edition`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
            priority
            style={{ opacity: edition === "Dark" ? 1 : 0, transition: "opacity 0.25s ease" }}
          />
          {/* Light edition — always mounted, fades in */}
          {poster.previewImageLight && (
            <Image
              src={poster.previewImageLight}
              alt={`${poster.title} — light edition`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
              style={{ opacity: edition === "Light" ? 1 : 0, transition: "opacity 0.25s ease" }}
            />
          )}
        </div>

        {/* Dark / Light toggle — synced with order form */}
        {hasLight && (
          <div
            className="mt-3 inline-flex"
            style={{ border: "1px solid #DDD9D0" }}
          >
            {(["Dark", "Light"] as const).map((ed) => (
              <button
                key={ed}
                onClick={() => setEdition(ed)}
                className="px-6 py-2 text-xs font-black uppercase tracking-widest transition-colors"
                style={
                  edition === ed
                    ? { background: "#1e1e1c", color: "#F0EDE8" }
                    : { background: "#fff", color: "#9098A8" }
                }
              >
                {ed}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Details + Order */}
      <div>
        <p className="font-black uppercase text-xs tracking-widest mb-2" style={{ color: "#d4532a" }}>
          {poster.category}
        </p>
        <h1 className="font-black uppercase text-4xl leading-tight mb-1" style={{ color: "#1e1e1c" }}>
          {poster.title}
        </h1>
        <p className="italic mb-5" style={{ color: "#7a7a72" }}>{poster.titleEs}</p>

        <div className="flex gap-2 mb-5 flex-wrap">
          <span
            className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
            style={{ borderColor: "#ddd8cc", color: "#7a7a72" }}
          >
            🇺🇸 English
          </span>
          {poster.languages.includes("es") ? (
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
              style={{ borderColor: "#ddd8cc", color: "#7a7a72" }}
            >
              🇪🇸 Español
            </span>
          ) : (
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
              style={{ borderColor: "#ddd8cc", color: "#bbb8b0" }}
            >
              🇪🇸 Español —{" "}
              <span style={{ color: "#E8A020" }}>Coming Soon</span>
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a7a72" }}>
          {poster.description}
        </p>

        <div style={{ borderTop: "2px solid #1e1e1c" }} className="pt-6">
          <OrderForm
            poster={poster}
            variantMap={variantMap}
            edition={edition}
            onEditionChange={setEdition}
          />
        </div>
      </div>
    </div>
  );
}
