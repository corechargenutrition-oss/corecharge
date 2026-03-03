import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // ← NEW: the higher "crossed out" price
    category: { type: String },

    heroImage: { type: String, required: true },
    images: { type: [String], default: [] },

    flavours: { type: [String], default: [] },
    benefits: { type: [String], default: [] },

    weight: String,
    dietType: String,
    netQuantity: String,

    description: String,

    quantity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },

    amazonLink: String,
    flipkartLink: String,
    externalLink: String,
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);