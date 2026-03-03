import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid gap-14 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            CoreCharge <span className="text-[#F2C200]">Nutrition</span>
          </h3>

          <p className="text-sm leading-relaxed max-w-sm">
            Authentic fitness supplements sourced only from authorized
            distributors. Built for performance, transparency, and trust.
          </p>

          {/* Mini contact */}
          <div className="mt-6 text-sm space-y-2">
            <p>corechargenutrition@gmail.com</p>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-5">
            Shop
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ["All Products", "/shop"],
              ["Whey Protein", "/shop?category=whey"],
              ["Creatine", "/shop?category=creatine"],
              ["Vitamins & Minerals", "/shop?category=vitamins"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-gray-900 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-5">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ["About Us", "/aboutus"],
              ["Why Choose Us", "/whychooseus"],
              ["Reviews & FAQs", "/review"],
              ["Contact Us", "/contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-gray-900 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-5">
            Legal
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              ["Privacy Policy", "/legal"],
              ["Terms & Conditions", "/legal"],
              ["Refund & Cancellation", "/legal"],
              ["Disclaimer", "/legal"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-gray-900 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

{/* ================= BOTTOM BAR ================= */}
<div className="border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-2 text-xs text-gray-500">

    <p>
      © {new Date().getFullYear()} CoreCharge Nutrition. All rights reserved.
    </p>

    <p className="md:text-right leading-relaxed">
      Supplements are not medicines. Results may vary.
      Always consult a qualified healthcare professional before use.
    </p>

    {/* MADE BY */}
    {/* <p className="md:col-span-2 text-center text-[#FFEA00]">
      Made with ❤️ by{" "}
      <a
        href="https://bagora.agency/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#F2C200] hover:underline"
      >
        Bagora Agency
      </a>
    </p> */}

  </div>
</div>

    </footer>
  );
}