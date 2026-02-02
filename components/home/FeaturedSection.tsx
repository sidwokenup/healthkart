import ProductCard from "../ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "Paracetamol 650mg Tablet",
    price: 30,
    originalPrice: 40,
    dosage: "Strip of 15 tablets",
    discount: "25%",
  },
  {
    name: "Vitamin C Chewable Tablets",
    price: 250,
    originalPrice: 300,
    dosage: "Bottle of 60 tablets",
    discount: "15%",
  },
  {
    name: "Digital Thermometer",
    price: 199,
    originalPrice: 299,
    dosage: "1 Unit",
    discount: "33%",
  },
  {
    name: "Cough Syrup Relief",
    price: 120,
    originalPrice: 150,
    dosage: "100ml Bottle",
    discount: "20%",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Popular Medicines</h2>
          <Link href="#" className="flex items-center text-primary font-semibold hover:text-blue-700 transition-colors">
            View All <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
