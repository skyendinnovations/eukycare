import { NextResponse } from 'next/server';
import { submitReferral } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required referrer fields
    const requiredReferrerFields = ['referrer_name', 'referrer_role', 'referrer_email', 'referrer_phone'];
    for (const field of requiredReferrerFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required referrer field: ${field.replace('referrer_', '')}` },
          { status: 400 }
        );
      }
    }

    // Validate required participant fields
    const requiredParticipantFields = ['participant_name', 'date_of_birth', 'primary_disability', 'address', 'city', 'state', 'postcode', 'living_arrangements'];
    for (const field of requiredParticipantFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required participant field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate required NDIS fields
    const requiredNDISFields = ['ndis_number', 'funding_type'];
    for (const field of requiredNDISFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required NDIS field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate required service fields
    if (!body.services_requested || body.services_requested.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one service must be selected' },
        { status: 400 }
      );
    }

    if (!body.referral_reason) {
      return NextResponse.json(
        { success: false, error: 'Referral reason is required' },
        { status: 400 }
      );
    }

    // Validate consent
    if (!body.has_consent) {
      return NextResponse.json(
        { success: false, error: 'Participant consent is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.referrer_email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid referrer email format' },
        { status: 400 }
      );
    }

    // Validate NDIS number format (should be 9 digits)
    const ndisRegex = /^\d{9}$/;
    if (!ndisRegex.test(body.ndis_number.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'NDIS number must be 9 digits' },
        { status: 400 }
      );
    }

    // Submit to database
    const result = await submitReferral({
      referrer_name: body.referrer_name,
      organization: body.organization || '',
      referrer_role: body.referrer_role,
      referrer_email: body.referrer_email,
      referrer_phone: body.referrer_phone,
      has_consent: body.has_consent,
      participant_name: body.participant_name,
      date_of_birth: body.date_of_birth,
      gender: body.gender || '',
      primary_disability: body.primary_disability,
      address: body.address,
      city: body.city,
      state: body.state,
      postcode: body.postcode,
      living_arrangements: body.living_arrangements,
      ndis_number: body.ndis_number.replace(/\s/g, ''),
      plan_start_date: body.plan_start_date || '',
      plan_end_date: body.plan_end_date || '',
      funding_type: body.funding_type,
      plan_manager_name: body.plan_manager_name || '',
      plan_manager_email: body.plan_manager_email || '',
      goals: body.goals || '',
      services_requested: body.services_requested,
      referral_reason: body.referral_reason,
      risk_factors: body.risk_factors || [],
      interpreter_required: body.interpreter_required || false,
      interpreter_language: body.interpreter_language || '',
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Referral submitted successfully',
      referralId: result.referralId 
    });
  } catch (error: any) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
