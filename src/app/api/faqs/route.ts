import { NextResponse } from 'next/server';
import { getActiveFAQs } from '@/lib/database';

export async function GET() {
  try {
    const faqs = await getActiveFAQs();
    return NextResponse.json({ success: true, faqs: faqs || [] });
  } catch (error: any) {
    console.error('FAQs GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQs', faqs: [] },
      { status: 500 }
    );
  }
}
