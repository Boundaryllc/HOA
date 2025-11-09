# AlphaCrate - 5-Minute Deployment Guide

## Quick Deploy to Vercel

### 1. Deploy to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com) - Sign in with GitHub
2. Click **"Add New Project"**
3. Import `Boundaryllc/HOA` repository
4. **Important:** Set Root Directory to `alphacrate`
5. Click **Deploy**

### 2. Add Database (2 min)

**Recommended: Vercel Postgres**

In your Vercel project:
1. Go to **Storage** tab
2. Click **"Create Database"** → **"Postgres"**
3. Accept defaults and create
4. Vercel automatically adds `DATABASE_URL` to env vars

**Alternative: Neon (Free)**
1. Go to [neon.tech](https://neon.tech) and create account
2. Create new project
3. Copy connection string
4. Add to Vercel env vars

### 3. Add Environment Variables (1 min)

In Vercel: **Settings** → **Environment Variables**

Add these:

```env
# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=generate-a-secret-here
NEXTAUTH_URL=https://your-app.vercel.app

# Stripe (get from stripe.com/dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=AlphaCrate
```

After adding env vars, click **Redeploy** in Deployments tab.

### 4. Setup Database (from your local machine)

```bash
cd alphacrate

# Install Vercel CLI (if not installed)
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Seed sample data
npx prisma db seed
```

**Done!** Visit your Vercel URL and login with:
- Admin: `admin@alphacrate.com` / `admin123`
- Customer: `customer@example.com` / `customer123`

---

## Auto-Deploy Workflow

After initial setup, every time you push code:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push
```

Vercel automatically:
- ✅ Builds your app
- ✅ Creates preview deployment
- ✅ Gives you a unique URL
- ✅ Auto-deploys to production when merged

**No manual steps needed!**

---

## Quick Commands

```bash
# Local development
npm run dev

# Deploy to Vercel
git push

# View deployments
vercel ls

# View production logs
vercel logs

# Run production commands
vercel exec -- npx prisma studio
```

---

## Troubleshooting

**Build fails?**
- Check environment variables are set
- Ensure Root Directory = `alphacrate` in Vercel settings
- Verify DATABASE_URL is accessible

**Database connection error?**
- Run `npx prisma migrate deploy` after setting up database
- Check DATABASE_URL format includes `?sslmode=require` for cloud DBs

**Changes not showing?**
- Force redeploy in Vercel dashboard
- Clear browser cache
- Check deployment logs for errors

---

Ready to ship! 🚀
