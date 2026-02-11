import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function CommunityNursingPage() {
  return (
    <ServicePageTemplate
      title="Community Nursing Services"
      breadcrumb="Community Nursing"
      description="Euky Care provides professional community nursing services for participants who require a high level of clinical care and support. Our caring, qualified nurses always prioritise your comfort and wellbeing."
      longDescription="Our nursing care encompasses post-hospital support, medication management, and clinical assistance — all delivered in the comfort of your own home. Every nurse on our team is certified and undergoes thorough background and reference checks. We collaborate closely with your healthcare practitioners to ensure a smooth recovery following a medical procedure, hospital stay, or illness."
      services={[
        "Visiting nurse and general nursing assessments",
        "Care plan and treatment development",
        "Medication setup and administration",
        "Wound care and stoma care",
        "Respiratory and continence support",
        "Catheter care and management",
        "Palliative and overnight nursing care",
        "Post-hospital recovery support",
        "Diabetes monitoring and management",
        "Tube-feeding assistance",
        "Blood pressure, pulse, temperature, and blood sugar monitoring",
        "Education and guidance for clients and families",
        "Personal care and showering assistance",
        "Support attending medical appointments",
        "Behavioural support and dementia management",
        "Post-operative care and rehabilitation",
        "General wellbeing checks",
        "Mobility and transfer assistance",
        "24-hour nursing care and more",
      ]}
      closingText="At Euky Care, our team of highly qualified nurses and support staff work around the clock to meet all your care needs. If you require community nursing care, get in touch with us today."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      }
    />
  );
}
