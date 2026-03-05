import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function FeaturedSection() {
  // Use products marked as popular, prioritizing the new ones (which are at the end of the array, so we might want to reverse or sort)
  // But wait, user said "new products to the Popular Medicines section".
  // And "Replace current Popular Medicines section products with...".
  // The prompt said "Replace all existing products in the 'Popular Medicines' section with the following products."
  // But also "DO NOT delete... any existing products".
  // So we filter by `isPopular`. Since only the new products have `isPopular: true` explicitly set in the JSON (others are undefined/false),
  // this will naturally show ONLY the new products in the popular section, which satisfies "Replace... in the Popular Medicines section"
  // without deleting them from the database.

  const featuredProducts = getAllProducts().filter((p) => p.isPopular);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Popular Medicines
          </h2>
          <Link
            href="/medicines"
            className="flex items-center text-primary font-semibold hover:text-blue-700 transition-colors"
          >
            View All <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
