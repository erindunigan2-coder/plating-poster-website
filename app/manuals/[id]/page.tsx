import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getManual, getAvailableManuals } from "@/lib/manuals";
import ManualOrderForm from "@/components/ManualOrderForm";

export function generateStaticParams() {
  return getAvailableManuals().map((m) => ({ id: m.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const manual = getManual(id);
  if (!manual) return {};
  return {
    title: `${manual.title} — Plating Posters Inc`,
    description: manual.description,
    openGraph: { title: manual.title, description: manual.description, images: [{ url: manual.coverImage }] },
  };
}

export default async function ManualDetailPage({ params }: Props) {
  const { id } = await params;
  const manual = getManual(id);
  if (!manual) notFound();

  const gunmetal = "#1A1F2E";
  const teal = "#17857A";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: manual.title,
    description: manual.description,
    image: `https://www.platingposters.com${manual.coverImage}`,
    brand: { "@type": "Brand", name: "Plating Posters Inc" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: manual.priceDigital.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `https://www.platingposters.com/manuals/${manual.id}`,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/manuals" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B7080" }}>
        ← Training Manuals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        {/* Left: cover + details */}
        <div>
          <div className="rounded-xl overflow-hidden border bg-[#F4F2EC] p-6 flex items-center justify-center" style={{ borderColor: "#E2DED5" }}>
            <Image src={manual.coverImage} alt={`${manual.title} cover`} width={612} height={792} className="w-full max-w-md h-auto shadow-lg rounded" priority />
          </div>

          <div className="mt-8">
            <h2 className="font-black text-sm uppercase tracking-widest mb-3" style={{ color: teal }}>What&apos;s inside</h2>
            <ul className="space-y-2">
              {manual.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "#3A4055" }}>
                  <span style={{ color: teal }}>✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-4 rounded-lg text-xs leading-relaxed" style={{ background: "#FAF9F6", border: "1px solid #E2DED5", color: "#6B7080" }}>
            <strong>Training reference only.</strong> Always verify exact parameters against your chemistry
            supplier&apos;s Technical Data Sheets (TDS), customer specs, current SDS, and applicable OSHA/EPA
            and local regulations before production use. Single-shop license; not for redistribution.
          </div>
        </div>

        {/* Right: buy */}
        <div>
          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: teal }}>Training Manual</p>
          <h1 className="font-black leading-tight mb-3" style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: gunmetal }}>
            {manual.title}
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#3A4055" }}>{manual.description}</p>

          <div className="lg:sticky lg:top-6 border rounded-xl p-6" style={{ borderColor: "#E2DED5", background: "#fff" }}>
            <ManualOrderForm manual={manual} />
          </div>

          <p className="text-xs mt-4" style={{ color: "#6B7080" }}>
            Pairs with the{" "}
            <Link href={`/posters/${manual.seriesId}-process-overview`} className="underline" style={{ color: teal }}>
              {manual.seriesLabel} poster series
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
