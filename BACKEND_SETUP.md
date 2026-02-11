# Euky Care - Backend Setup Guide

## Overview

This document explains how to set up the backend connectivity for the Euky Care website. The backend uses **Supabase** as the database and authentication provider.

## Prerequisites

1. A Supabase account and project
2. Node.js 18+ installed
3. The Euky Care Next.js application

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **Settings > API**.

## Database Setup

### 1. Run the Migration

Navigate to your Supabase project dashboard and open the **SQL Editor**. Run the contents of the migration file:

```
/supabase/migrations/001_initial_schema.sql
```

This will create the following tables:
- `contact_submissions` - Contact form submissions
- `referrals` - NDIS referral form submissions
- `testimonials` - Customer testimonials/reviews
- `newsletter_subscriptions` - Newsletter email subscriptions

### 2. Tables Overview

#### Contact Submissions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Contact name |
| email | VARCHAR | Email address |
| phone | VARCHAR | Phone number (optional) |
| inquiry_type | VARCHAR | Type of inquiry |
| subject | VARCHAR | Message subject |
| message | TEXT | Message content |
| status | VARCHAR | 'new', 'read', 'responded' |
| created_at | TIMESTAMP | Submission date |

#### Referrals
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| referrer_* | Various | Referrer information |
| participant_* | Various | Participant details |
| ndis_* | Various | NDIS plan information |
| services_requested | TEXT[] | Array of requested services |
| status | VARCHAR | 'new', 'reviewing', 'accepted', 'declined' |

#### Testimonials
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Testimonial author name |
| role | VARCHAR | Author's role (e.g., "Participant") |
| quote | TEXT | Testimonial content |
| rating | INTEGER | Rating 1-5 |
| is_approved | BOOLEAN | Whether approved for display |

#### Newsletter Subscriptions
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | Email address (unique) |
| is_active | BOOLEAN | Subscription status |
| subscribed_at | TIMESTAMP | Subscription date |

## API Endpoints

### POST `/api/contact`
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0400123456",
  "inquiry_type": "general",
  "subject": "Question about services",
  "message": "Hello, I would like to know more..."
}
```

### POST `/api/referrals`
Submit an NDIS referral.

**Request Body:**
```json
{
  "referrer_name": "Dr. Jane Smith",
  "organization": "Melbourne Hospital",
  "referrer_role": "healthcare",
  "referrer_email": "jane@hospital.com",
  "referrer_phone": "0312345678",
  "has_consent": true,
  "participant_name": "John Doe",
  "date_of_birth": "1990-01-15",
  "primary_disability": "Intellectual Disability",
  "address": "123 Main St",
  "city": "Melbourne",
  "state": "VIC",
  "postcode": "3000",
  "living_arrangements": "alone",
  "ndis_number": "123456789",
  "funding_type": "plan-managed",
  "services_requested": ["sil", "community-participation"],
  "referral_reason": "Needs support with daily living..."
}
```

### GET `/api/testimonials`
Fetch approved testimonials.

**Response:**
```json
{
  "success": true,
  "testimonials": [
    {
      "id": "uuid",
      "name": "Sarah L",
      "role": "Participant",
      "quote": "The team has been incredible...",
      "rating": 5
    }
  ]
}
```

### POST `/api/testimonials`
Submit a new testimonial (requires admin approval).

### POST `/api/newsletter`
Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

## Row Level Security (RLS)

The database has RLS policies configured:

- **Anonymous users** can:
  - Insert contact submissions
  - Insert referrals
  - Insert testimonials (pending approval)
  - View approved testimonials
  - Subscribe to newsletter

- **Authenticated users** can:
  - Full access to all tables (for admin dashboard)

## Troubleshooting

### Forms not submitting
1. Check that environment variables are correctly set
2. Verify the Supabase project is active
3. Check browser console for errors
4. Verify RLS policies are correctly applied

### Testimonials not showing
1. Ensure testimonials have `is_approved = true`
2. Check API response in Network tab
3. Verify the testimonials table has data

## Admin Dashboard (Future)

For managing submissions, you can either:
1. Use Supabase's built-in Table Editor
2. Build a custom admin dashboard with authentication
3. Use a third-party admin tool like Forest Admin

## File Storage (Optional)

For document uploads with referrals, create a storage bucket in Supabase:

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `referral-documents`
3. Set the bucket to private
4. Configure RLS policies for authenticated access
