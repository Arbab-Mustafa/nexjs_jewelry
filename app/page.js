import Navbar from "./_component/navbar";
import Hero from "./_component/Hero";
import ProductCards from "./_component/Products";
import Vedio from "./_component/vedio";
import Footer from "./_component/Footer";
import AllProductsPage from "./_component/AllJweItem";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductCards />
      <Vedio />
      <AllProductsPage />
      <Footer />
    </>
  );
}
