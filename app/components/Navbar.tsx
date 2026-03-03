'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  /* ================= LOAD THEME ================= */
  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      document.body.classList.add('dark-theme');
      setDarkTheme(true);
    }
  }, []);

  /* ================= TOGGLE ================= */
  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      setDarkTheme(false);
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      setDarkTheme(true);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">

          {/* MOBILE LOGO + TEXT */}
          <div className="md:hidden flex items-center gap-0">
            <Image
              src="/logo2.png"
              alt="CoreCharge Nutrition Logo"
              width={120}
              height={120}
              className="w-25 h-49 object-contain"
            />
            <span className="text-l font-semibold text-gray-900 tracking-wide">
              CoreCharge <span className="text-[#F2C200]">Nutrition</span>
            </span>
          </div>

          {/* DESKTOP TEXT LOGO */}
          <div className="hidden md:block text-lg font-semibold tracking-wide text-gray-900">
            CoreCharge <span className="text-[#F2C200]">Nutrition</span>
          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-gray-700">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/shop" className="hover:text-gray-900 transition">Shop</Link>
          <Link href="/aboutus" className="hover:text-gray-900 transition">About Us</Link>
          <Link href="/whychooseus" className="hover:text-gray-900 transition">Why Choose Us</Link>
          <Link href="/reviews" className="hover:text-gray-900 transition">Reviews</Link>
          <Link href="/verify" className="hover:text-gray-900 transition">Verify</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>

          {/* CART */}
          <Link href="/cart" className="ml-2 text-gray-700 hover:text-gray-900 transition" aria-label="Cart">
            🛒
          </Link>

          {/* THEME TOGGLE */}
          {/* <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="ml-1 text-lg transition"
            aria-label="Toggle theme"
            title={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkTheme ? '🌙' : '☀️'}
          </button> */}

          {/* PRIMARY CTA */}
          <Link
            href="/shop"
            className="ml-3 inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-semibold bg-[#F2C200] text-black hover:bg-amber-400 transition"
          >
            Shop Now
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-[2px] bg-gray-700"></span>
            <span className="block w-6 h-[2px] bg-gray-700"></span>
            <span className="block w-6 h-[2px] bg-gray-700"></span>
          </div>
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-6 space-y-4 text-sm text-gray-700">
            <Link href="/" onClick={() => setOpen(false)} className="block">Home</Link>
            <Link href="/shop" onClick={() => setOpen(false)} className="block">Shop</Link>
            <Link href="/aboutus" onClick={() => setOpen(false)} className="block">About Us</Link>
            <Link href="/whychooseus" onClick={() => setOpen(false)} className="block">Why Choose Us</Link>
            <Link href="/reviews" onClick={() => setOpen(false)} className="block">Reviews</Link>
            <Link href="/verify" onClick={() => setOpen(false)} className="block">Verify</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block">Contact</Link>

            <Link href="/cart" onClick={() => setOpen(false)} className="block pt-2">Cart</Link>

            {/* THEME TOGGLE MOBILE */}
            {/* <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="block text-sm text-gray-700"
            >
              {darkTheme ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button> */}

            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center px-6 py-3 rounded-md font-semibold bg-[#F2C200] text-black hover:bg-amber-400 transition"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}