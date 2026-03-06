// app/stores/[slug]/loading.jsx

import ResponsiveRender from "@/components/ResponsiveRender";

export default function Loading() {
  return (
    <>
        
        <ResponsiveRender breakpoint={1023}
          desktop={
              <>
                <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
                  <div className="grid grid-cols-12 gap-6">

                    {/* Sidebar Skeleton */}
                    <aside className="col-span-12 md:col-span-3 bg-white rounded-xl shadow p-4 space-y-4">

                      <div className="h-5 bg-gray-300 rounded w-2/3"></div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>

                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-5 bg-gray-300 rounded w-16"></div>
                        </div>

                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-10"></div>
                        </div>

                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                      </div>

                    </aside>

                    {/* Main Content Skeleton */}
                    <main className="col-span-12 md:col-span-9 space-y-6">

                      {/* Category Badge */}
                      <div className="h-6 w-40 bg-gray-300 rounded"></div>

                      {/* Title */}
                      <div className="h-8 bg-gray-300 rounded w-3/4"></div>

                      {/* Tabs */}
                      <div className="flex  rounded-xl overflow-hidden">
                        <div className="flex-1 h-12 bg-gray-300"></div>
                        <div className="flex-1 h-12 bg-gray-200"></div>
                        <div className="flex-1 h-12 bg-gray-200"></div>
                      </div>

                      {/* Coupon Card Skeletons */}
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-white rounded-xl shadow p-6"
                        >

                          {/* Discount */}
                          <div className="w-20 space-y-2">
                            <div className="h-6 bg-gray-300 rounded w-full"></div>
                            <div className="h-5 bg-gray-200 rounded w-full"></div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 px-6 space-y-3">
                            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                          </div>

                          {/* Button */}
                          <div className="w-40 h-12 bg-gray-300 rounded-lg"></div>

                        </div>
                      ))}

                    </main>

                  </div>
                </div>
              </>
          }
          mobile={
            <>
              <div className="bg-white  p-5 flex gap-6 animate-pulse">
                {/* Discount Section */}
                <div className="w-20 flex flex-col items-center justify-center  pr-4">
                  <div className="h-7 w-12 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 w-10 bg-gray-300 rounded"></div>
                </div>
                {/* Content Section */}
                <div className="flex-1 space-y-3">

                  {/* Title */}
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>

                  {/* Description */}
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                  {/* Button */}
                  <div className="mt-3">
                    <div className="h-12 w-52 bg-gray-300 rounded-lg"></div>
                  </div>

                  {/* Bottom meta */}
                  <div className="flex gap-6 pt-2">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>

                </div>
                <div className="flex-1 space-y-3">

                  {/* Title */}
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>

                  {/* Description */}
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                  {/* Button */}
                  <div className="mt-3">
                    <div className="h-12 w-52 bg-gray-300 rounded-lg"></div>
                  </div>

                  {/* Bottom meta */}
                  <div className="flex gap-6 pt-2">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>

                </div>
              </div>
            </>
          }
        />
    </>    
  );
}