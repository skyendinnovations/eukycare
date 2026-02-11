// Seed script for Sanity FAQs
// Run this in your Sanity Studio or via Sanity CLI

const faqs = [
  {
    _type: 'faq',
    question: 'What is the NDIS and who is eligible?',
    answer: 'The National Disability Insurance Scheme (NDIS) provides support to people with permanent and significant disabilities. To be eligible, you must be under 65 when you apply, be an Australian citizen, permanent resident, or hold a Protected Special Category Visa. You must also have a disability that significantly impacts your daily life and ability to participate in the community.',
    category: 'ndis-basics',
    order: 1,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'How do I apply for NDIS funding?',
    answer: 'You can apply by calling the NDIA on 1800 800 110, visiting their website at ndis.gov.au, or contacting a Local Area Coordinator in your region. You\'ll need to provide evidence of your disability from medical professionals and information about how it affects your daily activities.',
    category: 'eligibility',
    order: 2,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'What services does Euky Care provide?',
    answer: 'We offer a comprehensive range of NDIS services including: Support Coordination, Personal Care (Assist Personal Activities), Accommodation Support (SIL, STA, SDA, MTA, ILO), Community Participation, Household Tasks, Transport Assistance, Community Nursing, Exercise Physiology & Personal Training, Life Skills Development, Group Activities, and Interpreting/Translation services.',
    category: 'services',
    order: 3,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'How is my support plan created?',
    answer: 'We use a person-centered approach. Our team meets with you to understand your goals, preferences, and current situation. We then work together to create a tailored support plan that aligns with your NDIS funding and helps you achieve what matters most to you. The plan is flexible and can be adjusted as your needs and goals evolve.',
    category: 'planning',
    order: 4,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'What funding management types do you accept?',
    answer: 'We work with all NDIS funding management types: self-managed, plan-managed, and NDIA-managed. Our team can help you understand the differences and which option might work best for your situation.',
    category: 'funding',
    order: 5,
  },
  {
    _type: 'faq',
    question: 'How do I make a referral?',
    answer: 'You can make a referral through our online referral form on the Referrals page, by calling us directly, or by emailing our intake team. Referrals can be made by participants themselves, family members, support coordinators, or other healthcare professionals. We aim to respond to all referrals within 2 business days.',
    category: 'general',
    order: 6,
  },
  {
    _type: 'faq',
    question: 'What areas do you service?',
    answer: 'We provide services across Melbourne and regional Victoria, including Melbourne CBD, Dandenong, Cranbourne, Casey, Werribee, Wyndham, Sunshine, Brimbank, and surrounding areas. Contact us to confirm service availability in your specific location.',
    category: 'general',
    order: 7,
  },
  {
    _type: 'faq',
    question: 'Can I choose my own support workers?',
    answer: 'Absolutely! We believe in choice and control. You can meet potential support workers and choose who you feel most comfortable with. If at any time you want to change workers, just let your coordinator know and we\'ll arrange suitable alternatives.',
    category: 'services',
    order: 8,
  },
  {
    _type: 'faq',
    question: 'How do I know if I have enough funding for your services?',
    answer: 'Our support coordinators can review your NDIS plan with you and explain what funding you have available and which line items cover which supports. We\'ll help you understand your budget and make the most of your allocated funding.',
    category: 'funding',
    order: 9,
  },
  {
    _type: 'faq',
    question: 'What happens during a plan review?',
    answer: 'NDIS plan reviews typically occur annually or when your circumstances change significantly. We can support you through this process by providing reports on your progress, helping identify new goals, and attending planning meetings with you if requested.',
    category: 'planning',
    order: 10,
  },
  {
    _type: 'faq',
    question: 'Do you provide 24/7 support?',
    answer: 'Yes, we offer 24/7 support through our Supported Independent Living (SIL) services. We also have emergency contact systems in place for participants receiving other types of support. Contact us to discuss your specific needs.',
    category: 'services',
    order: 11,
  },
  {
    _type: 'faq',
    question: 'How quickly can services start after a referral?',
    answer: 'Our goal is to start services within 2 weeks of receiving a completed referral, though this can vary depending on service availability and your specific needs. We prioritize urgent situations and work to arrange services as quickly as possible.',
    category: 'general',
    order: 12,
  },
];

// Instructions to import:
// 1. Go to your Sanity Studio at http://localhost:3000/studio
// 2. Navigate to Vision (query tool) or use Sanity CLI
// 3. Run this script or manually create FAQs using the studio interface

// If using Sanity CLI, save this as seed-faqs.js and run:
// sanity exec seed-faqs.js --with-user-token

// Or manually create each FAQ in the Sanity Studio interface
console.log('FAQ seed data ready. Import into Sanity Studio or use sanity exec.');
console.log(`Total FAQs to import: ${faqs.length}`);
