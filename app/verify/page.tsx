"use client";

import { useState } from "react";

/* ================= FAKE AUTHENTIC CODES ================= */
/* Alphabet-only, 5 characters */

const VALID_CODES = [
  "AXRQP",
  "ZLMTA",
  "KOPWE",
  "TRXMA",
  "QAZLP",
  "MNKRT",
  "PLXAE",
  "RWQTY",
  "ABKLM",
  "XTRAP",
];

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function verifyCode() {
    const formatted = code.trim().toUpperCase();

    if (VALID_CODES.includes(formatted)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md
          bg-gradient-to-br from-[#141414] to-[#0b0b0b]
          border border-slate-800
          rounded-2xl
          p-10
          text-center
        "
      >
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-2">
          Verify Product Authenticity
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Scratch the code on your product and enter it below to verify
          authenticity.
        </p>

        {/* INPUT */}
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus("idle");
          }}
          placeholder="Enter 5-letter code"
          maxLength={5}
          className="
            w-full
            text-center
            uppercase
            tracking-widest
            text-lg
            p-4
            mb-6
            bg-black
            border border-slate-700
            rounded-md
            focus:outline-none
            focus:border-[#F2C200]
          "
        />

        {/* BUTTON */}
        <button
          onClick={verifyCode}
          className="
            w-full
            py-4
            font-bold
            rounded-md
            bg-[#F2C200]
            text-black
            hover:bg-[#d9ae00]
            transition
          "
        >
          Verify Product
        </button>

        {/* RESULT */}
        {status === "success" && (
          <div className="mt-8 text-green-400">
            <div className="text-5xl mb-3">✔️</div>
            <p className="font-bold">Product Verified</p>
            <p className="text-sm text-gray-400 mt-1">
              This product is 100% authentic.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 text-red-400">
            <div className="text-5xl mb-3">✖️</div>
            <p className="font-bold">Invalid Code</p>
            <p className="text-sm text-gray-400 mt-1">
              Please check the code and try again.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
