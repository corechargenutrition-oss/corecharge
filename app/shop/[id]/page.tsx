"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

/* ================= TYPES ================= */

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;

  heroImage: string;
  images: string[];

  flavours?: string[];
  weight?: string;
  dietType?: string;
  netQuantity?: string;

  description: string;
  benefits: string[];

  amazonLink?: string;
  flipkartLink?: string;
  externalLink?: string;

  inStock: boolean;
  quantity: number;
};

type Review = {
  name: string;
  rating: number;
  comment: string;
};

/* ================= FAKE REVIEWS ================= */

const NAMES = [
  "Amit Sharma",
  "Rahul Verma",
  "Sneha Patel",
  "Priya Singh",
  "Karan Mehta",
  "Ankit Yadav",
  "Neha Gupta",
];

const COMMENTS = [
  "Really good quality, results visible in 2 weeks.",
  "Taste is decent and mixes well.",
  "Worth the price, will buy again.",
  "Helped in muscle recovery a lot.",
  "Packaging was good and delivery was fast.",
  "Not the best taste, but results are solid.",
];

function generateReviews(seed: string): Review[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const count = (hash % 3) + 3; // 3–5 reviews

  return Array.from({ length: count }).map((_, i) => ({
    name: NAMES[(hash + i) % NAMES.length],
    rating: ((hash + i) % 2) + 4, // 4–5 stars
    comment: COMMENTS[(hash + i * 2) % COMMENTS.length],
  }));
}

/* ================= PAGE ================= */

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
        { cache: "no-store" }
      );

      if (!res.ok) return;

      const data: Product = await res.json();
      setProduct(data);
      setActiveImage(data.heroImage);
      setReviews(generateReviews(data._id));
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  return (
    <main className="bg-black text-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">

        {/* ================= IMAGES ================= */}
        <div>
          {/* HERO IMAGE WITH ZOOM */}
          <div className="mb-6 flex justify-center border border-slate-800 rounded-xl p-6 overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              width={520}
              height={520}
              className="object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
              priority
            />
          </div>

          {/* GALLERY */}
          <div className="flex gap-4 justify-center flex-wrap">
            {[product.heroImage, ...product.images]
              .filter((img, i, arr) => arr.indexOf(img) === i)
              .map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-2 ${
                    activeImage === img
                      ? "border-[#F2C200]"
                      : "border-slate-700 hover:border-[#F2C200]/60"
                  }`}
                >
                  <img src={img} className="w-24 h-24 object-contain" />
                </button>
              ))}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div>
          <p className="text-sm text-gray-400">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-500 mb-4">
            Category: {product.category}
          </p>

          <p className="text-2xl font-bold text-[#F2C200] mb-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* PRODUCT META */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            {product.flavours && (
              <p><span className="text-gray-400">Flavours:</span> {product.flavours.join(", ")}</p>
            )}
            {product.weight && (
              <p><span className="text-gray-400">Weight:</span> {product.weight}</p>
            )}
            {product.dietType && (
              <p><span className="text-gray-400">Diet:</span> {product.dietType}</p>
            )}
            {product.netQuantity && (
              <p><span className="text-gray-400">Net Qty:</span> {product.netQuantity}</p>
            )}
          </div>

          <p className={`mb-4 ${product.inStock ? "text-green-400" : "text-red-400"}`}>
            {product.inStock
              ? `In Stock (${product.quantity})`
              : "Out of Stock"}
          </p>

          <p className="text-sm text-gray-400 mb-6">
            {product.description}
          </p>

          {/* BENEFITS */}
          <ul className="mb-6 space-y-1 text-sm">
            {product.benefits.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>
        {/* ================= BUY LINKS ================= */}
        <div className="flex flex-col gap-4">
            {product.amazonLink && (
              <a
                href={product.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center hover:bg-[#d9ae00] transition"
              >
                Buy on Amazon
              </a>
            )}

            {product.flipkartLink && (
              <a
                href={product.flipkartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center hover:bg-[#d9ae00] transition"
              >
                Buy on Flipkart
              </a>
            )}

            {product.externalLink && (
              <a
                href={product.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-bold rounded-md border border-[#F2C200] text-[#F2C200] text-center hover:bg-[#F2C200] hover:text-black transition"
              >
                Visit Official Website
              </a>
            )}

            {!product.inStock && (
              <div className="px-8 py-4 text-center font-bold rounded-md bg-gray-700 text-gray-300 cursor-not-allowed">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="space-y-6">
          {reviews.map((r, i) => (
            <div key={i} className="border border-slate-800 rounded-xl p-4">
              <p className="font-semibold">{r.name}</p>
              <p className="text-[#F2C200] text-sm">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </p>
              <p className="text-sm text-gray-400 mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ================= BUTTON STYLES ================= */
