import mongoose, { Schema, models } from "mongoose";

/**
 * Flavour-level data (leaf node of the hierarchy)
 * Each flavour belongs to a weight variant.
 */
const FlavourSchema = new Schema(
  {
    name: { type: String, required: true },       // e.g. "Chocolate"
    price: { type: Number, required: true },
    originalPrice: { type: Number },              // crossed-out MRP
    images: { type: [String], default: [] },      // gallery images for this flavour
    heroImage: { type: String, default: "" },     // main image for this flavour
    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    description: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    amazonLink: { type: String },
    flipkartLink: { type: String },
    externalLink: { type: String },
  },
  { _id: true }
);

/**
 * Weight-level variant.
 * A product can have multiple weights (1KG, 2KG, 4KG).
 * Each weight can have one or more flavours.
 */
const WeightVariantSchema = new Schema(
  {
    weight: { type: String, required: true },     // e.g. "1 KG"
    flavours: { type: [FlavourSchema], default: [] },
  },
  { _id: true }
);

/**
 * Top-level Product.
 *
 * variantType controls how the front-end renders the selector UI:
 *   "none"            → single weight, single flavour (legacy flat structure)
 *   "flavour-only"    → single weight, multiple flavours
 *   "weight-flavour"  → multiple weights, each with flavours
 *
 * The flat top-level fields (price, heroImage, etc.) are kept for
 * backward-compatibility with "none" products.
 */
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    category: { type: String },

    dietType: { type: String },
    netQuantity: { type: String },

    // ── Variant type ──────────────────────────────────────────────────────────
    variantType: {
      type: String,
      enum: ["none", "flavour-only", "weight-flavour"],
      default: "none",
    },

    // ── Flat / "none" fields (kept for backwards compat) ─────────────────────
    price: { type: Number },
    originalPrice: { type: Number },
    heroImage: { type: String, default: "" },
    images: { type: [String], default: [] },
    flavours: { type: [String], default: [] },   // legacy: just names
    benefits: { type: [String], default: [] },
    description: { type: String },
    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    amazonLink: { type: String },
    flipkartLink: { type: String },
    externalLink: { type: String },

    // ── Hierarchical variants ─────────────────────────────────────────────────
    variants: { type: [WeightVariantSchema], default: [] },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);