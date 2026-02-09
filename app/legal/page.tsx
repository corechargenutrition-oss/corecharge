export default function LegalPage() {
    return (
      <main className="bg-black text-gray-200">
  
        {/* ================= HERO ================= */}
        <section className="border-b border-slate-800 py-14">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Legal Information
            </h1>
            <p className="mt-3 text-sm text-gray-400 max-w-3xl mx-auto">
              Important policies governing the use of CoreCharge Nutrition.
            </p>
          </div>
        </section>
  
        {/* ================= CONTENT ================= */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 space-y-16 text-sm leading-relaxed text-gray-300">
  
            {/* ================= PRIVACY POLICY ================= */}
            <div id="privacy-policy">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Privacy Policy
              </h2>
              <p className="text-gray-400">
                CoreCharge Nutrition respects your privacy and is committed to
                protecting your personal information. This policy outlines how
                we collect, use, and safeguard your data.
              </p>
  
              <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside">
                <li>We collect personal information only when voluntarily provided.</li>
                <li>Information may include name, email, phone number, and inquiry details.</li>
                <li>We do not sell, rent, or trade your personal data.</li>
                <li>Data is used strictly for customer support and service improvement.</li>
                <li>Third-party platforms (Amazon/Flipkart) handle all payment data.</li>
              </ul>
            </div>
  
            {/* ================= TERMS & CONDITIONS ================= */}
            <div id="terms-conditions">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Terms & Conditions
              </h2>
              <p className="text-gray-400">
                By accessing or using CoreCharge Nutrition, you agree to comply
                with the following terms:
              </p>
  
              <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside">
                <li>All products are sold via third-party platforms.</li>
                <li>Prices, availability, and offers are subject to change.</li>
                <li>Users must provide accurate information.</li>
                <li>Unauthorized use of website content is prohibited.</li>
                <li>We reserve the right to update policies without prior notice.</li>
              </ul>
            </div>
  
            {/* ================= REFUND & CANCELLATION ================= */}
            <div id="refund-policy">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Refund & Cancellation Policy
              </h2>
              <p className="text-gray-400">
                Refunds and cancellations are governed by the policies of the
                platform through which the purchase is made.
              </p>
  
              <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside">
                <li>Orders once placed are subject to Amazon / Flipkart policies.</li>
                <li>Products must be unopened and unused for returns.</li>
                <li>Refund timelines depend on the platform and payment method.</li>
                <li>CoreCharge Nutrition does not process payments directly.</li>
              </ul>
            </div>
  
            {/* ================= DISCLAIMER ================= */}
            <div id="disclaimer">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Disclaimer
              </h2>
              <p className="text-gray-400">
                Supplements sold on CoreCharge Nutrition are not medicines and
                are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
  
              <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside">
                <li>Results may vary from person to person.</li>
                <li>Always consult a healthcare professional before use.</li>
                <li>Use products strictly as per manufacturer instructions.</li>
                <li>We are not responsible for misuse of supplements.</li>
              </ul>
            </div>
  
          </div>
        </section>
  
        {/* ================= FOOT NOTE ================= */}
        <section className="border-t border-slate-800 py-10 bg-[#0b0b0b]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>
        </section>
  
      </main>
    );
  }
  