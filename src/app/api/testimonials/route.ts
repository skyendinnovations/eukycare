import { NextResponse } from 'next/server';
import { getApprovedTestimonials, submitTestimonial } from '@/lib/database';

export async function GET() {
  try {
    const testimonials = await getApprovedTestimonials();
    return NextResponse.json({ success: true, testimonials: testimonials || [] });
  } catch (error: any) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials', testimonials: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'role', 'quote', 'rating'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate rating
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate quote length
    if (body.quote.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Quote must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Submit to database
    const result = await submitTestimonial({
      name: body.name,
      role: body.role,
      quote: body.quote,
      rating: body.rating,
      image_url: body.image_url || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your testimonial! It will be reviewed before publishing.' 
    });
  } catch (error: any) {
    console.error('Testimonial API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
