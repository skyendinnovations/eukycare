# Vercel Hosting Guide — Euky Care

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- Your code pushed to a **GitHub** repository
- Your Supabase project already set up with all migrations applied

---

## Step 1 — Push to GitHub

If you haven't already, push your code to a GitHub repo:

```bash
cd ~/euky
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/euky.git
git push -u origin main
```

> ⚠️ Make sure `.env.local` is listed in `.gitignore` so your secrets are never committed.

---

## Step 2 — Import Project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your **euky** repo from the list
4. Vercel will auto-detect it as a **Next.js** project

---

## Step 3 — Configure Environment Variables

On the project setup page (or later in **Settings → Environment Variables**), add these:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xhwmpzrbhfoaytwlywip.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

> Copy these from your local `.env.local` file.

---

## Step 4 — Build Settings

Vercel auto-detects Next.js. Verify these settings:

| Setting | Value |
|---|---|
| Framework Preset | **Next.js** |
| Build Command | `next build` (auto-detected) |
| Output Directory | `.next` (auto-detected) |
| Install Command | `npm install` (or leave default) |

> No changes needed — the defaults work.

---

## Step 5 — Deploy

Click **"Deploy"**. Vercel will:
1. Install dependencies
2. Run `next build`
3. Deploy to a `.vercel.app` URL

First deploy takes 1–2 minutes.

---

## Step 6 — Custom Domain (Optional)

1. Go to your project → **Settings → Domains**
2. Add your domain (e.g., `eukycare.com.au`)
3. Update your domain's DNS:
   - **Option A (recommended):** Add a CNAME record pointing to `cname.vercel-dns.com`
   - **Option B:** Use Vercel's nameservers
4. Vercel auto-provisions an SSL certificate

---

## Step 7 — Verify Everything

After deployment, test these URLs:

| Page | URL |
|---|---|
| Homepage | `https://your-domain.vercel.app` |
| Admin Panel | `https://your-domain.vercel.app/studio` |
| Contact | `https://your-domain.vercel.app/contact` |
| FAQ | `https://your-domain.vercel.app/faq` |
| Referrals | `https://your-domain.vercel.app/referrals` |
| API Health | `https://your-domain.vercel.app/api/testimonials` |

---

## Automatic Deployments

Once connected, every `git push` to `main` will **automatically trigger a new deployment**. Vercel also creates **preview deployments** for pull requests.

---

## Troubleshooting

### Build fails
- Check Vercel build logs for errors
- Ensure all environment variables are set
- Run `next build` locally to reproduce

### Supabase connection issues
- Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel env vars
- Ensure Supabase RLS policies allow `anon` access
- Check that the `faqs` table has been created (run `003_add_faqs_table.sql`)

### 404 on pages
- Vercel uses file-based routing — make sure all page files exist
- Redeploy after adding new pages

### Admin panel not loading
- The admin panel uses `ssr: false` and loads fully client-side
- Check browser console for JS errors
- Password: `Euky@123`
