# Fixing Sanity CORS Error

## Quick Fix

You need to add `http://localhost:3000` to your Sanity project's CORS origins.

### Method 1: Via Sanity Management Console (Recommended)

1. Go to https://www.sanity.io/manage
2. Select your project (ID: `iw7lvkny`)
3. Click on **API** in the left sidebar
4. Scroll down to **CORS Origins**
5. Click **Add CORS origin**
6. Enter: `http://localhost:3000`
7. Check **Allow credentials**
8. Click **Save**

### Method 2: Add Multiple Origins at Once

Add these origins to support development and production:

- `http://localhost:3000` (for local development)
- `http://localhost:3001` (backup port)
- Your production domain (when you deploy)

### After Adding CORS Origin

1. Refresh your browser at http://localhost:3000/studio
2. You should now be able to access the Sanity Studio
3. Sign in with your Sanity credentials

## Why This Happens

Sanity requires explicit CORS origin configuration for security. Each origin (domain/port) that accesses your Sanity project must be whitelisted in the project settings.

## Verify Setup

Once added, refresh http://localhost:3000/studio and the CORS error should be gone.
