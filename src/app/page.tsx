"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "@/components/MotionDiv";
import MotionSection from "@/components/MotionSection";

// Testimonials data
const testimonials = [
  {
    quote: "The team has been incredible! They really understand my needs and provide support that makes daily life so much easier. I feel more independent and confident than ever.",
    name: "Sarah L",
    role: "Participant",
  },
  {
    quote: "The team truly understands my needs. Their personalised support makes daily tasks easier and gives me confidence to participate more in my community. I feel valued, supported, and motivated to achieve my goals every day.",
    name: "James K",
    role: "Participant",
  },
  {
    quote: "They guided me through the NDIS process and provided support tailored to my goals. I feel empowered, independent, and in control of my daily life. Their professionalism, care, and friendly approach make a real difference in my everyday routine.",
    name: "Priya M",
    role: "Participant",
  },
  {
    quote: "I couldn't be happier with the care and attention I receive. The support workers are friendly, professional, and always go the extra mile to ensure I'm comfortable and engaged in my community.",
    name: "Michael T",
    role: "Participant",
  },
  {
    quote: "From day one, the team made me feel heard and respected. Their person-centered approach has helped me achieve goals I never thought possible. I'm living a fuller, more independent life.",
    name: "Emma W",
    role: "Participant",
  },
];

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Euky Care",
  description: "NDIS Registered Provider offering quality disability support services",
  url: "https://eukycare.com.au",
  logo: "https://eukycare.com.au/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+61-3-9123-4567",
    contactType: "customer service",
  },
  sameAs: [
    "https://facebook.com/eukycare",
    "https://instagram.com/eukycare",
    "https://linkedin.com/company/eukycare",
  ],
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <MotionSection 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden"
      >
        {/* Decorative purple wave bottom left */}
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-tl-[60px] sm:rounded-tl-[80px] md:rounded-tl-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-eukyPurple mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
              Connecting You to<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>the Support You Need
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto mb-5 sm:mb-6 md:mb-8 px-4">
              Experience personalized support built around your lifestyle and aspirations.
            </p>
            <Link
              href="/referrals"
              className="inline-flex items-center px-6 py-2.5 sm:px-8 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MotionDiv>

          {/* Bento-box Image Grid */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16"
          >
            {/* Bento Box Grid Layout */}
            <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-[1400px] mx-auto">
              {/* Left Column */}
              <div className="col-span-4 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                {/* Rectangle 1 - Top Left (Family photo) */}
                <MotionDiv
                  initial={{ opacity: 0, x: -30, rotate: -2 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -8, 0],
                    rotate: [-2, 0, -2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.5 },
                    x: { duration: 0.6, delay: 0.5 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", type: "tween" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", type: "tween" }
                  }}
                  className="relative group"
                >
                  <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white p-1 sm:p-2">
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/resources/hero_section/top_left.jpg"
                        alt="NDIS Support Services"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MotionDiv>

                {/* Rectangle 5 - Bottom Left (Child eating) */}
                <MotionDiv
                  initial={{ opacity: 0, x: -30, rotate: 2 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -6, 0],
                    rotate: [2, 0, 2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.7 },
                    x: { duration: 0.6, delay: 0.7 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5, type: "tween" },
                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5, type: "tween" }
                  }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white p-1 sm:p-2">
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/resources/hero_section/bottom_left.jpg"
                        alt="Daily Living Support"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MotionDiv>
              </div>

              {/* Center Column - Large Image */}
              <div className="col-span-4">
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.6 },
                    scale: { duration: 0.6, delay: 0.6 },
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1, type: "tween" }
                  }}
                  className="relative group h-full"
                >
                  <div className="h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white p-1 sm:p-2">
                    <div className="relative w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[480px] rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/resources/hero_section/center_image.jpg"
                        alt="NDIS Care and Support"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MotionDiv>
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                {/* Rectangle 2 - Top Right (Support worker) */}
                <MotionDiv
                  initial={{ opacity: 0, x: 30, rotate: 2 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -6, 0],
                    rotate: [2, 0, 2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.7 },
                    x: { duration: 0.6, delay: 0.7 },
                    y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3, type: "tween" },
                    rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3, type: "tween" }
                  }}
                  className="relative group"
                >
                  <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white p-1 sm:p-2">
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/resources/hero_section/top_right.jpg"
                        alt="Community Participation"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MotionDiv>

                {/* Rectangle 4 - Bottom Right (Child in garden) */}
                <MotionDiv
                  initial={{ opacity: 0, x: 30, rotate: -2 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -7, 0],
                    rotate: [-2, 0, -2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.9 },
                    x: { duration: 0.6, delay: 0.9 },
                    y: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8, type: "tween" },
                    rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8, type: "tween" }
                  }}
                  className="relative group"
                >
                  <div className="aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white p-1 sm:p-2">
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                      <Image
                        src="/resources/hero_section/bottom_right.jpg"
                        alt="Disability Support"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </MotionDiv>
              </div>
            </div>

            {/* NDIS Badge - Bottom Left */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute -bottom-4 sm:-bottom-6 left-2 sm:left-4 md:left-8 z-20"
            >
              <div className="bg-eukyPurple rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-xl flex items-center gap-1 sm:gap-2 hover:scale-110 transition-transform">
                <span className="text-white font-medium text-xs sm:text-sm">We</span>
                <span className="text-red-500 text-xs sm:text-base">❤️</span>
                <span className="text-white font-bold text-xs sm:text-sm">ndis</span>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Your Path to Better Everyday Living */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                Your Path to Better<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Everyday Living
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg">
                We are a passionate team of NDIS professionals
                focused on delivering reliable, high-quality
                support services. Our mission is to understand
                your needs, provide the right care, and help you
                achieve the goals that matter most to you.
              </p>
            </MotionDiv>

            {/* Right - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {/* Trusted NDIS Provider */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-eukyPurple rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-7 text-white shadow-lg hover:shadow-2xl min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-2 sm:mb-2.5">Trusted NDIS<br className="hidden sm:block" /><span className="sm:hidden"> </span>Provider</h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/90 leading-relaxed">
                  We are a reliable and fully registered NDIS provider committed to delivering high-quality, safe, and transparent support services you can trust.
                </p>
              </MotionDiv>

              {/* Qualified Support Workers */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-[#534371] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-7 text-white shadow-lg hover:shadow-2xl min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-2 sm:mb-2.5">Qualified<br className="hidden sm:block" /><span className="sm:hidden"> </span>Support Workers</h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/90 leading-relaxed">
                  Our team consists of trained and experienced support workers who bring professionalism and genuine care to every participant interaction.
                </p>
              </MotionDiv>

              {/* Participant Focused Care */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-eukyGreen rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-7 text-white shadow-lg hover:shadow-2xl min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] flex flex-col cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg mb-2 sm:mb-2.5">Participant<br className="hidden sm:block" /><span className="sm:hidden"> </span>Focussed Care</h3>
                <p className="text-[11px] sm:text-xs lg:text-sm text-white/90 leading-relaxed">
                  We design every service around your goals, preferences, and lifestyle—ensuring you receive support that truly reflects your individual needs.
                </p>
              </MotionDiv>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Explore the Services You Need */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
                Explore the <span className="text-eukyPurple">Services</span> You Need
              </h2>
              <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                We deliver personalised support tailored to your goals, lifestyle, and
                needs, helping you live the life you want with greater confidence,
                independence, and ease.
              </p>

              {/* Service Links */}
              <div className="space-y-0">
                <Link href="/services/community-involvement" className="flex items-center justify-between py-3 sm:py-4 border-b border-slate-200 group">
                  <span className="text-base sm:text-lg font-semibold text-eukyPurple group-hover:text-eukyPurple/80">Community Supports</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyPurple group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services/support-services" className="flex items-center justify-between py-3 sm:py-4 border-b border-slate-200 group">
                  <span className="text-base sm:text-lg font-medium text-slate-900 group-hover:text-eukyPurple transition-colors">Daily Living</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-eukyPurple group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services/support-services" className="flex items-center justify-between py-3 sm:py-4 border-b border-slate-200 group">
                  <span className="text-base sm:text-lg font-medium text-slate-900 group-hover:text-eukyPurple transition-colors">Transport Assistance</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-eukyPurple group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </MotionDiv>

            {/* Right - Images */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <MotionDiv
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/3] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="relative w-full h-full">
                      <Image
                        src="/resources/Rectangle%2011.png"
                        alt="Community Support Services"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </MotionDiv>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pr-2 sm:pr-4">
                    Helping you stay connected through community activities, social outings,
                    skill-building programs, and confidence-boosting experiences.
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8">
                  <MotionDiv
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/3] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="relative w-full h-full">
                      <Image
                        src="/resources/Rectangle%2012.png"
                        alt="Daily Living Support"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </MotionDiv>
                  <Link
                    href="/services"
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-eukyGreen text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-eukyGreen/90 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Explore Our Services
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>

      {/* Empowering Your Journey */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden"
      >
        {/* Background curved accents */}
        <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <circle cx="0" cy="100" r="150" stroke="#88BF45" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <circle cx="200" cy="100" r="150" stroke="#6A2875" strokeWidth="2" fill="none"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-900 mb-3 sm:mb-4">
              Empowering Your Journey with<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Personalised Support
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
              We provide personalised NDIS support designed around your goals, lifestyle, and needs. From daily
              living to community participation, our services empower you to live with confidence,
              independence, and ease.
            </p>
          </div>

          {/* Steps with central image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Left steps */}
              <div className="space-y-6 md:space-y-8 order-2 md:order-1">
                {/* Connect With Us */}
                <MotionDiv
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-eukyPurple/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative">
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-eukyPurple rounded-full hidden lg:block"></div>
                  <div className="w-10 h-10 bg-eukyPurple/20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Connect With Us</h3>
                  <p className="text-sm text-slate-600">
                    Reach out via phone, email, or our online form. We'll discuss your needs and answer any questions about NDIS eligibility and support options.
                  </p>
                </MotionDiv>

                {/* Start Support */}
                <MotionDiv
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-eukyGreen/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative">
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-eukyGreen rounded-full hidden lg:block"></div>
                  <div className="w-10 h-10 bg-eukyGreen/20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Start Support</h3>
                  <p className="text-sm text-slate-600">
                    Once your plan is finalised, we provide the right services and ongoing guidance, empowering you to live independently and confidently.
                  </p>
                </MotionDiv>
              </div>

              {/* Center image */}
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
                className="relative order-1 md:order-2 flex justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-full md:h-auto md:aspect-square">
                  <MotionDiv
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      type: "tween"
                    }}
                    className="absolute inset-0 border-2 border-eukyPurple/20 rounded-full scale-110"
                  />
                  <MotionDiv
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      type: "tween"
                    }}
                    className="w-full h-full bg-slate-200 rounded-full overflow-hidden relative z-10"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl md:text-8xl">😊</span>
                    </div>
                  </MotionDiv>
                  {/* NDIS Badge */}
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:right-0 z-20"
                  >
                    <div className="bg-white rounded-full px-2 py-1 sm:px-3 sm:py-1.5 shadow-lg border border-slate-100 flex items-center gap-1">
                      <span className="text-slate-600 text-[10px] sm:text-xs">I</span>
                      <span className="text-red-500 text-[10px] sm:text-xs">❤️</span>
                      <span className="text-eukyPurple font-bold text-[10px] sm:text-xs">ndis</span>
                    </div>
                  </MotionDiv>
                </div>
              </MotionDiv>

              {/* Right step */}
              <div className="order-3 md:order-3">
                <MotionDiv
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm relative">
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-eukyPurple rounded-full hidden lg:block"></div>
                  <div className="w-10 h-10 bg-eukyPurple/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Plan & Personalise</h3>
                  <p className="text-sm text-slate-600">
                    Our team works with you to create a tailored support plan that aligns with your goals, lifestyle, and aspirations.
                  </p>
                </MotionDiv>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Testimonials Section */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-eukyPurple"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white mb-3 sm:mb-4 lg:mb-0">
              Real Experiences,<br />
              Real Impact
            </h2>
            <p className="text-white/70 max-w-md text-xs sm:text-sm">
              Hear directly from the people we support. Our participants share their experiences with our personalised
              NDIS services and how our team has helped them live with confidence, independence, and peace of mind.
            </p>
          </MotionDiv>

          {/* Testimonial Slider */}
          <div className="relative px-8 sm:px-10 lg:px-0">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Container */}
            <div className="overflow-hidden">
              <div className="relative min-h-[300px] md:min-h-[250px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <MotionDiv
                    key={currentSlide}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Show current testimonial and next 2 on desktop, only current on mobile */}
                      {[0, 1, 2].map((offset) => {
                        const index = (currentSlide + offset) % testimonials.length;
                        const testimonial = testimonials[index];
                        return (
                          <div
                            key={index}
                            className={`bg-eukyPurple/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 ${
                              offset > 0 ? 'hidden md:block' : ''
                            }`}
                          >
                            <p className="text-white/90 text-sm leading-relaxed mb-6">
                              "{testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-lg">👤</span>
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{testimonial.name}</p>
                                <p className="text-white/60 text-xs">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </MotionDiv>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-2 mt-8"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* FAQ Section */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-eukyPurple/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-900 mb-3 sm:mb-4">
              Frequently<br />
              Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Have questions? We've got answers. Explore our frequently asked questions to learn more
              about our NDIS services, eligibility, and how we can support you every step of the way.
            </p>
          </MotionDiv>

          {/* FAQ Accordions */}
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: "What is the NDIS and who is eligible?",
                answer: "The National Disability Insurance Scheme (NDIS) provides support to people with permanent and significant disabilities. To be eligible, you must be under 65, an Australian citizen or permanent resident, and have a disability that impacts your daily life and ability to participate fully in the community.",
                defaultOpen: true,
              },
              {
                question: "How do I apply for NDIS support?",
                answer: "You can apply for NDIS support by contacting the NDIA directly or through a Local Area Coordinator. You'll need to provide evidence of your disability and how it affects your daily life.",
              },
              {
                question: "What types of services do you provide?",
                answer: "We provide a range of NDIS services including daily living support, community participation, transport assistance, accommodation support, and more.",
              },
              {
                question: "How is a personalised support plan created?",
                answer: "Our team works closely with you to understand your goals, needs, and preferences. We then create a tailored support plan that aligns with your NDIS funding and helps you achieve your objectives.",
              },
            ].map((faq, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <details
                  className="group bg-eukyPurple/20 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-eukyPurple/30 transition-colors"
                  open={faq.defaultOpen}
                >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer">
                  <h3 className="font-medium text-slate-900 pr-4 text-sm sm:text-base">{faq.question}</h3>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-eukyPurple rounded-full flex items-center justify-center flex-shrink-0 group-open:bg-eukyPurple">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transform group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </details>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Contact Section */}
      <section className="bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white text-center mb-8 sm:mb-10">
            Let's Connect & Support You
          </h2>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Come Visit Us</h3>
              <p className="text-white/70 text-xs sm:text-sm">
                123 Collins Street<br />
                Melbourne VIC 3000<br />
                Australia
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Call Us Anytime</h3>
              <p className="text-white/70 text-xs sm:text-sm">+61 3 9123 4567</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Enquire Now</h3>
              <p className="text-white/70 text-xs sm:text-sm">jane.smith@example.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-100 py-8 sm:py-10 md:py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-2">Send Us Message</h3>
              <p className="text-slate-600 text-xs sm:text-sm text-center mb-4 sm:mb-6">
                Fill out the form below, and our team will get back to you promptly with the guidance or
                information you need.
              </p>
              <form className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm"
                />
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm text-slate-500">
                  <option>Select the Service</option>
                  <option>Community Supports</option>
                  <option>Daily Living</option>
                  <option>Transport Assistance</option>
                  <option>Accommodation</option>
                </select>
                <textarea
                  placeholder="Comment"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 bg-eukyPurple text-white font-medium rounded-lg sm:rounded-xl hover:bg-eukyPurple/90 transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
