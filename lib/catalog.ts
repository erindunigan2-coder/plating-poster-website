// Plating Posters Inc — Full Catalog
// Category → Process → Poster Series hierarchy
// All entries are "coming soon" unless available: true

export type ProcessEntry = {
  id: string;
  title: string;
  posterCount: number;
  available?: boolean;
};

export type CategoryEntry = {
  id: string;
  title: string;
  slug: string;
  description: string;
  accentColor: string; // for visual theming
  totalPosters: number; // English designs
  processes: ProcessEntry[];
};

function pid(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CATEGORIES: CategoryEntry[] = [
  {
    id: "electroplating",
    slug: "electroplating",
    title: "Electroplating",
    description:
      "Electrodeposition of metals onto a conductive substrate using electrical current through an electrolytic bath. Covers zinc, nickel, chrome, copper, tin, gold, silver, cadmium, and more.",
    accentColor: "#E8A020",
    totalPosters: 120,
    processes: [
      { id: pid("Zinc Plating (Alkaline)"), title: "Zinc Plating (Alkaline)", posterCount: 8 },
      { id: pid("Zinc Plating (Acid)"), title: "Zinc Plating (Acid)", posterCount: 8 },
      { id: pid("Zinc-Nickel Plating"), title: "Zinc-Nickel Plating", posterCount: 8 },
      { id: pid("Nickel Plating (Watts)"), title: "Nickel Plating (Watts)", posterCount: 8 },
      { id: pid("Nickel Plating (Sulfamate)"), title: "Nickel Plating (Sulfamate)", posterCount: 8 },
      { id: pid("Nickel-Cobalt Plating"), title: "Nickel-Cobalt Plating", posterCount: 8 },
      { id: pid("Chrome Plating (Decorative)"), title: "Chrome Plating (Decorative)", posterCount: 8 },
      { id: pid("Hard Chrome Plating"), title: "Hard Chrome Plating", posterCount: 8 },
      { id: pid("Copper Plating (Acid)"), title: "Copper Plating (Acid)", posterCount: 8 },
      { id: pid("Copper Plating (Alkaline)"), title: "Copper Plating (Alkaline)", posterCount: 8 },
      { id: pid("Tin Plating"), title: "Tin Plating", posterCount: 8 },
      { id: pid("Gold Plating"), title: "Gold Plating", posterCount: 8 },
      { id: pid("Silver Plating"), title: "Silver Plating", posterCount: 8 },
      { id: pid("Cadmium Plating"), title: "Cadmium Plating", posterCount: 8 },
      { id: pid("Tin-Lead Plating"), title: "Tin-Lead Plating", posterCount: 8 },
    ],
  },
  {
    id: "anodizing",
    slug: "anodizing",
    title: "Anodizing",
    description:
      "Electrochemical processes that convert the aluminum surface into a durable, corrosion-resistant anodic oxide finish. Covers Type I, II, III, bright, integral color, and two-step electrolytic processes.",
    accentColor: "#2EC4B6",
    totalPosters: 64,
    processes: [
      { id: pid("Sulfuric Acid Anodizing (Type II)"), title: "Sulfuric Acid Anodizing (Type II)", posterCount: 8 },
      { id: pid("Hardcoat Anodizing (Type III)"), title: "Hardcoat Anodizing (Type III)", posterCount: 8 },
      { id: pid("Chromic Acid Anodizing (Type I)"), title: "Chromic Acid Anodizing (Type I)", posterCount: 8 },
      { id: pid("Boric-Sulfuric Acid Anodizing (BSAA)"), title: "Boric-Sulfuric Acid Anodizing (BSAA)", posterCount: 8 },
      { id: pid("Phosphoric Acid Anodizing (PAA)"), title: "Phosphoric Acid Anodizing (PAA)", posterCount: 8 },
      { id: pid("Bright Anodizing"), title: "Bright Anodizing", posterCount: 8 },
      { id: pid("Integral Color Anodizing"), title: "Integral Color Anodizing", posterCount: 8 },
      { id: pid("Two-Step (Electrolytic) Color Anodizing"), title: "Two-Step (Electrolytic) Color Anodizing", posterCount: 8 },
    ],
  },
  {
    id: "electroless",
    slug: "electroless",
    title: "Electroless Plating",
    description:
      "Autocatalytic metal deposition without external electrical current, delivering uniform coverage on complex geometries and non-conductive substrates. Covers nickel, copper, gold, palladium, cobalt, and specialty alloys.",
    accentColor: "#27AE60",
    totalPosters: 64,
    processes: [
      { id: pid("Electroless Nickel (Low Phosphorus)"), title: "Electroless Nickel (Low Phosphorus)", posterCount: 8 },
      { id: pid("Electroless Nickel (Mid Phosphorus)"), title: "Electroless Nickel (Mid Phosphorus)", posterCount: 8 },
      { id: pid("Electroless Nickel (High Phosphorus)"), title: "Electroless Nickel (High Phosphorus)", posterCount: 8 },
      { id: pid("Electroless Copper"), title: "Electroless Copper", posterCount: 8 },
      { id: pid("Electroless Palladium"), title: "Electroless Palladium", posterCount: 8 },
      { id: pid("Electroless Gold"), title: "Electroless Gold", posterCount: 8 },
      { id: pid("Electroless Cobalt"), title: "Electroless Cobalt", posterCount: 8 },
      { id: pid("Electroless Nickel-Boron"), title: "Electroless Nickel-Boron", posterCount: 8 },
    ],
  },
  {
    id: "conversion-coating",
    slug: "conversion-coating",
    title: "Conversion Coating",
    description:
      "Chemical treatments that convert the surface layer into a protective compound, improving corrosion resistance and paint adhesion. Covers phosphate, chromate, black oxide, passivation, and chem film processes.",
    accentColor: "#E05C5C",
    totalPosters: 64,
    processes: [
      { id: pid("Iron Phosphate"), title: "Iron Phosphate", posterCount: 8 },
      { id: pid("Zinc Phosphate"), title: "Zinc Phosphate", posterCount: 8 },
      { id: pid("Manganese Phosphate"), title: "Manganese Phosphate", posterCount: 8 },
      { id: pid("Chromate Conversion (Hexavalent)"), title: "Chromate Conversion (Hexavalent)", posterCount: 8 },
      { id: pid("Chromate Conversion (Trivalent)"), title: "Chromate Conversion (Trivalent)", posterCount: 8 },
      { id: pid("Aluminum Conversion Coating (Chem Film / Alodine)"), title: "Aluminum Conversion Coating (Chem Film / Alodine)", posterCount: 8 },
      { id: pid("Black Oxide (Steel)"), title: "Black Oxide (Steel)", posterCount: 8 },
      { id: pid("Passivation (Stainless Steel)"), title: "Passivation (Stainless Steel)", posterCount: 8 },
    ],
  },
  {
    id: "chemical-treatment",
    slug: "chemical-treatment",
    title: "Chemical Treatment",
    description:
      "Pre-treatment and cleaning processes essential for surface preparation before any finishing operation. Covers alkaline cleaning, electrocleaning, acid pickling, descaling, solvent and ultrasonic cleaning.",
    accentColor: "#7EB8D4",
    totalPosters: 56,
    processes: [
      { id: pid("Alkaline Cleaning (Soak)"), title: "Alkaline Cleaning (Soak)", posterCount: 7 },
      { id: pid("Electrocleaning"), title: "Electrocleaning", posterCount: 7 },
      { id: pid("Acid Pickling (Steel)"), title: "Acid Pickling (Steel)", posterCount: 7 },
      { id: pid("Acid Pickling (Stainless Steel)"), title: "Acid Pickling (Stainless Steel)", posterCount: 7 },
      { id: pid("Descaling / Heavy Oxide Removal"), title: "Descaling / Heavy Oxide Removal", posterCount: 7 },
      { id: pid("Solvent Cleaning / Degreasing"), title: "Solvent Cleaning / Degreasing", posterCount: 7 },
      { id: pid("Ultrasonic Cleaning"), title: "Ultrasonic Cleaning", posterCount: 7 },
      { id: pid("Neutralization & Rinse Systems"), title: "Neutralization & Rinse Systems", posterCount: 7 },
    ],
  },
  {
    id: "painting-coating",
    slug: "painting-coating",
    title: "Painting & Coating",
    description:
      "Liquid and powder coating systems applied to prepared substrates for corrosion protection, appearance, and functional performance. Covers powder, liquid spray, e-coat, dip, coil, and industrial protective coatings.",
    accentColor: "#C8903A",
    totalPosters: 72,
    processes: [
      { id: pid("Powder Coating"), title: "Powder Coating", posterCount: 9 },
      { id: pid("Liquid Spray Painting"), title: "Liquid Spray Painting", posterCount: 10 },
      { id: pid("E-Coating (Electrophoretic)"), title: "E-Coating (Electrophoretic)", posterCount: 9 },
      { id: pid("Dip Coating"), title: "Dip Coating", posterCount: 9 },
      { id: pid("Flow Coating"), title: "Flow Coating", posterCount: 9 },
      { id: pid("Coil Coating (Continuous Line)"), title: "Coil Coating (Continuous Line)", posterCount: 9 },
      { id: pid("Industrial Priming Systems"), title: "Industrial Priming Systems", posterCount: 9 },
      { id: pid("Protective Coatings (Epoxy / Urethane)"), title: "Protective Coatings (Epoxy / Urethane)", posterCount: 9 },
    ],
  },
  {
    id: "diffusion-heat-treatment",
    slug: "diffusion-heat-treatment",
    title: "Diffusion & Heat Treatment",
    description:
      "Thermochemical processes that modify surface and subsurface properties through controlled heating and atmosphere. Covers carburizing, nitriding, carbonitriding, FNC/QPQ, induction hardening, and austempering.",
    accentColor: "#E87040",
    totalPosters: 90,
    processes: [
      { id: pid("Carburizing (Gas / Atmosphere)"), title: "Carburizing (Gas / Atmosphere)", posterCount: 9 },
      { id: pid("Vacuum Carburizing (LPC)"), title: "Vacuum Carburizing (LPC)", posterCount: 9 },
      { id: pid("Carbonitriding"), title: "Carbonitriding", posterCount: 9 },
      { id: pid("Nitriding (Gas)"), title: "Nitriding (Gas)", posterCount: 9 },
      { id: pid("Nitriding (Plasma / Ion)"), title: "Nitriding (Plasma / Ion)", posterCount: 9 },
      { id: pid("Ferritic Nitrocarburizing (FNC / QPQ)"), title: "Ferritic Nitrocarburizing (FNC / QPQ)", posterCount: 9 },
      { id: pid("Induction Hardening"), title: "Induction Hardening", posterCount: 9 },
      { id: pid("Flame Hardening"), title: "Flame Hardening", posterCount: 9 },
      { id: pid("Austempering"), title: "Austempering", posterCount: 9 },
      { id: pid("Martempering"), title: "Martempering", posterCount: 9 },
    ],
  },
  {
    id: "specialty-advanced",
    slug: "specialty-advanced",
    title: "Specialty & Advanced",
    description:
      "High-technology surface engineering processes for precision and extreme-performance applications. Covers PVD, CVD, PECVD, ALD, DLC, ion implantation, electropolishing, and electroforming.",
    accentColor: "#9060C8",
    totalPosters: 80,
    processes: [
      { id: pid("Physical Vapor Deposition (PVD)"), title: "Physical Vapor Deposition (PVD)", posterCount: 10 },
      { id: pid("Chemical Vapor Deposition (CVD)"), title: "Chemical Vapor Deposition (CVD)", posterCount: 10 },
      { id: pid("Plasma-Enhanced CVD (PECVD)"), title: "Plasma-Enhanced CVD (PECVD)", posterCount: 10 },
      { id: pid("Atomic Layer Deposition (ALD)"), title: "Atomic Layer Deposition (ALD)", posterCount: 10 },
      { id: pid("Diamond-Like Carbon (DLC)"), title: "Diamond-Like Carbon (DLC)", posterCount: 10 },
      { id: pid("Ion Implantation"), title: "Ion Implantation", posterCount: 10 },
      { id: pid("Electropolishing"), title: "Electropolishing", posterCount: 10 },
      { id: pid("Electroforming"), title: "Electroforming", posterCount: 10 },
    ],
  },
  {
    id: "thermal-spray",
    slug: "thermal-spray",
    title: "Thermal Spray",
    description:
      "Processes that deposit molten or semi-molten material onto a prepared substrate using a high-energy heat source. Covers plasma spray, HVOF, flame spray, arc spray, cold spray, D-gun, SPS, and wire combustion spray.",
    accentColor: "#E84040",
    totalPosters: 80,
    processes: [
      { id: pid("Plasma Spray (APS)"), title: "Plasma Spray (APS)", posterCount: 10 },
      { id: pid("HVOF"), title: "HVOF", posterCount: 10 },
      { id: pid("Flame Spray (Wire / Powder)"), title: "Flame Spray (Wire / Powder)", posterCount: 10 },
      { id: pid("Arc Spray (Twin Wire)"), title: "Arc Spray (Twin Wire)", posterCount: 10 },
      { id: pid("Cold Spray"), title: "Cold Spray", posterCount: 10 },
      { id: pid("Detonation Gun (D-Gun)"), title: "Detonation Gun (D-Gun)", posterCount: 10 },
      { id: pid("Suspension Plasma Spray (SPS)"), title: "Suspension Plasma Spray (SPS)", posterCount: 10 },
      { id: pid("Wire Combustion Spray"), title: "Wire Combustion Spray", posterCount: 10 },
    ],
  },
];

export function getCategory(slug: string): CategoryEntry | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProcess(
  categorySlug: string,
  processId: string
): ProcessEntry | undefined {
  const cat = getCategory(categorySlug);
  return cat?.processes.find((p) => p.id === processId);
}

export const TOTAL_ENGLISH_DESIGNS = CATEGORIES.reduce(
  (sum, c) => sum + c.totalPosters,
  0
);
