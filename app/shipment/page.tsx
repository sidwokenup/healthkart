import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Shipment Information | MedsForPain",
  description: "Learn about our shipping policies and view shipment details."
};

// Function to get sorted images from a directory
function getSortedImages(directory: string) {
  try {
    const dirPath = path.join(process.cwd(), "public", directory);
    const files = fs.readdirSync(dirPath);

    // Filter image files and sort numerically by the number after "IM-"
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        // Extract number from filename (e.g., "IM-1.jpg" -> 1)
        const numA = parseInt(a.match(/IM-(\d+)/i)?.[1] || "0", 10);
        const numB = parseInt(b.match(/IM-(\d+)/i)?.[1] || "0", 10);
        return numA - numB;
      });

    return images.map((file) => `/${directory}/${file}`);
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

export default function ShipmentPage() {
  const desktopImages = getSortedImages("desktop-shippinginfo");
  const mobileImages = getSortedImages("mobile-shippinginfo");

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop View (md and above) */}
      <div className="hidden md:block">
        {desktopImages.map((src, index) => (
          <div key={`desktop-${index}`} className="w-full">
            <Image
              src={src}
              alt={`Shipment Information Part ${index + 1}`}
              width={1920} // Reasonable default width for desktop full-width
              height={1080} // Aspect ratio will be maintained by CSS w-full h-auto
              className="w-full h-auto block"
              priority={index === 0} // Prioritize the first image
              quality={90}
            />
          </div>
        ))}
        {desktopImages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No desktop shipping information available.
          </div>
        )}
      </div>

      {/* Mobile View (below md) */}
      <div className="block md:hidden">
        {mobileImages.map((src, index) => (
          <div key={`mobile-${index}`} className="w-full">
            <Image
              src={src}
              alt={`Shipment Information Part ${index + 1}`}
              width={768} // Reasonable default width for mobile
              height={1024}
              className="w-full h-auto block"
              priority={index === 0} // Prioritize the first image
              quality={85}
            />
          </div>
        ))}
        {mobileImages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No mobile shipping information available.
          </div>
        )}
      </div>
    </div>
  );
}
