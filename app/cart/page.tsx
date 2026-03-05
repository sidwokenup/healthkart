"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } =
    useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-primary/50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Looks like you haven't added any medicines to your cart yet.
        </p>
        <Link
          href="/medicines"
          className="bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" /> Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-gray-200 py-6 px-4 mb-6 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Cart ({cartCount})
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs">No Image</div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{item.dosage}</p>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    <div className="flex items-center border border-gray-300 rounded-lg h-9">
                      <button
                        onClick={() => updateQuantity(item.slug, -1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-gray-900 text-lg">
                        ${item.price * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-gray-500">
                          ${item.price} / item
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total Amount</span>
                  <span>${cartTotal}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <button className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 text-center">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Total</p>
            <p className="text-xl font-bold text-gray-900">${cartTotal}</p>
          </div>
          <Link href="/checkout" className="flex-1">
            <button className="w-full bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
              Proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
