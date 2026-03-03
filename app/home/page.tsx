"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


/* ================= TYPES ================= */

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  heroImage: string;
  inStock: boolean;
};

/* ================= COUNT UP ================= */

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
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ================= STAR RATING ================= */

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#F2C200]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ================= REVIEWS DATA ================= */

const reviews = [
  {
    name: "Anushka Verma",
    location: "Delhi",
    image: "/reviews/anushka.jpg",
    rating: 5,
    review: "I've been lifting for 6+ years and fake supplements are a real problem. CoreCharge is the first platform where I actually trust the sourcing.",
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    image: "/reviews/rahul.jpg",
    rating: 5,
    review: "Packaging was sealed, batch number verified on the brand site. Delivery was fast through Amazon. No complaints.",
  },
  {
    name: "Kiran Singh",
    location: "Chandigarh",
    image: "/reviews/kiran.jpg",
    rating: 5,
    review: "Clear labels, authentic brands, and solid support when I had questions. No overpromising.",
  },
  {
    name: "Siddharth Jain",
    location: "Bengaluru",
    image: "/reviews/siddharth.jpg",
    rating: 5,
    review: "Finally a supplement platform that focuses on authenticity instead of influencer marketing.",
  },
  {
    name: "Ankita Sharma",
    location: "Jaipur",
    image: "/reviews/ankita.jpg",
    rating: 5,
    review: "Verified the batch number before opening. Everything checked out. Will be a repeat customer.",
  },
  {
    name: "Rohit Patel",
    location: "Ahmedabad",
    image: "/reviews/rohit.jpg",
    rating: 5,
    review: "Simple website, no gimmicks. Exactly what I want when buying supplements.",
  },
];

/* ================= REVIEW CARD ================= */

function ReviewCard({ item }: { item: typeof reviews[0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left flex-shrink-0 w-[300px] sm:w-[340px]">
      <StarRating count={item.rating} />
      <p className="text-[#F2C200] text-4xl leading-none font-serif mb-1 select-none">"</p>
      <p className="text-gray-800 text-sm leading-relaxed mb-5">{item.review}</p>
      <div className="w-full h-px bg-gray-100 mb-4" />
      <div className="flex items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-[#F2C200]/40 flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=F2C200&color=000&size=80`;
          }}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-400">{item.location}</p>
        </div>
        <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 border border-green-100 rounded-full px-2.5 py-0.5 flex-shrink-0">
          ✔ Verified
        </span>
      </div>
    </div>
  );
}

/* ================= AUTO-SCROLL CAROUSEL ================= */

