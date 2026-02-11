import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function AccommodationTenancyPage() {
  return (
    <ServicePageTemplate
      title="Accommodation & Tenancy"
      breadcrumb="Accommodation/Tenancy"
      description="Everyone deserves a safe, nurturing, and comfortable home. Euky Care provides dedicated support and advocacy to help people with disabilities find and maintain secure, affordable accommodation."
      longDescription="Our accommodation services start with a personalised consultation where our trained team discusses your individual needs. From there, we help you find a home that meets your requirements for accessibility, safety, and convenience. Euky Care also offers short-term and medium-term accommodation, supported independent living, and respite care, all designed to help you develop the skills needed to live as independently as possible."
      services={[
        "Guidance on supported disability accommodation options",
        "Exploring alternative housing solutions",
        "Help with rental applications and paperwork",
        "Home maintenance through training and support",
        "Having a say in who you live with",
        "Encouraging and supporting independent living",
        "Budgeting and financial management assistance",
      ]}
      closingText="At Euky Care, we believe your home should feel truly yours. Our team works alongside you to build the confidence and skills for independent living, while ensuring you always have the support you need."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      }
    />
  );
}
