import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { folder: "products" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    ).end(buffer);
  });

  return NextResponse.json(result);
}
