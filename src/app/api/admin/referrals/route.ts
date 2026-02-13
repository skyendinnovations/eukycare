import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper: Generate signed URLs for supporting documents
async function addSignedUrls(referrals: any[]) {
  return Promise.all(
    referrals.map(async (referral) => {
      if (referral.supporting_documents && referral.supporting_documents.length > 0) {
        const signedDocs = await Promise.all(
          referral.supporting_documents.map(async (docPath: string) => {
            let storagePath = docPath;

            // If it's a full URL (legacy data), extract the storage path from it
            // URL format: https://xxx.supabase.co/storage/v1/object/public/referral-documents/PATH
            if (docPath.startsWith('http')) {
              const match = docPath.match(/\/referral-documents\/(.+)$/);
              if (match) {
                storagePath = decodeURIComponent(match[1]);
              } else {
                // Can't parse the URL, return it as-is with a warning
                const fileName = docPath.split('/').pop() || 'document';
                return { path: docPath, url: docPath, name: fileName };
              }
            }

            // Generate a signed URL valid for 1 hour
            const { data, error } = await supabase.storage
              .from('referral-documents')
              .createSignedUrl(storagePath, 3600);

            // Extract a readable filename from the path
            const segments = storagePath.split('/');
            const rawName = segments[segments.length - 1] || 'document';
            // Strip the timestamp prefix (e.g. "1707868800000-NDIS_Plan.pdf" -> "NDIS_Plan.pdf")
            const name = rawName.replace(/^\d+-/, '');

            return {
              path: storagePath,
              url: error ? null : data?.signedUrl,
              name,
            };
          })
        );
        return { ...referral, supporting_documents_signed: signedDocs };
      }
      return { ...referral, supporting_documents_signed: [] };
    })
  );
}

// GET: Fetch all referrals
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('referrals')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    // Generate signed URLs for any supporting documents
    const dataWithSignedUrls = data ? await addSignedUrls(data) : [];

    return NextResponse.json({
      success: true,
      data: dataWithSignedUrls,
      total: count,
      page,
      limit,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: Update a referral (e.g. change status, add notes)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('referrals')
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

// DELETE: Delete a referral
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('referrals')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
