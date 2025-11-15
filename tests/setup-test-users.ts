/**
 * Setup Test Users for Subscription Testing
 * 
 * Creates 4 test users with different subscription plans:
 * - FREE plan user
 * - ONE_TIME (Quick Boost) plan user
 * - BASIC plan user
 * - PRO plan user
 * 
 * Run with: npx tsx tests/setup-test-users.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface TestUser {
  email: string
  password: string
  name: string
  planType: 'free' | 'one_time' | 'basic' | 'pro'
  aiCreditsRemaining: number
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

const TEST_USERS: TestUser[] = [
  {
    email: 'free@test.com',
    password: 'Test123!',
    name: 'Free User',
    planType: 'free',
    aiCreditsRemaining: 0,
  },
  {
    email: 'quickboost@test.com',
    password: 'Test123!',
    name: 'Quick Boost User',
    planType: 'one_time',
    aiCreditsRemaining: 3,
    stripeCustomerId: 'cus_test_quickboost',
  },
  {
    email: 'basic@test.com',
    password: 'Test123!',
    name: 'Basic Monthly User',
    planType: 'basic',
    aiCreditsRemaining: -1, // unlimited
    stripeCustomerId: 'cus_test_basic',
    stripeSubscriptionId: 'sub_test_basic',
  },
  {
    email: 'pro@test.com',
    password: 'Test123!',
    name: 'Pro Unlimited User',
    planType: 'pro',
    aiCreditsRemaining: -1, // unlimited
    stripeCustomerId: 'cus_test_pro',
    stripeSubscriptionId: 'sub_test_pro',
  },
]

async function createTestUsers() {
  console.log('🚀 Starting test user creation...\n')

  for (const testUser of TEST_USERS) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: testUser.email },
      })

      if (existingUser) {
        console.log(`⚠️  User ${testUser.email} already exists. Updating...`)
        
        // Update existing user
        await prisma.user.update({
          where: { email: testUser.email },
          data: {
            name: testUser.name,
            stripeCustomerId: testUser.stripeCustomerId,
          },
        })

        // Update or create subscription (skip for FREE users)
        if (testUser.planType !== 'free') {
          const periodStart = new Date()
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          
          await prisma.subscription.upsert({
            where: { userId: existingUser.id },
            update: {
              planType: testUser.planType,
              aiCreditsRemaining: testUser.aiCreditsRemaining,
              aiCreditsTotal: testUser.planType === 'one_time' ? 3 : 0,
              status: 'active',
              currentPeriodStart: periodStart,
              currentPeriodEnd: periodEnd,
              stripeSubscriptionId: testUser.stripeSubscriptionId || `sub_test_${testUser.planType}`,
              stripePriceId: `price_test_${testUser.planType}`,
            },
            create: {
              userId: existingUser.id,
              planType: testUser.planType,
              aiCreditsRemaining: testUser.aiCreditsRemaining,
              aiCreditsTotal: testUser.planType === 'one_time' ? 3 : 0,
              status: 'active',
              currentPeriodStart: periodStart,
              currentPeriodEnd: periodEnd,
              stripeSubscriptionId: testUser.stripeSubscriptionId || `sub_test_${testUser.planType}`,
              stripePriceId: `price_test_${testUser.planType}`,
            },
          })
        }

        console.log(`✅ Updated user: ${testUser.email} (${testUser.planType.toUpperCase()})`)
      } else {
        // Hash password
        const hashedPassword = await bcrypt.hash(testUser.password, 10)

        // Create new user
        const user = await prisma.user.create({
          data: {
            email: testUser.email,
            name: testUser.name,
            passwordHash: hashedPassword,
            stripeCustomerId: testUser.stripeCustomerId,
          },
        })

        // Create subscription (skip for FREE users)
        if (testUser.planType !== 'free') {
          const periodStart = new Date()
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          
          await prisma.subscription.create({
            data: {
              userId: user.id,
              planType: testUser.planType,
              aiCreditsRemaining: testUser.aiCreditsRemaining,
              aiCreditsTotal: testUser.planType === 'one_time' ? 3 : 0,
              status: 'active',
              currentPeriodStart: periodStart,
              currentPeriodEnd: periodEnd,
              stripeSubscriptionId: testUser.stripeSubscriptionId || `sub_test_${testUser.planType}`,
              stripePriceId: `price_test_${testUser.planType}`,
            },
          })
        }

        console.log(`✅ Created user: ${testUser.email} (${testUser.planType.toUpperCase()})`)
      }

      // Display user details
      const subscription = await prisma.subscription.findUnique({
        where: { userId: (await prisma.user.findUnique({ where: { email: testUser.email } }))!.id },
      })

      console.log(`   📧 Email: ${testUser.email}`)
      console.log(`   🔑 Password: ${testUser.password}`)
      console.log(`   📦 Plan: ${testUser.planType.toUpperCase()}`)
      console.log(`   💳 AI Credits: ${testUser.aiCreditsRemaining === -1 ? 'Unlimited' : testUser.aiCreditsRemaining}`)
      console.log(`   📅 Status: ${subscription?.status || 'N/A'}`)
      console.log('')
    } catch (error) {
      console.error(`❌ Error creating user ${testUser.email}:`, error)
    }
  }

  console.log('✨ Test user creation completed!\n')
  console.log('📋 Summary:')
  console.log('   - FREE: free@test.com')
  console.log('   - QUICK BOOST: quickboost@test.com')
  console.log('   - BASIC: basic@test.com')
  console.log('   - PRO: pro@test.com')
  console.log('\n   All passwords: Test123!')
}

async function main() {
  try {
    await createTestUsers()
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
