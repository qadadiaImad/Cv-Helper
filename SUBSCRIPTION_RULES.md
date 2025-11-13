# Subscription Rules & Use Cases

## Subscription Tiers

1. **FREE** - €0 (default)
2. **ONE_TIME** - €2.99 (Quick Boost - one-time payment)
3. **BASIC** - €8.99/month (Basic Monthly subscription)
4. **PRO** - €15.99/month (Pro Unlimited subscription)

---

## Subscription State Matrix

### Current State: FREE

| Action | Allowed? | Behavior |
|--------|----------|----------|
| Buy Quick Boost (€2.99) | ✅ Yes | One-time payment → Status: ONE_TIME |
| Subscribe to Basic (€8.99/mo) | ✅ Yes | Start subscription → Status: BASIC |
| Subscribe to Pro (€15.99/mo) | ✅ Yes | Start subscription → Status: PRO |

**UI Changes:**
- Show all purchase options
- Display "Get Started" CTAs for all paid plans

---

### Current State: ONE_TIME (Quick Boost)

| Action | Allowed? | Behavior |
|--------|----------|----------|
| Buy Quick Boost again | ❌ No | Already purchased - show "Active" badge |
| Subscribe to Basic (€8.99/mo) | ✅ Yes | Start subscription → Status: BASIC (keeps ONE_TIME benefits) |
| Subscribe to Pro (€15.99/mo) | ✅ Yes | Start subscription → Status: PRO (keeps ONE_TIME benefits) |

**UI Changes:**
- Quick Boost card: Show "✓ Active" instead of "Buy Now"
- Basic/Pro cards: Show "Upgrade to Basic/Pro" CTAs
- Note: "You'll keep your Quick Boost benefits"

**Business Logic:**
- ONE_TIME is a permanent add-on, not replaced by subscriptions
- User keeps 3 AI credits + 30-day access even with Basic/Pro

---

### Current State: BASIC (€8.99/month)

| Action | Allowed? | Behavior |
|--------|----------|----------|
| Buy Quick Boost | ❌ No | Already have better plan - show "Included" |
| Subscribe to Basic again | ❌ No | Already subscribed - show "Current Plan" |
| Upgrade to Pro (€15.99/mo) | ✅ Yes | **Prorated upgrade** - pay difference for remaining period |
| Cancel subscription | ✅ Yes | Downgrade to FREE at end of billing period |

**UI Changes:**
- Quick Boost card: Show "✓ Included in your plan"
- Basic card: Show "Current Plan" badge (no CTA)
- Pro card: Show "Upgrade to Pro" with proration info
- Add "Manage Subscription" button → Settings page

**Proration Calculation:**
```
Days remaining in current period: X days
Daily rate difference: (€15.99 - €8.99) / 30 = €0.233/day
Prorated charge: €0.233 × X days
Next billing: €15.99/month
```

**Example:**
- User on Basic (€8.99/mo), 15 days left in billing period
- Upgrades to Pro (€15.99/mo)
- Immediate charge: €0.233 × 15 = €3.50
- Next billing date: Same as original (15 days from now)
- Next charge: €15.99

---

### Current State: PRO (€15.99/month)

| Action | Allowed? | Behavior |
|--------|----------|----------|
| Buy Quick Boost | ❌ No | Already have better plan - show "Included" |
| Subscribe to Basic | ⚠️ Downgrade | Schedule downgrade at end of billing period |
| Subscribe to Pro again | ❌ No | Already subscribed - show "Current Plan" |
| Cancel subscription | ✅ Yes | Downgrade to FREE at end of billing period |

**UI Changes:**
- Quick Boost card: Show "✓ Included in your plan"
- Basic card: Show "Downgrade to Basic" (discouraged)
- Pro card: Show "Current Plan" badge (no CTA)
- Add "Manage Subscription" button → Settings page

**Downgrade Logic:**
- No immediate charge
- Continue Pro benefits until end of current billing period
- At renewal date: Switch to Basic and charge €8.99
- Show warning: "You'll lose Pro features on [date]"

---

## Edge Cases & Special Scenarios

### 1. User with ONE_TIME + BASIC
**Status:** User has both ONE_TIME and BASIC active
**Behavior:**
- Show "Current Plan: Basic Monthly"
- Show "Quick Boost: Active"
- Can upgrade to Pro (keeps both)
- Cannot buy Quick Boost again

