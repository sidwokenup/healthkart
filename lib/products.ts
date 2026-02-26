import productsData from "./products.json";

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string; // Add categorySlug for linking
  price: number;
  originalPrice: number;
  description: string;
  meta_description: string;
  images: string[];
  dosage: string;
  brand: string;
  inStock: boolean;
  discount?: string;
  side_effects?: string;
  precautions?: string;
  rating?: number;
  reviews_count?: number;
  quantityOptions: { label: string; price: number }[];
}

function parsePrice(priceStr: string): { min: number; max: number } {
  try {
    // Match prices with $ or ₹ or just numbers
    // Updated regex to be more flexible with currency symbols and whitespace
    const matches = priceStr.match(/(?:[₹$]\s?)?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g);
    if (matches && matches.length > 0) {
      const prices = matches.map((p) => {
        // Remove currency symbols, commas and whitespace before parsing
        const cleanPrice = p.replace(/[₹$,\s]/g, "");
        return parseFloat(cleanPrice);
      });
      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
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
    .map((p: any) => {
    const slug = generateSlug(p.name);
    const { min, max } = parsePrice(p.price);
    const categoryName = p.category.split(">")[0].trim();
    const categorySlug = generateCategorySlug(categoryName);
    
    // Simulate quantity options based on price range
    const quantityOptions = [
      { label: "30 Pills", price: min },
      { label: "60 Pills", price: Math.round((min + (max - min) * 0.3) * 100) / 100 },
      { label: "90 Pills", price: Math.round((min + (max - min) * 0.6) * 100) / 100 },
      { label: "120 Pills", price: max },
    ].filter(q => q.price > 0);

    if (min === max && min > 0) {
        quantityOptions.length = 0;
        quantityOptions.push({ label: "Standard Pack", price: min });
    }

    return {
      slug,
      name: p.name,
      category: categoryName,
      categorySlug,
      price: min,
      originalPrice: Math.round(min * 1.2 * 100) / 100,
      description: p.description || p.meta_description || "No description available.",
      meta_description: p.meta_description,
      images: [
          `/products/${slug}/gen_1.jpg`,
          `/products/${slug}/gen_1.webp`,
          `/products/${slug}/gen_1.png`,
          `/products/${slug}/${slug.substring(0, 3)}_1.jpg`
      ], 
      dosage: p.dosage,
      brand: p.brand_or_generic || "Generic",
      inStock: true,
      discount: "20% OFF",
      side_effects: p.side_effects,
      precautions: p.precautions,
      rating: parseFloat(p.rating) || 4.5,
      reviews_count: parseInt(p.reviews_count) || 0,
      quantityOptions
    };
  }).filter((p: Product) => p.category !== "N/A" && p.name !== "N/A");
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
  
  products.forEach((p) => {
    if (!categories.has(p.categorySlug)) {
      categories.set(p.categorySlug, p.category);
    }
  });

  return Array.from(categories.entries()).map(([slug, name]) => ({ slug, name }));
};
