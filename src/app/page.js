import Image from "next/image";
import ProductSection from "./Components/ProductSection";
async function getProducts() {
  const res = await fetch(
    "https://dummyjson.com/products?limit=20",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}
export default async function Home() {
  const products = await getProducts();
  return (
     <>
        <div className="container">
            <ProductSection products={products} />
        </div>
     </>
  );
}
