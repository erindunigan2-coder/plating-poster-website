// Step Library — individual process steps for the Build Your Line drag-and-drop builder
// Each step maps to one poster. Steps are organized by chemistry group for the toolbox.

export type ChemistryGroup =
  | "cleaning-prep"
  | "electroplating"
  | "electroless"
  | "anodizing"
  | "conversion-coating"
  | "chemical-treatment"
  | "painting-coating"
  | "diffusion-heat"
  | "specialty-advanced"
  | "thermal-spray"
  | "rinse-dry"
  | "handling";

export type ProcessStep = {
  id: string;
  name: string;           // display name on the drag tile
  nameEs: string;         // Spanish name
  group: ChemistryGroup;  // toolbox section
  description: string;    // one-line description for tooltip
  posterId?: string;      // links to a poster in posters.ts (undefined = coming soon)
  icon?: string;          // optional icon identifier
};

export type ChemistryGroupInfo = {
  id: ChemistryGroup;
  label: string;
  labelEs: string;
  color: string;          // accent color for the group
  description: string;
};

export const CHEMISTRY_GROUPS: ChemistryGroupInfo[] = [
  {
    id: "handling",
    label: "Handling",
    labelEs: "Manejo",
    color: "#6B7080",
    description: "Load, unload, inspect, mask/unmask",
  },
  {
    id: "cleaning-prep",
    label: "Cleaning & Prep",
    labelEs: "Limpieza y Preparación",
    color: "#7EB8D4",
    description: "Soak clean, electroclean, acid activate, degreasing",
  },
  {
    id: "rinse-dry",
    label: "Rinse & Dry",
    labelEs: "Enjuague y Secado",
    color: "#5BA3D9",
    description: "City rinse, DI rinse, hot air dry, oven cure",
  },
  {
    id: "electroless",
    label: "Electroless Plating",
    labelEs: "Deposición Autocatalítica",
    color: "#27AE60",
    description: "EN, electroless copper, palladium, gold, cobalt",
  },
  {
    id: "electroplating",
    label: "Electroplating",
    labelEs: "Galvanoplastia",
    color: "#E8A020",
    description: "Zinc, nickel, chrome, copper, tin, gold, silver, cadmium",
  },
  {
    id: "anodizing",
    label: "Anodizing",
    labelEs: "Anodizado",
    color: "#2EC4B6",
    description: "Sulfuric, chromic, hardcoat, bright, color anodizing",
  },
  {
    id: "conversion-coating",
    label: "Conversion Coating",
    labelEs: "Recubrimiento de Conversión",
    color: "#E05C5C",
    description: "Phosphate, chromate, black oxide, passivation",
  },
  {
    id: "chemical-treatment",
    label: "Chemical Treatment",
    labelEs: "Tratamiento Químico",
    color: "#7EB8D4",
    description: "Pickling, descaling, neutralization",
  },
  {
    id: "painting-coating",
    label: "Painting & Coating",
    labelEs: "Pintura y Recubrimiento",
    color: "#C8903A",
    description: "Powder coat, e-coat, liquid spray, dip coat",
  },
  {
    id: "diffusion-heat",
    label: "Diffusion & Heat Treatment",
    labelEs: "Difusión y Tratamiento Térmico",
    color: "#E87040",
    description: "Carburizing, nitriding, induction hardening",
  },
  {
    id: "specialty-advanced",
    label: "Specialty & Advanced",
    labelEs: "Especialidad y Avanzado",
    color: "#9060C8",
    description: "PVD, CVD, DLC, electropolishing, electroforming",
  },
  {
    id: "thermal-spray",
    label: "Thermal Spray",
    labelEs: "Rociado Térmico",
    color: "#E84040",
    description: "Plasma spray, HVOF, arc spray, cold spray",
  },
];

// ─── Step Library ────────────────────────────────────────────────────────────
// Steps are the individual draggable tiles. A shop owner builds their line
// by picking from these and arranging them in order.

