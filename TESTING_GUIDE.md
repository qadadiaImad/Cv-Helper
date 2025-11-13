# Testing Guide - CV Helper

Quick start guide for Test-Driven Development (TDD) in CV Helper project.

---

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Setup Test Database**
```bash
npx prisma generate
npx prisma migrate dev
```

### **3. Create Test Users**
```bash
node scripts/seed-test-users.js
```

### **4. Run Tests**
```bash
npm test
```

---

## 📝 **Your First Test: John Developer Login**

### **Test Case:**
> **Given:** John Developer has an account  
> **When:** He logs in with valid credentials  
> **Then:** He should be redirected to the home page (dashboard)

### **Test Location:**
`tests/e2e/auth-navigation.test.ts`

### **Run This Test:**
```bash
npm test tests/e2e/auth-navigation.test.ts
```

---

## 🧪 **Test Structure**

### **Test File Example:**
```typescript
describe('Feature Name', () => {
  beforeEach(async () => {
    // Setup: Create test data
  })

  it('should do something specific', async () => {
    // Arrange: Prepare test data
    const input = 'test'
    
    // Act: Perform action
    const result = await doSomething(input)
    
    // Assert: Verify result
    expect(result).toBe('expected')
  })
})
```

---

## 📊 **Current Test Coverage**

### **✅ Implemented Tests:**

1. **Authentication Tests** (`tests/auth/login.test.ts`)
   - ✅ Valid login
   - ✅ Invalid password
   - ✅ Non-existent email
   - ✅ Invalid email format
   - ✅ Missing fields
   - ✅ Session creation
   - ✅ Session validation

2. **E2E Navigation Tests** (`tests/e2e/auth-navigation.test.ts`)
   - ✅ **John Developer login → redirect to home** ⭐
   - ✅ Invalid credentials error
   - ✅ Protected route redirect
   - ✅ Session persistence
   - ✅ Logout flow
   - ✅ Registration flow

3. **Payment Tests** (`tests/e2e/pricing-payment.test.ts`)
   - ✅ View pricing page
   - ✅ Display correct prices
   - ✅ Login required for purchase
   - ✅ One-time purchase flow
   - ✅ Pro subscription flow
   - ✅ Payment success redirect
   - ✅ Payment cancellation
   - ✅ Subscription status display

---

## 🎯 **TDD Workflow Example**

### **Scenario: Test CV Creation**

#### **Step 1: Write Failing Test (Red 🔴)**

```typescript
// tests/e2e/cv-creation.test.ts
it('should create a new CV and redirect to editor', async () => {
  // Arrange
  await loginAs('john.dev@test.com')
  await page.goto('/dashboard/cvs')
  
  // Act
  await page.click('button:has-text("Create New CV")')
  await page.fill('input[name="title"]', 'My Resume')
  await page.click('button:has-text("Create")')
  
  // Assert
  await expect(page).toHaveURL(/.*\/editor\/.*/)
  const cvTitle = await page.locator('h1').textContent()
  expect(cvTitle).toBe('My Resume')
})
```

**Run test:** `npm test tests/e2e/cv-creation.test.ts`  
**Result:** ❌ Test fails (feature not implemented)

---

#### **Step 2: Implement Feature (Green 🟢)**

Create the CV creation feature:
- Add "Create New CV" button
- Implement CV creation API
- Add redirect logic

**Run test again:** `npm test tests/e2e/cv-creation.test.ts`  
**Result:** ✅ Test passes

---

#### **Step 3: Refactor (Blue 🔵)**

Improve code quality:
- Extract reusable components
- Optimize database queries
- Add error handling

**Run test again:** `npm test tests/e2e/cv-creation.test.ts`  
**Result:** ✅ Test still passes

---

## 🔧 **Running Tests**

### **All Tests**
```bash
npm test
```

### **Watch Mode (Auto-rerun on changes)**
```bash
npm run test:watch
```

