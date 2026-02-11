# Euky Care Website - Development TODO List

## Phase 1: Foundation

### 1. Setup Brand Theme & Base Configuration
- [x] Update tailwind.config.ts with Euky Care brand colors
  - eukyPurple: #6A2875
  - eukyGreen: #88BF45
- [x] Configure global CSS with accessibility-compliant text colors
- [x] Update favicon and metadata
- [x] Ensure WCAG 2.1 AA compliance

### 2. Create Core Layout Components
- [x] Build reusable Navbar component
  - Company logo
  - Navigation links (Home, About, Services, FAQ, Referrals, Contact)
  - Use Next.js Link for optimization
- [x] Build Footer component
  - Contact info and social links
  - Brand colors integration
- [x] Ensure responsive design for mobile/tablet/desktop
- [x] Use Next.js Image component for optimization

### 3. Setup Sanity.io CMS Integration
- [x] Initialize Sanity project with `sanity init`
- [x] Create schema for Services
  - title, slug, category, description, content
- [x] Create schema for Blog posts
- [x] Configure Sanity client in `src/lib/sanity.ts`
- [x] Setup data fetching utilities

---

## Phase 2: Core Pages

### 4. Build Home Page (/) with SEO
- [ ] Create dynamic hero section with CTA buttons (using eukyGreen)
- [ ] Add services overview section
- [ ] Add testimonials section
- [ ] Implement generateMetadata with localized NDIS keywords
- [ ] Add JSON-LD structured data for organization
- [ ] Optimize images and performance

### 5. Build About Us Page (/about)
- [ ] Create company mission section
- [ ] Add team section with photos
- [ ] Add company values section
- [ ] Optimize images with next/image
- [ ] Add proper metadata
- [ ] Use semantic HTML structure (main, section, article)

### 6. Build Dynamic Services Pages (/services/[slug])
- [ ] Create dynamic route handler
- [ ] Fetch service data from Sanity.io
- [ ] Display service categories:
  - Accommodation
  - Support Services
  - Community Involvement
- [ ] Implement generateStaticParams for SSG
- [ ] Add service-specific metadata
- [ ] Add structured data for each service

### 7. Build NDIS FAQ Page (/faq)
- [ ] Create accordion component for FAQ items
- [ ] Fetch FAQ data from Sanity or define statically
- [ ] Implement Schema.org FAQPage markup
- [ ] Ensure WCAG 2.1 AA compliance
- [ ] Add smooth animations for accordion

---

## Phase 3: Multi-Step Referral System

### 8. Build Multi-Step Referral Form - Part 1
- [ ] Create form state management (useState/useReducer)
- [ ] Setup React Hook Form with Zod validation
- [ ] Build progress indicator component
- [ ] Build Step 1: Referrer Info
  - Name
  - Organization
  - Role
  - Email
  - Phone
  - Consent checkbox
- [ ] Add validation and error handling

### 9. Build Multi-Step Referral Form - Part 2
- [ ] Build Step 2: Participant Details
  - Name
  - Date of Birth
  - Gender
  - Disability
  - Address
  - Living Arrangement
- [ ] Build Step 3: NDIS Plan
  - NDIS Number
  - Plan Dates (Start/End)
  - Funding Type (NDIA/Plan/Self-Managed)
- [ ] Add form validation and error handling
- [ ] Implement navigation between steps

### 10. Build Multi-Step Referral Form - Part 3
- [ ] Build Step 4: Service Selection
  - Multi-select checkboxes
  - Service options (Accommodation, Nursing, Transport, etc.)
- [ ] Build Step 5: Context/Safety
  - Reason for Referral
  - Risk Alerts
  - Language Needs
- [ ] Add review/summary step
- [ ] Implement Next.js Server Actions for form submission
- [ ] Add success/error handling
- [ ] Send confirmation email (optional)

---

## Phase 4: Additional Pages & Features

### 11. Build Contact Page (/contact)
- [ ] Create contact form with React Hook Form + Zod
- [ ] Add form fields (Name, Email, Phone, Message)
- [ ] Add Google Maps embed
- [ ] Display contact details (phone, email, address)
- [ ] Implement form submission with Server Actions
- [ ] Add success/error messages

### 12. Implement SEO & Accessibility Features
- [ ] Add generateMetadata to all pages
  - Unique titles and descriptions
  - Open Graph tags
  - Twitter Card tags
- [ ] Implement JSON-LD structured data
  - Organization
  - Service
  - FAQPage
- [ ] Ensure semantic HTML throughout
- [ ] Implement proper heading hierarchy (h1, h2, h3)
- [ ] Ensure WCAG 2.1 AA contrast ratios (4.5:1)
- [ ] Add alt text to all images
- [ ] Test with screen readers

### 13. Create Reusable UI Components
- [ ] Build Button component
  - Primary variant (eukyGreen)
  - Secondary variant (eukyPurple)
  - Loading state
- [ ] Build Card component
- [ ] Build Input component
- [ ] Build Select component
- [ ] Build Checkbox component
- [ ] Ensure accessibility (ARIA labels, keyboard navigation)
- [ ] Add proper TypeScript types

---

## Phase 5: Optimization & Launch

### 14. Optimize Performance & Core Web Vitals
- [ ] Optimize all images using next/image
- [ ] Implement lazy loading for below-fold content
- [ ] Minimize CSS/JS bundles
- [ ] Add loading states and suspense boundaries
- [ ] Test Lighthouse scores
- [ ] Improve LCP (Largest Contentful Paint)
- [ ] Improve FID (First Input Delay)
- [ ] Improve CLS (Cumulative Layout Shift)
- [ ] Add caching strategies

### 15. Setup Deployment & Testing
- [ ] Configure environment variables
  - Sanity credentials
  - Form submission endpoints
  - Google Maps API key
- [ ] Deploy to Vercel
- [ ] Setup automatic CI/CD
- [ ] Test all forms and submissions
- [ ] Test navigation and routing
- [ ] Test responsive design on multiple devices
- [ ] Verify SEO with Google Search Console
- [ ] Run Lighthouse audit
- [ ] Test accessibility with automated tools
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance testing

---

## Notes

- **Priority**: Follow the order of phases for best development flow
- **Testing**: Test each component/page before moving to the next
- **Accessibility**: Keep WCAG 2.1 AA compliance in mind throughout development
- **SEO**: Implement SEO best practices from the start, not as an afterthought
- **Performance**: Monitor Core Web Vitals during development

## Brand Colors
- **Primary Purple**: #6A2875 (Brand Authority)
- **Secondary Green**: #88BF45 (CTAs & Growth)
- **Base**: #FFFFFF (White)
- **Text**: #1A1A1A (Accessibility compliant)
