import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create PRO test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const proUser = await prisma.user.upsert({
    where: { email: 'pro@test.com' },
    update: {},
    create: {
      email: 'pro@test.com',
      passwordHash: hashedPassword,
      name: 'Pro Test User',
      stripeCustomerId: 'cus_test_pro',
      subscriptionStatus: 'PRO',
    },
  })

  console.log('✅ Created PRO user:', proUser.email)

  // Create PRO subscription
  const proSubscription = await prisma.subscription.upsert({
    where: { userId: proUser.id },
    update: {
      stripeSubscriptionId: 'sub_test_pro',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || 'price_test_pro',
      status: 'active',
      planType: 'pro',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      aiCreditsRemaining: 0, // Pro has unlimited
      aiCreditsTotal: 0,
    },
    create: {
      userId: proUser.id,
      stripeSubscriptionId: 'sub_test_pro',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || 'price_test_pro',
      status: 'active',
      planType: 'pro',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      aiCreditsRemaining: 0,
      aiCreditsTotal: 0,
    },
  })

  console.log('✅ Created PRO subscription')

  // Create BASIC test user
  const basicUser = await prisma.user.upsert({
    where: { email: 'basic@test.com' },
    update: {},
    create: {
      email: 'basic@test.com',
      passwordHash: hashedPassword,
      name: 'Basic Test User',
      stripeCustomerId: 'cus_test_basic',
      subscriptionStatus: 'BASIC',
    },
  })

  console.log('✅ Created BASIC user:', basicUser.email)

  // Create BASIC subscription (one-time with credits)
  await prisma.subscription.upsert({
    where: { userId: basicUser.id },
    update: {
      stripeSubscriptionId: 'sub_test_basic',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME || 'price_test_basic',
      status: 'active',
      planType: 'one-time',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      aiCreditsRemaining: 30,
      aiCreditsTotal: 50,
    },
    create: {
      userId: basicUser.id,
      stripeSubscriptionId: 'sub_test_basic',
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME || 'price_test_basic',
      status: 'active',
      planType: 'one-time',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      aiCreditsRemaining: 30,
      aiCreditsTotal: 50,
    },
  })

  console.log('✅ Created ONE-TIME subscription')

  // Create FREE test user
  const freeUser = await prisma.user.upsert({
    where: { email: 'free@test.com' },
    update: {},
    create: {
      email: 'free@test.com',
      passwordHash: hashedPassword,
      name: 'Free Test User',
      subscriptionStatus: 'FREE',
    },
  })

  console.log('✅ Created FREE user:', freeUser.email)

  console.log('\n🎉 Seeding completed successfully!')
  console.log('\n📝 Test Accounts:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('PRO Account:')
  console.log('  Email: pro@test.com')
  console.log('  Password: password123')
  console.log('  AI Credits: Unlimited')
  console.log('  Plan: Pro Unlimited')
  console.log('\nONE-TIME Account:')
  console.log('  Email: basic@test.com')
  console.log('  Password: password123')
  console.log('  AI Credits: 30/50 remaining')
  console.log('  Plan: Quick Boost (One-time)')
  console.log('\nFREE Account:')
  console.log('  Email: free@test.com')
  console.log('  Password: password123')
  console.log('  Plan: Free (no subscription)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
