import productsData from "./products.json";
import { generateSEOFields, ProductInput } from "./seoProductGenerator";

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string; // Add categorySlug for linking
  price: number;
  originalPrice: number;
  description: string;
  meta_description: string;
  meta_title?: string; // Optional field for SEO title
  image_alt?: string;
  images: string[];
  dosage: string;
  brand: string;
  inStock: boolean;
  discount?: string;
  uses?: string;
  faq?: string;
  side_effects?: string;
  precautions?: string;
  rating?: number;
  reviews_count?: number;
  isPopular?: boolean;
  quantityOptions: { label: string; price: number }[];
}

function parsePrice(priceStr: string): { min: number; max: number } {
  try {
    // Match prices with $ or ₹ or just numbers
    // Updated regex to be more flexible with currency symbols and whitespace
    const matches = priceStr.match(
      /(?:[₹$]\s?)?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g
    );
    if (matches && matches.length > 0) {
      const prices = matches.map((p) => {
        // Remove currency symbols, commas and whitespace before parsing
        const cleanPrice = p.replace(/[₹$,\s]/g, "");
        return parseFloat(cleanPrice);
      });
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    }
  } catch (e) {
    console.error("Error parsing price:", priceStr, e);
  }
  return { min: 0, max: 0 };
}

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Generate URL-safe slug for categories (e.g., "MEN HEALTH" -> "men-health")
function generateCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

export const getAllProducts = (): Product[] => {
  return productsData
    .filter((p: any) => p.name !== "N/A" && p.category !== "N/A")
    .map((rawProduct: any) => {
      // Apply SEO generation
      const p = generateSEOFields(rawProduct as ProductInput);

      const slug = p.url
        ? p.url.split("/").pop() || generateSlug(p.name)
        : generateSlug(p.name);
      const { min, max } = parsePrice(String(p.price));
      const categoryName = p.category.split(">")[0].trim();
      const categorySlug = generateCategorySlug(categoryName);

      // Use manually provided quantityOptions if available, otherwise simulate based on price
      let quantityOptions: { label: string; price: number }[] = [];

      if (
        p.quantityOptions &&
        Array.isArray(p.quantityOptions) &&
        p.quantityOptions.length > 0
      ) {
        quantityOptions = p.quantityOptions;
      } else {
        // Simulate quantity options based on price range
        // New Logic: 90 Pills, 180 Pills, 360 Pills
        // Logic:
        // - 90 Pills: Uses the "min" price from the JSON (assuming JSON price is for base unit)
        // - 180 Pills: 2x base price with 10% discount
        // - 360 Pills: 4x base price with 20% discount

        const basePrice = min > 0 ? min : 99.99; // Fallback if no price found

        quantityOptions = [
          { label: "90 Pills", price: basePrice },
          {
            label: "180 Pills",
            price: Math.round(basePrice * 2 * 100) / 100
          },
          {
            label: "360 Pills",
            price: Math.round(basePrice * 4 * 100) / 100
          }
        ];

        if (min === max && min > 0) {
          // Keep generated quantity options even if price is fixed,
          // because we are now generating 90/180/360 options from the base price.
          // The previous logic was forcing "Standard Pack" which hides the pill options.
          // quantityOptions.length = 0;
          // quantityOptions.push({ label: "Standard Pack", price: min });
        }
      }

      return {
        slug,
        name: p.name,
        category: categoryName,
        categorySlug,
        price: min,
        originalPrice: Math.round(min * 1.2 * 100) / 100,
        description:
          p.description || p.meta_description || "No description available.",
        meta_description: p.meta_description,
        meta_title: p.meta_title,
        image_alt: p.image_alt,
        images:
          p.images && Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : [
                `/products/${slug}/gen_1.jpg`,
                `/products/${slug}/gen_1.webp`,
                `/products/${slug}/gen_1.png`,
                `/products/${slug}/${slug.substring(0, 3)}_1.jpg`
              ],
        dosage: p.dosage,
        brand: p.brand_or_generic || "Generic",
        inStock: true,
        discount: "20% OFF",
        uses: p.uses || "",
        faq: p.faq || "",
        side_effects: p.side_effects,
        precautions: p.precautions,
        rating: parseFloat(p.rating) || 4.5,
        reviews_count: parseInt(p.reviews_count) || 0,
        isPopular: p.isPopular || false,
        quantityOptions
      };
    })
    .filter((p: Product) => p.category !== "N/A" && p.name !== "N/A");
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  const products = getAllProducts();
  return products.filter((p) => p.categorySlug === categorySlug);
};

export const getAllCategories = (): { name: string; slug: string }[] => {
  const products = getAllProducts();
  const categories = new Map<string, string>();

  // Define custom sort order for categories
  const categoryOrder = ["Pain Relief", "ADHD", "Anti-Anxiety", "Weight Loss"];

  products.forEach((p) => {
    if (!categories.has(p.categorySlug)) {
      categories.set(p.categorySlug, p.category);
    }
  });

  const categoryList = Array.from(categories.entries()).map(([slug, name]) => ({
    slug,
    name
  }));

  // Sort categories based on categoryOrder
  return categoryList.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.name);
    const indexB = categoryOrder.indexOf(b.name);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
};
