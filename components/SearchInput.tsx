"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllProducts, Product } from "@/lib/products";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchInput({
  placeholder,
  className = "",
  autoFocus = false
}: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      type: "product" | "category";
      name: string;
      slug: string;
      categoryName?: string;
    }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // We need to fetch products client-side for suggestions
  // In a real app, this would be an API call.
  // Since we're using static JSON, we can just import it, but `getAllProducts` is in a file that imports JSON.
  // Next.js client components can import non-client files if they don't use server-only features.
  // `getAllProducts` is pure JS, so it's fine.
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products once on mount
    const products = getAllProducts();
    setAllProducts(products);
  }, []);

  // Handle outside click to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase();

      // Filter Products
      const productMatches = allProducts
        .filter((p) => p.name.toLowerCase().includes(q))
        .map((p) => ({
          type: "product" as const,
          name: p.name,
          slug: p.slug,
          categoryName: p.category
        }));

      // Filter Categories
      const categoryMatches = Array.from(
        new Set(allProducts.map((p) => p.category))
      )
        .filter((c) => c.toLowerCase().includes(q))
        .map((c) => {
          // Find a product with this category to get the slug (or regenerate it)
          const p = allProducts.find((prod) => prod.category === c);
          return {
            type: "category" as const,
            name: c,
            slug: p?.categorySlug || "",
            categoryName: undefined
          };
        });

      // Combine and limit
      // Prioritize startsWith matches
      const sortedProductMatches = productMatches.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q);
        const bStarts = b.name.toLowerCase().startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });

      const combined = [
        ...sortedProductMatches.slice(0, 5),
        ...categoryMatches.slice(0, 2)
      ];

      setSuggestions(combined);
      setHighlightedIndex(-1); // Reset highlight
    }, 200); // 200ms debounce

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/medicines?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        handleSuggestionClick(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: (typeof suggestions)[0]) => {
    if (suggestion.type === "product") {
      router.push(`/medicines/${suggestion.slug}`);
    } else {
      router.push(`/categories/${suggestion.slug}`);
    }
    setShowSuggestions(false);
    setQuery(suggestion.name); // Optional: update input to match selection
  };

  // Helper to highlight matching text
  const HighlightMatch = ({ text, match }: { text: string; match: string }) => {
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === match.toLowerCase() ? (
            <span key={i} className="font-bold text-gray-900">
              {part}
            </span>
          ) : (
            <span key={i} className="text-gray-600">
              {part}
            </span>
          )
        )}
      </span>
    );
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
          placeholder={placeholder || "Search medicines..."}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={`${suggestion.type}-${suggestion.slug}`}>
                <button
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    index === highlightedIndex ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="truncate">
                      <HighlightMatch text={suggestion.name} match={query} />
                    </span>
                    {suggestion.type === "product" &&
                      suggestion.categoryName && (
                        <span className="text-xs text-gray-400 mt-0.5">
                          in {suggestion.categoryName}
                        </span>
                      )}
                  </div>
                  {suggestion.type === "category" && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Category
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
