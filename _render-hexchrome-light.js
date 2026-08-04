const puppeteer = require('puppeteer');
const path = require('path');

const SRC = 'C:/Users/EDUNIGAN/Desktop/ABrite Life/PLATING POSTERS/_MARKETING/PP_LinkedIn_HexChrome_Light_1080x1080.html';
const OUT_1X = 'C:/Users/EDUNIGAN/Desktop/ABrite Life/PLATING POSTERS/_MARKETING/PP_LinkedIn_HexChrome_Light_1080x1080.png';
const OUT_2X = 'C:/Users/EDUNIGAN/Desktop/ABrite Life/PLATING POSTERS/_MARKETING/PP_LinkedIn_HexChrome_Light_2160x2160.png';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const [out, dsf] of [[OUT_1X, 1], [OUT_2X, 2]]) {
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: dsf });
    await page.goto('file:///' + SRC.replace(/ /g, '%20'), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));

    // clip / overflow check
    const issues = await page.evaluate(() => {
      const probs = [];
      const canvas = document.querySelector('.canvas');
      if (canvas.scrollWidth > 1080 || canvas.scrollHeight > 1080)
        probs.push(`canvas overflow ${canvas.scrollWidth}x${canvas.scrollHeight}`);
      document.querySelectorAll('.canvas *').forEach(el => {
        const r = el.getBoundingClientRect();
        if (el.classList.contains('tack')) return; // tacks intentionally overhang the card, not the canvas
        if (r.right > 1080.5 || r.bottom > 1080.5 || r.left < -0.5 || r.top < -0.5) {
          probs.push(`${el.className || el.tagName} outside canvas: ${JSON.stringify({l: r.left|0, t: r.top|0, r: r.right|0, b: r.bottom|0})}`);
        }
        // text clipped by its own box (horizontal)
        if (el.children.length === 0 && el.textContent.trim() && el.scrollWidth > el.clientWidth + 1)
          probs.push(`text clip in ${el.className}: scrollW ${el.scrollWidth} > clientW ${el.clientWidth}`);
      });
      return probs;
    });
    console.log(`[${dsf}x] issues:`, issues.length ? issues : 'none');

    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    console.log(`[${dsf}x] wrote ${out}`);
  }

  await browser.close();
})();
