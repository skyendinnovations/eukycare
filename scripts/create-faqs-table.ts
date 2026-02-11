w/**
 * Run this script to create the FAQs table in Supabase.
 * Usage: bun run scripts/create-faqs-table.ts
 * 
 * NOTE: This uses the Supabase REST API via the anon key.
 * You must run the SQL in the Supabase Dashboard SQL Editor instead.
 * Go to: https://supabase.com/dashboard → SQL Editor → paste the contents of
 * supabase/migrations/003_add_faqs_table.sql → Run
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndSeed() {
  console.log('Checking if FAQs table exists...\n');

  // Try to query the faqs table
  const { data, error } = await supabase.from('faqs').select('id').limit(1);

  if (error) {
    console.error('❌ FAQs table does NOT exist yet!');
    console.error('   Error:', error.message);
    console.log('\n📋 To fix this:');
    console.log('   1. Go to your Supabase Dashboard → SQL Editor');
    console.log('   2. Paste the contents of: supabase/migrations/003_add_faqs_table.sql');
    console.log('   3. Click "Run"');
    console.log('\n   Dashboard URL: https://supabase.com/dashboard/project/xhwmpzrbhfoaytwlywip/sql');
    process.exit(1);
  }

  console.log('✅ FAQs table exists!');
  console.log(`   Found ${data?.length ?? 0} rows`);

  // Check total count
  const { count } = await supabase.from('faqs').select('*', { count: 'exact', head: true });
  console.log(`   Total FAQs: ${count}`);

  if (count === 0) {
    console.log('\n📝 Table is empty. Seeding default FAQs...');

    const seedFaqs = [
      { question: 'What is the NDIS?', answer: 'The National Disability Insurance Scheme (NDIS) is an Australian Government initiative that provides funding and support for people with permanent and significant disabilities. It aims to help participants achieve their goals, increase their independence, and participate in their community.', category: 'ndis-basics', display_order: 1, is_active: true },
      { question: 'Who is eligible for the NDIS?', answer: 'To be eligible for the NDIS, you must be under 65 years old when you first apply, be an Australian citizen, permanent resident, or hold a Protected Special Category Visa, and have a permanent and significant disability that affects your ability to take part in everyday activities.', category: 'ndis-basics', display_order: 2, is_active: true },
      { question: 'How do I apply for the NDIS?', answer: 'You can apply for the NDIS by contacting the National Disability Insurance Agency (NDIA) on 1800 800 110 or through their website. You\'ll need to complete an Access Request Form and provide evidence of your disability.', category: 'ndis-basics', display_order: 3, is_active: true },
      { question: 'What services does Euky Care provide?', answer: 'Euky Care provides a comprehensive range of NDIS services including Accommodation & Tenancy, Support Services, Community Involvement, Allied Health services, Plan Management, and Support Coordination.', category: 'euky-services', display_order: 4, is_active: true },
      { question: 'Is Euky Care a registered NDIS provider?', answer: 'Yes, Euky Care is a registered NDIS provider. This means we meet strict quality and safety standards set by the NDIS Quality and Safeguards Commission.', category: 'euky-services', display_order: 5, is_active: true },
      { question: 'How do I start receiving services from Euky Care?', answer: 'Getting started is easy! Contact us via phone, email, or our online referral form. We\'ll discuss your needs, review your NDIS plan, and create a service agreement.', category: 'euky-services', display_order: 6, is_active: true },
      { question: 'What funding categories are in an NDIS plan?', answer: 'NDIS plans typically include three main budget categories: Core Supports, Capital Supports, and Capacity Building Supports.', category: 'funding', display_order: 7, is_active: true },
      { question: 'What is Supported Independent Living (SIL)?', answer: 'Supported Independent Living (SIL) provides support for daily tasks for participants who live in shared arrangements or their own homes. It includes help with personal care, cooking, cleaning, and other daily activities.', category: 'accommodation', display_order: 8, is_active: true },
    ];

    const { error: insertError } = await supabase.from('faqs').insert(seedFaqs);
    if (insertError) {
      console.error('❌ Failed to seed FAQs:', insertError.message);
    } else {
      console.log('✅ Seeded 8 default FAQs!');
    }
  }
}

checkAndSeed().catch(console.error);
