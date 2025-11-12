# Production Migration Guide: SQLite → PostgreSQL

**Status:** Currently using SQLite for local development  
**Goal:** Migrate to PostgreSQL for production deployment  
**Estimated Time:** 2-3 hours (including testing)

---

## 📋 **Quick Reference**

| Environment | Database | Provider | Status |
|-------------|----------|----------|--------|
| **Local Dev** | SQLite (`dev.db`) | sqlite | ✅ Current |
| **Staging** | PostgreSQL | postgresql | 🔄 To Setup |
| **Production** | PostgreSQL | postgresql | 🔄 To Setup |

---

## 🚀 **Migration Checklist**

### **Phase 1: Preparation** ⏱️ 30 min

- [ ] **1.1** Choose PostgreSQL provider (recommended: Neon, Supabase, or Railway)
- [ ] **1.2** Create staging PostgreSQL database
- [ ] **1.3** Create production PostgreSQL database
- [ ] **1.4** Save connection strings securely
- [ ] **1.5** Backup current SQLite database

**Commands:**
```bash
# Backup SQLite
cp prisma/dev.db prisma/dev.db.backup_$(date +%Y%m%d)

# Verify backup
ls -lh prisma/*.db*
```

---

### **Phase 2: Schema Migration** ⏱️ 15 min

- [ ] **2.1** Update `prisma/schema.prisma` provider to `postgresql`
- [ ] **2.2** Create `.env.staging` file
- [ ] **2.3** Apply enhanced payment schema
- [ ] **2.4** Push schema to staging PostgreSQL

**Step 2.1: Update schema.prisma**

Change line 10 from:
```prisma
provider = "sqlite"
```

To:
```prisma
provider = "postgresql"
```

**Step 2.2: Create `.env.staging`**

```bash
# Create staging environment file
cp .env.example .env.staging
```

Edit `.env.staging`:
```env
# Staging PostgreSQL Database
DATABASE_URL="postgresql://username:password@staging-host:5432/cvhelper_staging"

# Test Stripe Keys (keep test keys for staging)
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Staging Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME="price_test_..."
NEXT_PUBLIC_STRIPE_PRICE_PRO="price_test_..."

# Staging App URL
NEXT_PUBLIC_APP_URL="https://staging.your-domain.com"

JWT_SECRET="staging-secret-key"
```

**Step 2.3: Apply Enhanced Payment Schema**

Update `prisma/schema.prisma` with the full payment schema:

```prisma
// Prisma schema for CV-Helper
// Production-ready with payment management

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String         @id @default(uuid())
  name              String
  email             String         @unique
  passwordHash      String
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  
  // Stripe customer ID for this user
  stripeCustomerId  String?        @unique
  
  // Current subscription status
  subscriptionStatus SubscriptionStatus @default(FREE)
  
  // Relations
  subscription      Subscription?
  payments          Payment[]
  usageRecords      UsageRecord[]
}

enum SubscriptionStatus {
  FREE
  ONE_TIME
  PRO
  CANCELLED
  EXPIRED
}

model Subscription {
  id                    String   @id @default(uuid())
  userId                String   @unique
  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Stripe subscription details
  stripeSubscriptionId  String   @unique
  stripePriceId         String
  stripeProductId       String?
  
  // Subscription info
  status                String   // active, canceled, past_due, etc.
  planType              String   // "one-time" or "pro"
  
  // Billing period
  currentPeriodStart    DateTime
  currentPeriodEnd      DateTime
  cancelAtPeriodEnd     Boolean  @default(false)
  canceledAt            DateTime?
  
  // Credits (for one-time plan)
  aiCreditsRemaining    Int      @default(0)
  aiCreditsTotal        Int      @default(0)
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model Payment {
  id                      String   @id @default(uuid())
  userId                  String
  user                    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Stripe payment details
  stripePaymentIntentId   String   @unique
  stripeInvoiceId         String?
  
  // Payment info
  amount                  Int      // Amount in cents
  currency                String   @default("eur")
  status                  PaymentStatus
  
  // What was purchased
  planType                String   // "one-time" or "pro"
  description             String?
  
  // Timestamps
  paidAt                  DateTime?
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  
  @@index([userId])
  @@index([status])
}

enum PaymentStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

model UsageRecord {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // What feature was used
  featureType String   // "ai_polish", "template_access", "pdf_export", etc.
  
  // Usage details
  metadata    String?  // JSON string for additional data
  
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([featureType])
}
```

