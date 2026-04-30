import { getPoster, getAvailablePosters } from "@/lib/posters";
import { getProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";

export async function generateStaticParams() {
  return getAvailablePosters().map((p) => ({ id: p.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PosterDetailPage({ params }: Props) {
  const { id } = await params;
  const poster = getPoster(id);
  if (!poster) notFound();

  // Build a variant map: "English / 18x24 / Matte" -> variantId
  const variantMap: Record<string, string> = {};
  try {
    const products = await getProducts();
    const shopifyProduct = products.find((p: { title: string }) =>
      p.title.toLowerCase().includes(poster.title.toLowerCase())
    );
    if (shopifyProduct) {
      shopifyProduct.variants.edges.forEach(
        ({ node: v }: { node: { title: string; id: string } }) => {
          variantMap[v.title] = v.id;
        }
      );
    }
  } catch (e) {
    console.error("Could not fetch Shopify variants:", e);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Preview */}
        <div>
          <div
            className="rounded-none aspect-[3/4] flex flex-col items-center justify-center gap-4"
            style={{ background: "#1e1e1c" }}
          >
            <p className="font-black uppercase text-xs tracking-widest" style={{ color: "#d4532a" }}>
              {poster.category}
            </p>
            <p className="font-black uppercase text-white text-3xl text-center px-6 leading-tight">
              {poster.title}
            </p>
            <p className="font-medium italic text-center text-sm px-6" style={{ color: "#888880" }}>
              {poster.titleEs}
            </p>
            <svg className="w-14 h-14 mt-4" style={{ color: "#3a3a38" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs" style={{ color: "#555550" }}>Preview image coming soon</p>
          </div>
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

          <div className="flex gap-2 mb-5">
            {poster.languages.includes("en") && (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
                style={{ borderColor: "#ddd8cc", color: "#7a7a72" }}>🇺🇸 English</span>
            )}
            {poster.languages.includes("es") && (
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
                style={{ borderColor: "#ddd8cc", color: "#7a7a72" }}>🇪🇸 Español</span>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a7a72" }}>
            {poster.description}
          </p>

          <div style={{ borderTop: "2px solid #1e1e1c" }} className="pt-6">
            <OrderForm poster={poster} variantMap={variantMap} />
          </div>
        </div>
      </div>
    </div>
  );
}
