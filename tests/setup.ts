import { beforeAll, afterAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

// Use the same dev.db database for tests
export const prisma = new PrismaClient()

beforeAll(async () => {
  // Setup test database
  console.log('Using dev.db for tests...')
})

afterAll(async () => {
  // Disconnect from database
  await prisma.$disconnect()
})
