
export default function Loading() {
  // Create an array of 8 empty items to loop through for the skeleton grid
  const skeletonCards = Array.from({ length: 8 });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3 mb-8 animate-pulse">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-2 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-2 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Header & Results Count Skeleton */}
        <div className="flex justify-between items-end mb-8 animate-pulse">
          <div className="h-9 w-3/4 md:w-1/2 bg-gray-300 rounded-md"></div>
          <div className="h-5 w-32 bg-gray-200 rounded-md hidden md:block"></div>
        </div>

        {/* Skeleton Grid (Matches the 4-column layout in your latest screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm h-full flex flex-col animate-pulse"
            >
              {/* Card Top: Discount & Logo placeholder */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex flex-col gap-2">
                  {/* "15% OFF" placeholder */}
                  <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
                  {/* Store Name placeholder */}
                  <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
                </div>
                {/* Image placeholder */}
                <div className="w-14 h-14 bg-gray-200 rounded-md flex-shrink-0"></div>
              </div>

              {/* Card Middle: Coupon Title placeholder (2 lines) */}
              <div className="space-y-3 mb-8 flex-grow">
                <div className="h-5 bg-gray-300 rounded-md w-full"></div>
                <div className="h-5 bg-gray-300 rounded-md w-5/6"></div>
              </div>

              {/* Card Bottom: Button placeholder */}
              <div className="mt-auto">
                <div className="h-10 w-full bg-blue-100 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-2 mt-8 animate-pulse">
          <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
          <div className="flex gap-1 mx-4">
            <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </main>
  );
}