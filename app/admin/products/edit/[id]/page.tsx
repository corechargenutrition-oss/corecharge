"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

/* ================= CONSTANTS ================= */

const CATEGORIES = [
  "Whey Protein", "Creatine", "Mass Gainer", "Multivitamins",
  "Omega 3", "Pre Workout", "BCAA", "Fat Burner",
];

/* ================= TYPES ================= */

type FlavourEntry = {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  heroImage: string;
  images: string[];
  quantity: number;
  inStock: boolean;
  description: string;
  benefits: string[];
  amazonLink: string;
  flipkartLink: string;
  externalLink: string;
};

type WeightVariant = {
  _id?: string;
  weight: string;
  flavours: FlavourEntry[];
};

type VariantType = "none" | "flavour-only" | "weight-flavour";

type Product = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  dietType: string;
  netQuantity: string;
  variantType: VariantType;
  /* flat fields */
  price: number;
  originalPrice: number;
  heroImage: string;
  images: string[];
  flavours: string[];
  weight: string;
  benefits: string[];
  description: string;
  quantity: number;
  inStock: boolean;
  amazonLink: string;
  flipkartLink: string;
  externalLink: string;
  /* hierarchical */
  variants: WeightVariant[];
};

/* ================= HELPERS ================= */

function emptyFlavour(): FlavourEntry {
  return {
    name: "", price: 0, originalPrice: undefined,
    heroImage: "", images: [], quantity: 0, inStock: false,
    description: "", benefits: [],
    amazonLink: "", flipkartLink: "", externalLink: "",
  };
}

function emptyWeight(): WeightVariant {
  return { weight: "", flavours: [emptyFlavour()] };
}

const cls = "w-full p-3 bg-black border border-slate-700 rounded-md text-gray-200 text-sm focus:outline-none focus:border-[#F2C200]/60";

