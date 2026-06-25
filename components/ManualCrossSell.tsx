import Link from "next/link";
import Image from "next/image";
import { getManualForPoster } from "@/lib/manuals";

/** Cross-sell shown on a poster's page: if the poster's series has a training manual,
 *  suggest it ("complete the training"). Renders nothing if there's no matching manual. */
export default function ManualCrossSell({ posterId }: { posterId: string }) {
  const manual = getManualForPoster(posterId);
  if (!manual) return null;

  const amber = "#E8A020";
  const gunmetal = "#1A1F2E";

  return (
    <section className="mt-12">
      <div
        className="rounded-xl overflow-hidden flex flex-col sm:flex-row items-stretch"
        style={{ background: gunmetal, border: `1px solid ${amber}33` }}
      >
        <div className="sm:w-44 shrink-0 bg-white/5 flex items-center justify-center p-4">
          <Image
            src={manual.coverImage}
            alt={`${manual.seriesLabel} Training Manual cover`}
            width={176}
            height={228}
            className="w-32 h-auto shadow-lg rounded"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: amber }}>
            Complete the training
          </span>
          <h3 className="text-xl font-black mt-1" style={{ color: "#F0EDE8" }}>
            {manual.seriesLabel} — Complete Training Manual
          </h3>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "#9098A8" }}>
            Going deep on {manual.seriesLabel}? The {manual.pages}-page training manual turns this
            series into a full new-operator course — the “why” behind every step, integrated safety,
            and a completion test with certificate. English &amp; Spanish.
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <Link
              href={`/manuals/${manual.id}`}
              className="px-5 py-2.5 font-black text-xs tracking-widest uppercase rounded"
              style={{ background: amber, color: gunmetal }}
            >
              View the Manual — ${manual.price}
            </Link>
            <Link href="/manuals" className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9098A8" }}>
              All Training Manuals →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
