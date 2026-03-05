"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import {
  Filter,
  ChevronDown,
  SlidersHorizontal,
  X,
  Search
} from "lucide-react";
import { Product } from "@/lib/products";
import { useRouter, useSearchParams } from "next/navigation";

interface MedicinesClientProps {
  initialProducts: Product[];
  categories: { name: string; slug: string }[];
}

export default function MedicinesClient({
  initialProducts,
  categories
}: MedicinesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<string>>(
    new Set()
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize state from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const cats = categoryParam.split(",");
      setSelectedCategories(new Set(cats));
    }

    const queryParam = searchParams.get("search");
    if (queryParam) {
      setSearchQuery(queryParam);
    } else {
      setSearchQuery("");
    }

    // We could also sync other params, but let's start with category as requested
  }, [searchParams]);

  // Update URL when filters change (optional, but good for UX)
  const updateUrl = (cats: Set<string>, query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cats.size > 0) {
      params.set("category", Array.from(cats).join(","));
    } else {
      params.delete("category");
    }

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.replace(`/medicines?${params.toString()}`, { scroll: false });
  };

  // Toggle handlers
  const toggleCategory = (slug: string) => {
    const newCats = new Set(selectedCategories);
    if (newCats.has(slug)) {
      newCats.delete(slug);
    } else {
      newCats.add(slug);
    }
    setSelectedCategories(newCats);
    updateUrl(newCats, searchQuery);
  };

  const togglePriceRange = (range: string) => {
    const newRanges = new Set(selectedPriceRanges);
    if (newRanges.has(range)) {
      newRanges.delete(range);
    } else {
      newRanges.add(range);
    }
    setSelectedPriceRanges(newRanges);
  };

  const clearAllFilters = () => {
    setSelectedCategories(new Set());
    setSelectedPriceRanges(new Set());
    setInStockOnly(false);
    setSearchQuery("");
    updateUrl(new Set(), "");
  };

  const clearSearch = () => {
    setSearchQuery("");
    updateUrl(selectedCategories, "");
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Search Filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchDescription = product.description
            .toLowerCase()
            .includes(query);
          // const matchIngredients = product.active_ingredients?.toLowerCase().includes(query); // If present

          if (!matchName && !matchCategory && !matchDescription) {
            return false;
          }
        }

        // Category Filter
        if (
          selectedCategories.size > 0 &&
          !selectedCategories.has(product.categorySlug)
        ) {
          return false;
        }

        // Availability Filter
        if (inStockOnly && !product.inStock) {
          return false;
        }

        // Price Filter
        if (selectedPriceRanges.size > 0) {
          let matchesPrice = false;
          // Ranges: "Under $100", "$100 - $500", "$500 - $1000", "Above $1000"
          if (selectedPriceRanges.has("Under $100") && product.price < 100)
            matchesPrice = true;
          if (
            selectedPriceRanges.has("$100 - $500") &&
            product.price >= 100 &&
            product.price <= 500
          )
            matchesPrice = true;
          if (
            selectedPriceRanges.has("$500 - $1000") &&
            product.price > 500 &&
            product.price <= 1000
          )
            matchesPrice = true;
          if (selectedPriceRanges.has("Above $1000") && product.price > 1000)
            matchesPrice = true;

          if (!matchesPrice) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          case "Newest First":
            return 0; // Assuming no date field, keep original order or random
          default:
            return 0; // Relevance
        }
      });
  }, [
    initialProducts,
    selectedCategories,
    selectedPriceRanges,
    inStockOnly,
    sortBy,
    searchQuery
  ]);

  const priceRanges = [
    "Under $100",
    "$100 - $500",
    "$500 - $1000",
    "Above $1000"
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Medicines"}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {searchQuery
              ? `Found ${filteredProducts.length} results matching your search`
              : "Showing popular medicines and health products"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (Desktop) / Mobile Modal */}
        <aside
          className={`
          lg:block lg:w-72 lg:min-w-[288px] flex-shrink-0 z-40
          ${isMobileFiltersOpen ? "fixed inset-0 bg-white z-50 overflow-y-auto" : "hidden"}
        `}
        >
          <div
            className={`
             bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:shadow-sm lg:sticky lg:top-24 lg:overflow-hidden
             ${isMobileFiltersOpen ? "min-h-screen" : ""}
           `}
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Filter size={18} className="mr-2 text-primary" /> Filters
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-primary hover:text-blue-700 hover:underline transition-colors"
                >
                  Clear All
                </button>
                {/* Close button for mobile */}
                <button
                  className="lg:hidden p-1 text-gray-500 hover:text-gray-900"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Filter Groups */}
            <div className="p-5 space-y-6">
              {/* Categories */}
              <div className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Category{" "}
                  <ChevronDown
                    size={16}
                    className="text-gray-400 group-hover:text-primary transition-colors"
                  />
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.slug}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Price{" "}
                  <ChevronDown
                    size={16}
                    className="text-gray-400 group-hover:text-primary transition-colors"
                  />
                </h3>
                <div className="space-y-3">
                  {priceRanges.map((price) => (
                    <label
                      key={price}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.has(price)}
                        onChange={() => togglePriceRange(price)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between cursor-pointer group">
                  Availability{" "}
                  <ChevronDown
                    size={16}
                    className="text-gray-400 group-hover:text-primary transition-colors"
                  />
                </h3>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    In Stock
                  </span>
                </label>
              </div>

              {/* Mobile Only: Apply Button */}
              <div className="lg:hidden pt-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center space-x-2 bg-white border border-primary text-primary hover:bg-blue-50 py-3 rounded-lg font-semibold transition-colors shadow-sm"
            >
              <SlidersHorizontal size={18} />
              <span>Show Filters</span>
            </button>
          </div>

          {/* Active Search / Filters State */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center">
                <Search size={20} className="text-primary mr-3" />
                <span className="text-gray-700">
                  Search results for{" "}
                  <span className="font-bold text-gray-900">
                    "{searchQuery}"
                  </span>
                </span>
              </div>
              <button
                onClick={clearSearch}
                className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline flex items-center"
              >
                <X size={16} className="mr-1" /> Clear Search
              </button>
            </div>
          )}

          {/* Sort & Count Header */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-gray-700 font-medium">
              {filteredProducts.length} items found
            </span>

            <div className="flex items-center space-x-3">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((medicine) => (
                <ProductCard key={medicine.slug} {...medicine} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-primary/60" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {searchQuery
                  ? `No medicines found for "${searchQuery}"`
                  : "No medicines found"}
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={clearAllFilters}
                className="text-primary font-semibold hover:underline flex items-center"
              >
                <X size={16} className="mr-1" /> Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
