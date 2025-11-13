/**
 * Test script to verify payment database setup
 * Run with: npx ts-node test-payment-db.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabase() {
  console.log('🔍 Testing Payment Database Setup...\n')

  try {
    // 1. Check if User table has payment fields
    console.log('1️⃣ Checking User table...')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        stripeCustomerId: true,
        subscriptionStatus: true
      }
    })
    console.log(`   ✅ Found ${users.length} users`)
    users.forEach(user => {
      console.log(`      - ${user.email}: ${user.subscriptionStatus} (Stripe: ${user.stripeCustomerId || 'none'})`)
    })

    // 2. Check Subscription table
    console.log('\n2️⃣ Checking Subscription table...')
    const subscriptions = await prisma.subscription.findMany({
      include: {
        user: {
          select: { email: true }
        }
      }
    })
    console.log(`   ✅ Found ${subscriptions.length} subscriptions`)
    subscriptions.forEach(sub => {
      console.log(`      - ${sub.user.email}: ${sub.planType} (${sub.status})`)
    })

    // 3. Check Payment table
    console.log('\n3️⃣ Checking Payment table...')
    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: { email: true }
        }
      }
    })
    console.log(`   ✅ Found ${payments.length} payments`)
    payments.forEach(payment => {
      console.log(`      - ${payment.user.email}: €${(payment.amount / 100).toFixed(2)} (${payment.status})`)
    })

    // 4. Check UsageRecord table
    console.log('\n4️⃣ Checking UsageRecord table...')
    const usageRecords = await prisma.usageRecord.findMany({
      take: 5,
      include: {
        user: {
          select: { email: true }
        }
      }
    })
    console.log(`   ✅ Found ${usageRecords.length} usage records (showing first 5)`)
    usageRecords.forEach(record => {
      console.log(`      - ${record.user.email}: ${record.featureType}`)
    })

    console.log('\n✅ Database setup is working correctly!')

  } catch (error) {
    console.error('\n❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
