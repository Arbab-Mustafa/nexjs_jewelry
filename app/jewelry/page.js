import { getProducts } from "./utils/products";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  // Fetch products on the server side
  const products = await getProducts();

  // Pass data to the client-side component
  return <ProductsClient products={products} />;
}
