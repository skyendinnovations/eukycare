import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function ExercisePhysiologyPage() {
  return (
    <ServicePageTemplate
      title="Exercise Physiology & Personal Training"
      breadcrumb="Ex Phy & Pers Training"
      description="At Euky Care, we help people with disabilities harness the power of exercise to reach their health and wellbeing goals. Our experienced Exercise Physiologists listen to your wellness aspirations and design a customised program just for you."
      longDescription="We focus on exercises and tools that empower you to manage your condition independently and enjoy a comfortable, healthy life. Our Exercise Physiologists are trained to treat and manage specific health conditions, ensuring you fully understand your situation and learn how to manage it in the best possible way while working toward your health goals."
      services={[
        "Intellectual disabilities",
        "Neurological conditions",
        "Mental health support",
        "Physical disabilities",
        "Genetic disabilities",
        "And many more conditions",
      ]}
      additionalSections={[
        {
          title: "Our Programs Can Help With",
          items: [
            "Goal-defined fitness programs",
            "Increased mobility and function",
            "Postural control and balance",
            "Weight management programs",
            "Healthy lifestyle education",
            "Improved mental health and wellbeing",
            "Chronic disease management",
            "Building ability to self-manage your condition",
          ],
        },
      ]}
      closingText="Our aim is to help you become more independent while improving your overall performance and wellbeing. Let Euky Care help you live a better life — call us today to get started."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
    />
  );
}
