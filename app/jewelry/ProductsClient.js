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

  // Color mapping for each button
  const colorMapping = {
    pink: "#F06292",
    blue: "#42A5F5",
    yellow: "#FFEB3B",
    cognac: "#9C6348",
    green: "#66BB6A",
    mixed: "#9C27B0", // Use a fallback color for "mixed"
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
        Explore Our Products
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {["pink", "blue", "yellow", "cognac", "green", "mixed"].map((color) => (
          <button
            key={color}
            className="px-6 py-2 rounded-full text-white font-medium transition-all shadow-md hover:shadow-lg"
            onClick={() => handleColorFilter(color)}
            style={{
              backgroundColor: colorMapping[color], // Set the button's background color dynamically
              backdropFilter: "blur(10px)", // Frosted glass effect
              border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for transparency effect
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Slight shadow for 3D effect
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
        <button
          className="px-6 py-2 rounded-full text-white font-medium bg-gray-700 hover:bg-gray-900 transition-all shadow-md hover:shadow-lg"
          onClick={() => handleColorFilter("")}
        >
          All
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-12 text-gray-600 text-xl font-medium">
          No products match the selected filter.
        </div>
      )}
    </div>
  );
}
