import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().lean();
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
