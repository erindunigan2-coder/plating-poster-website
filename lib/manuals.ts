/**
 * Training Manuals — a higher-value product line derived from the finished poster series.
 * Sold digital-first (PDF). Server-side pricing lives here (validated in lib/stripe.ts).
 */

export type Manual = {
  id: string;                 // e.g. "bright-nickel-manual"
  title: string;
  titleEs: string;
  seriesId: string;           // primary poster-id prefix this manual covers, for cart cross-sell (e.g. "bright-nickel")
  posterPrefixes?: string[];  // extra poster-id prefixes that should cross-sell this manual (poster naming isn't always seriesId)
  seriesLabel: string;        // "Bright Nickel"
  tagline: string;
  description: string;
  descriptionEs: string;
  pages: number;
  priceDigital: number;       // digital PDF download (USD) — lowest
  pricePrint: number;         // printed, coil-bound hard copy, shipped (USD)
  priceCombo: number;         // printed hard copy + digital PDF (USD)
  printVolumeTiers: { min: number; price: number }[]; // per-unit print price at quantity breaks (desc by min)
  languages: ("en" | "es")[];
  coverImage: string;         // EN cover
  coverImageEs: string;       // ES cover
  samplePages: string[];      // "Look Inside" preview page images (real interior pages)
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
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/bright-nickel-manual-cover.jpg",
    coverImageEs: "/manuals/bright-nickel-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/bright-nickel-manual-p1.jpg",
      "/manuals/samples/bright-nickel-manual-p2.jpg",
      "/manuals/samples/bright-nickel-manual-p3.jpg",
      "/manuals/samples/bright-nickel-manual-p4.jpg",
      "/manuals/samples/bright-nickel-manual-p5.jpg",
      "/manuals/samples/bright-nickel-manual-p6.jpg",
    ],
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
  {
    id: "acid-zinc-manual",
    title: "Acid Zinc — The Complete Training Manual",
    titleEs: "Zinc Ácido — El Manual de Capacitación Completo",
    seriesId: "acid-zinc",
    seriesLabel: "Acid Zinc",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 46-page, plain-language training manual for the entire acid zinc plating line — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Covers every station from cleaning through trivalent-chromate passivation, with the “why” behind each step, integrated safety, teach-back checklists, and common new-hire mistakes. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 46 páginas, en lenguaje sencillo, para toda la línea de recubrimiento de zinc ácido — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Cubre cada estación, desde la limpieza hasta el pasivado con cromato trivalente, con el “por qué” de cada paso, seguridad integrada, listas de verificación y los errores comunes de los nuevos operadores. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 46,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/acid-zinc-manual-cover.jpg",
    coverImageEs: "/manuals/acid-zinc-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/acid-zinc-manual-p1.jpg",
      "/manuals/samples/acid-zinc-manual-p2.jpg",
      "/manuals/samples/acid-zinc-manual-p3.jpg",
      "/manuals/samples/acid-zinc-manual-p4.jpg",
      "/manuals/samples/acid-zinc-manual-p5.jpg",
      "/manuals/samples/acid-zinc-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "All 8 stations: cleaning → rinse → acid activation → acid zinc → trivalent-chromate passivation",
      "The “why” behind every parameter, not just the numbers",
      "Safety integrated into every station (PPE, acids, chromate post-treatment)",
      "Teach-back checklists + “top mistakes new operators make”",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "alkaline-zinc-manual",
    title: "Alkaline Zinc — The Complete Training Manual",
    titleEs: "Zinc Alcalino — El Manual de Capacitación Completo",
    seriesId: "alkaline-zinc",
    posterPrefixes: ["zinc-alkaline"],
    seriesLabel: "Alkaline Zinc",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 50-page, plain-language training manual for the entire modern cyanide-free alkaline (zincate) zinc line — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Covers every station from cleaning through trivalent-chromate passivation, the steel-anode/zinc-dissolver setup, throwing power, and the hydrogen-embrittlement bake — with the “why” behind each step, integrated safety, teach-back checklists, and common new-hire mistakes. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 50 páginas, en lenguaje sencillo, para toda la línea moderna de zinc alcalino (zincato) sin cianuro — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Cubre cada estación, desde la limpieza hasta el pasivado con cromato trivalente, la configuración de ánodos de acero/disolvedor de zinc, el poder de penetración y el horneado contra la fragilización por hidrógeno — con el “por qué” de cada paso, seguridad integrada, listas de verificación y los errores comunes de los nuevos operadores. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 50,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/alkaline-zinc-manual-cover.jpg",
    coverImageEs: "/manuals/alkaline-zinc-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/alkaline-zinc-manual-p1.jpg",
      "/manuals/samples/alkaline-zinc-manual-p2.jpg",
      "/manuals/samples/alkaline-zinc-manual-p3.jpg",
      "/manuals/samples/alkaline-zinc-manual-p4.jpg",
      "/manuals/samples/alkaline-zinc-manual-p5.jpg",
      "/manuals/samples/alkaline-zinc-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "All 9 stations: cleaning → rinse → acid activation → alkaline zinc → bright dip → trivalent-chromate passivation",
      "Why alkaline beats acid zinc on throwing power, distribution, and ductility",
      "Steel anodes + separate zinc dissolver, NaOH:Zn ratio, and bath control explained",
      "Safety integrated into every station (caustic burns, hydrogen embrittlement + bake, chromate)",
      "Teach-back checklists + “top mistakes new operators make”",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "zinc-nickel-manual",
    title: "Zinc-Nickel — The Complete Training Manual",
    titleEs: "Zinc-Níquel — El Manual de Capacitación Completo",
    seriesId: "zinc-nickel",
    seriesLabel: "Zinc-Nickel",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 60-page, plain-language training manual for the entire alkaline zinc-nickel alloy line (12–16% Ni) — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Covers every station from cleaning through trivalent-chromate passivation and sealing, the inert-anode/separate-nickel-feed setup, anomalous codeposition and alloy-composition control, salt-spray performance, and the hydrogen-embrittlement bake — with the “why” behind each step, integrated safety, teach-back checklists, and common new-hire mistakes. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 60 páginas, en lenguaje sencillo, para toda la línea de aleación de zinc-níquel alcalino (12–16% Ni) — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Cubre cada estación, desde la limpieza hasta el pasivado con cromato trivalente y el sellado, la configuración de ánodos inertes/alimentación de níquel, la codeposición anómala y el control de la composición de la aleación, el desempeño en niebla salina y el horneado contra la fragilización por hidrógeno — con el “por qué” de cada paso, seguridad integrada, listas de verificación y los errores comunes de los nuevos operadores. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 60,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/zinc-nickel-manual-cover.jpg",
    coverImageEs: "/manuals/zinc-nickel-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/zinc-nickel-manual-p1.jpg",
      "/manuals/samples/zinc-nickel-manual-p2.jpg",
      "/manuals/samples/zinc-nickel-manual-p3.jpg",
      "/manuals/samples/zinc-nickel-manual-p4.jpg",
      "/manuals/samples/zinc-nickel-manual-p5.jpg",
      "/manuals/samples/zinc-nickel-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "All 9 stations: cleaning → activation → zinc-nickel alloy plate → activation → trivalent-chromate passivation → seal",
      "Why 12–16% Ni is the corrosion-resistance sweet spot — and how to control it",
      "Anomalous codeposition, inert anodes + separate nickel feed / membrane cell explained",
      "Best-in-class corrosion performance (salt spray) with passivate + sealer",
      "Safety integrated into every station (caustic, nickel/amine exposure, hydrogen embrittlement + bake, chromate)",
      "Teach-back checklists + “top mistakes new operators make”",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
];

