
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight  } from "react-icons/fa6";


// 1. Fetch and find the specific category
async function getCategoryData(slug) {
  try {
    const res = await fetch('https://admin.scoopcost.com/categories/', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    
    const categories = await res.json();
    return categories.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase());
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// Helper to extract the discount
function extractDiscount(title) {
  const match = title.match(/(\d+% \s*Off|\$\d+\s*Off)/i);
  return match ? match[0].toUpperCase() : "DEAL";
}

// App Router pages can accept searchParams for URL queries (e.g., ?page=2)
export default async function CategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Await searchParams and get the current page (default to 1)
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page || '1', 10);
  const ITEMS_PER_PAGE = 10;
  
  const category = await getCategoryData(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Category not found</h1>
        <Link href="/categories" className="text-blue-600 hover:underline">
          &larr; Back to all categories
        </Link>
      </div>
    );
  }

  // 2. Flatten the nested stores and coupons
  const allCoupons = [];
  if (category.store_set?.results && Array.isArray(category.store_set.results)) {
    category.store_set.results.forEach((store) => {
      if (store.coupon_set && Array.isArray(store.coupon_set)) {
        store.coupon_set.forEach((coupon) => {
          allCoupons.push({
            ...coupon,
            storeName: store.title,
            storeImage: store.image,
            storeSlug: store.slug,
          });
        });
      }
    });
  }

  // 3. Pagination Logic
  const totalCoupons = allCoupons.length;
  const totalPages = Math.ceil(totalCoupons / ITEMS_PER_PAGE);
  
  // Ensure the current page is within valid bounds
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  // Get only the coupons for the current page
  const paginatedCoupons = allCoupons.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-gray-50 py-4 px-2 md:px-10 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-1 md:mb-4 text-gray-500 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-3 text-gray-300">/</span>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-black font-bold capitalize">{category.title}</span>
        </nav>

        <div className="flex justify-between items-end md:mb-2 mb-1">
          <h1 className="text-[.9rem] md:text-2xl font-extrabold text-slate-900 capitalize">
            {category.title} Coupons & Promo Codes
          </h1>
          
        </div>

     
        {/* Coupons Grid */}
        {paginatedCoupons.length > 0 ? (
          <>
           <div className='text-right mb-1'>
                <span className="text-gray-500 font-medium text-[.8rem]">
                    Showing {paginatedCoupons.length > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, totalCoupons)} of {totalCoupons}
                </span>
           </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {paginatedCoupons.map((coupon) => (
                    <div 
                    key={coupon.id} 
                    className="bg-white rounded border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                    >
                    {/* Card Top: Discount & Store Info */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <h2 className="text-xl font-extrabold text-slate-900 leading-none mb-2">
                            {extractDiscount(coupon.title)}
                        </h2>
                        <p className="text-gray-600 font-medium text-[.8rem]">
                            {coupon.storeName}
                        </p>
                        </div>
                        {/* Store Image */}
                        {coupon.storeImage && (
                        <div className="w-16 h-16 relative flex-shrink-0 border border-gray-100 rounded p-1">
                            <img 
                            src={coupon.storeImage} 
                            alt={coupon.storeName}
                            className="w-full h-full object-contain"
                            />
                        </div>
                        )}
                    </div>

                    {/* Card Middle: Coupon Title */}
                    <h3 className="text-[14px] font-bold text-slate-800 leading-snug mb-2 flex-grow">
                        {coupon.title}
                    </h3>

                    {/* Card Bottom: Meta & Button */}
                    <div className="flex items-center justify-between mt-auto">
                        

                        <Link href={`/store/${coupon.storeSlug}`} className="relative flex items-center h-10 w-full border border-(--primary-color) rounded overflow-hidden group hover:opacity-90 transition-opacity" >
                        <span 
                            className="bg-(--primary-color) text-white w-full h-full flex items-center justify-center font-bold text-sm pr-3 z-10"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
                        >
                            Get Code
                        </span>
                        <span className="absolute right-[30px] top-0 bottom-0 bg-white text-[#003478] font-bold text-sm flex items-center justify-center w-8 z-0 pr-2">
                            {coupon.coupon_type==="code"? coupon.coupon_code: "*****"}
                        </span>
                        </Link>
                    </div>
                    </div>
                ))}
            </div>
           
        
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-0 overflow-auto no-scrollbar">
                {/* Previous Button */}
                {validPage > 1 ? (
                  <Link 
                    href={`/categories/${slug}?page=${validPage - 1}`}
                    className="flex items-center justify-center md:w-10 md:h-10 w-5 h-6 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                   
                     <FaAngleLeft/>
                  </Link>
                ) : (
                  <button disabled className="flex items-center justify-center md:w-10 md:h-10 w-5 h-6 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed font-medium">
                   <FaAngleLeft/>
                  </button>
                )}

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/categories/${slug}?page=${pageNum}`}
                      className={`md:w-10 md:h-10 w-5 h-6 text-[.7rem] md:text-[1rem] flex items-center justify-center rounded-md font-medium transition-colors ${
                        validPage === pageNum 
                          ? 'bg-blue-600 text-white border border-blue-600' 
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>

                {/* Next Button */}
                {validPage < totalPages ? (
                  <Link 
                    href={`/categories/${slug}?page=${validPage + 1}`}
                    className="flex items-center justify-center md:w-10 md:h-10 w-5 h-6 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                     <FaAngleRight/>
                  </Link>
                ) : (
                  <button disabled className="flex items-center justify-center md:w-10 md:h-10 w-5 h-6 border border-gray-200 rounded-md text-gray-400 cursor-not-allowed font-medium">
                    <FaAngleRight/>
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
            <p className="text-gray-500 text-lg">No coupons available for {category.title} right now.</p>
          </div>
        )}
      </div>
    </main>
  );
}