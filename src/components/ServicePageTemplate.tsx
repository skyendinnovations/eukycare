import Link from "next/link";

interface ServicePageProps {
  title: string;
  description: string;
  longDescription: string;
  services: string[];
  additionalSections?: {
    title: string;
    items: string[];
  }[];
  closingText?: string;
  breadcrumb: string;
  icon: React.ReactNode;
}

export default function ServicePageTemplate({
  title,
  description,
  longDescription,
  services,
  additionalSections,
  closingText,
  breadcrumb,
  icon,
}: ServicePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 flex-wrap">
            <Link href="/" className="hover:text-eukyPurple transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-eukyPurple transition-colors">Services</Link>
            <span>/</span>
            <span className="text-eukyPurple font-medium truncate max-w-[200px] sm:max-w-none">{breadcrumb}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-eukyPurple/10 text-eukyPurple rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                {icon}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/referrals"
                  className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Make a Referral
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-eukyPurple text-eukyPurple font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/5 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-eukyPurple/5 rounded-3xl p-8 border border-eukyPurple/10">
                <div className="space-y-4">
                  {[
                    { label: "NDIS Registered Provider", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                    { label: "Flexible Scheduling", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { label: "Person-Centred Approach", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { label: "Free Consultation Available", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-eukyGreen/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed mb-8 sm:mb-10">
            {longDescription}
          </p>

          {/* Services List */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-4 bg-purple-50/50 rounded-xl border border-purple-100/50"
              >
                <div className="w-6 h-6 bg-eukyGreen/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-slate-700">{service}</span>
              </div>
            ))}
          </div>

          {/* Additional Sections */}
          {additionalSections && additionalSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-10 sm:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">
                {section.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 sm:p-4 bg-purple-50/50 rounded-xl border border-purple-100/50"
                  >
                    <div className="w-6 h-6 bg-eukyGreen/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Closing Text */}
          {closingText && (
            <div className="mt-10 sm:mt-12">
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
                {closingText}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-eukyPurple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact Euky Care today to discuss how we can support you or your loved one. We offer a free, no-obligation consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/referrals"
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-eukyPurple font-medium text-sm sm:text-base rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Make a Referral
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 border-2 border-white text-white font-medium text-sm sm:text-base rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
