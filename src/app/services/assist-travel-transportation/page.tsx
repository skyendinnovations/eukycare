import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function AssistTravelTransportationPage() {
  return (
    <ServicePageTemplate
      title="Assist Travel & Transportation"
      breadcrumb="Assist Travel/Transportation"
      description="Euky Care provides travel and transport assistance for people with disabilities, helping you move confidently from one place to another with the guidance of our trained support workers."
      longDescription="Travel and transport support covers both in-home and community-based activities — whether it's attending medical appointments, running errands, or joining community events. Our disability support workers ensure smooth transitions and help build your confidence to travel independently. Our goal is to increase your mobility so you can live your life the way you want."
      services={[
        "Enhancing mobility to help you achieve daily goals",
        "Building independence for self-directed travel",
        "Learning to use public transportation safely",
        "Completing tasks that require travel outside the home",
        "Getting to meetings and appointments on time",
        "Running essential errands safely and efficiently",
        "Visiting your local pharmacy, GP, or specialist",
      ]}
      closingText="At Euky Care, we're happy to be your travel partner. Whether it's a routine appointment or a community outing, we'll make sure you get there safely and comfortably. Book a free consultation today."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      }
    />
  );
}
