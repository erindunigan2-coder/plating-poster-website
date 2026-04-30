// Poster data — add new posters here as PDFs become available
// When Shopify is connected, this will be replaced by Storefront API calls

export type Language = "en" | "es";

export type Poster = {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  category: string;
  price: number; // in USD
  logoUpgradePrice: number; // additional cost for logo customization
  sizes: string[];
  available: boolean;
  previewImage: string; // path to preview image in /public
  languages: Language[];
};

export const POSTERS: Poster[] = [
  {
    id: "surface-preparation",
    title: "Surface Preparation",
    titleEs: "Preparación de Superficies",
    description:
      "Step-by-step surface preparation process poster for metal plating operations. Covers cleaning, etching, rinsing, and pre-treatment sequences to ensure quality plating results.",
    descriptionEs:
      "Póster del proceso de preparación de superficies paso a paso para operaciones de galvanoplastia. Cubre limpieza, grabado, enjuague y secuencias de pretratamiento.",
    category: "Process",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"], // displayed as × but sent to Shopify as x via toShopifySize()
    available: true,
    previewImage: "/posters/surface-preparation-preview.jpg",
    languages: ["en", "es"],
  },
];

export function getPoster(id: string): Poster | undefined {
  return POSTERS.find((p) => p.id === id);
}

export function getAvailablePosters(): Poster[] {
  return POSTERS.filter((p) => p.available);
}
