// One-off: generate LIGHT-edition previews for the step ("shop-*") posters so
// LineOrderForm can show light previews as images instead of iframing raw HTML.
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { applyWatermark } = require("./watermark-previews");
const { createCanvas, loadImage } = require("canvas");

// HTML sources moved out of the web root (artwork protection, 2026-07-07)
const SOURCES_DIR = path.join(__dirname, "poster-sources");
const OUTPUT_DIR = path.join(__dirname, "public", "posters");
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 1800;

async function main() {
  const files = fs.readdirSync(SOURCES_DIR).filter((f) => /^shop-.+-en\.html$/.test(f));
  console.log(`${files.length} step posters found`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  let generated = 0, skipped = 0, failed = 0;
  for (const f of files) {
    const id = f.match(/^shop-(.+)-en\.html$/)[1];
    const outPath = path.join(OUTPUT_DIR, `${id}-light-preview.jpg`);
    if (fs.existsSync(outPath)) { skipped++; continue; }

    const fileUrl = `file:///${path.join(SOURCES_DIR, f).replace(/\\/g, "/")}#light`;
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT, deviceScaleFactor: 1 });
      await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 500));
      await page.evaluate(() => {
        document.querySelectorAll(".tweaks, #tweaks-root").forEach((el) => { el.style.display = "none"; });
      });
      await page.screenshot({
        path: outPath, type: "jpeg", quality: 85,
        clip: { x: 0, y: 0, width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT },
      });
      // Watermark (artwork protection — previews must not be usable reproductions)
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
      if (generated % 20 === 0) console.log(`  generated ${generated}...`);
    } catch (err) {
      failed++;
      console.error(`  ERROR ${id}: ${err.message}`);
    }
  }
  await browser.close();
  console.log(`Done. Generated ${generated}, skipped ${skipped} existing, failed ${failed}.`);
}
main().catch((e) => { console.error(e); process.exit(1); });
