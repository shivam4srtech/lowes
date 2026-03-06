"use client"
import { useState } from "react";
export default function CouponFilter({coupon_count}){
     
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { name: "all", label: "All",  },
    { name: "verified", label: "Verified",  },
    { name: "codes", label: "Codes", },
  ]
    return (
        <>
                <div className="border-2 border-(--primary-color) rounded-lg overflow-hidden flex w-full coupon_filter sticky top-0 z-[9] mb-2">

                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`cursor-pointer flex-1 flex items-center justify-center gap-2 md:py-3 py-1 font-medium transition-all
                    
                    ${activeTab === tab.name
                      ? "bg-(--primary-color) text-white"
                      : "bg-gray-200 text-(--primary-color) hover:bg-gray-300"
                    }`}
                  >
                    {tab.label}

                    <span
                      className={`text-sm px-2 py-[2px] rounded-md
                      ${activeTab === tab.name
                        ? "bg-white text-blue-800"
                        : "bg-(--primary-color) text-white"
                      }`}
                    >
                      {coupon_count}
                    </span>

                  </button>
                ))}

              </div>
        </>
    )
}