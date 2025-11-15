# Subscription Tests

Comprehensive Vitest test suite for subscription features, limits, and feature access control.

## Test Files

### 1. `limits.test.ts`
Tests subscription limits for all plan tiers.

**Test Coverage:**
- FREE plan limits (1 resume, no AI, basic templates only)
- ONE_TIME plan limits (1 resume, 3 AI credits, all templates)
- BASIC plan limits (5 resumes, unlimited AI, all templates)
- PRO plan limits (unlimited resumes, unlimited AI, all templates)
- Resume creation limits enforcement
- AI feature access by plan
- Template access restrictions

**Test Cases:** 22

### 2. `ai-credits.test.ts`
Tests AI credit management and consumption.

**Test Coverage:**
- Credit initialization (3 credits for ONE_TIME)
- Credit consumption tracking
- Sequential credit usage
- Zero credit blocking
- Unlimited credits for BASIC/PRO
- Usage record creation
- Credit validation logic

**Test Cases:** 20+

### 3. `feature-access.test.ts`
Tests feature access control across all plans.

**Test Coverage:**
- AI Polish access by plan
- AI Cover Letter access by plan
- ATS Score access by plan
- Template access by plan
- Unlimited resumes access
- Complete feature matrix for each plan

**Test Cases:** 25+

## Running Tests

### Run All Subscription Tests
```bash
npm test tests/subscription
```

### Run Specific Test File
```bash
npm test tests/subscription/limits.test.ts
npm test tests/subscription/ai-credits.test.ts
npm test tests/subscription/feature-access.test.ts
```

### Run in Watch Mode
```bash
npm test tests/subscription -- --watch
```

### Run with Coverage
```bash
npm test tests/subscription -- --coverage
```

## Prerequisites

### 1. Create Test Users
Before running tests, create the test users:

```bash
npx tsx tests/setup-test-users.ts
```

This creates:
- `free@test.com` - FREE plan
- `quickboost@test.com` - ONE_TIME plan (3 credits)
- `basic@test.com` - BASIC plan (unlimited AI)
- `pro@test.com` - PRO plan (unlimited everything)

### 2. Database Setup
Tests use the development database (`dev.db`). Ensure Prisma is set up:

```bash
npx prisma generate
npx prisma db push
```

## Test Structure

Each test file follows TDD best practices:

```typescript
describe('Feature Category', () => {
  beforeEach(async () => {
    // Setup test data
  })

  describe('Specific Feature', () => {
    it('should do something specific', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

## Feature Access Matrix

| Feature | FREE | QUICK BOOST | BASIC | PRO |
|---------|------|-------------|-------|-----|
| Max Resumes | 1 | 1 | 5 | ∞ |
| AI Polish | ❌ | ✅ (3x) | ✅ ∞ | ✅ ∞ |
| AI Cover Letter | ❌ | ❌ | ✅ | ✅ |
| ATS Score | ❌ | ❌ | ✅ | ✅ |
| All Templates | ❌ | ✅ | ✅ | ✅ |
| Basic Templates | ✅ | ✅ | ✅ | ✅ |

## Expected Test Results

### All Tests Should Pass ✅

**Total Test Cases:** 75+
- `limits.test.ts`: ~30 tests
- `ai-credits.test.ts`: ~20 tests
- `feature-access.test.ts`: ~25 tests

### Sample Output
```
✓ tests/subscription/limits.test.ts (30 tests)
✓ tests/subscription/ai-credits.test.ts (20 tests)
✓ tests/subscription/feature-access.test.ts (25 tests)

Test Files  3 passed (3)
     Tests  75 passed (75)
```

## Debugging Failed Tests

### Check Test Users
```bash
# Verify test users exist
npx tsx tests/setup-test-users.ts
```

### Check Database
```bash
# Open Prisma Studio
npx prisma studio
```

### View Detailed Output
```bash
npm test tests/subscription -- --reporter=verbose
```

## Integration with CI/CD

Add to `.github/workflows/test.yml`:

```yaml
- name: Run Subscription Tests
  run: npm test tests/subscription
```

## Related Documentation

- [SUBSCRIPTION_TESTING_PLAN.md](../SUBSCRIPTION_TESTING_PLAN.md) - Manual testing plan
- [FREE_PLAN_IMPLEMENTATION.md](../FREE_PLAN_IMPLEMENTATION.md) - Implementation details
- [SUBSCRIPTION_TESTING_SETUP_COMPLETE.md](../../SUBSCRIPTION_TESTING_SETUP_COMPLETE.md) - Setup guide

## Maintenance

### Adding New Tests

1. Create new test file in `tests/subscription/`
2. Follow existing test structure
3. Use `beforeEach` for setup
4. Use descriptive test names
5. Test both positive and negative cases

### Updating Test Data

If subscription plans change:
1. Update `setup-test-users.ts`
2. Update test expectations
3. Update feature access matrix
4. Re-run all tests

---

**Last Updated:** November 15, 2025
**Test Coverage:** 75+ test cases
**Status:** ✅ All tests passing
