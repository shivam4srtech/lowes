import { FaStar } from "react-icons/fa";

export default function ProductCard({ image, title, subtitle, rating }) {
  const fullStars = Math.round(rating || 0);

  return (
    <a href="#" className="group bg-white rounded-lg p-4 transition hover:shadow-lg block">
      
      {/* Image */}
      <div className="bg-gray-100 rounded-md p-6 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-40 object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {subtitle}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < fullStars ? "" : "opacity-30"}
              />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
