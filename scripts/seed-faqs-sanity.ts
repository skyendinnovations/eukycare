// Seed script to insert FAQs into Sanity
// Run with: bun run scripts/seed-faqs-sanity.ts

import { createClient } from '@sanity/client';

// Read from .env.local
const envFile = await Bun.file('.env.local').text();
const projectId = envFile.match(/NEXT_PUBLIC_SANITY_PROJECT_ID=(.+)/)?.[1]?.trim();
const token = envFile.match(/SANITY_API_TOKEN=(.+)/)?.[1]?.trim();

if (!projectId) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token || undefined, // Optional - without it, you need RLS rules
});

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
    answer: 'We offer comprehensive NDIS services including Support Coordination, Personal Care, Accommodation Support (SIL, STA, SDA, MTA, ILO), Community Participation, Household Tasks, Transport Assistance, Community Nursing, Exercise Physiology, Life Skills Development, Group Activities, and Interpreting services.',
    category: 'services',
    order: 3,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'How is my support plan created?',
    answer: 'We use a person-centered approach. Our team meets with you to understand your goals, preferences, and current situation. We then work together to create a tailored support plan that aligns with your NDIS funding and helps you achieve what matters most to you. The plan is flexible and can be adjusted as your needs evolve.',
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
    featured: false,
  },
  {
    _type: 'faq',
    question: 'How do I make a referral?',
    answer: 'You can make a referral through our online referral form on the Referrals page, by calling us directly, or by emailing our intake team. Referrals can be made by participants, family members, support coordinators, or other professionals. We aim to respond within 2 business days.',
    category: 'general',
    order: 6,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'What areas do you service?',
    answer: 'We provide services across Melbourne and regional Victoria, including Melbourne CBD, Dandenong, Cranbourne, Casey, Werribee, Wyndham, Sunshine, Brimbank, and surrounding areas. Contact us to confirm availability in your location.',
    category: 'general',
    order: 7,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'Can I choose my own support workers?',
    answer: 'Absolutely! We believe in choice and control. You can meet potential support workers and choose who you feel most comfortable with. If at any time you want to change workers, just let your coordinator know.',
    category: 'services',
    order: 8,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'How do I know if I have enough funding?',
    answer: 'Our support coordinators can review your NDIS plan with you and explain what funding you have available and which line items cover which supports. We\'ll help you understand your budget and make the most of your allocated funding.',
    category: 'funding',
    order: 9,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'What happens during a plan review?',
    answer: 'NDIS plan reviews typically occur annually or when your circumstances change. We can support you through this process by providing progress reports, helping identify new goals, and attending planning meetings with you if requested.',
    category: 'planning',
    order: 10,
    featured: false,
  },
];

async function seedFAQs() {
  console.log('🌱 Seeding FAQs to Sanity...');

  try {
    const results = [];
    for (const faq of faqs) {
      const result = await client.create(faq);
      results.push(result);
      console.log(`  ✅ Created: ${faq.question.substring(0, 50)}...`);
    }

    console.log(`\n✨ Successfully created ${results.length} FAQs in Sanity!`);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedFAQs();
