import { GrHostMaintenance } from "react-icons/gr";
export default function Category(){
    return(
        <>
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    {/* Icon/Illustration Placeholder */}
                    <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-indigo-100 rounded-full">
                        <GrHostMaintenance />
                    </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Under Maintenance
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                    We're currently upgrading our systems to serve you better. 
                    We'll be back online shortly!
                    </p>

                    {/* Progress Bar (Visual Only) */}
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
                    <div className="bg-indigo-600 h-2 rounded-full w-[65%] animate-pulse"></div>
                    </div>

                    {/* Contact/Back Link */}
                    <div className="pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Please visit our store page <a href="/stores" className="text-indigo-600 font-medium hover:underline">Stores</a>
                    </p>
                    </div>
                </div>
            </div>
        </>
    );
}