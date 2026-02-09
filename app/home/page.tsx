"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ================= COUNT UP COMPONENT ================= */

function CountUp({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const animate = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ================= PAGE ================= */

export default function HomePage() {
  return (
    <main className="bg-black text-gray-200">

 {/* ================= HERO ================= */}
<section className="relative overflow-hidden">

{/* BACKGROUND IMAGE */}
<div
  className="absolute inset-0 bg-cover bg-center md:hidden"
  style={{
    backgroundImage: "url('/Hero.png')",
  }}
/>


{/* BLACK FILTER / OVERLAY */}
<div className="absolute inset-0 bg-black/20" />

{/* OPTIONAL SOFT GRADIENT (premium feel) */}
<div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/80 to-black" />

{/* CONTENT */}
<div className="relative z-10 max-w-7xl mx-auto px-4 py-28 grid md:grid-cols-2 gap-14 items-center">

  {/* Left */}
  <div>
    <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white">
      Fuel Your <br />
      <span className="text-[#F2C200]">Performance</span>
    </h1>

    <p className="mt-6 text-gray-300 text-lg max-w-xl">
      CoreCharge Nutrition delivers{" "}
      <span className="text-gray-100 font-medium">
        100% authentic
      </span>{" "}
      science-backed supplements trusted by serious athletes across India.
    </p>

    <div className="mt-10 flex flex-wrap gap-5">
      <Link
        href="/shop"
        className="px-9 py-4 text-sm font-semibold rounded-md bg-[#F2C200] text-black hover:bg-[#d9ae00] transition shadow-lg shadow-[#F2C200]/20"
      >
        Shop Supplements
      </Link>

      <Link
        href="/whychooseus"
        className="px-9 py-4 text-sm font-semibold rounded-md border border-gray-600 text-gray-200 hover:bg-[#161616] transition"
      >
        Why CoreCharge
      </Link>
    </div>

    <div className="mt-10 flex gap-6 text-sm text-gray-400">
      <span>✔ Verified Brands</span>
      <span>✔ No Counterfeits</span>
      <span>✔ Secure Checkout</span>
    </div>
  </div>

  {/* Right */}
  <div className="hidden md:flex justify-center">
    <div className="relative w-full max-w-xl aspect-[1/1]">
      <Image
        src="/herowhite.png"
        alt="CoreCharge Nutrition Supplements"
        fill
        priority
        className="object-contain drop-shadow-2xl"
      />
    </div>
  </div>

</div>
</section>


      {/* ================= POWER STATS ================= */}
      <section className="py-14 bg-[#0b0b0b] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div>
            <p className="text-3xl font-bold text-gray-100">
              <CountUp value={100} suffix="%" />
            </p>
            <p className="text-sm text-gray-400 mt-1">Satisfied Customers</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-100">
              <CountUp value={4} />.8 / 5
            </p>
            <p className="text-sm text-gray-400 mt-1">Average Rating</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-100">
              <CountUp value={5} suffix="+" />
            </p>
            <p className="text-sm text-gray-400 mt-1">Premium Products</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-100">
              <CountUp value={100} suffix="%" />
            </p>
            <p className="text-sm text-gray-400 mt-1">Authentic Products</p>
          </div>

        </div>
      </section>
{/* ================= CATEGORIES ================= */}
<section className="py-24">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-24">
      Shop by Goal
    </h2>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
      {[
        {
          title: "Muscle Gain",
          intro: "Build size and lean muscle",
          products: "Whey Concentrate, Whey Isolate",
          image: "/whey.png",
        },
        {
          title: "Strength",
          intro: "Increase Strength",
          products: "Mass Gainers",
          image: "/creatine.png",
        },
        {
          title: "Performance",
          intro: "Perform better during workouts",
          products: "Pre-Workout",
          image: "/bcaa.png",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="
            relative
            bg-gradient-to-br from-[#141414] to-[#0b0b0b]
            border border-slate-700
            rounded-2xl
            pt-36 sm:pt-32 md:pt-28
            pb-8 px-6
            hover:border-[#F2C200]/60
            transition
            group
          "
        >
          {/* POPPING IMAGE */}
          <div
            className="
              absolute
              -top-24
              left-1/2
              -translate-x-1/2
              w-52 h-52
              sm:w-48 sm:h-48
              md:w-44 md:h-44
              flex items-center justify-center
            "
          >
            <div className="absolute inset-0 bg-[#F2C200]/20 blur-3xl rounded-full md:hidden" />

            <img
              src={item.image}
              alt={item.title}
              className="
                relative z-10
                w-full h-full
                object-contain
                drop-shadow-[0_30px_45px_rgba(0,0,0,0.75)]
                transition-transform
                group-hover:scale-110
              "
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-300 mb-3">
              {item.intro}
            </p>

            <p className="text-xs text-gray-500 mb-6">
              {item.products}
            </p>

            <Link
              href="/shop"
              className="
                inline-block
                text-sm font-semibold
                text-[#F2C200]
                hover:text-[#d9ae00]
              "
            >
              Explore →
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>







 {/* ================= AUTHORITY SECTION ================= */}
<section className="py-24 bg-gradient-to-r from-[#0b0b0b] to-black border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-4">

    {/* Section Header */}
    <div className="max-w-2xl mb-16">
      <h2 className="text-3xl font-bold mb-3">
        Built on Standards, Not Shortcuts
      </h2>
      <p className="text-gray-400 text-sm">
        Everything we do at CoreCharge Nutrition is guided by authenticity,
        science, and performance.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "Zero Compromise",
          desc: "Strict sourcing and verification. No grey-market or unverified inventory.",
        },
        {
          title: "Science-Backed",
          desc: "Clinically researched ingredients with transparent labels and batch tracking.",
        },
        {
          title: "Performance First",
          desc: "Built for athletes focused on consistency, recovery, and long-term progress.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="
            bg-gradient-to-br from-[#141414] to-[#0b0b0b]
            border border-slate-700
            rounded-xl
            p-8
            hover:border-[#F2C200]/50
            transition
          "
        >
          {/* Accent bar */}
          <div className="w-10 h-[2px] bg-[#F2C200] mb-5" />

          <h3 className="text-xl font-bold mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>


{/* ================= PLATFORM TRUST ================= */}
<section className="py-24 border-t border-slate-800">
  <div className="max-w-7xl mx-auto px-4">

    {/* Header */}
    <div className="max-w-2xl mb-16">
      <h2 className="text-3xl font-bold mb-3">
        Trusted Checkout. Zero Risk.
      </h2>
      <p className="text-gray-400 text-sm">
        Payments and deliveries are handled by platforms you already trust.
        We never store your payment details.
      </p>
    </div>

    {/* Trust Cards */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">

      {/* Amazon & Flipkart */}
      <div
        className="
          bg-gradient-to-br from-[#141414] to-[#0b0b0b]
          border border-slate-700
          rounded-xl
          p-8
          hover:border-[#F2C200]/50
          transition
        "
      >
        {/* Logos */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src="/logos/amazon.png"
            alt="Amazon"
            className="h-8 object-contain"
          />
          <img
            src="/logos/flipkart.webp"
            alt="Flipkart"
            className="h-8 object-contain"
          />
        </div>

        <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />

        <h3 className="text-lg font-bold mb-2">
          Amazon & Flipkart
        </h3>

        <p className="text-sm text-gray-400">
          Checkout and order fulfillment are completed on India’s most trusted
          e-commerce platforms.
        </p>
      </div>

      {/* Secure Payments */}
      <div
        className="
          bg-gradient-to-br from-[#141414] to-[#0b0b0b]
          border border-slate-700
          rounded-xl
          p-8
          hover:border-[#F2C200]/50
          transition
        "
      >
        {/* Payment Logos */}
        <div className="flex items-center gap-5 mb-6">
          <img
            src="/logos/upi.webp"
            alt="UPI"
            className="h-7 object-contain"
          />
          <img
            src="/logos/card.png"
            alt="Cards"
            className="h-7 object-contain"
          />
   
        </div>

        <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />

        <h3 className="text-lg font-bold mb-2">
          Secure Payments
        </h3>

        <p className="text-sm text-gray-400">
          Pay using UPI, cards, net banking, or COD — protected by
          platform-level security.
        </p>
      </div>

      {/* Easy Returns */}
      <div
        className="
          bg-gradient-to-br from-[#141414] to-[#0b0b0b]
          border border-slate-700
          rounded-xl
          p-8
          hover:border-[#F2C200]/50
          transition
        "
      >
        {/* Returns Image */}
        <div className="mb-6">
          <img
            src="/logos/returns.png"
            alt="Easy Returns"
            className="h-10 object-contain"
          />
        </div>

        <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />

        <h3 className="text-lg font-bold mb-2">
          Easy Returns & Delivery
        </h3>

        <p className="text-sm text-gray-400">
          Fast shipping, reliable delivery, and hassle-free returns as per
          platform policies.
        </p>
      </div>

    </div>

  </div>
</section>



{/* ================= FINAL CTA ================= */}
<section className="py-28 border-t border-slate-800 bg-[#0b0b0b]">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

    {/* IMAGE SIDE */}
    <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
      <img
        src="/physique.png" // ← add your bodybuilding / physique image here
        alt="Athlete physique training"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay for premium look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    </div>

    {/* TEXT SIDE */}
    <div className="text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-bold mb-5">
        Train Hard. Fuel Smarter.
      </h2>

      <p className="text-gray-400 mb-10 max-w-lg text-sm">
        Real supplements for real results. No counterfeits, no compromises —
        only products trusted by serious athletes.
      </p>

      <Link
        href="/shop"
        className="
          inline-flex items-center justify-center
          px-12 py-4 text-sm font-bold rounded-md
          bg-[#F2C200] text-black
          hover:bg-[#d9ae00]
          transition
          shadow-xl shadow-[#F2C200]/20
        "
      >
        Explore Supplements
      </Link>
    </div>

  </div>
</section>

{/* ================= CONTACT SNAPSHOT ================= */}
<section className="relative py-24 border-t border-slate-800 overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/contact-bg.png')",
    }}
  />

  {/* DARK OVERLAY / FILTER */}
  <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">

    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
      Need Help? <span className="text-[#F2C200]">Talk to Us</span>
    </h2>

    <p className="text-sm md:text-base text-gray-300 max-w-7xl mx-auto mb-6">
      Questions about product authenticity, orders, shipping, or supplements?
      Our support team is always happy to help you make the right choice.
    </p>

    <p className="text-sm md:text-base text-gray-300 max-w-7xl mx-auto mb-10">
      Whether you need help verifying your product, understanding ingredients,
      or tracking an order — just drop us an email and we’ll take care of the rest.
    </p>

    <div className="mt-8">
      <p className="text-gray-200 font-medium mb-2">
        Email Support
      </p>
      <a
        href="mailto:corechargenutrition@gmail.com"
        className="inline-block text-[#F2C200] text-lg font-semibold hover:underline"
      >
        corechargenutrition@gmail.com
      </a>
    </div>

    <p className="mt-8 text-xs text-gray-400">
      We usually respond within 24–48 hours on business days.
    </p>

  </div>
</section>




    </main>
  );
}
