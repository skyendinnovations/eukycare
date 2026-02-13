# Supporting Documents Setup Guide

## Overview
This guide explains how to set up file upload functionality for supporting documents in referrals.

## What's Been Implemented

### 1. Database Changes
- Added `supporting_documents` column to `referrals` table (TEXT[] array)
- Migration file: `supabase/migrations/004_add_supporting_documents.sql`

### 2. Frontend Changes (Referrals Page)
- File upload UI with drag-and-drop support
- File validation (PDF, DOC, DOCX, max 10MB)
- Display uploaded files before submission
- Files are uploaded after referral is created

### 3. API Changes
- Created `/api/referrals/upload` endpoint for file uploads
- Updated referral submission to return `referralId`
- Files are stored in Supabase Storage and URLs are saved to database

### 4. Admin Panel Changes
- Display supporting documents in referral details
- Documents are shown as clickable links with file icons
- Opens documents in new tab

## Supabase Storage Setup

### Step 1: Create Storage Bucket
1. Go to Supabase Dashboard → Storage
2. Click "New bucket"
3. Bucket name: `referral-documents`
4. Set as **Private** (not public) for security
5. Click "Create bucket"

### Step 2: Set Up Storage Policies

Run these in Supabase SQL Editor:

```sql
-- Allow anyone to upload documents (for referral form submissions)
CREATE POLICY "Anyone can upload referral documents"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'referral-documents');

-- Allow reading documents (needed for signed URL generation with anon key)
CREATE POLICY "Allow reading referral documents"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'referral-documents');

-- Allow deletion of documents (admin cleanup)
CREATE POLICY "Allow deleting referral documents"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'referral-documents');
```

### Step 3: Run Database Migration

Run the migration to add the column:

```bash
# If using Supabase CLI
supabase db push

# OR manually run in Supabase SQL Editor:
# Copy contents of supabase/migrations/004_add_supporting_documents.sql
```

## How It Works

### User Flow
1. User fills out referral form on `/referrals` page
2. User uploads supporting documents (NDIS Plan, Medical Reports, etc.)
3. On form submission:
   - Referral is created in database
   - Files are uploaded to Supabase Storage
   - Document URLs are saved to `supporting_documents` array in referral record
4. Admin can view and download documents in admin panel

### File Storage Structure
```
referral-documents/
  └── {referralId}/
      ├── {timestamp}-{random}.pdf
      ├── {timestamp}-{random}.docx
      └── {timestamp}-{random}.doc
```

### Security Features
- File type validation (only PDF and DOC files)
- File size limit (10MB per file)
- Files organized by referral ID
- Private bucket (requires authentication to access)
- URLs are signed and secure

## Testing

### Test File Upload
1. Go to http://localhost:3000/referrals
2. Fill out the referral form
3. Upload test documents (PDF or DOC files under 10MB)
4. Submit the form
5. Check admin panel to see uploaded documents

### Verify in Supabase
1. Go to Supabase Dashboard → Storage → referral-documents
2. You should see folders named with referral UUIDs
3. Inside each folder, you'll see the uploaded files

## Troubleshooting

### Files not uploading?
- Check if storage bucket exists and is named correctly
- Verify storage policies are set up
- Check browser console for errors
- Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in environment

### Files not showing in admin panel?
- Check if `supporting_documents` column exists in referrals table
- Run migration 004 if column is missing
- Verify files were uploaded successfully in Supabase Storage

### Permission errors?
- Ensure storage policies allow anonymous INSERT and authenticated SELECT
- Check RLS policies on referrals table

## Environment Variables

Make sure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## File Types Supported
- PDF (.pdf)
- Microsoft Word (.doc, .docx)

## File Size Limit
- Maximum 10MB per file
- Multiple files can be uploaded

## Future Enhancements
- Add image file support (.jpg, .png)
- Implement file preview
- Add file compression
- Batch file download for admins
- File deletion capability for admins
