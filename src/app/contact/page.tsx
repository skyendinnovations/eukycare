"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.inquiryType,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: "General Inquiries",
      phone: "1300 000 000",
      email: "info@eukycare.com.au",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Referrals",
      phone: "1300 000 001",
      email: "referrals@eukycare.com.au",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Careers",
      phone: "1300 000 002",
      email: "careers@eukycare.com.au",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  if (isSubmitted) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-eukyGreen rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Message Sent!</h1>
          <p className="text-slate-600 mb-8">
            Thank you for contacting us. Our team will get back to you within 24-48 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-eukyPurple text-white font-medium rounded-full hover:bg-eukyPurple/90 transition-all"
          >
            Return Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-eukyPurple/10 text-eukyPurple rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have a question or need support? We&apos;re here to help. Reach out to our friendly team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-eukyPurple/10 text-eukyPurple rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {info.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{info.title}</h3>
                <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="block text-eukyPurple text-sm sm:text-base font-medium hover:underline mb-1">
                  {info.phone}
                </a>
                <a href={`mailto:${info.email}`} className="block text-slate-600 text-xs sm:text-sm hover:text-eukyPurple transition-colors break-all">
                  {info.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Inquiry Type *</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="general">General Inquiry</option>
                      <option value="services">Services Information</option>
                      <option value="referral">Referral Query</option>
                      <option value="feedback">Feedback</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-eukyPurple focus:ring-2 focus:ring-eukyPurple/20 outline-none transition-all text-sm resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {submitError && (
                  <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {submitError}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Info & Hours */}
            <div className="space-y-6">
              {/* Head Office */}
              <div className="bg-eukyPurple rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Head Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Level 5, 123 Collins Street</p>
                      <p className="text-white/70">Melbourne VIC 3000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>1300 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">info@eukycare.com.au</span>
                  </div>
                </div>
                <Link
                  href="/referrals"
                  className="inline-flex items-center mt-4 text-eukyGreen font-medium text-sm hover:underline"
                >
                  Make a referral
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.day}</span>
                      <span className="font-medium text-slate-900">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-eukyGreen text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">24/7 Support Services Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-eukyGreen/10 rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/referrals" className="flex items-center text-sm text-slate-600 hover:text-eukyPurple transition-colors">
                    <svg className="w-4 h-4 mr-2 text-eukyGreen flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Make a Referral
                  </Link>
                  <Link href="/services" className="flex items-center text-sm text-slate-600 hover:text-eukyPurple transition-colors">
                    <svg className="w-4 h-4 mr-2 text-eukyGreen flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Our Services
                  </Link>
                  <Link href="/faq" className="flex items-center text-sm text-slate-600 hover:text-eukyPurple transition-colors">
                    <svg className="w-4 h-4 mr-2 text-eukyGreen flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    NDIS FAQ
                  </Link>
                  <Link href="/about" className="flex items-center text-sm text-slate-600 hover:text-eukyPurple transition-colors">
                    <svg className="w-4 h-4 mr-2 text-eukyGreen flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Emergency */}
      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Social Media */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Connect With Us</h3>
              <div className="flex justify-center sm:justify-start gap-3">
                {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-eukyPurple hover:text-white transition-all"
                    aria-label={platform}
                  >
                    {platform === "Facebook" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {platform === "Instagram" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {platform === "LinkedIn" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-xl p-4 sm:p-5">
              <h3 className="text-base font-bold text-red-800 mb-2">Emergency Contact</h3>
              <p className="text-sm text-red-700 mb-2">
                For emergencies, please call <strong>000</strong>.
              </p>
              <p className="text-xs text-red-600">
                For urgent participant support outside business hours, call our after-hours line.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
