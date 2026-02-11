-- Euky Care Database Schema
-- Run this in your Supabase SQL editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    inquiry_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- =====================================================
-- REFERRALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Referrer Information
    referrer_name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    referrer_role VARCHAR(100) NOT NULL,
    referrer_email VARCHAR(255) NOT NULL,
    referrer_phone VARCHAR(50) NOT NULL,
    has_consent BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Participant Details
    participant_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50),
    primary_disability VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    living_arrangements VARCHAR(255) NOT NULL,
    
    -- NDIS Plan Information
    ndis_number VARCHAR(20) NOT NULL,
    plan_start_date DATE,
    plan_end_date DATE,
    funding_type VARCHAR(100) NOT NULL,
    plan_manager_name VARCHAR(255),
    plan_manager_email VARCHAR(255),
    goals TEXT,
    
    -- Service Requirements
    services_requested TEXT[] NOT NULL DEFAULT '{}',
    referral_reason TEXT NOT NULL,
    risk_factors TEXT[] DEFAULT '{}',
    interpreter_required BOOLEAN DEFAULT FALSE,
    interpreter_language VARCHAR(100),
    
    -- Meta
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'accepted', 'declined')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON referrals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_ndis_number ON referrals(ndis_number);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fetching approved testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved) WHERE is_approved = TRUE;

-- =====================================================
-- NEWSLETTER SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Index for active subscriptions
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active) WHERE is_active = TRUE;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Contact Submissions: Allow insert for anonymous users, select only for authenticated
CREATE POLICY "Allow public to insert contact submissions"
    ON contact_submissions FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated to view contact submissions"
    ON contact_submissions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated to update contact submissions"
    ON contact_submissions FOR UPDATE
    TO authenticated
    USING (true);

-- Referrals: Allow insert for anonymous users, full access for authenticated
CREATE POLICY "Allow public to insert referrals"
    ON referrals FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated to view referrals"
    ON referrals FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated to update referrals"
    ON referrals FOR UPDATE
    TO authenticated
    USING (true);

-- Testimonials: Allow insert for anonymous, select approved for all, full access for authenticated
CREATE POLICY "Allow public to insert testimonials"
    ON testimonials FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow public to view approved testimonials"
    ON testimonials FOR SELECT
    TO anon
    USING (is_approved = true);

CREATE POLICY "Allow authenticated full access to testimonials"
    ON testimonials FOR ALL
    TO authenticated
    USING (true);

-- Newsletter: Allow insert/update for anonymous (subscription management)
CREATE POLICY "Allow public to manage newsletter subscriptions"
    ON newsletter_subscriptions FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Allow public to update their subscription"
    ON newsletter_subscriptions FOR UPDATE
    TO anon
    USING (true);

CREATE POLICY "Allow authenticated to view subscriptions"
    ON newsletter_subscriptions FOR SELECT
    TO authenticated
    USING (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update trigger to all tables
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at
    BEFORE UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample testimonials (approved)
INSERT INTO testimonials (name, role, quote, rating, is_approved) VALUES
    ('Sarah L', 'Participant', 'The team has been incredible! They really understand my needs and provide support that makes daily life so much easier. I feel more independent and confident than ever.', 5, true),
    ('James K', 'Participant', 'The team truly understands my needs. Their personalised support makes daily tasks easier and gives me confidence to participate more in my community.', 5, true),
    ('Priya M', 'Participant', 'They guided me through the NDIS process and provided support tailored to my goals. I feel empowered, independent, and in control of my daily life.', 5, true),
    ('Michael T', 'Participant', 'I couldn''t be happier with the care and attention I receive. The support workers are friendly, professional, and always go the extra mile.', 5, true),
    ('Emma W', 'Participant', 'From day one, the team made me feel heard and respected. Their person-centered approach has helped me achieve goals I never thought possible.', 5, true)
ON CONFLICT DO NOTHING;
