"use client";

import { useState, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { submitToGoogleSheets } from "@/lib/googleSheets";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const result = await submitToGoogleSheets({
      type: "popup",
      name,
      email,
      phone
    });

    if (result.success) {
      localStorage.setItem("userInfoSubmitted", "true");
      setMessage({ type: "success", text: "Your request has been submitted successfully." });
      
      // Close after a brief delay to show success message
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1500);
    } else {
      setMessage({ type: "error", text: "Submission failed. Please try again." });
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // We do NOT set localStorage here, so the popup can reappear on next visit
    // if the user hasn't submitted yet. (Option 1 logic)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">USER INFO</h2>
            <p className="text-gray-600 text-sm">
              Please enter your details to unlock exclusive offers.
            </p>
          </div>

          {message && (
            <div className={`mb-4 p-3 text-sm rounded-lg text-center ${
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="modal-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="modal-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="modal-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="1234567890"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md mt-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" /> Submitting...
                </>
              ) : "Submit"}
            </button>
          </form>

          {/* Promotional Copy */}
          <div className="mt-6 text-center space-y-3 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Available 24X7 — Contact Us: <span className="font-semibold text-gray-900">1234567890</span>
            </p>
            <p className="text-base md:text-lg font-bold text-primary leading-tight">
              Get 40% Off on the total cart value for early birds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}