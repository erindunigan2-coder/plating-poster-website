const fs = require("fs");
const path = require("path");

const postersDir = path.join(__dirname, "public", "posters");
const files = new Set(fs.readdirSync(postersDir));

let content = fs.readFileSync("lib/posters.ts", "utf8");

// Strategy: find poster objects by their id, extract the id, check if ES preview files exist,
// then insert previewImageEs fields before the "languages:" line.
const lines = content.split("\n");
const newLines = [];
let added = 0;
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track current poster ID from "id:" fields
  const idMatch = line.match(/id:\s*"([^"]+)"/);
  if (idMatch) {
    currentId = idMatch[1];
  }

  // Skip if already has previewImageEs
  if (line.includes("previewImageEs")) {
    newLines.push(line);
    continue;
  }

  // Check if this line has "languages:" and we have a current poster ID
  if (currentId && line.match(/\s*languages:\s*\[/)) {
    const esDarkFile = `${currentId}-es-preview.jpg`;
    const esLightFile = `${currentId}-es-light-preview.jpg`;

    if (files.has(esDarkFile)) {
      // Build the ES preview line with proper indentation
      const indent = line.match(/^(\s*)/)[1];
      let esLine = `${indent}previewImageEs: "/posters/${esDarkFile}",`;
      if (files.has(esLightFile)) {
        esLine += ` previewImageEsLight: "/posters/${esLightFile}",`;
      }
      newLines.push(esLine);
      added++;
    }
  }

  newLines.push(line);
}

fs.writeFileSync("lib/posters.ts", newLines.join("\n"));
console.log(`Added ES preview paths to ${added} posters`);
