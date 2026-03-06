"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ================= TYPES ================= */

type FlavourEntry = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  heroImage: string;
  images: string[];
  quantity: number;
  inStock: boolean;
  description: string;
  benefits: string[];
  amazonLink?: string;
  flipkartLink?: string;
  externalLink?: string;
};

type WeightVariant = {
  _id: string;
  weight: string;
  flavours: FlavourEntry[];
};

type Product = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  dietType?: string;
  netQuantity?: string;
  variantType: "none" | "flavour-only" | "weight-flavour";
  price: number;
  originalPrice?: number;
  heroImage: string;
  images: string[];
  flavours?: string[];
  weight?: string;
  description: string;
  benefits: string[];
  inStock: boolean;
  quantity: number;
  amazonLink?: string;
  flipkartLink?: string;
  externalLink?: string;
  variants: WeightVariant[];
};

/* ── safe helpers ── */
function hasVariants(product: Product): boolean {
  return (
    !!product.variantType &&
    product.variantType !== "none" &&
    Array.isArray(product.variants) &&
    product.variants.length > 0
  );
}

function safeVariants(product: Product): WeightVariant[] {
  return Array.isArray(product.variants) ? product.variants : [];
}

/* ================= PAGE ================= */

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);

  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedWeightIdx, setSelectedWeightIdx] = useState<number>(0);
  const [selectedFlavourIdx, setSelectedFlavourIdx] = useState<number>(0);

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
      setRecommended(allProducts.filter((p) => p._id !== data._id).slice(0, 3));
    }
    fetchProduct();
  }, [id]);

  const activeFlavour: FlavourEntry | null = (() => {
    if (!product || !hasVariants(product)) return null;
    const variants = safeVariants(product);
    const wv = variants[selectedWeightIdx];
    if (!wv || !Array.isArray(wv.flavours) || wv.flavours.length === 0) return null;
    return wv.flavours[selectedFlavourIdx] ?? null;
  })();

  function selectWeight(wIdx: number) {
    setSelectedWeightIdx(wIdx);
    setSelectedFlavourIdx(0);
    const fl = product ? safeVariants(product)[wIdx]?.flavours?.[0] : undefined;
    if (fl?.heroImage) setActiveImage(fl.heroImage);
  }

  function selectFlavour(fIdx: number) {
    setSelectedFlavourIdx(fIdx);
    const wv = product ? safeVariants(product)[selectedWeightIdx] : undefined;
    const fl = wv?.flavours?.[fIdx];
    if (fl?.heroImage) setActiveImage(fl.heroImage);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-gray-500 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  const displayPrice = activeFlavour ? activeFlavour.price : product.price;
  const displayOriginalPrice = activeFlavour ? activeFlavour.originalPrice : product.originalPrice;
  const displayHeroImage = activeFlavour?.heroImage || product.heroImage;
  const displayGallery = activeFlavour ? activeFlavour.images ?? [] : product.images ?? [];
  const displayDescription = activeFlavour?.description || product.description;
  const displayBenefits = activeFlavour ? activeFlavour.benefits ?? [] : product.benefits ?? [];
  const displayInStock = activeFlavour ? activeFlavour.inStock : product.inStock;
  const displayQuantity = activeFlavour ? activeFlavour.quantity : product.quantity;
  const displayAmazon = activeFlavour?.amazonLink ?? product.amazonLink;
  const displayFlipkart = activeFlavour?.flipkartLink ?? product.flipkartLink;
  const displayExternal = activeFlavour?.externalLink ?? product.externalLink;

  const allImages = [displayHeroImage, ...displayGallery].filter(
    (img, i, arr) => img && arr.indexOf(img) === i
  );

  const variants = safeVariants(product);

  return (
    <main className="bg-white text-gray-900 py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16">

        {/* ================= IMAGES ================= */}
        <div>
          <div className="mb-6 flex justify-center border border-gray-200 rounded-xl p-6 overflow-hidden">
            <Image
              src={activeImage || displayHeroImage}
              alt={product.name}
              width={520}
              height={520}
              className="object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
              priority
            />
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {allImages.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`border rounded-lg p-2 ${
                  (activeImage || displayHeroImage) === img
                    ? "border-[#F2C200]"
                    : "border-gray-300 hover:border-[#F2C200]/60"
                }`}
              >
                <img src={img} className="w-24 h-24 object-contain" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>

          <div className="flex items-center gap-3 mb-6">
            {displayOriginalPrice && (
              <p className="text-xl text-red-500 line-through">
                ₹{displayOriginalPrice.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-2xl font-bold text-black">
              ₹{displayPrice.toLocaleString("en-IN")}
            </p>
          </div>

          {/* ── WEIGHT SELECTOR ── */}
          {product.variantType === "weight-flavour" && variants.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2 font-medium">
                Size:{" "}
                <span className="font-bold text-gray-900">
                  {variants[selectedWeightIdx]?.weight}
                </span>
              </p>
              <div className="flex flex-wrap gap-3">
                {variants.map((wv, wi) => {
                  const flavours = Array.isArray(wv.flavours) ? wv.flavours : [];
                  const lowestFl =
                    flavours.length > 0
                      ? flavours.reduce(
                          (low, fl) => (fl.price < low.price ? fl : low),
                          flavours[0]
                        )
                      : null;
                  return (
                    <button
                      key={wv._id}
                      onClick={() => selectWeight(wi)}
                      className={`border rounded-xl px-4 py-3 text-left transition ${
                        selectedWeightIdx === wi
                          ? "border-[#F2C200] bg-[#F2C200]/5"
                          : "border-gray-300 hover:border-[#F2C200]/60"
                      }`}
                    >
                      <p className="text-sm font-bold">{wv.weight}</p>
                      {lowestFl && (
                        <>
                          <p className="text-sm font-semibold text-black">
                            ₹{lowestFl.price.toLocaleString("en-IN")}
                          </p>
                          {lowestFl.originalPrice && (
                            <p className="text-xs text-red-400 line-through">
                              ₹{lowestFl.originalPrice.toLocaleString("en-IN")}
                            </p>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── FLAVOUR SELECTOR ── */}
          {hasVariants(product) &&
            (product.variantType === "flavour-only" ||
              product.variantType === "weight-flavour") &&
            Array.isArray(variants[selectedWeightIdx]?.flavours) &&
            variants[selectedWeightIdx].flavours.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  Flavour:{" "}
                  <span className="font-bold text-gray-900">
                    {variants[selectedWeightIdx]?.flavours[selectedFlavourIdx]?.name}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {variants[selectedWeightIdx].flavours.map((fl, fi) => (
                    <button
                      key={fl._id}
                      onClick={() => selectFlavour(fi)}
                      className={`border rounded-xl px-4 py-3 text-left transition ${
                        selectedFlavourIdx === fi
                          ? "border-[#F2C200] bg-[#F2C200]/5"
                          : "border-gray-300 hover:border-[#F2C200]/60"
                      }`}
                    >
                      <p className="text-sm font-bold">{fl.name}</p>
                      <p className="text-sm font-semibold text-black">
                        ₹{fl.price.toLocaleString("en-IN")}
                      </p>
                      {fl.originalPrice && (
                        <p className="text-xs text-red-400 line-through">
                          ₹{fl.originalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Flat info for legacy/none products */}
          {(!product.variantType || product.variantType === "none") && (
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              {product.flavours && product.flavours.length > 0 && (
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
          )}

          {/* Diet / Net Qty for variant products */}
          {(product.dietType || product.netQuantity) &&
            product.variantType &&
            product.variantType !== "none" && (
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                {product.dietType && (
                  <p><span className="text-gray-500">Diet:</span> {product.dietType}</p>
                )}
                {product.netQuantity && (
                  <p><span className="text-gray-500">Net Qty:</span> {product.netQuantity}</p>
                )}
              </div>
            )}

          <p className={`mb-4 ${displayInStock ? "text-green-600" : "text-red-600"}`}>
            {displayInStock ? `In Stock (${displayQuantity})` : "Out of Stock"}
          </p>

          <p className="text-sm text-gray-600 mb-6">{displayDescription}</p>

          <ul className="mb-6 space-y-1 text-sm">
            {displayBenefits.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          {/* ================= BUY LINKS ================= */}
          <div className="flex flex-col gap-4">
            {displayAmazon && (
              <a href={displayAmazon} target="_blank" className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center">
                Buy on Amazon
              </a>
            )}
            {displayFlipkart && (
              <a href={displayFlipkart} target="_blank" className="px-8 py-4 font-bold rounded-md bg-[#F2C200] text-black text-center">
                Buy on Flipkart
              </a>
            )}
            {displayExternal && (
              <a href={displayExternal} target="_blank" className="px-8 py-4 font-bold rounded-md border border-[#F2C200] text-[#F2C200] text-center">
                Visit Official Website
              </a>
            )}
            {!displayInStock && (
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
            const itemVariants = Array.isArray(item.variants) ? item.variants : [];
            const firstFlavour =
              item.variantType &&
              item.variantType !== "none" &&
              itemVariants.length > 0 &&
              Array.isArray(itemVariants[0]?.flavours) &&
              itemVariants[0].flavours.length > 0
                ? itemVariants[0].flavours[0]
                : null;

            const itemPrice = firstFlavour ? firstFlavour.price : item.price;
            const itemOriginal = firstFlavour ? firstFlavour.originalPrice : item.originalPrice;
            const discountPercent =
              itemOriginal && itemOriginal > itemPrice
                ? Math.round(((itemOriginal - itemPrice) / itemOriginal) * 100)
                : null;

            return (
              <Link
                key={item._id}
                href={`/shop/${item._id}`}
                className="relative block bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#F2C200]/60 transition group"
              >
                {discountPercent && (
                  <div className="absolute top-3 left-3 z-20 bg-[#F2C200] text-black text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-md leading-none">
                    {discountPercent}% OFF
                  </div>
                )}
                <div className="h-40 flex items-center justify-center mb-6">
                  <img
                    src={item.heroImage}
                    alt={item.name}
                    className="h-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.2)] group-hover:scale-105 transition"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                  <h3 className="text-sm font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    {itemOriginal && (
                      <p className="text-xs text-red-500 line-through">
                        ₹{itemOriginal.toLocaleString("en-IN")}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#F2C200]">
                      ₹{itemPrice.toLocaleString("en-IN")}
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