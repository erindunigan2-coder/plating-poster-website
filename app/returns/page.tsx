import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Return and refund policy for Plating Posters Inc. All posters are printed to order. Damaged or defective items reprinted free within 14 days.",
};

export default function ReturnsPage() {
  const heading = "font-black uppercase text-xs tracking-widest mb-5";
  const sectionStyle = { color: "#1e1e1c", borderBottom: "2px solid #1e1e1c", paddingBottom: "0.5rem" };
  const body = "text-sm leading-relaxed space-y-3";
  const bodyColor = { color: "#4a4a42" };

  return (
    <div>
      <section style={{ background: "#1e1e1c" }} className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-black uppercase text-xs tracking-widest mb-3" style={{ color: "#d4532a" }}>
            Legal
          </p>
          <h1
            className="font-black uppercase text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Return &amp; Refund Policy
          </h1>
          <p className="text-sm" style={{ color: "#888880" }}>
            Last updated: June 17, 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        <div>
          <h2 className={heading} style={sectionStyle}>All Sales Are Final</h2>
          <div className={body} style={bodyColor}>
            <p>
              Every poster is printed to order specifically for you. Because of the custom,
              made-to-order nature of our products, <strong>all sales are final</strong>. We do
              not accept returns or issue refunds for change of mind, wrong size selection, or
              buyer's remorse.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>Damaged or Defective Orders</h2>
          <div className={body} style={bodyColor}>
            <p>
              If your poster arrives damaged in shipping or has a printing defect (color errors,
              smudging, misalignment, wrong product), we will make it right. Contact us within
              <strong> 14 days of delivery</strong> at{" "}
              <a href="mailto:info@platingposters.com" className="underline" style={{ color: "#d4532a" }}>
                info@platingposters.com
              </a>{" "}
              with:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your order confirmation email or order number</li>
              <li>A photo of the damage or defect</li>
              <li>A brief description of the issue</li>
            </ul>
            <p>
              We will review your claim and, if approved, reprint and reship your poster at no
              additional cost. We do not require you to return the damaged item.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>Custom Logo Orders</h2>
          <div className={body} style={bodyColor}>
            <p>
              Orders with the custom logo upgrade include a digital proof sent to your email for
              approval before printing. Once you approve the proof, the order is sent to print
              and cannot be canceled or refunded. Please review your proof carefully.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>Cancellations</h2>
          <div className={body} style={bodyColor}>
            <p>
              If you need to cancel an order, contact us as soon as possible at
              info@platingposters.com. If the order has not yet been sent to our printer, we will
              cancel it and issue a full refund. Once an order is in production, it cannot be
              canceled.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>Contact</h2>
          <div className={body} style={bodyColor}>
            <p>
              Questions about an order? Reach us at{" "}
              <a href="mailto:info@platingposters.com" className="underline" style={{ color: "#d4532a" }}>
                info@platingposters.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
