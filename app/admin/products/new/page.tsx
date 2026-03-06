"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ─────────────────────────── constants ─────────────────────────── */

const CATEGORIES = [
  "Whey Protein", "Creatine", "Mass Gainer", "Multivitamins",
  "Omega 3", "Pre Workout", "BCAA", "Fat Burner",
];

/* ─────────────────────────── types ─────────────────────────── */

type FlavourEntry = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  heroImage: string;
  images: string[];
  quantity: string;
  description: string;
  benefits: string;
  amazonLink: string;
  flipkartLink: string;
  externalLink: string;
};

type WeightEntry = {
  id: string;
  weight: string;
  flavours: FlavourEntry[];
};

type VariantType = "none" | "flavour-only" | "weight-flavour";

/* ─────────────────────────── helpers ─────────────────────────── */

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function emptyFlavour(): FlavourEntry {
  return {
    id: uid(),
    name: "",
    price: "",
    originalPrice: "",
    heroImage: "",
    images: [],
    quantity: "",
    description: "",
    benefits: "",
    amazonLink: "",
    flipkartLink: "",
    externalLink: "",
  };
}

function emptyWeight(): WeightEntry {
  return { id: uid(), weight: "", flavours: [emptyFlavour()] };
}

/* ─────────────────────────── page ─────────────────────────── */

