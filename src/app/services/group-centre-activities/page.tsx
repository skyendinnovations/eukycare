import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function GroupCentreActivitiesPage() {
  return (
    <ServicePageTemplate
      title="Group & Centre Activities"
      breadcrumb="Group/Centre Activities"
      description="Euky Care is committed to creating an environment that encourages people with disabilities to connect with others through capacity-building activities. We support participants in joining community, social, and recreational activities to form new connections and enjoy themselves."
      longDescription="We include our participants in a wide range of programs designed to meet individual needs through workshops and engaging activities where everyone feels valued and comfortable. These activities stimulate an environment where participants can make new friends and learn new skills."
      services={[
        "Developing meaningful relationships",
        "Meeting new people and building friendships",
        "Taking art, craft, and creative classes",
        "Gardening and outdoor activities",
        "Library visits and reading groups",
        "Joining social groups or community activities",
        "Recreational activities for overall wellbeing",
        "Local exercise, dance, and sporting clubs for improved health",
      ]}
      closingText="At Euky Care, we believe everyone deserves the opportunity to connect, create, and grow. Contact us today to learn more about our group and centre activities."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      }
    />
  );
}
