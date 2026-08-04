const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { applyWatermark } = require("./watermark-previews");
const { createCanvas, loadImage } = require("canvas");

// Poster HTML sources live OUTSIDE the web root (poster-sources/) so the
// sellable artwork is never served to browsers — only the generated
// screen-resolution preview JPGs in public/posters/ are public.
// (Files in poster-sources/_wip/ are in-progress rebuilds and are not scanned.)
const SOURCES_DIR = path.join(__dirname, "poster-sources");
// OUTPUT_DIR can be overridden (e.g. to a temp dir) for test renders that must
// not touch the public previews.
const OUTPUT_DIR = process.env.OUTPUT_DIR || path.join(__dirname, "public", "posters");
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 1800;
// Set FORCE=1 to regenerate every preview even if the .jpg already exists
// (use after changing the screenshot/hide logic so stale previews get refreshed).
const FORCE = process.env.FORCE === "1";
// Set DRY_RUN=1 to print the filename -> posterId/edition mapping and exit
// without launching a browser (use to verify parser changes).
const DRY_RUN = process.env.DRY_RUN === "1";
// Set ONLY=id1,id2 to restrict processing to specific posterIds (targeted
// regeneration / test renders).
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;

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
  // ── Safety series ──
  "safety|cyanide-safety-never-add-acid": "cyanide",
  "safety|hexavalent-chromium-protect-your-lungs": "hex-chrome",
  "safety|acid-tank-burns-skin-and-eye-protection": "acid-burns",
  "safety|emergency-eyewash-and-shower-act-in-seconds": "eyewash",
  "safety|cyanide-waste-segregation-and-disposal": "cyanide-waste",
  "safety|cadmium-plating-zero-tolerance-exposure": "cadmium",
  "safety|nickel-dermatitis-skin-protection": "nickel-dermatitis",
  "safety|alkaline-cleaner-burns": "alkaline-burns",
  "safety|nitric-acid-and-nox-the-invisible-danger": "nitric-acid",
  "safety|hydrogen-embrittlement-baking-oven-safety": "he-baking",
  "safety|anodize-line-sulfuric-acid-and-electrical-hazards": "anodize-line",
  "safety|electropolishing-concentrated-acid-mixtures": "electropolishing",
  "safety|chemical-mixing-order-of-addition-matters": "chemical-mixing",
  "safety|confined-space-tank-entry-and-cleaning": "confined-space",
  "safety|electrical-safety-rectifiers-and-bus-bars": "electrical",
  "safety|ventilation-failure-what-to-do-when-the-air-stops": "ventilation",
  "safety|spill-response-know-your-chemical-know-your-kit": "spill-response",
  "safety|compressed-gas-nitrogen-air-and-hydrogen-safety": "compressed-gas",
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
  // The "00" overview poster of every series is the Demystified poster. Its step
  // name varies ("Acid Zinc Plating Demystified", "Zinc Acido Desmitificado",
  // etc.); normalize any EN/ES "...demystified/desmitificado" step to the
  // canonical "demystified" slug so every series maps without a per-series override.
  if (/(demystified|desmitificado)$/.test(stepSlug)) stepSlug = "demystified";
  const langPrefix = lang === "ES" ? "es-" : "";
  return { posterId: `${seriesSlug}-${sfPrefix}${stepSlug}`, edition: `${langPrefix}${edition.toLowerCase()}` };
}

