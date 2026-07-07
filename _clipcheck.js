const puppeteer = require("puppeteer-core");
const path = require("path");
(async () => {
  const file = process.argv[2];
  const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
  const browser = await puppeteer.launch({ executablePath: chrome, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto("file:///" + file.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
  const res = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll(".page").forEach((el, i) => {
      if (el.scrollHeight > el.clientHeight + 1)
        out.push({ page: i + 1, over: el.scrollHeight - el.clientHeight });
    });
    return { total: document.querySelectorAll(".page").length, clipped: out };
  });
  console.log(path.basename(file) + " -> pages:" + res.total + " clipped:" + res.clipped.length +
    (res.clipped.length ? " " + JSON.stringify(res.clipped) : ""));
  await browser.close();
})();