/* ================= PAGE ================= */

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  /* ── fetch ── */
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/products/${id}`);
      if (!res.ok) { alert("Failed to load product"); return; }
      const data = await res.json();

      /* normalise every field so controlled inputs never receive undefined */
      const normalised: Product = {
        _id:           data._id ?? "",
        name:          data.name ?? "",
        brand:         data.brand ?? "",
        category:      data.category ?? "",
        dietType:      data.dietType ?? "",
        netQuantity:   data.netQuantity ?? "",
        variantType:   data.variantType ?? "none",
        price:         data.price ?? 0,
        originalPrice: data.originalPrice ?? 0,
        heroImage:     data.heroImage ?? "",
        images:        Array.isArray(data.images) ? data.images : [],
        flavours:      Array.isArray(data.flavours) ? data.flavours : [],
        weight:        data.weight ?? "",
        benefits:      Array.isArray(data.benefits) ? data.benefits : [],
        description:   data.description ?? "",
        quantity:      data.quantity ?? 0,
        inStock:       data.inStock ?? false,
        amazonLink:    data.amazonLink ?? "",
        flipkartLink:  data.flipkartLink ?? "",
        externalLink:  data.externalLink ?? "",
        variants: Array.isArray(data.variants)
          ? data.variants.map((w: WeightVariant) => ({
              ...w,
              weight: w.weight ?? "",
              flavours: Array.isArray(w.flavours)
                ? w.flavours.map((f: FlavourEntry) => ({
                    ...f,
                    name:          f.name ?? "",
                    price:         f.price ?? 0,
                    originalPrice: f.originalPrice ?? undefined,
                    heroImage:     f.heroImage ?? "",
                    images:        Array.isArray(f.images) ? f.images : [],
                    quantity:      f.quantity ?? 0,
                    inStock:       f.inStock ?? false,
                    description:   f.description ?? "",
                    benefits:      Array.isArray(f.benefits) ? f.benefits : [],
                    amazonLink:    f.amazonLink ?? "",
                    flipkartLink:  f.flipkartLink ?? "",
                    externalLink:  f.externalLink ?? "",
                  }))
                : [emptyFlavour()],
            }))
          : [],
      };

      setProduct(normalised);
    }
    load();
  }, [id]);

  /* ── image upload ── */
  async function uploadImage(file: File, key: string): Promise<string> {
    setUploadingKey(key);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploadingKey(null);
    return data.url as string;
  }

  /* ── save ── */
  async function save() {
    if (!product) return;
    setLoading(true);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setLoading(false);
    if (!res.ok) { alert("Failed to update product"); return; }
    alert("Product updated successfully");
  }

  /* ── delete ── */
  async function remove() {
    if (!confirm("Permanently delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) { alert("Failed to delete product"); return; }
    router.push("/admin/products");
  }

  /* ── setters ── */
  function setP<K extends keyof Product>(key: K, val: Product[K]) {
    setProduct((p) => p ? { ...p, [key]: val } : p);
  }

  function switchVariantType(type: VariantType) {
    setProduct((p) => {
      if (!p) return p;
      let variants = p.variants;
      /* auto-seed an empty block so the UI shows something immediately */
      if (type === "flavour-only" && variants.length === 0) {
        variants = [{ weight: "Standard", flavours: [emptyFlavour()] }];
      }
      if (type === "weight-flavour" && variants.length === 0) {
        variants = [emptyWeight()];
      }
      return { ...p, variantType: type, variants };
    });
  }

  function setWeightField(wi: number, weight: string) {
    setProduct((p) => {
      if (!p) return p;
      const variants = p.variants.map((w, i) => i === wi ? { ...w, weight } : w);
      return { ...p, variants };
    });
  }

  function setFlavour<K extends keyof FlavourEntry>(wi: number, fi: number, key: K, val: FlavourEntry[K]) {
    setProduct((p) => {
      if (!p) return p;
      const variants = p.variants.map((w, i) => {
        if (i !== wi) return w;
        const flavours = w.flavours.map((f, j) => j === fi ? { ...f, [key]: val } : f);
        return { ...w, flavours };
      });
      return { ...p, variants };
    });
  }

  function addWeight() {
    setProduct((p) => p ? { ...p, variants: [...p.variants, emptyWeight()] } : p);
  }

  function removeWeight(wi: number) {
    setProduct((p) => p ? { ...p, variants: p.variants.filter((_, i) => i !== wi) } : p);
  }

  function addFlavour(wi: number) {
    setProduct((p) => {
      if (!p) return p;
      const variants = p.variants.map((w, i) =>
        i === wi ? { ...w, flavours: [...w.flavours, emptyFlavour()] } : w
      );
      return { ...p, variants };
    });
  }

  function removeFlavour(wi: number, fi: number) {
    setProduct((p) => {
      if (!p) return p;
      const variants = p.variants.map((w, i) =>
        i === wi ? { ...w, flavours: w.flavours.filter((_, j) => j !== fi) } : w
      );
      return { ...p, variants };
    });
  }

  /* ── loading state ── */
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  const isVariant = product.variantType !== "none";

  /* ── render ── */
  return (
    <main className="min-h-screen bg-black text-gray-200 pb-20">
      <div className="max-w-5xl mx-auto p-10 space-y-8">

        {/* ══ HEADER ══ */}
        <div className="flex items-center gap-6 p-6 border border-slate-800 rounded-xl bg-[#0e0e0e]">
          {product.heroImage ? (
            <Image src={product.heroImage} alt={product.name} width={90} height={90}
              className="object-contain rounded-lg bg-black shrink-0" />
          ) : (
            <div className="w-[90px] h-[90px] rounded-lg bg-slate-800 shrink-0 flex items-center justify-center text-gray-600 text-xs">
              No image
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold truncate">{product.name || "Untitled Product"}</h1>
            <p className="text-sm text-gray-400">{product.brand}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
              product.inStock ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
            }`}>
              {product.inStock ? `In Stock (${product.quantity})` : "Out of Stock"}
            </span>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={save} disabled={loading}
              className="px-5 py-2 bg-[#F2C200] text-black font-bold rounded-md disabled:opacity-50">
              {loading ? "Saving…" : "Save"}
            </button>
            <button onClick={remove}
              className="px-5 py-2 bg-red-600 text-white font-bold rounded-md">
              Delete
            </button>
          </div>
        </div>

        {/* ══ BASIC INFO ══ */}
        <Section title="Basic Details">
          <Grid2>
            <Field label="Product Name" span2>
              <input className={cls} value={product.name}
                onChange={(e) => setP("name", e.target.value)} />
            </Field>
            <Field label="Brand">
              <input className={cls} value={product.brand}
                onChange={(e) => setP("brand", e.target.value)} />
            </Field>
            <Field label="Category">
              <select className={cls} value={product.category}
                onChange={(e) => setP("category", e.target.value)}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Diet Type">
              <input className={cls} value={product.dietType} placeholder="Eg: Vegetarian"
                onChange={(e) => setP("dietType", e.target.value)} />
            </Field>
            <Field label="Net Quantity">
              <input className={cls} value={product.netQuantity} placeholder="Eg: 60 Servings"
                onChange={(e) => setP("netQuantity", e.target.value)} />
            </Field>
          </Grid2>
        </Section>

        {/* ══ VARIANT TYPE ══ */}
        <Section title="Variant Type">
          <div className="grid grid-cols-3 gap-4">
            {(["none", "flavour-only", "weight-flavour"] as VariantType[]).map((type) => (
              <button key={type} type="button" onClick={() => switchVariantType(type)}
                className={`p-3 rounded-md border text-sm font-medium transition ${
                  product.variantType === type
                    ? "border-[#F2C200] text-[#F2C200] bg-[#F2C200]/10"
                    : "border-slate-700 text-gray-400 hover:border-slate-500"
                }`}>
                {type === "none" && "Single (No variants)"}
                {type === "flavour-only" && "Multiple Flavours"}
                {type === "weight-flavour" && "Multiple Weights & Flavours"}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Switching type auto-seeds empty variant fields if none exist. Existing data is never deleted.
          </p>
        </Section>

        {/* ══════════ FLAT / NONE ══════════ */}
        {!isVariant && (
          <>
            <Section title="Pricing & Stock">
              <Grid2>
                <Field label="Original Price / MRP (₹)">
                  <input type="number" className={cls} value={product.originalPrice || ""}
                    placeholder="Eg: 5999"
                    onChange={(e) => setP("originalPrice", e.target.value ? Number(e.target.value) : 0)} />
                </Field>
                <Field label="Selling Price (₹)">
                  <input type="number" className={cls} value={product.price}
                    onChange={(e) => setP("price", Number(e.target.value))} />
                </Field>
                <Field label="Stock Quantity">
                  <input type="number" className={cls} value={product.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      setProduct((p) => p ? { ...p, quantity: qty, inStock: qty > 0 } : p);
                    }} />
                </Field>
              </Grid2>
            </Section>

            <Section title="Product Details">
              <Grid2>
                <Field label="Weight / Size">
                  <input className={cls} value={product.weight} placeholder="Eg: 1 KG"
                    onChange={(e) => setP("weight", e.target.value)} />
                </Field>
                <Field label="Flavours (comma-separated)">
                  <input className={cls} value={product.flavours.join(", ")}
                    placeholder="Eg: Chocolate, Vanilla"
                    onChange={(e) => setP("flavours", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))} />
                </Field>
                <Field label="Benefits (comma-separated)" span2>
                  <input className={cls} value={product.benefits.join(", ")}
                    placeholder="Eg: Muscle growth, Faster recovery"
                    onChange={(e) => setP("benefits", e.target.value.split(",").map((v) => v.trim()).filter(Boolean))} />
                </Field>
                <Field label="Description" span2>
                  <textarea rows={4} className={cls} value={product.description}
                    onChange={(e) => setP("description", e.target.value)} />
                </Field>
              </Grid2>
            </Section>

            <Section title="Purchase Links">
              <Grid2>
                <Field label="Amazon Link">
                  <input className={cls} value={product.amazonLink}
                    onChange={(e) => setP("amazonLink", e.target.value)} />
                </Field>
                <Field label="Flipkart Link">
                  <input className={cls} value={product.flipkartLink}
                    onChange={(e) => setP("flipkartLink", e.target.value)} />
                </Field>
                <Field label="External Website Link" span2>
                  <input className={cls} value={product.externalLink}
                    onChange={(e) => setP("externalLink", e.target.value)} />
                </Field>
              </Grid2>
            </Section>

            <Section title="Images">
              <p className="text-xs text-gray-400 mb-2">Hero Image</p>
              <div className="flex gap-3 flex-wrap mb-3">
                {product.heroImage && (
                  <ImageThumb src={product.heroImage}
                    onRemove={() => setP("heroImage", "")} />
                )}
              </div>
              <Uploader label="Replace Hero Image"
                uploading={uploadingKey === "flat-hero"}
                onFile={async (f) => { const url = await uploadImage(f, "flat-hero"); setP("heroImage", url); }} />

              <p className="text-xs text-gray-400 mt-6 mb-2">Gallery Images</p>
              <div className="flex gap-3 flex-wrap mb-3">
                {product.images.map((img, i) => (
                  <ImageThumb key={i} src={img}
                    onRemove={() => setP("images", product.images.filter((_, j) => j !== i))} />
                ))}
              </div>
              <Uploader label="Add Gallery Image" multiple
                uploading={uploadingKey === "flat-gallery"}
                onFile={async (f) => { const url = await uploadImage(f, "flat-gallery"); setP("images", [...product.images, url]); }} />
            </Section>
          </>
        )}

        {/* ══════════ VARIANT SECTIONS ══════════ */}
        {isVariant && (
          <div className="space-y-6">

            {/* For flavour-only: single shared weight label */}
            {product.variantType === "flavour-only" && (
              <Section title="Weight / Size">
                <Field label="Weight (applies to all flavours)">
                  <input className={cls}
                    value={product.variants[0]?.weight ?? ""}
                    placeholder="Eg: 1 KG"
                    onChange={(e) => {
                      setProduct((p) => {
                        if (!p) return p;
                        const variants = p.variants.map((w) => ({ ...w, weight: e.target.value }));
                        return { ...p, variants };
                      });
                    }} />
                </Field>
              </Section>
            )}

            {product.variants.map((wv, wi) => (
              <div key={wi} className="border border-slate-700 rounded-xl overflow-hidden">

                {/* Weight header row — only for weight-flavour */}
                {product.variantType === "weight-flavour" && (
                  <div className="flex items-center justify-between px-6 py-4 bg-[#0e0e0e] border-b border-slate-700">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-xs font-bold text-[#F2C200] shrink-0">WEIGHT {wi + 1}</span>
                      <input className={`${cls} max-w-xs`} value={wv.weight}
                        placeholder="Eg: 2 KG"
                        onChange={(e) => setWeightField(wi, e.target.value)} />
                    </div>
                    {product.variants.length > 1 && (
                      <button onClick={() => removeWeight(wi)}
                        className="text-xs text-red-400 hover:text-red-300 ml-4">
                        Remove Weight
                      </button>
                    )}
                  </div>
                )}

                {/* Flavours */}
                <div className="p-6 space-y-6">
                  {wv.flavours.map((fl, fi) => (
                    <div key={fi} className="border border-slate-600 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                          Flavour {fi + 1}
                        </h4>
                        {wv.flavours.length > 1 && (
                          <button onClick={() => removeFlavour(wi, fi)}
                            className="text-xs text-red-400 hover:text-red-300">
                            Remove Flavour
                          </button>
                        )}
                      </div>

                      <Grid2>
                        <Field label="Flavour Name">
                          <input className={cls} value={fl.name} placeholder="Eg: Chocolate"
                            onChange={(e) => setFlavour(wi, fi, "name", e.target.value)} />
                        </Field>
                        <Field label="Original Price / MRP (₹)">
                          <input type="number" className={cls} value={fl.originalPrice ?? ""}
                            placeholder="Eg: 5999"
                            onChange={(e) => setFlavour(wi, fi, "originalPrice", e.target.value ? Number(e.target.value) : undefined)} />
                        </Field>
                        <Field label="Selling Price (₹)">
                          <input type="number" className={cls} value={fl.price}
                            onChange={(e) => setFlavour(wi, fi, "price", Number(e.target.value))} />
                        </Field>
                        <Field label="Stock Quantity">
                          <input type="number" className={cls} value={fl.quantity}
                            onChange={(e) => {
                              const qty = Number(e.target.value);
                              setFlavour(wi, fi, "quantity", qty);
                              setFlavour(wi, fi, "inStock", qty > 0);
                            }} />
                        </Field>
                        <Field label="Benefits (comma-separated)" span2>
                          <input className={cls} value={fl.benefits.join(", ")}
                            placeholder="Eg: Muscle growth, Recovery"
                            onChange={(e) => setFlavour(wi, fi, "benefits",
                              e.target.value.split(",").map((v) => v.trim()).filter(Boolean)
                            )} />
                        </Field>
                        <Field label="Description" span2>
                          <textarea rows={3} className={cls} value={fl.description}
                            onChange={(e) => setFlavour(wi, fi, "description", e.target.value)} />
                        </Field>
                        <Field label="Amazon Link">
                          <input className={cls} value={fl.amazonLink}
                            onChange={(e) => setFlavour(wi, fi, "amazonLink", e.target.value)} />
                        </Field>
                        <Field label="Flipkart Link">
                          <input className={cls} value={fl.flipkartLink}
                            onChange={(e) => setFlavour(wi, fi, "flipkartLink", e.target.value)} />
                        </Field>
                        <Field label="External Link" span2>
                          <input className={cls} value={fl.externalLink}
                            onChange={(e) => setFlavour(wi, fi, "externalLink", e.target.value)} />
                        </Field>
                      </Grid2>

                      {/* Flavour images */}
                      <div className="mt-5 grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Hero Image</p>
                          {fl.heroImage && (
                            <div className="mb-2">
                              <ImageThumb src={fl.heroImage}
                                onRemove={() => setFlavour(wi, fi, "heroImage", "")} />
                            </div>
                          )}
                          <Uploader label="Replace Hero Image"
                            uploading={uploadingKey === `h-${wi}-${fi}`}
                            onFile={async (f) => {
                              const url = await uploadImage(f, `h-${wi}-${fi}`);
                              setFlavour(wi, fi, "heroImage", url);
                            }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Gallery Images</p>
                          <div className="flex gap-2 flex-wrap mb-2">
                            {fl.images.map((img, ii) => (
                              <ImageThumb key={ii} src={img}
                                onRemove={() => setFlavour(wi, fi, "images",
                                  fl.images.filter((_, j) => j !== ii)
                                )} />
                            ))}
                          </div>
                          <Uploader label="Add Gallery Image" multiple
                            uploading={uploadingKey === `g-${wi}-${fi}`}
                            onFile={async (f) => {
                              const url = await uploadImage(f, `g-${wi}-${fi}`);
                              setFlavour(wi, fi, "images", [...fl.images, url]);
                            }} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button onClick={() => addFlavour(wi)}
                    className="w-full py-2 border border-dashed border-slate-600 text-gray-400 rounded-lg text-sm hover:border-[#F2C200]/50 hover:text-[#F2C200] transition">
                    + Add Flavour
                  </button>
                </div>
              </div>
            ))}

            {product.variantType === "weight-flavour" && (
              <button onClick={addWeight}
                className="w-full py-3 border border-dashed border-[#F2C200]/50 text-[#F2C200] rounded-xl text-sm hover:border-[#F2C200] transition">
                + Add Weight Variant
              </button>
            )}
          </div>
        )}

        {/* ══ BOTTOM ACTIONS ══ */}
        <div className="flex gap-4 pt-4">
          <button onClick={save} disabled={loading}
            className="flex-1 py-4 bg-[#F2C200] text-black font-bold rounded-md disabled:opacity-50">
            {loading ? "Saving…" : "Save Changes"}
          </button>
          <button onClick={remove}
            className="px-8 py-4 bg-red-600 text-white font-bold rounded-md">
            Delete Product
          </button>
        </div>

      </div>
    </main>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-800 rounded-xl p-6 bg-[#0e0e0e]">
      <h3 className="text-sm font-bold mb-5 text-[#F2C200]">{title}</h3>
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, children, span2 = false }: {
  label: string; children: React.ReactNode; span2?: boolean;
}) {
  return (
    <div className={span2 ? "md:col-span-2" : ""}>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function ImageThumb({ src, onRemove }: { src: string; onRemove: () => void }) {
  return (
    <div className="relative border border-slate-700 rounded-lg p-1.5 bg-black group w-fit">
      <img src={src} className="w-20 h-20 object-contain" alt="" />
      <button onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full w-5 h-5 hidden group-hover:flex items-center justify-center font-bold">
        ✕
      </button>
    </div>
  );
}

function Uploader({ label, onFile, uploading, multiple = false }: {
  label: string; onFile: (file: File) => void;
  uploading: boolean; multiple?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-[#F2C200]/60 transition text-sm text-gray-400 hover:text-[#F2C200]">
      {uploading ? "Uploading…" : `📤 ${label}`}
      <input type="file" accept="image/*" multiple={multiple} className="hidden"
        onChange={(e) => { if (e.target.files) Array.from(e.target.files).forEach(onFile); }} />
    </label>
  );
}