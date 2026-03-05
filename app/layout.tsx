import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

import { getAllCategories } from "@/lib/products";

export const metadata = {
  title: "MedsForPain – Your Pharmacy Delivered",
  description:
    "Order medicines online with trusted delivery. Fast, secure, and reliable pharmacy services in the USA.",
  openGraph: {
    title: "MedsForPain – Your Pharmacy Delivered",
    description:
      "Order medicines online with trusted delivery. Fast, secure, and reliable pharmacy services in the USA.",
    url: "https://medsforpain.com", // Replace with your actual domain
    siteName: "Medsforpain",
    images: [
      {
        url: "/opengraph-image.png", // Next.js automatically routes this to app/opengraph-image.png
        width: 1200,
        height: 630,
        alt: "Medsforpain - Online Pharmacy"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MedsForPain – Your Pharmacy Delivered",
    description:
      "Order medicines online with trusted delivery. Fast, secure, and reliable pharmacy services in the USA.",
    images: ["/opengraph-image.png"]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

import WhatsAppChat from "@/components/WhatsAppChat";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const categories = getAllCategories();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Header categories={categories} />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <WhatsAppChat />
        </CartProvider>
      </body>
    </html>
  );
}
