import { getProducts } from "./utils/products";
import ProductsClient from "./ProductsClient";
import Navbar from "app/_component/navbar";
import Footer from "app/_component/Footer";

export default async function ProductsPage() {
  // Fetch products on the server side
  const products = await getProducts();

  // Pass data to the client-side component
  return (
    <>
      <Navbar />
      <ProductsClient products={products} />
      <Footer />
    </>
  );
}
