-- Seed script for Supabase testimonials
-- Run this in your Supabase SQL Editor

-- Clear existing testimonials (optional)
-- DELETE FROM testimonials;

-- Insert dummy testimonials
INSERT INTO testimonials (name, role, quote, rating, is_approved, image_url) VALUES
('Sarah Johnson', 'Participant', 'The support team has transformed my daily life. Their understanding approach and personalized care have helped me gain independence I never thought possible. I feel valued and heard every single day.', 5, true, null),
('Michael Chen', 'Participant', 'From the first meeting, I knew I was in good hands. The staff are professional, caring, and genuinely invested in my wellbeing. They helped me achieve goals that seemed impossible before.', 5, true, null),
('Priya Patel', 'Family Member', 'Watching my daughter thrive with their support has been incredible. The team communicates clearly, respects our wishes, and goes above and beyond to ensure she''s happy and progressing toward her goals.', 5, true, null),
('James Williams', 'Participant', 'I''ve tried other providers, but none compare to the dedication and expertise here. They take time to understand my needs and adapt services as my goals evolve. Truly person-centered care.', 5, true, null),
('Emma Thompson', 'Participant', 'The difference in my confidence and independence since starting with this team is remarkable. They make me feel empowered to live my best life, not limited by my disability.', 5, true, null),
('David Martinez', 'Support Coordinator', 'As a support coordinator, I''ve referred many clients here. The quality of care, professionalism, and genuine commitment to participant outcomes is consistently outstanding. Highly recommend.', 5, true, null),
('Lily Nguyen', 'Participant', 'Every support worker I''ve had has been kind, patient, and skilled. They help me with daily tasks while encouraging me to do as much as I can independently. Perfect balance of support and empowerment.', 5, true, null),
('Robert Anderson', 'Participant', 'The team helped me transition from living with family to my own place. Their guidance, practical support, and encouragement made what seemed scary into an exciting new chapter of my life.', 5, true, null),
('Sophia Lee', 'Family Member', 'My son looks forward to his support sessions. The workers build genuine relationships and make activities fun while working on his goals. We''re so grateful for their dedication.', 5, true, null),
('Daniel O''Brien', 'Participant', 'After years of struggling to find the right support, I finally found a team that gets it. They respect my choices, support my goals, and celebrate my achievements. I couldn''t ask for more.', 5, true, null)
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT COUNT(*) as total_testimonials FROM testimonials WHERE is_approved = true;
