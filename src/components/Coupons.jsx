"use client"
import React, { useState, useEffect } from "react";
import CodeModal  from './CodeModal';
import DealModal  from './DealModal';
import { useRef } from 'react';
import Image from "next/image";
const stripPTags = (html) => html.replace(/^<p>|<\/p>$/g, '');

const getHeading = (title) => {
  if (!title) return "";

  // Check for percentage discount (e.g., "40% OFF")
  const percentMatch = title.match(/(\d+)%/);
  if (percentMatch) {
    return `${percentMatch[1]}% </br> OFF`;
  }

  // Check for dollar discount (e.g., "$40 OFF")
  const dollarMatch = title.match(/\$(\d+)/);
  if (dollarMatch) {
    return `$${dollarMatch[1]} </br> OFF`;
  }

  // Check for "Free Shipping"
  if (/free shipping/i.test(title)) {
    return "Free </br> Shipping";
  } else {
    return "Offer";
  }

  return "";
};

const baseDomain = 'scoopcost.com';
export default function Coupons({coupons, storeSlug, index, isSubdomain, urlPrefix, affiliateUrl, storeName }){

  if (!coupons || coupons.length === 0) {
    return <p>No coupons available.</p>;
  }
  const [worked, setWorked] = useState(coupons.is_worked);
  const [totalUsed, setTotalUsed] = useState(coupons.total_used);

  const h2_heading = ["Working Storename Coupon Code", "Storename Best Discount Code", "Storename Promo Codes 2025", "Storename Coupons 2025"];

  const accordionId = `accordion-${index}`;
  const collapseId = `collapse-${index}`;
  const historyAccordionId = `historyAccordionId-${index}`;
  const historyCollapseId = `historyCollapseId-${index}`;
  const [modalOpen, setModalOpen] = useState(false);
  const [copytext, setCopyText] = useState("Copy code");
  const [isExpanded, setIsExpanded] = useState(true);
  const maxChars = 40;

  // const showMore = coupons.content.length > maxChars;

  useEffect(() => {
    const runOnce = async () => {
      if (typeof window !== "undefined") {
        const urlHash = window.location.hash?.replace('#', '');
        if (urlHash === `code=${index + 1}`) {
          await setModalOpen(true);
  
          // Slight delay to ensure modal DOM is ready
          setTimeout(() => {
            const modalElement = coupon.coupon_type === "code"
              ? document.getElementById('getCode' + coupon.id)
              : document.getElementById('getDeal' + coupon.id);
  
            if (modalElement) {
              console.log("innnn");
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            }
          }, 500); // Optional delay to allow re-render
  
          localStorage.removeItem("copied_code");
        }
      }
    };
  
    runOnce();
  }, []); // runs once on mount
  


async function trackCouponUsage(couponComponentId) {
  setTotalUsed(totalUsed + 1);

  try {
    const response = await fetch('/api/track-coupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ couponComponentId, storeSlug }),
    });

    return await response.json();
  } catch (error) {
    console.error('Client tracking failed:', error);
  }
}

  

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

const [selectedCoupon, setSelectedCoupon] = useState(null);
const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
const [isDealModalOpen, setIsDealModalOpen] = useState(false);

const handleCouponClick = (couponData) => {
  // Capture the specific coupon data
  
  setSelectedCoupon(couponData); // This "saves" the clicked coupon
  console.log(couponData.coupon_type);
  // Logic to determine which modal to open


  // Trigger your modals based on type
  if (couponData.coupon_type === 'code') {
    setIsCodeModalOpen(true);
  } else {
    setIsDealModalOpen(true);
  }

  // Open the affiliate link in a new tab
  if (couponData.affiliate_url) {
    window.open(couponData.affiliate_url, "_blank");
  }
};

    return(
        <>
            {/* COUPON CARD */}
              {coupons.map((coupon) => (
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 mb-2 items-center" key={coupon.id}>
                  {/* Discount Badge */}
                  <div className="flex-shrink-0 text-center border-r pr-6">
                    <div className="text-3xl font-bold text-blue-900">20%</div>
                    <div className="text-blue-900 font-semibold">OFF</div>
                  </div>

                  {/* Coupon Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold">
                      {coupon.title}
                    </h3>
                    <p className="text-gray-600">
                     {coupon.content}
                    </p>

                    <div className="flex items-center text-sm text-blue-700 space-x-4">
                      <span>✔ Verified Today</span>
                      <a href="#" className="hover:underline">
                        Coupon History
                      </a>
                      <a href="#" className="hover:underline">
                        Terms & Conditions
                      </a>
                    </div>
                  </div>

                  {/* GET CODE Button */}
                  {coupon.coupon_type === 'code' ? 
                    (
                      <div className="cursor-pointer inline-flex items-stretch border-2 border-dashed border-blue-400 rounded-lg overflow-hidden"
                       onClick={() => handleCouponClick(coupon)}
                      
                      >
                          {/* Left Side */}
                          <button className="relative bg-(--primary-color) text-white font-semibold px-6 py-3 flex items-center justify-center">
                            GET CODE

                            {/* Diagonal Cut */}
                            <span className="absolute hover:right-[-20px] right-[-30px] top-0 h-full w-10 bg-(--primary-color) transform skew-x-[-20deg]"></span>
                          </button>

                          {/* Right Side */}
                          <div className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold">
                             {coupon.coupon_code}
                          </div>
                      </div>
                    )
                    :
                    (
                      <div className="cursor-pointer inline-flex items-stretch border-2 border-dashed border-blue-400 rounded-lg overflow-hidden"
                        onClick={handleCouponClick}
                        
                        >
                          {/* Left Side */}
                          <button className="cursor-pointer relative bg-(--primary-color) text-white font-semibold px-6 py-3 flex items-center justify-center">
                            GET CODE

                            {/* Diagonal Cut */}
                            <span className="absolute hover:right-[-20px] right-[-30px] top-0 h-full w-10 bg-(--primary-color) transform skew-x-[-20deg]"></span>
                          </button>

                          {/* Right Side */}
                          <div className="flex items-center px-6 py-3 bg-white text-gray-800 font-semibold">
                             **********************
                          </div>
                      </div>
                    )  
                  }
                 
                </div>
              ))}
              {/* Outside the loop at the bottom of the return */}
           
              <>
                <CodeModal 
                  isOpen={isCodeModalOpen} 
                  onClose={() => setIsCodeModalOpen(false)} 
                  coupon={selectedCoupon} // This now contains the code!
                  storeName={storeSlug}
                  affiliateUrl={affiliateUrl}
                 
                />

                <DealModal 
                  isOpen={isDealModalOpen} 
                  onClose={() => setIsCodeModalOpen(false)} 
                  coupon={selectedCoupon} // This now contains the code!
                  storeName={storeSlug}
                />
              </>
          
        </>
    )
}