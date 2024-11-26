"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js hook for navigation

const ProductCard = ({ product }) => {
  const router = useRouter();

  // Function to redirect to the All Products Page
  const handleProductClick = () => {
    router.push("/jewelry"); // This redirects to the All Products Page
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform">
      <div
        className="relative w-full h-48 overflow-hidden rounded-lg"
        onClick={handleProductClick} // Redirect to the all products page on click
      >
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          objectFit="cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
