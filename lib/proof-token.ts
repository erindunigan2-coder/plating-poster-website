import { createHmac } from "crypto";

// No hardcoded fallback: a committed default secret would make every proof
// token forgeable. Fail loudly if the environment is missing the secret.
function getSecret(): string {
  const secret = process.env.PROOF_TOKEN_SECRET || process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("PROOF_TOKEN_SECRET (or STRIPE_WEBHOOK_SECRET) is not configured");
  }
  return secret;
}

/**
 * Generate a signed token for a proof review link.
 * Include this as a `token` query param in the proof review URL.
 */
export function generateProofToken(recordId: string): string {
  return createHmac("sha256", getSecret()).update(recordId).digest("hex").slice(0, 32);
}

/**
 * Verify that a token matches the given record ID.
 */
export function verifyProofToken(recordId: string, token: string): boolean {
  const expected = generateProofToken(recordId);
  if (token.length !== expected.length) return false;
  // Constant-time comparison
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}