### **Specific Test File**
```bash
npm test tests/auth/login.test.ts
```

### **Specific Test Case**
```bash
npm test -- -t "should redirect John Developer"
```

### **With Coverage Report**
```bash
npm run test:coverage
```

---

## 🐛 **Debugging Tests**

### **Verbose Output**
```bash
npm test -- --reporter=verbose
```

### **Debug Single Test**
```bash
npm test -- --reporter=verbose tests/e2e/auth-navigation.test.ts
```

### **Playwright Debug Mode (Visual)**
```bash
PWDEBUG=1 npm test tests/e2e
```

### **Check Test Database**
```bash
npx prisma studio
```

---

## 📋 **Test Checklist**

Before pushing code, ensure:

- [ ] All tests pass: `npm test`
- [ ] New features have tests
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Test names are descriptive
- [ ] No hardcoded values (use test data)
- [ ] Tests are independent (no shared state)
- [ ] Coverage is maintained: `npm run test:coverage`

---

## 🎓 **Best Practices**

### **1. Test Naming**
```typescript
// ❌ Bad
it('test login', async () => {})

// ✅ Good
it('should redirect authenticated user to dashboard', async () => {})
```

### **2. AAA Pattern**
```typescript
it('should do something', async () => {
  // Arrange: Setup test data
  const user = await createTestUser()
  
  // Act: Perform action
  const result = await login(user.email, user.password)
  
  // Assert: Verify result
  expect(result.success).toBe(true)
})
```

### **3. Independent Tests**
```typescript
// ❌ Bad: Tests depend on each other
let userId: string
it('creates user', async () => {
  userId = await createUser()
})
it('updates user', async () => {
  await updateUser(userId) // Depends on previous test
})

// ✅ Good: Each test is independent
it('creates user', async () => {
  const userId = await createUser()
  expect(userId).toBeDefined()
})
it('updates user', async () => {
  const userId = await createUser() // Create own data
  await updateUser(userId)
})
```

### **4. Descriptive Assertions**
```typescript
// ❌ Bad
expect(result).toBe(true)

// ✅ Good
expect(result.isAuthenticated).toBe(true)
expect(result.redirectUrl).toBe('/dashboard')
```

---

## 📚 **Next Features to Test**

### **Priority 1: Core Features**
- [ ] CV creation flow
- [ ] Template selection
- [ ] CV editing
- [ ] PDF export

### **Priority 2: Premium Features**
- [ ] AI polish (with credits)
- [ ] ATS score calculation
- [ ] Cover letter generation
- [ ] Premium template access

### **Priority 3: Edge Cases**
- [ ] Network errors
- [ ] Invalid input handling
- [ ] Concurrent operations
- [ ] Rate limiting

---

## 🤝 **Contributing Tests**

### **Adding a New Test**

1. **Identify the feature** to test
2. **Write the test first** (TDD approach)
3. **Run the test** (it should fail)
4. **Implement the feature**
5. **Run the test** (it should pass)
6. **Refactor** if needed
7. **Commit** with message: `test: add [feature] test`

### **Test File Naming**
- Unit tests: `feature-name.test.ts`
- E2E tests: `feature-flow.test.ts`
- Integration tests: `api-endpoint.test.ts`

---

## 📞 **Need Help?**

- Check `tests/README.md` for detailed documentation
- View example tests in `tests/e2e/auth-navigation.test.ts`
- Run `npm test -- --help` for CLI options

---

## ✅ **Success Criteria**

Your test suite is healthy when:

1. ✅ All tests pass: `npm test`
2. ✅ Coverage > 80%: `npm run test:coverage`
3. ✅ Tests run fast (< 30 seconds for unit tests)
4. ✅ No flaky tests (consistent results)
5. ✅ Tests are readable and maintainable

---

**Happy Testing! 🎉**

**Last Updated:** November 13, 2025  
**Version:** 1.0
