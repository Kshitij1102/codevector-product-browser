"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cursor, setCursor] = useState("");
  const [category, setCategory] = useState("");

  async function loadProducts(reset = false) {
    let url =
      "https://codevector-product-browser-production.up.railway.app/products?limit=20";

    if (cursor && !reset) {
      url += `&cursor=${cursor}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    const res = await fetch(url);

    const data = await res.json();

    if (reset) {
      setProducts(data.products);
    } else {
      setProducts((prev) => [
        ...prev,
        ...data.products,
      ]);
    }

    setCursor(data.nextCursor);
  }

  useEffect(() => {
    loadProducts(true);
  }, [category]);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="mx-auto max-w-7xl">

        <h1 className="mb-4 text-6xl font-bold">
          Product Browser
        </h1>

        <p className="mb-10 text-zinc-400">
          Cursor Pagination • 200k Products
        </p>

        <select
          value={category}
          onChange={(e) => {
            setProducts([]);
            setCursor("");
            setCategory(
              e.target.value
            );
          }}
          className="
            mb-8
            rounded-xl
            bg-zinc-900
            p-4
          "
        >

          <option value="">
            All Categories
          </option>

          <option>
            Electronics
          </option>

          <option>
            Sports
          </option>

          <option>
            Books
          </option>

          <option>
            Fashion
          </option>

          <option>
            Home
          </option>

        </select>

        <p className="mb-6 text-zinc-400">

          Showing {products.length} products

        </p>

        <div
          className="
            grid
            grid-cols-4
            gap-6
          "
        >

          {products.map(
            (product) => (

              <div
                key={product.id}
                className="
                  rounded-3xl
                  bg-zinc-900
                  p-6
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  {product.name}

                </h2>

                <p
                  className="mt-3"
                >

                  {product.category}

                </p>

                <p
                  className="
                    mt-3
                    text-green-400
                  "
                >

                  ₹{product.price}

                </p>

              </div>

            )
          )}

        </div>

        <div
          className="
            mt-12
            flex
            justify-center
          "
        >

          <button
            onClick={() =>
              loadProducts()
            }
            className="
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-black
              transition
              hover:scale-105
            "
          >

            Load More Products

          </button>

        </div>

      </div>

    </main>
  );
}