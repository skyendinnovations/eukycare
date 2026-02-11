import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function CommunityParticipationPage() {
  return (
    <ServicePageTemplate
      title="Community Participation Activities"
      breadcrumb="Community Participation"
      description="Everyone benefits from participating in activities they enjoy — it builds confidence, develops skills, and creates meaningful connections. At Euky Care, our support workers encourage and assist people with disabilities to engage in community life."
      longDescription="Community participation enables you to get involved in activities and events happening around you, helping you progress toward independent living and achieve both short-term and long-term goals. Whether you want to meet new people, try new activities, or build greater independence, community participation can set you on the right path."
      services={[
        "Assistance and attendance for grocery shopping",
        "Educational classes and learning opportunities",
        "Dance and creative movement activities",
        "Community events and local gatherings",
        "Support for medical appointments",
        "Developing your ability to work",
        "Recreational and sporting activities",
        "Visiting family and friends",
        "Accessing local libraries and resources",
        "Money management and budgeting skills",
        "Swimming and aquatic activities",
        "Walking groups and outdoor activities",
        "Building skills and learning new interests",
        "Volunteering opportunities",
        "Camps, classes, and holiday programs",
      ]}
      closingText="At Euky Care, we offer a free, no-obligation consultation in the comfort of your home. We listen carefully to understand your needs and provide the support that helps you live freely and happily. Our services are available across Australia — get in touch to discuss your needs with our team."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      }
    />
  );
}
