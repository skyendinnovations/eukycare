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
    telephone: "0870017600",
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

      {/* Why Choose Euky Care */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10 md:mb-14"
          >
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
              Why Euky Care
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              Your Trusted <span className="text-eukyPurple">NDIS Partner</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
              We are a passionate team of NDIS professionals focused on delivering reliable, high-quality
              support services. Our mission is to understand your needs and help you achieve the goals that matter most.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Registered NDIS Provider",
                description: "Fully registered and compliant with all NDIS quality and safety standards, ensuring trustworthy support.",
                color: "bg-eukyPurple/5 border-eukyPurple/20",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Qualified Support Workers",
                description: "Trained and experienced professionals who bring genuine care and empathy to every interaction.",
                color: "bg-eukyGreen/5 border-eukyGreen/20",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                title: "Person-Centred Approach",
                description: "Every service is designed around your unique goals, preferences, and lifestyle needs.",
                color: "bg-eukyPurple/5 border-eukyPurple/20",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Flexible & Responsive",
                description: "We adapt our support to suit your schedule, ensuring services are available when you need them most.",
                color: "bg-eukyGreen/5 border-eukyGreen/20",
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`${feature.color} border rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 cursor-pointer transition-shadow hover:shadow-lg`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* How It Works */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
      >
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
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10 md:mb-14"
          >
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
              Getting Started
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              How It <span className="text-eukyPurple">Works</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Getting started with Euky Care is simple. We guide you through every step to ensure
              you receive the right support, tailored to your needs.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-eukyPurple via-eukyGreen to-eukyPurple opacity-20"></div>

            {[
              {
                step: "01",
                title: "Connect With Us",
                description: "Reach out via phone, email, or our online form. We'll discuss your needs and answer any questions about NDIS eligibility and support options.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                bgColor: "bg-eukyPurple",
              },
              {
                step: "02",
                title: "Plan & Personalise",
                description: "Our team works closely with you to create a tailored support plan that aligns with your goals, lifestyle, and aspirations.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                bgColor: "bg-eukyGreen",
              },
              {
                step: "03",
                title: "Start Your Support",
                description: "Once your plan is finalised, we provide the right services and ongoing guidance, empowering you to live independently and confidently.",
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                ),
                bgColor: "bg-eukyPurple",
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-eukyPurple/50 uppercase tracking-wider">Step {item.step}</span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-1 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-8 sm:mt-10"
          >
            <Link
              href="/referrals"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3.5 bg-eukyPurple text-white font-semibold text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Today
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MotionDiv>
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

              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3.5 bg-eukyPurple text-white font-semibold text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mt-2"
              >
                Explore Our Services
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
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

      {/* Our Values Section */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Left - Values Grid */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
                What Drives Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
                Built on <span className="text-eukyPurple">Values</span> That Matter
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                At Euky Care, our values guide every decision we make and every service we deliver.
                We believe that quality disability support begins with genuine compassion, trust, and respect.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-eukyPurple font-semibold text-sm sm:text-base hover:underline"
              >
                Learn more about us
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MotionDiv>

            {/* Right - Values Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  title: "Compassion",
                  description: "We approach every interaction with empathy and genuine care.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  color: "bg-eukyPurple",
                },
                {
                  title: "Integrity",
                  description: "Honest, transparent, and ethical in everything we do.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  color: "bg-eukyGreen",
                },
                {
                  title: "Empowerment",
                  description: "Supporting your choices and helping you achieve your goals.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  color: "bg-eukyGreen",
                },
                {
                  title: "Inclusion",
                  description: "Everyone is valued, respected, and included in our community.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  color: "bg-eukyPurple",
                },
              ].map((value, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 hover:shadow-md transition-all"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 ${value.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 text-white`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{value.title}</h3>
                  <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">{value.description}</p>
                </MotionDiv>
              ))}
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

      {/* CTA Banner */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-eukyPurple via-[#534371] to-eukyPurple relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-eukyGreen/5 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 text-white font-medium rounded-full text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
              Ready to Begin?
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Take the First Step Towards<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Better Support
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed px-2">
              Whether you&apos;re new to the NDIS or looking for a better provider, our team is here to help.
              Get in touch today and let us create a support plan that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/referrals"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-eukyGreen text-white font-semibold text-sm sm:text-base rounded-full hover:bg-eukyGreen/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Make a Referral
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:0870017600"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 text-white font-semibold text-sm sm:text-base rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 0870017600
              </a>
            </div>
          </MotionDiv>
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
                52 Nilpena Avenue<br />
                Park Holme, SA 5043
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Call Us Anytime</h3>
              <p className="text-white/70 text-xs sm:text-sm">0870017600</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Enquire Now</h3>
              <p className="text-white/70 text-xs sm:text-sm">info@eukycare.com.au</p>
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
