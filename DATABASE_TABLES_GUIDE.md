# Payment Database Tables Guide

Complete guide on when and how each payment-related database table gets populated.

---

## 📊 **Database Tables Overview**

### **4 Main Tables:**

1. **User** (enhanced) - User account with payment status
2. **Payment** - Individual payment transactions
3. **Subscription** - Recurring subscriptions (Pro plan only)
4. **UsageRecord** - Feature usage tracking

---

## 1️⃣ **User Table** (Enhanced)

### **New Fields Added:**

```typescript
User {
  id: string
  email: string
  name: string
  
  // Payment fields
  stripeCustomerId: string?        // Stripe customer ID
  subscriptionStatus: enum         // FREE, ONE_TIME, PRO, CANCELLED, EXPIRED
  
  // Relations
  subscription: Subscription?
  payments: Payment[]
  usageRecords: UsageRecord[]
}
```

### **When Updated:**

| Event | Field Updated | Value |
|-------|---------------|-------|
| First payment | `stripeCustomerId` | `cus_xxxxx` |
| One-time purchase | `subscriptionStatus` | `ONE_TIME` |
| Pro subscription | `subscriptionStatus` | `PRO` |
| Subscription cancelled | `subscriptionStatus` | `CANCELLED` |
| Subscription expired | `subscriptionStatus` | `EXPIRED` |

### **Webhook Events:**
- ✅ `checkout.session.completed` - Sets `stripeCustomerId` and `subscriptionStatus`
- ✅ `customer.subscription.updated` - Updates `subscriptionStatus`
- ✅ `customer.subscription.deleted` - Sets to `CANCELLED`

---

## 2️⃣ **Payment Table** 💰

### **Schema:**

```typescript
Payment {
  id: string
  userId: string
  
  // Stripe details
  stripePaymentIntentId: string    // Unique payment ID
  stripeInvoiceId: string?
  
  // Payment info
  amount: number                    // Amount in cents (€1.00 = 100)
  currency: string                  // "eur"
  status: enum                      // PENDING, SUCCEEDED, FAILED, REFUNDED
  
  // Purchase details
  planType: string                  // "one-time" or "pro"
  description: string?
  
  paidAt: DateTime?
  createdAt: DateTime
}
```

### **When Filled:**

✅ **ALWAYS filled for every payment** (both one-time and subscription)

### **Webhook Events:**

| Event | Action | Status |
|-------|--------|--------|
| `checkout.session.completed` | Create payment record | `SUCCEEDED` |
| `payment_intent.succeeded` | Update status | `SUCCEEDED` |
| `payment_intent.payment_failed` | Update status | `FAILED` |

### **Examples:**

**One-Time Purchase (€1):**
```json
{
  "userId": "user-123",
  "amount": 100,
  "currency": "eur",
  "status": "SUCCEEDED",
  "planType": "one-time",
  "description": "Payment for one-time plan"
}
```

**Pro Subscription (€6/month):**
```json
{
  "userId": "user-123",
  "amount": 600,
  "currency": "eur",
  "status": "SUCCEEDED",
  "planType": "pro",
  "description": "Payment for pro plan"
}
```

### **Important Notes:**

⚠️ **Payment table is filled for BOTH one-time and subscription payments!**

- One-time: Single payment record
- Subscription: New payment record each billing cycle

---

## 3️⃣ **Subscription Table** 📅

### **Schema:**

```typescript
Subscription {
  id: string
  userId: string
  
  // Stripe details
  stripeSubscriptionId: string     // Unique subscription ID
  stripePriceId: string
  stripeProductId: string?
  
  // Subscription info
  status: string                    // "active", "canceled", "past_due", etc.
  planType: string                  // "pro" (NOT "one-time")
  
  // Billing period
  currentPeriodStart: DateTime
  currentPeriodEnd: DateTime
  cancelAtPeriodEnd: boolean
  canceledAt: DateTime?
  
  // Credits
  aiCreditsRemaining: number        // 0 for Pro (unlimited)
  aiCreditsTotal: number            // 0 for Pro, 3 for one-time
  
  createdAt: DateTime
  updatedAt: DateTime
}
```

