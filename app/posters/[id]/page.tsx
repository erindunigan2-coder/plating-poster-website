import { getPoster, getAvailablePosters } from "@/lib/posters";
import { getProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import PosterPreview from "@/components/PosterPreview";
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
          <PosterPreview
            title={poster.title}
            previewImage={poster.previewImage}
            previewImageLight={poster.previewImageLight}
          />
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
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
              style={{ borderColor: "#ddd8cc", color: "#7a7a72" }}>🇺🇸 English</span>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 border"
              style={{ borderColor: "#ddd8cc", color: "#bbb8b0" }}>
              🇪🇸 Español — <span style={{ color: "#E8A020" }}>Coming Soon</span>
            </span>
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
