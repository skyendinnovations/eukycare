import Link from "next/link";

const serviceCategories = [
  {
    id: "accommodation",
    title: "Accommodation",
    description: "Support related to finding and maintaining safe, accessible housing.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    services: [
      {
        name: "Accommodation/Tenancy",
        href: "/services/accommodation-tenancy",
        description: "Help finding and maintaining safe, affordable accommodation with support for independent living.",
      },
    ],
  },
  {
    id: "support-services",
    title: "Support Services",
    description: "Comprehensive support for daily living, personal care, and skill development.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    services: [
      { name: "Support Coordination", href: "/services/support-coordination", description: "Expert help to manage and maximise the value of your NDIS plan." },
      { name: "Assist Personal Activities Australia", href: "/services/assist-personal-activities", description: "Hands-on assistance with daily personal tasks for greater independence." },
      { name: "Assist Travel/Transportation", href: "/services/assist-travel-transportation", description: "Travel and transport support for appointments, errands, and community access." },
      { name: "Community Nursing Services Melbourne", href: "/services/community-nursing", description: "Professional in-home nursing care by certified, experienced nurses." },
      { name: "Ex Phy & Pers Training", href: "/services/exercise-physiology", description: "Customised exercise programs to improve your health and wellbeing." },
      { name: "Household Tasks", href: "/services/household-tasks", description: "Support with cleaning, laundry, cooking, and maintaining your living space." },
      { name: "Personal Activities High", href: "/services/personal-activities-high", description: "High-intensity support for complex daily personal care needs." },
    ],
  },
  {
    id: "community-involvement",
    title: "Community Involvement",
    description: "Programs and support to help you engage with your local community.",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    services: [
      { name: "Community Participation Activities NDIS", href: "/services/community-participation", description: "Support to engage in community events, social activities, and new experiences." },
      { name: "Development Life Skills", href: "/services/development-life-skills", description: "Training to build independence, communication, and everyday living skills." },
      { name: "Group/Centre Activities", href: "/services/group-centre-activities", description: "Social and recreational activities in a supportive group environment." },
      { name: "Interpreting & Translation", href: "/services/interpreting-translation", description: "Language support to ensure clear communication for all participants." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-eukyPurple/10 text-eukyPurple rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              NDIS Registered Provider
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">Our NDIS Services</h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
              Comprehensive disability support services tailored to help you achieve your goals and live life on your terms. We&apos;re here to support your journey every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg">
                Make a Referral
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-eukyPurple text-eukyPurple font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/5 transition-all duration-300">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {serviceCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-100 hover:bg-eukyPurple hover:text-white text-slate-700 rounded-full text-xs sm:text-sm font-medium transition-all duration-300">
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section key={category.id} id={category.id} className={`py-12 sm:py-16 md:py-20 ${categoryIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-eukyPurple/10 text-eukyPurple rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">{category.icon}</div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">{category.title}</h2>
                <p className="text-sm sm:text-base text-slate-600">{category.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.services.map((service) => (
                <Link key={service.name} href={service.href} className="group block bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eukyGreen/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">{service.description}</p>
                  <span className="inline-flex items-center text-eukyPurple text-xs sm:text-sm font-semibold">
                    Learn More
                    <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* How to Access Our Services */}
      <section className="py-12 sm:py-16 md:py-20 bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Getting Started</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 sm:mb-4">How to Access Our Services</h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">Getting started with Euky Care is simple. Follow these steps to begin your journey.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Contact Us", description: "Reach out via phone, email, or our referral form." },
              { step: "02", title: "Initial Discussion", description: "We discuss your needs, goals, and NDIS plan." },
              { step: "03", title: "Service Agreement", description: "We create a tailored service agreement together." },
              { step: "04", title: "Begin Support", description: "Start receiving quality support from our team." },
            ].map((item) => (
              <div key={item.step} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center border border-white/10 hover:bg-white/15 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-white/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NDIS Funded Banner */}
      <section className="py-10 sm:py-12 md:py-16 bg-eukyGreen/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-eukyGreen/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">All Services NDIS Funded</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-2xl mx-auto">
            As a registered NDIS provider, our services can be funded through your NDIS plan. We work with all funding management types including self-managed, plan-managed, and NDIA-managed participants.
          </p>
          <Link href="/faq" className="inline-flex items-center text-eukyGreen font-semibold text-sm sm:text-base hover:underline">
            Learn about NDIS funding
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Ready to Get Started?</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">Contact us today to discuss how we can support you or your loved one on their NDIS journey.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Make a Referral
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyGreen text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyGreen/90 transition-all duration-300 hover:scale-105 shadow-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
