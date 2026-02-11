import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function PersonalActivitiesHighPage() {
  return (
    <ServicePageTemplate
      title="Personal Activities High"
      breadcrumb="Personal Activities High"
      description="Euky Care is here to assist NDIS participants with high-intensity daily personal activities, including complex health needs such as diabetes management and feeding support."
      longDescription="Our disability support workers help you with your day-to-day personal tasks, enabling you to live independently and confidently. Our team consists of qualified, caring, and skilled support workers who can simplify your daily routine. These supports can be provided both in your home and in community settings. We understand that every person has unique requirements and interests, which is why we customise our services to ensure all your needs are met — whether short-term or long-term."
      services={[
        "Feeding management and support",
        "Diabetes management and monitoring",
        "Assistance with injections",
        "Ventilation support",
        "Urinary catheter care",
        "Complex tracheostomy care",
        "Complex wound management",
        "Complex bowel care",
      ]}
      closingText="Through our tailored daily activities support, we enable you to be autonomous and enjoy quality time with family and friends. If your NDIS plan includes high-intensity personal daily activities, contact Euky Care for more information."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      }
    />
  );
}
