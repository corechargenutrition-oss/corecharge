import Image from "next/image";
import HomePage from "./home/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoreCharge Nutrition | Buy Authentic Supplements Online",
  description:
    "Buy 100% authentic whey protein, creatine, and fitness supplements in India. No fakes. Verified products only at CoreCharge Nutrition.",
};

export default function Home() {
  return (
<>
<HomePage/>
</>
  );
}
