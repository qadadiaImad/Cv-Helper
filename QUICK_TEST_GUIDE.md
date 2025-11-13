# Quick Test Guide

## ✅ **Vitest Installed Successfully!**

---

## 🚀 **Run Tests**

### **Unit Tests Only (No dev server needed)**
```bash
npm test
```
This runs authentication and service tests.

### **Watch Mode (Auto-rerun on changes)**
```bash
npm run test:watch
```

### **E2E Tests (Requires dev server running)**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run E2E tests
npm run test:e2e
```

### **Specific Test File**
```bash
npm test tests/auth/login.test.ts
```

---

## 📊 **Test Types**

### **1. Unit/Integration Tests** (Run by default)
- `tests/auth/login.test.ts` - API authentication tests
- `tests/services/subscription.service.test.ts` - Service tests

**Run:** `npm test` (no dev server needed)

### **2. E2E Tests** (Require dev server)
- `tests/e2e/auth-navigation.test.ts` - User login flows
- `tests/e2e/pricing-payment.test.ts` - Payment flows

**Run:** `npm run test:e2e` (dev server must be running)

---

## 🎯 **Your First Test: John Developer Login**

### **Test Location:**
`tests/e2e/auth-navigation.test.ts`

### **Run It:**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run E2E tests
npm run test:e2e
```

### **What It Tests:**
1. John Developer navigates to `/login`
2. Enters credentials: `john.dev@test.com` / `TestPass123!`
3. Submits form
4. Gets redirected to `/dashboard/cvs`
5. Sees authenticated UI

---

## 📝 **Test Commands Reference**

| Command | Description |
|---------|-------------|
| `npm test` | Run unit tests (default) |
| `npm run test:watch` | Watch mode (auto-rerun) |
| `npm run test:unit` | Run unit/integration tests only |
| `npm run test:e2e` | Run E2E tests (needs dev server) |
| `npm run test:coverage` | Generate coverage report |

---

## 🔧 **Test Configuration**

### **Default Behavior:**
- ✅ Runs unit and integration tests
- ✅ Uses `dev.db` database (same as development)
- ❌ Skips E2E tests (require dev server)
- ⏱️ 30-second timeout for long-running tests

### **To Run E2E Tests:**
1. Start dev server: `npm run dev`
2. Run E2E tests: `npm run test:e2e`

### **Database:**
- Tests use your development database (`dev.db`)
- Test users are created alongside your real data
- No separate test database needed

---

## 🐛 **Troubleshooting**

### **"Test timed out"**
- E2E tests need dev server running
- Use `npm run test:e2e` only when dev server is active

### **"Unique constraint failed"**
- Test user already exists (this is OK)
- Tests use `upsert` to handle existing users

### **"Cannot find module 'vitest'"**
- Run: `npm install -D vitest --legacy-peer-deps`

---

## 📚 **Full Documentation**

- **Quick Start:** This file
- **Complete Guide:** `TESTING_GUIDE.md`
- **Test Details:** `tests/README.md`
- **Test Summary:** `TEST_SUMMARY.md`

---

## ✅ **Quick Start Checklist**

- [x] Vitest installed
- [x] Test users created
- [x] Unit tests ready
- [x] E2E tests ready
- [ ] Dev server running (for E2E tests)

**Start testing now:**
```bash
npm test
```

---

**Last Updated:** November 13, 2025
