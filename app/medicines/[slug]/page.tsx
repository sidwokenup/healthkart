import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { SEO } from "@/lib/seo";

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

  const url = `${SEO.domain}/medicines/${slug}`;
  const title = product.meta_title || `${product.name} | ${SEO.siteName}`;
  const description =
    product.meta_description || product.description.substring(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SEO.siteName,
      images: product.images,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images,
      creator: SEO.twitterHandle
    }
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
    brand: {
      "@type": "Brand",
      name: product.brand_or_generic || SEO.siteName
    },
    offers: {
      "@type": "Offer",
      url: `${SEO.domain}/medicines/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.availability === "In Stock"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock"
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
