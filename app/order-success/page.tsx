"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-md text-center animate-in fade-in zoom-in-95 duration-500">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Check size={48} className="text-green-600 stroke-[3]" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-6">
          Our team will contact you shortly to confirm your order details.
        </p>

        {/* Contact Info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800 font-medium mb-1">
            Need help? Contact us on:
          </p>
          <a
            href="tel:+13122483163"
            className="text-lg font-bold text-primary hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            +13122483163
          </a>
        </div>

        {/* CTA Button */}
        <Link
          href="/"
          className="block w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Browse More Medicines
        </Link>

        {/* Secondary Link */}
        <Link
          href="/medicines"
          className="block mt-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          View All Products <ArrowRight size={14} className="inline ml-1" />
        </Link>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-xs text-gray-400 text-center max-w-xs">
        Thank you for choosing MedsForPain for your healthcare needs.
      </p>
    </div>
  );
}
