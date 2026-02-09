'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

{/* LOGO */}
<Link
  href="/"
  className="text-lg font-semibold tracking-wide text-white"
>
  CoreCharge{" "}
  <span className="text-[#F2C200]">
    Nutrition
  </span>
</Link>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
          <Link href="/" className="hover:text-gray-100 transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-100 transition">
            Shop
          </Link>
          <Link href="/aboutus" className="hover:text-gray-100 transition">
            About Us
          </Link>
          <Link href="/whychooseus" className="hover:text-gray-100 transition">
            Why Choose Us
          </Link>
          <Link href="/reviews" className="hover:text-gray-100 transition">
            Reviews
          </Link>
          <Link href="/verify" className="hover:text-gray-100 transition">
            Verify
          </Link>
       
          <Link href="/contact" className="hover:text-gray-100 transition">
            Contact
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="ml-2 text-gray-300 hover:text-gray-100 transition"
            aria-label="Cart"
          >
            🛒
          </Link>

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
          className="md:hidden text-gray-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-[2px] bg-gray-300"></span>
            <span className="block w-6 h-[2px] bg-gray-300"></span>
            <span className="block w-6 h-[2px] bg-gray-300"></span>
          </div>
        </button>
      </div>

{/* MOBILE NAV */}
{open && (
  <div className="md:hidden border-t border-slate-800 bg-black">
    <nav className="px-4 py-6 space-y-4 text-sm text-gray-300">

      <Link href="/" onClick={() => setOpen(false)} className="block">
        Home
      </Link>

      <Link href="/shop" onClick={() => setOpen(false)} className="block">
        Shop
      </Link>

      <Link href="/aboutus" onClick={() => setOpen(false)} className="block">
        About Us
      </Link>

      <Link
        href="/whychooseus"
        onClick={() => setOpen(false)}
        className="block"
      >
        Why Choose Us
      </Link>

      <Link href="/reviews" onClick={() => setOpen(false)} className="block">
        Reviews
      </Link>
      <Link href="/verify" onClick={() => setOpen(false)} className="block">
        Verify
      </Link>
     

      <Link href="/contact" onClick={() => setOpen(false)} className="block">
        Contact
      </Link>

      {/* CART */}
      <Link
        href="/cart"
        onClick={() => setOpen(false)}
        className="block pt-2"
      >
        Cart
      </Link>

      {/* CTA */}
      <Link
        href="/shop"
        onClick={() => setOpen(false)}
        className="block mt-4 text-center px-6 py-3 rounded-md font-semibold bg-amber-500 text-black hover:bg-amber-400 transition"
      >
        Shop Now
      </Link>
    </nav>
  </div>
)}

    </header>
  );
}
