import ConsultationSection from "@/components/home/ConsultationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - MedsForMain",
  description:
    "Get in touch with MedsForMain for expert medical advice and personalized health recommendations.",
};

export default function ContactPage() {
  return (
    <main>
      <div className="bg-primary/5 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">
          We are here to assist you with your medical needs.
        </p>
      </div>
      <ConsultationSection />
    </main>
  );
}