**Step 2.4: Push Schema to Staging**

```bash
# Set staging database URL
export DATABASE_URL="postgresql://username:password@staging-host:5432/cvhelper_staging"

# Windows PowerShell:
$env:DATABASE_URL="postgresql://username:password@staging-host:5432/cvhelper_staging"

# Push schema (creates all tables)
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Verify with Prisma Studio
npx prisma studio
```

---

### **Phase 3: Data Migration** ⏱️ 30 min

- [ ] **3.1** Create migration script
- [ ] **3.2** Test migration on staging
- [ ] **3.3** Verify data integrity
- [ ] **3.4** Test application on staging

**Step 3.1: Create Migration Script**

Create `scripts/migrate-to-postgres.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

// Source: SQLite
const sqlite = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
})

// Target: PostgreSQL
const postgres = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_URL!
    }
  }
})

async function migrateData() {
  console.log('🚀 Starting data migration from SQLite to PostgreSQL...\n')

  try {
    // 1. Migrate Users
    console.log('📊 Migrating users...')
    const users = await sqlite.user.findMany()
    
    for (const user of users) {
      await postgres.user.upsert({
        where: { id: user.id },
        update: {
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash,
          createdAt: user.createdAt,
        },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash,
          createdAt: user.createdAt,
        }
      })
    }
    console.log(`✅ Migrated ${users.length} users\n`)

    // 2. Migrate Subscriptions (if table exists)
    try {
      console.log('📊 Migrating subscriptions...')
      const subscriptions = await sqlite.subscription.findMany()
      
      for (const sub of subscriptions) {
        await postgres.subscription.upsert({
          where: { id: sub.id },
          update: sub,
          create: sub
        })
      }
      console.log(`✅ Migrated ${subscriptions.length} subscriptions\n`)
    } catch (error) {
      console.log('⚠️  No subscriptions table found (skipping)\n')
    }

    // 3. Migrate Payments (if table exists)
    try {
      console.log('📊 Migrating payments...')
      const payments = await sqlite.payment.findMany()
      
      for (const payment of payments) {
        await postgres.payment.upsert({
          where: { id: payment.id },
          update: payment,
          create: payment
        })
      }
      console.log(`✅ Migrated ${payments.length} payments\n`)
    } catch (error) {
      console.log('⚠️  No payments table found (skipping)\n')
    }

    // 4. Migrate Usage Records (if table exists)
    try {
      console.log('📊 Migrating usage records...')
      const usageRecords = await sqlite.usageRecord.findMany()
      
      for (const record of usageRecords) {
        await postgres.usageRecord.create({
          data: record
        })
      }
      console.log(`✅ Migrated ${usageRecords.length} usage records\n`)
    } catch (error) {
      console.log('⚠️  No usage records table found (skipping)\n')
    }

    console.log('🎉 Migration completed successfully!')
    console.log('\n📊 Final counts:')
    
    const finalUserCount = await postgres.user.count()
    console.log(`   Users: ${finalUserCount}`)
    
    try {
      const finalSubCount = await postgres.subscription.count()
      console.log(`   Subscriptions: ${finalSubCount}`)
    } catch {}
    
    try {
      const finalPaymentCount = await postgres.payment.count()
      console.log(`   Payments: ${finalPaymentCount}`)
    } catch {}

  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await sqlite.$disconnect()
    await postgres.$disconnect()
  }
}

migrateData()
  .then(() => {
    console.log('\n✅ Migration script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error)
    process.exit(1)
  })
```

**Step 3.2: Run Migration**

```bash
# Install tsx if not already installed
npm install -D tsx

# Set target PostgreSQL URL
export POSTGRES_URL="postgresql://username:password@staging-host:5432/cvhelper_staging"

# Windows PowerShell:
$env:POSTGRES_URL="postgresql://username:password@staging-host:5432/cvhelper_staging"

# Run migration
npx tsx scripts/migrate-to-postgres.ts
```

