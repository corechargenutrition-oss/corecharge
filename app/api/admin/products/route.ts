// app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  // heroImage is only required for flat "none" products.
  // Variant products store images per-flavour so heroImage may be empty or
  // derived from the first flavour on the front-end.
  if (body.variantType === "none" || !body.variantType) {
    if (!body.heroImage) {
      return NextResponse.json(
        { error: "heroImage missing" },
        { status: 400 }
      );
    }
  }

  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}