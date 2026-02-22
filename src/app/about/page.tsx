import Link from "next/link";

const values = [
  { title: "Respect", description: "We honour every participant's dignity, choices, and voice." },
  { title: "Compassion", description: "We lead with empathy and understanding." },
  { title: "Integrity", description: "We operate honestly, ethically, and transparently." },
  { title: "Empowerment", description: "We help participants develop skills and independence." },
  { title: "Excellence", description: "We continuously improve to deliver the highest standard of NDIS support in South Australia." },
];

const differentiators = [
  {
    title: "Personalised NDIS Support — Not One-Size-Fits-All",
    description: "Every participant's journey is unique. We create customised NDIS support plans designed around your goals, funding, and preferences. Our approach is flexible, responsive, and entirely participant-centred.",
  },
  {
    title: "The Right Support Worker Match",
    description: "We carefully match participants with qualified support workers who align with their personality, communication style, and cultural background where possible. We believe strong relationships lead to better outcomes and long-term stability.",
  },
  {
    title: "Quality, Safety & Accountability",
    description: "As a registered NDIS provider in South Australia, we adhere to strict NDIS Quality and Safeguards Commission standards. Our systems are built on transparency, professionalism, and continuous improvement — giving participants and families complete peace of mind.",
  },
  {
    title: "Focused on Real, Measurable Outcomes",
    description: "We don't just deliver disability services — we support progress. From building independence and confidence to increasing community engagement across South Australia, we are committed to helping participants achieve tangible, life-changing results.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
              About Euky Care
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
              About Euky Care
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto">
              At Euky Care, we believe disability support should do more than meet basic needs — it
              should unlock potential, restore confidence, and create real opportunities for
              independence. As a registered NDIS provider in South Australia, our purpose is simple:
              to deliver high-quality, personalised NDIS services that empower participants to live life on
              their own terms.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-eukyPurple mb-6 sm:mb-8">
              We are not just another NDIS service provider in South Australia. We are partners in progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-eukyPurple text-eukyPurple font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/5 transition-all duration-300">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How <span className="text-eukyPurple">EUKY Care</span> Began
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                EUKY Care was founded with a clear vision — to provide compassionate, reliable, and
                genuinely participant-focused NDIS support services across South Australia. Too often,
                participants feel like just another number in the system. We created EUKY Care to be
                different.
              </p>
              <p className="font-semibold text-slate-800">
                Here, every participant is known by name — not by plan number.
              </p>
              <p>
                We take the time to listen, understand individual NDIS goals, and design tailored supports
                that align with each person&apos;s lifestyle, culture, and aspirations. Whether it&apos;s assistance with
                daily living, community participation, supported independent living (SIL), or high-intensity
                care, our focus is always on delivering meaningful outcomes for participants throughout
                South Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
              What Sets Us Apart
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              What Makes EUKY Care <span className="text-eukyPurple">Different</span> in South Australia
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${index % 2 === 0 ? 'bg-eukyPurple/10 text-eukyPurple' : 'bg-eukyGreen/10 text-eukyGreen'} rounded-xl flex items-center justify-center mb-4`}>
                  <span className="text-lg sm:text-xl font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3">The Principles That Guide Us</h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">Our core values shape everything we do and how we deliver care</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {values.map((value) => (
              <div key={value.title} className="group bg-eukyPurple/40 backdrop-blur-sm hover:bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 border border-white/10 hover:scale-[1.03] hover:-translate-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyGreen/10 text-eukyGreen font-medium rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyGreen rounded-full mr-2"></span>
                Our Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Commitment to <span className="text-eukyPurple">Participants</span> in South Australia
              </h2>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Choosing an NDIS provider is an important decision. At Euky Care, we make the process
                simple, supportive, and stress-free. From your initial enquiry through to plan
                implementation and regular reviews, our team provides clear communication and
                consistent, reliable service.
              </p>
              <p>
                We collaborate with families, support coordinators, and allied health professionals across
                South Australia to ensure your support network is strong, coordinated, and effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Than Care Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              More Than Care — A Trusted <span className="text-eukyPurple">NDIS Partner</span> in South Australia
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4">
              Euky Care is built on the belief that everyone deserves the opportunity to live a fulfilling,
              independent, and connected life. Our role is to walk alongside you, provide the right NDIS
              supports, and help turn goals into achievements.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
              If you are looking for a reliable and compassionate NDIS provider in South Australia, Euky
              Care is here to support you every step of the way.
            </p>
            <p className="text-base sm:text-lg font-bold text-eukyPurple mb-8">
              Euky Care — Personalised disability support services in South Australia. Real
              independence. Meaningful outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eukyPurple/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-eukyPurple uppercase tracking-wider">Our Mission</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">Empowering participants through personalised support</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                At Euky Care, our mission is to provide personalised, compassionate, and high-quality
                NDIS support across South Australia that empowers participants to achieve their goals, live
                independently, and participate fully in their communities. We are dedicated to creating
                meaningful outcomes through tailored support plans, trusted relationships, and a
                participant-first approach that makes every individual feel valued, respected, and
                understood.
              </p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eukyGreen/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Our Vision</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">South Australia&apos;s most trusted NDIS provider</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our vision is to be South Australia&apos;s most trusted NDIS provider, known for transforming
                lives through exceptional care, innovation, and empowerment. We strive to build a world
                where every participant can reach their full potential, confidently navigate their NDIS
                journey, and enjoy a fulfilling, independent, and connected life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NDIS Registration Banner */}
      <section className="py-8 sm:py-10 md:py-12 bg-eukyPurple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-eukyGreen/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">NDIS Registered Provider</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Trusted quality and compliance standards you can rely on</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-eukyPurple rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-md">
              <span className="text-white font-medium text-xs sm:text-sm">We</span>
              <span className="text-red-400 text-sm sm:text-base">❤️</span>
              <span className="text-white font-bold text-xs sm:text-sm">ndis</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Ready to Join Our Community?</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">Take the first step towards quality support. Our team is here to help you every step of the way.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Make a Referral
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyGreen text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyGreen/90 transition-all duration-300 hover:scale-105 shadow-lg">Explore Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
