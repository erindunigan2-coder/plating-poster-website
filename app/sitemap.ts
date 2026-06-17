import { MetadataRoute } from "next";
import { getAvailablePosters } from "@/lib/posters";
import { CATEGORIES } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.platingposters.com";
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/posters`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/custom`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/submit-logo`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/returns`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/collections/safety`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/collections/general-knowledge`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/collections/demystified`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Individual poster pages
  const posters = getAvailablePosters();
  const posterPages: MetadataRoute.Sitemap = posters.map((poster) => ({
    url: `${baseUrl}/posters/${poster.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...collectionPages, ...categoryPages, ...posterPages];
}
