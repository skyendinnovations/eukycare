"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Services dropdown organized by category matching the mega-menu
const serviceCategories = [
  {
    title: "Accommodation",
    items: [
      { name: "Accommodation/Tenancy", href: "/services/accommodation-tenancy" },
    ],
  },
  {
    title: "Support Services",
    items: [
      { name: "Support Coordination", href: "/services/support-coordination" },
      { name: "Assist Personal Activities Australia", href: "/services/assist-personal-activities" },
      { name: "Assist Travel/Transportation", href: "/services/assist-travel-transportation" },
      { name: "Community Nursing Services Melbourne", href: "/services/community-nursing" },
      { name: "Ex Phy & Pers Training", href: "/services/exercise-physiology" },
      { name: "Household Tasks", href: "/services/household-tasks" },
      { name: "Personal Activities High", href: "/services/personal-activities-high" },
    ],
  },
  {
    title: "Community Involvement",
    items: [
      { name: "Community Participation Activities NDIS", href: "/services/community-participation" },
      { name: "Development Life Skills", href: "/services/development-life-skills" },
      { name: "Group/Centre Activities", href: "/services/group-centre-activities" },
      { name: "Interpreting & Translation", href: "/services/interpreting-translation" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "NDIS" },
  ];

  const rightNavLinks = [
    { href: "/referrals", label: "Referrals" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src="/resources/brand_logo.png"
                alt="Euky Care"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-eukyPurple transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Mega Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center text-slate-700 hover:text-eukyPurple transition-colors text-sm font-medium"
              >
                Services
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Dropdown Menu */}
              {isServicesOpen && (
                <div
                  className="absolute top-full right-0 xl:left-1/2 xl:-translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-5 px-6 z-50 w-[calc(100vw-2rem)] sm:w-[620px] lg:w-[720px]"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {serviceCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="text-sm font-bold text-eukyPurple mb-3 border-b border-slate-100 pb-2">
                          {category.title}
                        </h3>
                        <ul className="space-y-1.5">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block text-sm text-slate-700 hover:text-eukyPurple hover:bg-purple-50 rounded-md px-2 py-1.5 transition-colors"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                    <Link
                      href="/services"
                      className="text-sm font-semibold text-eukyPurple hover:underline"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-eukyPurple transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="bg-eukyGreen text-white px-5 py-2 rounded-full hover:bg-eukyGreen/90 transition-colors text-sm font-medium inline-flex items-center"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-slate-700 hover:text-eukyPurple hover:bg-slate-50 rounded-lg text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Services Accordion */}
            <div className="px-4">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full py-2.5 text-slate-700 hover:text-eukyPurple text-sm font-medium"
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileServicesOpen && (
                <div className="pl-2 pb-2 space-y-3">
                  <Link
                    href="/services"
                    className="block py-1.5 text-sm text-eukyPurple font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Services
                  </Link>
                  {serviceCategories.map((category) => (
                    <div key={category.title}>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {category.title}
                      </h4>
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-1.5 text-sm text-slate-600 hover:text-eukyPurple pl-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-slate-700 hover:text-eukyPurple hover:bg-slate-50 rounded-lg text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="block mx-4 mt-4 bg-eukyGreen text-white px-6 py-2.5 rounded-full hover:bg-eukyGreen/90 transition-colors text-center text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
