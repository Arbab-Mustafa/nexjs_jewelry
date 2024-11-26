"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleProductClick = () => {
    router.push("/jewelry"); // Redirect to the all products page
  };

  return (
    <motion.div
      className=" bg-gray-100  p-2 md:p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform animate-fadeInScale"
      onClick={handleProductClick}
      initial={{ opacity: 0, scale: 0.8 }} // Initial state when not visible
      whileInView={{ opacity: 1, scale: 1 }} // Final state when in view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation only once when 30% is visible
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
    >
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
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
        <h3 className="text-sm  md:text-lg font-semibold">{product.name}</h3>
      </div>
    </motion.div>
  );
};

export default ProductCard;
