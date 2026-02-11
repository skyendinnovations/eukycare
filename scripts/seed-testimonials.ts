// Seed script to insert dummy testimonials into Supabase
// Run with: bun run scripts/seed-testimonials.ts

import { createClient } from '@supabase/supabase-js';

// Read from .env.local manually
const envFile = await Bun.file('.env.local').text();
const supabaseUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1]?.trim();
const supabaseAnonKey = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Participant',
    quote: 'The support team has transformed my daily life. Their understanding approach and personalized care have helped me gain independence I never thought possible. I feel valued and heard every single day.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'Michael Chen',
    role: 'Participant',
    quote: 'From the first meeting, I knew I was in good hands. The staff are professional, caring, and genuinely invested in my wellbeing. They helped me achieve goals that seemed impossible before.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'Priya Patel',
    role: 'Family Member',
    quote: 'Watching my daughter thrive with their support has been incredible. The team communicates clearly, respects our wishes, and goes above and beyond to ensure she\'s happy and progressing toward her goals.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'James Williams',
    role: 'Participant',
    quote: 'I\'ve tried other providers, but none compare to the dedication and expertise here. They take time to understand my needs and adapt services as my goals evolve. Truly person-centered care.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'Emma Thompson',
    role: 'Participant',
    quote: 'The difference in my confidence and independence since starting with this team is remarkable. They make me feel empowered to live my best life, not limited by my disability.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'David Martinez',
    role: 'Support Coordinator',
    quote: 'As a support coordinator, I\'ve referred many clients here. The quality of care, professionalism, and genuine commitment to participant outcomes is consistently outstanding. Highly recommend.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'Lily Nguyen',
    role: 'Participant',
    quote: 'Every support worker I\'ve had has been kind, patient, and skilled. They help me with daily tasks while encouraging me to do as much as I can independently. Perfect balance of support and empowerment.',
    rating: 5,
    is_approved: true,
  },
  {
    name: 'Robert Anderson',
    role: 'Participant',
    quote: 'The team helped me transition from living with family to my own place. Their guidance, practical support, and encouragement made what seemed scary into an exciting new chapter of my life.',
    rating: 5,
    is_approved: true,
  },
];

async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');

  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonials)
    .select();

  if (error) {
    console.error('❌ Error inserting testimonials:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully inserted ${data?.length || 0} testimonials`);
  
  // Verify count
  const { count } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true);

  console.log(`📊 Total approved testimonials in database: ${count}`);
}

seedTestimonials();
