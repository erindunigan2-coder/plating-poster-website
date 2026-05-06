import { getPoster, getAvailablePosters } from "@/lib/posters";
import { getProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import PosterDetailClient from "@/components/PosterDetailClient";

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
      <PosterDetailClient poster={poster} variantMap={variantMap} />
    </div>
  );
}
