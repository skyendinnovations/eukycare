import Link from "next/link";
import { getActiveFAQs } from "@/lib/database";

// Category icon SVGs
const categoryIcons: Record<string, React.ReactNode> = {
  "ndis-basics": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "funding": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "euky-services": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  "services": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  "accommodation": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  "support-coordination": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  "general": <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

// Static fallback FAQ data
const fallbackCategories = [
  {
    id: "ndis-basics", title: "NDIS Basics",
    faqs: [
      { question: "What is the NDIS?", answer: "The National Disability Insurance Scheme (NDIS) is an Australian Government initiative that provides funding and support for people with permanent and significant disabilities. It aims to help participants achieve their goals, increase their independence, and participate in their community." },
      { question: "Who is eligible for the NDIS?", answer: "To be eligible for the NDIS, you must be under 65 years old when you first apply, be an Australian citizen, permanent resident, or hold a Protected Special Category Visa, and have a permanent and significant disability that affects your ability to take part in everyday activities. The disability must be likely to be lifelong and require support from others." },
      { question: "How do I apply for the NDIS?", answer: "You can apply for the NDIS by contacting the National Disability Insurance Agency (NDIA) on 1800 800 110 or through their website. You'll need to complete an Access Request Form and provide evidence of your disability and how it impacts your daily life. The NDIA will then assess your eligibility." },
      { question: "What happens after I become an NDIS participant?", answer: "Once approved, you'll have a planning meeting with the NDIA to discuss your goals and support needs. You'll then receive an NDIS plan outlining your funding and the supports you can access. You can then choose providers (like Euky Care) to deliver your supports." },
      { question: "Can I change my NDIS plan?", answer: "Yes. You can request a plan review if your circumstances change, your needs aren't being met, or you want to change your goals. Your plan will also be reviewed periodically (usually annually) to ensure it continues to meet your needs." },
    ],
  },
  {
    id: "funding", title: "NDIS Funding",
    faqs: [
      { question: "What funding categories are in an NDIS plan?", answer: "NDIS plans typically include three main budget categories: Core Supports (for everyday activities, consumables, transport, and equipment), Capital Supports (for assistive technology and home modifications), and Capacity Building Supports (for skill development, employment support, and therapy)." },
      { question: "What are the different funding management options?", answer: "There are three ways to manage your NDIS funding: NDIA-managed (the NDIA pays providers directly), Plan-managed (a plan manager handles payments, giving you more provider choice), or Self-managed (you manage payments and have maximum flexibility). You can also have a mix of these options." },
      { question: "What is plan management and should I use it?", answer: "Plan management is when a registered plan manager handles the financial administration of your NDIS funding. Benefits include access to both registered and non-registered providers, no financial paperwork for you, and better tracking of your budget. It's a separate funding category that doesn't reduce your other supports." },
      { question: "Can I use my NDIS funding to pay for any service?", answer: "NDIS funding can only be used for supports that are reasonable and necessary, related to your disability, help you pursue your goals, represent value for money, and are not funded by other systems. Your plan will specify what your funding can be used for." },
      { question: "What happens if I don't use all my funding?", answer: "Unused funding does not roll over to your next plan. However, using less funding than expected doesn't necessarily mean you'll receive less in your next plan—it depends on your needs and goals at your plan review." },
    ],
  },
  {
    id: "euky-services", title: "Euky Care Services",
    faqs: [
      { question: "What services does Euky Care provide?", answer: "Euky Care provides a comprehensive range of NDIS services including Accommodation & Tenancy (SIL, MTA, STA), Support Services (daily living, personal care), Community Involvement, Allied Health services, Plan Management, and Support Coordination. We tailor our services to your individual needs and goals." },
      { question: "Is Euky Care a registered NDIS provider?", answer: "Yes, Euky Care is a registered NDIS provider. This means we meet strict quality and safety standards set by the NDIS Quality and Safeguards Commission. You can access our services regardless of how your plan is managed." },
      { question: "How do I start receiving services from Euky Care?", answer: "Getting started is easy! Contact us via phone, email, or our online referral form. We'll discuss your needs, review your NDIS plan, and create a service agreement. Once that's in place, we can begin delivering supports tailored to your goals." },
      { question: "Can I choose my own support workers?", answer: "Absolutely! We believe in choice and control. We'll work with you to match you with support workers who suit your personality, needs, and preferences. If you're not happy with a match, we'll work to find someone better suited to you." },
      { question: "What areas does Euky Care service?", answer: "Euky Care provides services across multiple regions in Australia. Please contact us to confirm service availability in your area. We're continually expanding to help more people access quality disability support." },
    ],
  },
  {
    id: "accommodation", title: "Accommodation",
    faqs: [
      { question: "What is Supported Independent Living (SIL)?", answer: "Supported Independent Living (SIL) provides support for daily tasks for participants who live in shared arrangements or their own homes. It includes help with personal care, cooking, cleaning, and other daily activities. SIL is designed to help you live as independently as possible while having the support you need." },
      { question: "What's the difference between SIL and SDA?", answer: "SIL (Supported Independent Living) is the support you receive, while SDA (Specialist Disability Accommodation) is the housing itself. SDA properties are specially designed for people with extreme functional impairment or very high support needs. Some participants have both SIL and SDA funding." },
      { question: "Can I have visitors or stay with family in SIL accommodation?", answer: "Yes! SIL accommodation is your home, and you can have visitors like anyone else. You can also stay with family or friends—just let your support team know so they can adjust support schedules as needed." },
      { question: "How do I get SIL funding in my NDIS plan?", answer: "To access SIL, you need to demonstrate that you require significant support with daily activities. This typically involves assessments from allied health professionals and discussions with the NDIA about your support needs and living goals. We can help you navigate this process." },
    ],
  },
  {
    id: "support-coordination", title: "Support Coordination",
    faqs: [
      { question: "What does a support coordinator do?", answer: "A support coordinator helps you understand and implement your NDIS plan. They connect you with providers, help you navigate the NDIS system, build your capacity to coordinate your own supports, assist with crisis situations, and help prepare for plan reviews. They're like a guide on your NDIS journey." },
      { question: "Do I need support coordination?", answer: "Support coordination is particularly helpful if you're new to the NDIS, have complex support needs, need help understanding your plan or finding providers, or want to build your skills to manage your supports independently over time. Not everyone needs it, but many find it valuable." },
      { question: "What's the difference between support coordination levels?", answer: "There are three levels: Support Connection (basic help finding providers), Support Coordination (more comprehensive support managing your plan), and Specialist Support Coordination (for participants with very complex needs requiring specialist expertise)." },
    ],
  },
];

export default async function FAQPage() {
  // Fetch FAQs from Supabase
  const dbFaqs = await getActiveFAQs();

  // Build categories from DB data, or use fallback
  let faqCategories = fallbackCategories;

  if (dbFaqs && dbFaqs.length > 0) {
    const grouped: Record<string, { question: string; answer: string }[]> = {};
    for (const faq of dbFaqs) {
      const cat = faq.category || "general";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ question: faq.question, answer: faq.answer });
    }
    const dbCategories = Object.entries(grouped).map(([id, faqs]) => ({
      id,
      title: id.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      faqs,
    }));
    if (dbCategories.length > 0) {
      faqCategories = dbCategories;
    }
  }

  // Build FAQ Schema for SEO
  const allFaqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ "@type": "Question" as const, name: faq.question, acceptedAnswer: { "@type": "Answer" as const, text: faq.answer } }))
  );
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage" as const, mainEntity: allFaqs };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-eukyPurple/10 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-72 md:w-96 h-24 sm:h-36 md:h-48 bg-purple-100/30 rounded-bl-[60px] sm:rounded-bl-[80px] md:rounded-bl-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center px-3 py-1.5 bg-eukyPurple/10 text-eukyPurple font-medium rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-eukyPurple rounded-full mr-2"></span>
              Get Your Questions Answered
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-eukyPurple mb-4 sm:mb-6 leading-tight">
              Frequently Asked<br className="hidden sm:block" /><span className="sm:hidden"> </span>Questions
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              Everything you need to know about the NDIS and how Euky Care can support you on your journey to independence and wellbeing.
            </p>
          </div>
          {/* Quick category links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {faqCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-slate-700 rounded-full text-xs sm:text-sm font-medium hover:bg-eukyPurple hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="mb-10 sm:mb-12 md:mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-eukyPurple/10 text-eukyPurple rounded-lg sm:rounded-xl flex items-center justify-center">
                  {categoryIcons[category.id] || categoryIcons["general"]}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{category.title}</h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {category.faqs.map((faq, faqIndex) => (
                  <details key={faqIndex} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 pr-3 sm:pr-4">{faq.question}</h3>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-eukyPurple/10 rounded-full flex items-center justify-center flex-shrink-0 group-open:bg-eukyPurple transition-colors">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-eukyPurple group-open:text-white transform group-open:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <div className="pt-2 sm:pt-3 border-t border-slate-100">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Need More Help?</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">Our friendly team is here to help answer any questions you have about the NDIS or our services.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-eukyPurple/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-eukyPurple/10 transition-colors hover:scale-[1.03] hover:-translate-y-1 duration-300">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-eukyPurple/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3">Speak directly with our team</p>
              <a href="tel:1300000000" className="text-lg sm:text-xl font-bold text-eukyPurple hover:underline">1300 EUKY CARE</a>
            </div>
            <div className="bg-eukyGreen/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-eukyGreen/10 transition-colors hover:scale-[1.03] hover:-translate-y-1 duration-300">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-eukyGreen/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-eukyGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Email Us</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3">We&apos;ll respond within 24 hours</p>
              <a href="mailto:info@eukycare.com.au" className="text-base sm:text-lg font-bold text-eukyGreen hover:underline break-all">info@eukycare.com.au</a>
            </div>
            <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:bg-slate-100 transition-colors hover:scale-[1.03] hover:-translate-y-1 duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3">Use our online contact form</p>
              <Link href="/contact" className="inline-flex items-center text-base sm:text-lg font-bold text-slate-700 hover:text-eukyPurple transition-colors">
                Contact Form
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NDIS Resources */}
      <section className="py-12 sm:py-16 md:py-20 bg-eukyPurple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-eukyGreen uppercase tracking-wider">Helpful Resources</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 sm:mb-4">NDIS Resources & Links</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">Useful links to help you learn more about the NDIS</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: "NDIS Website", description: "Official NDIS information and resources", url: "https://www.ndis.gov.au", icon: "🌐" },
              { title: "My NDIS Portal", description: "Access your NDIS plan online", url: "https://my.ndis.gov.au", icon: "👤" },
              { title: "Quality & Safeguards", description: "Quality and safety information", url: "https://www.ndiscommission.gov.au", icon: "🛡️" },
              { title: "NDIA Contact", description: "Contact the NDIA directly", url: "tel:1800800110", icon: "📞" },
            ].map((resource) => (
              <a key={resource.title} href={resource.url} target={resource.url.startsWith("http") ? "_blank" : undefined} rel={resource.url.startsWith("http") ? "noopener noreferrer" : undefined} className="group block bg-eukyPurple/40 backdrop-blur-sm hover:bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 border border-white/10 h-full hover:scale-[1.03] hover:-translate-y-1">
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{resource.icon}</span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-eukyGreen transition-colors mb-1">{resource.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Ready to Get Started with Euky Care?</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">Let us help you navigate your NDIS journey and achieve your goals.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/referrals" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyPurple text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyPurple/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Make a Referral
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-eukyGreen text-white font-medium text-sm sm:text-base rounded-full hover:bg-eukyGreen/90 transition-all duration-300 hover:scale-105 shadow-lg">View Our Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
