import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tank Spec Placards — Chemistry, Hazards & SDS at the Tank",
  description:
    "Shop-tough tank placards for metal finishing lines: tank ID, makeup, hazard & PPE pictographs, and a QR code linking to the tank's live chemistry page with SDS — free to anyone who scans.",
};

export default function PlacardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
