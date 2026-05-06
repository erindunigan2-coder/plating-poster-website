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
  processId?: string; // catalog process slug — links poster to a category/process page
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
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/surface-preparation-preview.jpg",
    languages: ["en", "es"],
  },

  // ── Electroless Nickel Low Phosphorus Series ──────────────────────────────

  {
    id: "en-low-phos-demystified",
    title: "Electroless Nickel Demystified",
    titleEs: "Niquelado Electrolítico Sin Corriente",
    description:
      "The essential reference for electroless nickel plating. Covers the autocatalytic reaction, phosphorus grades (Low / Mid / High-P), key specifications (ASTM B733, AMS 2404/2405), hardness ranges, and application selection. Ideal for engineers, chemists, and lead operators.",
    descriptionEs:
      "Referencia esencial para el niquelado sin corriente. Cubre la reacción autocatalítica, grados de fósforo, especificaciones clave y selección de aplicaciones.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-demystified-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-process-flow",
    title: "EN Low Phos — Process Flow",
    titleEs: "EN Bajo Fósforo — Flujo del Proceso",
    description:
      "Visual map of all 7 stages in the Electroless Nickel Low Phosphorus process: Clean → Rinse → Activate → Critical Rinse → EN Bath → Final Rinse → Post Treatment. A must-have orientation poster for new operators and training programs.",
    descriptionEs:
      "Mapa visual de las 7 etapas del proceso de niquelado sin corriente de bajo fósforo. Póster de orientación esencial para operadores nuevos.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-process-flow-preview.jpg",
    languages: ["en", "es"],
  },
  {
    id: "en-low-phos-cleaning",
    title: "EN Low Phos — Stage 1: Cleaning",
    titleEs: "EN Bajo Fósforo — Etapa 1: Limpieza",
    description:
      "Critical parameters and common failure modes for the EN Low Phosphorus cleaning stage. Covers soak and electrocleaning, temperature (60–80 °C), break-free rinsing, and contamination traps that cause bath poisoning downstream.",
    descriptionEs:
      "Parámetros críticos y modos de falla para la etapa de limpieza. Cubre limpieza por inmersión y electrolítica, temperatura y trampas de contaminación.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-cleaning-preview.jpg",
    languages: ["en", "es"],
  },
  {
    id: "en-low-phos-rinse-pre-activation",
    title: "EN Low Phos — Stage 2: Rinse Pre-Activation",
    titleEs: "EN Bajo Fósforo — Etapa 2: Enjuague Pre-Activación",
    description:
      "Key Number: < 50 µS/cm. Controls cleaner carry-over before acid activation. Covers conductivity thresholds, dump criteria, and the contamination chain that leads to poor activation and skip plating.",
    descriptionEs:
      "Número clave: < 50 µS/cm. Controla el arrastre de limpiador antes de la activación ácida. Cubre umbrales de conductividad y criterios de descarga.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-rinse-pre-activation-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-activation",
    title: "EN Low Phos — Stage 3: Activation",
    titleEs: "EN Bajo Fósforo — Etapa 3: Activación",
    description:
      "Key Number: 30–120 seconds (HTS maximum 30 sec). Hydrochloric acid activation parameters, substrate-specific timing, high-tensile steel precautions, and the most common skip-plate root causes. Reviewed for technical accuracy by Dr. Elena Vasquez.",
    descriptionEs:
      "Número clave: 30–120 segundos (acero de alta resistencia: máximo 30 seg). Parámetros de activación con ácido clorhídrico y precauciones para acero de alta resistencia.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-activation-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-critical-rinse",
    title: "EN Low Phos — Stage 4: Critical Rinse",
    titleEs: "EN Bajo Fósforo — Etapa 4: Enjuague Crítico",
    description:
      "Key Number: < 20 µS/cm. The tightest rinse spec in the line — chloride carry-over here poisons the EN bath. Covers conductivity targets, dump criteria (> 500 µS/cm or pH > 10), and the direct link between rinse quality and bath MTO life.",
    descriptionEs:
      "Número clave: < 20 µS/cm. La especificación de enjuague más estricta de la línea. Cloruros arrastrados aquí envenenan el baño EN.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-critical-rinse-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-en-bath",
    title: "EN Low Phos — Stage 5: EN Bath",
    titleEs: "EN Bajo Fósforo — Etapa 5: Baño EN",
    description:
      "Key Number: 80–92 °C. Complete operating parameters for the Low Phosphorus EN bath: temperature, pH (8.5–9.5), nickel concentration (4.5–6.0 g/L), filtration rate, MTO life (6–8), and real-time diagnostic checks for operators.",
    descriptionEs:
      "Número clave: 80–92 °C. Parámetros completos del baño EN de bajo fósforo: temperatura, pH, concentración de níquel, filtración y vida útil del baño.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-en-bath-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-final-rinse",
    title: "EN Low Phos — Stage 6: Final Rinse",
    titleEs: "EN Bajo Fósforo — Etapa 6: Enjuague Final",
    description:
      "Key Number: < 10 seconds transfer time. Post-plate rinse requirements, nickel drag-out control, and the transfer window that determines whether parts air-dry with bath chemistry still active on the surface.",
    descriptionEs:
      "Número clave: < 10 segundos de tiempo de transferencia. Requisitos de enjuague post-enchapado y control del arrastre de níquel.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-final-rinse-preview.jpg",
    languages: ["en"],
  },
  {
    id: "en-low-phos-post-treatment",
    title: "EN Low Phos — Stage 7: Post Treatment",
    titleEs: "EN Bajo Fósforo — Etapa 7: Tratamiento Final",
    description:
      "Key Number: 190–210 °C / 4 hours minimum. Hydrogen embrittlement relief baking per ASTM B849 and AMS 2404, age hardening to reach 1000–1100 HV, aluminum substrate temperature limits, and the 4-hour post-plate baking window.",
    descriptionEs:
      "Número clave: 190–210 °C / mínimo 4 horas. Recocido de alivio de fragilización por hidrógeno y endurecimiento por envejecimiento.",
    category: "Electroless Nickel",
    processId: "electroless-nickel-low-phosphorus",
    price: 75,
    logoUpgradePrice: 35,
    sizes: ["18×24", "24×36", "36×48"],
    available: true,
    previewImage: "/posters/en-low-phos-post-treatment-preview.jpg",
    languages: ["en"],
  },
];

export function getPoster(id: string): Poster | undefined {
  return POSTERS.find((p) => p.id === id);
}

export function getAvailablePosters(): Poster[] {
  return POSTERS.filter((p) => p.available);
}

export function getPostersByProcess(processId: string): Poster[] {
  return POSTERS.filter((p) => p.available && p.processId === processId);
}
