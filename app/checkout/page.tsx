"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Washington DC"
];

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartCount, cartTotal, items: cart, clearCart } = useCart();
  const router = useRouter();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    state: "",
    customState: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    // Validation Logic
    if (id === "zip") {
      // Only allow numeric input, max 5 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 5);
      setFormData((prev) => ({ ...prev, [id]: numericValue }));
      return;
    }

    if (id === "phone") {
      // Basic numeric input for phone, allowing typical format chars
      // For strict masking, we could use a library, but simple numeric filter is robust enough for now
      // Let's just allow numbers and common separators
      const cleanValue = value.replace(/[^\d\-\+\(\)\s]/g, "");
      setFormData((prev) => ({ ...prev, [id]: cleanValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fillAddress = (address: any, source: "GPS" | "IP") => {
    const newFormData = { ...formData };

    // City
    if (address.city || address.town || address.village || address.county) {
      newFormData.city =
        address.city || address.town || address.village || address.county || "";
    }

    // State
    const stateName = address.state || address.region || "";
    if (stateName && US_STATES.includes(stateName)) {
      newFormData.state = stateName;
      newFormData.customState = "";
    } else if (stateName) {
      newFormData.state = "Other";
      newFormData.customState = stateName;
    }

    // Zip
    const postal = address.postcode || address.postal || "";
    if (postal) {
      newFormData.zip = postal.replace(/\D/g, "").slice(0, 5);
    }

    // Street (Only for GPS usually)
    if (source === "GPS") {
      const houseNumber = address.house_number || "";
      const road = address.road || "";
      if (houseNumber || road) {
        newFormData.address1 = `${houseNumber} ${road}`.trim();
      }
    }

    setFormData(newFormData);
    setSuccessMessage("Address detected successfully.");

    // Focus appropriate field
    if (source === "GPS" && newFormData.address1) {
      document.getElementById("address2")?.focus();
    } else {
      document.getElementById("address1")?.focus();
    }
  };

  const fetchIpLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("IP Geolocation failed");
      const data = await response.json();

      if (data.country_code !== "US") {
        setLocationError("We currently deliver only within the United States.");
        return;
      }

      fillAddress(data, "IP");
    } catch (error) {
      console.error("IP Fallback Error:", error);
      setLocationError("Unable to detect location. Please enter manually.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");
    setSuccessMessage("");

    if (!navigator.geolocation) {
      // Fallback to IP immediately if no Geolocation support
      fetchIpLocation();
      return;
    }

    // Set a timeout for GPS
    const gpsTimeout = setTimeout(() => {
      // If GPS takes too long, try IP fallback
      // We need a way to cancel the GPS success callback if it comes later,
      // but for simplicity we'll just trigger IP fallback logic.
      // In a real app we'd use AbortController or flags.
      console.warn("GPS Timeout, switching to IP fallback");
      fetchIpLocation();
    }, 5000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(gpsTimeout);
        try {
          const { latitude, longitude } = position.coords;
          // Reverse Geocoding via Nominatim (OpenStreetMap)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );

          if (!response.ok) throw new Error("Failed to fetch address");

          const data = await response.json();
          const address = data.address;

          if (
            address.country_code &&
            address.country_code.toLowerCase() !== "us"
          ) {
            setLocationError(
              "We currently deliver only within the United States."
            );
            setIsLoadingLocation(false);
            return;
          }

          if (address) {
            fillAddress(address, "GPS");
          } else {
            // If GPS gave coords but no address (rare), try IP
            fetchIpLocation();
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          fetchIpLocation(); // Fallback to IP on geocoding error
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        clearTimeout(gpsTimeout);
        console.error("Geolocation error:", error);
        // Fallback to IP on any GPS error (permission denied, position unavailable, etc.)
        fetchIpLocation();
      },
      { timeout: 5000 }
    );
  };

  const handlePlaceOrder = async () => {
    // Basic Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.zip
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (cartCount === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsPlacingOrder(true);

    // Generate a simple order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const orderData = {
      type: "order" as const,
      orderId,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      address: {
        address1: formData.address1,
        city: formData.city,
        state:
          formData.state === "Other" ? formData.customState : formData.state,
        zip: formData.zip
      },
      items: cart.map((item) => ({
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      })),
      orderTotal: cartTotal
    };

    const result = await submitToGoogleSheets(orderData);

    if (result.success) {
      // Clear cart and redirect to success page
      clearCart();
      router.push("/order-success");
    } else {
      alert("Failed to place order. Please try again.");
    }

    setIsPlacingOrder(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm mb-6">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Delivery Details
          </h1>
          <p className="text-gray-500 text-sm">
            We will contact you to confirm your order
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1 space-y-6">
            {/* Contact Information */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2 text-primary" /> Contact
                Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      inputMode="tel"
                      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <MapPin size={20} className="mr-2 text-primary" /> Delivery
                  Address
                </h2>
                <button
                  className="text-sm font-medium text-primary hover:underline flex items-center disabled:opacity-50"
                  onClick={handleUseCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <Loader2 size={14} className="mr-1 animate-spin" />
                  ) : (
                    <MapPin size={14} className="mr-1" />
                  )}
                  {isLoadingLocation ? "Detecting..." : "Use Current Location"}
                </button>
              </div>

              {locationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
                  <ShieldCheck size={16} className="mr-2" /> {locationError}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 flex items-center">
                  <ShieldCheck size={16} className="mr-2" /> {successMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    placeholder="House No., Building Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address2"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="Road Name, Area, Colony"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="12345"
                      inputMode="numeric"
                      maxLength={5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-white"
                    >
                      <option value="">Select State</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                      <option value="Other">Other (Enter Manually)</option>
                    </select>
                  </div>
                  {formData.state === "Other" && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <label
                        htmlFor="customState"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Enter State Manually
                      </label>
                      <input
                        type="text"
                        id="customState"
                        value={formData.customState}
                        onChange={handleInputChange}
                        placeholder="Enter state name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex items-start">
                <ShieldCheck
                  size={18}
                  className="text-primary mt-0.5 mr-2 flex-shrink-0"
                />
                <p className="text-xs text-blue-800">
                  No online payment required. Our team will call you to confirm
                  details before delivery.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartCount})</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total Payable</span>
                  <span>${cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || cartCount === 0}
                className="w-full bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> Placing
                    Order...
                  </>
                ) : (
                  <>
                    Place Order <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
