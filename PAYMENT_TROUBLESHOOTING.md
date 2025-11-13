# Payment Integration Troubleshooting Guide

## 🔧 **Issue: Payments Succeed but Database is Empty**

### **Root Cause**
The pricing page wasn't passing the user ID to the checkout session, so the webhook couldn't associate the payment with a user.

### **✅ Fix Applied**

Updated `app/pricing/page.tsx` to:
1. Fetch the current user from `/api/auth/me`
2. Pass the user ID to the checkout session
3. Require login before allowing checkout

---

## 🧪 **Testing the Fix**

### **Step 1: Restart Development Server**

Stop your current dev server (Ctrl+C) and restart:

```bash
npm run dev
```

This will regenerate the Prisma Client with the new payment models.

### **Step 2: Start Stripe Webhook Forwarding**

Open a **NEW terminal** (keep dev server running) and run:

```bash
cd C:\Users\ahmad\CascadeProjects\Cv-Helper
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

You should see:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**IMPORTANT:** Copy the new webhook secret!

### **Step 3: Update Webhook Secret**

Update your `.env.local` file with the new webhook secret:

```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

Replace `whsec_xxxxxxxxxxxxx` with the actual secret from Step 2.

### **Step 4: Restart Dev Server Again**

Stop and restart your dev server to load the new webhook secret:

```bash
# Press Ctrl+C to stop
npm run dev
```

### **Step 5: Test Payment Flow**

1. **Log in** to your account (ahmadhaddou95@gmail.com)
2. Go to http://localhost:3000/pricing
3. Click "Buy Now - €1"
4. Use test card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - ZIP: `12345`
5. Complete payment

### **Step 6: Verify Webhook Events**

In the Stripe CLI terminal, you should see:

```
2025-11-12 22:45:00   --> checkout.session.completed [evt_xxx]
2025-11-12 22:45:00   <-- [200] POST http://localhost:3000/api/stripe/webhook
2025-11-12 22:45:01   --> payment_intent.succeeded [evt_xxx]
2025-11-12 22:45:01   <-- [200] POST http://localhost:3000/api/stripe/webhook
```

✅ **[200]** means the webhook was processed successfully!

### **Step 7: Check Database**

Open Prisma Studio:

```bash
npx prisma studio
```

Navigate to the **Payment** table. You should now see:

| id | userId | amount | currency | status | planType | createdAt |
|----|--------|--------|----------|--------|----------|-----------|
| xxx | (user-id) | 100 | eur | SUCCEEDED | one-time | 2025-11-12... |

Also check:
- **User** table: `stripeCustomerId` should be filled, `subscriptionStatus` should be `ONE_TIME`
- **Subscription** table: New record with `aiCreditsRemaining: 3`

---

## 🔍 **Debugging Checklist**

### **If Payment Table is Still Empty:**

- [ ] **Is the user logged in?**
  - The pricing page now requires login
  - Check browser console for "Please log in to purchase a plan" error

- [ ] **Is Stripe CLI running?**
  - You should have TWO terminals open:
    1. `npm run dev` (dev server)
    2. `stripe listen --forward-to localhost:3000/api/stripe/webhook`

- [ ] **Is webhook secret correct?**
  - The secret in `.env.local` must match the one from `stripe listen`
  - It should start with `whsec_`

- [ ] **Did you restart the dev server after updating .env.local?**
  - Environment variables are only loaded on startup

- [ ] **Check dev server logs:**
  ```
  POST /api/stripe/webhook 200
  Checkout completed for user xxx, plan: one-time
  ✅ Successfully processed checkout for user xxx
  ```

- [ ] **Check Stripe CLI logs:**
  ```
  --> checkout.session.completed [evt_xxx]
  <-- [200] POST http://localhost:3000/api/stripe/webhook
  ```

- [ ] **Check browser console:**
  - Should NOT see any errors during checkout
  - Should redirect to `/dashboard/cvs?success=true`

---

## 📊 **Understanding the Payment Flow**

```
1. User clicks "Buy Now" on /pricing
   ↓
2. Frontend checks if user is logged in
   ↓ (if not logged in)
   ❌ Show error: "Please log in to purchase a plan"
   
   ↓ (if logged in)
3. Call createCheckoutSession(planId, priceId, userId)
   ↓
4. Backend creates Stripe checkout session with:
   - client_reference_id: userId
   - metadata: { planId, userId }
   ↓
5. User redirected to Stripe checkout page
   ↓
6. User enters card details and completes payment
   ↓
7. Stripe sends webhook: checkout.session.completed
   ↓
8. Webhook handler (route.ts):
   - Extracts userId from session.client_reference_id
   - Saves stripeCustomerId to User table
   - Creates Subscription record
   - Creates Payment record
   - Updates User.subscriptionStatus
   ↓
9. User redirected to /dashboard/cvs?success=true
   ↓
10. ✅ Payment complete! Database updated!
```

