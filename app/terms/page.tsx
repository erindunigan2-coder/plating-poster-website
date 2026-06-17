import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Plating Posters Inc. Covers orders, custom logo upgrades, shipping, returns, and intellectual property.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: "#888880" }}>
            Last updated: June 17, 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        <div>
          <h2 className={heading} style={sectionStyle}>1. Agreement to Terms</h2>
          <div className={body} style={bodyColor}>
            <p>
              By accessing or using the website at platingposters.com (the "Site"), you agree to be
              bound by these Terms of Service. If you do not agree, do not use the Site. Plating
              Posters Inc ("we," "us," or "our") reserves the right to update these terms at any
              time. Continued use of the Site after changes constitutes acceptance of the revised
              terms.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>2. Products and Orders</h2>
          <div className={body} style={bodyColor}>
            <p>
              We sell printed posters for the surface finishing and metal plating industry. All
              posters are printed to order. Prices are listed in US dollars and are subject to
              change without notice. We reserve the right to limit quantities, refuse any order,
              or cancel an order at our sole discretion.
            </p>
            <p>
              Orders are processed through Stripe, our third-party payment processor. By placing
              an order you agree to provide accurate and complete payment and shipping information.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>3. Custom Logo Upgrade</h2>
          <div className={body} style={bodyColor}>
            <p>
              The logo upgrade service adds your company logo to the poster design. You must have
              the right to use any logo or image you submit to us. By submitting a logo, you
              grant us a limited license to reproduce it solely for the purpose of fulfilling your
              order. We will send a digital proof for your approval before printing. Once you
              approve the proof, the order proceeds to print and cannot be canceled.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>4. Shipping</h2>
          <div className={body} style={bodyColor}>
            <p>
              We currently ship within the United States only. Orders of $99 or more receive free
              standard shipping. Orders under $99 are subject to a flat $9.95 shipping fee.
              Delivery times vary and are not guaranteed. We are not responsible for delays caused
              by carriers or events outside our control.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>5. Sales Tax</h2>
          <div className={body} style={bodyColor}>
            <p>
              Applicable sales tax is calculated and collected at checkout based on the shipping
              destination, as required by law.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>6. Intellectual Property</h2>
          <div className={body} style={bodyColor}>
            <p>
              All poster designs, text, graphics, layouts, and other content on this Site are the
              property of Plating Posters Inc and are protected by copyright and other
              intellectual property laws. You may not reproduce, distribute, modify, or create
              derivative works from any content on this Site without our prior written consent.
            </p>
            <p>
              Purchasing a poster grants you a license to display the printed poster in your
              facility. It does not grant ownership of the design or the right to reproduce,
              scan, photograph for redistribution, or digitally share the poster content.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>7. Returns and Refunds</h2>
          <div className={body} style={bodyColor}>
            <p>
              Because all posters are printed to order, all sales are final. We do not accept
              returns or issue refunds for change of mind. If your order arrives damaged or with
              a printing defect, contact us at info@platingposters.com within 14 days of delivery
              and we will reprint and reship your order at no charge. See our{" "}
              <a href="/returns" className="underline" style={{ color: "#d4532a" }}>Return Policy</a>{" "}
              for full details.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>8. Limitation of Liability</h2>
          <div className={body} style={bodyColor}>
            <p>
              Our posters are intended as reference and educational materials. They are not a
              substitute for professional training, engineering specifications, or regulatory
              compliance. We make no warranty that the content is error-free or suitable for any
              specific application. Use of poster content in your operations is at your own risk.
            </p>
            <p>
              To the fullest extent permitted by law, Plating Posters Inc shall not be liable for
              any indirect, incidental, special, or consequential damages arising from your use
              of the Site or our products.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>9. Governing Law</h2>
          <div className={body} style={bodyColor}>
            <p>
              These terms are governed by the laws of the State of Texas. Any disputes shall be
              resolved in the courts of Texas.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>10. Contact</h2>
          <div className={body} style={bodyColor}>
            <p>
              Questions about these Terms? Contact us at{" "}
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
