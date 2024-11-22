import Image from "next/image";
import Navbar from "./_component/navbar";
import Hero from "./_component/Hero";
import ProductCards from "./_component/Products";
import Vedio from "./_component/vedio";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductCards />
      <Vedio />
    </>
  );
}
