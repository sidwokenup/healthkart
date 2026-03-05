"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown,
  ChevronRight,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SearchInput from "./SearchInput";
import LeadCaptureModal from "./LeadCaptureModal";

interface HeaderProps {
  categories?: { name: string; slug: string }[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    // Check if user has already submitted info or previously been shown the popup
    const hasSubmitted = localStorage.getItem("userInfoSubmitted");

    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 12000); // 12 seconds delay (between 10-15s)

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button (Left) */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isSearchOpen) setIsSearchOpen(false);
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo (Center on mobile, Left on desktop) */}
            <div
              className={`flex-shrink-0 flex items-center ${isSearchOpen ? "hidden" : "block"} md:block transition-all`}
            >
              <Link href="/" className="text-2xl font-bold text-primary">
                MedsForPain
              </Link>
            </div>

            {/* Mobile Search Bar (Overlay) */}
            {isSearchOpen && (
              <div className="md:hidden flex-1 mx-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <SearchInput
                  placeholder="Search medicines..."
                  autoFocus={true}
                />
              </div>
            )}

            {/* Desktop Navigation (Center) */}
            <nav
              className={`hidden md:flex space-x-6 ${isSearchOpen ? "hidden" : ""}`}
            >
              <Link
                href="/medicines"
                className="text-gray-600 hover:text-primary font-medium flex items-center h-full"
              >
                Medicines
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group h-full flex items-center">
                <button className="text-gray-600 group-hover:text-primary font-medium flex items-center">
                  Categories <ChevronDown size={16} className="ml-1" />
                </button>

                <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                  <div className="max-h-[60vh] overflow-y-auto">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/medicines"
                        className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-50"
                      >
                        View All Medicines
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className="text-gray-600 hover:text-primary font-medium flex items-center h-full"
              >
                About Us
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-primary font-medium flex items-center h-full"
              >
                Home
              </Link>
              <Link
                href="/shipment"
                className="text-gray-600 hover:text-primary font-medium flex items-center h-full"
              >
                Shipment
              </Link>
            </nav>

            {/* Desktop Search (Center-Right) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <SearchInput placeholder="Search for medicines..." />
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Mobile Search Icon */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false); // Close menu if open
                }}
                aria-label={isSearchOpen ? "Close search" : "Open search"}
              >
                {isSearchOpen ? <X size={24} /> : <Search size={24} />}
              </button>

              <button
                className="hidden md:flex items-center space-x-1 text-primary hover:text-blue-700 font-bold transition-colors bg-blue-50 px-3 py-1.5 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                <Tag size={18} />
                <span className="hidden lg:inline text-sm">Get 40% Off</span>
              </button>

              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-primary"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && !isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white max-h-[calc(100vh-64px)] overflow-y-auto absolute top-16 left-0 right-0 z-40">
            <div className="space-y-1 px-4 py-3">
              {/* Mobile Search Input - Removed here since we have the top bar toggle now */}

              <Link
                href="/medicines"
                className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2"
              >
                Medicines
              </Link>

              {/* Mobile Categories Accordion */}
              <div>
                <button
                  onClick={() =>
                    setIsMobileCategoriesOpen(!isMobileCategoriesOpen)
                  }
                  className="flex items-center justify-between w-full py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2"
                >
                  <span>Categories</span>
                  {isMobileCategoriesOpen ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {isMobileCategoriesOpen && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-gray-100 ml-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="block py-2 text-sm text-gray-500 hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link
                      href="/medicines"
                      className="block py-2 text-sm font-semibold text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2"
              >
                About Us
              </Link>
              <Link
                href="/"
                className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2"
              >
                Home
              </Link>
              <Link
                href="/shipment"
                className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2"
              >
                Shipment
              </Link>
              <div className="border-t border-gray-100 my-2 pt-2">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 text-base font-bold text-primary hover:bg-gray-50 rounded-md px-2"
                >
                  <Tag size={20} className="mr-3" />
                  Get 40% Off
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
