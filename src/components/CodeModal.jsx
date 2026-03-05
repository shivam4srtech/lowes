"use client";
import React, { useState } from 'react';
import { IoClose, IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaThumbsUp, FaThumbsDown, FaExternalLinkAlt, FaRegSmileBeam } from "react-icons/fa";

const CodeModal = ({ isOpen, onClose, coupon, storeName, affiliateUrl }) => {
  const [hasVoted, setHasVoted] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.coupon_code);
    alert("Code copied!");
  };

  const handleVote = () => {
    setHasVoted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <button onClick={onClose} className="cursor-pointer absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <IoClose size={28} />
        </button>

        <div className="modal-body max-h-[90vh] overflow-auto">
          <div className="p-6 pb-0 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 pr-8">
              {coupon.title} -  Code
            </h2>
          </div>

          <div className="p-8 flex flex-col items-center space-y-6">
            {/* Logo Placeholder */}
            <div className="w-32 h-16 border border-gray-100 flex items-center justify-center p-2 rounded bg-gray-50">
              <span className="text-gray-400 font-bold italic">Logo</span>
            </div>

            {/* CODE DISPLAY BOX */}
            <div className="w-full text-center space-y-2">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Copy and paste this code at checkout</p>
              <div className="w-full border-2 border-dashed border-green-600 rounded-lg p-5 bg-green-50/50 flex flex-col items-center gap-4">
                <span className="text-4xl font-mono font-bold tracking-widest text-gray-800 uppercase">
                  {coupon.coupon_code}
                </span>
                
                {/* COPY CODE BUTTON */}
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 transition-all shadow-md transform active:scale-95"
                >
                  <IoCopyOutline size={20} />
                  COPY CODE
                </button>
              </div>
            </div>

                <a 
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#0046be] text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg"
                >
                  Go to {storeName}
                  <FaExternalLinkAlt size={16} />
                </a>

                {/* FEEDBACK SECTION */}
                <div className="pt-4 border-t border-gray-100 w-full text-center min-h-[100px] flex flex-col justify-center">
                  {!hasVoted ? (
                    <>
                      <p className="text-gray-600 font-bold text-lg mb-4">Did this work?</p>
                      <div className="flex justify-center gap-4">
                        <button onClick={handleVote} className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-green-100 rounded-full transition-colors text-gray-700 font-medium group">
                          <FaThumbsUp className="group-hover:text-green-600" /> Yes
                        </button>
                        <button onClick={handleVote} className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors text-gray-700 font-medium group">
                          <FaThumbsDown className="group-hover:text-red-600" /> No
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
    </div>
  );
};

export default CodeModal;