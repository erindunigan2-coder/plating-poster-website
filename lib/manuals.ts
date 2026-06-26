/**
 * Training Manuals — a higher-value product line derived from the finished poster series.
 * Sold digital-first (PDF). Server-side pricing lives here (validated in lib/stripe.ts).
 */

export type Manual = {
  id: string;                 // e.g. "bright-nickel-manual"
  title: string;
  titleEs: string;
  seriesId: string;           // poster-id prefix this manual covers, for cart cross-sell (e.g. "bright-nickel")
  seriesLabel: string;        // "Bright Nickel"
  tagline: string;
  description: string;
  descriptionEs: string;
  pages: number;
  priceDigital: number;       // digital PDF download (USD) — lower
  pricePrint: number;         // printed, coil-bound hard copy, shipped (USD) — higher
  languages: ("en" | "es")[];
  coverImage: string;         // EN cover
  coverImageEs: string;       // ES cover
  highlights: string[];       // "what's inside" bullets
  available: boolean;
};

export const MANUALS: Manual[] = [
  {
    id: "bright-nickel-manual",
    title: "Bright Nickel — The Complete Training Manual",
    titleEs: "Níquel Brillante — El Manual de Capacitación Completo",
    seriesId: "bright-nickel",
    seriesLabel: "Bright Nickel",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 47-page, plain-language training manual for the entire bright nickel plating line — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Covers every station from cleaning to post-treatment with the “why” behind each step, integrated safety, teach-back checklists, and common new-hire mistakes. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 47 páginas, en lenguaje sencillo, para toda la línea de recubrimiento de níquel brillante — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Cubre cada estación, desde la limpieza hasta el post-tratamiento, con el “por qué” de cada paso, seguridad integrada, listas de verificación y los errores comunes de los nuevos operadores. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 47,
    priceDigital: 249,
    pricePrint: 349,
    languages: ["en", "es"],
    coverImage: "/manuals/bright-nickel-manual-cover.jpg",
    coverImageEs: "/manuals/bright-nickel-manual-cover-es.jpg",
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "All 7 stations: cleaning → rinse → acid activation → plating → post-treatment",
      "The “why” behind every parameter, not just the numbers",
      "Safety integrated into every station (PPE, nickel dermatitis, acids, hex-chrome)",
      "Teach-back checklists + “top mistakes new operators make”",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
];

export type ManualFormat = "digital" | "print";

export function getManual(id: string): Manual | undefined {
  return MANUALS.find((m) => m.id === id);
}

export function getManualPrice(manualId: string, format: ManualFormat): number | null {
  const m = getManual(manualId);
  if (!m) return null;
  return format === "print" ? m.pricePrint : m.priceDigital;
}

export function getAvailableManuals(): Manual[] {
  return MANUALS.filter((m) => m.available);
}

/** Cross-sell: given a poster id (e.g. "bright-nickel-plating" or "bright-nickel-sf-cleaning"),
 *  return the matching training manual, if one exists. */
export function getManualForPoster(posterId: string): Manual | undefined {
  return MANUALS.find((m) => m.available && posterId.startsWith(m.seriesId + "-"));
}