### 2. User with ONE_TIME + PRO
**Status:** User has both ONE_TIME and PRO active
**Behavior:**
- Show "Current Plan: Pro Unlimited"
- Show "Quick Boost: Active"
- Cannot buy Quick Boost again
- Can downgrade or cancel

### 3. Expired ONE_TIME (30 days passed)
**Status:** ONE_TIME purchased but 30-day access expired
**Behavior:**
- Keep ONE_TIME status in DB (for history)
- Show "Quick Boost: Expired" in settings
- Allow repurchase? **Decision needed**
- Recommend upgrading to Basic/Pro instead

### 4. Failed Payment (BASIC/PRO)
**Status:** Subscription payment failed
**Behavior:**
- Stripe automatically retries (3 attempts over 2 weeks)
- Show warning banner: "Payment failed - Update payment method"
- After final failure: Downgrade to FREE
- Send email notifications

### 5. Cancelled Subscription (Grace Period)
**Status:** User cancelled but still in billing period
**Behavior:**
- Show "Cancelled - Active until [date]"
- Allow reactivation before end date
- Show "Reactivate Subscription" CTA
- At end date: Downgrade to FREE

### 6. Upgrade During Trial (if implemented)
**Status:** User on trial period wants to upgrade
**Behavior:**
- End trial immediately
- Start paid subscription
- No proration needed (trial is free)

---

## Subscription Constraints

### Purchase Restrictions

```typescript
const canPurchase = (userStatus: string, targetPlan: string): boolean => {
  // FREE user can buy anything
  if (userStatus === 'FREE') return true
  
  // ONE_TIME user cannot buy ONE_TIME again
  if (userStatus === 'ONE_TIME' && targetPlan === 'one-time') return false
  
  // ONE_TIME user can subscribe to BASIC or PRO
  if (userStatus === 'ONE_TIME' && (targetPlan === 'basic' || targetPlan === 'pro')) return true
  
  // BASIC user cannot buy ONE_TIME or BASIC again
  if (userStatus === 'BASIC' && (targetPlan === 'one-time' || targetPlan === 'basic')) return false
  
  // BASIC user can upgrade to PRO
  if (userStatus === 'BASIC' && targetPlan === 'pro') return true
  
  // PRO user cannot buy anything (already at top tier)
  if (userStatus === 'PRO') return false
  
  return false
}
```

### Downgrade Rules

```typescript
const canDowngrade = (currentStatus: string, targetPlan: string): boolean => {
  // Can only downgrade from PRO to BASIC
  if (currentStatus === 'PRO' && targetPlan === 'basic') return true
  
  // Cannot downgrade from BASIC (must cancel instead)
  if (currentStatus === 'BASIC') return false
  
  return false
}
```

---

## Frontend Implementation Checklist

### 1. Pricing Page (`/pricing`)
- [ ] Fetch user subscription status
- [ ] Show dynamic CTAs based on status:
  - FREE: "Get Started" / "Buy Now" / "Subscribe"
  - ONE_TIME: "Active" (Quick Boost) / "Upgrade" (Basic/Pro)
  - BASIC: "Included" (Quick Boost) / "Current Plan" (Basic) / "Upgrade" (Pro)
  - PRO: "Included" (Quick Boost) / "Downgrade" (Basic) / "Current Plan" (Pro)
- [ ] Disable purchase buttons for restricted plans
- [ ] Show tooltips explaining why certain options are disabled
- [ ] Display proration info for upgrades

### 2. Settings Page (`/dashboard/settings`)
- [ ] Show current subscription status with badge
- [ ] Display billing date and amount
- [ ] Show "Manage Subscription" section:
  - [ ] "Update Payment Method" button
  - [ ] "Cancel Subscription" button (with confirmation)
  - [ ] "Reactivate Subscription" button (if cancelled)
  - [ ] "View Billing History" link
- [ ] Show Quick Boost status if purchased
- [ ] Display feature comparison

### 3. Checkout Flow
- [ ] Detect if upgrade vs new subscription
- [ ] Calculate and display prorated amount
- [ ] Pass metadata to Stripe:
  - `isUpgrade: true/false`
  - `previousPlan: 'basic'/'pro'`
  - `proratedAmount: number`
- [ ] Show clear pricing breakdown

### 4. Confirmation Modals
- [ ] Upgrade confirmation: "You'll be charged €X.XX today"
- [ ] Downgrade warning: "You'll lose these features on [date]"
- [ ] Cancel confirmation: "Your plan will remain active until [date]"

