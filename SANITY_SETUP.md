# Sanity CMS Setup Guide

This project uses Sanity.io as a headless CMS. Follow these steps to set up your Sanity Studio:

## Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io/](https://www.sanity.io/)
2. Sign up for a free account
3. Create a new project

## Step 2: Get Your Project Credentials

After creating your project, you'll need:
- **Project ID**: Found in your project settings
- **Dataset**: Usually "production"

## Step 3: Add Environment Variables

Create or update your `.env.local` file with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 4: Sanity Schema Structure

Your Sanity Studio should include the following schemas:

### Service Schema
```javascript
{
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Support Services', value: 'support' },
          { title: 'Community Involvement', value: 'community' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name for display'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage'
    }
  ]
}
```

### FAQ Schema
```javascript
{
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'General',
          'NDIS',
          'Services',
          'Referrals'
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

### Blog Post Schema
```javascript
{
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}
```

## Step 5: Initialize Sanity Studio (Optional)

If you want to run Sanity Studio locally:

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity in a separate folder
mkdir sanity-studio
cd sanity-studio
sanity init

# Deploy your studio
sanity deploy
```

## Step 6: Access Your Studio

Once deployed, you can access your Sanity Studio at:
`https://your-project-name.sanity.studio/`

## Alternative: Use Sanity Management

You can also manage content directly at:
`https://www.sanity.io/manage`

## Sample Data

Add some sample services to test:

1. **Supported Independent Living**
   - Category: Accommodation
   - Description: Quality supported independent living arrangements

2. **In-Home Support**
   - Category: Support Services
   - Description: Professional in-home care and assistance

3. **Community Participation**
   - Category: Community Involvement
   - Description: Programs for social engagement and community connection

## Notes

- Make sure to set the correct CORS origins in Sanity project settings
- Add your production and localhost URLs
- Enable the Vision plugin for testing queries
