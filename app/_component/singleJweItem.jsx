"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const router = useRouter();

  // Function to redirect to the All Products Page
  const handleProductClick = () => {
    router.push("/jewelry"); // This redirects to the All Products Page
  };

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={handleProductClick} // Redirect on card click
    >
      {/* Product Image with Badge */}
      <div className="relative w-full h-60 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform group-hover:scale-105 duration-300 ease-in-out"
        />
        {/* Badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
            New Arrival
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 mt-1 text-sm">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
