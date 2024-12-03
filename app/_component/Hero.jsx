"use client";
import React, { useState, useEffect } from "react";

const Hero = () => {
  // Array of image URLs
  const images = [
    "https://png.pngtree.com/background/20231017/original/pngtree-d-rendering-of-vibrant-gemstones-and-diamonds-on-a-white-background-picture-image_5585710.jpg",
    "https://cdn.create.vista.com/api/media/small/53351475/stock-photo-colored-glass-diamonds",

    "https://burgundydiamonds.com/wp-content/uploads/2023/08/Pink-yellow-and-white-diamonds.webp",
    "https://png.pngtree.com/background/20231017/original/pngtree-vibrant-jewel-toned-diamonds-arranged-on-a-white-background-in-3d-picture-image_5585876.jpg",
    "https://img.freepik.com/premium-photo/diamonds-black-background_1097137-557.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update the background image index every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500); // Change every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div>
      <section
        className="relative bg-no-repeat bg-cover bg-center h-[70vh] transition-all duration-1000 delay-400 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      ></section>
    </div>
  );
};

export default Hero;
