-- =====================================================
-- MIGRATION 003: Add FAQs Table
-- =====================================================
-- FAQs were previously managed in Sanity CMS.
-- This migration moves them to Supabase for unified data management.

CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'general',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(display_order ASC);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Allow public to read active FAQs
CREATE POLICY "Allow public to read active faqs"
    ON faqs FOR SELECT
    TO anon
    USING (true);

-- Allow anon to insert (admin uses anon key)
CREATE POLICY "Allow anon to insert faqs"
    ON faqs FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anon to update
CREATE POLICY "Allow anon to update faqs"
    ON faqs FOR UPDATE
    TO anon
    USING (true);

-- Allow anon to delete
CREATE POLICY "Allow anon to delete faqs"
    ON faqs FOR DELETE
    TO anon
    USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED: Default FAQ Data
-- =====================================================
INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES
    ('What is the NDIS?', 'The National Disability Insurance Scheme (NDIS) is an Australian Government initiative that provides funding and support for people with permanent and significant disabilities. It aims to help participants achieve their goals, increase their independence, and participate in their community.', 'ndis-basics', 1, true),
    ('Who is eligible for the NDIS?', 'To be eligible for the NDIS, you must be under 65 years old when you first apply, be an Australian citizen, permanent resident, or hold a Protected Special Category Visa, and have a permanent and significant disability that affects your ability to take part in everyday activities.', 'ndis-basics', 2, true),
    ('How do I apply for the NDIS?', 'You can apply for the NDIS by contacting the National Disability Insurance Agency (NDIA) on 1800 800 110 or through their website. You''ll need to complete an Access Request Form and provide evidence of your disability.', 'ndis-basics', 3, true),
    ('What services does Euky Care provide?', 'Euky Care provides a comprehensive range of NDIS services including Accommodation & Tenancy, Support Services, Community Involvement, Allied Health services, Plan Management, and Support Coordination.', 'euky-services', 4, true),
    ('Is Euky Care a registered NDIS provider?', 'Yes, Euky Care is a registered NDIS provider. This means we meet strict quality and safety standards set by the NDIS Quality and Safeguards Commission.', 'euky-services', 5, true),
    ('How do I start receiving services from Euky Care?', 'Getting started is easy! Contact us via phone, email, or our online referral form. We''ll discuss your needs, review your NDIS plan, and create a service agreement.', 'euky-services', 6, true),
    ('What funding categories are in an NDIS plan?', 'NDIS plans typically include three main budget categories: Core Supports, Capital Supports, and Capacity Building Supports.', 'funding', 7, true),
    ('What is Supported Independent Living (SIL)?', 'Supported Independent Living (SIL) provides support for daily tasks for participants who live in shared arrangements or their own homes. It includes help with personal care, cooking, cleaning, and other daily activities.', 'accommodation', 8, true)
ON CONFLICT DO NOTHING;
