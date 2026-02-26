import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

import { getAllCategories } from "@/lib/products";

export const metadata = {
  title: "HealthKart – Your Pharmacy Delivered",
  description: "Order medicines online with trusted delivery. Fast, secure, and reliable pharmacy services in the USA.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
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
        </CartProvider>
      </body>
    </html>
  );
}
