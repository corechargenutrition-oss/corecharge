import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative border-b border-gray-200">
        <div className="absolute inset-0">
          <img
            src="/about-hero.png"
            alt="Serious training and supplements"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Built on <span className="text-[#F2C200]">Authenticity</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            CoreCharge Nutrition was created to solve one problem —
            fake, diluted, and unverified supplements in the fitness industry.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-start">
          
          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold mb-5">
              Our Story
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              CoreCharge Nutrition was founded by fitness enthusiasts who
              experienced firsthand the risks of counterfeit and low-quality
              supplements. In an industry driven by hype and weak regulation,
              we chose to build a platform rooted in trust.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              We do not manufacture shortcuts. We do not sell grey-market products.
              Every supplement we list is sourced only from authorized distributors
              and verified supply chains.
            </p>
          </div>

          {/* Standards Card */}
          <div
            className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-8
            "
          >
            <div className="w-10 h-[2px] bg-[#F2C200] mb-6" />
            <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">
              What Defines Us
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Zero tolerance for fake products</li>
              <li>• Verified batch numbers</li>
              <li>• Transparent sourcing</li>
              <li>• Trusted global brands only</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= MISSION & VALUES ================= */}
      <section className="py-24 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          
          {[
            {
              title: "Our Mission",
              desc: "Make 100% authentic fitness supplements accessible across India — without misleading claims or compromised quality.",
            },
            {
              title: "Our Standards",
              desc: "Every product must meet strict sourcing, labeling, and verification requirements. No exceptions.",
            },
            {
              title: "Our Responsibility",
              desc: "Supplements impact health. We prioritize safety, clarity, and consumer education above all else.",
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

      {/* ================= AUTHENTICITY PROCESS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12">
            How We Ensure Authenticity
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Authorized Sourcing",
                desc: "Products are sourced only from official brand distributors.",
              },
              {
                title: "Batch Verification",
                desc: "Each product carries a verifiable batch number.",
              },
              {
                title: "Secure Fulfilment",
                desc: "Orders are completed via Amazon & Flipkart.",
              },
              {
                title: "Customer Support",
                desc: "We assist customers with verification and product guidance.",
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

      {/* ================= CTA ================= */}
      <section className="py-24 border-t border-gray-200 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built for Serious Training
          </h2>
          <p className="text-gray-600 mb-10 text-sm max-w-xl mx-auto">
            If you care about what you put into your body,
            CoreCharge Nutrition is built for you.
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
            Explore Supplements
          </Link>
        </div>
      </section>

    </main>
  );
}