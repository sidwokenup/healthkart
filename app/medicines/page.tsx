import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, SlidersHorizontal, X } from "lucide-react";

export default function MedicinesPage() {
  const medicines = [
    { name: "Paracetamol 650mg Tablet", price: 30, originalPrice: 40, dosage: "Strip of 15 tablets", discount: "25%" },
    { name: "Vitamin C Chewable Tablets", price: 250, originalPrice: 300, dosage: "Bottle of 60 tablets", discount: "15%" },
    { name: "Digital Thermometer", price: 199, originalPrice: 299, dosage: "1 Unit", discount: "33%" },
    { name: "Cough Syrup Relief", price: 120, originalPrice: 150, dosage: "100ml Bottle", discount: "20%" },
    { name: "Calcium + Vitamin D3", price: 350, originalPrice: 450, dosage: "Bottle of 30 tablets", discount: "22%" },
    { name: "Pain Relief Gel", price: 85, originalPrice: 100, dosage: "30g Tube", discount: "15%" },
    { name: "N95 Face Mask", price: 45, originalPrice: 60, dosage: "Pack of 1", discount: "25%" },
    { name: "Hand Sanitizer", price: 99, originalPrice: 150, dosage: "500ml Bottle", discount: "34%" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Medicines</h1>
          <p className="text-gray-600 text-sm md:text-base">Showing popular medicines and health products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (Desktop) / Mobile Toggle */}
        <aside className="w-full lg:w-72 lg:min-w-[288px] flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Filter size={18} className="mr-2 text-primary" /> Filters
              </h2>
              <button className="text-sm font-medium text-primary hover:text-blue-700 hover:underline transition-colors">
                Clear All
              </button>
            </div>

            {/* Filter Groups */}
            <div className="p-5 space-y-6 hidden lg:block">
              {/* Categories */}
              <div className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Category <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                </h3>
                <div className="space-y-3">
                  {["Pain Relief", "Cold & Cough", "Diabetes", "Vitamins", "First Aid"].map((cat) => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                        />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Price <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                </h3>
                <div className="space-y-3">
                  {["Under ₹100", "₹100 - ₹500", "₹500 - ₹1000", "Above ₹1000"].map((price) => (
                    <label key={price} className="flex items-center space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Availability <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                </h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" 
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">In Stock</span>
                </label>
              </div>
            </div>

            {/* Mobile Filter Toggle Button (Visible only on mobile) */}
            <div className="lg:hidden p-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-white border border-primary text-primary hover:bg-blue-50 py-3 rounded-lg font-semibold transition-colors shadow-sm">
                <SlidersHorizontal size={18} />
                <span>Show Filters</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          {/* Sort & Count Header */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-gray-700 font-medium">{medicines.length} items found</span>
            
            <div className="flex items-center space-x-3">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
              <div className="relative">
                <select 
                  id="sort" 
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-3 pr-8 py-2.5 outline-none cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>

          {medicines.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {medicines.map((medicine, index) => (
                <ProductCard key={index} {...medicine} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Filter size={32} className="text-primary/60" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No medicines found</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                Try adjusting your filters or search for a different product.
              </p>
              <button className="text-primary font-semibold hover:underline flex items-center">
                <X size={16} className="mr-1" /> Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
