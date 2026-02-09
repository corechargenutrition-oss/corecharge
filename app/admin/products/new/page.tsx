"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ================= CONSTANTS ================= */

const CATEGORIES = [
  "Whey Protein",
  "Creatine",
  "Mass Gainer",
  "Multivitamins",
  "Omega 3",
  "Pre Workout",
  "BCAA",
  "Fat Burner",
];

/* ================= PAGE ================= */

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [heroImage, setHeroImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    flavours: "",
    weight: "",
    dietType: "",
    netQuantity: "",
    benefits: "",
    description: "",
    quantity: "",
    amazonLink: "",
    flipkartLink: "",
    externalLink: "",
  });

  /* ================= IMAGE UPLOAD ================= */

  async function uploadImage(file: File, type: "hero" | "gallery") {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (type === "hero") {
      setHeroImage(data.url);
    } else {
      setImages((prev) => [...prev, data.url]);
    }

    setLoading(false);
  }

  /* ================= SUBMIT ================= */

  async function submit() {
    if (!heroImage) {
      alert("Hero image is required");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      category: form.category,

      heroImage,
      images,

      flavours: form.flavours.split(",").map((v: string) => v.trim()),
      weight: form.weight,
      dietType: form.dietType,
      netQuantity: form.netQuantity,

      benefits: form.benefits.split(",").map((v: string) => v.trim()),
      description: form.description,

      quantity: Number(form.quantity),
      inStock: Number(form.quantity) > 0,

      amazonLink: form.amazonLink || undefined,
      flipkartLink: form.flipkartLink || undefined,
      externalLink: form.externalLink || undefined,
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard"), 1500);
  }

  /* ================= UI ================= */

  return (
    <>
      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl text-[#F2C200] mb-4">✓</div>
            <h2 className="text-xl font-bold">Product Added Successfully</h2>
            <p className="text-sm text-gray-400">Redirecting to dashboard…</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-10 text-gray-200">
        <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

        <Input
          label="Product Name"
          placeholder="Eg: CoreCharge Whey Protein Isolate"
          onChange={(v: string) => set("name", v)}
        />

        <Input
          label="Brand"
          placeholder="Eg: CoreCharge Nutrition"
          onChange={(v: string) => set("brand", v)}
        />

        <Input
          label="Price (₹)"
          type="number"
          placeholder="Eg: 2999"
          onChange={(v: string) => set("price", v)}
        />

        {/* CATEGORY */}
        <label className="block text-xs text-gray-400 mb-1">Category</label>
        <select
          className="w-full mb-6 p-3 bg-black border border-slate-700 rounded-md"
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="">Select CoreCharge supplement category</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <Input
          label="Flavours"
          placeholder="Eg: Chocolate, Vanilla"
          onChange={(v: string) => set("flavours", v)}
        />

        <Input
          label="Weight / Size"
          placeholder="Eg: 1kg / 2kg"
          onChange={(v: string) => set("weight", v)}
        />

        <Input
          label="Diet Type"
          placeholder="Eg: Vegetarian / Non-Vegetarian"
          onChange={(v: string) => set("dietType", v)}
        />

        <Input
          label="Net Quantity"
          placeholder="Eg: 1 Jar / 60 Servings"
          onChange={(v: string) => set("netQuantity", v)}
        />

        <Input
          label="Benefits"
          placeholder="Eg: Muscle growth, Faster recovery, Improved strength"
          onChange={(v: string) => set("benefits", v)}
        />

        <Textarea
          label="Product Description"
          placeholder="Eg: CoreCharge Nutrition Whey Isolate is formulated using high-quality protein, advanced filtration, and tested for purity, quality, and performance."
          onChange={(v: string) => set("description", v)}
        />

        <Input
          label="Amazon Link"
          placeholder="https://www.amazon.in/corecharge-product-link"
          onChange={(v: string) => set("amazonLink", v)}
        />

        <Input
          label="Flipkart Link"
          placeholder="https://www.flipkart.com/corecharge-product-link"
          onChange={(v: string) => set("flipkartLink", v)}
        />

        <Input
          label="External Website Link"
          placeholder="https://corechargenutrition.com/product"
          onChange={(v: string) => set("externalLink", v)}
        />

        <Input
          label="Stock Quantity"
          type="number"
          placeholder="Eg: 100"
          onChange={(v: string) => set("quantity", v)}
        />

        {/* HERO IMAGE */}
        <UploadBox
          label="Hero Image (Main product image)"
          multiple={false}
          previews={heroImage ? [heroImage] : []}
          onUpload={(files) => uploadImage(files[0], "hero")}
        />

        {/* GALLERY */}
        <UploadBox
          label="Gallery Images (Additional product angles)"
          multiple
          previews={images}
          onUpload={(files) =>
            files.forEach((file) => uploadImage(file, "gallery"))
          }
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-10 w-full py-4 bg-[#F2C200] text-black font-bold rounded-md"
        >
          Save Product
        </button>
      </div>
    </>
  );

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
}

/* ================= REUSABLE UI ================= */

function Input({
  label,
  placeholder,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 bg-black border border-slate-700 rounded-md"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  onChange,
}: {
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full p-3 bg-black border border-slate-700 rounded-md"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function UploadBox({
  label,
  multiple,
  onUpload,
  previews,
}: {
  label: string;
  multiple: boolean;
  onUpload: (files: File[]) => void;
  previews?: string[];
}) {
  return (
    <div className="mb-8">
      <label className="block text-xs text-gray-400 mb-2">{label}</label>

      <label className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-[#F2C200] transition">
        <span className="text-3xl">📤</span>
        <span className="text-sm text-gray-300">
          {multiple ? "Upload multiple images" : "Upload image"}
        </span>

        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) =>
            e.target.files && onUpload(Array.from(e.target.files))
          }
        />
      </label>

      {previews && previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((src, i) => (
            <div
              key={i}
              className="border border-slate-700 rounded-lg p-2 bg-black"
            >
              <img
                src={src}
                alt="Preview"
                className="w-full h-28 object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
