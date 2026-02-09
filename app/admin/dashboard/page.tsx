import Link from "next/link";

async function getStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch products:", res.status);
    return { total: 0, inStock: 0, outOfStock: 0 };
  }

  const products: any[] = await res.json();

  return {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    outOfStock: products.filter((p) => !p.inStock).length,
  };
}


export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-black text-gray-200 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Manage products, inventory, and visibility
        </p>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-14">
        {[
          { label: "Total Products", value: stats.total },
          { label: "In Stock", value: stats.inStock },
          { label: "Out of Stock", value: stats.outOfStock },
        ].map((item) => (
          <div
            key={item.label}
            className="
              bg-gradient-to-br from-[#141414] to-[#0b0b0b]
              border border-slate-800
              rounded-2xl p-6
            "
          >
            <p className="text-sm text-gray-400 mb-1">
              {item.label}
            </p>
            <p className="text-3xl font-bold text-[#F2C200]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-8">

        <Link
          href="/admin/products"
          className="
            bg-[#111] border border-slate-800
            rounded-2xl p-8
            hover:border-[#F2C200]/60
            transition
          "
        >
          <h3 className="text-lg font-bold mb-2">
            Manage Products
          </h3>
          <p className="text-sm text-gray-400">
            View, edit, update stock, or delete products
          </p>
        </Link>

        <Link
          href="/admin/products/new"
          className="
            bg-[#111] border border-slate-800
            rounded-2xl p-8
            hover:border-[#F2C200]/60
            transition
          "
        >
          <h3 className="text-lg font-bold mb-2">
            Add New Product
          </h3>
          <p className="text-sm text-gray-400">
            Upload a new supplement to the shop
          </p>
        </Link>

      </div>

    </main>
  );
}
