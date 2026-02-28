"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BlogCard from "./BlogCard";

export default function BlogSection({ blogs = [] }) {
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
            <h2 className="font-semibold mb-4 text-[20px] md:text-[30px]">Must Read Blogs</h2>
            <div className="max-w-7xl mx-auto relative">

                {/* LEFT ARROW */}
                {canScrollLeft && (
                <button
                    onClick={() => scroll("left")}
                    className="hidden lg:flex absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:scale-110 transition"
                >
                    <FaChevronLeft />
                </button>
                )}

                {/* blogS CONTAINER */}
                <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
                >
                {blogs.map((blog) => (
                    <div
                    key={blog.id}
                    className="min-w-[250px] lg:min-w-[280px]"
                    >
                    <BlogCard
                        image={blog.thumbnail}
                        title={blog.title}
                        subtitle={blog.title}
                        rating={blog.rating}
                        description={blog.description}
                    />
                    </div>
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
