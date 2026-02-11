import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function SupportCoordinationPage() {
  return (
    <ServicePageTemplate
      title="Support Coordination"
      breadcrumb="Support Coordination"
      description="NDIS Support Coordination is a funded service designed to help you maximise the value of your NDIS plan. Understanding your funding is one thing — managing it effectively is another. That's where our coordinators step in."
      longDescription="Euky Care provides expert NDIS Support Coordination to help you meet your individual needs, preferences, and goals. Our team works closely with participants, striving to deliver the highest standard of care. Our coordinators are committed to ensuring you receive the support you deserve to live more independently and build meaningful relationships."
      services={[
        "Managing informal, mainstream, and funded supports",
        "Planning the most effective use of your NDIS plan and funding",
        "Coordinating support across multiple service providers",
        "Building independence to make informed decisions",
        "Connecting you with informal, formal, and community supports",
        "Resolving complex situations efficiently",
      ]}
      closingText="Our qualified and experienced NDIS support coordinators are ready to help you navigate the system with confidence. Get in touch with Euky Care today to learn how we can support your journey."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      }
    />
  );
}
