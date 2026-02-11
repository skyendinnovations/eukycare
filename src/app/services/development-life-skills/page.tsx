import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function DevelopmentLifeSkillsPage() {
  return (
    <ServicePageTemplate
      title="Development Life Skills"
      breadcrumb="Development Life Skills"
      description="Life skills are essential for living freely and confidently. They help you achieve your goals and create a positive impact across every area of your life. At Euky Care, we help you develop and strengthen these vital skills so you can take greater control of your journey."
      longDescription="Our personalised services assist you in acquiring new life skills, giving you greater autonomy within your NDIS plan. These development activities cover skills needed for daily routines, communication, community engagement, and financial management. Our aim is to help participants overcome and manage challenges with confidence and ease."
      services={[
        "Personal hygiene, appearance, and interpersonal skills",
        "Communication and social skills development",
        "Problem-solving and critical thinking",
        "Strengthening family relationships",
        "Managing your funds and expenses",
        "Employment readiness and job prospects",
        "Meal planning and food preparation",
        "Building social networks and companionship",
        "Travel and transport training including road safety",
        "Training and support to maintain your accommodation",
        "Literacy and numeracy support",
      ]}
      closingText="At Euky Care, our highly experienced staff work closely with you to ensure you receive the right kind of support. We help you develop everyday skills to tackle daily tasks and live more independently."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      }
    />
  );
}
