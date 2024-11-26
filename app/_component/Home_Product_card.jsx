"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProductCard = ({ image, altText }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage modal open state

  // Function to open and close the modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Product Image Card */}
      <div
        className="bg-gray-100 rounded-lg flex justify-center items-center cursor-pointer transition-transform transform hover:scale-105 mx-auto"
        onClick={openModal} // Open the modal on click
      >
        <div className="relative w-20 h-20 md:w-32 md:h-32    flex justify-center items-center overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={altText}
            width={96}
            height={96}
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
          onClick={closeModal} // Close modal when clicked outside
        >
          <div
            className="relative max-w-[40vh] max-h-[50vh] overflow-auto bg-gray-100 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner content click
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white font-bold text-2xl md:text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={image}
              alt={altText}
              layout="intrinsic"
              width={800} // Adjusted for larger modal
              height={800}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
