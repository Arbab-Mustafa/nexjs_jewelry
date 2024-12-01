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
        "https://scontent-fra3-2.cdninstagram.com/v/t51.29350-15/337781651_611170517166719_5032796711974861993_n.webp?stp=dst-jpg_e35&_nc_ht=scontent-fra3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=vzKBI2JhYhYQ7kNvgHqCzCJ&_nc_gid=e69bd954a0af476490267d26cb2323a0&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AYBYfBDhwMN9af5vRh7IqOjfxr5spLW0kCYBjrGvk8Bmqg&oe=675200E7&_nc_sid=d885a2",
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

    {
      id: 7,
      image:
        "https://scontent-fra3-1.cdninstagram.com/v/t51.29350-15/438841608_3136899133112816_8862996163920646205_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GH8WMqHwgBkQ7kNvgETBMEM&_nc_gid=9c1c0f3a2cb7431182a95553f5fb83a2&edm=APU89FABAAAA&ccb=7-5&oh=00_AYAG3kRbHlwBB7WHPxw1yKXBpRHz6wnpR8HjMixHb4XGHw&oe=67521494&_nc_sid=bc0c2c",
      altText: "Jewelry 7",
    },
    {
      id: 8,
      image:
        "https://scontent-fra3-1.cdninstagram.com/v/t51.29350-15/337908979_131493309727124_4895610592240961205_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=1rSJ1Qz3XQ0Q7kNvgFS2tTL&_nc_gid=9c1c0f3a2cb7431182a95553f5fb83a2&edm=APU89FABAAAA&ccb=7-5&oh=00_AYDD_leUtNLYM5ndQIKhukz9s6eBCG_BerLsx1yT9JC7AA&oe=6751E1C3&_nc_sid=bc0c2c",
      altText: "Jewelry 8",
    },
    {
      id: 9,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-07.png",
      altText: "Jewelry 9",
    },
    {
      id: 10,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-06.png",
      altText: "Jewelry 10",
    },
    {
      id: 11,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-01.png",
      altText: "Jewelry 11",
    },
    {
      id: 12,
      image:
        "http://treatedcolors.com/include/reflect3.php?img=../images/imageflow/image-02.png",
      altText: "Jewelry 12",
    },
  ];

  return (
    <div className="py-4 mx-auto">
      <h2 className="text-center text-base md:text-4xl">Our Products</h2>

      {/* Scroll Container */}
      <div className="overflow-hidden relative w-[70%] md:w-[75%] mx-auto">
        <div
          className="flex space-x-6 animate-scrollInfinite hover:animate-none"
          style={{ animationDuration: "20s" }}
        >
          {products.concat(products).map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              altText={product.altText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
