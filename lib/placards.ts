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
  },
];

export function getDemoTank(slug: string): DemoTank | undefined {
  return DEMO_TANKS.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

// ---------------------------------------------------------------- pricing
export const PLACARD_PRICING = {
  finishes: [
    { key: "matte", label: "Matte Laminate", price: 39 },
    { key: "shopTough", label: "Shop Tough", price: 49, recommended: true },
    { key: "aluminum", label: "Aluminum Composite", price: 99 },
  ],
  volumeBreaks: [
    { min: 10, discount: 0.1 },
    { min: 25, discount: 0.15 },
  ],
  setupFee: 199,
  reprint: 29,
  subscription: [
    { maxTanks: 10, price: 249, label: "Up to 10 tanks" },
    { maxTanks: 25, price: 399, label: "11–25 tanks" },
    { maxTanks: 50, price: 599, label: "26–50 tanks" },
  ],
} as const;

export function estimateSet(tanks: number, finishKey: string) {
  const finish =
    PLACARD_PRICING.finishes.find((f) => f.key === finishKey) ??
    PLACARD_PRICING.finishes[1];
  let discount = 0;
  for (const b of PLACARD_PRICING.volumeBreaks) {
    if (tanks >= b.min) discount = b.discount;
  }
  const placards = Math.round(tanks * finish.price * (1 - discount));
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
  };
}
