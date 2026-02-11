import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function AssistPersonalActivitiesPage() {
  return (
    <ServicePageTemplate
      title="Assist Personal Activities"
      breadcrumb="Assist Personal Activities"
      description="At Euky Care, we are dedicated to helping people with disabilities live with independence, confidence, and dignity. Our support workers provide hands-on assistance with daily personal activities, from personal care to attending appointments."
      longDescription="Whether you live alone or share your home with others, our team is here to help you manage your daily routine. If you find it challenging to carry out personal activities on your own, our skilled and experienced disability support workers can provide the tailored assistance you need to live independently and participate in the activities that matter most to you."
      services={[
        "Assistance with dressing and grooming",
        "Showering and bathing support",
        "Toilet and hygiene assistance",
        "Mobility support around your home",
        "Bill and expense management",
        "Cooking and meal preparation assistance",
        "Engaging in activities of personal interest",
        "Community participation support",
        "Skill building for greater independence",
      ]}
      closingText="Euky Care is here to help you live life on your terms. Contact us today for a free consultation and learn how our personalised support can make a difference in your daily life."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      }
    />
  );
}
