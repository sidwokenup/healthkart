import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import PaymentMarquee from "@/components/home/PaymentMarquee";
import OfferBanner from "@/components/home/OfferBanner";
import FeaturedSection from "@/components/home/FeaturedSection";
import ConsultationSection from "@/components/home/ConsultationSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      <PaymentMarquee />
      <OfferBanner />
      <FeaturedSection />
      <ConsultationSection />
    </div>
  );
}
