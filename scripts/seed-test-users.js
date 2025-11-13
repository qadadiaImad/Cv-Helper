/**
 * Seed script to create test user accounts
 * Run with: node scripts/seed-test-users.js
 */

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const TEST_USERS = [
  {
    name: 'John Developer',
    email: 'john.dev@test.com',
    password: 'TestPass123!',
    subscriptionStatus: 'FREE'
  },
  {
    name: 'Sarah Designer',
    email: 'sarah.design@test.com',
    password: 'TestPass123!',
    subscriptionStatus: 'FREE'
  },
  {
    name: 'Mike Manager',
    email: 'mike.manager@test.com',
    password: 'TestPass123!',
    subscriptionStatus: 'FREE'
  },
  {
    name: 'Emma Engineer',
    email: 'emma.eng@test.com',
    password: 'TestPass123!',
    subscriptionStatus: 'FREE'
  },
  {
    name: 'Alex Admin',
    email: 'alex.admin@test.com',
    password: 'TestPass123!',
    subscriptionStatus: 'FREE'
  }
]

async function seedTestUsers() {
  console.log('🌱 Seeding test users...\n')

  try {
    for (const userData of TEST_USERS) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      })

      if (existingUser) {
        console.log(`⏭️  User already exists: ${userData.email}`)
        continue
      }

      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, 10)

      // Create user
      const user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          passwordHash,
          subscriptionStatus: userData.subscriptionStatus
        }
      })

      console.log(`✅ Created user: ${user.name} (${user.email})`)
    }

    console.log('\n🎉 Test users seeded successfully!')
    console.log('\n📝 Credentials:')
    console.log('   Email: [user-email]@test.com')
    console.log('   Password: TestPass123!')
    console.log('\n📄 See TEST_ACCOUNTS.md for full details')

  } catch (error) {
    console.error('❌ Error seeding test users:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedTestUsers()
