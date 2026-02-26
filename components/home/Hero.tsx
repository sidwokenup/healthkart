"use client";

import SearchInput from "../SearchInput";

export default function Hero() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/products/mainback.png" 
          alt="Pharmacy Background" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-blue-50/60"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Your Pharmacy, <span className="text-primary">Delivered.</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Order medicines, lab tests, and health products from the comfort of your home.
          Trusted by millions.
        </p>

        <div className="max-w-xl mx-auto relative">
          <SearchInput 
            placeholder="Search medicines, brands, and more..." 
            className="text-lg"
          />
        </div>
      </div>
    </section>
  );
}