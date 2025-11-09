# AlphaCrate - Quick Start Guide

Get your AlphaCrate e-commerce platform running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Stripe account (free test mode)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database and Stripe credentials.

**Generate NextAuth Secret:**
```bash
openssl rand -base64 32
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Load sample products and users
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Test Accounts

**Admin Account:**
- Email: `admin@alphacrate.com`
- Password: `admin123`
- Access: Full admin panel

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`
- Special: 10% discount applied automatically

## Sample Products Included

- 4x Ford Coyote blocks (5.0L & 5.2L, standard & sleeved)
- 4x Mazda blocks (13B Rotary, Skyactiv-G)
- All products have realistic specs and pricing

## Quick Configuration

### Using a Cloud Database

**Vercel Postgres (Recommended):**
1. Create database at vercel.com/storage
2. Copy connection string
3. Update DATABASE_URL in .env.local

**Supabase:**
1. Create project at supabase.com
2. Get connection string from Settings > Database
3. Update DATABASE_URL (add `?pgbouncer=true` for pooling)

### Stripe Test Mode

1. Get test keys from stripe.com/dashboard
2. Use keys starting with `pk_test_` and `sk_test_`
3. Test cards: `4242 4242 4242 4242` (any future date, any CVC)

## Database Management

**View/Edit Database:**
```bash
npx prisma studio
```
Opens GUI at http://localhost:5555

**Reset Database:**
```bash
npx prisma migrate reset
```
This will clear all data and re-run seeds.

## Next Steps

1. **Customize Branding**: Update colors in tailwind.config.ts
2. **Add Products**: Use admin panel or Prisma Studio
3. **Test Checkout**: Create test orders with Stripe test cards
4. **Deploy**: Push to Vercel for instant hosting

## Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npx prisma studio    # Open database GUI
npx prisma db seed   # Reload sample data
```

## Need Help?

See the full README.md for:
- Complete architecture details
- API documentation
- Deployment guide
- Troubleshooting
- Extension guides

---

Ready to race? Start the dev server and visit http://localhost:3000! 🏁
