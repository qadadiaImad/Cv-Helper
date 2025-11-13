import { beforeAll, afterAll, afterEach } from 'vitest'
import { PrismaClient } from '@prisma/client'

// Create a test database instance
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./test.db',
    },
  },
})

beforeAll(async () => {
  // Setup test database
  console.log('Setting up test database...')
})

afterEach(async () => {
  // Clean up test data after each test
  await prisma.usageRecord.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  // Disconnect from database
  await prisma.$disconnect()
})
