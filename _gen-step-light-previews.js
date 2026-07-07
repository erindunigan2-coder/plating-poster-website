// One-off: generate LIGHT-edition previews for the step ("shop-*") posters so
// LineOrderForm can show light previews as images instead of iframing raw HTML.
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const POSTERS_DIR = path.join(__dirname, "public", "posters");
const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 1800;

async function main() {
  const files = fs.readdirSync(POSTERS_DIR).filter((f) => /^shop-.+-en\.html$/.test(f));
  console.log(`${files.length} step posters found`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  let generated = 0, skipped = 0, failed = 0;
  for (const f of files) {
    const id = f.match(/^shop-(.+)-en\.html$/)[1];
    const outPath = path.join(POSTERS_DIR, `${id}-light-preview.jpg`);
    if (fs.existsSync(outPath)) { skipped++; continue; }

    const fileUrl = `file:///${path.join(POSTERS_DIR, f).replace(/\\/g, "/")}#light`;
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
