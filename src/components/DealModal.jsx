"use client";
import React, { useState } from 'react';
import { IoClose, IoBagCheckOutline } from "react-icons/io5";
import { FaThumbsUp, FaThumbsDown, FaExternalLinkAlt, FaCheckCircle, FaRegSmileBeam } from "react-icons/fa";

const DealModal = ({ isOpen, onClose, coupon, storeName }) => {
  const [hasVoted, setHasVoted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <button onClick={onClose} className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 z-10">
          <IoClose size={28} />
        </button>

        <div className="bg-green-600 py-3 flex items-center justify-center gap-2 text-white font-semibold">
          <FaCheckCircle size={18} />
          <span>Deal Activated! No Code Required</span>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {storeName} — {coupon.title || 'Savings Applied'}
          </h2>
        </div>

        <div className="p-8 pt-2 flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-[#0046be]">
             <IoBagCheckOutline size={45} />
          </div>

          <p className="text-gray-600 text-center text-lg">
            No code needed! The discount is applied automatically when you shop via the link below.
          </p>

          <a 
            href={coupon.affiliate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#0046be] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg"
          >
            Shop Now at {storeName}
            <FaExternalLinkAlt size={16} />
          </a>

          {/* FEEDBACK SECTION */}
          <div className="pt-4 border-t border-gray-100 w-full text-center min-h-[100px] flex flex-col justify-center">
            {!hasVoted ? (
              <>
                <p className="text-gray-600 font-bold text-lg mb-4">Did this deal work?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setHasVoted(true)} className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-green-100 rounded-full text-gray-700">
                    <FaThumbsUp /> Yes
                  </button>
                  <button onClick={() => setHasVoted(true)} className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-red-100 rounded-full text-gray-700">
                    <FaThumbsDown /> No
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
                <FaRegSmileBeam size={32} className="text-green-600" />
                <p className="text-green-700 font-bold text-lg">Thanks for your feedback!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealModal;