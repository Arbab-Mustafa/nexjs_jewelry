import React from "react";
import Image from "next/image";

const ProductCard = ({ image, altText }) => {
  return (
    <div className="bg-gray-100 rounded-full flex justify-center items-center cursor-pointer">
      <div className="relative w-32 h-32 mx-auto mt-6 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={altText}
          layout="intrinsic"
          width={108} // 27 * 4 (for the size of the circular image)
          height={108} // 32 * 4 (for the size of the circular image)
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-90"
        />
      </div>

      {/* Product Info (Optional) */}
    </div>
  );
};

export default ProductCard;
