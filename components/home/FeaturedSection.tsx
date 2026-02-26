import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function FeaturedSection() {
  // Use first 8 medicines for featured section
  const featuredProducts = getAllProducts().slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Popular Medicines</h2>
          <Link href="/medicines" className="flex items-center text-primary font-semibold hover:text-blue-700 transition-colors">
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
