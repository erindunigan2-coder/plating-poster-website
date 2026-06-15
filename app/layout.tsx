import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Plating Posters Inc — Metal Finishing Reference Series",
  description:
    "Professional process and safety posters for the surface finishing and metal plating industry. 9 categories, 80+ processes. Available in English and Spanish with custom logo upgrade.",
};

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
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ background: "#F5F4F0", color: "#1A1F2E" }}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
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
