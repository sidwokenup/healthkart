import { Tag } from "lucide-react";
import Link from "next/link";

export default function OfferBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-lg overflow-hidden relative">
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-teal-800 rounded-full opacity-20 blur-2xl"></div>
          
          <div className="relative z-10 mb-8 md:mb-0 text-center md:text-left flex-1">
            <div className="inline-flex items-center justify-center md:justify-start px-3 py-1 rounded-full bg-teal-700/50 backdrop-blur-sm border border-teal-500/30 mb-4">
              <Tag className="mr-2 text-teal-200" size={16} />
              <span className="uppercase tracking-wide text-xs font-bold text-teal-100">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
              Flat 20% OFF
            </h2>
            <p className="text-teal-50 text-lg md:text-xl font-medium mb-1">
              On all essential medicines & daily vitamins.
            </p>
            <p className="text-teal-200 text-sm">
              Limited period. While stocks last.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center md:items-end space-y-3">
            <Link href="/medicines" className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-white text-teal-700 hover:bg-teal-50 font-bold py-4 px-10 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl text-lg">
                Order Now
              </button>
            </Link>
            <span className="text-teal-200 text-xs font-medium bg-teal-700/30 px-3 py-1 rounded-full">
              No coupon required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
