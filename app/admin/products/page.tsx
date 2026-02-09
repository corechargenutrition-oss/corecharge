"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  async function toggleStock(id: string, current: boolean) {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !current }),
    });

    setProducts(p =>
      p.map(item =>
        item._id === id ? { ...item, inStock: !current } : item
      )
    );
  }

  return (
    <div className="p-10 text-gray-200">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-slate-800">
            <th>Name</th>
            <th>Stock</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-b border-slate-800">
              <td>{p.name}</td>
              <td>
                <button
                  onClick={() => toggleStock(p._id, p.inStock)}
                  className={`px-3 py-1 rounded ${
                    p.inStock ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {p.inStock ? "In Stock" : "Out"}
                </button>
              </td>
              <td>
                <Link href={`/admin/products/edit/${p._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
