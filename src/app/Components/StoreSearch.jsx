import { GoSearch } from "react-icons/go";
export default function StoreSearch(){
    return(
        <div className="search flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
            <GoSearch />
            <input className="outline-none bg-transparent flex-1 text-[#7c828f]" type="text" placeholder="search..." />
        </div>
    );
}