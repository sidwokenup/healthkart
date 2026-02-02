import { Pill, Thermometer, Stethoscope, HeartPulse, Droplets, Baby } from "lucide-react";

const categories = [
  { name: "Pain Relief", icon: Pill, color: "bg-red-50 text-red-600 border border-red-100" },
  { name: "Cold & Cough", icon: Thermometer, color: "bg-blue-50 text-blue-600 border border-blue-100" },
  { name: "Diabetes", icon: Droplets, color: "bg-purple-50 text-purple-600 border border-purple-100" },
  { name: "Vitamins", icon: HeartPulse, color: "bg-green-50 text-green-600 border border-green-100" },
  { name: "Baby Care", icon: Baby, color: "bg-yellow-50 text-yellow-600 border border-yellow-100" },
  { name: "Devices", icon: Stethoscope, color: "bg-gray-50 text-gray-600 border border-gray-100" },
];

export default function CategoryGrid() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 hover:shadow-sm cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-100"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-3 ${cat.color} group-hover:scale-105 transition-transform shadow-sm`}>
                <cat.icon size={28} />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center leading-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
