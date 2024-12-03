"use client";
import React, { useState, useEffect } from "react";

const Hero = () => {
  // Array of image URLs
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbs2_0Z8xqnDN9TaF5N2pkO9yEKnsb-A9Z3SXxiZP6HeTbqW_ngQOjiNIjJc3QdArJF1s&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDNWQ5rXzwxXYtO2eoa5W9vTaHSgBrYRVY1QP78RWE0nU3b1Tgm1SNQaqqmc9GcS4-9w&usqp=CAU",
    "https://burgundydiamonds.com/wp-content/uploads/2023/08/Pink-yellow-and-white-diamonds.webp",
    "https://via.placeholder.com/1920x1080?text=Image+4",
    "https://via.placeholder.com/1920x1080?text=Image+5",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update the background image index every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div>
      <section
        className="relative bg-no-repeat bg-cover bg-center h-[80vh] transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900/50"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-full lg:items-center lg:px-8">
          <div className="max-w-xl text-center mx-auto">
            <h1 className="text-white text-4xl font-bold">
              Welcome to Our Dynamic Hero Section
            </h1>
            <p className="mt-4 text-gray-300">
              Experience smooth transitions and vibrant backgrounds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
