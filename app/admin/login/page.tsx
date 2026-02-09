'use client';

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("❌ Incorrect admin password");
      return;
    }

    // success
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#111] border border-slate-800 p-8 rounded-2xl w-full max-w-sm">

        <h1 className="text-xl font-bold mb-2 text-gray-100">
          Admin Login
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Authorized access only
        </p>

        <input
          type="password"
          placeholder="Enter admin password"
          className="
            w-full mb-3 p-3
            bg-black border border-slate-700
            rounded-md text-sm text-gray-200
            focus:outline-none focus:border-[#F2C200]
          "
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-xs text-red-500 mb-3">
            {error}
          </p>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="
            w-full py-3 rounded-md
            bg-[#F2C200] text-black
            font-bold text-sm
            hover:bg-[#d9ae00]
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </div>
    </div>
  );
}
