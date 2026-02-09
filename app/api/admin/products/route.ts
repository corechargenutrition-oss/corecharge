import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product"; // ✅ MUST be this

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  // SAFETY CHECK
  if (!body.heroImage) {
    return NextResponse.json(
      { error: "heroImage missing" },
      { status: 400 }
    );
  }

  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}
