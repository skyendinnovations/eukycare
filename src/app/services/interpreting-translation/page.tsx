import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function InterpretingTranslationPage() {
  return (
    <ServicePageTemplate
      title="Interpreting & Translation Services"
      breadcrumb="Interpreting & Translation"
      description="When a participant or caregiver doesn't speak or understand English, Euky Care provides professional interpreting and translation services to ensure clear, comfortable communication in a language of their choice."
      longDescription="Euky Care is equipped to help our clients connect through the language they feel most comfortable in, ensuring a clear channel of communication at all times. Our professional translators and multilingual carers are well-versed in various languages including Mandarin, Arabic, Spanish, Urdu, and more. We believe it is essential to bridge any communication gap effectively so that every participant can fully access and benefit from their support services."
      services={[
        "Professional interpreting in your preferred language",
        "Document translation services",
        "Multilingual carer support",
        "Communication assistance for NDIS meetings and reviews",
        "Translation for community, social, and personal activity enquiries",
        "Cultural liaison and support",
        "Support for participants from CALD backgrounds",
      ]}
      closingText="At Euky Care, we make sure our clients feel comfortable and confident to share their thoughts. Our professionals are committed to going the extra mile to make your life easier. Contact us today to learn more about our interpreting and translation services."
      icon={
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      }
    />
  );
}
