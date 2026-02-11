"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubscribeMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setSubscribeMessage({ type: 'success', text: 'Successfully subscribed!' });
        setEmail("");
      } else {
        setSubscribeMessage({ type: 'error', text: result.error || 'Failed to subscribe' });
      }
    } catch {
      setSubscribeMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/resources/brand_logo.png"
                  alt="Euky Care"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-slate-900">Euky Care</span>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed max-w-xs">
              We are committed to providing high-quality, person-centered support services for NDIS participants across
              Australia. Our goal is to empower individuals to achieve their
              goals and live with independence, dignity, and choice.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-eukyPurple hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-eukyPurple hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-eukyPurple hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-eukyPurple hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/community-participation"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Community Supports
                </Link>
              </li>
              <li>
                <Link
                  href="/services/assist-personal-activities"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Daily Living
                </Link>
              </li>
              <li>
                <Link
                  href="/services/assist-travel-transportation"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Transport Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/accommodation-tenancy"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Accommodation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about#team"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 hover:text-eukyPurple transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Get in Touch</h3>
            <Link
              href="/referrals"
              className="inline-flex items-center px-6 py-3 bg-eukyGreen text-white text-sm font-medium rounded-full hover:bg-eukyGreen/90 transition-all duration-300 hover:shadow-lg mb-6"
            >
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Newsletter Subscription */}
            <div className="mt-4">
              <h4 className="font-medium text-slate-700 text-sm mb-2">Subscribe to Updates</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-eukyPurple focus:ring-1 focus:ring-eukyPurple/20"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-eukyPurple text-white text-sm font-medium rounded-lg hover:bg-eukyPurple/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? '...' : 'Join'}
                  </button>
                </div>
                {subscribeMessage && (
                  <p className={`text-xs ${subscribeMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {subscribeMessage.text}
                  </p>
                )}
              </form>
            </div>

            {/* NDIS Badge */}
            <div className="flex items-center gap-2 mt-6">
              <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-slate-200">
                <div className="flex items-center gap-1">
                  <span className="text-slate-600 text-sm">I</span>
                  <span className="text-red-500 text-sm">❤️</span>
                  <span className="text-eukyPurple font-bold text-sm">ndis</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">REGISTERED<br/>NDIS<br/>PROVIDER</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <Link href="/terms" className="hover:text-eukyPurple transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-eukyPurple transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-eukyPurple transition-colors">
                Cookies Policy
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              {currentYear} NDIS All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
