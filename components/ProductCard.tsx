import { Plus } from "lucide-react";

interface ProductProps {
  name: string;
  price: number;
  originalPrice?: number;
  dosage: string;
  discount?: string;
}

export default function ProductCard({ name, price, originalPrice, dosage, discount }: ProductProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col h-full relative group">
      {discount && (
        <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full z-10">
          {discount} OFF
        </span>
      )}
      
      {/* Placeholder Image */}
      <div className="w-full h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors">
        <span className="text-sm font-medium">Product Image</span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 line-clamp-2 mb-1 text-base leading-snug group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{dosage}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 text-lg">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through font-medium">MRP ₹{originalPrice}</span>
            )}
          </div>
          <button className="p-2.5 bg-blue-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary" aria-label="Add to cart">
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
