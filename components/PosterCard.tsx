import Link from "next/link";
import Image from "next/image";
import { Poster } from "@/lib/posters";

type Props = {
  poster: Poster;
};

export default function PosterCard({ poster }: Props) {
  return (
    <Link
      href={`/posters/${poster.id}`}
      className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
      style={{ background: "#fff", border: "1px solid #ddd8cc" }}
    >
      {/* Preview */}
      <div className="relative aspect-[2/3] overflow-hidden" style={{ background: "#1e1e1c" }}>
        {poster.previewImage ? (
          <Image
            src={poster.previewImage}
            alt={`${poster.title} poster preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 h-full">
            <div className="font-black uppercase text-center leading-none" style={{ color: "#d4532a", fontSize: "1.1rem", letterSpacing: "0.1em" }}>
              {poster.category}
            </div>
            <div className="font-black uppercase text-white text-center leading-tight text-2xl px-4">
              {poster.title}
            </div>
            <svg className="w-10 h-10 mt-2" style={{ color: "#3a3a38" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs" style={{ color: "#555550" }}>Preview coming soon</p>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Languages */}
        <div className="flex gap-1 mb-3">
          {poster.languages.includes("en") && (
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5"
              style={{ background: "#f4efe3", color: "#7a7a72", border: "1px solid #ddd8cc" }}>
              EN
            </span>
          )}
          {poster.languages.includes("es") && (
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5"
              style={{ background: "#f4efe3", color: "#7a7a72", border: "1px solid #ddd8cc" }}>
              ES
            </span>
          )}
        </div>

        <p className="text-sm flex-1 mb-4 leading-relaxed" style={{ color: "#7a7a72" }}>
          {poster.description.slice(0, 100)}…
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #ddd8cc" }}>
          <span className="font-black text-xl" style={{ color: "#1e1e1c" }}>${poster.price}</span>
          <span className="font-bold text-xs uppercase tracking-widest transition-colors"
            style={{ color: "#d4532a" }}>
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
