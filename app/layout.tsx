import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow-condensed",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Plating Posters Inc — Metal Finishing Reference Series",
    template: "%s — Plating Posters Inc",
  },
  description:
    "Professional process and safety posters for the surface finishing and metal plating industry. 9 categories, 80+ processes. Available in English and Spanish with custom logo upgrade.",
  metadataBase: new URL("https://www.platingposters.com"),
  openGraph: {
    type: "website",
    siteName: "Plating Posters Inc",
    title: "Plating Posters Inc — Metal Finishing Reference Series",
    description:
      "Professional process and safety posters for the surface finishing and metal plating industry. Available in English and Spanish.",
    url: "https://www.platingposters.com",
  },
  twitter: {
    card: "summary",
    title: "Plating Posters Inc — Metal Finishing Reference Series",
    description:
      "Professional process and safety posters for the surface finishing and metal plating industry.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.platingposters.com",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      {GA_ID && (
        <head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
            }}
          />
        </head>
      )}
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ background: "#F5F4F0", color: "#1A1F2E" }}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        {/* Block right-click save on poster images */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener("contextmenu",function(e){if(e.target&&e.target.tagName==="IMG"&&e.target.src&&e.target.src.includes("/posters/")){e.preventDefault()}})`,
          }}
        />
      </body>
    </html>
  );
}
