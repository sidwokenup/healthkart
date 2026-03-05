"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Pill,
  MessageSquare,
  Send,
  Loader2
} from "lucide-react";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    medicine: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const result = await submitToGoogleSheets({
      type: "consultation",
      ...formData
    });

    if (result.success) {
      setStatusMessage({
        type: "success",
        text: "Your request has been submitted successfully."
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        medicine: "",
        message: ""
      });
    } else {
      setStatusMessage({
        type: "error",
        text: "Submission failed. Please try again."
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Get a Free Consultation
          </h2>
          <p className="text-gray-600">
            Our team will help you find the right medicine.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Left Column: Image */}
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
            <img
              src="/products/MedicalBanner.png"
              alt="Expert Medical Consultation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-start p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Expert Advice</h3>
                <p className="text-white/90 max-w-xs">
                  Connect with our qualified pharmacists for personalized health
                  recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-1/2 p-6 md:p-10 lg:p-12">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <User size={14} className="mr-1.5 text-gray-400" /> Your
                    Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 flex items-center"
                  >
                    <Phone size={14} className="mr-1.5 text-gray-400" /> Your
                    Phone <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile number"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Mail size={14} className="mr-1.5 text-gray-400" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="medicine"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Pill size={14} className="mr-1.5 text-gray-400" /> Medicine
                </label>
                <input
                  type="text"
                  id="medicine"
                  value={formData.medicine}
                  onChange={handleInputChange}
                  placeholder="Which medicine are you looking for?"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <MessageSquare size={14} className="mr-1.5 text-gray-400" />{" "}
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us more about your requirements..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {statusMessage && (
                <div
                  className={`p-3 text-sm rounded-lg text-center ${
                    statusMessage.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-600 border border-red-100"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" /> Submit Request
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By submitting this form, you agree to our terms and privacy
                  policy.
                </p>
                <div className="text-center mt-4 text-sm text-gray-600">
                  Contact us on Ph no.{" "}
                  <span className="font-semibold text-gray-800">
                    +13122483163
                  </span>{" "}
                  <span className="text-gray-400 text-xs">
                    (Available 24x7)
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
