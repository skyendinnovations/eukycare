import { NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'inquiry_type', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
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
    const result = await submitContactForm({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      inquiry_type: body.inquiry_type,
      subject: body.subject,
      message: body.message,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