function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const SPEED = 0.4;
  const doubled = [...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const init = requestAnimationFrame(() => {
      const halfWidth = track.scrollWidth / 2;
      const step = () => {
        if (!pausedRef.current) {
          posRef.current += SPEED;
          if (posRef.current >= halfWidth) posRef.current = 0;
          track.style.transform = `translateX(-${posRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="overflow-hidden w-full cursor-default"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onTouchStart={() => { pausedRef.current = true; }}
      onTouchEnd={() => { pausedRef.current = false; }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <ReviewCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ================= FEATURED PRODUCTS SECTION ================= */

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Only show products priced above ₹1,500
        const filtered = data.filter((p) => p.price > 100);
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#F2C200] uppercase mb-3">
              Premium Selection
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Supplements
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md">
              Hand-picked premium products , All verified authentic
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#F2C200] hover:text-[#d9ae00] transition flex-shrink-0"
          >
            View all →
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-72" />
            ))}
          </div>
        )}

        {/* Products — 2 per row always */}
{/* Products — 2 per row always */}
{!loading && products.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {products.map((product) => {
              const discountPercent =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : null;

              return (
                <Link
                  key={product._id}
                  href={`/shop/${product._id}`}
                  className="relative block bg-white border border-gray-200 rounded-2xl pt-36 pb-8 px-4 sm:px-6 hover:border-[#F2C200]/60 transition group"
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[#F2C200]/0 group-hover:bg-[#F2C200]/5 blur-2xl transition duration-300 pointer-events-none" />

                  {/* ── DISCOUNT BADGE — top-left corner of card ── */}
                  {discountPercent && (
                    <div className="absolute top-3 left-3 z-20 bg-[#F2C200] text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-md leading-none">
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Product image — floating at top of card */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                    {/* Glow blob behind image */}
                    <div className="absolute inset-0 bg-[#F2C200]/20 blur-3xl rounded-full opacity-70" />
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.18)] transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Card text */}
                  <div className="relative mt-5 z-10 text-center">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-4">
                      {product.category}
                    </p>

                    {/* Price row */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {product.originalPrice && (
                        <p className="text-xs text-red-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                      <p className="text-sm font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#F2C200] group-hover:text-[#ffd700] transition">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-16">
            No featured products available right now.
          </p>
        )}

        {/* Mobile "View all" link */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#F2C200] hover:text-[#d9ae00] transition"
          >
            View all products →
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ================= PAGE ================= */

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: "url('/Hero.png')" }}
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/70 to-white" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-28 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-black">
              Fuel Your <br />
              <span className="text-[#F2C200]">Performance</span>
            </h1>
            <p className="mt-6 text-gray-600 text-lg max-w-xl">
              CoreCharge Nutrition delivers{" "}
              <span className="text-gray-900 font-medium">100% authentic</span>{" "}
              science-backed supplements trusted by serious athletes across India.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link href="/shop" className="px-9 py-4 text-sm font-semibold rounded-md bg-[#F2C200] text-black hover:bg-[#d9ae00] transition shadow-lg shadow-[#F2C200]/20">
                Shop Supplements
              </Link>
              <Link href="/whychooseus" className="px-9 py-4 text-sm font-semibold rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Why CoreCharge
              </Link>
            </div>
            <div className="mt-10 flex gap-6 text-sm text-gray-500">
              <span>✔ Verified Brands</span>
              <span>✔ No Counterfeits</span>
              <span>✔ Secure Checkout</span>
            </div>
          </div>

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
      <section className="py-14 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900"><CountUp value={100} suffix="%" /></p>
            <p className="text-sm text-gray-500 mt-1">Satisfied Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900"><CountUp value={4} />.8 / 5</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900"><CountUp value={5} suffix="+" /></p>
            <p className="text-sm text-gray-500 mt-1">Premium Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900"><CountUp value={100} suffix="%" /></p>
            <p className="text-sm text-gray-500 mt-1">Authentic Products</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-24">Shop by Goal</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              { title: "Muscle Gain", intro: "Build size and lean muscle", products: "Whey Concentrate, Whey Isolate", image: "/whey.png" },
              { title: "Strength", intro: "Increase Strength", products: "Mass Gainers", image: "/creatine.png" },
              { title: "Performance", intro: "Perform better during workouts", products: "Pre-Workout , Omega 3 ", image: "/bcaa.png" },
            ].map((item) => (
              <Link
                key={item.title}
                href="/shop"
                className="relative block bg-white border border-gray-200 rounded-2xl pt-36 sm:pt-32 md:pt-28 pb-8 px-6 hover:border-[#F2C200]/60 transition group"
              >
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-52 sm:w-48 sm:h-48 md:w-44 md:h-44 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.intro}</p>
                  <p className="text-xs text-gray-500 mb-6">{item.products}</p>
                  <span className="inline-block text-sm font-semibold text-[#F2C200] hover:text-[#d9ae00]">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-24 border-t border-gray-200 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#F2C200] uppercase mb-3">
            What Our Customers Say
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Trusted by Real Athletes</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Real feedback from customers who care about authenticity.
          </p>
        </div>
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }}
          />
          <ReviewCarousel />
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <FeaturedProducts />

      {/* ================= PLATFORM TRUST ================= */}
      <section className="py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold mb-3">Trusted Checkout. Zero Risk.</h2>
            <p className="text-gray-600 text-sm">
              Payments and deliveries are handled by platforms you already trust.
              We never store your payment details.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#F2C200]/50 transition">
              <div className="flex items-center gap-6 mb-6">
                <img src="/logos/amazon.png" alt="Amazon" className="h-8 object-contain" />
                <img src="/logos/flipkart.webp" alt="Flipkart" className="h-8 object-contain" />
              </div>
              <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />
              <h3 className="text-lg font-bold mb-2">Amazon & Flipkart</h3>
              <p className="text-sm text-gray-600">
                Checkout and order fulfillment are completed on India's most trusted e-commerce platforms.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#F2C200]/50 transition">
              <div className="flex items-center gap-5 mb-6">
                <img src="/logos/upi.webp" alt="UPI" className="h-7 object-contain" />
                <img src="/logos/card.png" alt="Cards" className="h-7 object-contain" />
              </div>
              <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                Pay using UPI, cards, net banking, or COD — protected by platform-level security.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-[#F2C200]/50 transition">
              <div className="mb-6">
                <img src="/logos/returns.png" alt="Easy Returns" className="h-10 object-contain" />
              </div>
              <div className="w-10 h-[2px] bg-[#F2C200] mb-4" />
              <h3 className="text-lg font-bold mb-2">Easy Returns & Delivery</h3>
              <p className="text-sm text-gray-600">
                Fast shipping, reliable delivery, and hassle-free returns as per platform policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
            <img src="/physique.png" alt="Athlete physique training" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Train Hard. Fuel Smarter.</h2>
            <p className="text-gray-600 mb-10 max-w-lg text-sm">
              Real supplements for real results. No counterfeits, no compromises —
              only products trusted by serious athletes.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-12 py-4 text-sm font-bold rounded-md bg-[#F2C200] text-black hover:bg-[#d9ae00] transition shadow-xl shadow-[#F2C200]/20"
            >
              Explore Supplements
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SNAPSHOT ================= */}
      <section className="relative py-24 border-t border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/contact-bg.png')" }} />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Need Help? <span className="text-[#F2C200]">Talk to Us</span>
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-7xl mx-auto mb-6">
            Questions about product authenticity, orders, shipping, or supplements?
            Our support team is always happy to help you make the right choice.
          </p>
          <p className="text-sm md:text-base text-gray-700 max-w-7xl mx-auto mb-10">
            Whether you need help verifying your product, understanding ingredients,
            or tracking an order — just drop us an email and we'll take care of the rest.
          </p>
          <div className="mt-8">
            <p className="text-gray-900 font-medium mb-2">Email Support</p>
            <a
              href="mailto:corechargenutrition@gmail.com"
              className="inline-block text-[#F2C200] text-lg font-semibold hover:underline"
            >
              corechargenutrition@gmail.com
            </a>
          </div>
          <p className="mt-8 text-xs text-gray-500">
            We usually respond within 24–48 hours on business days.
          </p>
        </div>
      </section>

    </main>
  );
}