import React from "react";
import Image from "next/image";

const ProductCard = ({ image, altText }) => {
  return (
    <div className="relative group w-72 h-80 bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 group-hover:bg-gradient-to-t from-black via-transparent to-transparent transition-all duration-300">
        <Image
          src={image}
          alt={altText}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-sm">Beautiful, Handmade, Luxury</p>
      </div>
    </div>
  );
};

export default ProductCard;
