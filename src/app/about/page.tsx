import Link from "next/link";

const team = [
  { name: "Dr. Emily Richardson", role: "Founder & CEO", bio: "With over 20 years in disability services, Emily founded Euky Care to provide person-centered support that truly makes a difference.", initials: "ER" },
  { name: "Michael Chen", role: "Operations Director", bio: "Michael ensures our services run smoothly and efficiently, bringing 15 years of healthcare management expertise.", initials: "MC" },
  { name: "Sarah Thompson", role: "Clinical Lead", bio: "A registered nurse with specialized training in disability care, Sarah leads our clinical excellence initiatives.", initials: "ST" },
  { name: "David Okonkwo", role: "Support Coordinator", bio: "David helps participants navigate the NDIS system and connects them with the right services for their needs.", initials: "DO" },
  { name: "Lisa Martinez", role: "Quality & Compliance", bio: "Lisa ensures all our services meet the highest NDIS quality and safety standards.", initials: "LM" },
  { name: "James Wilson", role: "Community Programs Lead", bio: "James designs and manages engaging community programs that foster connection and social participation.", initials: "JW" },
];

const values = [
  { title: "Compassion", description: "We approach every interaction with empathy, understanding, and genuine care for the people we serve.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
  { title: "Excellence", description: "We strive for the highest standards in everything we do, continuously improving our services and outcomes.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
  { title: "Integrity", description: "We act with honesty and transparency, building trust through ethical practices and open communication.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { title: "Empowerment", description: "We support individuals to make their own choices and achieve their goals on their own terms.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { title: "Inclusion", description: "We celebrate diversity and ensure everyone feels valued, respected, and included in our community.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { title: "Innovation", description: "We embrace new ideas and approaches to deliver better outcomes and enhance the lives of our participants.", icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
];

const milestones = [
  { year: "2014", title: "Foundation", description: "Euky Care was founded with a vision to transform disability support services." },
  { year: "2016", title: "NDIS Registration", description: "Became a registered NDIS provider, expanding our reach to more Australians." },
  { year: "2018", title: "Community Programs", description: "Launched comprehensive community participation programs." },
  { year: "2020", title: "Accommodation", description: "Expanded to include supported independent living options." },
  { year: "2022", title: "500+ Participants", description: "Reached milestone of supporting over 500 individuals and families." },
  { year: "2024", title: "Quality Excellence", description: "Achieved highest NDIS quality certification standards." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
                About Euky Care
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
                Empowering Lives,<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Building Futures
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                We&apos;re dedicated to providing exceptional disability support services that help individuals achieve their goals, live independently, and thrive in their communities. Every person deserves the opportunity to live their best life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-eukyPurple text-eukyPurple font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/5 transition-all duration-300">Explore Services</Link>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-eukyPurple rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 text-white shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">500+</div>
                <p className="text-white/80 text-xs sm:text-sm">Participants Supported</p>
              </div>
              <div className="bg-eukyGreen rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 text-white shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">10+</div>
                <p className="text-white/80 text-xs sm:text-sm">Years of Excellence</p>
              </div>
              <div className="bg-[#534371] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 text-white shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">150+</div>
                <p className="text-white/80 text-xs sm:text-sm">Dedicated Staff</p>
              </div>
              <div className="bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-eukyPurple mb-1 sm:mb-2">98%</div>
                <p className="text-slate-600 text-xs sm:text-sm">Client Satisfaction</p>
              </div>
            </div>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">To deliver person-centered support that transforms lives</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">At Euky Care, our mission is to provide high-quality, compassionate disability support services that empower individuals to live their best lives.</p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">We believe everyone deserves the opportunity to achieve their goals, participate in their community, and enjoy independence and dignity.</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eukyGreen/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Our Vision</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">A world where everyone can thrive</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">We envision a society where people of all abilities are valued, included, and supported to reach their full potential.</p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">Through innovation, compassion, and unwavering commitment to quality, we&apos;re working to make this vision a reality—one participant at a time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none"><circle cx="0" cy="100" r="150" stroke="#88BF45" strokeWidth="2" fill="none"/></svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-xs sm:text-sm font-semibold text-eukyPurple uppercase tracking-wider">Our Journey</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">A Decade of Making a Difference</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">From humble beginnings to becoming a trusted NDIS provider</p>
          </div>
          {/* Timeline - Horizontal on large screens */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start relative">
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200"></div>
              {milestones.map((milestone) => (
                <div key={milestone.year} className="relative flex flex-col items-center w-40 group cursor-pointer">
                  <div className="w-12 h-12 bg-white border-2 border-eukyPurple rounded-full flex items-center justify-center z-10 mb-4 group-hover:bg-eukyPurple transition-colors">
                    <span className="text-sm font-bold text-eukyPurple group-hover:text-white transition-colors">{milestone.year.slice(-2)}</span>
                  </div>
                  <span className="text-lg font-bold text-eukyPurple mb-1">{milestone.year}</span>
                  <h3 className="text-sm font-semibold text-slate-900 text-center mb-2">{milestone.title}</h3>
                  <p className="text-xs text-slate-600 text-center leading-relaxed">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Timeline - Vertical on small screens */}
          <div className="lg:hidden space-y-4 sm:space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-eukyPurple/10 border-2 border-eukyPurple rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-eukyPurple">{milestone.year.slice(-2)}</span>
                  </div>
                  {index < milestones.length - 1 && <div className="w-0.5 h-full bg-slate-200 mt-2"></div>}
                </div>
                <div className="pb-4 sm:pb-6">
                  <span className="text-xs sm:text-sm font-bold text-eukyPurple">{milestone.year}</span>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 mt-1">{milestone.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 sm:mb-4">The Principles That Guide Us</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">Our core values shape everything we do and how we deliver care</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {values.map((value) => (
              <div key={value.title} className="group bg-eukyPurple/40 backdrop-blur-sm hover:bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 border border-white/10 hover:scale-[1.03] hover:-translate-y-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 text-white rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-eukyGreen transition-all duration-300">{value.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{value.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-xs sm:text-sm font-semibold text-eukyPurple uppercase tracking-wider">Our Team</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">Meet the People Behind Euky Care</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">Our dedicated team of professionals is committed to delivering exceptional care and support</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {team.map((member) => (
              <div key={member.name} className="group bg-white hover:bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto bg-slate-200 group-hover:bg-eukyPurple rounded-full flex items-center justify-center text-slate-600 group-hover:text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 transition-all duration-300">{member.initials}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 mb-0.5 sm:mb-1">{member.name}</h3>
                <p className="text-eukyPurple text-xs sm:text-sm font-medium mb-2 sm:mb-3">{member.role}</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed hidden sm:block">{member.bio}</p>
              </div>
            ))}
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
