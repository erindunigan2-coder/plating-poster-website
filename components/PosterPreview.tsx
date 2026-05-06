"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  title: string;
  previewImage: string;
  previewImageLight?: string;
};

export default function PosterPreview({ title, previewImage, previewImageLight }: Props) {
  const [edition, setEdition] = useState<"dark" | "light">("dark");
  const src = edition === "light" && previewImageLight ? previewImageLight : previewImage;
  const hasLight = !!previewImageLight;

  return (
    <div>
      <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "#1e1e1c" }}>
        <Image
          src={src}
          alt={`${title} — ${edition} edition preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Edition toggle under the image */}
      {hasLight && (
        <div className="flex mt-3 gap-0" style={{ border: "1px solid #DDD9D0", display: "inline-flex" }}>
          {(["dark", "light"] as const).map((ed) => (
            <button
              key={ed}
              onClick={() => setEdition(ed)}
              className="px-5 py-1.5 text-xs font-black uppercase tracking-widest transition-colors"
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
  );
}
