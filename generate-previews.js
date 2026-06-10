const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const POSTERS_DIR = path.join(__dirname, "public", "posters");
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 1800;

// ── ID overrides for step names that don't match simple kebab ──
const STEP_OVERRIDES = {
  "dec-chrome|decorative-chrome-demystified": "demystified",
  "dec-chrome|cleaning-and-electroclean": "cleaning",
  "dec-chrome|duplex-and-triplex-nickel": "duplex-triplex-nickel",
  "dec-chrome|rinse-and-post-treatment": "rinse-post-treatment",
  "dec-chrome|quality-control-and-testing": "quality-control",
  "hard-chrome|racking-fixturing-and-masking": "racking",
  "hard-chrome|alkaline-soak-clean": "soak-clean",
  "hard-chrome|electrocleaning": "electroclean",
  "hard-chrome|acid-activation-etch": "acid-activation",
  "hard-chrome|hard-chrome-plating": "plating",
  "hard-chrome|current-ramp-up-and-etch-strike": "ramp-up",
  "hard-chrome|post-plate-rinse-and-recovery": "post-rinse",
  "hard-chrome|hydrogen-embrittlement-relief": "he-relief",
  "hard-chrome|grinding-and-final-finishing": "grinding",
  "hard-chrome|quality-control-and-inspection": "quality-control",
  "en-high-phos|electroless-nickel-demystified": "demystified",
  "en-mid-phos|electroless-nickel-demystified": "demystified",
  "znni-acid|drag-out-recovery-and-rinse": "drag-out",
  "znni-acid|trivalent-passivation": "passivation",
  "znni-acid|sealer-top-coat": "sealer",
  "znni-acid|he-bake-and-inspection": "he-bake",
  "znni-acid|zinc-nickel-plate": "plate",
  "znni-alk|drag-out-recovery-and-rinse": "drag-out",
  "znni-alk|trivalent-passivation": "passivation",
  "znni-alk|sealer-top-coat": "sealer",
  "znni-alk|he-bake-and-inspection": "he-bake",
  "znni-alk|zinc-nickel-plate": "plate",
  "acid-zinc|acid-zinc-plating": "plating",
  "acid-zinc|passivate": "passivate",
  "zinc-alk|alkaline-zinc-plating": "plating",
  "zinc-alk|passivate": "passivate",
  "anodize|cleaning-and-etch": "cleaning-and-etch",
  "anodize|desmut-deoxidize": "desmut-deoxidize",
  "anodize|dye-color": "dye-color",
  "bright-nickel|bright-nickel-plating": "plating",
  "genknow|surface-preparation-fundamentals": "surface-preparation",
  "genknow|water-quality-and-rinse-theory": "water-quality",
  "genknow|substrate-metallurgy-for-the-plater": "substrate-metallurgy",
  "genknow|rectifier-and-power-supply-fundamentals": "rectifier-fundamentals",
  "genknow|current-distribution-and-throwing-power": "current-distribution",
  "genknow|barrel-vs-rack-plating": "barrel-vs-rack",
  "genknow|drag-out-reduction-and-chemical-conservation": "drag-out-reduction",
  "genknow|coating-thickness-measurement-methods": "thickness-measurement",
  "genknow|bath-analysis-and-titration-fundamentals": "bath-analysis",
  "genknow|troubleshooting-framework-for-plating-defects": "troubleshooting",
  "genknow|wastewater-treatment-basics-for-plating-shops": "wastewater",
  "genknow|chemical-safety-in-the-plating-shop": "chemical-safety",
  "genknow|conversion-coatings-and-passivation-overview": "conversion-coatings",
  "genknow|specifications-and-standards-quick-reference": "specifications",
  "type-ii|sulfuric-acid-anodizing-type-ii-demystified": "demystified",
  "hardcoat|hardcoat-anodizing-type-iii-demystified": "demystified",
  "type-i|chromic-acid-anodizing-type-i-demystified": "demystified",
  "bsaa|boric-sulfuric-acid-anodizing-bsaa-demystified": "demystified",
  "paa|phosphoric-acid-anodizing-paa-demystified": "demystified",
  "bright-anod|bright-anodizing-demystified": "demystified",
  "integ-color|integral-color-anodizing-demystified": "demystified",
  "2-step-color|two-step-electrolytic-color-anodizing-demystified": "demystified",
  // ── EN Low Phos demystified (TECHNICAL) ──
  "en-low-phos|electroless-nickel-demystified": "demystified",
  // ── Conversion coating demystified (English step names in ES files) ──
  "alodine|aluminum-conversion-coating-chem-film-demystified": "demystified",
  "black-oxide|black-oxide-steel-demystified": "demystified",
  "hex-chrome|hexavalent-chromate-conversion-demystified": "demystified",
  "iron-phos|iron-phosphate-demystified": "demystified",
  "mn-phos|manganese-phosphate-demystified": "demystified",
  "passivation|passivation-stainless-steel-demystified": "demystified",
  "tri-chrome|trivalent-chromate-conversion-demystified": "demystified",
  "zinc-phos|zinc-phosphate-demystified": "demystified",
  // ── Spanish-titled demystified (Desmitificado) in ES HTML files ──
  "type-ii|anodizado-con-acido-sulfurico-tipo-ii-desmitificado": "demystified",
  "hardcoat|anodizado-hardcoat-tipo-iii-desmitificado": "demystified",
  "type-i|anodizado-con-acido-cromico-tipo-i-desmitificado": "demystified",
  "bsaa|anodizado-borico-sulfurico-bsaa-desmitificado": "demystified",
  "paa|anodizado-con-acido-fosforico-paa-desmitificado": "demystified",
  "bright-anod|anodizado-brillante-desmitificado": "demystified",
  "integ-color|anodizado-color-integral-desmitificado": "demystified",
  "2-step-color|anodizado-color-electrolitico-dos-pasos-desmitificado": "demystified",
  "zinc-alk|zinc-alcalino-desmitificado": "demystified",
  "acid-zinc|zinc-acido-desmitificado": "demystified",
  "znni|zinc-niquel-desmitificado": "demystified",
  "bright-nickel|niquel-brillante-desmitificado": "demystified",
};

