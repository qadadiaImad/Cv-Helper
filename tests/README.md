# CV Helper - Test Suite

Comprehensive Test-Driven Development (TDD) test suite for CV Helper application.

---

## 📋 **Test Structure**

```
tests/
├── auth/                    # Authentication tests
│   └── login.test.ts       # Login, logout, session management
├── e2e/                     # End-to-end tests
│   ├── auth-navigation.test.ts    # User flows and navigation
│   └── pricing-payment.test.ts    # Payment and subscription flows
├── payment/                 # Payment webhook tests
│   └── webhook.test.ts     # Stripe webhook processing
├── services/                # Service layer tests
│   └── subscription.service.test.ts
├── subscription/            # Subscription feature tests ⭐ NEW
│   ├── limits.test.ts      # Plan limits and restrictions
│   ├── ai-credits.test.ts  # AI credit management
│   ├── feature-access.test.ts  # Feature access control
│   └── README.md           # Subscription tests documentation
├── utils/                   # Utility tests
│   └── cv-data-mapper.test.ts
├── setup-test-users.ts      # Create test users for all plans
└── setup.ts                 # Test configuration
```

---

## 🧪 **Test Categories**

### **1. Unit Tests**
- **Location:** `tests/auth/`, `tests/services/`
- **Purpose:** Test individual functions and API endpoints
- **Tools:** Vitest, Prisma

### **2. Integration Tests**
- **Location:** `tests/auth/`
- **Purpose:** Test API routes with database
- **Tools:** Vitest, Prisma, fetch

### **3. E2E Tests**
- **Location:** `tests/e2e/`
- **Purpose:** Test complete user flows in browser
- **Tools:** Vitest, Playwright

---

## 🚀 **Running Tests**

### **Run All Tests**
```bash
npm test
```

### **Run Specific Test Suite**
```bash
# Authentication tests
npm test tests/auth

# E2E tests
npm test tests/e2e

# Specific file
npm test tests/auth/login.test.ts
```

### **Run Tests in Watch Mode**
```bash
npm test -- --watch
```

### **Run Tests with Coverage**
```bash
npm test -- --coverage
```

### **Run E2E Tests Only**
```bash
npm run test:e2e
```

---

## 📝 **Test Cases Overview**

### **Authentication Tests** (`tests/auth/login.test.ts`)

| Test Case | Description | Status |
|-----------|-------------|--------|
| Valid Login | User logs in with correct credentials | ✅ |
| Invalid Password | Login fails with wrong password | ✅ |
| Non-existent Email | Login fails for unregistered email | ✅ |
| Invalid Email Format | Validation rejects bad email | ✅ |
| Missing Fields | Validation rejects incomplete data | ✅ |
| Session Creation | Valid session created after login | ✅ |
| Session Validation | Protected routes check session | ✅ |

---

### **E2E Navigation Tests** (`tests/e2e/auth-navigation.test.ts`)

| Test Case | Description | Expected Result |
|-----------|-------------|-----------------|
| **Login Redirect** | John Developer logs in | Redirected to `/dashboard/cvs` |
| **Invalid Credentials** | Wrong password entered | Error message shown, stays on login |
| **Protected Route** | Access dashboard without login | Redirected to `/login` |
| **Session Persistence** | Page refresh after login | User stays logged in |
| **Logout Flow** | User clicks logout | Redirected to login, session cleared |
| **Registration Flow** | New user registers | Account created, redirected to dashboard |

---

### **Pricing & Payment Tests** (`tests/e2e/pricing-payment.test.ts`)

| Test Case | Description | Expected Result |
|-----------|-------------|-----------------|
| **View Pricing** | Anyone views pricing page | All plans visible (Free, €1, €6) |
| **Display Prices** | Check pricing accuracy | €1 and €6 shown correctly |
| **Login Required** | Unauthenticated purchase attempt | Error or redirect to login |
| **One-Time Purchase** | Buy €1 plan | Stripe checkout opens |
| **Pro Subscription** | Subscribe to €6/month | Stripe checkout opens |
| **Payment Success** | Complete payment | Redirect to dashboard with success |
| **Payment Cancel** | Cancel payment | Return to pricing with message |
| **Subscription Status** | View profile after purchase | Status updated (FREE → ONE_TIME → PRO) |

---

### **Subscription Tests** (`tests/subscription/`) ⭐ NEW

| Test File | Test Cases | Description |
|-----------|------------|-------------|
| **limits.test.ts** | 30+ | Plan limits, resume restrictions, template access |
| **ai-credits.test.ts** | 20+ | Credit consumption, tracking, validation |
| **feature-access.test.ts** | 25+ | Feature gating, access control matrix |

