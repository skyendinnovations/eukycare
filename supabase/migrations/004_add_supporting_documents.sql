-- Add supporting documents column to referrals table
-- This will store an array of storage paths (NOT public URLs)

ALTER TABLE referrals 
ADD COLUMN IF NOT EXISTS supporting_documents TEXT[] DEFAULT '{}';

-- Add comment to describe the column
COMMENT ON COLUMN referrals.supporting_documents IS 'Array of Supabase Storage paths for uploaded supporting documents (NDIS Plans, Medical Reports, etc.)';

-- =====================================================
-- STORAGE SETUP (run in Supabase SQL Editor)
-- =====================================================
-- 1. First create the bucket in Dashboard > Storage > New Bucket
--    Name: referral-documents, Private: true
--
-- 2. Then run these storage policies:

-- Anyone can upload documents (for referral form submissions)
-- CREATE POLICY "Anyone can upload referral documents"
-- ON storage.objects FOR INSERT
-- TO anon, authenticated
-- WITH CHECK (bucket_id = 'referral-documents');

-- Anon can read documents (needed for signed URL generation with anon key)
-- CREATE POLICY "Allow reading referral documents"
-- ON storage.objects FOR SELECT
-- TO anon, authenticated
-- USING (bucket_id = 'referral-documents');

-- Only authenticated users can delete documents
-- CREATE POLICY "Authenticated users can delete referral documents"
-- ON storage.objects FOR DELETE
-- TO authenticated
-- USING (bucket_id = 'referral-documents');
