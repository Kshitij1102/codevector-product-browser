"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cursor, setCursor] = useState("");
  const [category, setCategory] = useState("");

  async function loadProducts(reset = false) {
    try {
      let url =
        "https://codevector-product-browser-production.up.railway.app/products?limit=20";

      if (cursor && !reset) {
        url += `&cursor=${cursor}`;
      }

      if (category) {
        url += `&category=${category}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (reset) {
        setProducts(data.products || []);
      } else {
        setProducts((prev) => [
          ...prev,
          ...(data.products || []),
        ]);
      }

      setCursor(data.nextCursor || "");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    setProducts([]);
    setCursor("");
    loadProducts(true);
  }, [category]);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-4">
          Product Browser
        </h1>

        <p className="text-zinc-400 mb-10">
          Cursor Pagination • 200k Products
        </p>

        <select
          value={category}
          onChange={(e) => {
            setProducts([]);
            setCursor("");
            setCategory(e.target.value);
          }}
          className="mb-10 rounded-xl bg-zinc-900 p-4"
        >
          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Home">
            Home
          </option>

        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product, index) => (

            <div
              key={`${product.id}-${index}`}
              className="rounded-3xl bg-zinc-900 p-6"
            >

              <h2 className="text-2xl font-bold">
                {product.name}
              </h2>

              <p className="mt-3">
                {product.category}
              </p>

              <p className="mt-3 text-green-400">
                ₹{product.price}
              </p>

            </div>

          ))}

        </div>

        <div className="mt-12 flex justify-center">

          <button
            onClick={() => loadProducts()}
            className="
              rounded-2xl
              bg-white
              text-black
              px-8
              py-4
              font-semibold
              hover:scale-105
              transition
            "
          >
            Load More Products
          </button>

        </div>

      </div>

    </main>
  );
}