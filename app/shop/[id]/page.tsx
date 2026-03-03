"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ================= TYPES ================= */

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;

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

/* ================= PAGE ================= */

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [recommended, setRecommended] = useState<Product[]>([]);

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

      const allRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        { cache: "no-store" }
      );

      const allProducts: Product[] = await allRes.json();

      const filtered = allProducts
        .filter((p) => p._id !== data._id)
        .slice(0, 3);

      setRecommended(filtered);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-gray-500 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  return (
    <main className="bg-white text-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">

        {/* ================= IMAGES ================= */}
        <div>
          <div className="mb-6 flex justify-center border border-gray-200 rounded-xl p-6 overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              width={520}
              height={520}
              className="object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
              priority
            />
          </div>

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
                      : "border-gray-300 hover:border-[#F2C200]/60"
                  }`}
                >
                  <img src={img} className="w-24 h-24 object-contain" />
                </button>
              ))}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-600 mb-4">
            Category: {product.category}
          </p>

          <div className="flex items-center gap-3 mb-4">
            {product.originalPrice && (
              <p className="text-xl text-red-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-2xl font-bold text-[#F2C200]">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            {product.flavours && (
              <p><span className="text-gray-500">Flavours:</span> {product.flavours.join(", ")}</p>
            )}
            {product.weight && (
              <p><span className="text-gray-500">Weight:</span> {product.weight}</p>
            )}
            {product.dietType && (
              <p><span className="text-gray-500">Diet:</span> {product.dietType}</p>
            )}
            {product.netQuantity && (
              <p><span className="text-gray-500">Net Qty:</span> {product.netQuantity}</p>
            )}
          </div>

          <p className={`mb-4 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
            {product.inStock
              ? `In Stock (${product.quantity})`
              : "Out of Stock"}
          </p>

          <p className="text-sm text-gray-600 mb-6">
            {product.description}
          </p>

          <ul className="mb-6 space-y-1 text-sm">
            {product.benefits.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          {/* ================= BUY LINKS ================= */}
          <div className="flex flex-col gap-4">
            {product.amazonLink && (
              <a href={product.amazonLink} target="_blank" className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center">
                Buy on Amazon
              </a>
            )}

            {product.flipkartLink && (
              <a href={product.flipkartLink} target="_blank" className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center">
                Buy on Flipkart
              </a>
            )}

            {product.externalLink && (
              <a href={product.externalLink} target="_blank" className="px-8 py-4 font-bold rounded-md border border-[#F2C200] text-[#F2C200] text-center">
                Visit Official Website
              </a>
            )}

            {!product.inStock && (
              <div className="px-8 py-4 text-center font-bold rounded-md bg-gray-200 text-gray-600">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>

{/* ================= RECOMMENDED ================= */}
<div className="max-w-6xl mx-auto px-4 mt-24">
        <h2 className="text-2xl font-bold mb-10">You may also like</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {recommended.map((item) => {
            const discountPercent =
              item.originalPrice && item.originalPrice > item.price
                ? Math.round(
                    ((item.originalPrice - item.price) / item.originalPrice) * 100
                  )
                : null;

            return (
              <Link
                key={item._id}
                href={`/shop/${item._id}`}
                className="
                  relative block
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  p-6
                  hover:border-[#F2C200]/60
                  transition
                  group
                "
              >
                {/* DISCOUNT BADGE */}
                {discountPercent && (
                  <div className="absolute top-3 left-3 z-20 bg-[#F2C200] text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-md leading-none">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="h-40 flex items-center justify-center mb-6">
                  <img
                    src={item.heroImage}
                    alt={item.name}
                    className="
                      h-full object-contain
                      drop-shadow-[0_30px_45px_rgba(0,0,0,0.2)]
                      group-hover:scale-105 transition
                    "
                  />
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">
                    {item.brand}
                  </p>

                  <h3 className="text-sm font-semibold mb-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2">
                    {item.originalPrice && (
                      <p className="text-xs text-red-500 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#F2C200]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}