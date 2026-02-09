"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

/* ================= TYPES ================= */

type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  heroImage?: string;
};

/* ================= PAGE ================= */

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/admin/products/${id}`);
      if (!res.ok) {
        alert("Failed to load product");
        return;
      }
      const data: Product = await res.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  /* ================= SAVE ================= */

  async function save() {
    if (!product) return;

    setLoading(true);

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to update product");
      return;
    }

    alert("Product updated successfully");
  }

  /* ================= DELETE ================= */

  async function remove() {
    const ok = confirm("This product will be permanently deleted. Continue?");
    if (!ok) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }

    alert("Product deleted");
    router.push("/admin/products");
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-gray-200 p-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= HEADER CARD ================= */}
        <div className="flex items-center gap-6 p-6 border border-slate-800 rounded-xl bg-[#0e0e0e]">
          {product.heroImage && (
            <Image
              src={product.heroImage}
              alt={product.name}
              width={120}
              height={120}
              className="object-contain rounded-lg bg-black"
            />
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-400">{product.brand}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                product.inStock
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {product.inStock
                ? `In Stock (${product.quantity})`
                : "Out of Stock"}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={loading}
              className="px-5 py-2 bg-[#F2C200] text-black font-bold rounded-md"
            >
              Save
            </button>

            <button
              onClick={remove}
              className="px-5 py-2 bg-red-600 text-white font-bold rounded-md"
            >
              Delete
            </button>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="grid md:grid-cols-2 gap-8">

          <Card title="Basic Details">
            <Input
              label="Product Name"
              value={product.name}
              onChange={(v) =>
                setProduct({ ...product, name: v })
              }
            />

            <Input
              label="Brand"
              value={product.brand}
              onChange={(v) =>
                setProduct({ ...product, brand: v })
              }
            />

            <Input
              label="Category"
              value={product.category}
              onChange={(v) =>
                setProduct({ ...product, category: v })
              }
            />
          </Card>

          <Card title="Pricing & Stock">
            <Input
              label="Price (₹)"
              type="number"
              value={product.price}
              onChange={(v) =>
                setProduct({ ...product, price: Number(v) })
              }
            />

            <Input
              label="Stock Quantity"
              type="number"
              value={product.quantity}
              onChange={(v) => {
                const qty = Number(v);
                setProduct({
                  ...product,
                  quantity: qty,
                  inStock: qty > 0,
                });
              }}
            />
          </Card>
        </div>

        <Card title="Product Description">
          <Textarea
            label="Description"
            value={product.description}
            onChange={(v) =>
              setProduct({ ...product, description: v })
            }
          />
        </Card>

      </div>
    </main>
  );
}

/* ================= UI ================= */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-800 rounded-xl p-6 bg-[#0e0e0e]">
      <h3 className="text-sm font-bold mb-4 text-gray-300">{title}</h3>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-black border border-slate-700 rounded-md"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-black border border-slate-700 rounded-md"
      />
    </div>
  );
}
