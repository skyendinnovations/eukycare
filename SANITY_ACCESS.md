# Sanity Studio Access Guide

## ✅ Schema Setup Complete!

Your Sanity Studio is now configured with the following schemas:
- **Services** - NDIS services catalog
- **FAQs** - Frequently asked questions
- **Blog Posts** - Blog content management

## How to Access Sanity Studio

### Option 1: Local Studio (Recommended for Development)
1. Make sure your dev server is running: `bun run dev`
2. Open your browser and go to: **http://localhost:3000/studio**
3. Sign in with your Sanity account credentials
4. You can now create and manage content!

### Option 2: Sanity.io Web Interface
1. Go to https://www.sanity.io/manage
2. Select your project: **iw7lvkny**
3. Click on "Vision" or "Desk" to access the content

## Schema Overview

### 📋 Services
Create NDIS services with:
- Title and slug
- Category (Accommodation, Support Services, Community Involvement)
- Description and full content
- Images
- Featured flag
- Display order

### ❓ FAQs
Manage FAQs with:
- Question and answer
- Category (NDIS Basics, Our Services, Getting Started, etc.)
- Display order
- Published status

### 📝 Blog Posts
Create blog content with:
- Title and slug
- Author information
- Main image
- Excerpt and full body
- Categories
- Published status

## Quick Start

### Creating Your First Service
1. Go to http://localhost:3000/studio
2. Click on "Services" in the left sidebar
3. Click "Create new document"
4. Fill in the details:
   - **Title**: e.g., "Supported Independent Living"
   - **Slug**: Click "Generate" button
   - **Category**: Select from dropdown
   - **Description**: Short description (max 200 chars)
   - **Content**: Full rich text content
5. Click "Publish"

### Creating FAQs
1. Go to http://localhost:3000/studio
2. Click on "FAQs" in the left sidebar
3. Create new FAQ
4. Fill in question, answer, and category
5. Set display order (lower numbers appear first)
6. Publish

## Using Content in Your Website

The content is automatically available through the Sanity client configured in `/src/lib/sanity.ts`.

Example queries already set up:
```typescript
import { getServices, getFAQs } from '@/lib/sanity';

// Fetch all services
const services = await getServices();

// Fetch FAQs
const faqs = await getFAQs();
```

## Troubleshooting

### Can't access /studio
- Make sure dev server is running: `bun run dev`
- Check that your Sanity project ID is correct in `.env.local`
- Clear browser cache and try again

### Authentication issues
- Make sure you're signed in to Sanity.io with the same account
- Check that the project ID matches your Sanity project

### Schema not showing up
- The schema is embedded in your Next.js app at `/studio`
- No need to deploy schema separately when using embedded studio
- Changes to schema files require restarting the dev server

## Next Steps

1. ✅ Access http://localhost:3000/studio
2. ✅ Sign in with your Sanity credentials
3. ✅ Create your first service or FAQ
4. ✅ View the content on your website

Your Sanity CMS is ready to use! 🎉
