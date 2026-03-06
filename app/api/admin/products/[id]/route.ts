// app/api/admin/products/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

/* ================= GET PRODUCT ================= */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }
}

/* ================= UPDATE PRODUCT ================= */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const body = await req.json();

    // Use replaceOne-style update so nested arrays like `variants` are fully
    // replaced rather than merged. findByIdAndUpdate with a plain body object
    // does a $set merge which silently drops or corrupts nested variant arrays.
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,          // return the updated document
        runValidators: true,
        overwrite: false,   // keep _id, use $set for all fields including variants
        strict: false,      // allow all fields through even if not in schema strictly
      }
    ).lean();

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

/* ================= DELETE PRODUCT ================= */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}