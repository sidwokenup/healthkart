import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Your Pharmacy, <span className="text-primary">Delivered.</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Order medicines, lab tests, and health products from the comfort of your home.
          Trusted by millions.
        </p>

        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="text-gray-500" size={24} />
          </div>
          <input
            type="text"
            placeholder="Search medicines, brands, and more..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-lg text-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors hidden sm:block">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
