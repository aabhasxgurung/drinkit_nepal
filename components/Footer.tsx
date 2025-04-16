import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5EBDA] border-t border-gray-100 relative overflow-hidden">
      <div className="absolute w-screen h-full flex justify-end items-end">
        <Image
          src="/home/footerbg.png"
          width={1200}
          height={600}
          alt=""
          className="w-full"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href={"/"}>
              <Image
                src="/home/logo.png"
                width={200}
                height={60}
                alt="Company Logo"
                className="w-[150px] md:w-[200px] md:h-[60px]"
              />
            </Link>
            <p className="text-gray-600 max-w-md mt-4 font-sans">
              Premium liquor distributor offering carefully curated selections
              of the finest spirits, wines, and craft beverages for connoisseurs
              and casual enthusiasts alike.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-wine-900 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-wine-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-wine-900 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 font-sans">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Cocktails", path: "/cocktails" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-600 hover:text-wine-900 transition-colors hover-link text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 font-sans">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-wine-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-wine-900 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  contactdrinkit.com
                </span>
              </li>
              <li className="text-gray-600 text-sm mt-4">
                Baluwatar, Kathmandu
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Drink It. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
