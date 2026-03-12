"use client";

import { Plus, Check, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductProps {
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  dosage: string;
  discount?: string;
  category: string;
  categorySlug: string; // Added categorySlug
  inStock: boolean;
  images: string[];
}

export default function ProductCard({
  name,
  slug,
  price,
  originalPrice,
  dosage,
  discount,
  category,
  categorySlug,
  inStock,
  images
}: ProductProps) {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(images[0]);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    if (inStock) {
      addToCart({
        name,
        slug,
        price,
        originalPrice,
        dosage,
        image: images[0]
      });
      // The drawer will open automatically due to context update
    }
  };

  const handleImageError = () => {
    // Try next image if available
    const currentIndex = images.indexOf(imgSrc);
    if (currentIndex < images.length - 1) {
      setImgSrc(images[currentIndex + 1]);
    } else {
      setImgError(true);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use window location or Next.js router would be better, but Link is standard.
    // Since we are inside a Link, nested Links are invalid HTML.
    // We'll use router.push or object/embed approach, but simpler:
    // Just make the badge a span that looks like a link and use router.
    // Or simpler: The card is a big link. If we want category to link elsewhere,
    // we need to stop propagation and push router.
  };

  return (
    <div className="block h-full relative group">
      <Link
        href={`/medicines/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${name}`}
      >
        <span className="sr-only">{name}</span>
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col h-full relative z-10 pointer-events-none">
        {/* Badges - Make pointer-events-auto for interactive elements inside */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-auto">
          {discount && (
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full w-fit">
              {discount}
            </span>
          )}
          <Link
            href={`/categories/${categorySlug}`}
            className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit hover:bg-blue-100 transition-colors"
          >
            {category}
          </Link>
        </div>

        {/* Stock Status */}
        {!inStock && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="w-full h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors overflow-hidden relative">
          {!imgError ? (
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-contain p-2"
              onError={handleImageError}
            />
          ) : (
            <span className="text-sm font-medium">No Image</span>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-1 text-base leading-snug group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{dosage}</p>

          <div className="mt-auto flex items-center justify-between pointer-events-auto">
            <div className="flex flex-col">
              <span className="font-extrabold text-gray-900 text-lg">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through font-medium">
                  MRP ${originalPrice}
                </span>
              )}
            </div>
            <button
              className={`p-2.5 rounded-xl transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary z-20 ${
                inStock
                  ? "bg-blue-50 text-primary hover:bg-primary hover:text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label={inStock ? "Add to cart" : "Out of stock"}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? (
                <Plus size={20} strokeWidth={2.5} />
              ) : (
                <X size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
