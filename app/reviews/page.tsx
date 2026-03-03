'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReviewsAndFAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const reviews = [
    {
      name: "Anushka Verma",
      location: "Delhi",
      image: "/reviews/anushka.jpg",
      review:
        "I’ve been lifting for 6+ years and fake supplements are a real problem. CoreCharge is the first platform where I actually trust the sourcing.",
    },
    {
      name: "Rahul Mehta",
      location: "Mumbai",
      image: "/reviews/rahul.jpg",
      review:
        "Packaging was sealed, batch number verified on the brand site. Delivery was fast through Amazon. No complaints.",
    },
    {
      name: "Kiran Singh",
      location: "Chandigarh",
      image: "/reviews/kiran.jpg",
      review:
        "Clear labels, authentic brands, and solid support when I had questions. No overpromising.",
    },
    {
      name: "Siddharth Jain",
      location: "Bengaluru",
      image: "/reviews/siddharth.jpg",
      review:
        "Finally a supplement platform that focuses on authenticity instead of influencer marketing.",
    },
    {
      name: "Ankita Sharma",
      location: "Jaipur",
      image: "/reviews/ankita.jpg",
      review:
        "Verified the batch number before opening. Everything checked out.",
    },
    {
      name: "Rohit Patel",
      location: "Ahmedabad",
      image: "/reviews/rohit.jpg",
      review:
        "Simple website, no gimmicks. Exactly what I want when buying supplements.",
    },
  ];

  const faqs = [
    {
      category: 'Authenticity & Quality',
      questions: [
        {
          q: 'Are all products 100% authentic?',
          a: 'Yes. Every product is sourced only from authorized distributors or official brand supply chains.',
        },
        {
          q: 'How can I verify authenticity?',
          a: 'Each product has a verifiable batch number that can be checked on the brand’s official website.',
        },
      ],
    },
    {
      category: 'Ordering & Payments',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'You are redirected to Amazon or Flipkart to complete your purchase securely.',
        },
        {
          q: 'What payment methods are available?',
          a: 'UPI, debit/credit cards, net banking, wallets, and Cash on Delivery.',
        },
      ],
    },
    {
      category: 'Shipping & Returns',
      questions: [
        {
          q: 'How long does delivery take?',
          a: '2–5 business days in major cities and 5–7 days elsewhere.',
        },
        {
          q: 'What is the return policy?',
          a: 'Returns are governed by Amazon or Flipkart policies.',
        },
      ],
    },
  ];

  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section
        className="relative border-b border-gray-200 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/reviews.png')" }}
      >
        <div className="absolute inset-0 bg-white/70" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Trusted by Athletes.{" "}
            <span className="text-[#F2C200]">Backed by Proof.</span>
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-sm">
            Real customer feedback and clear answers about authenticity,
            ordering, and safety.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-14 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['100%', 'Satisfied Customers'],
            ['4.8 / 5', 'Average Rating'],
            ['5+', 'Premium Products'],
            ['100%', 'Authentic Products'],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10">
            Customer Reviews
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                  “{item.review}”
                </p>

                <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                      {item.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 space-y-14">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg font-semibold mb-6">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.questions.map((item, itemIndex) => {
                  const globalIndex = sectionIndex * 100 + itemIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={itemIndex}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : globalIndex)
                        }
                        className="w-full flex justify-between px-5 py-4 text-left hover:bg-gray-100"
                      >
                        <span className="text-sm font-medium">
                          {item.q}
                        </span>
                        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          ↓
                        </span>
                      </button>

                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="px-5 pb-4 text-sm text-gray-600">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Our team is here to help you make informed supplement choices.
          </p>
          <Link
            href="/contact"
            className="
              inline-flex items-center justify-center
              px-10 py-4 text-sm font-bold rounded-md
              bg-[#F2C200] text-black
              hover:bg-[#d9ae00]
              transition
            "
          >
            Contact CoreCharge Nutrition
          </Link>
        </div>
      </section>

    </main>
  );
}