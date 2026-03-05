"use client";

import { useState, useEffect } from "react";
import { parseFaqs } from "@/utils/parseFaqs";
import { FaAngleDown } from "react-icons/fa6";

export default function StoreFaqs({ faqsHtml, storeName }) {

  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const parsedFaqs = parseFaqs(faqsHtml);
    setFaqs(parsedFaqs);
  }, [faqsHtml]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto ">
     <h2 className="text-xl font-semibold mb-4">Faqs for {storeName}</h2>
      {faqs.map((faq, index) => (

        <div key={index} className="rounded-xl border overflow-hidden shadow-sm mb-2">

          {/* Question */}
          <button
            onClick={() => toggleFaq(index)}
            className={`w-full text-left px-6 py-4 flex justify-between items-center font-semibold transition
            ${openIndex === index ? "bg-blue-800 text-white" : "bg-gray-100"}
            `}
          >
            {faq.question}

            <span
              className={`transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              <FaAngleDown/>
            </span>
          </button>

          {/* Answer */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === index ? "max-h-96 p-6 bg-white" : "max-h-0"
            }`}
          >
            <p className="text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
          </div>

        </div>
      ))}

    </div>
  );
}