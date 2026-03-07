"use client";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
const dealsData = [
  {
    id: 1,
    topTitle: "50-90%\nOff",
    topSubtitle: "Who doesn't like\na good sale",
    topImgSrc: "https://placehold.co/100x100/ec4899/white?text=Sale+Img", // Replace with actual image
    logoSrc: "https://assets-jiocdn.ajio.com/static/img/Ajio-Logo.svg", // Replace with actual AJIO logo
    mainTitle: "50-90% Off",
    description: "AJIO All Stars Anniversale Sale | 50-90% OFF Fashion Deals",
    cashbackText: "Up to 16% PW Cashback",
  },
  {
    id: 2,
    topTitle: "60-\n90% OFF",
    topSubtitle: "Big Savings\nOn The Way",
    topImgSrc: "https://placehold.co/100x100/3b82f6/white?text=Flipkart", // Replace with actual image
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/7/71/The_Flipkart_Logo_-_from_Official_Website.png", // Replace with actual Flipkart logo
    mainTitle: "SHOP NOW",
    description: "Big Saving Days | 60-90% OFF + Extra 10% Bank OFF",
    cashbackText: "Flat 2.1% PW Reward",
  },
  {
    id: 3,
    topTitle: "Birthday\nBlast",
    topSubtitle: "Live For All",
    topImgSrc: "https://placehold.co/100x100/a855f7/white?text=Myntra", // Replace with actual image
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png", // Replace with actual Myntra logo
    mainTitle: "Grab Now",
    description: "Myntra Birthday Blast | Exclusive Fashion Deals At Upto 70% OFF",
    cashbackText: "Flat 3% PW Cashback",
  },
  {
    id: 4,
    topTitle: "Up to 20%\nCashback",
    topSubtitle: "Free delivery",
    topImgSrc: "https://placehold.co/100x100/f59e0b/white?text=Amazon", // Replace with actual image
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", // Replace with actual Amazon logo
    mainTitle: "Grab Now",
    description: "Amazon Ultimate Brand Sale - Summer Edit | Big Deals + Bank Discount",
    cashbackText: "Flat 4.55% PW Voucher Cash",
  },
  {
    id: 5,
    topTitle: "Up to 20%\nCashback",
    topSubtitle: "Free delivery",
    topImgSrc: "https://placehold.co/100x100/f59e0b/white?text=Nyka", // Replace with actual image
    logoSrc: "https://images-static.nykaa.com/fashion-images/pub/media/logo-full.svg", // Replace with actual Amazon logo
    mainTitle: "Grab Now",
    description: "Nyka Ultimate Brand Sale - Summer Edit | Big Deals + Bank Discount",
    cashbackText: "Flat 4.55% PW Voucher Cash",
  },
];
export default function AffiliateDeals() {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    const scrollAmount = 350;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <section className="bg-gray-50 py-5">
      <div className="container">
          <h2 className="font-semibold text-[20px] md:text-[30px] mb-3">Handpicked Deals</h2>
          <div className="max-w-7xl mx-auto px-4 relative">

            {/* LEFT ARROW */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="hidden lg:flex absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:scale-110 transition"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* PRODUCTS CONTAINER */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
                >
              {dealsData.map((deal) => (
                <Link
                        href='/stores'
                        key={deal.id} 
                        className="min-w-[250px] lg:min-w-[280px] bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col overflow-hidden"
                    >
                    {/* Top Red Section */}
                    {/* Using a dark red gradient to match the design */}
                    <div className="bg-gradient-to-br from-[#012b5d] to-[#073467] h-36 p-4 flex justify-between relative">
                    
                    {/* Top Text Content */}
                    <div className="text-white z-10 flex flex-col">
                        <h3 className="font-extrabold text-xl md:text-2xl leading-tight whitespace-pre-line mb-1">
                        {deal.topTitle}
                        </h3>
                        <p className="text-gray-200 text-xs md:text-sm whitespace-pre-line leading-tight">
                        {deal.topSubtitle}
                        </p>
                    </div>

                    {/* Top Right Small Image */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-white/10 z-10">
                        <img 
                        src={deal.topImgSrc} 
                        alt="Promo Visual" 
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Faint Background pattern/lightning effect (optional styling) */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Bottom White Section */}
                    <div className="relative bg-white pt-10 px-5 pb-5 flex flex-col flex-grow">
                    
                    {/* Overlapping Pill Logo */}
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full h-10 w-28 shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center p-2">
                        <img 
                        src={deal.logoSrc} 
                        alt="Brand Logo" 
                        className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* Main Bottom Content */}
                    <h4 className="text-[#2b3c5a] font-bold text-lg mb-2">
                        {deal.mainTitle}
                    </h4>
                    
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3">
                        {deal.description}
                    </p>

                    {/* Orange Cashback Text fixed to bottom */}
                    <p className="text-[#e87b37] font-bold text-[15px] mt-auto">
                        {deal.cashbackText}
                    </p>
                    </div>

                </Link>
               ))}
            </div>

            {/* RIGHT ARROW */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="hidden cursor-pointer lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:scale-110 transition"
              >
                <FaChevronRight />
              </button>
            )}

          </div>
      </div>
    </section>
  );
}
