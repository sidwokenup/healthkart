"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  HeartPulse,
  Stethoscope,
  Pill,
  Lock,
  Award,
  Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Since this is a client component for Framer Motion, we can't export metadata directly.
// We'll handle metadata in a separate layout or page wrapper if strict SEO structure requires it,
// but for a single page component in App Router, we often separate the client logic or use a wrapper.
// For simplicity here, we'll build the page content and assume metadata is handled by the parent layout
// or we can use a server component wrapper if needed. However, the user asked for "export default function About()".
// I will create the main page as a client component because of `framer-motion`.

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 md:py-28 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trusted Online Pharmacy for{" "}
              <span className="text-primary">Safe & Affordable</span> Medicines
              Across the USA
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your licensed,secure and Non-prescription online pharmacy across
              the USA.
              <br />
              Get your medications without prescription to your doorsteps.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/medicines"
                className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHO WE ARE SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 h-[400px]">
                <Image
                  src="/products/healthcare.png"
                  alt="Redefining Healthcare"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <span className="text-primary font-bold tracking-wide uppercase text-sm mb-2 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Redefining Healthcare Access in America
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  MedsForPain is a premier US-focused online pharmacy platform
                  dedicated to bridging the gap between patients and essential
                  medications. We partner exclusively with licensed US
                  pharmacies to ensure every product we deliver is authentic,
                  safe, and effective.
                </p>
                <p>
                  We understand the challenges of chronic pain management. Our
                  platform streamlines the prescription verification process,
                  strictly adhering to US pharmacy regulations and safety
                  standards, to provide you with peace of mind and genuine
                  relief.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION SECTION */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              "To make healthcare accessible, affordable, and transparent for
              every American. We believe in a patient-first approach,
              prioritizing responsible pain management and secure, dignified
              access to essential treatments."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                  <CreditCard size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Affordable Access</h3>
                <p className="text-gray-600 text-sm">
                  Transparent pricing on all medications, ensuring you never
                  overpay for your health.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                  <Truck size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast US Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Secure and discreet shipping across the USA, reaching your
                  doorstep when you need it most.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                  <HeartPulse size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Patient First</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated to responsible care and verified treatments for your
                  well-being.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER SECTION */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a wide range of medical products tailored to your
              needs, from prescription meds to daily wellness essentials.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Pill,
                title: "Prescription Meds",
                desc: "Genuine Rx medications verified by licensed pharmacists."
              },
              {
                icon: Stethoscope,
                title: "Pain Relief",
                desc: "Effective OTC and prescription solutions for chronic pain."
              },
              {
                icon: ShieldCheck,
                title: "Chronic Care",
                desc: "Long-term management medications for sustained relief."
              },
              {
                icon: HeartPulse,
                title: "Wellness Products",
                desc: "Vitamins, supplements, and holistic health aids."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-teal-600">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. SAFETY & COMPLIANCE SECTION */}
      <section className="py-16 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Uncompromised Safety & Compliance
              </h2>
              <ul className="space-y-4">
                {[
                  "Strict Prescription Validation Process",
                  "HIPAA-Compliant Data Protection",
                  "256-bit SSL Bank-Grade Encryption",
                  "Sourced from Licensed US Pharmacies",
                  "FDA-Approved Medications Only"
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-lg text-gray-300"
                  >
                    <Lock
                      size={20}
                      className="text-green-400 mr-3 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-5/12 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <Award size={64} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Our Promise
              </h3>
              <p className="text-gray-400 text-center leading-relaxed">
                "We never compromise on quality. Every product is traceable,
                authentic, and handled with the utmost care to ensure your
                safety."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedsForPain?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "100% Genuine", desc: "Authentic Medicines" },
              { title: "Licensed Network", desc: "Verified US Pharmacies" },
              { title: "Secure Payments", desc: "Safe Transactions" },
              { title: "Fast Shipping", desc: "Reliable US Delivery" },
              { title: "Transparent", desc: "No Hidden Fees" },
              { title: "24/7 Support", desc: "Expert Assistance" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-4"></div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST & RESPONSIBILITY (Footer Note) */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Responsible Medication Use
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            MedsForPain is committed to patient safety. We strongly encourage
            all patients to consult with their healthcare provider before
            starting any new medication. Please use medications responsibly and
            strictly according to the prescribed dosage.
          </p>
          <a
            href="tel:+13122483163"
            className="text-primary font-medium hover:underline text-sm"
          >
            Contact our Pharmacist Team
          </a>
        </div>
      </section>
    </div>
  );
}
