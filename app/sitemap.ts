import { MetadataRoute } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/products';
import { SEO } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO.domain;

  // Static routes
  const routes = [
    '',
    '/about',
    '/faq',
    '/medicines',
    '/privacy-policy',
    '/refund-policy',
    '/shipment',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Category routes
  const categories = getAllCategories().map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Product routes
  const products = getAllProducts().map((product) => ({
    url: `${baseUrl}/medicines/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [...routes, ...categories, ...products];
}
