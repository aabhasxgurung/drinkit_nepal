"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname(); // Current route
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // At the top — reset scroll state here if needed
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        // Add effects like hiding navbar here
      } else {
        // Scrolling up
        // Add effects like showing sticky navbar here
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cocktails", path: "/cocktails" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-10 py-4 
      -translate-y-0
    
          "bg-white/30 backdrop-blur-sm md:bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src="/home/logo.png"
            width={200}
            height={60}
            alt="Company Logo"
            className="w-[150px] md:w-[200px] md:h-[60px]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((nav) => (
            <Link
              href={nav.path}
              key={nav.path}
              className={`font-medium transition-colors duration-200 text-stroke stroke-white text-xl ${
                location === nav.path
                  ? "text-[#7B0323]" // Active link
                  : "text-black hover:text-[#7B0323]"
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#7B0323] text-3xl transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-base font-medium px-2 py-2 rounded-md transition-colors duration-200 ${
                  location === link.path
                    ? "text-[#7B0323] bg-wine-50"
                    : "text-gray-800 hover:text-[#7B0323] hover:bg-wine-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
