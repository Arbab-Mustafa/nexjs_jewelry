"use client";
import React, { useState, useEffect } from "react";

const Hero = () => {
  // Array of image URLs
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9UM4bKMF1sT6AgedtbRFQBLRr1FUS6tMAqX9Rck6p8RLkmuAu9r94Dekg9EKLcJ0MEwo&usqp=CAU",

    "https://burgundydiamonds.com/wp-content/uploads/2023/08/Pink-yellow-and-white-diamonds.webp",
    "https://png.pngtree.com/background/20231017/original/pngtree-vibrant-jewel-toned-diamonds-arranged-on-a-white-background-in-3d-picture-image_5585876.jpg",
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
