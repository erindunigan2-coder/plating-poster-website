import { Metadata } from "next";
import { getPoster, getAvailablePosters } from "@/lib/posters";
import { notFound } from "next/navigation";
import PosterDetailClient from "@/components/PosterDetailClient";

export async function generateStaticParams() {
  return getAvailablePosters().map((p) => ({ id: p.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const poster = getPoster(id);
  if (!poster) return {};
  return {
    title: poster.title,
    description: poster.description,
    openGraph: {
      title: poster.title,
      description: poster.description,
      images: poster.previewImage ? [{ url: poster.previewImage }] : undefined,
    },
  };
}

export default async function PosterDetailPage({ params }: Props) {
  const { id } = await params;
  const poster = getPoster(id);
  if (!poster) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: poster.title,
    description: poster.description,
    image: poster.previewImage
      ? `https://www.platingposters.com${poster.previewImage}`
      : undefined,
    brand: { "@type": "Brand", name: "Plating Posters Inc" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: poster.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `https://www.platingposters.com/posters/${poster.id}`,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PosterDetailClient poster={poster} />
    </div>
  );
}