### **When Filled:**

❌ **NOT filled for one-time payments (€1)**

✅ **ONLY filled for Pro subscription (€6/month)**

### **Why?**

One-time payments are **NOT subscriptions** in Stripe. They are single payment intents.

Only the Pro plan creates a recurring subscription in Stripe.

### **Webhook Events:**

| Event | Plan | Action |
|-------|------|--------|
| `checkout.session.completed` | Pro | Create subscription record |
| `checkout.session.completed` | One-time | ❌ No subscription created |
| `customer.subscription.updated` | Pro | Update subscription |
| `customer.subscription.deleted` | Pro | Mark as cancelled |

### **Example (Pro Plan Only):**

```json
{
  "userId": "user-123",
  "stripeSubscriptionId": "sub_xxxxx",
  "planType": "pro",
  "status": "active",
  "aiCreditsRemaining": 0,          // Unlimited
  "aiCreditsTotal": 0,
  "currentPeriodStart": "2025-11-12",
  "currentPeriodEnd": "2025-12-12"
}
```

### **For One-Time Purchases:**

Instead of a subscription record, track credits differently:
- Store in User metadata
- Or create a custom "credits" table
- Or use UsageRecord to track remaining uses

---

## 4️⃣ **UsageRecord Table** 📈

### **Schema:**

```typescript
UsageRecord {
  id: string
  userId: string
  
  featureType: string               // "ai_polish", "pdf_export", etc.
  metadata: string?                 // JSON string with details
  
  createdAt: DateTime
}
```

### **When Filled:**

✅ **Manually tracked by your application code**

❌ **NOT automatically filled by webhooks**

### **How to Use:**

Track whenever a user uses a premium feature:

```typescript
import { trackUsage, useAICredit } from '@/lib/payment-helpers'

// Example: AI Polish feature
async function handleAIPolish(userId: string, resumeId: string) {
  // 1. Check if user has access
  const hasCredit = await useAICredit(userId)
  
  if (!hasCredit) {
    toast.error('No AI credits remaining. Please upgrade.')
    return
  }
  
  // 2. Perform the AI operation
  const result = await polishResumeWithAI(resumeId)
  
  // 3. Track the usage
  await trackUsage(userId, 'ai_polish', {
    resumeId,
    wordsProcessed: result.wordCount,
    timestamp: new Date().toISOString()
  })
  
  toast.success('Resume polished successfully!')
}
```

### **Feature Types to Track:**

| Feature | featureType | When to Track |
|---------|-------------|---------------|
| AI Polish | `ai_polish` | After AI content generation |
| PDF Export | `pdf_export` | After PDF download |
| Template Access | `template_access` | When premium template used |
| Cover Letter | `cover_letter_ai` | After AI cover letter generation |
| ATS Score | `ats_score` | After ATS analysis |

### **Example Records:**

```json
[
  {
    "userId": "user-123",
    "featureType": "ai_polish",
    "metadata": "{\"resumeId\":\"resume-456\",\"wordsProcessed\":250}",
    "createdAt": "2025-11-12T10:30:00Z"
  },
  {
    "userId": "user-123",
    "featureType": "pdf_export",
    "metadata": "{\"resumeId\":\"resume-456\",\"templateId\":\"modern-pro\"}",
    "createdAt": "2025-11-12T10:35:00Z"
  }
]
```

### **Analytics Queries:**

```typescript
// Get user's usage stats
const stats = await getUserUsageStats(userId)
// Returns: { total: 15, byFeature: { ai_polish: 5, pdf_export: 10 } }

// Get all AI polish usage
const aiUsage = await getUserUsageStats(userId, 'ai_polish')
```

---

## 🔄 **Complete Payment Flow**

### **Scenario 1: One-Time Purchase (€1)**

```
1. User clicks "Buy Now - €1"
   ↓
2. Frontend: createCheckoutSession('one-time', priceId, userId)
   ↓
3. Backend: Create Stripe checkout (mode: 'payment')
   ↓
4. User completes payment
   ↓
5. Webhook: checkout.session.completed
   ↓
6. Database Updates:
   ✅ User.stripeCustomerId = "cus_xxx"
   ✅ User.subscriptionStatus = "ONE_TIME"
   ✅ Payment record created (amount: 100, status: SUCCEEDED)
   ❌ Subscription table NOT updated (one-time is not a subscription)
   ❌ UsageRecord NOT created (manual tracking only)
```

