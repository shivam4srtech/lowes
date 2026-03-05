"use client"
import React, { useState, useEffect } from "react";
import CodeModal  from './CodeModal';
import DealModal  from './DealModal';
import { formatDistanceToNow } from "date-fns";
import { MdVerified } from "react-icons/md";
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
//sending data to coupon modal
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
//coupon accordion
const [openAccordion, setOpenAccordion] = useState({
  id: null,
  type: null
});
const toggleAccordion = (couponId, type) => {

  if (openAccordion.id === couponId && openAccordion.type === type) {
    setOpenAccordion({ id: null, type: null }); // close if clicked again
  } else {
    setOpenAccordion({ id: couponId, type });
  }

};
    return(
        <>
            {/* COUPON CARD */}
              {coupons.map((coupon) => (
                <div key={coupon.id} className="coupon-wrapper bg-white rounded-2xl shadow p-3 mb-2">
                  <div className=" flex flex-col md:flex-row gap-6  items-center" >
                    {/* Discount Badge */}
                    <div className="flex-shrink-0 text-center border-r pr-6">
                      <div className="text-3xl font-bold  text-(--primary-color)">
                         <div dangerouslySetInnerHTML={{ __html: getHeading(coupon.title) }}></div>
                      </div>
                      
                    </div>

                    {/* Coupon Content */}
                    <div className="flex-1 flex items-center space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {coupon.title}
                        </h3>
                        <p className="text-gray-600">
                        {coupon.content}
                        </p>

                        <div className="flex items-center text-sm text-blue-700 space-x-4">
                          <span className="no-wrap flex items-center gap-1 text-[.7rem] text-[#1a0dab]"><MdVerified fill="#f5b402" /> Verified Today</span>
                            <button
                                onClick={() => toggleAccordion(coupon.id, "history")}
                                  className="hover:underline cursor-pointer text-[.7rem] text-[#1a0dab]"
                                >
                                Coupon History  
                            </button>
                            <button
                                  onClick={() => toggleAccordion(coupon.id, "terms")}
                                  className="hover:underline cursor-pointer text-[.7rem] text-[#1a0dab]"
                                >
                                Terms &amp; Conditions
                            </button>
                        
                        </div>
                      </div>

                      {/* GET CODE Button */}
                      {coupon.coupon_type === 'code' ? 
                        (
                          <div className="cursor-pointer inline-flex items-stretch border-2 border-dashed border-blue-400 rounded-lg overflow-hidden"
                          onClick={() => handleCouponClick(coupon)}
                          
                          >
                              {/* Left Side */}
                              <button className="whitespace-nowrap relative bg-(--primary-color) cursor-pointer text-white font-semibold px-6 py-3 flex items-center justify-center">
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
                              <button className="whitespace-nowrap cursor-pointer relative bg-(--primary-color) text-white font-semibold px-6 py-3 flex items-center justify-center">
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
                  </div>
                  {/* coupon accordions */}
                  <div className="coup_accord">
                      {/* Coupuon History */}
                      <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              openAccordion.id === coupon.id &&
                              openAccordion.type === "history"
                                ? "max-h-40 mt-3 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                        <div className="text-sm text-gray-600">
                          <div className="history">
                              <ul>
                                {coupon.last_used_at && coupon.coupon_type === "code" &&
                                  <li>
                                    '{coupon.coupon_code}' promo code was used by shoppers {formatDistanceToNow(new Date(coupon.last_used_at), { addSuffix: true })} {coupon.is_worked && (coupon.is_worked === "True" ? "and it worked." : "and it didn't work.")}
                                  </li>
                                }

                                {coupon.last_used_at && coupon.coupon_type === "deal" &&
                                  <li>
                                    This coupon was used by shoppers {formatDistanceToNow(new Date(coupon.last_used_at), { addSuffix: true })} {coupon.is_worked && (coupon.is_worked === "True" ? "and it worked." : "and it didn't work.")}
                                  </li>
                                }
                                <li> Added by - <button onClick={() => scrollToSection('couponExperts')}> Coupon Experts</button></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* coupon terms and conditions */}
                      <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              openAccordion.id === coupon.id &&
                              openAccordion.type === "terms"
                                ? "max-h-40 mt-3 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                        <div className="text-sm text-gray-600">
                          <div className="list-decimal text-gray-600" dangerouslySetInnerHTML={{ __html: coupon.term_condition }} />
                        </div>
                      </div>
                  </div>
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