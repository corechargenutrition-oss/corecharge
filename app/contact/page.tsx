'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative border-b border-gray-200 py-20 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/contact-bg.png')",
          }}
        />

        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-white/70" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Contact <span className="text-[#F2C200]">CoreCharge Nutrition</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
            Questions about authenticity, orders, or supplements?
            Our team is here to help you make informed decisions.
          </p>
        </div>

      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">

          {/* LEFT — SUPPORT INFO */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200">

            {/* LIGHT OVERLAY */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />

            {/* CONTENT */}
            <div className="relative z-10 p-10 md:p-12">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Get in Touch
              </h2>

              <p className="text-sm text-gray-600 mb-6 max-w-md">
                We respond only to genuine queries related to product authenticity,
                usage guidance, and order-related support.
              </p>

              <p className="text-sm text-gray-600 mb-10 max-w-md">
                For faster assistance, please include your order ID (if applicable)
                and clearly describe your concern in the email.
              </p>

              <div>
                <p className="text-gray-900 font-medium mb-2">
                  Email Support
                </p>
                <a
                  href="mailto:corechargenutrition@gmail.com"
                  className="text-[#F2C200] text-lg font-semibold hover:underline"
                >
                  corechargenutrition@gmail.com
                </a>
              </div>

              <p className="mt-8 text-xs text-gray-500">
                We usually respond within 24–48 hours on business days.
              </p>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            {!submitted ? (
              <>
                <h3 className="text-lg font-bold mb-6">
                  Send Us a Message
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  {[
                    { label: 'Name', type: 'text' },
                    { label: 'Email', type: 'email' },
                    { label: 'Subject', type: 'text' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs text-gray-500 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        className="
                          w-full bg-white border border-gray-300
                          rounded-md px-4 py-3
                          text-sm text-gray-900
                          focus:outline-none focus:border-[#F2C200]
                        "
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs text-gray-500 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="
                        w-full bg-white border border-gray-300
                        rounded-md px-4 py-3
                        text-sm text-gray-900
                        focus:outline-none focus:border-[#F2C200]
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    className="
                      w-full bg-[#F2C200] text-black
                      py-3 rounded-md
                      text-sm font-bold
                      hover:bg-[#d9ae00]
                      transition
                      shadow-lg shadow-[#F2C200]/20
                    "
                  >
                    Submit Message
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold mb-3">
                  Message Sent
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Thank you for reaching out.
                  Our team will get back to you shortly.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <section className="border-t border-gray-200 py-14 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            CoreCharge Nutrition does not provide medical advice.
            Please consult a qualified healthcare professional for health-related concerns.
          </p>
        </div>
      </section>

    </main>
  );
}