export const STEPS: ProcessStep[] = [
  // ── Handling ─────────────────────────────────────────────────────────────
  { id: "load", name: "Load / Rack", nameEs: "Carga / Bastidor", group: "handling", description: "Mount parts on rack or fixture", posterId: "load" },
  { id: "unload", name: "Unload / Unrack", nameEs: "Descarga", group: "handling", description: "Remove parts from rack or fixture", posterId: "unload" },
  { id: "inspect", name: "Inspection", nameEs: "Inspección", group: "handling", description: "Visual or dimensional inspection point", posterId: "inspect" },
  { id: "mask", name: "Mask", nameEs: "Enmascarar", group: "handling", description: "Apply masking to protect areas from processing", posterId: "mask" },
  { id: "unmask", name: "Unmask", nameEs: "Desenmascarar", group: "handling", description: "Remove masking after processing", posterId: "unmask" },

  // ── Cleaning & Prep ──────────────────────────────────────────────────────
  { id: "soak-clean", name: "Soak Clean", nameEs: "Limpieza por Inmersión", group: "cleaning-prep", description: "Alkaline soak cleaner to remove oils and soils", posterId: "soak-clean" },
  { id: "electroclean", name: "Electroclean", nameEs: "Electrolimpieza", group: "cleaning-prep", description: "Electrolytic cleaning with anodic or cathodic current", posterId: "electroclean" },
  { id: "acid-activate", name: "Acid Activate", nameEs: "Activación Ácida", group: "cleaning-prep", description: "Acid dip to activate surface for plating", posterId: "acid-activate" },
  { id: "acid-pickle", name: "Acid Pickle", nameEs: "Decapado Ácido", group: "cleaning-prep", description: "Remove scale and oxides with acid", posterId: "acid-pickle" },
  { id: "acid-dip", name: "Acid Dip", nameEs: "Inmersión Ácida", group: "cleaning-prep", description: "Light acid dip for surface conditioning", posterId: "acid-dip" },
  { id: "alkaline-etch", name: "Alkaline Etch", nameEs: "Grabado Alcalino", group: "cleaning-prep", description: "Alkaline etching for aluminum or zinc substrates", posterId: "alkaline-etch" },
  { id: "deoxidize", name: "Deoxidize / Desmut", nameEs: "Desoxidar / Desmut", group: "cleaning-prep", description: "Remove smut and oxides after etching (aluminum)", posterId: "deoxidize" },
  { id: "ultrasonic-clean", name: "Ultrasonic Clean", nameEs: "Limpieza Ultrasónica", group: "cleaning-prep", description: "Ultrasonic agitation cleaning for complex geometries", posterId: "ultrasonic-clean" },
  { id: "solvent-degrease", name: "Solvent Degrease", nameEs: "Desengrase con Solvente", group: "cleaning-prep", description: "Vapor or immersion solvent degreasing", posterId: "solvent-degrease" },
  { id: "abrasive-blast", name: "Abrasive Blast", nameEs: "Granallado", group: "cleaning-prep", description: "Grit blast or shot blast for surface profile", posterId: "abrasive-blast" },

  // ── Rinse & Dry ──────────────────────────────────────────────────────────
  { id: "city-rinse", name: "City Water Rinse", nameEs: "Enjuague con Agua de Red", group: "rinse-dry", description: "Standard tap water rinse between process steps", posterId: "city-rinse" },
  { id: "di-rinse", name: "DI Water Rinse", nameEs: "Enjuague con Agua DI", group: "rinse-dry", description: "Deionized water rinse for critical cleanliness", posterId: "di-rinse" },
  { id: "critical-rinse", name: "Critical Rinse", nameEs: "Enjuague Crítico", group: "rinse-dry", description: "High-purity rinse before plating bath — < 20 µS/cm", posterId: "critical-rinse" },
  { id: "final-rinse", name: "Final Rinse", nameEs: "Enjuague Final", group: "rinse-dry", description: "Post-plate rinse to remove drag-out", posterId: "final-rinse" },
  { id: "hot-rinse", name: "Hot Water Rinse", nameEs: "Enjuague con Agua Caliente", group: "rinse-dry", description: "Heated rinse for faster drying or seal", posterId: "hot-rinse" },
  { id: "drag-out-rinse", name: "Drag-Out Rinse", nameEs: "Enjuague de Arrastre", group: "rinse-dry", description: "Captures chemistry drag-out for recovery", posterId: "drag-out-rinse" },
  { id: "hot-air-dry", name: "Hot Air Dry", nameEs: "Secado con Aire Caliente", group: "rinse-dry", description: "Forced hot air drying", posterId: "hot-air-dry" },
  { id: "oven-dry", name: "Oven Dry / Cure", nameEs: "Secado / Curado en Horno", group: "rinse-dry", description: "Oven cure or bake for adhesion and stress relief", posterId: "oven-dry" },

  // ── Electroless Plating ──────────────────────────────────────────────────
  { id: "en-strike", name: "EN Strike", nameEs: "Strike de EN", group: "electroless", description: "Thin electroless nickel strike for adhesion", posterId: "en-strike" },
  { id: "en-bath-low-phos", name: "EN Bath (Low Phos)", nameEs: "Baño EN (Bajo Fósforo)", group: "electroless", description: "Electroless nickel low phosphorus bath (1–4% P)", posterId: "en-bath-low-phos" },
  { id: "en-bath-mid-phos", name: "EN Bath (Mid Phos)", nameEs: "Baño EN (Medio Fósforo)", group: "electroless", description: "Electroless nickel mid phosphorus bath (5–9% P)", posterId: "en-bath-mid-phos" },
  { id: "en-bath-high-phos", name: "EN Bath (High Phos)", nameEs: "Baño EN (Alto Fósforo)", group: "electroless", description: "Electroless nickel high phosphorus bath (10–13% P)", posterId: "en-bath-high-phos" },
  { id: "electroless-copper", name: "Electroless Copper", nameEs: "Cobre Autocatalítico", group: "electroless", description: "Autocatalytic copper deposition", posterId: "electroless-copper" },
  { id: "electroless-gold", name: "Electroless Gold", nameEs: "Oro Autocatalítico", group: "electroless", description: "Immersion or autocatalytic gold deposition", posterId: "electroless-gold" },
  { id: "electroless-palladium", name: "Electroless Palladium", nameEs: "Paladio Autocatalítico", group: "electroless", description: "Autocatalytic palladium deposition", posterId: "electroless-palladium" },
  { id: "electroless-cobalt", name: "Electroless Cobalt", nameEs: "Cobalto Autocatalítico", group: "electroless", description: "Autocatalytic cobalt deposition", posterId: "electroless-cobalt" },
  { id: "en-boron", name: "EN Nickel-Boron", nameEs: "EN Níquel-Boro", group: "electroless", description: "Electroless nickel-boron for extreme hardness", posterId: "en-boron" },
  { id: "en-post-treatment", name: "Post Treatment / Bake", nameEs: "Tratamiento Final / Horneado", group: "electroless", description: "H2 embrittlement relief bake or age hardening", posterId: "en-post-treatment" },

  // ── Electroplating ───────────────────────────────────────────────────────
  { id: "zinc-alkaline", name: "Zinc Plate (Alkaline)", nameEs: "Zincado (Alcalino)", group: "electroplating", description: "Alkaline non-cyanide zinc electroplating", posterId: "zinc-alkaline" },
  { id: "zinc-acid", name: "Zinc Plate (Acid)", nameEs: "Zincado (Ácido)", group: "electroplating", description: "Acid chloride zinc electroplating", posterId: "zinc-acid" },
  { id: "zinc-nickel", name: "Zinc-Nickel Plate", nameEs: "Zinc-Níquel", group: "electroplating", description: "Zinc-nickel alloy plating for high corrosion resistance", posterId: "zinc-nickel" },
  { id: "nickel-watts", name: "Nickel Plate (Watts)", nameEs: "Niquelado (Watts)", group: "electroplating", description: "Watts nickel sulfate/chloride bath", posterId: "nickel-watts" },
  { id: "nickel-bright", name: "Bright Nickel Plate", nameEs: "Niquelado Brillante", group: "electroplating", description: "Bright nickel — leveling, brightness, and corrosion layering in decorative stacks", posterId: "nickel-bright" },
  { id: "nickel-semi-bright", name: "Semi-Bright Nickel Plate", nameEs: "Niquelado Semi-Brillante", group: "electroplating", description: "Semi-bright nickel — ductile, sulfur-free underlayer for decorative chrome stacks", posterId: "nickel-semi-bright" },
  { id: "nickel-sulfamate", name: "Nickel Plate (Sulfamate)", nameEs: "Niquelado (Sulfamato)", group: "electroplating", description: "Sulfamate nickel for low-stress deposits", posterId: "nickel-sulfamate" },
  { id: "nickel-cobalt", name: "Nickel-Cobalt Plate", nameEs: "Níquel-Cobalto", group: "electroplating", description: "Nickel-cobalt alloy electroplating", posterId: "nickel-cobalt" },
  { id: "chrome-decorative", name: "Chrome (Decorative)", nameEs: "Cromado (Decorativo)", group: "electroplating", description: "Decorative chromium plating", posterId: "chrome-decorative" },
  { id: "chrome-hard", name: "Hard Chrome", nameEs: "Cromo Duro", group: "electroplating", description: "Hard chromium plating for wear resistance", posterId: "chrome-hard" },
  { id: "copper-acid", name: "Copper Plate (Acid)", nameEs: "Cobreado (Ácido)", group: "electroplating", description: "Acid copper sulfate electroplating", posterId: "copper-acid" },
  { id: "copper-cyanide", name: "Copper Plate (Cyanide)", nameEs: "Cobreado (Cianuro)", group: "electroplating", description: "Cyanide copper plating — excellent throwing power, used as strike and buildup", posterId: "copper-cyanide" },
  { id: "copper-pyrophosphate", name: "Copper Plate (Pyrophosphate)", nameEs: "Cobreado (Pirofosfato)", group: "electroplating", description: "Non-cyanide alkaline copper from pyrophosphate bath", posterId: "copper-pyrophosphate" },
  { id: "copper-strike", name: "Copper Strike", nameEs: "Strike de Cobre", group: "electroplating", description: "Thin copper strike layer for adhesion", posterId: "copper-strike" },
  { id: "tin-plate", name: "Tin Plate", nameEs: "Estañado", group: "electroplating", description: "Tin electroplating — acid or alkaline", posterId: "tin-plate" },
  { id: "gold-plate", name: "Gold Plate", nameEs: "Dorado", group: "electroplating", description: "Gold electroplating for electronics or decorative", posterId: "gold-plate" },
  { id: "silver-plate", name: "Silver Plate", nameEs: "Plateado", group: "electroplating", description: "Silver electroplating", posterId: "silver-plate" },
  { id: "silver-strike", name: "Silver Strike", nameEs: "Strike de Plata", group: "electroplating", description: "Thin silver strike for adhesion before silver plate", posterId: "silver-strike" },
  { id: "cadmium-cyanide", name: "Cadmium Plate (Cyanide)", nameEs: "Cadmiado (Cianuro)", group: "electroplating", description: "Cyanide cadmium plating — aerospace and military standard", posterId: "cadmium-cyanide" },
  { id: "cadmium-acid", name: "Cadmium Plate (Acid)", nameEs: "Cadmiado (Ácido)", group: "electroplating", description: "Acid cadmium plating — fluoborate or sulfate bath", posterId: "cadmium-acid" },
  { id: "tin-lead", name: "Tin-Lead Plate", nameEs: "Estaño-Plomo", group: "electroplating", description: "Tin-lead alloy plating for solderability", posterId: "tin-lead" },
  { id: "nickel-strike", name: "Nickel Strike (Wood's)", nameEs: "Strike de Níquel (Wood's)", group: "electroplating", description: "Wood's nickel strike for adhesion on stainless or nickel alloys", posterId: "nickel-strike" },

  // ── Anodizing ────────────────────────────────────────────────────────────
  { id: "anodize-type-ii", name: "Sulfuric Anodize (Type II)", nameEs: "Anodizado Sulfúrico (Tipo II)", group: "anodizing", description: "Standard sulfuric acid anodizing", posterId: "anodize-type-ii" },
  { id: "anodize-type-iii", name: "Hardcoat Anodize (Type III)", nameEs: "Anodizado Duro (Tipo III)", group: "anodizing", description: "Hard anodize coating for wear resistance", posterId: "anodize-type-iii" },
  { id: "anodize-type-i", name: "Chromic Anodize (Type I)", nameEs: "Anodizado Crómico (Tipo I)", group: "anodizing", description: "Chromic acid anodize for thin, corrosion-resistant films", posterId: "anodize-type-i" },
  { id: "anodize-bsaa", name: "Boric-Sulfuric Anodize", nameEs: "Anodizado Bórico-Sulfúrico", group: "anodizing", description: "BSAA — chromic acid replacement anodizing", posterId: "anodize-bsaa" },
  { id: "anodize-paa", name: "Phosphoric Anodize", nameEs: "Anodizado Fosfórico", group: "anodizing", description: "PAA for adhesive bonding applications", posterId: "anodize-paa" },
  { id: "anodize-bright", name: "Bright Anodize", nameEs: "Anodizado Brillante", group: "anodizing", description: "Chemical or electrochemical bright anodizing", posterId: "anodize-bright" },
  { id: "anodize-integral", name: "Integral Color Anodize", nameEs: "Anodizado Color Integral", group: "anodizing", description: "Color developed within the anodic film itself", posterId: "anodize-integral" },
  { id: "anodize-electrolytic-color", name: "Electrolytic Color", nameEs: "Color Electrolítico", group: "anodizing", description: "Two-step electrolytic coloring of anodized aluminum", posterId: "anodize-electrolytic-color" },
  { id: "anodize-seal-hot", name: "Hot Water Seal", nameEs: "Sellado con Agua Caliente", group: "anodizing", description: "Boiling/near-boiling DI water seal for anodized parts", posterId: "anodize-seal-hot" },
  { id: "anodize-seal-nickel-acetate", name: "Nickel Acetate Seal", nameEs: "Sellado con Acetato de Níquel", group: "anodizing", description: "Mid-temperature nickel acetate sealing", posterId: "anodize-seal-nickel-acetate" },
  { id: "anodize-seal-cold", name: "Cold Seal", nameEs: "Sellado en Frío", group: "anodizing", description: "Cold nickel fluoride sealing", posterId: "anodize-seal-cold" },
  { id: "anodize-dye", name: "Dye", nameEs: "Tinte", group: "anodizing", description: "Organic or inorganic dye application to anodized surface", posterId: "anodize-dye" },

  // ── Conversion Coating ───────────────────────────────────────────────────
  { id: "iron-phosphate", name: "Iron Phosphate", nameEs: "Fosfato de Hierro", group: "conversion-coating", description: "Iron phosphate conversion coating for paint adhesion", posterId: "iron-phosphate" },
  { id: "zinc-phosphate", name: "Zinc Phosphate", nameEs: "Fosfato de Zinc", group: "conversion-coating", description: "Zinc phosphate coating for corrosion protection", posterId: "zinc-phosphate" },
  { id: "manganese-phosphate", name: "Manganese Phosphate", nameEs: "Fosfato de Manganeso", group: "conversion-coating", description: "Manganese phosphate for oil retention and wear", posterId: "manganese-phosphate" },
  { id: "chromate-hex", name: "Chromate (Hexavalent)", nameEs: "Cromato (Hexavalente)", group: "conversion-coating", description: "Hexavalent chromate conversion coating", posterId: "chromate-hex" },
  { id: "chromate-tri", name: "Chromate (Trivalent)", nameEs: "Cromato (Trivalente)", group: "conversion-coating", description: "Trivalent chromate — RoHS-compliant alternative", posterId: "chromate-tri" },
  { id: "chem-film", name: "Chem Film / Alodine", nameEs: "Película Química / Alodine", group: "conversion-coating", description: "Aluminum chromate conversion (MIL-DTL-5541)", posterId: "chem-film" },
  { id: "black-oxide", name: "Black Oxide", nameEs: "Óxido Negro", group: "conversion-coating", description: "Hot black oxide on steel", posterId: "black-oxide" },
  { id: "passivation", name: "Passivation", nameEs: "Pasivación", group: "conversion-coating", description: "Nitric or citric acid passivation of stainless steel", posterId: "passivation" },
  { id: "sealer", name: "Sealer / Topcoat Sealer", nameEs: "Sellador", group: "conversion-coating", description: "Final sealer coat to close pores and boost corrosion protection", posterId: "sealer" },

  // ── Painting & Coating ───────────────────────────────────────────────────
  { id: "powder-coat", name: "Powder Coat", nameEs: "Recubrimiento en Polvo", group: "painting-coating", description: "Electrostatic powder coating application", posterId: "powder-coat" },
  { id: "powder-cure", name: "Powder Cure", nameEs: "Curado de Polvo", group: "painting-coating", description: "Oven cure for powder coating", posterId: "powder-cure" },
  { id: "liquid-spray", name: "Liquid Spray Paint", nameEs: "Pintura por Aspersión", group: "painting-coating", description: "Wet spray painting — primer, base, or topcoat", posterId: "liquid-spray" },
  { id: "e-coat", name: "E-Coat", nameEs: "E-Coat", group: "painting-coating", description: "Electrophoretic coating (cathodic or anodic)", posterId: "e-coat" },
  { id: "dip-coat", name: "Dip Coat", nameEs: "Recubrimiento por Inmersión", group: "painting-coating", description: "Immersion dip coating", posterId: "dip-coat" },
  { id: "flow-coat", name: "Flow Coat", nameEs: "Recubrimiento por Flujo", group: "painting-coating", description: "Flow coating for continuous production", posterId: "flow-coat" },
  { id: "primer", name: "Primer", nameEs: "Imprimador", group: "painting-coating", description: "Primer application for adhesion and corrosion base", posterId: "primer" },
  { id: "topcoat", name: "Topcoat", nameEs: "Acabado Final", group: "painting-coating", description: "Final topcoat for appearance and protection", posterId: "topcoat" },
  { id: "flash-dry", name: "Flash Dry", nameEs: "Secado Rápido", group: "painting-coating", description: "Flash-off period between coats", posterId: "flash-dry" },

  // ── Diffusion & Heat Treatment ───────────────────────────────────────────
  { id: "carburize-gas", name: "Gas Carburize", nameEs: "Carburación por Gas", group: "diffusion-heat", description: "Atmosphere gas carburizing", posterId: "carburize-gas" },
  { id: "carburize-vacuum", name: "Vacuum Carburize", nameEs: "Carburación al Vacío", group: "diffusion-heat", description: "Low-pressure vacuum carburizing (LPC)", posterId: "carburize-vacuum" },
  { id: "carbonitride", name: "Carbonitride", nameEs: "Carbonitruración", group: "diffusion-heat", description: "Combined carbon and nitrogen diffusion", posterId: "carbonitride" },
  { id: "nitride-gas", name: "Gas Nitride", nameEs: "Nitruración por Gas", group: "diffusion-heat", description: "Gas nitriding for surface hardness", posterId: "nitride-gas" },
  { id: "nitride-plasma", name: "Plasma Nitride", nameEs: "Nitruración por Plasma", group: "diffusion-heat", description: "Plasma/ion nitriding", posterId: "nitride-plasma" },
  { id: "fnc-qpq", name: "FNC / QPQ", nameEs: "FNC / QPQ", group: "diffusion-heat", description: "Ferritic nitrocarburizing / quench-polish-quench", posterId: "fnc-qpq" },
  { id: "induction-harden", name: "Induction Harden", nameEs: "Endurecimiento por Inducción", group: "diffusion-heat", description: "Localized induction hardening", posterId: "induction-harden" },
  { id: "flame-harden", name: "Flame Harden", nameEs: "Endurecimiento por Flama", group: "diffusion-heat", description: "Flame hardening for large or selective areas", posterId: "flame-harden" },
  { id: "austemper", name: "Austemper", nameEs: "Austempering", group: "diffusion-heat", description: "Austempering for bainitic transformation", posterId: "austemper" },
  { id: "martemper", name: "Martemper", nameEs: "Martempering", group: "diffusion-heat", description: "Martempering for reduced distortion", posterId: "martemper" },
  { id: "quench-oil", name: "Oil Quench", nameEs: "Temple en Aceite", group: "diffusion-heat", description: "Oil quenching after austenitizing", posterId: "quench-oil" },
  { id: "quench-water", name: "Water Quench", nameEs: "Temple en Agua", group: "diffusion-heat", description: "Water or polymer quench", posterId: "quench-water" },
  { id: "temper", name: "Temper / Draw", nameEs: "Revenido", group: "diffusion-heat", description: "Tempering to target hardness and toughness", posterId: "temper" },
  { id: "stress-relieve", name: "Stress Relieve", nameEs: "Alivio de Tensiones", group: "diffusion-heat", description: "Sub-critical stress relief heat treatment", posterId: "stress-relieve" },
  { id: "preheat", name: "Preheat", nameEs: "Precalentamiento", group: "diffusion-heat", description: "Preheat before hardening or carburizing", posterId: "preheat" },

  // ── Specialty & Advanced ─────────────────────────────────────────────────
  { id: "pvd", name: "PVD Coating", nameEs: "Recubrimiento PVD", group: "specialty-advanced", description: "Physical vapor deposition", posterId: "pvd" },
  { id: "cvd", name: "CVD Coating", nameEs: "Recubrimiento CVD", group: "specialty-advanced", description: "Chemical vapor deposition", posterId: "cvd" },
  { id: "pecvd", name: "PECVD", nameEs: "PECVD", group: "specialty-advanced", description: "Plasma-enhanced chemical vapor deposition", posterId: "pecvd" },
  { id: "ald", name: "ALD", nameEs: "ALD", group: "specialty-advanced", description: "Atomic layer deposition", posterId: "ald" },
  { id: "dlc", name: "DLC Coating", nameEs: "Recubrimiento DLC", group: "specialty-advanced", description: "Diamond-like carbon coating", posterId: "dlc" },
  { id: "ion-implant", name: "Ion Implantation", nameEs: "Implantación de Iones", group: "specialty-advanced", description: "Ion implantation for surface modification", posterId: "ion-implant" },
  { id: "electropolish", name: "Electropolish", nameEs: "Electropulido", group: "specialty-advanced", description: "Electrochemical polishing for smooth, bright finish", posterId: "electropolish" },
  { id: "electroform", name: "Electroform", nameEs: "Electroformado", group: "specialty-advanced", description: "Electroforming — building metal shapes on a mandrel", posterId: "electroform" },

  // ── Thermal Spray ────────────────────────────────────────────────────────
  { id: "plasma-spray", name: "Plasma Spray (APS)", nameEs: "Rociado por Plasma (APS)", group: "thermal-spray", description: "Atmospheric plasma spray", posterId: "plasma-spray" },
  { id: "hvof", name: "HVOF", nameEs: "HVOF", group: "thermal-spray", description: "High-velocity oxy-fuel spray", posterId: "hvof" },
  { id: "flame-spray", name: "Flame Spray", nameEs: "Rociado por Flama", group: "thermal-spray", description: "Wire or powder flame spray", posterId: "flame-spray" },
  { id: "arc-spray", name: "Arc Spray", nameEs: "Rociado por Arco", group: "thermal-spray", description: "Twin wire arc spray", posterId: "arc-spray" },
  { id: "cold-spray", name: "Cold Spray", nameEs: "Rociado en Frío", group: "thermal-spray", description: "Kinetic/cold spray deposition", posterId: "cold-spray" },
  { id: "d-gun", name: "Detonation Gun", nameEs: "Pistola de Detonación", group: "thermal-spray", description: "D-Gun thermal spray", posterId: "d-gun" },
  { id: "sps", name: "Suspension Plasma Spray", nameEs: "Rociado por Plasma en Suspensión", group: "thermal-spray", description: "SPS for fine-structured coatings", posterId: "sps" },
  { id: "wire-combustion", name: "Wire Combustion Spray", nameEs: "Rociado por Combustión de Alambre", group: "thermal-spray", description: "Wire combustion spray coating", posterId: "wire-combustion" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getStepsByGroup(group: ChemistryGroup): ProcessStep[] {
  return STEPS.filter((s) => s.group === group);
}

export function getStep(id: string): ProcessStep | undefined {
  return STEPS.find((s) => s.id === id);
}

export function getGroupInfo(id: ChemistryGroup): ChemistryGroupInfo | undefined {
  return CHEMISTRY_GROUPS.find((g) => g.id === id);
}
