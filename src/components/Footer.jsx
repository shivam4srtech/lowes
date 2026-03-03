import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#f0f3fe] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-(--primary-color) mb-6">
              About Lowe's
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="hover:text-(--primary-color) cursor-pointer">Who We Are</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Careers</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Our Responsibilities</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Investors</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Newsroom</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Lowe's Suppliers</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Safety Unites Us</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-(--primary-color) mb-6">
              Stores & Services
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="hover:text-(--primary-color) cursor-pointer">Find a Store</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Store Directory</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Brand Directory</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Store Services</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Subscriptions</li>
              <li className="hover:text-(--primary-color) cursor-pointer">DIY Workshops</li>
              <li className="hover:text-(--primary-color) cursor-pointer">MyLowe’s Rewards Program</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-(--primary-color) mb-6">
              Customer Service
            </h3>
            <ul className="space-y-4 text-gray-600">
              <li className="hover:text-(--primary-color) cursor-pointer">Help Center</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Rebates</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Pickup, Shipping & Delivery</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Special Orders</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Recalls & Product Safety</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Protection Plans</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-(--primary-color) mb-6">
              Connect With Us
            </h3>

            {/* Social Icons */}
            <div className="flex gap-5 mb-8 text-xl">
              <i className="cursor-pointer hover:bg-(--primary-color) hover:border-(--primary-color) inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-black"><FaFacebook/></i>
              <i className="cursor-pointer hover:bg-(--primary-color) hover:border-(--primary-color) inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-black"><FaXTwitter/></i>
              <i className="cursor-pointer hover:bg-(--primary-color) hover:border-(--primary-color) inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-black"><FaInstagram/></i>
              <i className="cursor-pointer hover:bg-(--primary-color) hover:border-(--primary-color) inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-black"><FaYoutube/></i>
            </div>

            <h3 className="text-sm font-semibold tracking-wider uppercase text-(--primary-color) mb-6">
              Privacy & Use
            </h3>

            <ul className="space-y-4 text-gray-600">
              <li className="hover:text-(--primary-color) cursor-pointer">Terms</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Privacy Statement</li>
              <li className="hover:text-(--primary-color) cursor-pointer">Interest-Based Ads</li>
              <li className="hover:text-(--primary-color) cursor-pointer">CA Privacy Rights</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
