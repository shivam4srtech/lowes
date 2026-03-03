import Image from "next/image";
import ProductSection from "../components/ProductSection";
import BlogSection from "../components/BlogSection";
import Link from 'next/link'
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
        <ProductSection products={products} />
        <BlogSection blogs={products} />
        <section className="category pb-[20px]">
          <div className="container">
              <h2 className="font-semibold mb-4 text-[20px] md:text-[30px]">The deals you must love</h2>
              <div className="cat_list overflow-auto flex flex-row gap-5 items-center mb-4 no-scrollbar::-webkit-scrollbar no-scrollbar">
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Appliances</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Smart Home, Security, Wi-Fi</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Kitchen</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Bathroom</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Outdoor</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Tools</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Heating & Cooling</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Flooring</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Lighting & Ceiling Fans</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Hardware</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Building Supplies</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap" href="/">Home Decor</Link>
                  <Link className="cat_name rounded-[1.5rem] border-solid border-[1px] border-[#000000] p-[10px] text-[12px] uppercase font-[600] hover:border-[#0176b3] hover:bg-[#f3f4f6] whitespace-nowrap " href="/">Electronics</Link>
              </div>
          </div>
        </section>
     </>
  );
}