**Step 3.3: Verify Data**

```bash
# Open Prisma Studio with PostgreSQL
DATABASE_URL="postgresql://..." npx prisma studio

# Check:
# ✅ All users present
# ✅ Email addresses correct
# ✅ Created dates preserved
# ✅ No duplicate records
```

**Step 3.4: Test Application**

```bash
# Run app with staging database
DATABASE_URL="postgresql://..." npm run dev

# Test:
# ✅ Login works
# ✅ User data displays correctly
# ✅ No database errors in console
```

---

### **Phase 4: Production Deployment** ⏱️ 45 min

- [ ] **4.1** Create production environment file
- [ ] **4.2** Update Stripe to LIVE keys
- [ ] **4.3** Create production webhook in Stripe
- [ ] **4.4** Deploy to production
- [ ] **4.5** Run production migration
- [ ] **4.6** Verify production deployment

**Step 4.1: Create `.env.production`**

```env
# Production PostgreSQL Database
DATABASE_URL="postgresql://username:password@prod-host:5432/cvhelper_prod"

# LIVE Stripe Keys (⚠️ NOT test keys!)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# LIVE Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME="price_live_..."
NEXT_PUBLIC_STRIPE_PRICE_PRO="price_live_..."

# Production App URL
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Strong JWT Secret
JWT_SECRET="production-super-secure-random-string-min-32-chars"
```

**Step 4.2: Update Stripe Dashboard**

1. Go to: https://dashboard.stripe.com (switch to LIVE mode)
2. Create LIVE products:
   - One-Time Boost: €1.00 (one-time)
   - Pro Unlimited: €6.00/month (recurring)
3. Copy LIVE price IDs to `.env.production`
4. Get LIVE API keys from: https://dashboard.stripe.com/apikeys

**Step 4.3: Create Production Webhook**

1. Go to: https://dashboard.stripe.com/webhooks (LIVE mode)
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy webhook signing secret to `.env.production`

**Step 4.4: Deploy Application**

**For Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Set environment variables in Vercel dashboard
# Or use CLI:
vercel env add DATABASE_URL production
vercel env add STRIPE_SECRET_KEY production
# ... (add all variables)

# Deploy
vercel --prod
```

**For Railway:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Set environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set STRIPE_SECRET_KEY="sk_live_..."
# ... (add all variables)

# Deploy
railway up
```

**Step 4.5: Run Production Migration**

```bash
# Set production PostgreSQL URL
export POSTGRES_URL="postgresql://username:password@prod-host:5432/cvhelper_prod"

# Run migration script
npx tsx scripts/migrate-to-postgres.ts

# Verify in Prisma Studio
DATABASE_URL="postgresql://..." npx prisma studio
```

**Step 4.6: Verify Production**

- [ ] Visit production URL
- [ ] Test user login
- [ ] Test payment flow with real card
- [ ] Check Stripe dashboard for payment
- [ ] Verify webhook received
- [ ] Check database for payment record

---

### **Phase 5: Post-Migration** ⏱️ 15 min

- [ ] **5.1** Backup production database
- [ ] **5.2** Archive SQLite database
- [ ] **5.3** Monitor application logs
- [ ] **5.4** Set up database backups
- [ ] **5.5** Document production credentials

**Step 5.1: Backup Production Database**

```bash
# PostgreSQL backup (if using pg_dump)
pg_dump -h prod-host -U username -d cvhelper_prod > backup_prod_$(date +%Y%m%d).sql

# Or use provider's backup feature:
# - Neon: Automatic backups
# - Supabase: Project settings → Database → Backups
# - Railway: Database → Backups
```

**Step 5.2: Archive SQLite**

```bash
# Keep SQLite as archive
mkdir -p archive
cp prisma/dev.db archive/dev.db.final_$(date +%Y%m%d)

# Document what's in archive
echo "SQLite database archived on $(date)" > archive/README.txt
echo "Migrated to PostgreSQL production" >> archive/README.txt
```

**Step 5.3: Monitor Logs**

