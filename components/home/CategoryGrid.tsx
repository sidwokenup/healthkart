import { getAllCategories } from "@/lib/products";
import Link from "next/link";

export default function CategoryGrid() {
  const categories = getAllCategories();

  const getCategoryImage = (slug: string) => {
    switch (slug) {
      case "adhd":
        return "/products/adhd.png";
      case "pain-relief":
        return "/products/painrelief.png";
      case "men-s-health":
      case "mens-health": // Handle potential variations
        return "/products/menshealth.png";
      case "sleeping-pills":
      case "sleeping-pill":
        return "/products/sleepingpill.png";
      case "weight-loss":
        return "/products/weightloss.png";
      case "anti-anxiety":
      case "anxiety":
        return "/products/antianxiety.png"; 
      default:
        // Try to match based on common slug patterns if exact match fails
        if (slug.includes("men") && slug.includes("health")) return "/products/menshealth.png";
        if (slug.includes("weight") && slug.includes("loss")) return "/products/weightloss.png";
        return null;
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        
        {/* Desktop Grid / Mobile Scroll Container */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-6 md:overflow-visible scrollbar-hide snap-x snap-mandatory">
          {categories.filter(cat => cat.name !== "N/A").map((cat) => {
            const imagePath = getCategoryImage(cat.slug);
            return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="flex-shrink-0 w-32 md:w-auto flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 hover:shadow-sm cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-100 snap-start"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full mb-4 bg-blue-50 text-primary border border-blue-100 group-hover:scale-105 transition-transform shadow-sm overflow-hidden relative">
                {imagePath ? (
                  <img 
                    src={imagePath} 
                    alt={cat.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-2xl font-bold uppercase">{cat.name.substring(0, 2)}</div>
                )}
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center leading-tight line-clamp-2 px-1">
                {cat.name}
              </span>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
