import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Submit to database
    const result = await subscribeToNewsletter(body.email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });
  } catch (error: any) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