```bash
# Vercel logs
vercel logs --follow

# Railway logs
railway logs

# Check for:
# ✅ No database connection errors
# ✅ Stripe webhooks working
# ✅ Payments processing correctly
```

**Step 5.4: Set Up Automated Backups**

**Neon:**
- Automatic point-in-time recovery (7 days free tier)

**Supabase:**
- Project Settings → Database → Enable daily backups

**Railway:**
- Database → Backups → Enable automated backups

**Step 5.5: Document Credentials**

Store securely (use password manager):
- [ ] PostgreSQL connection string
- [ ] Stripe LIVE API keys
- [ ] Stripe webhook secret
- [ ] JWT secret
- [ ] Database backup location

---

## 🆘 **Troubleshooting**

### **Issue: Migration script fails**

```bash
# Check PostgreSQL connection
npx prisma db execute --stdin <<< "SELECT 1;"

# Check schema is applied
npx prisma db push --accept-data-loss

# Re-run migration
npx tsx scripts/migrate-to-postgres.ts
```

### **Issue: Stripe webhooks not working**

1. Check webhook URL is correct in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` matches
3. Test webhook:
   ```bash
   stripe trigger checkout.session.completed
   ```
4. Check application logs for webhook errors

### **Issue: Database connection errors**

1. Verify `DATABASE_URL` is correct
2. Check database is accessible:
   ```bash
   psql "postgresql://username:password@host:5432/database"
   ```
3. Check IP whitelist (if required by provider)
4. Verify SSL mode (add `?sslmode=require` if needed)

### **Issue: Data missing after migration**

1. Check migration script output for errors
2. Verify source database has data:
   ```bash
   DATABASE_URL="file:./prisma/dev.db" npx prisma studio
   ```
3. Re-run migration script
4. Check for unique constraint violations

---

## 📊 **PostgreSQL Provider Comparison**

| Provider | Free Tier | Best For | Setup Time |
|----------|-----------|----------|------------|
| **Neon** | 0.5 GB, 1 project | Serverless, Next.js | 5 min |
| **Supabase** | 500 MB, 2 projects | Full backend features | 5 min |
| **Railway** | $5 credit/month | Easy deployment | 5 min |
| **Vercel Postgres** | 256 MB | Vercel deployments | 3 min |

**Recommendation:** Start with **Neon** for staging and production.

---

## 🔐 **Security Checklist**

- [ ] Use strong JWT secret (min 32 characters)
- [ ] Never commit `.env.local`, `.env.staging`, `.env.production`
- [ ] Use LIVE Stripe keys only in production
- [ ] Enable SSL for PostgreSQL connection
- [ ] Set up database user with minimal permissions
- [ ] Enable database backups
- [ ] Use environment variables for all secrets
- [ ] Rotate secrets regularly

---

## 📞 **Support Resources**

- **Prisma Docs:** https://www.prisma.io/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs
- **Stripe Docs:** https://stripe.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Supabase Docs:** https://supabase.com/docs

---

## ✅ **Success Criteria**

Migration is complete when:

- [x] PostgreSQL database is running
- [x] All tables created with correct schema
- [x] All data migrated from SQLite
- [x] Application connects to PostgreSQL
- [x] User login works
- [x] Stripe payments work end-to-end
- [x] Webhooks are received and processed
- [x] No errors in application logs
- [x] Database backups are configured
- [x] SQLite is archived

---

## 🎯 **Quick Command Reference**

```bash
# Backup SQLite
cp prisma/dev.db prisma/dev.db.backup

# Update schema provider
# Edit prisma/schema.prisma: provider = "postgresql"

# Push schema to PostgreSQL
DATABASE_URL="postgresql://..." npx prisma db push

# Generate Prisma Client
npx prisma generate

# Run migration script
POSTGRES_URL="postgresql://..." npx tsx scripts/migrate-to-postgres.ts

# Open Prisma Studio
DATABASE_URL="postgresql://..." npx prisma studio

# Deploy to production
vercel --prod
# OR
railway up
```

---

**Last Updated:** November 12, 2025  
**Version:** 1.0  
**Maintained by:** CV-Helper Team
