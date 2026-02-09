import jwt from "jsonwebtoken";

export function createAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
