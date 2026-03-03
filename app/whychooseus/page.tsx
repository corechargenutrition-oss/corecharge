import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative border-b border-gray-200">
        <div className="absolute inset-0">
          <img
            src="/physique2.png"
            alt="Why choose CoreCharge Nutrition"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Why Choose <span className="text-[#F2C200]">CoreCharge</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            In a market filled with exaggerated claims and counterfeit products,
            CoreCharge Nutrition is built on verification, transparency, and performance.
          </p>
        </div>
      </section>

      {/* ================= CORE PRINCIPLES ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Authenticity Without Compromise",
              desc: "Every product is sourced only from authorized distributors. No grey-market stock. No replicas.",
            },
            {
              title: "Science Over Marketing",
              desc: "Clinically studied ingredients and transparent labels — not exaggerated promises.",
            },
            {
              title: "Built for Serious Training",
              desc: "Designed for athletes who value discipline, recovery, and long-term progress.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-8
                hover:border-[#F2C200]/50
                transition
              "
            >
              <div className="w-10 h-[2px] bg-[#F2C200] mb-5" />
              <h3 className="text-lg font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="py-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12">
            CoreCharge vs Unverified Sellers
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* CoreCharge */}
            <div
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-8
              "
            >
              <h3 className="text-lg font-bold mb-5 text-gray-900">
                CoreCharge Nutrition
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>• Authorized distributor sourcing</li>
                <li>• Verifiable batch numbers</li>
                <li>• Transparent ingredient labels</li>
                <li>• Trusted global brands</li>
                <li>• Secure checkout via Amazon & Flipkart</li>
              </ul>
            </div>

            {/* Others */}
            <div
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-8
                opacity-80
              "
            >
              <h3 className="text-lg font-bold mb-5 text-gray-700">
                Unverified Sellers
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Unknown sourcing</li>
                <li>• No batch verification</li>
                <li>• Misleading claims</li>
                <li>• Poor storage & handling</li>
                <li>• Limited accountability</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ================= QUALITY PROCESS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12">
            Our Quality Control Process
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Authorized Sourcing",
                desc: "Products are procured only from official brand distributors.",
              },
              {
                title: "Batch Verification",
                desc: "Each product carries a traceable batch or lot number.",
              },
              {
                title: "Secure Fulfilment",
                desc: "Orders are completed via trusted platforms.",
              },
              {
                title: "Customer Support",
                desc: "Guidance for verification and product usage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  bg-white
                  border border-gray-200
                  rounded-xl
                  p-6
                "
              >
                <h4 className="text-sm font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESPONSIBILITY ================= */}
      <section className="py-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Health Is Not a Gamble
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Supplements directly affect health, recovery, and performance.
              That responsibility guides every decision we make.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              Education Before Consumption
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We promote informed usage through clear information, FAQs,
              and customer support.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-gray-200 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built on Standards, Not Shortcuts
          </h2>
          <p className="text-gray-600 mb-10 text-sm max-w-xl mx-auto">
            Choose supplements that respect your discipline and effort.
          </p>
          <Link
            href="/shop"
            className="
              inline-flex items-center justify-center
              px-10 py-4 text-sm font-bold rounded-md
              bg-[#F2C200] text-black
              hover:bg-[#d9ae00]
              transition
              shadow-xl shadow-[#F2C200]/20
            "
          >
            Shop CoreCharge Nutrition
          </Link>
        </div>
      </section>

    </main>
  );
}