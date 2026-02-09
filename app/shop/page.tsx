"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/* ================= TYPES ================= */

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  heroImage: string;
  inStock: boolean;
};

/* ================= PAGE ================= */

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("");

  /* ================= FETCH ================= */

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  /* ================= DERIVED FILTER DATA ================= */

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  /* ================= FILTER + SORT ================= */

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (priceRange) {
      list = list.filter((p) => {
        if (priceRange === "under-1000") return p.price < 1000;
        if (priceRange === "1000-3000") return p.price >= 1000 && p.price <= 3000;
        if (priceRange === "3000-6000") return p.price > 3000 && p.price <= 6000;
        if (priceRange === "above-6000") return p.price > 6000;
        return true;
      });
    }

    if (sort === "low-high") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      list.sort((a, b) => (a._id < b._id ? 1 : -1));
    }

    return list;
  }, [products, category, priceRange, sort]);

  return (
    <main className="bg-black text-gray-200">

      {/* ================= HERO ================= */}
      <section
        className="relative py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Shop <span className="text-[#F2C200]">Authentic Supplements</span>
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl">
            Browse verified supplements sourced only from authorized distributors.
            No counterfeits. No grey-market products.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[260px_1fr] gap-16">

          {/* ================= FILTERS ================= */}
          <aside className="hidden md:block">
            <div className="sticky top-28 space-y-10">

              {/* CATEGORY */}
              <FilterBlock title="Category">
                {categories.map((c) => (
                  <FilterItem
                    key={c}
                    active={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </FilterItem>
                ))}
              </FilterBlock>

              {/* PRICE */}
              <FilterBlock title="Price Range">
                <FilterItem onClick={() => setPriceRange("under-1000")}>
                  Under ₹1,000
                </FilterItem>
                <FilterItem onClick={() => setPriceRange("1000-3000")}>
                  ₹1,000 – ₹3,000
                </FilterItem>
                <FilterItem onClick={() => setPriceRange("3000-6000")}>
                  ₹3,000 – ₹6,000
                </FilterItem>
                <FilterItem onClick={() => setPriceRange("above-6000")}>
                  Above ₹6,000
                </FilterItem>
              </FilterBlock>

              <button
                onClick={() => {
                  setCategory(null);
                  setPriceRange(null);
                }}
                className="text-xs text-gray-400 hover:text-gray-200"
              >
                Clear all filters
              </button>

            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div>

            {/* SORT */}
            <div className="flex items-center justify-between mb-10">
              <p className="text-sm text-gray-400">
                Showing {filteredProducts.length} products
              </p>

              <select
                onChange={(e) => setSort(e.target.value)}
                className="bg-black border border-slate-700 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Sort by</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-gradient-to-br from-[#141414] to-[#0b0b0b] border border-slate-700 rounded-2xl p-6 hover:border-[#F2C200]/60 transition group"
                >
                  <div className="h-40 flex items-center justify-center mb-6">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Category: {product.category}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <Link
                      href={`/shop/${product._id}`}
                      className="text-xs font-semibold text-[#F2C200]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= UI HELPERS ================= */

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 text-sm text-gray-400">{children}</ul>
    </div>
  );
}

function FilterItem({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer hover:text-gray-200 ${
        active ? "text-[#F2C200]" : ""
      }`}
    >
      {children}
    </li>
  );
}
