import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all testimonials (including unapproved ones for admin review)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('testimonials')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (approved !== null && approved !== '') {
      query = query.eq('is_approved', approved === 'true');
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      total: count,
      page,
      limit,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create a new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, quote, rating, is_approved, image_url } = body;

    if (!name || !quote) {
      return NextResponse.json({ success: false, error: 'Name and quote are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert({ name, role: role || 'Participant', quote, rating: rating || 5, is_approved: is_approved ?? false, image_url: image_url || null })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Update a testimonial (approve/reject, edit content)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a testimonial
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