function toSlug(s) {
  return s
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Parse new-format: "Series - ## - TYPE - Step - EN/ES - Dark.html" ──
function parseNewFormat(filename) {
  const m = filename.match(
    /^(.+?) - (\d+) - (SHOP FLOOR|TECHNICAL) - (.+?) - (EN|ES) - (Dark|Light)\.html$/
  );
  if (!m) return null;
  const [, series, , type, stepName, lang, edition] = m;
  const seriesSlug = toSlug(series);
  let stepSlug = toSlug(stepName);
  const sfPrefix = type === "SHOP FLOOR" ? "sf-" : "";
  const key = `${seriesSlug}|${stepSlug}`;
  if (STEP_OVERRIDES[key]) stepSlug = STEP_OVERRIDES[key];
  const langPrefix = lang === "ES" ? "es-" : "";
  return { posterId: `${seriesSlug}-${sfPrefix}${stepSlug}`, edition: `${langPrefix}${edition.toLowerCase()}` };
}

// ── Parse EN Low Phos shop floor: "EN Low Phos - ## - SHOP FLOOR - Step - Claude Design Ready - Dark.html" ──
function parseENLowPhosShopFloor(filename) {
  const m = filename.match(
    /^EN Low Phos - (\d+) - SHOP FLOOR - (.+?) - Claude Design Ready - (Dark|Light)\.html$/
  );
  if (!m) return null;
  const [, , stepName, edition] = m;
  const stepMap = {
    "Electroless Nickel Demystified": "demystified",
    "Process Flow": "process-flow",
    Cleaning: "cleaning",
    "Rinse Pre-Activation": "rinse-pre-activation",
    Activation: "activation",
    "Critical Rinse": "critical-rinse",
    "EN Bath": "en-bath",
    "Final Rinse": "final-rinse",
    "Post Treatment": "post-treatment",
  };
  const slug = stepMap[stepName] || toSlug(stepName);
  return { posterId: `en-low-phos-sf-${slug}`, edition: edition.toLowerCase() };
}

// ── Parse old shop floor: "shop-{slug}-en.html" ──
function parseOldShopFloor(filename) {
  const m = filename.match(/^shop-(.+)-en\.html$/);
  if (!m) return null;
  return { posterId: m[1], edition: "dark" }; // single edition, treat as dark
}

// ── Parse old shop floor Spanish: "shop-{slug}-es.html" ──
function parseOldShopFloorEs(filename) {
  const m = filename.match(/^shop-(.+)-es\.html$/);
  if (!m) return null;
  return { posterId: m[1], edition: "es-dark" }; // single edition, treat as es-dark
}

// ── Parse "Claude Design Ready" ES format ──
// e.g. "EN Low Phos - 01 - SHOP FLOOR - Process Flow - ES - Claude Design Ready - Dark.html"
// Also handles em-dash variants: "EN Low Phos — 01 — Process Flow — ES — Claude Design Ready — Dark.html"
function parseClaudeDesignReadyEs(filename) {
  // Standard hyphen-dash format
  const m = filename.match(
    /^(.+?) - (\d+) - SHOP FLOOR - (.+?) - ES - Claude Design Ready - (Dark|Light)\.html$/
  );
  if (m) {
    const [, series, , stepName, edition] = m;
    const seriesSlug = toSlug(series);
    const stepSlug = toSlug(stepName);

    // EN Low Phos shop floor
    if (seriesSlug === "en-low-phos") {
      const stepMap = {
        "process-flow": "process-flow",
        "cleaning": "cleaning",
        "rinse-pre-activation": "rinse-pre-activation",
        "activation": "activation",
        "critical-rinse": "critical-rinse",
        "en-bath": "en-bath",
        "final-rinse": "final-rinse",
        "post-treatment": "post-treatment",
        "electroless-nickel-demystified": "demystified",
      };
      const slug = stepMap[stepSlug] || stepSlug;
      return { posterId: `en-low-phos-sf-${slug}`, edition: `es-${edition.toLowerCase()}` };
    }

    // Generic: not used for poster ID mapping currently but future-proof
    return null;
  }

  // Em-dash variant: "EN Low Phos — 01 — Process Flow — ES — Claude Design Ready — Dark.html"
  const m2 = filename.match(
    /^(.+?) \u2014 (\d+) \u2014 (.+?) \u2014 ES \u2014 Claude Design Ready \u2014 (Dark|Light)\.html$/
  );
  if (m2) {
    const [, series, , stepName, edition] = m2;
    const seriesSlug = toSlug(series);
    const stepSlug = toSlug(stepName);
    if (seriesSlug === "en-low-phos") {
      const stepMap = {
        "process-flow": "process-flow",
        "cleaning": "cleaning",
        "rinse-pre-activation": "rinse-pre-activation",
        "activation": "activation",
        "critical-rinse": "critical-rinse",
        "en-bath": "en-bath",
        "final-rinse": "final-rinse",
        "post-treatment": "post-treatment",
      };
      const slug = stepMap[stepSlug] || stepSlug;
      return { posterId: `en-low-phos-sf-${slug}`, edition: `es-${edition.toLowerCase()}` };
    }
    return null;
  }

  return null;
}

function buildFileMap() {
  const allFiles = fs.readdirSync(POSTERS_DIR).filter((f) => f.endsWith(".html"));
  const fileMap = {}; // posterId -> { dark: filename, light: filename }

  for (const f of allFiles) {
    let result =
      parseNewFormat(f) || parseENLowPhosShopFloor(f) || parseOldShopFloor(f) || parseOldShopFloorEs(f) || parseClaudeDesignReadyEs(f);
    if (!result) continue;
    const { posterId, edition } = result;
    if (!fileMap[posterId]) fileMap[posterId] = {};
    fileMap[posterId][edition] = f;
  }
  return fileMap;
}

function getAllPosterIds() {
  const content = fs.readFileSync(path.join(__dirname, "lib", "posters.ts"), "utf8");
  const ids = [];
  const regex = /id:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(content)) !== null) ids.push(m[1]);
  return new Set(ids);
}

