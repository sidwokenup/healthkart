import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-auto pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">HealthKart</h3>
            <p className="text-sm text-gray-600">
              Your trusted partner for medicines, lab tests, and healthcare products delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Careers</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Policy</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Terms of Use</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">Return Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-primary" />
                <span>123 Health Street, Medical District, Tech City, 560001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-primary" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-primary" />
                <span>support@healthkart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HealthKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
