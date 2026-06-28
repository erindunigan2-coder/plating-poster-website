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
  {
    id: "hard-chrome-manual",
    title: "Hard Chrome — The Complete Training Manual",
    titleEs: "Cromo Duro — El Manual de Capacitación Completo",
    seriesId: "hard-chrome",
    posterPrefixes: ["chrome-hard"],
    seriesLabel: "Hard Chrome",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 46-page, plain-language training manual for functional (industrial) hard chromium plating from hexavalent chromic acid — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Covers every station from racking/masking and cleaning through the high-current-density chrome tank, hydrogen-embrittlement bake, and grinding to size — with the “why” behind each step, ampere-hour thickness control, conforming anodes and throwing power, and Cr(VI) waste treatment. Safety is front and center: this is the most hazardous process in the line, so hexavalent-chromium hazard control (mist suppression, ventilation, OSHA Cr VI rule, respiratory protection) is integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 46 páginas, en lenguaje sencillo, para el cromado duro funcional (industrial) a partir de ácido crómico hexavalente — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Cubre cada estación, desde el montaje/enmascarado y la limpieza hasta el tanque de cromo de alta densidad de corriente, el horneado contra la fragilización por hidrógeno y el rectificado a la medida — con el “por qué” de cada paso, el control de espesor por amperios-hora, los ánodos conformados y el poder de penetración, y el tratamiento de residuos de Cr(VI). La seguridad es primordial: este es el proceso más peligroso de la línea, así que el control del peligro del cromo hexavalente (supresión de niebla, ventilación, norma de Cr VI de OSHA, protección respiratoria) está integrado en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
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
    coverImage: "/manuals/hard-chrome-manual-cover.jpg",
    coverImageEs: "/manuals/hard-chrome-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/hard-chrome-manual-p1.jpg",
      "/manuals/samples/hard-chrome-manual-p2.jpg",
      "/manuals/samples/hard-chrome-manual-p3.jpg",
      "/manuals/samples/hard-chrome-manual-p4.jpg",
      "/manuals/samples/hard-chrome-manual-p5.jpg",
      "/manuals/samples/hard-chrome-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "Full functional hard-chrome workflow: rack/mask → clean → anodic etch → chrome plate → bake → grind to size",
      "Ampere-hour thickness control, conforming anodes, robbers, and throwing power explained",
      "Why hard chrome is a thick, hard, low-friction FUNCTIONAL deposit (wear/salvage), not decorative",
      "Hexavalent-chromium (Cr VI) safety integrated into every station — the most hazardous process in the line",
      "Hydrogen embrittlement + mandatory bake, microcracked structure, Cr(VI) waste treatment",
      "Teach-back checklists + “top mistakes new operators make”",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "decorative-chrome-manual",
    title: "Decorative Chrome — The Complete Training Manual",
    titleEs: "Cromo Decorativo — El Manual de Capacitación Completo",
    seriesId: "decorative-chrome",
    posterPrefixes: ["dec-chrome", "chrome-decorative"],
    seriesLabel: "Decorative Chrome",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 47-page, plain-language training manual for the bright, mirror decorative chrome finish on a nickel undercoat — covering BOTH traditional hexavalent and modern trivalent chrome — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Teaches the whole line: cleaning, the all-important semi-bright/bright (duplex) nickel undercoat that does the real corrosion protection, the thin micro-discontinuous chrome cap, throwing power and coverage, and quality checks (CASS, salt spray, STEP). Safety is integrated into every station — including full hexavalent-chromium (Cr VI) hazard control where the shop runs hex chrome. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 47 páginas, en lenguaje sencillo, para el acabado de cromo decorativo brillante tipo espejo sobre una capa base de níquel — que cubre TANTO el cromo hexavalente tradicional COMO el cromo trivalente moderno — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Enseña toda la línea: limpieza, la fundamental capa base de níquel semibrillante/brillante (dúplex) que hace el verdadero trabajo contra la corrosión, la delgada capa de cromo micro-discontinuo, el poder de penetración y la cobertura, y los controles de calidad (CASS, niebla salina, STEP). La seguridad está integrada en cada estación — incluido el control completo del peligro del cromo hexavalente (Cr VI) donde el taller usa cromo hexavalente. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
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
    coverImage: "/manuals/decorative-chrome-manual-cover.jpg",
    coverImageEs: "/manuals/decorative-chrome-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/decorative-chrome-manual-p1.jpg",
      "/manuals/samples/decorative-chrome-manual-p2.jpg",
      "/manuals/samples/decorative-chrome-manual-p3.jpg",
      "/manuals/samples/decorative-chrome-manual-p4.jpg",
      "/manuals/samples/decorative-chrome-manual-p5.jpg",
      "/manuals/samples/decorative-chrome-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals primer — what plating is and how the line works",
      "Both hexavalent AND trivalent decorative chrome covered",
      "The duplex/triplex nickel undercoat that does the real corrosion protection",
      "Micro-discontinuous (microcracked/microporous) chrome — why cracking the top coat helps",
      "Throwing power, coverage, auxiliary anodes, and appearance control",
      "Decorative vs hard chrome — thin bright cap vs thick functional deposit",
      "Cr VI safety integrated where hex chrome is run (OSHA 1910.1026); nickel/boric cautions",
      "Quality checks: CASS, salt spray, STEP, adhesion",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "en-low-phos-manual",
    title: "Electroless Nickel (Low Phosphorus) — The Complete Training Manual",
    titleEs: "Níquel Químico (Bajo Fósforo) — El Manual de Capacitación Completo",
    seriesId: "en-low-phos",
    seriesLabel: "Electroless Nickel — Low Phosphorus",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 49-page, plain-language training manual for low-phosphorus electroless nickel (Low-P EN, ~2–5% P) — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Because electroless plating is autocatalytic (NO electric current, no anodes), the fundamentals are re-taught from scratch: how a hot ~90°C bath deposits a perfectly uniform Ni-P alloy on every surface, including bores and blind holes. Covers bath chemistry control (metal turnovers / MTO, replenishment, stabilizers, avoiding decomposition), the hardness/wear/alkaline-service profile of Low-P, heat treatment for hardness vs. hydrogen-embrittlement relief baking, and how Low-P differs from Mid-P and High-P. Safety is integrated into every station — the near-boiling bath and decomposition/phosphine hazard are front and center. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 49 páginas, en lenguaje sencillo, para el níquel químico de bajo fósforo (Bajo-P, ~2–5% P) — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. Como el recubrimiento químico es autocatalítico (SIN corriente eléctrica, sin ánodos), los fundamentos se enseñan desde cero: cómo un baño caliente a ~90°C deposita una aleación Ni-P perfectamente uniforme en cada superficie, incluso en barrenos y agujeros ciegos. Cubre el control de la química del baño (recambios metálicos / MTO, reposición, estabilizadores, evitar la descomposición), el perfil de dureza/desgaste/servicio alcalino del Bajo-P, el tratamiento térmico para dureza frente al horneado de alivio de fragilización por hidrógeno, y cómo el Bajo-P difiere del Medio-P y el Alto-P. La seguridad está integrada en cada estación — el baño casi en ebullición y el peligro de descomposición/fosfina son lo primero. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 49,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/en-low-phos-manual-cover.jpg",
    coverImageEs: "/manuals/en-low-phos-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/en-low-phos-manual-p1.jpg",
      "/manuals/samples/en-low-phos-manual-p2.jpg",
      "/manuals/samples/en-low-phos-manual-p3.jpg",
      "/manuals/samples/en-low-phos-manual-p4.jpg",
      "/manuals/samples/en-low-phos-manual-p5.jpg",
      "/manuals/samples/en-low-phos-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — electroless (autocatalytic) plating with NO current, re-taught from scratch",
      "Why Ni-P plates perfectly uniform on every surface — bores, blind holes, complex shapes",
      "Low-P identity: high hardness/wear resistance and alkaline-service strength (~2–5% P)",
      "Bath chemistry control: metal turnovers (MTO), replenishment, stabilizers, avoiding decomposition",
      "Heat treatment for hardness vs. hydrogen-embrittlement relief baking — both explained",
      "How Low-P differs from Mid-P and High-P (and when to choose each)",
      "Safety integrated into every station — near-boiling bath, decomposition/phosphine hazard",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "en-mid-phos-manual",
    title: "Electroless Nickel (Mid Phosphorus) — The Complete Training Manual",
    titleEs: "Níquel Químico (Fósforo Medio) — El Manual de Capacitación Completo",
    seriesId: "en-mid-phos",
    seriesLabel: "Electroless Nickel — Mid Phosphorus",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 49-page, plain-language training manual for mid-phosphorus electroless nickel (Mid-P EN, ~6–9% P) — the workhorse, general-purpose, most widely used grade. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the electroless (autocatalytic, NO electric current) fundamentals: how a hot ~90°C bath lays down a perfectly uniform Ni-P alloy on every surface, including bores and blind holes. Covers bath chemistry control (metal turnovers / MTO, replenishment, stabilizers, avoiding decomposition), the balanced corrosion-plus-hardness profile and fastest deposition rate of Mid-P, heat treatment for hardness vs. hydrogen-embrittlement relief baking, and how Mid-P sits between Low-P and High-P. Safety is integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 49 páginas, en lenguaje sencillo, para el níquel químico de fósforo medio (Medio-P, ~6–9% P) — el grado caballito de batalla, de propósito general y el más utilizado. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del recubrimiento químico (autocatalítico, SIN corriente eléctrica): cómo un baño caliente a ~90°C deposita una aleación Ni-P perfectamente uniforme en cada superficie, incluso en barrenos y agujeros ciegos. Cubre el control de la química del baño (recambios metálicos / MTO, reposición, estabilizadores, evitar la descomposición), el perfil balanceado de corrosión y dureza y la tasa de depósito más rápida del Medio-P, el tratamiento térmico para dureza frente al horneado de alivio de fragilización por hidrógeno, y cómo el Medio-P se ubica entre el Bajo-P y el Alto-P. La seguridad está integrada en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 49,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/en-mid-phos-manual-cover.jpg",
    coverImageEs: "/manuals/en-mid-phos-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/en-mid-phos-manual-p1.jpg",
      "/manuals/samples/en-mid-phos-manual-p2.jpg",
      "/manuals/samples/en-mid-phos-manual-p3.jpg",
      "/manuals/samples/en-mid-phos-manual-p4.jpg",
      "/manuals/samples/en-mid-phos-manual-p5.jpg",
      "/manuals/samples/en-mid-phos-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — electroless (autocatalytic) plating with NO current, re-taught from scratch",
      "Why Ni-P plates perfectly uniform on every surface — bores, blind holes, complex shapes",
      "Mid-P identity: the balanced, general-purpose workhorse — good corrosion AND hardness, fastest deposition",
      "Bath chemistry control: metal turnovers (MTO), replenishment, stabilizers, avoiding decomposition",
      "Heat treatment for hardness vs. hydrogen-embrittlement relief baking — both explained",
      "How Mid-P sits between Low-P and High-P (and when to choose each)",
      "Safety integrated into every station — near-boiling bath, decomposition/phosphine hazard",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "en-high-phos-manual",
    title: "Electroless Nickel (High Phosphorus) — The Complete Training Manual",
    titleEs: "Níquel Químico (Fósforo Alto) — El Manual de Capacitación Completo",
    seriesId: "en-high-phos",
    seriesLabel: "Electroless Nickel — High Phosphorus",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 49-page, plain-language training manual for high-phosphorus electroless nickel (High-P EN, ~10–13% P) — the maximum corrosion-resistance grade, and the choice when a part must survive acid, salt, chloride, marine, or harsh chemical service, or must be non-magnetic. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the electroless (autocatalytic, NO electric current) fundamentals: how a hot ~90°C bath lays down a perfectly uniform, near-amorphous Ni-P alloy on every surface. Covers bath chemistry control (metal turnovers / MTO, replenishment, stabilizers, avoiding decomposition), the corrosion/non-magnetic profile of High-P, and — critically — the heat-treatment tradeoff (baking for hardness crystallizes the amorphous structure and sacrifices corrosion resistance, so High-P is usually used as-plated). Safety is integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 49 páginas, en lenguaje sencillo, para el níquel químico de fósforo alto (Alto-P, ~10–13% P) — el grado de máxima resistencia a la corrosión, y la elección cuando una pieza debe sobrevivir al ácido, la sal, el cloruro, el ambiente marino o un servicio químico severo, o debe ser no magnética. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del recubrimiento químico (autocatalítico, SIN corriente eléctrica): cómo un baño caliente a ~90°C deposita una aleación Ni-P casi amorfa y perfectamente uniforme en cada superficie. Cubre el control de la química del baño (recambios metálicos / MTO, reposición, estabilizadores, evitar la descomposición), el perfil de corrosión/no magnético del Alto-P y — de forma crítica — el compromiso del tratamiento térmico (hornear para dureza cristaliza la estructura amorfa y sacrifica la resistencia a la corrosión, por eso el Alto-P normalmente se usa tal como se deposita). La seguridad está integrada en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 49,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/en-high-phos-manual-cover.jpg",
    coverImageEs: "/manuals/en-high-phos-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/en-high-phos-manual-p1.jpg",
      "/manuals/samples/en-high-phos-manual-p2.jpg",
      "/manuals/samples/en-high-phos-manual-p3.jpg",
      "/manuals/samples/en-high-phos-manual-p4.jpg",
      "/manuals/samples/en-high-phos-manual-p5.jpg",
      "/manuals/samples/en-high-phos-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — electroless (autocatalytic) plating with NO current, re-taught from scratch",
      "Why Ni-P plates perfectly uniform on every surface — bores, blind holes, complex shapes",
      "High-P identity: maximum corrosion resistance, near-amorphous, non-magnetic (~10–13% P)",
      "The heat-treatment tradeoff — baking for hardness sacrifices corrosion resistance (use as-plated)",
      "Bath chemistry control: metal turnovers (MTO), replenishment, stabilizers, avoiding decomposition",
      "How High-P differs from Low-P and Mid-P (and when to choose each)",
      "Safety integrated into every station — near-boiling bath, decomposition/phosphine hazard",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-type-ii-manual",
    title: "Sulfuric Acid Anodizing (Type II) — The Complete Training Manual",
    titleEs: "Anodizado con Ácido Sulfúrico (Tipo II) — El Manual de Capacitación Completo",
    seriesId: "anodize-type-ii",
    seriesLabel: "Sulfuric Anodizing (Type II)",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 40-page, plain-language training manual for standard sulfuric acid (Type II) anodizing of aluminum — written in a friendly, “for-dummies” style that assumes zero prior knowledge. Anodizing is a different animal from plating: the part is the ANODE and you GROW a hard, integral aluminum-oxide layer out of the metal itself, rather than depositing a metal onto it. Covers the whole line — clean, etch, desmut, anodize, dye, and seal — with the “why” behind each step: the porous-oxide structure, dyeing into the pores and sealing them shut, dimensional growth (the coating grows ~half in and ~half out), racking and electrical contact, bath cooling, and aluminum-alloy effects. Safety is integrated into every station (sulfuric acid, caustic etch, hydrogen at the cathode, near-boiling seal tanks). Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 40 páginas, en lenguaje sencillo, para el anodizado estándar con ácido sulfúrico (Tipo II) del aluminio — escrito en un estilo amigable “para principiantes” que no asume conocimientos previos. El anodizado es distinto del recubrimiento: la pieza es el ÁNODO y se HACE CRECER una capa dura e integral de óxido de aluminio a partir del propio metal, en lugar de depositar un metal sobre él. Cubre toda la línea — limpiar, grabar, desmanchar, anodizar, teñir y sellar — con el “por qué” de cada paso: la estructura de óxido poroso, el teñido dentro de los poros y su sellado, el crecimiento dimensional (la capa crece ~mitad adentro y ~mitad afuera), el montaje y el contacto eléctrico, el enfriamiento del baño y los efectos de la aleación de aluminio. La seguridad está integrada en cada estación (ácido sulfúrico, grabado cáustico, hidrógeno en el cátodo, tanques de sellado casi en ebullición). Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 40,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-type-ii-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-type-ii-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-type-ii-manual-p1.jpg",
      "/manuals/samples/anodize-type-ii-manual-p2.jpg",
      "/manuals/samples/anodize-type-ii-manual-p3.jpg",
      "/manuals/samples/anodize-type-ii-manual-p4.jpg",
      "/manuals/samples/anodize-type-ii-manual-p5.jpg",
      "/manuals/samples/anodize-type-ii-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "The whole line: clean → etch → desmut → anodize → dye → seal",
      "Porous-oxide structure, dyeing into the pores, and sealing them shut",
      "Dimensional growth — the coating grows ~half in and ~half out (tolerances & masking)",
      "Racking & electrical contact, bath cooling, and aluminum-alloy effects",
      "Where Type II sits in the family (vs Type I chromic and Type III hardcoat)",
      "Safety integrated into every station (sulfuric acid, caustic etch, cathode hydrogen, hot seal)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-type-iii-manual",
    title: "Hardcoat Anodizing (Type III) — The Complete Training Manual",
    titleEs: "Anodizado Duro (Tipo III) — El Manual de Capacitación Completo",
    seriesId: "anodize-type-iii",
    seriesLabel: "Hardcoat Anodizing (Type III)",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 40-page, plain-language training manual for hardcoat (Type III) anodizing of aluminum — the thick, hard, wear-resistant engineering anodize. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW a dense oxide out of the aluminum) and then makes Type III specific: a cold bath (~ -5 to +10 °C) and higher ramped voltage/current density grow a much thicker, harder coating (~25–100+ µm). Covers the seal-vs-wear tradeoff (sealing improves corrosion but reduces abrasion resistance, so hardcoat for wear is often left unsealed), the large dimensional growth and what it means for tolerances and masking, aluminum-alloy effects (which alloys hardcoat well and which “burn”), and aggressive bath cooling. Safety integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 40 páginas, en lenguaje sencillo, para el anodizado duro (Tipo III) del aluminio — el anodizado de ingeniería grueso, duro y resistente al desgaste. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido denso a partir del aluminio) y luego lo hace específico del Tipo III: un baño frío (~ -5 a +10 °C) y mayor voltaje/densidad de corriente en rampa hacen crecer una capa mucho más gruesa y dura (~25–100+ µm). Cubre el compromiso sellado-vs-desgaste (sellar mejora la corrosión pero reduce la resistencia a la abrasión, por eso el anodizado duro para desgaste suele dejarse sin sellar), el gran crecimiento dimensional y lo que significa para tolerancias y enmascarado, los efectos de la aleación de aluminio (cuáles anodizan bien y cuáles se “queman”) y el enfriamiento agresivo del baño. La seguridad está integrada en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 40,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-type-iii-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-type-iii-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-type-iii-manual-p1.jpg",
      "/manuals/samples/anodize-type-iii-manual-p2.jpg",
      "/manuals/samples/anodize-type-iii-manual-p3.jpg",
      "/manuals/samples/anodize-type-iii-manual-p4.jpg",
      "/manuals/samples/anodize-type-iii-manual-p5.jpg",
      "/manuals/samples/anodize-type-iii-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "Type III hardcoat: thick, hard, wear/abrasion-resistant engineering coating (~25–100+ µm)",
      "Why a COLD bath + higher voltage/current density makes the coating dense and hard",
      "The seal-vs-wear tradeoff — sealing helps corrosion but reduces abrasion (often left unsealed)",
      "Big dimensional growth — what it means for tolerances and masking",
      "Aluminum-alloy effects — which alloys hardcoat well and which “burn”",
      "Where Type III sits in the family (vs Type I chromic and Type II standard)",
      "Safety integrated into every station (cold high-power bath, sulfuric acid, hydrogen, hot seal)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-type-i-manual",
    title: "Chromic Acid Anodizing (Type I) — The Complete Training Manual",
    titleEs: "Anodizado con Ácido Crómico (Tipo I) — El Manual de Capacitación Completo",
    seriesId: "anodize-type-i",
    seriesLabel: "Chromic Acid Anodizing (Type I)",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 46-page, plain-language training manual for chromic acid (Type I) anodizing of aluminum — the thin, gray, corrosion-protecting aerospace anodize. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then makes Type I specific: a chromic-acid electrolyte and a stepped low voltage build a very thin coating (~0.5–7.5 µm) with minimal dimensional change. Explains why aerospace specifies it — it does NOT reduce the fatigue strength of the aluminum, any trapped electrolyte in crevices and assemblies is far less corrosive than sulfuric, and it makes an excellent paint/adhesive base. Because the bath is hexavalent chromium (a confirmed carcinogen), Cr VI hazard control is integrated into every station (OSHA 1910.1026, mist control, respiratory protection, Cr⁶⁺→Cr³⁺ waste treatment). Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 46 páginas, en lenguaje sencillo, para el anodizado con ácido crómico (Tipo I) del aluminio — el anodizado aeroespacial delgado, gris y protector contra la corrosión. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego lo hace específico del Tipo I: un electrolito de ácido crómico y un voltaje bajo escalonado forman una capa muy delgada (~0.5–7.5 µm) con cambio dimensional mínimo. Explica por qué la industria aeroespacial lo especifica — NO reduce la resistencia a la fatiga del aluminio, cualquier electrolito atrapado en intersticios y ensambles es mucho menos corrosivo que el sulfúrico, y es una excelente base para pintura/adhesivo. Como el baño es cromo hexavalente (un cancerígeno confirmado), el control del peligro de Cr VI está integrado en cada estación (OSHA 1910.1026, control de niebla, protección respiratoria, tratamiento de residuos Cr⁶⁺→Cr³⁺). Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
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
    coverImage: "/manuals/anodize-type-i-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-type-i-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-type-i-manual-p1.jpg",
      "/manuals/samples/anodize-type-i-manual-p2.jpg",
      "/manuals/samples/anodize-type-i-manual-p3.jpg",
      "/manuals/samples/anodize-type-i-manual-p4.jpg",
      "/manuals/samples/anodize-type-i-manual-p5.jpg",
      "/manuals/samples/anodize-type-i-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "Type I chromic: thin, gray, corrosion-protecting aerospace anodize (~0.5–7.5 µm)",
      "Why aerospace specifies it — preserves fatigue strength; safe in crevices/assemblies; great paint base",
      "Stepped low-voltage chromic-acid process and minimal dimensional change",
      "Cr VI safety integrated into every station (OSHA 1910.1026, mist control, respirators, waste treatment)",
      "MIL-A-8625 Type I / IB / IC and the BSAA/TSA hex-chrome-reduction trend",
      "Where Type I sits in the family (vs Type II standard and Type III hardcoat)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-bsaa-manual",
    title: "Boric-Sulfuric Acid Anodizing (BSAA) — The Complete Training Manual",
    titleEs: "Anodizado Bórico-Sulfúrico (BSAA) — El Manual de Capacitación Completo",
    seriesId: "anodize-bsaa",
    seriesLabel: "Boric-Sulfuric Anodizing (BSAA)",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 44-page, plain-language training manual for boric-sulfuric acid anodizing (BSAA) — the chromium-free aerospace anodize that replaced chromic-acid (Type I) anodizing. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then makes BSAA specific: a boric + (low) sulfuric electrolyte run at low voltage builds a thin coating (~2–7 µm) that's an excellent paint/primer base and is friendly to fatigue-critical aluminum. The big story is safety: BSAA contains NO hexavalent chromium, so it removes the Cr VI carcinogen hazard of chromic anodizing — but it isn't hazard-free (acids, caustic etch, hydrogen, hot seal, DC), and the seal choice matters (a dichromate seal would reintroduce Cr VI; trivalent/non-chromate seals keep it chrome-free). Covers MIL-PRF-8625 Type IC, paint-adhesion and fatigue advantages, and waste handling. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 44 páginas, en lenguaje sencillo, para el anodizado bórico-sulfúrico (BSAA) — el anodizado aeroespacial sin cromo que reemplazó al anodizado con ácido crómico (Tipo I). Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego lo hace específico del BSAA: un electrolito de ácido bórico + sulfúrico (bajo) operado a bajo voltaje forma una capa delgada (~2–7 µm) que es una excelente base para pintura/imprimación y es favorable al aluminio crítico por fatiga. Lo principal es la seguridad: el BSAA NO contiene cromo hexavalente, así que elimina el peligro cancerígeno de Cr VI del anodizado crómico — pero no está libre de peligros (ácidos, grabado cáustico, hidrógeno, sellado caliente, CD), y la elección del sellado importa (un sellado con dicromato reintroduciría Cr VI; los sellos trivalentes/sin cromato lo mantienen libre de cromo). Cubre MIL-PRF-8625 Tipo IC, las ventajas de adhesión de pintura y fatiga, y el manejo de residuos. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 44,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-bsaa-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-bsaa-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-bsaa-manual-p1.jpg",
      "/manuals/samples/anodize-bsaa-manual-p2.jpg",
      "/manuals/samples/anodize-bsaa-manual-p3.jpg",
      "/manuals/samples/anodize-bsaa-manual-p4.jpg",
      "/manuals/samples/anodize-bsaa-manual-p5.jpg",
      "/manuals/samples/anodize-bsaa-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "BSAA: the chromium-free aerospace anodize that replaced chromic (Type I)",
      "No hexavalent chromium — removes the Cr VI carcinogen hazard of chromic anodizing",
      "Thin coating (~2–7 µm), excellent paint/primer base, fatigue-friendly",
      "Boric + low-sulfuric electrolyte at low voltage; the seal choice that keeps it chrome-free",
      "MIL-PRF-8625 Type IC; paint-adhesion, fatigue, and waste-handling advantages",
      "Honest safety: greener, but still real acid / caustic / hydrogen / hot-seal hazards",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-paa-manual",
    title: "Phosphoric Acid Anodizing (PAA) — The Complete Training Manual",
    titleEs: "Anodizado con Ácido Fosfórico (PAA) — El Manual de Capacitación Completo",
    seriesId: "anodize-paa",
    seriesLabel: "Phosphoric Acid Anodizing (PAA)",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 44-page, plain-language training manual for phosphoric acid anodizing (PAA) — the aerospace surface preparation for durable STRUCTURAL ADHESIVE BONDING. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then makes PAA specific: a phosphoric-acid electrolyte at low voltage builds a very thin oxide with a distinctive open, whisker-like pore structure that adhesives and bond primers lock into — giving exceptionally durable, humidity-resistant bonds. The defining rule: PAA is left UNSEALED (sealing would close the pores the adhesive needs) and is primed/bonded within a time window, not painted or sealed. Covers the FPL/P2 pre-etch (with the Cr VI flag on the dichromate FPL etch), Boeing BAC5555, ASTM D3933, and the wedge-crack durability test (ASTM D3762). Safety integrated throughout. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 44 páginas, en lenguaje sencillo, para el anodizado con ácido fosfórico (PAA) — la preparación de superficie aeroespacial para el PEGADO ADHESIVO ESTRUCTURAL durable. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego lo hace específico del PAA: un electrolito de ácido fosfórico a bajo voltaje forma un óxido muy delgado con una estructura de poros abiertos tipo “bigotes” en la que el adhesivo y la imprimación se anclan — dando uniones excepcionalmente durables y resistentes a la humedad. La regla que lo define: el PAA se deja SIN SELLAR (sellar cerraría los poros que el adhesivo necesita) y se imprima/pega dentro de una ventana de tiempo, no se pinta ni se sella. Cubre el grabado previo FPL/P2 (con la advertencia de Cr VI en el grabado FPL con dicromato), Boeing BAC5555, ASTM D3933 y la prueba de cuña/agrietamiento (ASTM D3762). La seguridad está integrada. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 44,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-paa-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-paa-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-paa-manual-p1.jpg",
      "/manuals/samples/anodize-paa-manual-p2.jpg",
      "/manuals/samples/anodize-paa-manual-p3.jpg",
      "/manuals/samples/anodize-paa-manual-p4.jpg",
      "/manuals/samples/anodize-paa-manual-p5.jpg",
      "/manuals/samples/anodize-paa-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "PAA: the aerospace pretreatment for durable STRUCTURAL ADHESIVE BONDING",
      "Open whisker-like pore structure that adhesives and bond primers lock into",
      "The defining rule — leave it UNSEALED; prime/bond within a time window (never seal)",
      "Phosphoric-acid, low-voltage process; very thin oxide; FPL/P2 pre-etch (Cr VI flag on FPL)",
      "Boeing BAC5555, ASTM D3933, and the wedge-crack durability test (ASTM D3762)",
      "Where PAA fits vs the other anodizes (bonding prep, not corrosion/wear/decoration)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-bright-manual",
    title: "Bright Anodizing — The Complete Training Manual",
    titleEs: "Anodizado Brillante — El Manual de Capacitación Completo",
    seriesId: "anodize-bright",
    seriesLabel: "Bright Anodizing",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 44-page, plain-language training manual for bright anodizing — the decorative anodize whose whole product is brilliance: a mirror, specular finish on aluminum. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then makes bright anodizing specific: a two-stage process where a hot phosphoric-nitric chemical bright dip levels the surface to a mirror, then a thin CLEAR (transparent) sulfuric anodize locks the shine in. Explains why it needs high-purity aluminum (alloying inclusions scatter light and dull the finish), why the matte etch is deliberately skipped, and how to keep the clear coat transparent. The standout safety lesson: the hot bright dip evolves NOx (brown nitrogen-oxide fume) — a serious, delayed-onset inhalation hazard requiring strong ventilation — taught at full prominence. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 44 páginas, en lenguaje sencillo, para el anodizado brillante — el anodizado decorativo cuyo producto entero es el brillo: un acabado espejo y especular sobre aluminio. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego lo hace específico del anodizado brillante: un proceso de dos etapas donde un abrillantado químico fosfórico-nítrico caliente nivela la superficie a espejo, y luego un anodizado sulfúrico CLARO (transparente) delgado fija el brillo. Explica por qué necesita aluminio de alta pureza (las inclusiones de aleación dispersan la luz y opacan el acabado), por qué se omite a propósito el grabado mate, y cómo mantener la capa clara transparente. La lección de seguridad destacada: el abrillantado caliente desprende NOx (humo pardo de óxidos de nitrógeno) — un peligro de inhalación grave y de efecto retardado que requiere ventilación fuerte — enseñada con plena prominencia. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 44,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-bright-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-bright-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-bright-manual-p1.jpg",
      "/manuals/samples/anodize-bright-manual-p2.jpg",
      "/manuals/samples/anodize-bright-manual-p3.jpg",
      "/manuals/samples/anodize-bright-manual-p4.jpg",
      "/manuals/samples/anodize-bright-manual-p5.jpg",
      "/manuals/samples/anodize-bright-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "Bright anodizing: a mirror/specular decorative finish on aluminum",
      "Two-stage process — hot phosphoric-nitric chemical bright dip, then a thin CLEAR sulfuric anodize",
      "Why it needs high-purity aluminum, and why the matte etch is deliberately skipped",
      "Standout safety: the bright dip evolves NOx (brown fume) — a delayed inhalation hazard; ventilation first",
      "Keeping the clear coat transparent; gloss/distinctness-of-image quality checks",
      "Where bright anodizing fits in the anodize family (a brightened, clear Type II)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-integral-manual",
    title: "Integral Color Anodizing — The Complete Training Manual",
    titleEs: "Anodizado de Color Integral — El Manual de Capacitación Completo",
    seriesId: "anodize-integral",
    seriesLabel: "Integral Color Anodizing",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 48-page, plain-language training manual for integral color anodizing — the architectural anodize where the color is produced BY the anodizing itself, in one step, with no dye. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then makes integral color specific: a sulfuric + organic-acid electrolyte (Kalcolor/Duranodic-type) run at higher energy grows a hard, inherently colored oxide — champagne through bronzes to gray and black — that's extremely lightfast and abrasion-resistant because there's no dye to fade. Explains how color deepens with coating thickness/amp-hours, why the aluminum alloy and temper drive the color (and the lot-to-lot color-matching challenge), the three coloring routes compared (dye vs integral vs two-step electrolytic), and AAMA 611 Class I architectural requirements. Safety integrated throughout. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 48 páginas, en lenguaje sencillo, para el anodizado de color integral — el anodizado arquitectónico donde el color lo produce el anodizado mismo, en un solo paso, sin anilina. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego lo hace específico del color integral: un electrolito de ácido sulfúrico + ácido orgánico (tipo Kalcolor/Duranodic) operado a mayor energía hace crecer un óxido duro con color inherente — de champaña a bronces, gris y negro — que es muy resistente a la luz y a la abrasión porque no hay anilina que se desvanezca. Explica cómo el color se oscurece con el espesor/amperios-hora, por qué la aleación y el temple del aluminio determinan el color (y el reto de igualar color entre lotes), las tres rutas de color comparadas (teñido vs color integral vs color electrolítico de dos pasos), y los requisitos arquitectónicos AAMA 611 Clase I. La seguridad está integrada. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 48,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-integral-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-integral-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-integral-manual-p1.jpg",
      "/manuals/samples/anodize-integral-manual-p2.jpg",
      "/manuals/samples/anodize-integral-manual-p3.jpg",
      "/manuals/samples/anodize-integral-manual-p4.jpg",
      "/manuals/samples/anodize-integral-manual-p5.jpg",
      "/manuals/samples/anodize-integral-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "Integral color: architectural color produced BY the anodizing itself — in one step, no dye",
      "Sulfuric + organic-acid electrolyte (Kalcolor/Duranodic-type); higher-energy colored hardcoat",
      "Lightfast bronzes/gray/black that don't fade — color is in the oxide, not a dye",
      "Color deepens with thickness/amp-hours; alloy & temper drive the color (lot-to-lot matching)",
      "The three coloring routes compared (dye vs integral vs two-step electrolytic)",
      "AAMA 611 Class I architectural anodizing requirements",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "anodize-2step-color-manual",
    title: "Two-Step Electrolytic Color Anodizing — The Complete Training Manual",
    titleEs: "Anodizado de Color Electrolítico en Dos Pasos — El Manual de Capacitación Completo",
    seriesId: "anodize-electrolytic-color",
    seriesLabel: "Two-Step Electrolytic Color Anodizing",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 55-page, plain-language training manual for two-step electrolytic color anodizing — the modern architectural color standard. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it re-teaches the anodizing fundamentals (the part is the ANODE; you GROW an oxide out of the aluminum) and then teaches the two-step method: (1) a normal clear sulfuric (Type II) anodize, then (2) an AC electrolytic coloring bath that deposits metal (tin, nickel, or cobalt) deep in the pores — giving durable, lightfast colors from champagne through bronzes to a superb black. The defining idea: color depth is set by the coloring TIME and voltage, not by the coating thickness — which is why two-step is far more consistent and alloy-independent than integral color, and why it took over architectural work. Covers the AC-coloring mechanism, the three coloring routes compared, AAMA 611 Class I, and metal-salt-bath safety/waste. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 55 páginas, en lenguaje sencillo, para el anodizado de color electrolítico en dos pasos — el estándar moderno de color arquitectónico. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, vuelve a enseñar los fundamentos del anodizado (la pieza es el ÁNODO; se HACE CRECER un óxido a partir del aluminio) y luego enseña el método de dos pasos: (1) un anodizado sulfúrico claro normal (Tipo II), y luego (2) un baño de coloración electrolítica con corriente alterna que deposita metal (estaño, níquel o cobalto) en el fondo de los poros — dando colores durables y resistentes a la luz, de champaña a bronces y un negro excelente. La idea que lo define: la profundidad del color la fija el TIEMPO y el voltaje de coloración, no el espesor de la capa — por eso el de dos pasos es mucho más consistente e independiente de la aleación que el color integral, y por eso dominó el trabajo arquitectónico. Cubre el mecanismo de coloración con CA, las tres rutas de color comparadas, AAMA 611 Clase I, y la seguridad/residuos del baño de sales metálicas. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 55,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/anodize-2step-color-manual-cover.jpg",
    coverImageEs: "/manuals/anodize-2step-color-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/anodize-2step-color-manual-p1.jpg",
      "/manuals/samples/anodize-2step-color-manual-p2.jpg",
      "/manuals/samples/anodize-2step-color-manual-p3.jpg",
      "/manuals/samples/anodize-2step-color-manual-p4.jpg",
      "/manuals/samples/anodize-2step-color-manual-p5.jpg",
      "/manuals/samples/anodize-2step-color-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — anodizing GROWS an oxide (part is the ANODE), it doesn't deposit metal",
      "Two-step method: clear sulfuric anodize, then AC electrolytic coloring",
      "AC deposits metal (tin/nickel/cobalt) in the pore bottoms — durable, lightfast color",
      "Color depth set by coloring TIME/voltage, NOT coating thickness (consistent, alloy-independent)",
      "The modern architectural color standard — superb bronzes and blacks",
      "The three coloring routes compared (dye vs integral vs two-step electrolytic)",
      "AAMA 611 Class I; metal-salt-bath safety (Ni/Co), AC electrical hazard, and waste",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "iron-phosphate-manual",
    title: "Iron Phosphate — The Complete Training Manual",
    titleEs: "Fosfato de Hierro — El Manual de Capacitación Completo",
    seriesId: "iron-phosphate",
    posterPrefixes: ["iron-phos"],
    seriesLabel: "Iron Phosphate",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 44-page, plain-language training manual for iron phosphate — the light conversion coating that is the workhorse PAINT and powder-coat base. A new process family: this is a chemical CONVERSION COATING, with NO electric current — the steel surface reacts with the solution to form an integral coating. Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it teaches conversion-coating fundamentals from scratch, then iron phosphate specifically: how a light amorphous coating (~30–90 mg/ft²) forms by immersion or spray, the cleaner-coater concept, 3-stage vs 5-stage spray washers, coating-weight/color control, the seal step (chromate vs non-chrome/zirconium), and the modern zirconium/nano pretreatment alternative. Explains where iron phosphate fits versus the heavier zinc and manganese phosphates. Safety integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 44 páginas, en lenguaje sencillo, para el fosfato de hierro — el recubrimiento de conversión ligero que es la base de PINTURA y recubrimiento en polvo por excelencia. Una nueva familia de procesos: este es un RECUBRIMIENTO DE CONVERSIÓN químico, SIN corriente eléctrica — la superficie de acero reacciona con la solución para formar un recubrimiento integral. Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, enseña los fundamentos de los recubrimientos de conversión desde cero, y luego el fosfato de hierro en concreto: cómo se forma un recubrimiento amorfo ligero (~30–90 mg/ft²) por inmersión o aspersión, el concepto de limpiador-recubridor, las lavadoras de aspersión de 3 vs 5 etapas, el control de peso/color del recubrimiento, el sellado (cromato vs sin cromo/circonio), y la alternativa moderna de pretratamiento de circonio/nano. Explica dónde encaja el fosfato de hierro frente a los fosfatos de zinc y manganeso más pesados. La seguridad está integrada en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 44,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/iron-phosphate-manual-cover.jpg",
    coverImageEs: "/manuals/iron-phosphate-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/iron-phosphate-manual-p1.jpg",
      "/manuals/samples/iron-phosphate-manual-p2.jpg",
      "/manuals/samples/iron-phosphate-manual-p3.jpg",
      "/manuals/samples/iron-phosphate-manual-p4.jpg",
      "/manuals/samples/iron-phosphate-manual-p5.jpg",
      "/manuals/samples/iron-phosphate-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — a CHEMICAL conversion coating with NO electric current",
      "Iron phosphate: the light, amorphous workhorse paint & powder-coat base (~30–90 mg/ft²)",
      "How the coating forms by immersion or spray; the cleaner-coater concept",
      "3-stage vs 5-stage spray washers; coating-weight and color control",
      "The seal step (chromate vs non-chrome/zirconium) and the modern zirconium/nano alternative",
      "Where iron phosphate fits vs the heavier zinc and manganese phosphates",
      "Safety integrated into every station (alkaline cleaner, hot solutions, dry-off oven, washer tunnels)",
      "20-question completion test, answer key, and certificate of completion",
      "Available in English and Spanish (professional shop-floor Spanish)",
      "Instant digital PDF download",
    ],
    available: true,
  },
  {
    id: "zinc-phosphate-manual",
    title: "Zinc Phosphate — The Complete Training Manual",
    titleEs: "Fosfato de Zinc — El Manual de Capacitación Completo",
    seriesId: "zinc-phosphate",
    seriesLabel: "Zinc Phosphate",
    tagline: "A full training course for the brand-new operator — assumes you know nothing, teaches you everything.",
    description:
      "A 54-page, plain-language training manual for zinc phosphate — the heavy, crystalline conversion coating that does three jobs: corrosion + paint base, a lubricant carrier for cold forming, and rust-proofing under oil. Part of the conversion-coating family (a chemical coating, NO electric current). Written in a friendly, “for-dummies” style that assumes zero prior knowledge, it teaches conversion-coating fundamentals, then zinc phosphate specifically: the crystalline coating (~150–1,000+ mg/ft²), the all-important ACTIVATION grain-refiner pre-dip (titanium colloid) that nucleates fine, tight crystals, free-acid/total-acid “points” control, nitrite/nitrate accelerators, tri-cation (Zn/Ni/Mn) automotive versions, and the heavier sludge/maintenance tradeoff. Explains where it sits between iron phosphate (lighter) and manganese phosphate (heavier). Safety integrated into every station. Ends with a 20-question completion test, answer key, and a printable certificate of completion.",
    descriptionEs:
      "Un manual de capacitación de 54 páginas, en lenguaje sencillo, para el fosfato de zinc — el recubrimiento de conversión pesado y cristalino que cumple tres funciones: base de corrosión + pintura, portador de lubricante para conformado en frío, y antioxidante bajo aceite. Parte de la familia de recubrimientos de conversión (un recubrimiento químico, SIN corriente eléctrica). Escrito en un estilo amigable “para principiantes” que no asume conocimientos previos, enseña los fundamentos de los recubrimientos de conversión, y luego el fosfato de zinc en concreto: el recubrimiento cristalino (~150–1,000+ mg/ft²), el fundamental pre-baño de ACTIVACIÓN afinador de grano (coloide de titanio) que nuclea cristales finos y apretados, el control de ácido libre/ácido total (“puntos”), los aceleradores de nitrito/nitrato, las versiones tri-catión (Zn/Ni/Mn) automotrices, y el mayor compromiso de lodo/mantenimiento. Explica dónde se ubica entre el fosfato de hierro (más ligero) y el de manganeso (más pesado). La seguridad está integrada en cada estación. Termina con un examen de 20 preguntas, clave de respuestas y un certificado de finalización imprimible.",
    pages: 54,
    priceDigital: 199,
    pricePrint: 329,
    priceCombo: 369,
    printVolumeTiers: [
      { min: 10, price: 199 },
      { min: 5, price: 239 },
      { min: 3, price: 279 },
    ],
    languages: ["en", "es"],
    coverImage: "/manuals/zinc-phosphate-manual-cover.jpg",
    coverImageEs: "/manuals/zinc-phosphate-manual-cover-es.jpg",
    samplePages: [
      "/manuals/samples/zinc-phosphate-manual-p1.jpg",
      "/manuals/samples/zinc-phosphate-manual-p2.jpg",
      "/manuals/samples/zinc-phosphate-manual-p3.jpg",
      "/manuals/samples/zinc-phosphate-manual-p4.jpg",
      "/manuals/samples/zinc-phosphate-manual-p5.jpg",
      "/manuals/samples/zinc-phosphate-manual-p6.jpg",
    ],
    highlights: [
      "Zero-assumption fundamentals — a CHEMICAL conversion coating with NO electric current",
      "Zinc phosphate: the heavy, crystalline coating (~150–1,000+ mg/ft²)",
      "Three use-modes: corrosion + paint base, cold-forming lubricant carrier, rust-proof under oil",
      "The all-important ACTIVATION grain-refiner pre-dip and why fine crystals matter",
      "Free-acid/total-acid “points” control, nitrite/nitrate accelerators, tri-cation (Zn/Ni/Mn)",
      "The heavier sludge/maintenance tradeoff (handled honestly)",
      "Where zinc phosphate fits vs iron phosphate (lighter) and manganese phosphate (heavier)",
      "Safety integrated into every station (alkaline cleaner, accelerator/NOx, sludge, hot solutions)",
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
