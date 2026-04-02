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
  meta_description?: string;
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
  brand_or_generic?: string;
  availability?: string;
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

      let slug = p.url
        ? p.url.split("/").pop() || generateSlug(p.name)
        : generateSlug(p.name);

      // Append brand to slug if the URL wasn't explicitly provided, or if we need to ensure uniqueness 
      // but actually, we should just always append the brand if it's not generic to avoid conflicts,
      // OR we can make it part of the slug generation.
      // Wait, if p.url is provided in JSON, we shouldn't break existing explicit URLs unless they collide.
      // A better way is to append the brand to the slug if the brand is provided and it's not already in the slug.
      // Let's modify the slug generation to be robust:
      if (!p.url) {
        slug = generateSlug(p.name);
        if (p.brand && p.brand !== "Generic" && p.brand !== "") {
           const brandSlug = generateSlug(p.brand);
           if (!slug.includes(brandSlug)) {
              slug = `${slug}-${brandSlug}`;
           }
        }
      } else {
        // If they provided a URL but we still have collisions, it's a data issue. 
        // The user says "modify the website code in the way that produc page for that also get generated".
        // Let's force unique slugs by appending the brand if it's not already in the slug and not generic.
        if (p.brand && p.brand !== "Generic" && p.brand !== "") {
          const brandSlug = generateSlug(p.brand);
          if (!slug.includes(brandSlug)) {
             slug = `${slug}-${brandSlug}`;
          }
        }
      }
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
        // Dynamic quantity options based on price_X fields in JSON
        // If the product has "price_30": "300", we generate { label: "30 Pills", price: 300 }
        
        const dynamicOptions: { label: string; price: number; quantity: number }[] = [];
        
        // Find all price_X keys
        let hasAnyDynamicPrices = false;
        Object.keys(p).forEach(key => {
          if (key.startsWith('price_')) {
            hasAnyDynamicPrices = true;
            const quantityStr = key.replace('price_', '');
            const quantity = parseInt(quantityStr);
            if (!isNaN(quantity)) {
              const priceVal = parseFloat(String((p as any)[key]).replace(/[₹$,\s]/g, ""));
              if (!isNaN(priceVal)) {
                dynamicOptions.push({
                  label: `${quantity} Pills`,
                  price: priceVal,
                  quantity
                });
              }
            }
          }
        });

        const basePrice = min > 0 ? min : 99.99;

        // If no dynamic options found at all, fallback to just the base price as 90 Pills
        if (!hasAnyDynamicPrices) {
          quantityOptions = [
            { label: "90 Pills", price: basePrice }
          ];
        } else {
          // Sort by quantity ascending
          dynamicOptions.sort((a, b) => a.quantity - b.quantity);
          quantityOptions = dynamicOptions.map(opt => ({ label: opt.label, price: opt.price }));
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
        brand: p.brand || p.brand_or_generic || "Generic",
        brand_or_generic: p.brand_or_generic,
        availability: p.availability,
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
  const categoryOrder = ["Pain Relief", "ADHD", "Anti-Anxiety", "Migraine"];

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
