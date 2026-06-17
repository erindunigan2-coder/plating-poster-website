import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Plating Posters Inc. Questions about orders, custom projects, or bulk pricing? Email us at info@platingposters.com.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
