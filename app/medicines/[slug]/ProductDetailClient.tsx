"use client";

import { useState } from "react";
import {
  Star,
  ShieldCheck,
  AlertCircle,
  Truck,
  Minus,
  Plus,
  Share2,
  Heart,
  ArrowRight
} from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailClient({
  product,
  relatedProducts
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const { addToCart, setInstantOrder } = useCart();
  const [selectedQuantityOption, setSelectedQuantityOption] = useState(
    product.quantityOptions[0] || { label: "1 Unit", price: product.price }
  );

  const [packCount, setPackCount] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    // Try next image if available
    const currentIndex = product.images.indexOf(currentImage);
    if (currentIndex < product.images.length - 1) {
      setCurrentImage(product.images[currentIndex + 1]);
    } else {
      setImgError(true);
    }
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      const cartItemSlug = `${product.slug}-${selectedQuantityOption.label.replace(/\s+/g, "-").toLowerCase()}`;

      addToCart({
        slug: cartItemSlug,
        name: `${product.name} (${selectedQuantityOption.label})`,
        price: selectedQuantityOption.price,
        originalPrice: product.originalPrice,
        dosage: product.dosage,
        image: product.images[0]
      });
      
      // If user selected multiple packs, update quantity
      if (packCount > 1) {
        // We already added 1, so add packCount - 1 more
        // Note: This logic assumes addToCart increments by 1. 
        // Better to update quantity directly if addToCart supported it, 
        // but current implementation is loop-based or simple add.
        // Let's rely on the loop for simplicity if updateQuantity isn't exposed here nicely, 
        // OR better: call addToCart packCount times? 
        // The previous implementation loop was fine, but let's optimize to single add if possible.
        // Actually, previous implementation loop:
        for (let i = 1; i < packCount; i++) {
           addToCart({
            slug: cartItemSlug,
            name: `${product.name} (${selectedQuantityOption.label})`,
            price: selectedQuantityOption.price,
            originalPrice: product.originalPrice,
            dosage: product.dosage,
            image: product.images[0]
          });
        }
      }
    }
  };

  const handleBuyNow = () => {
    if (product.inStock) {
      setInstantOrder({
        slug: product.slug,
        name: `${product.name} (${selectedQuantityOption.label})`,
        price: selectedQuantityOption.price,
        originalPrice: product.originalPrice,
        dosage: product.dosage,
        quantity: packCount,
        image: product.images[0]
      });
      router.push("/checkout");
    }
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "uses", label: "Uses" },
    { id: "side_effects", label: "Side Effects" },
    { id: "precautions", label: "Precautions" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="container mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {" / "}
          <Link href="/medicines" className="hover:text-primary">
            Medicines
          </Link>
          {" / "}
          <Link
            href={`/categories/${product.categorySlug}`}
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          {" / "}
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center aspect-square shadow-sm relative overflow-hidden group">
              <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-500 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center text-gray-400 relative">
                {!imgError ? (
                  <img
                    src={currentImage}
                    alt={product.image_alt || product.name}
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                  />
                ) : (
                  <span className="text-lg font-medium">
                    No Image Available
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {product.brand}
                </span>
                <Link
                  href={`/categories/${product.categorySlug}`}
                  className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {product.category}
                </Link>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
                    Out of Stock
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-3 text-sm">{product.dosage}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                  {product.rating}{" "}
                  <Star size={12} className="ml-1 fill-current" />
                </div>
                <span className="text-gray-500 text-sm">
                  {product.reviews_count} Ratings & Reviews
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 space-y-6">
              {/* Quantity/Variant Selector */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Select Quantity:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.quantityOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setSelectedQuantityOption(option)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedQuantityOption.label === option.label
                          ? "border-primary bg-blue-50 text-primary ring-1 ring-primary"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                      <span className="block text-xs font-normal mt-1">
                        ${option.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${selectedQuantityOption.price}
                  </span>
                  {product.originalPrice > selectedQuantityOption.price && (
                    <span className="text-gray-500 line-through mb-1">
                      ${Math.round(selectedQuantityOption.price * 1.2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-green-600 font-bold mb-1">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Inclusive of all taxes</p>

                <div className="flex items-center gap-4 pt-2">
                  {/* Pack Count (Multiplier) */}
                  <div className="flex items-center border border-gray-300 rounded-lg h-12">
                    <button
                      onClick={() => setPackCount(Math.max(1, packCount - 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                      disabled={!product.inStock || packCount <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {packCount}
                    </span>
                    <button
                      onClick={() => setPackCount(packCount + 1)}
                      className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                      disabled={!product.inStock}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`w-full font-bold py-3.5 px-6 rounded-xl transition-colors shadow-lg ${
                        product.inStock
                          ? "bg-primary text-white hover:bg-blue-700 shadow-blue-200"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>

                    {product.inStock && (
                      <button
                        onClick={handleBuyNow}
                        className="w-full font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <ShieldCheck className="text-primary mb-2" size={24} />
                <span className="text-xs font-medium text-gray-700">
                  100% Genuine
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Truck className="text-primary mb-2" size={24} />
                <span className="text-xs font-medium text-gray-700">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <AlertCircle className="text-primary mb-2" size={24} />
                <span className="text-xs font-medium text-gray-700">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Tabs */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary bg-blue-50/50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Product Description
                </h3>
                <div
                  className="whitespace-pre-wrap [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-4 [&>b]:font-bold [&>strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
            {activeTab === "uses" && (
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Uses</h3>
                {product.uses ? (
                  <div
                    className="whitespace-pre-wrap [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-4 [&>b]:font-bold [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-2 [&>ul]:space-y-1"
                    dangerouslySetInnerHTML={{ __html: product.uses }}
                  />
                ) : (
                  <>
                    <p>This medication is commonly used for:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Pain relief</li>
                      <li>Fever reduction</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-500">
                      Note: Always consult your physician before use.
                    </p>
                  </>
                )}
              </div>
            )}
            {activeTab === "side_effects" && (
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Side Effects
                </h3>
                {product.side_effects && product.side_effects.includes("<") ? (
                  <div
                    className="whitespace-pre-wrap [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-4 [&>b]:font-bold [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-2 [&>ul]:space-y-1"
                    dangerouslySetInnerHTML={{ __html: product.side_effects }}
                  />
                ) : (
                  <p>
                    {product.side_effects ||
                      "No common side effects reported. Consult your doctor if you experience any issues."}
                  </p>
                )}
              </div>
            )}
            {activeTab === "precautions" && (
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Precautions
                </h3>
                {product.precautions && product.precautions.includes("<") ? (
                  <div
                    className="whitespace-pre-wrap [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-4 [&>b]:font-bold [&>strong]:font-bold [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-2 [&>ul]:space-y-1"
                    dangerouslySetInnerHTML={{ __html: product.precautions }}
                  />
                ) : (
                  <p>
                    {product.precautions ||
                      "Keep out of reach of children. Store in a cool, dry place."}
                  </p>
                )}
              </div>
            )}
            {activeTab === "faq" && (
              <div className="prose max-w-none text-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-3">FAQ</h3>
                {product.faq ? (
                  <div
                    className="whitespace-pre-wrap [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-2 [&>h3]:mt-4 [&>p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: product.faq }}
                  />
                ) : (
                  <p className="text-gray-500">
                    No frequently asked questions available for this product.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="flex items-center text-primary font-semibold hover:text-blue-700 transition-colors"
              >
                View All <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} {...relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