export default function NewProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── shared top-level fields ── */
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    dietType: "",
    netQuantity: "",
    /* flat fields – only used when variantType === "none" */
    originalPrice: "",
    price: "",
    flavours: "",
    weight: "",
    benefits: "",
    description: "",
    quantity: "",
    amazonLink: "",
    flipkartLink: "",
    externalLink: "",
  });

  const [heroImage, setHeroImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  /* ── variant type ── */
  const [variantType, setVariantType] = useState<VariantType>("none");

  /* ── flavour-only: single weight, multi flavour ── */
  const [flavourOnlyEntries, setFlavourOnlyEntries] = useState<FlavourEntry[]>([
    emptyFlavour(),
  ]);

  /* ── weight-flavour: multi weight, each with flavours ── */
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([
    emptyWeight(),
  ]);

  /* ─────────────── image upload ─────────────── */

  async function uploadImage(
    file: File,
    type: "hero" | "gallery" | "flavour-hero" | "flavour-gallery",
    meta?: { variantIdx?: number; flavourIdx?: number; weightIdx?: number }
  ) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    const url: string = data.url;

    if (type === "hero") setHeroImage(url);
    else if (type === "gallery") setImages((prev) => [...prev, url]);
    else if (type === "flavour-hero") {
      /* flavour-only */
      if (meta?.variantIdx !== undefined) {
        setFlavourOnlyEntries((prev) => {
          const next = [...prev];
          next[meta.variantIdx!] = { ...next[meta.variantIdx!], heroImage: url };
          return next;
        });
      }
      /* weight-flavour */
      if (meta?.weightIdx !== undefined && meta?.flavourIdx !== undefined) {
        setWeightEntries((prev) => {
          const next = prev.map((w) => ({ ...w, flavours: [...w.flavours] }));
          next[meta.weightIdx!].flavours[meta.flavourIdx!] = {
            ...next[meta.weightIdx!].flavours[meta.flavourIdx!],
            heroImage: url,
          };
          return next;
        });
      }
    } else if (type === "flavour-gallery") {
      if (meta?.variantIdx !== undefined) {
        setFlavourOnlyEntries((prev) => {
          const next = [...prev];
          next[meta.variantIdx!] = {
            ...next[meta.variantIdx!],
            images: [...next[meta.variantIdx!].images, url],
          };
          return next;
        });
      }
      if (meta?.weightIdx !== undefined && meta?.flavourIdx !== undefined) {
        setWeightEntries((prev) => {
          const next = prev.map((w) => ({ ...w, flavours: [...w.flavours] }));
          next[meta.weightIdx!].flavours[meta.flavourIdx!] = {
            ...next[meta.weightIdx!].flavours[meta.flavourIdx!],
            images: [
              ...next[meta.weightIdx!].flavours[meta.flavourIdx!].images,
              url,
            ],
          };
          return next;
        });
      }
    }

    setLoading(false);
  }

  /* ─────────────── submit ─────────────── */

  async function submit() {
    setLoading(true);

    let payload: Record<string, unknown> = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      dietType: form.dietType,
      netQuantity: form.netQuantity,
      variantType,
    };

    if (variantType === "none") {
      if (!heroImage) { alert("Hero image is required"); setLoading(false); return; }
      payload = {
        ...payload,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        heroImage,
        images,
        flavours: form.flavours.split(",").map((v) => v.trim()).filter(Boolean),
        weight: form.weight,
        benefits: form.benefits.split(",").map((v) => v.trim()).filter(Boolean),
        description: form.description,
        quantity: Number(form.quantity),
        inStock: Number(form.quantity) > 0,
        amazonLink: form.amazonLink || undefined,
        flipkartLink: form.flipkartLink || undefined,
        externalLink: form.externalLink || undefined,
        variants: [],
      };
    }

    if (variantType === "flavour-only") {
      /* Use first flavour's heroImage as top-level heroImage fallback */
      const firstHero = flavourOnlyEntries[0]?.heroImage || "";
      payload = {
        ...payload,
        heroImage: firstHero,
        price: Number(flavourOnlyEntries[0]?.price || 0),
        inStock: flavourOnlyEntries.some((f) => Number(f.quantity) > 0),
        quantity: flavourOnlyEntries.reduce((s, f) => s + Number(f.quantity || 0), 0),
        variants: [
          {
            weight: form.weight || "Standard",
            flavours: flavourOnlyEntries.map((f) => ({
              name: f.name,
              price: Number(f.price),
              originalPrice: f.originalPrice ? Number(f.originalPrice) : undefined,
              heroImage: f.heroImage,
              images: f.images,
              quantity: Number(f.quantity),
              inStock: Number(f.quantity) > 0,
              description: f.description,
              benefits: f.benefits.split(",").map((v) => v.trim()).filter(Boolean),
              amazonLink: f.amazonLink || undefined,
              flipkartLink: f.flipkartLink || undefined,
              externalLink: f.externalLink || undefined,
            })),
          },
        ],
      };
    }

    if (variantType === "weight-flavour") {
      const firstFlavour = weightEntries[0]?.flavours[0];
      payload = {
        ...payload,
        heroImage: firstFlavour?.heroImage || "",
        price: Number(firstFlavour?.price || 0),
        inStock: weightEntries.some((w) => w.flavours.some((f) => Number(f.quantity) > 0)),
        quantity: weightEntries.reduce(
          (s, w) => s + w.flavours.reduce((ss, f) => ss + Number(f.quantity || 0), 0),
          0
        ),
        variants: weightEntries.map((w) => ({
          weight: w.weight,
          flavours: w.flavours.map((f) => ({
            name: f.name,
            price: Number(f.price),
            originalPrice: f.originalPrice ? Number(f.originalPrice) : undefined,
            heroImage: f.heroImage,
            images: f.images,
            quantity: Number(f.quantity),
            inStock: Number(f.quantity) > 0,
            description: f.description,
            benefits: f.benefits.split(",").map((v) => v.trim()).filter(Boolean),
            amazonLink: f.amazonLink || undefined,
            flipkartLink: f.flipkartLink || undefined,
            externalLink: f.externalLink || undefined,
          })),
        })),
      };
    }

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) { alert("Failed to create product"); return; }
    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard"), 1500);
  }

  /* ─────────────── render helpers ─────────────── */

  function updateFlavourOnly(idx: number, key: keyof FlavourEntry, value: string) {
    setFlavourOnlyEntries((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [key]: value };
      return next;
    });
  }

  function updateWeightFlavour(
    wIdx: number,
    fIdx: number,
    key: keyof FlavourEntry,
    value: string
  ) {
    setWeightEntries((prev) => {
      const next = prev.map((w) => ({ ...w, flavours: [...w.flavours] }));
      next[wIdx].flavours[fIdx] = { ...next[wIdx].flavours[fIdx], [key]: value };
      return next;
    });
  }

  /* ─────────────── UI ─────────────── */

  return (
    <>
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

        {/* ── Shared top-level fields ── */}
        <Input label="Product Name" placeholder="Eg: CoreCharge Whey Protein Isolate" onChange={(v) => set("name", v)} />
        <Input label="Brand" placeholder="Eg: CoreCharge Nutrition" onChange={(v) => set("brand", v)} />

        <label className="block text-xs text-gray-400 mb-1">Category</label>
        <select className="w-full mb-6 p-3 bg-black border border-slate-700 rounded-md" onChange={(e) => set("category", e.target.value)}>
          <option value="">Select CoreCharge supplement category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <Input label="Diet Type" placeholder="Eg: Vegetarian / Non-Vegetarian" onChange={(v) => set("dietType", v)} />
        <Input label="Net Quantity" placeholder="Eg: 1 Jar / 60 Servings" onChange={(v) => set("netQuantity", v)} />

        {/* ── Variant type selector ── */}
        <div className="mb-8">
          <label className="block text-xs text-gray-400 mb-3">Product Variant Type</label>
          <div className="grid grid-cols-3 gap-4">
            {(["none", "flavour-only", "weight-flavour"] as VariantType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setVariantType(type)}
                className={`p-3 rounded-md border text-sm font-medium transition ${
                  variantType === type
                    ? "border-[#F2C200] text-[#F2C200] bg-[#F2C200]/10"
                    : "border-slate-700 text-gray-400 hover:border-slate-500"
                }`}
              >
                {type === "none" && "Single (No variants)"}
                {type === "flavour-only" && "Multiple Flavours"}
                {type === "weight-flavour" && "Multiple Weights & Flavours"}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════ VARIANT TYPE: NONE ══════════════ */}
        {variantType === "none" && (
          <div className="border border-slate-700 rounded-xl p-6 mb-8">
            <h2 className="text-sm font-semibold mb-4 text-[#F2C200]">Single Product Details</h2>
            <Input label="Original Price / MRP (₹)" type="number" placeholder="Eg: 5999" onChange={(v) => set("originalPrice", v)} />
            <Input label="Selling Price (₹)" type="number" placeholder="Eg: 5400" onChange={(v) => set("price", v)} />
            <Input label="Weight / Size" placeholder="Eg: 1kg / 2kg" onChange={(v) => set("weight", v)} />
            <Input label="Flavours" placeholder="Eg: Chocolate, Vanilla" onChange={(v) => set("flavours", v)} />
            <Input label="Benefits" placeholder="Eg: Muscle growth, Faster recovery" onChange={(v) => set("benefits", v)} />
            <Textarea label="Product Description" placeholder="Eg: CoreCharge Nutrition Whey Isolate…" onChange={(v) => set("description", v)} />
            <Input label="Amazon Link" placeholder="https://www.amazon.in/..." onChange={(v) => set("amazonLink", v)} />
            <Input label="Flipkart Link" placeholder="https://www.flipkart.com/..." onChange={(v) => set("flipkartLink", v)} />
            <Input label="External Website Link" placeholder="https://corechargenutrition.com/..." onChange={(v) => set("externalLink", v)} />
            <Input label="Stock Quantity" type="number" placeholder="Eg: 100" onChange={(v) => set("quantity", v)} />
            <UploadBox label="Hero Image" multiple={false} previews={heroImage ? [heroImage] : []} onUpload={(files) => uploadImage(files[0], "hero")} />
            <UploadBox label="Gallery Images" multiple previews={images} onUpload={(files) => files.forEach((f) => uploadImage(f, "gallery"))} />
          </div>
        )}

        {/* ══════════════ VARIANT TYPE: FLAVOUR-ONLY ══════════════ */}
        {variantType === "flavour-only" && (
          <div className="mb-8">
            <Input label="Weight / Size (applies to all flavours)" placeholder="Eg: 1 KG" onChange={(v) => set("weight", v)} />

            {flavourOnlyEntries.map((fl, fi) => (
              <div key={fl.id} className="border border-slate-700 rounded-xl p-6 mb-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[#F2C200]">Flavour {fi + 1}</h2>
                  {flavourOnlyEntries.length > 1 && (
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300"
                      onClick={() => setFlavourOnlyEntries((prev) => prev.filter((_, i) => i !== fi))}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <Input label="Flavour Name" placeholder="Eg: Chocolate" onChange={(v) => updateFlavourOnly(fi, "name", v)} />
                <Input label="Original Price / MRP (₹)" type="number" placeholder="Eg: 5999" onChange={(v) => updateFlavourOnly(fi, "originalPrice", v)} />
                <Input label="Selling Price (₹)" type="number" placeholder="Eg: 5400" onChange={(v) => updateFlavourOnly(fi, "price", v)} />
                <Input label="Stock Quantity" type="number" placeholder="Eg: 100" onChange={(v) => updateFlavourOnly(fi, "quantity", v)} />
                <Input label="Benefits" placeholder="Eg: Muscle growth, Faster recovery" onChange={(v) => updateFlavourOnly(fi, "benefits", v)} />
                <Textarea label="Description" placeholder="Product description for this flavour…" onChange={(v) => updateFlavourOnly(fi, "description", v)} />
                <Input label="Amazon Link" placeholder="https://www.amazon.in/..." onChange={(v) => updateFlavourOnly(fi, "amazonLink", v)} />
                <Input label="Flipkart Link" placeholder="https://www.flipkart.com/..." onChange={(v) => updateFlavourOnly(fi, "flipkartLink", v)} />
                <Input label="External Website Link" placeholder="https://corechargenutrition.com/..." onChange={(v) => updateFlavourOnly(fi, "externalLink", v)} />
                <UploadBox
                  label="Hero Image for this Flavour"
                  multiple={false}
                  previews={fl.heroImage ? [fl.heroImage] : []}
                  onUpload={(files) => uploadImage(files[0], "flavour-hero", { variantIdx: fi })}
                />
                <UploadBox
                  label="Gallery Images for this Flavour"
                  multiple
                  previews={fl.images}
                  onUpload={(files) => files.forEach((f) => uploadImage(f, "flavour-gallery", { variantIdx: fi }))}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => setFlavourOnlyEntries((prev) => [...prev, emptyFlavour()])}
              className="w-full py-3 border border-dashed border-[#F2C200]/50 text-[#F2C200] rounded-md text-sm hover:border-[#F2C200] transition"
            >
              + Add Flavour
            </button>
          </div>
        )}

        {/* ══════════════ VARIANT TYPE: WEIGHT-FLAVOUR ══════════════ */}
        {variantType === "weight-flavour" && (
          <div className="mb-8">
            {weightEntries.map((we, wi) => (
              <div key={we.id} className="border border-slate-600 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#F2C200]">Weight Variant {wi + 1}</h2>
                  {weightEntries.length > 1 && (
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:text-red-300"
                      onClick={() => setWeightEntries((prev) => prev.filter((_, i) => i !== wi))}
                    >
                      Remove Weight
                    </button>
                  )}
                </div>

                <Input
                  label="Weight / Size"
                  placeholder="Eg: 1 KG"
                  onChange={(v) =>
                    setWeightEntries((prev) => {
                      const next = [...prev];
                      next[wi] = { ...next[wi], weight: v };
                      return next;
                    })
                  }
                />

                {we.flavours.map((fl, fi) => (
                  <div key={fl.id} className="border border-slate-700 rounded-lg p-4 mb-4 ml-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-300">Flavour {fi + 1}</h3>
                      {we.flavours.length > 1 && (
                        <button
                          type="button"
                          className="text-xs text-red-400 hover:text-red-300"
                          onClick={() =>
                            setWeightEntries((prev) => {
                              const next = prev.map((w) => ({ ...w, flavours: [...w.flavours] }));
                              next[wi].flavours = next[wi].flavours.filter((_, i) => i !== fi);
                              return next;
                            })
                          }
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <Input label="Flavour Name" placeholder="Eg: Chocolate" onChange={(v) => updateWeightFlavour(wi, fi, "name", v)} />
                    <Input label="Original Price / MRP (₹)" type="number" placeholder="Eg: 5999" onChange={(v) => updateWeightFlavour(wi, fi, "originalPrice", v)} />
                    <Input label="Selling Price (₹)" type="number" placeholder="Eg: 5400" onChange={(v) => updateWeightFlavour(wi, fi, "price", v)} />
                    <Input label="Stock Quantity" type="number" placeholder="Eg: 100" onChange={(v) => updateWeightFlavour(wi, fi, "quantity", v)} />
                    <Input label="Benefits" placeholder="Eg: Muscle growth, Faster recovery" onChange={(v) => updateWeightFlavour(wi, fi, "benefits", v)} />
                    <Textarea label="Description" placeholder="Product description for this variant…" onChange={(v) => updateWeightFlavour(wi, fi, "description", v)} />
                    <Input label="Amazon Link" placeholder="https://www.amazon.in/..." onChange={(v) => updateWeightFlavour(wi, fi, "amazonLink", v)} />
                    <Input label="Flipkart Link" placeholder="https://www.flipkart.com/..." onChange={(v) => updateWeightFlavour(wi, fi, "flipkartLink", v)} />
                    <Input label="External Website Link" placeholder="https://corechargenutrition.com/..." onChange={(v) => updateWeightFlavour(wi, fi, "externalLink", v)} />
                    <UploadBox
                      label="Hero Image"
                      multiple={false}
                      previews={fl.heroImage ? [fl.heroImage] : []}
                      onUpload={(files) => uploadImage(files[0], "flavour-hero", { weightIdx: wi, flavourIdx: fi })}
                    />
                    <UploadBox
                      label="Gallery Images"
                      multiple
                      previews={fl.images}
                      onUpload={(files) => files.forEach((f) => uploadImage(f, "flavour-gallery", { weightIdx: wi, flavourIdx: fi }))}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setWeightEntries((prev) => {
                      const next = prev.map((w) => ({ ...w, flavours: [...w.flavours] }));
                      next[wi].flavours.push(emptyFlavour());
                      return next;
                    })
                  }
                  className="w-full py-2 border border-dashed border-slate-600 text-gray-400 rounded-md text-sm hover:border-[#F2C200]/50 hover:text-[#F2C200] transition ml-4 mt-2"
                  style={{ width: "calc(100% - 1rem)" }}
                >
                  + Add Flavour to this Weight
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setWeightEntries((prev) => [...prev, emptyWeight()])}
              className="w-full py-3 border border-dashed border-[#F2C200]/50 text-[#F2C200] rounded-md text-sm hover:border-[#F2C200] transition"
            >
              + Add Weight Variant
            </button>
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="mt-10 w-full py-4 bg-[#F2C200] text-black font-bold rounded-md disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save Product"}
        </button>
      </div>
    </>
  );

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
}

/* ─────────────────────────── shared UI components ─────────────────────────── */

function Input({
  label, placeholder, onChange, type = "text",
}: {
  label: string; placeholder?: string; onChange: (value: string) => void; type?: string;
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
  label, placeholder, onChange,
}: {
  label: string; placeholder?: string; onChange: (value: string) => void;
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
  label, multiple, onUpload, previews,
}: {
  label: string; multiple: boolean; onUpload: (files: File[]) => void; previews?: string[];
}) {
  return (
    <div className="mb-6">
      <label className="block text-xs text-gray-400 mb-2">{label}</label>
      <label className="flex flex-col items-center justify-center gap-2 p-6 border border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-[#F2C200] transition">
        <span className="text-3xl">📤</span>
        <span className="text-sm text-gray-300">{multiple ? "Upload multiple images" : "Upload image"}</span>
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && onUpload(Array.from(e.target.files))}
        />
      </label>
      {previews && previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((src, i) => (
            <div key={i} className="border border-slate-700 rounded-lg p-2 bg-black">
              <img src={src} alt="Preview" className="w-full h-28 object-contain" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}