---

## 🚨 **Common Errors & Solutions**

### **Error 1: "Please log in to purchase a plan"**

**Cause:** User is not authenticated

**Solution:**
1. Go to `/auth/login`
2. Log in with your credentials
3. Then go to `/pricing` and try again

---

### **Error 2: Webhook returns 400 "Webhook Error: ..."**

**Cause:** Webhook secret mismatch

**Solution:**
1. Get fresh secret from `stripe listen` output
2. Update `STRIPE_WEBHOOK_SECRET` in `.env.local`
3. Restart dev server

---

### **Error 3: No webhook events in Stripe CLI**

**Cause:** Stripe CLI not running or wrong port

**Solution:**
1. Make sure `stripe listen` is running
2. Check it's forwarding to `localhost:3000/api/stripe/webhook`
3. Make sure dev server is on port 3000

---

### **Error 4: Payment succeeds but no database records**

**Cause:** Webhook handler error (check logs)

**Solution:**
1. Check dev server terminal for error messages
2. Look for "Handle checkout session error:" in logs
3. Common issues:
   - Prisma Client not regenerated (restart server)
   - Database connection error
   - Missing userId in session

---

### **Error 5: TypeScript errors in payment-helpers.ts**

**Cause:** Prisma Client not regenerated after schema changes

**Solution:**
```bash
# Stop dev server
# Then regenerate Prisma Client:
npx prisma generate

# Restart dev server:
npm run dev
```

---

## 🧪 **Test Database Connection**

Run the test script to verify database setup:

```bash
npx ts-node test-payment-db.ts
```

Expected output:
```
🔍 Testing Payment Database Setup...

1️⃣ Checking User table...
   ✅ Found X users
      - ahmadhaddou95@gmail.com: ONE_TIME (Stripe: cus_xxx)

2️⃣ Checking Subscription table...
   ✅ Found X subscriptions
      - ahmadhaddou95@gmail.com: one-time (active)

3️⃣ Checking Payment table...
   ✅ Found X payments
      - ahmadhaddou95@gmail.com: €1.00 (SUCCEEDED)

4️⃣ Checking UsageRecord table...
   ✅ Found 0 usage records

✅ Database setup is working correctly!
```

---

## 📝 **Manual Webhook Testing**

If you want to test webhooks without making a real payment:

```bash
# Trigger a test checkout.session.completed event
stripe trigger checkout.session.completed
```

**Note:** This will create a test event but won't have a real userId, so it won't create database records.

---

## 🔐 **Security Notes**

### **Never Commit Secrets!**

Make sure `.env.local` is in `.gitignore`:

```bash
# Check if .env.local is ignored:
git check-ignore .env.local
```

Should output: `.env.local`

### **Test vs Live Keys**

- **Test keys** start with `sk_test_` and `pk_test_`
- **Live keys** start with `sk_live_` and `pk_live_`
- Never use live keys in development!

---

## 📞 **Still Having Issues?**

### **Check These Files:**

1. **`.env.local`** - Correct Stripe keys and webhook secret?
2. **`app/pricing/page.tsx`** - User fetching logic working?
3. **`app/api/stripe/webhook/route.ts`** - Webhook handler errors?
4. **`lib/payment-helpers.ts`** - Database operations working?

### **Useful Commands:**

```bash
# View database in browser
npx prisma studio

# Check Prisma schema
cat prisma/schema.prisma

# View recent migrations
ls prisma/migrations

# Check if Stripe CLI is installed
stripe --version

# Test Stripe API connection
stripe customers list --limit 1
```

---

## ✅ **Success Indicators**

You'll know everything is working when:

1. ✅ User can log in
2. ✅ Pricing page loads without errors
3. ✅ Clicking "Buy Now" opens Stripe checkout
4. ✅ Payment completes successfully
5. ✅ Stripe CLI shows webhook events with [200] status
6. ✅ Dev server logs show "✅ Successfully processed checkout"
7. ✅ Prisma Studio shows new records in Payment table
8. ✅ User.subscriptionStatus is updated
9. ✅ User redirected to /dashboard/cvs?success=true

---

**Last Updated:** November 12, 2025  
**Version:** 1.0
