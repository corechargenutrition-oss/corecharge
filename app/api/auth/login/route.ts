import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createAdminToken();

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  return res;
}
