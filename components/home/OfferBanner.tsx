import { Tag } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-teal-600 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-md overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Tag className="mr-2" size={20} />
              <span className="uppercase tracking-wider text-sm font-semibold text-teal-100">Limited Time Offer</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Flat 20% OFF</h2>
            <p className="text-teal-100 text-lg">On all essential medicines & daily vitamins.</p>
          </div>
          
          <div className="relative z-10">
            <button className="bg-white text-teal-700 hover:bg-teal-50 font-bold py-3 px-8 rounded-lg shadow transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
