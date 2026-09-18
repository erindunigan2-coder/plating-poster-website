import Link from "next/link";
import { getManualForPoster } from "@/lib/manuals";

/** Round "training manual" seal shown on a process series page.
 *  Resolves the manual from any poster id in the series (same prefix
 *  matching as ManualCrossSell); renders nothing if the series has no manual. */
export default function ManualSealButton({ posterId }: { posterId: string }) {
  const manual = getManualForPoster(posterId);
  if (!manual) return null;

  return (
    <Link
      href={`/manuals/${manual.id}`}
      aria-label={`${manual.seriesLabel} training manual — from $${manual.priceDigital}`}
      className="group shrink-0 transition duration-200 hover:brightness-110 hover:drop-shadow-lg"
      style={{ transform: "rotate(-8deg)" }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 132,
          height: 132,
          borderRadius: "50%",
          background: "#E8A020",
          border: "3px solid #1A1F2E",
          boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        }}
      >
        <span
          className="flex flex-col items-center justify-center text-center"
          style={{
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "1.5px dashed rgba(26,31,46,0.55)",
            color: "#1A1F2E",
            padding: "8px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.9 6.26L21.6 9.1l-5 4.66L17.8 21 12 17.55 6.2 21l1.2-7.24-5-4.66 6.7-.84L12 2z" />
          </svg>
          <span
            className="font-black uppercase leading-tight"
            style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "13px", letterSpacing: "0.06em", marginTop: "3px" }}
          >
            Training
            <br />
            Manual
          </span>
          <span className="font-mono" style={{ fontSize: "8.5px", marginTop: "3px", opacity: 0.8 }}>
            {manual.pages} PAGES · EN/ES
          </span>
          <span
            className="font-black uppercase"
            style={{ fontSize: "9.5px", letterSpacing: "0.08em", marginTop: "2px" }}
          >
            from ${manual.priceDigital}
          </span>
        </span>
      </span>
    </Link>
  );
}
