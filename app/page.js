"use client";

import Products from "./data/Products";
import Product from "./components/Product";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const allProducts = Products();
    setProducts(allProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;

    //the product will be returned only if it matches both the search and the category

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.estimatedCO2 - b.estimatedCO2;
    } else if (sortOrder === "desc") {
      return b.estimatedCO2 - a.estimatedCO2;
    }
    return 0;
  });

  return (
    <div className="m-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Product List</h1>

        <input
          className="border focus:outline-none border-gray-300 focus:ring-1 focus:ring-slate-400 focus:border-slate-400 p-2 rounded-md"
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <div className="space-x-4">
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-4 py-2 rounded-md hover:bg-[#06402B] ${
              sortOrder === "asc"
                ? "bg-[#06402B] text-white"
                : "bg-[#0B6741] text-white"
            }`}
          >
            CO2 Ascending
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-4 py-2 rounded-md hover:bg-[#06402B] ${
              sortOrder === "desc"
                ? "bg-[#06402B] text-white"
                : "bg-[#0B6741] text-white"
            }`}
          >
            CO2 Descending
          </button>
        </div>

        <select
          className="max-w-xs w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Products</option>
          <option value="Fruits">Fruits</option>
          <option value="Bakery">Bakery</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