export type ManualFormat = "digital" | "print" | "combo";

export function getManual(id: string): Manual | undefined {
  return MANUALS.find((m) => m.id === id);
}

/** Per-unit price for a format at a given quantity (print has volume tiers). */
export function manualUnitPrice(m: Manual, format: ManualFormat, quantity = 1): number {
  if (format === "digital") return m.priceDigital;
  if (format === "combo") return m.priceCombo;
  const q = Math.max(1, Math.floor(quantity || 1));
  for (const t of m.printVolumeTiers) {
    if (q >= t.min) return t.price;
  }
  return m.pricePrint;
}

/** Formats that include the digital PDF download (entitle a download). */
export function formatIncludesDigital(format: ManualFormat): boolean {
  return format === "digital" || format === "combo";
}

/** Formats that ship a physical copy. */
export function formatIsPhysical(format: ManualFormat): boolean {
  return format === "print" || format === "combo";
}

export function getAvailableManuals(): Manual[] {
  return MANUALS.filter((m) => m.available);
}

/** All poster-id prefixes that should associate with this manual (primary seriesId + any extras). */
export function manualPosterPrefixes(m: Manual): string[] {
  return [m.seriesId, ...(m.posterPrefixes ?? [])];
}

/** Cross-sell: given a poster id (e.g. "bright-nickel-plating" or "bright-nickel-sf-cleaning"),
 *  return the matching training manual, if one exists. */
export function getManualForPoster(posterId: string): Manual | undefined {
  return MANUALS.find(
    (m) => m.available && manualPosterPrefixes(m).some((p) => posterId === p || posterId.startsWith(p + "-"))
  );
}
