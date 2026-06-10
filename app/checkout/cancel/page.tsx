import Link from "next/link";

export const metadata = {
  title: "Checkout Cancelled — Plating Posters Inc",
};

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1
        className="font-black uppercase text-3xl tracking-wide mb-3"
        style={{ color: "#1A1F2E" }}
      >
        Checkout Cancelled
      </h1>

      <p className="text-base mb-8" style={{ color: "#6B7080" }}>
        Your checkout was cancelled and you have not been charged. Your poster selections are still available if you&apos;d like to try again.
      </p>

      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/posters"
          className="inline-block px-8 py-3 font-black text-sm uppercase tracking-widest"
          style={{ background: "#E8A020", color: "#1A1F2E" }}
        >
          Back to Posters
        </Link>

        <Link
          href="/contact"
          className="inline-block px-8 py-3 font-black text-sm uppercase tracking-widest border"
          style={{ borderColor: "#1A1F2E", color: "#1A1F2E" }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
