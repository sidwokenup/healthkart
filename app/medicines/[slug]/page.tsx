import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found - HealthKart",
    };
  }

  return {
    title: `${product.name} - HealthKart`,
    description: product.meta_description || product.description.substring(0, 160),
  };
}

export default async function MedicineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p.slug !== product.slug) // Exclude current product
    .slice(0, 6); // Limit to 6 items

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
