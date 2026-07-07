// Watermark preview JPGs with a tiled diagonal "PREVIEW · PLATINGPOSTERS.COM".
// Captured/saved previews stay useful for evaluation but useless as product.
//
// Usage:
//   node watermark-previews.js --test <file.jpg>   watermark one file to <file>.wm-test.jpg (preview the look)
//   node watermark-previews.js --all               watermark every *-preview.jpg in public/posters IN PLACE
//   node watermark-previews.js <file1> [file2...]  watermark specific files in place
//
// NOTE: previews are always regenerable from poster-sources/ via
// generate-previews.js (FORCE=1) — watermarking in place is safe/reversible.
// Do NOT run --all twice without regenerating first (stacks the overlay);
// generate-previews.js applies this watermark automatically on new output.
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const POSTERS_DIR = path.join(__dirname, "public", "posters");

async function watermarkFile(srcPath, outPath) {
  const img = await loadImage(srcPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  applyWatermark(ctx, img.width, img.height);
  fs.writeFileSync(outPath, canvas.toBuffer("image/jpeg", { quality: 0.85 }));
}

function applyWatermark(ctx, w, h) {
  const text = "PREVIEW · PLATINGPOSTERS.COM";
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-Math.PI / 6); // -30°
  ctx.font = `bold ${Math.round(w / 27)}px sans-serif`; // ~44px at 1200w
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // stepX must exceed the rendered text width (~0.62w at this font) so tiles never collide
  const stepX = Math.round(w * 0.78);
  const stepY = Math.round(h * 0.16);
  const span = Math.max(w, h); // cover corners after rotation
  let row = 0;
  for (let y = -span; y <= span; y += stepY, row++) {
    const offset = row % 2 === 0 ? 0 : stepX / 2;
    for (let x = -span; x <= span + stepX; x += stepX) {
      // Dual pass: dark underlay + light overlay stays visible on any background
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fillText(text, x + offset + 1.5, y + 1.5);
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      ctx.fillText(text, x + offset, y);
    }
  }
  ctx.restore();
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "--test" && args[1]) {
    const src = path.resolve(args[1]);
    const out = src.replace(/\.jpg$/i, ".wm-test.jpg");
    await watermarkFile(src, out);
    console.log(`Test watermark written: ${out}`);
    return;
  }
  const files =
    args[0] === "--all"
      ? fs.readdirSync(POSTERS_DIR).filter((f) => f.endsWith("-preview.jpg")).map((f) => path.join(POSTERS_DIR, f))
      : args.map((a) => path.resolve(a));
  if (files.length === 0) {
    console.error("Nothing to do. Use --test <file>, --all, or pass file paths.");
    process.exit(1);
  }
  let done = 0;
  for (const f of files) {
    await watermarkFile(f, f);
    done++;
    if (done % 100 === 0) console.log(`  ${done}/${files.length}...`);
  }
  console.log(`Watermarked ${done} preview(s).`);
}

module.exports = { applyWatermark };
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
