EUKY_CARE_PLAN_NEXTJS.md
1. Project Identity
Company Name: Euky Care

Industry: NDIS Registered Provider

Primary Goal: SEO-optimized platform to facilitate disability support services and participant referrals.

Design Palette:

Primary Purple: #6A2875 (Brand Authority)

Secondary Green: #88BF45 (CTAs & Growth)

Base: #FFFFFF (White)

Text: #1A1A1A (Accessibility compliant)

2. Architecture & Tech Stack (SEO Optimized)
Framework: Next.js 15 (App Router)

Why: Server-Side Rendering (SSR) for instant SEO indexing.

CMS: Sanity.io (Headless)

Why: Decoupled content management for high-speed performance and easy service/blog updates.

Styling: Tailwind CSS

Why: Utility-first styling for optimized Core Web Vitals.

Form Management: React Hook Form + Zod

Why: Type-safe, high-performance validation for the multi-step referral system.

Backend Logic: Next.js Server Actions

Why: To securely handle form submissions without extra API overhead.

Deployment: Vercel

Why: Native Next.js support, global CDN, and automatic image optimization.

3. Sitemap & SEO Requirements
Home (/): Dynamic metadata with localized NDIS keywords.

About Us (/about): Static page highlighting the mission and team.

Services (/services/[slug]): * Dynamic Routes: Fetched from Sanity.io.

Categories: Accommodation, Support Services, Community Involvement.

NDIS FAQ (/faq): Accordion layout with Schema.org markup for Google search snippets.

Referrals (/referrals): Multi-step interactive client-side form.

Contact Us (/contact): Lead capture with Google Maps integration.

4. Data Schema: Multi-Step Referral Form
Step 1: Referrer Info (Name, Org, Role, Email, Phone, Consent) Step 2: Participant Details (Name, DOB, Gender, Disability, Address, Living Arrangement) Step 3: NDIS Plan (Number, Dates, Funding Type: NDIA/Plan/Self-Managed) Step 4: Service Selection (Multi-select: Accommodation, Nursing, Transport, etc.) Step 5: Context/Safety (Reason for Referral, Risk Alerts, Language Needs)

5. Technical Implementation Directives
A. Tailwind Config (brand integration)
TypeScript

// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        eukyPurple: '#6A2875',
        eukyGreen: '#88BF45',
      }
    }
  }
}
B. SEO & Accessibility (WCAG 2.1 AA)
Metadata API: Every page must include unique title and description exported via generateMetadata.

Semantic HTML: Use main, section, and article tags.

Contrast: High contrast text-to-background ratio (min 4.5:1).

C. CLI Development Sequence (Instructions for AI)
Initialize: npx create-next-app@latest with Tailwind and App Router.

Theme: Configure Brand Colors in tailwind.config.ts.

CMS Setup: Initialize sanity init to handle Service and Blog schemas.

Layout: Build the high-performance Navbar/Footer using Next.js Link and Image.

Referral Logic: Build the multi-step form state machine using useState and Server Actions.

SEO Audit: Implement JSON-LD structured data for the Home and Service pages.