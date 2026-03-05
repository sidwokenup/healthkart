import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found - MedsForPain"
    };
  }

  return {
    title: product.meta_title || `${product.name} - MedsForPain`,
    description:
      product.meta_description || product.description.substring(0, 160)
  };
}

export default async function MedicineDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug) // Exclude current product
    .slice(0, 6); // Limit to 6 items

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.meta_description || product.description,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: product.brand || "Generic"
    },
    offers: {
      "@type": "Offer",
      url: `https://medsforpain.com/medicines/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviews_count || 1
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
