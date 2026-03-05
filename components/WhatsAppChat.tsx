"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp Number Configuration
  const whatsappNumber = "447425168723";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleOpenChat = () => {
    window.open(whatsappUrl, "_blank");
    // Optional: Close dialog after opening chat
    // setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Icon */}
      <motion.div
        className="fixed bottom-5 left-5 z-[9999] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg bg-[#25D366] flex items-center justify-center overflow-hidden">
          {/* Using next/image for optimized SVG loading */}
          <Image
            src="/products/whatsapp.svg"
            alt="WhatsApp Support"
            width={36}
            height={36}
            className="w-8 h-8 md:w-10 md:h-10 text-white"
          />
        </div>
      </motion.div>

      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-5 z-[9999] w-[300px] md:w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#00a884] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Image
                  src="/products/whatsapp.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="font-semibold text-sm">WhatsApp Support</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="bg-[#e5ddd5] p-4 h-[250px] flex flex-col gap-3 overflow-y-auto bg-opacity-30 relative">
              {/* Background Pattern Overlay (Optional, simplified with color for now) */}
              <div className="absolute inset-0 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-10 pointer-events-none"></div>

              {/* Message 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm self-start max-w-[85%] text-sm text-gray-800 relative z-10"
              >
                <span className="text-xs text-gray-500 block mb-1">
                  Support Team
                </span>
                Hi 👋, welcome to <span className="font-bold">MedsForPain</span>
                .
              </motion.div>

              {/* Message 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm self-start max-w-[85%] text-sm text-gray-800 relative z-10"
              >
                Can we help you?
              </motion.div>
            </div>

            {/* Footer CTA */}
            <div className="p-3 bg-white border-t border-gray-100">
              <button
                onClick={handleOpenChat}
                className="w-full bg-[#25D366] hover:bg-[#20b85c] text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send size={18} />
                Open Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