async function main() {
  const allIds = getAllPosterIds();
  console.log(`${allIds.size} posters in registry`);

  const fileMap = buildFileMap();

  const toProcess = [];
  const missing = [];
  for (const id of allIds) {
    if (fileMap[id]) {
      toProcess.push({ id, files: fileMap[id] });
    } else {
      missing.push(id);
    }
  }

  console.log(`Matched: ${toProcess.length}`);
  if (missing.length > 0) {
    console.log(`Unmatched (${missing.length}):`);
    missing.forEach((id) => console.log(`  - ${id}`));
  }

  if (toProcess.length === 0) return;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  let done = 0;
  let generated = 0;
  const total = toProcess.reduce(
    (n, p) => n + Object.keys(p.files).length,
    0
  );

  for (const { id, files } of toProcess) {
    for (const [edition, filename] of Object.entries(files)) {
      const SUFFIX_MAP = {
        "dark": "-preview.jpg",
        "light": "-light-preview.jpg",
        "es-dark": "-es-preview.jpg",
        "es-light": "-es-light-preview.jpg",
      };
      const suffix = SUFFIX_MAP[edition] || "-preview.jpg";
      const outPath = path.join(POSTERS_DIR, `${id}${suffix}`);
      done++;

      if (fs.existsSync(outPath)) continue;

      const htmlPath = path.join(POSTERS_DIR, filename);
      const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;

      try {
        const page = await browser.newPage();
        await page.setViewport({
          width: OUTPUT_WIDTH,
          height: OUTPUT_HEIGHT,
          deviceScaleFactor: 1,
        });
        await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);

        // Hide the tweaks panel so it doesn't appear in previews
        await page.evaluate(() => {
          const tweaks = document.querySelector('.tweaks');
          if (tweaks) tweaks.style.display = 'none';
        });

        // Small delay for rendering
        await new Promise((r) => setTimeout(r, 500));

        await page.screenshot({
          path: outPath,
          type: "jpeg",
          quality: 85,
          clip: { x: 0, y: 0, width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT },
        });

        await page.close();
        generated++;
        if (generated % 20 === 0 || done === total) {
          console.log(`  [${done}/${total}] Generated: ${generated} — last: ${id} (${edition})`);
        }
      } catch (err) {
        console.error(`  ERROR: ${id} (${edition}): ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log(`\nDone! Generated ${generated} new preview images.`);
}

main().catch(console.error);
