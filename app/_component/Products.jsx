import React from "react";

import ProductCard from "./Home_Product_card";

const ProductCards = () => {
  const products = [
    {
      id: 1,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-04.png",
      altText: "Jewelry 1",
    },
    {
      id: 2,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-03.png",
      altText: "Jewelry 2",
    },
    {
      id: 3,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-07.png",
      altText: "Jewelry 3",
    },
    {
      id: 4,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-06.png",
      altText: "Jewelry 4",
    },
    {
      id: 5,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-01.png",
      altText: "Jewelry 5",
    },
    {
      id: 6,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-02.png",
      altText: "Jewelry 6",
    },
  ];

  return (
    <div className="py-4 mx-auto">
      <h2 className="text-center text-base md:text-4xl  ">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6 py-8 my-1 md:my-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            altText={product.altText}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