### 5. Banners & Notifications
- [ ] Payment failed banner (sticky)
- [ ] Subscription cancelled banner (dismissible)
- [ ] Upgrade success toast
- [ ] Downgrade scheduled toast

---

## API Endpoints Needed

### 1. Get Subscription Details
```typescript
GET /api/subscription/details
Response: {
  status: 'FREE' | 'ONE_TIME' | 'BASIC' | 'PRO',
  stripeSubscriptionId?: string,
  currentPeriodEnd?: string,
  cancelAtPeriodEnd?: boolean,
  oneTimePurchaseDate?: string,
  oneTimeExpiryDate?: string
}
```

### 2. Calculate Proration
```typescript
POST /api/subscription/calculate-proration
Body: { targetPlan: 'basic' | 'pro' }
Response: {
  proratedAmount: number,
  nextBillingAmount: number,
  nextBillingDate: string
}
```

### 3. Upgrade Subscription
```typescript
POST /api/subscription/upgrade
Body: { targetPlan: 'pro' }
Response: { success: boolean, newStatus: string }
```

### 4. Downgrade Subscription
```typescript
POST /api/subscription/downgrade
Body: { targetPlan: 'basic' }
Response: { success: boolean, effectiveDate: string }
```

### 5. Cancel Subscription
```typescript
POST /api/subscription/cancel
Response: { success: boolean, activeUntil: string }
```

### 6. Reactivate Subscription
```typescript
POST /api/subscription/reactivate
Response: { success: boolean, newStatus: string }
```

---

## Stripe Integration Notes

### Proration in Stripe
```typescript
// When upgrading, Stripe automatically:
// 1. Calculates unused time on current subscription
// 2. Credits that amount
// 3. Charges for new subscription prorated to current period
// 4. Aligns billing dates

const subscription = await stripe.subscriptions.update(
  subscriptionId,
  {
    items: [{
      id: subscriptionItemId,
      price: newPriceId, // Pro price ID
    }],
    proration_behavior: 'create_prorations', // Enable proration
  }
);
```

### Downgrade Scheduling
```typescript
// Schedule downgrade at period end
const subscription = await stripe.subscriptions.update(
  subscriptionId,
  {
    items: [{
      id: subscriptionItemId,
      price: basicPriceId,
    }],
    proration_behavior: 'none', // No immediate charge
    billing_cycle_anchor: 'unchanged', // Keep current billing date
  }
);
```

---

## Testing Scenarios

1. ✅ FREE → ONE_TIME purchase
2. ✅ FREE → BASIC subscription
3. ✅ FREE → PRO subscription
4. ✅ ONE_TIME → BASIC upgrade
5. ✅ ONE_TIME → PRO upgrade
6. ✅ BASIC → PRO upgrade (with proration)
7. ✅ PRO → BASIC downgrade (scheduled)
8. ✅ BASIC → Cancel (scheduled)
9. ✅ PRO → Cancel (scheduled)
10. ✅ Cancelled → Reactivate (before end date)
11. ❌ ONE_TIME → ONE_TIME (blocked)
12. ❌ BASIC → ONE_TIME (blocked)
13. ❌ BASIC → BASIC (blocked)
14. ❌ PRO → ONE_TIME (blocked)
15. ❌ PRO → PRO (blocked)

---

## UI/UX Best Practices

1. **Clear Status Indicators**
   - Use badges: "Free", "Active", "Current Plan", "Included"
   - Color coding: Gray (Free), Yellow (One-time), Blue (Basic), Purple (Pro)

2. **Transparent Pricing**
   - Always show proration calculations
   - Display "You'll pay €X.XX today, then €Y.YY/month"
   - Show savings for upgrades

3. **Prevent Accidental Downgrades**
   - Require confirmation with feature comparison
   - Show what they'll lose
   - Offer alternatives (e.g., pause instead of cancel)

4. **Smart CTAs**
   - "Upgrade" for moving up tiers
   - "Switch to" for lateral moves
   - "Manage" for current plan
   - "Get Started" for new users

5. **Help & Support**
   - Add "?" tooltips explaining each plan
   - Link to FAQ or support
   - Show feature comparison table

---

## Next Steps

1. Implement subscription rules helper functions
2. Update pricing page with dynamic CTAs
3. Create subscription management UI in settings
4. Add proration calculation API
5. Update Stripe checkout for upgrades
6. Add confirmation modals
7. Test all scenarios
8. Update documentation
