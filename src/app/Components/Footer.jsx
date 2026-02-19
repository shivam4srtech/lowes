import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#0b2e6b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#94bfe8] mb-6">
              About Lowe's
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li className="hover:text-white cursor-pointer">Who We Are</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Our Responsibilities</li>
              <li className="hover:text-white cursor-pointer">Investors</li>
              <li className="hover:text-white cursor-pointer">Newsroom</li>
              <li className="hover:text-white cursor-pointer">Lowe's Suppliers</li>
              <li className="hover:text-white cursor-pointer">Safety Unites Us</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#94bfe8] mb-6">
              Stores & Services
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li className="hover:text-white cursor-pointer">Find a Store</li>
              <li className="hover:text-white cursor-pointer">Store Directory</li>
              <li className="hover:text-white cursor-pointer">Brand Directory</li>
              <li className="hover:text-white cursor-pointer">Store Services</li>
              <li className="hover:text-white cursor-pointer">Subscriptions</li>
              <li className="hover:text-white cursor-pointer">DIY Workshops</li>
              <li className="hover:text-white cursor-pointer">MyLowe’s Rewards Program</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#94bfe8] mb-6">
              Customer Service
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Rebates</li>
              <li className="hover:text-white cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-white cursor-pointer">Pickup, Shipping & Delivery</li>
              <li className="hover:text-white cursor-pointer">Special Orders</li>
              <li className="hover:text-white cursor-pointer">Recalls & Product Safety</li>
              <li className="hover:text-white cursor-pointer">Protection Plans</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#94bfe8] mb-6">
              Connect With Us
            </h3>

            {/* Social Icons */}
            <div className="flex gap-5 mb-8 text-xl">
              <i className="cursor-pointer hover:text-gray-300"><FaFacebook/></i>
              <i className="cursor-pointer hover:text-gray-300"><FaXTwitter/></i>
              <i className="cursor-pointer hover:text-gray-300"><FaInstagram/></i>
              <i className="cursor-pointer hover:text-gray-300"><FaYoutube/></i>
            </div>

            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 mb-6">
              Privacy & Use
            </h3>

            <ul className="space-y-4 text-gray-200">
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Privacy Statement</li>
              <li className="hover:text-white cursor-pointer">Interest-Based Ads</li>
              <li className="hover:text-white cursor-pointer">CA Privacy Rights</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
