"use client";

import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button (Left) */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo (Center on mobile, Left on desktop) */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              HealthKart
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/medicines" className="text-gray-600 hover:text-primary font-medium">
              Medicines
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary font-medium">
              Lab Tests
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary font-medium">
              Healthcare
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary font-medium">
              Offers
            </Link>
          </nav>

          {/* Desktop Search (Center-Right) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Search for medicines, health products..."
              />
            </div>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 text-gray-600 hover:text-primary">
              <Search size={24} />
            </button>
            
            <button className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-primary">
              <User size={24} />
              <span className="hidden lg:inline text-sm font-medium">Login</span>
            </button>

            <button className="relative p-2 text-gray-600 hover:text-primary">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            {/* Mobile Search Input */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Search..."
              />
            </div>

            <Link href="/medicines" className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2">
              Medicines
            </Link>
            <Link href="#" className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2">
              Lab Tests
            </Link>
            <Link href="#" className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2">
              Healthcare
            </Link>
            <Link href="#" className="block py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2">
              Offers
            </Link>
            <div className="border-t border-gray-100 my-2 pt-2">
              <Link href="#" className="flex items-center py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md px-2">
                <User size={20} className="mr-3" />
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
