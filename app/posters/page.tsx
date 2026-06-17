import { getAvailablePosters } from "@/lib/posters";
import PosterCard from "@/components/PosterCard";

export const metadata = {
  title: "All Posters",
  description:
    "Browse all professional surface finishing and metal plating posters. Technical references and shop floor guides in English and Spanish.",
};

export default function PostersPage() {
  const posters = getAvailablePosters();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10" style={{ borderBottom: "2px solid #1e1e1c", paddingBottom: "1rem" }}>
        <p className="font-black uppercase text-xs tracking-widest mb-1" style={{ color: "#d4532a" }}>
          Catalog
        </p>
        <h1 className="font-black uppercase text-3xl" style={{ color: "#1e1e1c" }}>
          All Posters
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#7a7a72" }}>
          Professional surface finishing industry posters. Available in English and Spanish.
        </p>
      </div>

      {posters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((poster) => (
            <PosterCard key={poster.id} poster={poster} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24" style={{ color: "#7a7a72" }}>
          <p className="font-black uppercase tracking-widest">More posters coming soon</p>
          <p className="text-sm mt-2">Check back shortly as we expand our catalog.</p>
        </div>
      )}
    </div>
  );
}
