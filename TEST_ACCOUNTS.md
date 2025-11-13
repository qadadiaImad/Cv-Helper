# Test Accounts

Test user accounts for development and testing purposes.

---

## 🧪 **Test Users**

### **Account 1: John Developer**
- **Email:** `john.dev@test.com`
- **Password:** `TestPass123!`
- **Role:** Free User
- **Use Case:** Testing free tier features

---

### **Account 2: Sarah Designer**
- **Email:** `sarah.design@test.com`
- **Password:** `TestPass123!`
- **Role:** One-Time Boost User
- **Use Case:** Testing one-time payment (€1)

---

### **Account 3: Mike Manager**
- **Email:** `mike.manager@test.com`
- **Password:** `TestPass123!`
- **Role:** Pro User
- **Use Case:** Testing Pro subscription (€6/month)

---

### **Account 4: Emma Engineer**
- **Email:** `emma.eng@test.com`
- **Password:** `TestPass123!`
- **Role:** Free User
- **Use Case:** Testing upgrade flow from free to paid

---

### **Account 5: Alex Admin**
- **Email:** `alex.admin@test.com`
- **Password:** `TestPass123!`
- **Role:** Admin/Testing
- **Use Case:** General testing and admin features

---

## 📝 **How to Create These Accounts**

### **Option 1: Manual Registration**

1. Go to `/auth/register`
2. Fill in the details for each account
3. Verify email (if required)
4. Log in with credentials

### **Option 2: Database Seed Script**

Run the seed script to create all accounts at once:

```bash
npx ts-node scripts/seed-test-users.ts
```

---

## 🔐 **Security Notes**

⚠️ **IMPORTANT:**
- These are **TEST ACCOUNTS ONLY**
- Never use these credentials in production
- Password is intentionally simple for testing
- This file is in `.gitignore` (should be!)

---

## 🧪 **Testing Scenarios**

### **Scenario 1: Free User Journey**
- **Account:** John Developer
- **Steps:**
  1. Log in
  2. Create a resume
  3. Try to use AI features (should be blocked)
  4. View pricing page

### **Scenario 2: One-Time Purchase**
- **Account:** Sarah Designer
- **Steps:**
  1. Log in
  2. Go to `/pricing`
  3. Purchase One-Time Boost (€1)
  4. Use 3 AI credits
  5. Try to use 4th credit (should fail)

### **Scenario 3: Pro Subscription**
- **Account:** Mike Manager
- **Steps:**
  1. Log in
  2. Go to `/pricing`
  3. Subscribe to Pro (€6/month)
  4. Use unlimited AI features
  5. Test subscription management

### **Scenario 4: Upgrade Flow**
- **Account:** Emma Engineer
- **Steps:**
  1. Start as free user
  2. Hit AI feature limit
  3. Upgrade to One-Time
  4. Later upgrade to Pro
  5. Test downgrade/cancel

### **Scenario 5: Admin Testing**
- **Account:** Alex Admin
- **Steps:**
  1. Test all features
  2. View payment history
  3. Test edge cases
  4. Debug issues

---

## 📊 **Quick Reference**

| Name | Email | Password | Tier |
|------|-------|----------|------|
| John Developer | john.dev@test.com | TestPass123! | Free |
| Sarah Designer | sarah.design@test.com | TestPass123! | One-Time |
| Mike Manager | mike.manager@test.com | TestPass123! | Pro |
| Emma Engineer | emma.eng@test.com | TestPass123! | Free |
| Alex Admin | alex.admin@test.com | TestPass123! | Admin |

---

**Last Updated:** November 13, 2025  
**Version:** 1.0
