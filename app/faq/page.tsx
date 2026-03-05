"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Search,
  ShoppingBag,
  Truck,
  ShieldCheck,
  User
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";

// FAQ Data Structure
const faqData = [
  {
    category: "Prescription & Ordering",
    icon: ShoppingBag,
    questions: [
      {
        q: "Do I need a prescription to buy medications online?",
        a: "Yes. In compliance with US pharmacy regulations, prescription medications (Rx) require a valid prescription issued by a licensed US healthcare provider. You can upload your prescription during checkout or have your doctor send it directly to our pharmacy partners."
      },
      {
        q: "How do I upload my prescription?",
        a: "During the checkout process, you will see an option to 'Upload Prescription'. You can take a clear photo or scan of your prescription and upload it securely. Alternatively, you can provide your doctor's contact information, and our team will verify the prescription on your behalf."
      },
      {
        q: "Can I order without a prescription?",
        a: "You can purchase Over-the-Counter (OTC) medicines, pain relief products, and wellness supplies without a prescription. However, strictly regulated prescription medications cannot be dispensed without valid authorization from a healthcare professional."
      },
      {
        q: "What happens if my prescription cannot be verified?",
        a: "If we are unable to verify your prescription with your healthcare provider or if the document provided is invalid, your order for that specific medication will be cancelled and refunded. We will notify you immediately via email to resolve any issues."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        q: "Do you ship across the United States?",
        a: "Yes, we ship to all 50 states within the USA. We utilize reliable carriers to ensure your medications reach you safely and efficiently regardless of your location."
      },
      {
        q: "How long does delivery take?",
        a: "Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery (1-2 business days). Please note that processing times for prescription verification may add 24-48 hours to the total delivery time."
      },
      {
        q: "Is shipping secure and discreet?",
        a: "Absolutely. All orders are packaged in plain, unmarked boxes or envelopes to ensure privacy. Your medication details are not visible on the external packaging."
      },
      {
        q: "What if my package is delayed?",
        a: "While we strive for timely delivery, carrier delays can occur. If your package has not arrived within the estimated timeframe, please contact our support team at support@medsforpain.com, and we will assist you in tracking your order."
      }
    ]
  },
  {
    category: "Safety & Compliance",
    icon: ShieldCheck,
    questions: [
      {
        q: "Is Medsforpain a licensed online pharmacy?",
        a: "Medsforpain operates as a secure platform connecting patients with a network of fully licensed and accredited pharmacy providers in the United States. All medications are dispensed from US-licensed facilities in compliance with federal and state laws."
      },
      {
        q: "Are medications FDA-approved?",
        a: "Yes. We only source medications from FDA-approved manufacturers and licensed distributors within the United States. We do not sell unapproved or foreign-sourced medications."
      },
      {
        q: "Is my personal and health information secure?",
        a: "Yes. We take your privacy seriously. Our platform utilizes bank-grade SSL encryption and adheres to strict data security standards. We implement safeguards consistent with HIPAA requirements to protect your Protected Health Information (PHI)."
      }
    ]
  },
  {
    category: "Refunds & Returns",
    icon: ShoppingBag, // Using generic icon or could import RefreshCw if available
    questions: [
      {
        q: "Can I return prescription medications?",
        a: "Due to federal and state health regulations, we cannot accept returns on prescription medications once they have been dispensed and shipped. This ensures the safety and integrity of the supply chain."
      },
      {
        q: "What if I receive the wrong or damaged item?",
        a: "If you receive a damaged, defective, or incorrect item, please contact us within 48 hours of delivery. We will arrange for a free replacement or a full refund after verifying your claim."
      }
    ]
  },
  {
    category: "Account & Support",
    icon: User,
    questions: [
      {
        q: "How do I contact customer support?",
        a: "You can reach our dedicated support team via email at support@medsforpain.com or by calling +13122483163. We are available to assist you with order inquiries, prescription questions, and general support."
      },
      {
        q: "Can I cancel my order?",
        a: "You may cancel your order for a full refund if it has not yet been processed by the pharmacy. Once a prescription has been filled and prepared for shipment, the order cannot be cancelled."
      }
    ]
  }
];

// JSON-LD Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.flatMap((category) =>
    category.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  )
};

export default function FAQ() {
  // State to track open accordions.
  // We can use a string format like "categoryIndex-questionIndex" to track the open item.
  // Or just allow multiple open. Let's allow one open per time for cleaner UI, or independent.
  // Let's go with independent toggle for better UX.
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 md:py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Find answers to common questions about ordering prescription and OTC
            medications online securely in the USA.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/medicines"
              className="inline-flex items-center justify-center bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
              Shop Medicines
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. FAQ CONTENT */}
      <section className="py-12 md:py-20 container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {faqData.map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-blue-50/50 p-6 md:p-8 border-b border-gray-100 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg text-primary">
                  <category.icon size={24} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {category.category}
                </h2>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                {category.questions.map((item, qIndex) => {
                  const id = `${catIndex}-${qIndex}`;
                  const isOpen = openItems[id];

                  return (
                    <div
                      key={qIndex}
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full text-left flex justify-between items-start gap-4 py-2 group"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`text-base md:text-lg font-medium transition-colors ${isOpen ? "text-primary" : "text-gray-800 group-hover:text-primary"}`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <ChevronDown
                            size={20}
                            className="text-gray-400 group-hover:text-primary"
                          />
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 leading-relaxed mt-2 pb-2">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONTACT CTA */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our dedicated pharmacist support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="tel:+13122483163"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
            >
              Call +13122483163
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