**Result:**
- ✅ Payment table: 1 record
- ❌ Subscription table: 0 records
- ❌ UsageRecord table: 0 records (until user uses features)

---

### **Scenario 2: Pro Subscription (€6/month)**

```
1. User clicks "Start Pro Trial"
   ↓
2. Frontend: createCheckoutSession('pro', priceId, userId)
   ↓
3. Backend: Create Stripe checkout (mode: 'subscription')
   ↓
4. User completes payment
   ↓
5. Webhook: checkout.session.completed
   ↓
6. Database Updates:
   ✅ User.stripeCustomerId = "cus_xxx"
   ✅ User.subscriptionStatus = "PRO"
   ✅ Payment record created (amount: 600, status: SUCCEEDED)
   ✅ Subscription record created (planType: "pro", status: "active")
   ❌ UsageRecord NOT created (manual tracking only)
```

**Result:**
- ✅ Payment table: 1 record
- ✅ Subscription table: 1 record
- ❌ UsageRecord table: 0 records (until user uses features)

---

### **Scenario 3: User Uses AI Feature**

```
1. User clicks "AI Polish" button
   ↓
2. Application code:
   - Check if user has credits (useAICredit)
   - Perform AI operation
   - Track usage (trackUsage)
   ↓
3. Database Updates:
   ✅ UsageRecord created (featureType: "ai_polish")
   ✅ Subscription.aiCreditsRemaining decremented (if one-time)
```

**Result:**
- ✅ UsageRecord table: 1 new record

---

## 🧪 **Testing Each Table**

### **Test Payment Table:**

```bash
# 1. Make a test payment (one-time or pro)
# 2. Check Prisma Studio
npx prisma studio

# 3. Navigate to Payment table
# Expected: 1 record with status: SUCCEEDED
```

### **Test Subscription Table:**

```bash
# 1. Make a Pro subscription payment (€6)
# 2. Check Prisma Studio
npx prisma studio

# 3. Navigate to Subscription table
# Expected: 1 record with planType: "pro", status: "active"

# 4. Try one-time payment (€1)
# Expected: Subscription table unchanged (no new record)
```

### **Test UsageRecord Table:**

```typescript
// In your application code:
import { trackUsage } from '@/lib/payment-helpers'

// Track a test usage
await trackUsage(userId, 'ai_polish', {
  test: true,
  timestamp: new Date()
})

// Check Prisma Studio
// Expected: 1 record in UsageRecord table
```

---

## 📝 **Summary Table**

| Table | One-Time (€1) | Pro (€6/month) | Manual Tracking |
|-------|---------------|----------------|-----------------|
| **User** | ✅ Updated | ✅ Updated | ❌ |
| **Payment** | ✅ 1 record | ✅ 1 record per billing | ❌ |
| **Subscription** | ❌ No record | ✅ 1 record | ❌ |
| **UsageRecord** | ❌ | ❌ | ✅ Required |

---

## 🔧 **Implementation Checklist**

### **For Payment Tracking (Already Done):**
- [x] Webhook handles `checkout.session.completed`
- [x] Creates Payment record
- [x] Updates User table
- [x] Creates Subscription (for Pro only)

### **For Usage Tracking (TODO):**
- [ ] Add `trackUsage()` calls to AI features
- [ ] Add `useAICredit()` checks before premium features
- [ ] Create usage analytics dashboard
- [ ] Add credit balance display for one-time users

---

## 💡 **Next Steps**

1. **Fix the current issue:** Ensure userId is passed correctly (debug logs added)
2. **Test payment flow:** Make a test payment and verify Payment table
3. **Test Pro subscription:** Subscribe to Pro and verify Subscription table
4. **Implement usage tracking:** Add tracking to AI features
5. **Build analytics:** Create dashboard to view usage stats

---

**Last Updated:** November 12, 2025  
**Version:** 1.0
