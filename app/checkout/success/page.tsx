import Link from "next/link";

export const metadata = {
  title: "Order Confirmed — Plating Posters Inc",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div
        className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
        style={{ background: "#E8F5E9" }}
      >
        <span className="text-3xl" style={{ color: "#2E7D32" }}>&#10003;</span>
      </div>

      <h1
        className="font-black uppercase text-3xl tracking-wide mb-3"
        style={{ color: "#1A1F2E" }}
      >
        Order Confirmed
      </h1>

      <p className="text-base mb-6" style={{ color: "#6B7080" }}>
        Thank you for your order! You&apos;ll receive a receipt at the email address you provided during checkout.
      </p>

      <div
        className="p-6 mb-8 text-left"
        style={{ background: "#fff", border: "1px solid #DDD9D0" }}
      >
        <h2
          className="font-black uppercase text-xs tracking-widest mb-3"
          style={{ color: "#6B7080" }}
        >
          What Happens Next
        </h2>
        <ul className="space-y-3 text-sm" style={{ color: "#3A4055" }}>
          <li className="flex gap-2">
            <span style={{ color: "#E8A020" }} className="font-bold">1.</span>
            Our print partner receives your order and begins production.
          </li>
          <li className="flex gap-2">
            <span style={{ color: "#E8A020" }} className="font-bold">2.</span>
            You&apos;ll receive tracking information once your posters ship.
          </li>
          <li className="flex gap-2">
            <span style={{ color: "#E8A020" }} className="font-bold">3.</span>
            Most orders ship within 3&ndash;5 business days.
          </li>
        </ul>
      </div>

      <div
        className="p-5 mb-8"
        style={{ background: "#1A1F2E", borderRadius: "4px" }}
      >
        <p className="font-black uppercase text-xs tracking-widest mb-2" style={{ color: "#E8A020" }}>
          Did you add a custom logo?
        </p>
        <p className="text-sm mb-4" style={{ color: "#9098A8" }}>
          Upload your logo file and we&apos;ll send you a digital proof for approval before printing.
        </p>
        <Link
          href="/submit-logo"
          className="inline-block px-6 py-2 font-black text-sm uppercase tracking-widest"
          style={{ background: "#E8A020", color: "#1A1F2E" }}
        >
          Upload Your Logo
        </Link>
      </div>

      {session_id && (
        <p className="text-xs mb-6" style={{ color: "#9098A8" }}>
          Reference: {session_id}
        </p>
      )}

      <Link
        href="/posters"
        className="inline-block px-8 py-3 font-black text-sm uppercase tracking-widest border"
        style={{ borderColor: "#1A1F2E", color: "#1A1F2E" }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}
