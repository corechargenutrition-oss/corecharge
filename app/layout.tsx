import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

/* ================= FONT ================= */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
});

/* ================= METADATA ================= */

export const metadata: Metadata = {
  metadataBase: new URL("https://corechargenutrition.com"),

  title: {
    default: "CoreCharge Nutrition | Authentic Fitness Supplements",
    template: "%s | CoreCharge Nutrition",
  },

  description:
    "CoreCharge Nutrition offers 100% authentic fitness supplements sourced from authorized distributors. Trusted. Verified. Performance-driven.",

    keywords: [
      "whey protein india",
      "buy supplements online india",
      "authentic supplements",
      "creatine india",
      "fitness supplements india",
      "corecharge nutrition",

      "corechargenutrition",
      "corechargenutrition.in",
      "corechargenutrition.com",
"corecharge nutrition india",
"corecharge supplements",
"corecharge whey protein",
"corecharge creatine",
"corecharge store",
"corecharge official website",
"corecharge nutrition products",
"corecharge fitness supplements",
"corecharge india",
    
      // 🔥 HIGH INTENT (BUYERS)
      "buy whey protein online",
      "best whey protein india",
      "best creatine monohydrate india",
      "protein powder online india",
      "gym supplements online india",
      "mass gainer india buy online",
      "pre workout india best",

      "whey isolate indore",
"whey concentrate indore",
"creatine monohydrate indore",
"bcaa supplements indore",
"pre workout supplements indore",
    
      // 💪 FITNESS GOALS
      "muscle gain supplements india",
      "fat loss supplements india",
      "strength supplements india",
      "lean muscle supplements",
      "recovery supplements gym",
    
      // 🧠 TRUST & AUTHENTICITY (VERY IMPORTANT FOR YOU)
      "authentic whey protein india",
      "original supplements india",
      "no fake supplements india",
      "verified supplement store india",
      "trusted supplement website india",
    
      // 🏷️ BRAND + CATEGORY
      "whey isolate india",
      "whey concentrate india",
      "creatine monohydrate india",
      "bcaa supplements india",
      "pre workout supplements india",
    
      // 📍 LOCAL SEO
      "supplements online mumbai",
      "supplements india online store",
      "buy gym supplements near me",

    "corecharge whey protein",
"corecharge isolate protein",
"corecharge creatine supplement",
"corecharge bcaa supplements",
"corecharge pre workout supplements",
"corecharge mass gainer supplements",
"corecharge omega 3 supplements",
      // 🔍 LONG-TAIL (RANK EASIER)
      "best supplements for muscle gain india",
      "where to buy authentic whey protein india",
      "which protein powder is best in india",
      "safe supplements for gym beginners india",
      "how to verify supplement authenticity india",
    ],

  authors: [{ name: "CoreCharge Nutrition" }],
  creator: "CoreCharge Nutrition",

  openGraph: {
    title: "CoreCharge Nutrition | Authentic Supplements",
    description:
      "Buy 100% authentic whey protein, creatine, and fitness supplements in India.",
    url: "https://corechargenutrition.in",
    siteName: "CoreCharge Nutrition",
    images: [
      {
        url: "/og-image.png", // 👉 add this image in public folder
        width: 1200,
        height: 630,
        alt: "CoreCharge Nutrition",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CoreCharge Nutrition",
    description:
      "Authentic supplements for serious athletes. No fakes. No compromises.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico", // 👉 add favicon here
  },
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
        <main className="min-h-screen">{children}</main>

        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}