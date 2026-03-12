import { getAllProducts, getAllCategories } from "@/lib/products";
import { SEO } from "@/lib/seo";
import Link from "next/link";

export const metadata = {
  title: "Medicine Product Index | MedsForMain",
  description: "A comprehensive index of all medicine products available at MedsForMain.",
  robots: "noindex, follow", // We want crawlers to follow links, but this page itself doesn't need to rank high
};

export default async function CrawlHubPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  // Group products by category
  const productsByCategory: Record<string, typeof products> = {};
  
  categories.forEach(cat => {
    productsByCategory[cat.name] = products.filter(p => p.categorySlug === cat.slug);
  });

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Medicine Product Index</h1>
      
      <p className="mb-8 text-gray-600">
        This page lists all medicine product URLs for search engine discovery.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.slug} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              <Link href={`/categories/${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
            </h2>
            <ul className="space-y-2">
              {productsByCategory[category.name]?.map((product) => (
                <li key={product.slug}>
                  <a
                    href={`${SEO.domain}/medicines/${product.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
