import Image from "next/image";
import { FaReadme  } from "react-icons/fa";

export default function BlogCard({ image, title, description }) {
 

  return (
    <a href="#" className="group bg-white rounded-lg  transition hover:shadow-lg block mb-4">
      
      {/* Image */}
      <div className="bg-gray-100 rounded-md flex items-center justify-center">
        <Image
          height={200}
          width={200}
          src={image}
          alt={title}
          className="w-full h-auto object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2 p-2 pt-0">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        <span className="flex items-center gap-2 text-[#1e6eae] text-[12px] underline decoration-[1.5px] font-[600]"><FaReadme width={20}/> Read Article</span>

      </div>
    </a>
  );
}
