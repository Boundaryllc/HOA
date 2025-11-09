# AlphaCrate - Premium Engine Blocks E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 14+, designed specifically for AlphaCrate's engine block business. Features a complete shopping experience with Stripe payments, user accounts with discounts, and a comprehensive admin panel.

## Features

### Customer Features
- **Product Catalog** with advanced filtering (brand, category, price, sleeved blocks)
- **Shopping Cart** with persistent storage
- **Stripe Checkout Integration** for secure payments
- **User Authentication** (register/login with NextAuth.js)
- **Account Dashboard** with order history and profile management
- **Account-Specific Discounts** automatically applied at checkout
- **Responsive Design** optimized for mobile and desktop
- **Product Search** and filtering by Ford/Mazda platforms

### Admin Features
- **Product Management** (Create, Read, Update, Delete)
- **Order Management** and tracking
- **User Management** with discount assignment
- **Inventory Tracking**
- **Sales Analytics** (ready to extend)

### Technical Features
- **Next.js 14+** with App Router and React Server Components
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL
- **NextAuth.js** for authentication
- **Stripe** payment processing
- **Tailwind CSS** for styling
- **Optimized Images** with Next.js Image component

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ database
- Stripe account (for payments)
- npm or yarn package manager

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy the example environment file:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Update `.env.local` with your credentials:

\`\`\`env
# Database - Use your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/alphacrate"

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Stripe - Get from https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # For production webhooks

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AlphaCrate"
\`\`\`

### 3. Set Up the Database

Generate Prisma Client:

\`\`\`bash
npx prisma generate
\`\`\`

Run migrations to create database tables:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

Seed the database with sample products:

\`\`\`bash
npx prisma db seed
\`\`\`

This creates:
- 8 engine block products (Ford Coyote & Mazda)
- Admin account: `admin@alphacrate.com` / `admin123`
- Test customer: `customer@example.com` / `customer123` (with 10% discount)

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
alphacrate/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── products/       # Product CRUD
│   │   ├── cart/           # Shopping cart
│   │   ├── orders/         # Order management
│   │   └── stripe/         # Stripe webhooks
│   ├── auth/               # Auth pages (login, register)
│   ├── products/           # Product catalog pages
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout flow
│   ├── account/            # User dashboard
│   ├── admin/              # Admin panel
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Header, Footer
│   ├── products/           # Product components
│   ├── cart/               # Cart components
│   └── admin/              # Admin components
├── lib/                     # Utilities
│   ├── db.ts               # Prisma client
│   ├── stripe.ts           # Stripe client
│   ├── auth.ts             # NextAuth config
│   ├── utils.ts            # Helper functions
│   └── password.ts         # Password hashing
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── types/                   # TypeScript types
└── public/                  # Static assets
\`\`\`

## Database Schema

### Key Models

- **User**: Customer and admin accounts with roles and discount percentages
- **Product**: Engine blocks with specs, pricing, inventory
- **Brand**: Ford, Mazda, etc.
- **Category**: Standard blocks, sleeved blocks
- **Order**: Purchase orders with items and payment info
- **CartItem**: Shopping cart persistence
- **Session**: NextAuth session management

See \`prisma/schema.prisma\` for complete schema.

## Configuration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from [Dashboard > Developers > API Keys](https://dashboard.stripe.com/apikeys)
3. Use test keys for development (starts with \`pk_test_\` and \`sk_test_\`)
4. Add keys to \`.env.local\`

### Database Setup Options

**Option 1: Local PostgreSQL**
\`\`\`bash
# Install PostgreSQL, then create database
createdb alphacrate
\`\`\`

**Option 2: Cloud Database (Recommended for Production)**
- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)

### Admin Access

After seeding, log in with:
- Email: `admin@alphacrate.com`
- Password: `admin123`

**Important:** Change the admin password in production!

## Development

### Run Prisma Studio (Database GUI)

\`\`\`bash
npx prisma studio
\`\`\`

Opens a web interface at http://localhost:5555 to browse and edit database records.

### Add New Products

Two ways to add products:

1. **Through Admin Panel**: Log in as admin and use the web interface
2. **Through Prisma Studio**: Use the GUI to add records directly
3. **Extend Seed File**: Add to \`prisma/seed.ts\` and re-run seed

### Customize for Your Needs

- **Add Product Fields**: Update \`prisma/schema.prisma\` and run \`npx prisma migrate dev\`
- **Change Branding**: Update colors in \`tailwind.config.ts\` and \`app/layout.tsx\`
- **Add Categories**: Create new categories in admin panel or seed file
- **Configure Shipping**: Update logic in \`lib/utils.ts\`

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel will automatically:
- Build the Next.js app
- Set up continuous deployment
- Provide a production URL

### Database Migration for Production

\`\`\`bash
npx prisma migrate deploy
npx prisma db seed # Run once to populate initial data
\`\`\`

### Stripe Webhooks (Production)

1. Set up webhook endpoint in Stripe Dashboard:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
2. Add webhook secret to environment variables

## Extending the Platform

### Adding New Features

The codebase is structured for easy extension:

- **New Product Types**: Update schema and seed with new categories
- **Payment Options**: Integrate additional payment providers alongside Stripe
- **Shipping Providers**: Add shipping API integration
- **Email Notifications**: Add email service (SendGrid, Resend, etc.)
- **Product Reviews**: Extend Product model with Review relation
- **Wishlists**: Add Wishlist model and UI components

### API Routes

All API routes follow REST conventions:

- `GET /api/products` - List products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

## Support & Documentation

### Useful Commands

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma migrate dev # Create new migration
npx prisma db seed   # Seed database
\`\`\`

### Common Issues

**Database Connection Error:**
- Check DATABASE_URL in .env.local
- Ensure PostgreSQL is running
- Verify database exists

**Stripe Error:**
- Verify API keys are correct
- Check if using test vs live keys appropriately
- Ensure NEXT_PUBLIC prefix for publishable key

**Build Errors:**
- Run \`npx prisma generate\` after schema changes
- Clear \`.next\` folder: \`rm -rf .next\`
- Reinstall dependencies: \`rm -rf node_modules && npm install\`

## Next Steps

This is a foundation for your e-commerce platform. Additional pages and features can be built:

- Product detail pages
- Full shopping cart implementation
- Complete checkout flow
- Account dashboard
- Admin panel
- Order management

The architecture is in place - just extend the existing patterns!

## License

Proprietary - © 2025 AlphaCrate. All rights reserved.

---

Built with ❤️ for the racing community by AlphaCrate.
