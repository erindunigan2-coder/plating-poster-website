import { getPoster, getAvailablePosters } from "@/lib/posters";
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PosterDetailClient poster={poster} />
    </div>
  );
}
