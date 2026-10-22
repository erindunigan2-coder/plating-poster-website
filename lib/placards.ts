// Tank Spec Placards — demo tank data + pricing.
// The four DEMO tanks use generic, non-proprietary chemistry (illustrative
// textbook baths, Dr. Elena spec 2026-09-25). Real customer tanks get their
// own slugs and data after facility setup / tank-list intake.

export type DemoTank = {
  slug: string;
  tankNumber: number;
  name: string;
  makeup: string;
  makeupDetail?: string;
  volume: string;
  temp: string;
  signalWord: "DANGER" | "WARNING";
  hazards: string[];
  ppe: string[];
  image: string;
  transport: string;
  verified: string;
  finePrint: string;
  // Real A Brite Company SDS for a comparable bath chemistry, served as the
  // demo's sample document (Erin's call 2026-10-01). Customer tanks serve
  // their own products' documents.
  sampleSds: { file: string; product: string };
  // Prospect-specific sample tanks (e.g. the QRV set) resolve at /t/<slug>
  // but stay off the public /placards demo gallery.
  unlisted?: boolean;
  // Extra caption when the sample SDS is a chemistry stand-in whose hazard
  // profile differs from the named tank (Dr. Elena referee, 2026-10-22).
  sdsNote?: string;
};

export const DEMO_TANKS: DemoTank[] = [
  {
    slug: "DEMO-01",
    tankNumber: 1,
    name: "Soak Clean",
    makeup: "Sodium Hydroxide / Silicate Blend · 4–8% by volume",
    volume: "500 gal working volume",
    temp: "140–180 °F",
    signalWord: "DANGER",
    hazards: [
      "Corrosive — alkaline bath (GHS05)",
      "Hot — burn hazard (140–180 °F)",
      "Do not add acid — reacts violently",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Apron"],
    image: "/placards/demo-tank-1.jpg",
    transport:
      "Concentrate ships as corrosive liquid, basic, inorganic (Class 8). Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-09-25",
    finePrint:
      "Working-bath hazard shown reflects hot alkaline cleaner service — exact classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/brite-kleen-sc-200l-sds.pdf",
      product: "Brite-Kleen SC-200L (soak cleaner)",
    },
  },
  {
    slug: "DEMO-02",
    tankNumber: 3,
    name: "Acid Pickle",
    makeup: "Hydrochloric Acid · 20–40% by volume",
    volume: "400 gal working volume",
    temp: "70–110 °F (ambient–warm)",
    signalWord: "DANGER",
    hazards: [
      "Corrosive — acid bath (GHS05)",
      "Irritant — vapor / mist (GHS07)",
      "Do not add water — always add acid to water",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Respirator"],
    image: "/placards/demo-tank-3.jpg",
    transport:
      "Concentrate ships as hydrochloric acid solution (Class 8). Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-09-25",
    finePrint:
      "Working-bath hazard shown reflects acid pickling service — exact classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/hydrochloric-acid-22be-sds.pdf",
      product: "Hydrochloric Acid 22BE",
    },
  },
  {
    slug: "DEMO-03",
    tankNumber: 6,
    name: "Bright Nickel",
    makeup: "Nickel Sulfate / Chloride · Boric Acid Buffer",
    makeupDetail: "pH 3.5–4.5 · 3–6 V DC",
    volume: "800 gal working volume",
    temp: "120–150 °F",
    signalWord: "WARNING",
    hazards: [
      "Irritant / sensitizer (GHS07)",
      "May cause allergy / suspect carcinogen (GHS08)",
      "Electrified tank — power off before reaching in",
      "Hot — burn hazard (120–150 °F)",
    ],
    ppe: ["Power off before reaching in", "Goggles", "Gloves", "Face shield"],
    image: "/placards/demo-tank-6.jpg",
    transport:
      "Nickel salt concentrates ship as environmentally hazardous substances (Class 9, where applicable). Transport classification applies to packaged product — not this tank.",
    verified: "2026-09-25",
    finePrint:
      "Working-bath hazard shown reflects electrolytic nickel plating service — sensitizer / carcinogenicity classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/brite-nickel-bni-600-sds.pdf",
      product: "Brite-Nickel BNI-600 (bright nickel additive)",
    },
  },
  {
    slug: "DEMO-04",
    tankNumber: 9,
    name: "Chromate Passivate",
    makeup: "Hexavalent Chromium Conversion · Chromic Acid / Dichromate",
    makeupDetail: "1–4% by volume · pH 1.5–2.5",
    volume: "300 gal working volume",
    temp: "70–100 °F",
    signalWord: "DANGER",
    hazards: [
      "Oxidizer — may intensify fire (GHS03)",
      "Corrosive — acid bath (GHS05)",
      "Carcinogen / toxic (GHS08)",
      "Keep from combustibles",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Apron"],
    image: "/placards/demo-tank-9.jpg",
    transport:
      "Chromic acid / dichromate concentrates ship as oxidizing + toxic (Class 5.1 / 6.1 as classified). Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-09-25",
    finePrint:
      "Working-bath hazard shown reflects hexavalent chromium conversion-coating service — carcinogen / oxidizer classification per the SDS. Cr(VI) is a regulated carcinogen; see SDS and site exposure controls.",
    sampleSds: {
      file: "/placards/sds/brite-guard-dc-70-sds.pdf",
      product: "Brite-Guard DC-70 (liquid chromate)",
    },
  },

  // ---- QRV set: Qorvo prospect sample placards (2026-10-22). Chemistry
  // mirrors the Qorvo sample placard set at Rev A — qualitative only (no
  // acid concentrations, no hard contamination limits, per the project's
  // withheld-data rules). Tank numbers are LINE POSITIONS. Unlisted.
  {
    slug: "QRV-01",
    tankNumber: 1.18,
    name: "Bondal Zincate 1",
    makeup: "Alkaline Zincate — Cyanide-Bearing · Full Strength",
    makeupDetail: "Immersion 20–120 s by alloy · Rev A — verify before qualification",
    volume: "Per facility spec",
    temp: "65–85 °F (ambient)",
    signalWord: "DANGER",
    hazards: [
      "Contains cyanide — contact with acid liberates deadly HCN gas (GHS06)",
      "Corrosive — strong alkaline bath (GHS05)",
      "Never let this solution reach the nitric strip (position 1.21)",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Apron"],
    image: "/placards/demo-tank-1.jpg",
    transport:
      "Cyanide-bearing zincate concentrates ship as corrosive / toxic as classified on the SDS. Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-10-22",
    finePrint:
      "Qorvo sample page — Rev A, verify before qualification. 1.18 is a line position, not a specific gravity. Working-bath hazard reflects cyanide-bearing alkaline zincate service — exact classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/potassium-zincate-460-sds.pdf",
      product: "Potassium Zincate Concentrate 460 (comparable alkaline zincate)",
    },
    unlisted: true,
  },
  {
    slug: "QRV-02",
    tankNumber: 1.21,
    name: "Nitric Acid Strip",
    makeup: "Nitric Acid Strip — Strength per Qualified Spec",
    makeupDetail: "Strips the first zincate film · Rev A — verify before qualification",
    volume: "Per facility spec",
    temp: "Ambient",
    signalWord: "DANGER",
    hazards: [
      "CYANIDE + ACID = DEADLY HCN GAS — this tank sits between two cyanide zincates (1.18 / 1.24)",
      "Never cross-rack; never let zincate solution enter this tank",
      "Oxidizer — may intensify fire (GHS03)",
      "Corrosive — acid bath (GHS05)",
      "Local exhaust required — acid strip can evolve nitrogen oxide (NOx) fumes; keep lid / ventilation controls in service",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Apron"],
    image: "/placards/demo-tank-3.jpg",
    transport:
      "Nitric acid concentrate ships as an oxidizing, corrosive liquid (Class 8 / 5.1 as classified). Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-10-22",
    finePrint:
      "Qorvo sample page — Rev A, verify before qualification. 1.21 is a line position, not a specific gravity. Acid strength is withheld pending qualification. Sample SDS is for a comparable A Brite acid deoxidizer bath.",
    sampleSds: {
      file: "/placards/sds/brite-kleen-apt-deox-nc-620-sds.pdf",
      product: "Brite-Kleen APT-DEOX NC-620 (comparable oxidizing acid deoxidizer)",
    },
    sdsNote:
      "NC-620 is a ferric sulfate / sulfuric / nitric acid deoxidizer shown as a representative acid-bath SDS — it is not the nitric strip's own document, and it carries classifications (e.g. acid-mist carcinogenicity) that a straight nitric strip does not. Your subscription serves this tank's actual SDS.",
    unlisted: true,
  },
  {
    slug: "QRV-03",
    tankNumber: 1.24,
    name: "Bondal Zincate 2",
    makeup: "Alkaline Zincate — Cyanide-Bearing · Full Strength",
    makeupDetail: "Second, finer zincate film · Rev A — verify before qualification",
    volume: "Per facility spec",
    temp: "65–85 °F (ambient)",
    signalWord: "DANGER",
    hazards: [
      "Contains cyanide — contact with acid liberates deadly HCN gas (GHS06)",
      "Corrosive — strong alkaline bath (GHS05)",
      "Rinse before the strike — cyanide must never ride into the acid side",
    ],
    ppe: ["Goggles", "Gloves", "Face shield", "Apron"],
    image: "/placards/demo-tank-1.jpg",
    transport:
      "Cyanide-bearing zincate concentrates ship as corrosive / toxic as classified on the SDS. Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-10-22",
    finePrint:
      "Qorvo sample page — Rev A, verify before qualification. 1.24 is a line position, not a specific gravity. Working-bath hazard reflects cyanide-bearing alkaline zincate service — exact classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/potassium-zincate-460-sds.pdf",
      product: "Potassium Zincate Concentrate 460 (comparable alkaline zincate)",
    },
    unlisted: true,
  },
  {
    slug: "QRV-04",
    tankNumber: 1.28,
    name: "Cyanide Copper Strike",
    makeup: "Brite-Copper CN-707 · Cyanide Copper Strike",
    makeupDetail: "Heated bath — setpoint finalized at qualification · Rev A",
    volume: "Per facility spec",
    temp: "Heated bath",
    signalWord: "DANGER",
    hazards: [
      "Contains cyanide — contact with acid liberates deadly HCN gas (GHS06)",
      "Electrified tank — power off before reaching in",
      "Hot — burn hazard",
      "Corrosive — alkaline bath (GHS05)",
    ],
    ppe: ["Power off before reaching in", "Goggles", "Gloves", "Face shield"],
    image: "/placards/demo-tank-6.jpg",
    transport:
      "Cyanide copper concentrates ship as toxic (Class 6.1 as classified). Transport classification applies to the packaged concentrate — not this tank.",
    verified: "2026-10-22",
    finePrint:
      "Qorvo sample page — Rev A, verify before qualification. 1.28 is a line position, not a specific gravity. Operating setpoints are finalized at qualification — exact classification per the SDS.",
    sampleSds: {
      file: "/placards/sds/brite-copper-cn-707-sds.pdf",
      product: "Brite-Copper CN-707 (cyanide copper strike)",
    },
    unlisted: true,
  },
];

