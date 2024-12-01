"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductsClient({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

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

  // Open modal and set the current image index
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredProducts.length - 1 : prevIndex - 1
    );
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
            className="px-6 py-2 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl"
            onClick={() => handleColorFilter(color)}
            style={{
              backgroundColor: colorMapping[color], // Set the button's background color dynamically
              backdropFilter: "blur(8px)", // Frosted glass effect
              // Light border for transparency effect
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              borderRadius: "20px", // Rounded corners
              background: `linear-gradient(135deg, ${colorMapping[color]} 70%, rgba(255, 255, 255, 0) 100%)`, // Gradient effect for shine
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
        <button
          className="px-6 py-2 rounded-full text-white font-medium bg-gray-700 hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
          onClick={() => handleColorFilter("")}
        >
          All
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openModal(index)} // Open modal on image click
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

      {/* Modal for image viewing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-5 rounded-lg max-w-3xl mx-auto">
            {/* Close button */}
            <button
              className="absolute top-0 right-0 p-2 text-white bg-gray-800 rounded-full"
              onClick={closeModal}
            >
              X
            </button>
            {/* Left Button */}
            <button
              className="absolute top-1/2 left-0 p-4 text-white bg-gray-800 rounded-full transform -translate-y-1/2"
              onClick={prevImage}
            >
              &#60;
            </button>
            {/* Right Button */}
            <button
              className="absolute top-1/2 right-0 p-4 text-white bg-gray-800 rounded-full transform -translate-y-1/2"
              onClick={nextImage}
            >
              &#62;
            </button>

            {/* Display current image */}
            <Image
              src={filteredProducts[currentImageIndex].image}
              alt={filteredProducts[currentImageIndex].name}
              className="w-full h-auto object-contain mx-auto"
              width={300}
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}
