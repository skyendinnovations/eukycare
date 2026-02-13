import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const referralId = formData.get('referralId') as string;

    if (!referralId) {
      return NextResponse.json(
        { success: false, error: 'Referral ID is required' },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    // Fetch existing documents so we append rather than overwrite
    const { data: existing } = await supabase
      .from('referrals')
      .select('supporting_documents')
      .eq('id', referralId)
      .single();

    const existingDocs: string[] = existing?.supporting_documents || [];
    const uploadedPaths: string[] = [];
    const errors: string[] = [];

    // Upload each file to Supabase Storage
    for (const file of files) {
      try {
        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          errors.push(`${file.name}: File too large (max 10MB)`);
          continue;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
          errors.push(`${file.name}: Invalid file type (only PDF and DOC allowed)`);
          continue;
        }

        // Sanitize original filename and create storage path
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fileName = `${referralId}/${Date.now()}-${sanitizedName}`;

        // Convert File to ArrayBuffer then to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('referral-documents')
          .upload(fileName, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Supabase upload error:', error);
          errors.push(`${file.name}: ${error.message}`);
          continue;
        }

        // Store the storage path (NOT a public URL) so we can generate signed URLs later
        uploadedPaths.push(data.path);
      } catch (fileError: any) {
        console.error(`Error uploading ${file.name}:`, fileError);
        errors.push(`${file.name}: ${fileError.message}`);
      }
    }

    // Update referral record with document paths (append to existing)
    if (uploadedPaths.length > 0) {
      const allDocs = [...existingDocs, ...uploadedPaths];
      const { error: updateError } = await supabase
        .from('referrals')
        .update({ supporting_documents: allDocs })
        .eq('id', referralId);

      if (updateError) {
        console.error('Error updating referral with document paths:', updateError);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Files uploaded but failed to link to referral',
            uploadedPaths,
            errors 
          },
          { status: 500 }
        );
      }
    }

    if (errors.length > 0 && uploadedPaths.length === 0) {
      return NextResponse.json(
        { success: false, error: 'All file uploads failed', errors },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully uploaded ${uploadedPaths.length} file(s)`,
      uploadedCount: uploadedPaths.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
