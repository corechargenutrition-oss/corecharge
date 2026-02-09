import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/* ================= FONT ================= */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "800", // ExtraBold
  display: "swap",
});

/* ================= METADATA ================= */

export const metadata: Metadata = {
  title: "CoreCharge Nutrition | Authentic Fitness Supplements",
  description:
    "CoreCharge Nutrition offers 100% authentic fitness supplements sourced from authorized distributors. Trusted. Verified. Performance-driven.",
};

/* ================= ROOT LAYOUT ================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-black text-gray-200`}
      >
        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
