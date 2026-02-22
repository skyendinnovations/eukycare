"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "@/components/MotionDiv";
import MotionSection from "@/components/MotionSection";

// Services data for tiles
const services = [
  { name: "Accommodation", href: "/services/accommodation-tenancy", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>), description: "Support for finding and maintaining safe, accessible housing." },
  { name: "Support Coordination", href: "/services/support-coordination", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>), description: "Expert help to manage and maximise your NDIS plan." },
  { name: "Assist Personal Activities", href: "/services/assist-personal-activities", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>), description: "Hands-on assistance with daily personal tasks." },
  { name: "Assist Travel", href: "/services/assist-travel-transportation", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>), description: "Transport support for appointments and community access." },
  { name: "Community Nursing", href: "/services/community-nursing", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>), description: "Professional in-home nursing care by certified nurses." },
  { name: "Exercise Physiology", href: "/services/exercise-physiology", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>), description: "Customised exercise programs for health and wellbeing." },
  { name: "Household Tasks", href: "/services/household-tasks", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>), description: "Support with cleaning, cooking, and home maintenance." },
  { name: "Personal Activities High", href: "/services/personal-activities-high", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>), description: "High-intensity support for complex personal care needs." },
  { name: "Community Participation", href: "/services/community-participation", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>), description: "Support to engage in community events and social activities." },
  { name: "Development Life Skills", href: "/services/development-life-skills", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>), description: "Training to build independence and everyday living skills." },
  { name: "Group/Centre Activities", href: "/services/group-centre-activities", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>), description: "Social and recreational activities in a supportive group." },
  { name: "Interpreting & Translation", href: "/services/interpreting-translation", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>), description: "Language support for clear communication." },
];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
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

      {/* ===== HERO SECTION ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-purple-50 via-white to-green-50/30 overflow-hidden"
      >
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-eukyPurple/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-eukyGreen/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-10 sm:py-14 md:py-16 lg:py-0 lg:min-h-[calc(100vh-7.25rem)]">

            {/* Text Content — order 1 on all screens */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 text-center lg:text-left"
            >
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-semibold rounded-full text-xs sm:text-sm mb-4 sm:mb-5">
                <span className="w-2 h-2 bg-eukyPurple rounded-full mr-2 animate-pulse"></span>
                NDIS Registered Provider — South Australia
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-4 sm:mb-5">
                Your <span className="text-eukyPurple">NDIS Support</span>,<br />
                Your <span className="relative inline-block">
                  Way
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 80 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6 Q40 2 78 6" stroke="#88BF45" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-4 max-w-lg mx-auto lg:mx-0">
                At Euky Care, we deliver personalised, reliable, and compassionate support
                tailored to your unique goals — empowering you to live independently,
                build confidence, and achieve meaningful outcomes.
              </p>
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-eukyPurple/20 to-transparent"></div>
                <p className="text-sm sm:text-base font-bold text-eukyPurple px-2 whitespace-nowrap">
                  Your goals. Your choice. Your care.
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-eukyPurple/20 to-transparent"></div>
              </div>
              {/* Stats row */}
              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-5 sm:mb-6">
                {[
                  { value: "100%", label: "NDIS Registered" },
                  { value: "24/7", label: "Support Available" },
                  { value: "SA", label: "South Australia" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-eukyPurple">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Desktop CTA Buttons — inside text column */}
              <div className="hidden lg:flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-eukyPurple text-white font-semibold text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-eukyPurple text-eukyPurple font-semibold text-base rounded-full hover:bg-eukyPurple/5 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </MotionDiv>

            {/* Images — order 2 on mobile, order 2 on desktop (right side) */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="order-2"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <MotionDiv
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                  className="col-span-1"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-2 ring-white">
                    <div className="relative w-full h-full">
                      <Image src="/resources/hero_section/image1.jpg" alt="NDIS Support Services" fill className="object-cover" />
                    </div>
                  </div>
                </MotionDiv>
                <MotionDiv
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5, type: "tween" }}
                  className="col-span-1 mt-4"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-2 ring-white">
                    <div className="relative w-full h-full">
                      <Image src="/resources/hero_section/top_right.jpg" alt="Community Participation" fill className="object-cover" />
                    </div>
                  </div>
                </MotionDiv>
                <MotionDiv
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8, type: "tween" }}
                  className="col-span-1"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-2 ring-white">
                    <div className="relative w-full h-full">
                      <Image src="/resources/hero_section/image3.jpg" alt="Daily Living Support" fill className="object-cover" />
                    </div>
                  </div>
                </MotionDiv>
                <MotionDiv
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.0, type: "tween" }}
                  className="col-span-1 -mt-4"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-2 ring-white">
                    <div className="relative w-full h-full">
                      <Image src="/resources/hero_section/image2.jpg" alt="Disability Support" fill className="object-cover" />
                    </div>
                  </div>
                </MotionDiv>
              </div>
              {/* NDIS Badge */}
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-3 hidden lg:block"
              >
                <div className="relative w-28 h-auto hover:scale-110 transition-transform cursor-default">
                  <Image src="/resources/I-love-ndis_logo.png" alt="I Love NDIS" width={112} height={56} className="object-contain drop-shadow-lg" />
                </div>
              </MotionDiv>
            </MotionDiv>

            {/* CTA Buttons — order 3 on mobile (below images) */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="order-3 lg:hidden"
            >
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-eukyPurple text-white font-semibold text-sm rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border-2 border-eukyPurple text-eukyPurple font-semibold text-sm rounded-full hover:bg-eukyPurple/5 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </MotionDiv>

          </div>
        </div>
      </MotionSection>

      {/* ===== ABOUT US SECTION ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
                About Euky Care
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                More Than Care — A Trusted <span className="text-eukyPurple">NDIS Partner</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
                At Euky Care, we believe disability support should do more than meet basic needs — it
                should unlock potential, restore confidence, and create real opportunities for
                independence. As a registered NDIS provider in South Australia, our purpose is simple:
                to deliver high-quality, personalised NDIS services that empower participants to live life on
                their own terms.
              </p>
              <p className="text-slate-700 font-semibold text-sm sm:text-base mb-6">
                We are not just another NDIS service provider — we are partners in progress.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-eukyPurple text-white font-semibold text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Learn More About Us
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MotionDiv>

            {/* Right - Values Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { title: "Compassion", description: "We approach every interaction with empathy and genuine care.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>), color: "bg-eukyPurple" },
                { title: "Integrity", description: "Honest, transparent, and ethical in everything we do.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>), color: "bg-eukyGreen" },
                { title: "Empowerment", description: "Supporting your choices and helping you achieve your goals.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>), color: "bg-eukyGreen" },
                { title: "Inclusion", description: "Everyone is valued, respected, and included in our community.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>), color: "bg-eukyPurple" },
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
                  <p className="text-slate-600 text-xs leading-relaxed">{value.description}</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ===== OUR SERVICES SECTION ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-gradient-to-br from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10"
          >
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Our <span className="text-eukyPurple">Services</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive disability support services tailored to help you achieve your goals and live life on your terms.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {services.map((service, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Link
                  href={service.href}
                  className="block bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:border-eukyPurple/20 transition-all duration-300 h-full group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eukyPurple/10 text-eukyPurple rounded-xl flex items-center justify-center mb-3">{service.icon}</div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 group-hover:text-eukyPurple transition-colors">{service.name}</h3>
                  <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">{service.description}</p>
                </Link>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8"
          >
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-eukyPurple text-white font-semibold text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Services
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* ===== WHY CHOOSE EUKY CARE SECTION ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left - Content */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
                Why Euky Care
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose <span className="text-eukyPurple">Euky Care</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                At Euky Care, we deliver personalised, reliable, and compassionate support
                tailored to your unique goals. As a registered NDIS provider, we focus on
                empowering you to live independently, build confidence, and achieve
                meaningful outcomes — with a team you can trust every step of the way.
              </p>
              <p className="text-lg sm:text-xl font-bold text-eukyPurple">
                Your goals. Your choice. Your care.
              </p>
            </MotionDiv>

            {/* Right - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Registered NDIS Provider",
                  description: "Fully registered and compliant with all NDIS quality and safety standards.",
                  color: "bg-eukyPurple/5 border-eukyPurple/20",
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Qualified Support Workers",
                  description: "Trained professionals who bring genuine care and empathy to every interaction.",
                  color: "bg-eukyGreen/5 border-eukyGreen/20",
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  title: "Person-Centred Approach",
                  description: "Every service is designed around your unique goals and lifestyle needs.",
                  color: "bg-eukyPurple/5 border-eukyPurple/20",
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Flexible & Responsive",
                  description: "We adapt our support to suit your schedule, when you need it most.",
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
                  className={`${feature.color} border rounded-xl sm:rounded-2xl p-5 sm:p-6 cursor-pointer transition-shadow hover:shadow-lg`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ===== HOW IT WORKS ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden"
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
            className="text-center mb-8 sm:mb-10"
          >
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
              Getting Started
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              How It <span className="text-eukyPurple">Works</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Getting started with Euky Care is simple. We guide you through every step to ensure
              you receive the right support, tailored to your needs.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
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
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-eukyPurple/50 uppercase tracking-wider">Step {item.step}</span>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </MotionDiv>
            ))}
          </div>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-8"
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

      {/* ===== TESTIMONIALS SECTION ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 sm:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-slate-900 mb-3 lg:mb-0">
              Real Experiences,<br />
              Real Impact
            </h2>
            <p className="text-slate-600 max-w-md text-xs sm:text-sm">
              Hear directly from the people we support. Our participants share their experiences with our personalised
              NDIS services and how our team has helped them live with confidence, independence, and peace of mind.
            </p>
          </MotionDiv>

          <div className="relative px-8 sm:px-10 lg:px-0">
            <button
              onClick={prevSlide}
              className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all border border-slate-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-12 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all border border-slate-200"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div className="relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <MotionDiv
                    key={currentSlide}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                      {[0, 1, 2].map((offset) => {
                        const index = (currentSlide + offset) % testimonials.length;
                        const testimonial = testimonials[index];
                        return (
                          <div
                            key={index}
                            className={`bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm ${
                              offset > 0 ? 'hidden md:block' : ''
                            }`}
                          >
                            <p className="text-slate-700 text-sm leading-relaxed mb-5">
                              &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-eukyPurple/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              </div>
                              <div>
                                <p className="text-slate-900 font-medium text-sm">{testimonial.name}</p>
                                <p className="text-slate-500 text-xs">{testimonial.role}</p>
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
                  index === currentSlide ? 'bg-eukyPurple w-8' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* ===== CTA BANNER ===== */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-10 sm:py-14 md:py-18 bg-gradient-to-r from-eukyPurple via-[#534371] to-eukyPurple relative overflow-hidden"
      >
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Take the First Step Towards<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Better Support
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base mb-6 leading-relaxed">
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

      {/* ===== CONTACT SECTION ===== */}
      <section className="bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading text-white text-center mb-8">
            Let&apos;s Connect & Support You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Come Visit Us</h3>
              <p className="text-white/70 text-xs sm:text-sm">52 Nilpena Avenue<br />Park Holme, SA 5043</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Call Us Anytime</h3>
              <a href="tel:0870017600" className="text-white/70 text-xs sm:text-sm hover:text-eukyGreen transition-colors">0870017600</a>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1 text-sm sm:text-base">Enquire Now</h3>
              <a href="mailto:info@eukycare.com.au" className="text-white/70 text-xs sm:text-sm hover:text-eukyGreen transition-colors">info@eukycare.com.au</a>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 py-8 sm:py-10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-2">Send Us a Message</h3>
              <p className="text-slate-600 text-xs sm:text-sm text-center mb-4 sm:mb-6">
                Fill out the form below, and our team will get back to you promptly with the guidance or
                information you need.
              </p>
              <form className="space-y-3 sm:space-y-4">
                <input type="text" placeholder="Full Name *" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm" />
                <input type="tel" placeholder="Phone Number" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm" />
                <input type="email" placeholder="Email Address" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm" />
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm text-slate-500">
                  <option value="">Select the Service</option>
                  <option>Accommodation</option>
                  <option>Support Coordination</option>
                  <option>Assist Personal Activities</option>
                  <option>Assist Travel</option>
                  <option>Community Nursing</option>
                  <option>Exercise Physiology</option>
                  <option>Household Tasks</option>
                  <option>Personal Activities High</option>
                  <option>Community Participation</option>
                  <option>Development Life Skills</option>
                  <option>Group/Centre Activities</option>
                  <option>Interpreting &amp; Translation</option>
                </select>
                <textarea placeholder="Comment" rows={4} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-eukyPurple/20 focus:border-eukyPurple text-sm resize-none"></textarea>
                <button type="submit" className="w-full py-2.5 sm:py-3 bg-eukyPurple text-white font-medium rounded-lg sm:rounded-xl hover:bg-eukyPurple/90 transition-colors text-sm sm:text-base">
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
