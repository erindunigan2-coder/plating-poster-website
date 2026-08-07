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
            Last updated: August 7, 2026
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
          <h2 className={heading} style={sectionStyle}>8. Educational Use and No Professional Advice</h2>
          <div className={body} style={bodyColor}>
            <p>
              Our posters and training manuals are educational reference materials for the
              surface-finishing and metal-plating industry. They describe processes in general
              terms and are not tailored to any specific shop, chemistry, or piece of equipment.
              They are not a substitute for the safety data sheets that accompany the chemicals you
              use, for your chemical supplier's instructions, for your facility's written safety
              procedures, or for professional training.
            </p>
            <p>
              We do not provide legal, engineering, safety, or regulatory-compliance advice, and
              nothing we sell should be treated as that kind of advice. You remain solely
              responsible for operating safely and for complying with all laws and regulations that
              apply to your business, including the requirements of OSHA, the EPA, and your state
              and local authorities.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>9. Disclaimer of Warranties</h2>
          <div className={body} style={bodyColor}>
            <p>
              Our products are provided "as is" and "as available." We make a genuine effort to
              keep the content accurate and current, but we do not warrant that it is complete,
              error-free, up to date, or suitable for any particular purpose. To the fullest extent
              permitted by law, we disclaim all warranties, whether express or implied, including
              the implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement. You are responsible for verifying any information before you rely
              on it.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>10. Limitation of Liability</h2>
          <div className={body} style={bodyColor}>
            <p>
              To the fullest extent permitted by law, Plating Posters Inc and its owners,
              employees, and suppliers will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or for any loss of profits, revenue, data, or
              goodwill, arising out of or related to your use of the Site, our posters, or our
              manuals. This applies regardless of the legal theory and even if we have been advised
              of the possibility of such damages. In every case, our total liability to you for any
              claim will not exceed the amount you paid us for the product that gave rise to the
              claim. Some jurisdictions do not allow certain limitations, so some of these
              limitations may not apply to you.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>11. Indemnification</h2>
          <div className={body} style={bodyColor}>
            <p>
              You agree to defend, indemnify, and hold harmless Plating Posters Inc and its owners,
              employees, and suppliers from any claims, damages, losses, liabilities, and expenses,
              including reasonable attorneys' fees, that arise out of or relate to your use of our
              posters or manuals, your operation of any process they describe, or your violation of
              these Terms or of any applicable law or regulation.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>12. Governing Law</h2>
          <div className={body} style={bodyColor}>
            <p>
              These terms are governed by the laws of the State of Texas. Any disputes shall be
              resolved in the courts of Texas.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>13. Contact</h2>
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
