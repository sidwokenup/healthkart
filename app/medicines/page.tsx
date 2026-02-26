import { Suspense } from "react";
import MedicinesClient from "./MedicinesClient";
import { getAllProducts, getAllCategories } from "@/lib/products";

export default function MedicinesPage() {
  const medicines = getAllProducts();
  const categories = getAllCategories();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <MedicinesClient initialProducts={medicines} categories={categories} />
    </Suspense>
  );
}
