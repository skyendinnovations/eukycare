import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all FAQs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('faqs')
      .select('*', { count: 'exact' })
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
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

// POST: Create a new FAQ
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('faqs')
      .insert([{
        question: body.question,
        answer: body.answer,
        category: body.category || 'general',
        display_order: body.display_order || 0,
        is_active: body.is_active !== undefined ? body.is_active : true,
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Update an FAQ
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('faqs')
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

// DELETE: Delete an FAQ
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
