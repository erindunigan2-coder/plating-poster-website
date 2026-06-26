"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/** Amazon "Look Inside"-style preview: a strip of real interior-page thumbnails
 *  that open in a full-screen lightbox with prev/next + keyboard navigation. */
export default function LookInside({ pages, title }: { pages: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const teal = "#17857A";
  const gunmetal = "#1A1F2E";
  const amber = "#E8A020";

  const count = pages.length;
  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // lock background scroll while the lightbox is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  if (!count) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
        <h2 className="font-black text-sm uppercase tracking-widest" style={{ color: teal }}>
          Look inside
        </h2>
        <span className="text-xs" style={{ color: "#6B7080" }}>
          A few sample pages — click to enlarge
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1">
        {pages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="group relative shrink-0 rounded-lg overflow-hidden border bg-white transition-shadow hover:shadow-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#E2DED5", width: 150 }}
            aria-label={`Preview page ${i + 1} of ${title}`}
          >
            <Image
              src={src}
              alt={`${title} — sample page ${i + 1}`}
              width={300}
              height={388}
              className="w-full h-auto block"
            />
            <span
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(26,31,46,0.45)" }}
            >
              <span
                className="px-3 py-1.5 font-black text-[10px] tracking-widest uppercase rounded"
                style={{ background: amber, color: gunmetal }}
              >
                Enlarge
              </span>
            </span>
            <span
              className="absolute top-1.5 left-1.5 px-1.5 py-0.5 font-mono text-[10px] rounded"
              style={{ background: "rgba(26,31,46,0.8)", color: "#fff" }}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs mt-2" style={{ color: "#9098A8" }}>
        Preview pages are watermark-free samples of the actual manual interior.
      </p>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(10,13,20,0.92)" }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full font-black text-xl"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
            aria-label="Close preview"
          >
            ✕
          </button>

          {/* Prev */}
          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 sm:left-6 w-11 h-11 flex items-center justify-center rounded-full font-black text-2xl"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
              aria-label="Previous page"
            >
              ‹
            </button>
          )}

          {/* Page */}
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={pages[index]}
              alt={`${title} — sample page ${index + 1}`}
              width={816}
              height={1056}
              className="max-h-[82vh] w-auto h-auto shadow-2xl rounded"
              priority
            />
            <span className="mt-3 font-mono text-xs tracking-widest" style={{ color: "#C7CCD8" }}>
              Sample {index + 1} / {count}
            </span>
          </div>

          {/* Next */}
          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full font-black text-2xl"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
              aria-label="Next page"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}
