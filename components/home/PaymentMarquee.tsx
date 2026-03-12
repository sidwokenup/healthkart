"use client";

import { Lock } from "lucide-react";

export default function PaymentMarquee() {
  const marqueeText =
    "ALL TYPES OF PAYMENT METHODS ACCEPTED — BITCOIN • CRYPTO • CREDIT CARDS • DEBIT CARDS • PAYPAL • AND MORE";

  // Duplicate text for seamless looping
  const content = Array(4).fill(marqueeText).join(" • ");

  return (
    <section className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-6 overflow-hidden">
      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="text-white font-bold text-lg md:text-xl tracking-widest uppercase mx-4">
            {content}
          </span>
          {/* Duplicate for seamless loop */}
          <span className="text-white font-bold text-lg md:text-xl tracking-widest uppercase mx-4">
            {content}
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="flex items-center justify-center mt-3 text-white/80 text-sm font-medium tracking-wide">
        <Lock className="w-3 h-3 md:w-4 md:h-4 mr-2" />
        <span>Secured & Trusted Payments</span>
      </div>
    </section>
  );
}
