import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function HouseholdTasksPage() {
  return (
    <ServicePageTemplate
      title="Household Tasks"
      breadcrumb="Household Tasks"
      description="Euky Care offers household task support for people with disabilities, provided by our certified and skilled workers who go the extra mile to ensure your daily life runs smoothly and comfortably."
      longDescription="We empower our participants to handle their daily chores independently or with minimal assistance. Through proper training and support, we help you build the capability to manage a variety of household tasks, giving you greater independence and confidence. Our support workers assess your needs and suggest practical daily living aids that can be used for everything from cooking to laundry."
      services={[
        "Cleaning stovetops and kitchen surfaces",
        "Wiping down benches and countertops",
        "Cleaning inside fridges and ovens",
        "Vacuuming or mopping floors",
        "Dusting and general tidying",
        "Dishwashing and kitchen cleanup",
        "Changing bed linen",
        "Laundry and ironing",
        "Sanitising toilets and rubbish bins",
        "Meal preparation and cooking",
      ]}
      closingText="All our staff undergo background checks, police checks, and complete regular comprehensive health and safety training. With Euky Care, you can have peace of mind knowing you're in safe and responsible hands. Our household tasks service is designed to help you develop and maintain a clean, safe, and pleasant living environment."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      }
    />
  );
}