**Total:** 75+ automated test cases covering all subscription features

**Quick Start:**
```bash
# Create test users
npx tsx tests/setup-test-users.ts

# Run all subscription tests
npm test tests/subscription

# Run specific test file
npm test tests/subscription/limits.test.ts
```

**See:** [tests/subscription/README.md](./subscription/README.md) for detailed documentation

---

## 🎯 **TDD Workflow**

### **Red-Green-Refactor Cycle**

1. **🔴 Red:** Write failing test first
   ```typescript
   it('should redirect John Developer to home page after login', async () => {
     // Test code that fails initially
   })
   ```

2. **🟢 Green:** Write minimal code to pass test
   ```typescript
   // Implement login redirect logic
   ```

3. **🔵 Refactor:** Improve code while keeping tests green
   ```typescript
   // Clean up, optimize, maintain passing tests
   ```

---

## 📊 **Test Coverage Goals**

| Area | Target Coverage | Current |
|------|----------------|---------|
| Authentication | 90% | 🟡 In Progress |
| Payment Flow | 85% | 🟡 In Progress |
| API Routes | 80% | 🟡 In Progress |
| UI Components | 70% | 🔴 Not Started |
| Services | 90% | 🟢 Good |

---

## 🔧 **Test Configuration**

### **Vitest Config** (`vitest.config.ts`)
```typescript
{
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts']
  }
}
```

### **Test Database**
- Uses separate test database (`test.db`)
- Cleaned after each test
- Seeded with test users

---

## 👥 **Test Users**

### **Authentication Test Users**
All test users have password: `TestPass123!`

| Name | Email | Role | Use Case |
|------|-------|------|----------|
| John Developer | john.dev@test.com | Free | Basic auth tests |
| Sarah Designer | sarah.design@test.com | Free → Paid | Payment flow tests |
| Mike Manager | mike.manager@test.com | Pro | Subscription tests |
| Emma Engineer | emma.eng@test.com | Free | Upgrade flow tests |
| Alex Admin | alex.admin@test.com | Admin | Admin feature tests |

### **Subscription Test Users**
All subscription test users have password: `Test123!`

| Email | Plan | AI Credits | Use Case |
|-------|------|------------|----------|
| free@test.com | FREE | 0 | Test free tier limitations |
| quickboost@test.com | ONE_TIME | 3 | Test credit consumption |
| basic@test.com | BASIC | Unlimited | Test basic features |
| pro@test.com | PRO | Unlimited | Test all premium features |

**To create/recreate subscription test users:**
```bash
npx tsx tests/setup-test-users.ts
```

---

## 🐛 **Debugging Tests**

### **View Test Output**
```bash
npm test -- --reporter=verbose
```

### **Debug Single Test**
```bash
npm test -- --reporter=verbose tests/auth/login.test.ts
```

### **Playwright Debug Mode**
```bash
PWDEBUG=1 npm run test:e2e
```

### **Check Test Database**
```bash
npx prisma studio --schema=./prisma/schema.prisma
```

---

## 📝 **Writing New Tests**

### **Template for New Test**

```typescript
/**
 * Feature: [Feature Name]
 * Test Case: [Specific scenario]
 * 
 * Given: [Initial state]
 * When: [Action performed]
 * Then: [Expected result]
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '../setup'

describe('Feature Name', () => {
  beforeEach(async () => {
    // Setup test data
  })

  it('should do something specific', async () => {
    // Arrange
    const input = 'test data'
    
    // Act
    const result = await functionUnderTest(input)
    
    // Assert
    expect(result).toBe('expected output')
  })
})
```

---

## 🚦 **CI/CD Integration**

### **GitHub Actions** (`.github/workflows/test.yml`)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
```

---

## 📚 **Resources**

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [TDD Best Practices](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Prisma Testing Guide](https://www.prisma.io/docs/guides/testing)

---

## ✅ **Next Steps**

### **Priority 1: Core Flows**
- [x] Authentication tests
- [x] Login redirect tests
- [x] Payment flow tests
- [ ] CV creation tests
- [ ] Template selection tests

### **Priority 2: Features**
- [ ] AI polish tests
- [ ] PDF export tests
- [ ] ATS score tests
- [ ] Cover letter tests
- [ ] **Subscription feature testing** - See [SUBSCRIPTION_TESTING_PLAN.md](./SUBSCRIPTION_TESTING_PLAN.md)

### **Priority 3: Edge Cases**
- [ ] Error handling tests
- [ ] Rate limiting tests
- [ ] Concurrent user tests
- [ ] Data validation tests

---

**Last Updated:** November 13, 2025  
**Version:** 1.0  
**Maintainer:** CV Helper Team
