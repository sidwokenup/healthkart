import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

import { getAllCategories } from "@/lib/products";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://medsforpain.com"),
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
  },
  icons: {
    icon: "/favicon.ico.png",
  },
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1G9WEE5S25"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1G9WEE5S25');
          `}
        </Script>
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning={true}
      >
        <CartProvider>
          <Header categories={categories} />
          <CartDrawer />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <WhatsAppChat />
        </CartProvider>
      </body>
    </html>
  );
}
