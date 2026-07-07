// Mint a signed proof-review link for a customer.
// Usage: node _make-proof-link.js <proofRecordId> [proofImageUrl] [customerName]
// Requires PROOF_TOKEN_SECRET (or STRIPE_WEBHOOK_SECRET) in the environment or .env.local.
const { createHmac } = require("crypto");
const fs = require("fs");
const path = require("path");

// Light .env.local loader (no dependency)
try {
  const env = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const secret = process.env.PROOF_TOKEN_SECRET || process.env.STRIPE_WEBHOOK_SECRET;
if (!secret) {
  console.error("ERROR: PROOF_TOKEN_SECRET (or STRIPE_WEBHOOK_SECRET) not set — cannot sign link.");
  process.exit(1);
}

const [recordId, proofUrl, customerName] = process.argv.slice(2);
if (!recordId) {
  console.error("Usage: node _make-proof-link.js <proofRecordId> [proofImageUrl] [customerName]");
  process.exit(1);
}

const token = createHmac("sha256", secret).update(recordId).digest("hex").slice(0, 32);
const params = new URLSearchParams({ id: recordId, token });
if (proofUrl) params.set("proof", proofUrl);
if (customerName) params.set("name", customerName);

console.log(`https://www.platingposters.com/review-proof?${params.toString()}`);
