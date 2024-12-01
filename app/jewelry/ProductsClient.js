"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const colorMapping = {
    pink: "#F06292",
    blue: "#42A5F5",
    yellow: "#FFEB3B",
    cognac: "#9C6348",
    green: "#66BB6A",
    mixed: "#9C27B0",
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredProducts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-12 text-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-text">
        Explore Our Products
      </h1>

      <div className="flex justify-center flex-wrap gap-2 sm:gap-6 mb-10">
        {["pink", "blue", "yellow", "cognac", "green", "mixed"].map((color) => (
          <button
            key={color}
            className="px-5 sm:px-8 py-3 rounded-full text-white font-medium transition-all transform hover:scale-110 hover:shadow-2xl duration-300"
            onClick={() => handleColorFilter(color)}
            style={{
              backgroundColor: colorMapping[color],
              backdropFilter: "blur(8px)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
              borderRadius: "30px",
              background: `linear-gradient(135deg, ${colorMapping[color]} 70%, rgba(255, 255, 255, 0) 100%)`,
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
        <button
          className="px-8 py-3 rounded-full text-white font-medium bg-gray-700 hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
          onClick={() => handleColorFilter("")}
        >
          All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                onClick={() => openModal(index)}
                width={400}
                height={400}
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500">Color: {product.color}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-12 text-gray-600 text-xl font-medium">
          No products match the selected filter.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="relative bg-white p-6 rounded-lg max-w-4xl mx-auto transform scale-95 transition-all duration-500 ease-in-out modal-content">
            <button
              className="absolute top-4 right-4 p-2 sm:p-3 text-white bg-gray-400 rounded-full hover:bg-gray-600 focus:outline-none transition-all duration-300 ease-in-out"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              ✖
            </button>
            <button
              className="absolute top-1/2 left-0 p-2 sm:p-4 text-white bg-gray-400 rounded-full transform -translate-y-1/2 hover:bg-gray-600 transition-all duration-300 ease-in-out"
              onClick={prevImage}
              aria-label="Previous Image"
            >
              &#60;
            </button>
            <button
              className="absolute top-1/2 right-0 p-2 sm:p-4 text-white bg-gray-400 rounded-full transform -translate-y-1/2 hover:bg-gray-600 transition-all duration-300 ease-in-out"
              onClick={nextImage}
              aria-label="Next Image"
            >
              &#62;
            </button>
            <div className="w-[40vh] h-[40vh] md:w-[70vh] md:h-auto max-w-7xl">
              <Image
                src={filteredProducts[currentImageIndex].image}
                alt={filteredProducts[currentImageIndex].name}
                className="w-full h-auto object-contain mx-auto transition-all duration-500 ease-in-out"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
