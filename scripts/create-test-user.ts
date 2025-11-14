/**
 * Create a test user with PRO subscription for UI testing
 * Run with: npx tsx scripts/create-test-user.ts
 */

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Creating test user for AI features...\n')

  // Create or update test user
  const passwordHash = await bcrypt.hash('TestPass123!', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      subscriptionStatus: 'PRO',
    },
    create: {
      name: 'Test User',
      email: 'test@example.com',
      passwordHash,
      subscriptionStatus: 'PRO',
    }
  })

  console.log('✅ User created/updated:')
  console.log(`   Email: ${user.email}`)
  console.log(`   Password: TestPass123!`)
  console.log(`   Status: ${user.subscriptionStatus}\n`)

  // Create PRO subscription
  const subscription = await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      status: 'active',
      planType: 'pro',
    },
    create: {
      userId: user.id,
      planType: 'pro',
      status: 'active',
      stripeSubscriptionId: `sub_test_${Date.now()}`,
      stripePriceId: 'price_test_pro',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    }
  })

  console.log('✅ PRO Subscription created:')
  console.log(`   Plan: ${subscription.planType}`)
  console.log(`   Status: ${subscription.status}`)
  console.log(`   Valid until: ${subscription.currentPeriodEnd?.toLocaleDateString()}\n`)

  console.log('🎉 Test user ready!')
  console.log('\n📝 Login credentials:')
  console.log('   URL: http://localhost:3000/login')
  console.log('   Email: test@example.com')
  console.log('   Password: TestPass123!')
  console.log('\n🚀 Now you can test AI features at: http://localhost:3000/dashboard/builder')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