// ── Parse EN Low Phos shop floor: "EN Low Phos - ## - SHOP FLOOR - Step - Claude Design Ready - Dark.html" ──
// English files only — Spanish variants ("... - Step - ES - Claude Design
// Ready - ...") belong to parseClaudeDesignReadyEs. Without this guard the
// lazy (.+?) step group swallows the " - ES" token and produces bogus
// posterIds like "en-low-phos-sf-process-flow-es".
function parseENLowPhosShopFloor(filename) {
  if (/ - ES - /.test(filename)) return null;
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
  const allFiles = fs.readdirSync(SOURCES_DIR).filter((f) => f.endsWith(".html"));
  const fileMap = {}; // posterId -> { dark: filename, light: "filename#light", ... }

  for (const f of allFiles) {
    // Order matters: parseClaudeDesignReadyEs must run before
    // parseENLowPhosShopFloor so ES low-phos filenames are claimed by the ES
    // parser (the EN parser also guards against " - ES - " internally).
    let result =
      parseNewFormat(f) || parseClaudeDesignReadyEs(f) || parseENLowPhosShopFloor(f) || parseOldShopFloor(f) || parseOldShopFloorEs(f);
    if (!result) continue;
    const { posterId, edition } = result;
    if (!fileMap[posterId]) fileMap[posterId] = {};
    fileMap[posterId][edition] = f;

    // Old-format singletons ("shop-*-en.html") carry both editions in one
    // file: the light edition is the standard data-edition="light" variant,
    // toggled at load time by the file's own "#light" hash handler. Register
    // it so -light-preview.jpg files are regenerable by this pipeline.
    if (parseOldShopFloor(f) && edition === "dark") {
      fileMap[posterId]["light"] = `${f}#light`;
    }
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
    if (ONLY && !ONLY.has(id)) continue;
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

  if (DRY_RUN) {
    for (const { id, files } of toProcess) {
      for (const [edition, filename] of Object.entries(files)) {
        console.log(`  ${id} [${edition}] <- ${filename}`);
      }
    }
    return;
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
      const outPath = path.join(OUTPUT_DIR, `${id}${suffix}`);
      done++;

      if (!FORCE && fs.existsSync(outPath)) continue;

      // Old-format light editions are registered as "filename.html#light" —
      // the hash triggers the file's own data-edition="light" toggle.
      const [fname, hash] = filename.split("#");
      const htmlPath = path.join(SOURCES_DIR, fname);
      const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}${hash ? "#" + hash : ""}`;

      try {
        const page = await browser.newPage();
        await page.setViewport({
          width: OUTPUT_WIDTH,
          height: OUTPUT_HEIGHT,
          deviceScaleFactor: 1,
        });
        await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);

        // Small delay for rendering (let React-based panels mount first)
        await new Promise((r) => setTimeout(r, 500));

        // Hide the edition/print toggle panel so it doesn't appear in previews.
        // Standard template uses .tweaks; "Claude Design Ready" React template
        // mounts its panel into #tweaks-root. Hide both, after React has mounted.
        await page.evaluate(() => {
          document
            .querySelectorAll('.tweaks, #tweaks-root')
            .forEach((el) => { el.style.display = 'none'; });
        });

        // ── Fit normalization (2026-07-28) ──────────────────────────────────
        // Several older stage templates mis-place the poster in the capture
        // viewport (same transform-origin class of bug fixed for the Busbar
        // series on 2026-06-24):
        //   * old singletons ("shop-*", "Claude Design Ready") flex-center the
        //     UNSCALED 900x1200 layout box, then scale from transform-origin
        //     top — poster renders y=300..1900: ~16% black band on top, footer
        //     cropped off the bottom;
        //   * some SF templates top-anchor the poster (align-items:flex-start)
        //     leaving a large black slab at the bottom;
        //   * EN Low Phos SF has no scale script at all (renders tiny).
        // Measure the rendered poster; if it is fully visible, centered, and
        // at best-fit scale (the geometry the well-rendered sf-/safety
        // templates produce: 1176x1568 at 12,116 for a 900x1200 poster), leave
        // it byte-for-byte alone. Otherwise re-fit it to exactly that
        // geometry. Band/frame color stays the page background, matching the
        // correct templates (dark frame even on light editions).
        await page.evaluate((W, H) => {
          const poster = document.getElementById("poster") || document.querySelector(".poster");
          if (!poster) return;
          const MARGIN = 24; // total frame allowance, matches good templates
          const r = poster.getBoundingClientRect();
          const s = Math.min((W - MARGIN) / poster.offsetWidth, (H - MARGIN) / poster.offsetHeight);
          const fits = r.top >= -1 && r.left >= -1 && r.bottom <= H + 1 && r.right <= W + 1;
          const centered =
            Math.abs((r.left + r.right) / 2 - W / 2) <= 20 &&
            Math.abs((r.top + r.bottom) / 2 - H / 2) <= 20;
          const filled = r.height >= poster.offsetHeight * s * 0.95;
          if (fits && centered && filled) return; // well-rendered path — do not touch
          // Re-parent to <body>: the broken templates re-run their own
          // scalePoster() on window resize (the screenshot machinery can fire
          // one), which would re-transform the wrap and displace the poster.
          // As a direct child of <body> (no transformed ancestor) the fixed
          // poster is immune to that.
          const pw = poster.offsetWidth, ph = poster.offsetHeight;
          document.body.appendChild(poster);
          poster.style.position = "fixed";
          poster.style.top = "0";
          poster.style.left = "0";
          poster.style.margin = "0";
          poster.style.transformOrigin = "top left";
          const tx = (W - pw * s) / 2;
          const ty = (H - ph * s) / 2;
          poster.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
        }, OUTPUT_WIDTH, OUTPUT_HEIGHT);

        await page.screenshot({
          path: outPath,
          type: "jpeg",
          quality: 85,
          clip: { x: 0, y: 0, width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT },
          // Default (true) resizes the render surface, firing a resize event
          // that lets template scale scripts reflow mid-capture.
          captureBeyondViewport: false,
        });

        // Watermark every preview — captured/saved previews must be obviously
        // previews, not usable poster reproductions (artwork protection).
        {
          const img = await loadImage(outPath);
          const canvas = createCanvas(img.width, img.height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          applyWatermark(ctx, img.width, img.height);
          fs.writeFileSync(outPath, canvas.toBuffer("image/jpeg", { quality: 0.85 }));
        }

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
