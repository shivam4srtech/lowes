
export default function CouponSkeleton() {
  const skeletonCards = Array.from({ length: 12 }); // 12 cards for a nice grid

  return (
    <div>
      {/* Header & Results Count Skeleton */}
      <div className="flex justify-between items-end mb-8 animate-pulse">
        <div className="h-9 w-3/4 md:w-1/2 bg-gray-300 rounded-md"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-md hidden md:block"></div>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm h-full flex flex-col animate-pulse"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex flex-col gap-2">
                <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
              </div>
              <div className="w-14 h-14 bg-gray-200 rounded-md flex-shrink-0"></div>
            </div>

            <div className="space-y-3 mb-8 flex-grow">
              <div className="h-5 bg-gray-300 rounded-md w-full"></div>
              <div className="h-5 bg-gray-300 rounded-md w-5/6"></div>
            </div>

            <div className="mt-auto">
              <div className="h-10 w-full bg-blue-100 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}