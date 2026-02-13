# Supporting Documents Implementation Summary

## ✅ What Has Been Implemented

### 1. Database Schema
- **File**: `supabase/migrations/004_add_supporting_documents.sql`
- Added `supporting_documents` column to `referrals` table (TEXT[] array)
- Column stores array of document URLs from Supabase Storage

### 2. Frontend - Referrals Form
- **File**: `src/app/referrals/page.tsx`
- **Changes**:
  - Added file upload UI with drag-and-drop zone
  - File validation (PDF, DOC, DOCX only, max 10MB)
  - Display uploaded files with size and remove option
  - Error handling for invalid files
  - Upload files after referral creation

### 3. Backend - Upload API
- **File**: `src/app/api/referrals/upload/route.ts` (NEW)
- **Features**:
  - Accepts multiple file uploads via FormData
  - Validates file type and size
  - Uploads to Supabase Storage bucket `referral-documents`
  - Generates unique file names with timestamp
  - Updates referral record with document URLs
  - Returns success/error status for each file

### 4. Admin Panel
- **File**: `src/app/admin/page.tsx`
- **Changes**:
  - Added `supporting_documents` field to Referral interface
  - Display documents section in referral details
  - Clickable links to view/download documents
  - Visual file icons and external link indicators

### 5. Documentation
- **Files**:
  - `SUPPORTING_DOCUMENTS_SETUP.md` - Comprehensive setup guide
  - `scripts/setup-supporting-documents.sh` - Quick setup script

## 🔧 Setup Required (One-Time)

You need to complete these steps in your Supabase dashboard:

### Step 1: Create Storage Bucket
```
Dashboard → Storage → New Bucket
Name: referral-documents
Type: Private
```

### Step 2: Run Database Migration
```sql
ALTER TABLE referrals 
ADD COLUMN IF NOT EXISTS supporting_documents TEXT[] DEFAULT '{}';
```

### Step 3: Set Storage Policies
```sql
-- Upload policy
CREATE POLICY "Anyone can upload referral documents"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'referral-documents');

-- View policy
CREATE POLICY "Authenticated users can view referral documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'referral-documents');

-- Delete policy
CREATE POLICY "Authenticated users can delete referral documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'referral-documents');
```

## 📋 How It Works

### User Journey
1. User visits `/referrals` page
2. Fills out referral form
3. Uploads supporting documents (NDIS Plan, Medical Reports, etc.)
4. Clicks "Submit Referral"
5. System creates referral → uploads files → links files to referral
6. User sees success message

### Admin Journey
1. Admin visits `/admin` page
2. Navigates to "Referrals" tab
3. Clicks on a referral to expand details
4. Sees "Supporting Documents" section with clickable file links
5. Clicks link to view/download document in new tab

### Technical Flow
```
User uploads files
    ↓
Referral created in database (returns ID)
    ↓
Files uploaded to Supabase Storage
    ↓
Document URLs saved to referral.supporting_documents[]
    ↓
Admin can view documents via URLs
```

## 🔒 Security Features

1. **File Type Validation**: Only PDF and DOC/DOCX files allowed
2. **File Size Limit**: Maximum 10MB per file
3. **Private Storage**: Bucket is private, not publicly accessible
4. **Organized Storage**: Files grouped by referral ID
5. **Access Control**: Only authenticated users can view documents

## 📁 File Storage Structure

```
referral-documents/
  ├── {referral-uuid-1}/
  │   ├── 1707868800000-abc123.pdf
  │   └── 1707868900000-def456.docx
  ├── {referral-uuid-2}/
  │   └── 1707869000000-ghi789.pdf
  └── ...
```

## ✅ Testing Checklist

- [ ] Create storage bucket in Supabase
- [ ] Run database migration
- [ ] Set up storage policies
- [ ] Test file upload on referral form
  - [ ] Upload valid PDF file
  - [ ] Upload valid DOC file
  - [ ] Try uploading file > 10MB (should fail)
  - [ ] Try uploading invalid file type (should fail)
- [ ] Submit referral with documents
- [ ] Check admin panel
  - [ ] Expand referral details
  - [ ] Verify documents are displayed
  - [ ] Click document link (should open in new tab)
- [ ] Verify files in Supabase Storage dashboard

## 🎯 What's Next (Optional Enhancements)

- [ ] Add image file support (.jpg, .png)
- [ ] Implement file preview/viewer
- [ ] Add file compression before upload
- [ ] Batch download all documents for a referral
- [ ] Allow admins to delete documents
- [ ] Add document upload progress indicator
- [ ] Implement virus scanning for uploaded files

## 📝 Quick Setup Command

Run this to see setup instructions:
```bash
bash scripts/setup-supporting-documents.sh
```

## 📖 Files Modified/Created

**New Files:**
- `src/app/api/referrals/upload/route.ts`
- `supabase/migrations/004_add_supporting_documents.sql`
- `SUPPORTING_DOCUMENTS_SETUP.md`
- `scripts/setup-supporting-documents.sh`
- `scripts/run-migration.ts`

**Modified Files:**
- `src/app/referrals/page.tsx`
- `src/app/admin/page.tsx`

## 🐛 Troubleshooting

**Files not uploading?**
- Check if storage bucket `referral-documents` exists
- Verify storage policies are set correctly
- Check browser console for errors

**Documents not showing in admin?**
- Verify `supporting_documents` column exists in database
- Check if files were uploaded to storage
- Ensure referral record was updated with URLs

**Permission errors?**
- Check storage bucket is private
- Verify RLS policies on storage.objects table
- Ensure anon key has upload permissions

---

All features are implemented and ready to use after completing the one-time setup in Supabase! 🎉
