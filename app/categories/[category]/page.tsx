import ProductCard from "@/components/ProductCard";
import { getAllCategories, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    return {
      title: "Category Not Found - HealthKart",
    };
  }

  return {
    title: `${categoryData.name} Medicines - HealthKart`,
    description: `Browse our selection of ${categoryData.name} medicines and healthcare products.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = getProductsByCategory(category);
  const categories = getAllCategories();
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/medicines" className="hover:text-primary transition-colors">Medicines</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{categoryData.name}</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse our comprehensive range of {categoryData.name.toLowerCase()} medicines. 
            Genuine products, best prices, and fast delivery.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any medicines in this category at the moment.
            </p>
            <Link 
              href="/medicines" 
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              <ArrowLeft size={18} className="mr-2" /> Browse all medicines
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