export function getDemoTank(slug: string): DemoTank | undefined {
  return DEMO_TANKS.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

// ---------------------------------------------------------------- pricing
// Two sizes: Standard 18×12 (the across-the-aisle read, recommended) and
// Compact 11×8.5 (tight spaces, cell dividers, small tanks). Two finishes
// since 2026-10-01 (printer costs in hand, Erin's call): Shop Tough is
// 3mm PVC Sintra at the old entry price (card stock and styrene retired
// for placards — poster Shop Tough is still .030 styrene), Aluminum is
// .040 aluminum. Laminate overcoat is part of the printer's construction
// but not part of the marketed description (Erin, 2026-10-02). Reprints
// are priced per finish and size; Shop Tough standard stays at the
// published $29.
export type PlacardSizeKey = "standard" | "compact";

export const PLACARD_PRICING = {
  sizes: [
    {
      key: "standard" as PlacardSizeKey,
      label: "Standard",
      dims: "18″ × 12″",
      note: "readable across the aisle",
      recommended: true,
    },
    {
      key: "compact" as PlacardSizeKey,
      label: "Compact",
      dims: "11″ × 8.5″",
      note: "tight spots & small tanks",
      recommended: false,
    },
  ],
  finishes: [
    {
      key: "shopTough",
      label: "Shop Tough",
      material: "rigid, waterproof 3mm PVC",
      prices: { standard: 39, compact: 29 },
      recommended: true,
    },
    {
      key: "aluminum",
      label: "Aluminum",
      material: ".040 aluminum",
      prices: { standard: 99, compact: 79 },
    },
  ],
  volumeBreaks: [
    { min: 10, discount: 0.1 },
    { min: 25, discount: 0.15 },
  ],
  setupFee: 199,
  reprints: [
    { finishKey: "shopTough", label: "Shop Tough", prices: { standard: 29, compact: 19 } },
    { finishKey: "aluminum", label: "Aluminum", prices: { standard: 59, compact: 39 } },
  ],
  reprintShippingNote:
    "Reprints ship $9.95 flat — free with any other order, or on 3+ reprints.",
  subscription: [
    { maxTanks: 10, price: 249, label: "Up to 10 tanks" },
    { maxTanks: 25, price: 399, label: "11–25 tanks" },
    { maxTanks: 50, price: 599, label: "26–50 tanks" },
  ],
} as const;

export function estimateSet(
  tanks: number,
  finishKey: string,
  sizeKey: PlacardSizeKey = "standard",
) {
  const finish =
    PLACARD_PRICING.finishes.find((f) => f.key === finishKey) ??
    PLACARD_PRICING.finishes[0];
  const size =
    PLACARD_PRICING.sizes.find((s) => s.key === sizeKey) ?? PLACARD_PRICING.sizes[0];
  let discount = 0;
  for (const b of PLACARD_PRICING.volumeBreaks) {
    if (tanks >= b.min) discount = b.discount;
  }
  const placards = Math.round(tanks * finish.prices[size.key] * (1 - discount));
  const sub =
    PLACARD_PRICING.subscription.find((s) => tanks <= s.maxTanks) ??
    PLACARD_PRICING.subscription[PLACARD_PRICING.subscription.length - 1];
  return {
    placards,
    discount,
    setup: PLACARD_PRICING.setupFee,
    subscription: sub.price,
    firstYear: placards + PLACARD_PRICING.setupFee + sub.price,
    renewal: sub.price,
    finishLabel: finish.label,
    sizeLabel: `${size.label} ${size.dims}`,
  };
}
