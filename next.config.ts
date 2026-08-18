import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Bundle the private manual PDFs with the gated download route so it can stream them at runtime.
  outputFileTracingIncludes: {
    "/api/download": ["./private/manuals/**/*"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        // Printed QR target (2026 postcard campaign). Deliberately non-permanent:
        // the QR on printed cards is fixed, so this must stay repointable.
        source: "/wall",
        destination: "/?utm_source=postcard&utm_medium=directmail&utm_campaign=postcard-2026-09",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
