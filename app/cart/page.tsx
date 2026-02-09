import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-black text-gray-200 flex items-center justify-center px-4">
      <div
        className="
          max-w-md w-full
          bg-gradient-to-br from-[#141414] to-[#0b0b0b]
          border border-slate-800
          rounded-2xl
          p-10
          text-center
        "
      >
        {/* ICON / IMAGE */}
        {/* <div className="flex justify-center mb-6">
          <Image
            src="/images/empty-cart.png"
            alt="Empty cart"
            width={120}
            height={120}
            className="opacity-90"
          />
        </div> */}

        {/* TEXT */}
        <h1 className="text-2xl font-bold mb-3">
          Your cart is empty
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Looks like you haven’t added anything to your cart yet.
          Explore our supplements and find what fits your goals.
        </p>

        {/* CTA */}
        <Link
          href="/shop"
          className="
            inline-block
            px-8 py-3
            rounded-md
            bg-[#F2C200]
            text-black
            font-bold
            hover:bg-[#d9ae00]
            transition
          "
        >
          Go to Shop
        </Link>
      </div>
    </main>
  );
}
