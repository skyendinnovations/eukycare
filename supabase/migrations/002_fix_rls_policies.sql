-- =====================================================
-- MIGRATION 002: Fix RLS Policies for Admin Access
-- =====================================================
-- This migration updates RLS policies to allow the anon key 
-- to perform admin operations. In production, you should 
-- implement proper authentication and use the service_role key 
-- or Supabase Auth for admin access.

-- =====================================================
-- CONTACT SUBMISSIONS - Allow full CRUD for anon (admin uses anon key)
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated to view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated to update contact submissions" ON contact_submissions;

CREATE POLICY "Allow anon to view contact submissions"
    ON contact_submissions FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon to update contact submissions"
    ON contact_submissions FOR UPDATE
    TO anon
    USING (true);

CREATE POLICY "Allow anon to delete contact submissions"
    ON contact_submissions FOR DELETE
    TO anon
    USING (true);

-- =====================================================
-- REFERRALS - Allow full CRUD for anon
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated to view referrals" ON referrals;
DROP POLICY IF EXISTS "Allow authenticated to update referrals" ON referrals;

CREATE POLICY "Allow anon to view referrals"
    ON referrals FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon to update referrals"
    ON referrals FOR UPDATE
    TO anon
    USING (true);

CREATE POLICY "Allow anon to delete referrals"
    ON referrals FOR DELETE
    TO anon
    USING (true);

-- =====================================================
-- TESTIMONIALS - Allow full CRUD for anon (remove approved-only restriction)
-- =====================================================
DROP POLICY IF EXISTS "Allow public to view approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access to testimonials" ON testimonials;

-- Separate SELECT policy: allow anon to see all testimonials (for admin dashboard)
CREATE POLICY "Allow anon to view all testimonials"
    ON testimonials FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon to update testimonials"
    ON testimonials FOR UPDATE
    TO anon
    USING (true);

CREATE POLICY "Allow anon to delete testimonials"
    ON testimonials FOR DELETE
    TO anon
    USING (true);

-- =====================================================
-- NEWSLETTER SUBSCRIPTIONS - Allow full access for admin
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated to view subscriptions" ON newsletter_subscriptions;

CREATE POLICY "Allow anon to view subscriptions"
    ON newsletter_subscriptions FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anon to delete subscriptions"
    ON newsletter_subscriptions FOR DELETE
    TO anon
    USING (true);
