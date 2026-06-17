import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Plating Posters Inc",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "#888880" }}>
            Last updated: June 17, 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        <div>
          <h2 className={heading} style={sectionStyle}>1. Who We Are</h2>
          <div className={body} style={bodyColor}>
            <p>
              Plating Posters Inc ("we," "us," or "our") operates platingposters.com. This policy
              describes how we collect, use, and protect your personal information when you visit
              our Site or place an order.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>2. Information We Collect</h2>
          <div className={body} style={bodyColor}>
            <p><strong>When you place an order</strong>, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Shipping address</li>
              <li>Order details (products, sizes, quantities)</li>
            </ul>
            <p><strong>Payment information</strong> (credit card numbers, billing address) is collected
              and processed directly by Stripe, our payment processor. We never see, store, or
              have access to your full card number.</p>
            <p><strong>When you submit a logo</strong> for the custom logo upgrade, we receive the
              image file you upload and the email address you provide for proof delivery.</p>
            <p><strong>Automatically collected</strong>: Our hosting provider (Vercel) may collect
              standard server logs including IP address, browser type, and pages visited. We do
              not currently use cookies for tracking or analytics.</p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>3. How We Use Your Information</h2>
          <div className={body} style={bodyColor}>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Deliver logo proofs for approval</li>
              <li>Respond to your questions or support requests</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not use your information for marketing purposes unless you explicitly opt in.</p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>4. Who We Share Your Information With</h2>
          <div className={body} style={bodyColor}>
            <p>We share your information only with the third parties necessary to fulfill your order:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Our print fulfillment partner</strong> — your name and shipping address so they can print and ship your poster</li>
              <li><strong>Airtable</strong> — order management (hosted in the US)</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to anyone.</p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>5. Data Retention</h2>
          <div className={body} style={bodyColor}>
            <p>
              We retain order records for as long as needed to fulfill orders, provide customer
              support, and comply with legal and accounting obligations. Logo files submitted for
              the custom upgrade are retained only until the order is fulfilled and then deleted.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>6. Data Security</h2>
          <div className={body} style={bodyColor}>
            <p>
              We use HTTPS encryption on all pages, and our payment processing is handled entirely
              by Stripe (PCI-DSS compliant). While we take reasonable measures to protect your
              information, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>7. Your Rights</h2>
          <div className={body} style={bodyColor}>
            <p>
              You may request access to, correction of, or deletion of your personal information
              at any time by emailing us at info@platingposters.com. We will respond within 30
              days. If you are a California resident, you have additional rights under the CCPA —
              contact us to exercise them.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>8. Children</h2>
          <div className={body} style={bodyColor}>
            <p>
              Our Site is not directed to children under 13. We do not knowingly collect personal
              information from children.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>9. Changes to This Policy</h2>
          <div className={body} style={bodyColor}>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated date. Your continued use of the Site after changes are posted
              constitutes acceptance.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading} style={sectionStyle}>10. Contact</h2>
          <div className={body} style={bodyColor}>
            <p>
              Questions about your privacy? Contact us at{" "}
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
