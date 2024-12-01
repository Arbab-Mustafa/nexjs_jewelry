"use client";

import { useState } from "react";

export default function ProductsClient({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleColorFilter = (color) => {
    if (color === "") {
      setFilteredProducts(products); // Reset filter to show all products
    } else {
      setFilteredProducts(
        products.filter((product) => product.color === color)
      );
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-5">
        {["pink", "blue", "yellow", "cognac", "green", "mixed"].map((color) => (
          <button
            key={color}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => handleColorFilter(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => handleColorFilter("")}
        >
          All
        </button>
      </div>

      {/* Products Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card border p-4 rounded-lg shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <p className="text-sm text-gray-500 mt-1">{product.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
