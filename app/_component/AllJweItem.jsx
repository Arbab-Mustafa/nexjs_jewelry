"use client";

import React from "react";
import ProductCard from "./singleJweItem";
import Link from "next/link";

// Import your ProductCard component

const AllProductsPage = () => {
  // Sample products data
  const products = [
    {
      id: 1,
      name: "Ice berg Ring",

      image:
        "http://treatedcolors.com/images/juwellery/thumbnails/ib%20david300dbii.jpg", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Mushroom Ring",

      image:
        "http://treatedcolors.com/images/juwellery/thumbnails/mshroom300dpi%20ylw.jpg", // Replace with actual image URLs
    },
    {
      id: 3,
      name: "Ring Yellow cushion",
      image:
        "http://treatedcolors.com/images/juwellery/thumbnails/Ring%20yellow%20emerald01.jpg",
    },
    {
      id: 4,
      name: "Titanium Ring",
      image:
        "http://treatedcolors.com/images/juwellery/thumbnails/titanium01.jpg",
    },
    {
      id: 5,
      name: "Blue Ring",
      image: "http://treatedcolors.com/images/juwellery/thumbnails/blu1.jpg",
    },
    {
      id: 6,
      name: "small mushroom Ring",
      image:
        "http://treatedcolors.com/images/juwellery/thumbnails/small%20mushroom.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <p className="flex justify-center items-center mx-auto bg-red-500 py-2 px-3 rounded-md w-fit  mt-2 md:mt-5 text-gray-100 hover:px-4 transition-all duration-200">
        <Link href="/jewelry">See all</Link>
      </p>
    </div>
  );
};

export default AllProductsPage;
