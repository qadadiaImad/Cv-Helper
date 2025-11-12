# Stripe Test Cards Reference

Complete guide for testing Stripe payments in test mode.

---

## 🎴 **Basic Test Cards**

### **Successful Payments**

| Card Number | Brand | Description |
|-------------|-------|-------------|
| `4242 4242 4242 4242` | Visa | ✅ **Most common** - Always succeeds |
| `4000 0566 5566 5556` | Visa (debit) | ✅ Succeeds |
| `5555 5555 5555 4444` | Mastercard | ✅ Succeeds |
| `2223 0031 2200 3222` | Mastercard (2-series) | ✅ Succeeds |
| `5200 8282 8282 8210` | Mastercard (debit) | ✅ Succeeds |
| `5105 1051 0510 5100` | Mastercard (prepaid) | ✅ Succeeds |
| `3782 822463 10005` | American Express | ✅ Succeeds |
| `3714 496353 98431` | American Express | ✅ Succeeds |
| `6011 1111 1111 1117` | Discover | ✅ Succeeds |
| `6011 0009 9013 9424` | Discover | ✅ Succeeds |
| `3056 9300 0902 0004` | Diners Club | ✅ Succeeds |
| `3622 7206 2716 67` | Diners Club (14-digit) | ✅ Succeeds |
| `3566 0020 2036 0505` | JCB | ✅ Succeeds |
| `6200 0000 0000 0005` | UnionPay | ✅ Succeeds |

---

## ❌ **Failed Payments**

### **Card Declined**

| Card Number | Error Code | Description |
|-------------|------------|-------------|
| `4000 0000 0000 0002` | `card_declined` | Generic decline |
| `4000 0000 0000 9995` | `insufficient_funds` | Insufficient funds |
| `4000 0000 0000 9987` | `lost_card` | Lost card |
| `4000 0000 0000 9979` | `stolen_card` | Stolen card |
| `4000 0000 0000 0069` | `expired_card` | Expired card |
| `4000 0000 0000 0127` | `incorrect_cvc` | Incorrect CVC |
| `4000 0000 0000 0119` | `processing_error` | Processing error |
| `4000 0000 0000 0341` | `incorrect_number` | Incorrect card number |

---

## 🔐 **3D Secure / SCA Testing**

### **3D Secure 2 Authentication**

| Card Number | Behavior |
|-------------|----------|
| `4000 0025 0000 3155` | ✅ Requires authentication, succeeds |
| `4000 0027 6000 3184` | ❌ Requires authentication, fails |
| `4000 0082 6000 0000` | ⚠️ Requires authentication (setup) |

### **3D Secure 1 (Legacy)**

| Card Number | Behavior |
|-------------|----------|
| `4000 0000 0000 3063` | ✅ Requires authentication, succeeds |
| `4000 0000 0000 3055` | ❌ Requires authentication, fails |

---

## 🌍 **International Cards**

### **Region-Specific Cards**

| Card Number | Country | Description |
|-------------|---------|-------------|
| `4000 0003 6000 0006` | 🇧🇷 Brazil | Requires postal code |
| `4000 0007 6000 0002` | 🇨🇦 Canada | Requires postal code |
| `4000 0025 0000 0003` | 🇫🇷 France | Requires postal code |
| `4000 0027 6000 0016` | 🇩🇪 Germany | Requires postal code |
| `4000 0038 0000 0008` | 🇮🇹 Italy | Requires postal code |
| `4000 0039 2000 0003` | 🇯🇵 Japan | Requires postal code |
| `4000 0052 8000 0008` | 🇳🇱 Netherlands | Requires postal code |
| `4000 0072 4000 0007` | 🇪🇸 Spain | Requires postal code |
| `4000 0082 6000 0000` | 🇬🇧 UK | Requires postal code |
| `4000 0084 0000 0008` | 🇺🇸 USA | Requires postal code |

---

## 🔄 **Subscription & Recurring Payments**

### **Subscription Testing**

| Card Number | Behavior |
|-------------|----------|
| `4000 0000 0000 0341` | ❌ Attaching fails |
| `4000 0000 0000 0002` | ❌ Charge succeeds, but next invoice payment fails |
| `4000 0000 0000 0077` | ⚠️ Charge succeeds, disputes as fraudulent |
| `4000 0000 0000 0093` | ⚠️ Charge succeeds, disputes as not received |

---

## 💳 **Special Scenarios**

### **Disputes & Chargebacks**

| Card Number | Scenario |
|-------------|----------|
| `4000 0000 0000 0259` | ⚠️ Charge succeeds, disputes as fraudulent |
| `4000 0000 0000 2685` | ⚠️ Charge succeeds, disputes as not received |
| `4000 0000 0000 1976` | ⚠️ Charge succeeds, disputes with inquiry |
| `4000 0000 0000 1984` | ⚠️ Charge succeeds, early fraud warning |

### **Refunds**

| Card Number | Behavior |
|-------------|----------|
| `4000 0000 0000 3220` | ❌ Charge succeeds, refund fails |

### **Risk & Fraud**

| Card Number | Risk Level |
|-------------|------------|
| `4000 0000 0000 0101` | 🟢 Normal risk |
| `4000 0000 0000 9235` | 🟡 Elevated risk |
| `4100 0000 0000 0019` | 🔴 Highest risk |
| `4000 0000 0000 4954` | 🔴 Blocked (high risk) |

---

## 📝 **Test Card Details**

### **For All Test Cards:**

- **Expiry Date:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP/Postal Code:** Any valid format (e.g., `12345` or `SW1A 1AA`)
- **Name:** Any name

### **Example:**

```
Card Number:  4242 4242 4242 4242
Expiry:       12/34
CVC:          123
ZIP:          12345
Name:         Test User
```

---

## 🧪 **Testing Workflow**

### **1. Basic Payment Test**

```
Card: 4242 4242 4242 4242
Expected: ✅ Payment succeeds
```

### **2. Declined Payment Test**

```
Card: 4000 0000 0000 0002
Expected: ❌ Payment declined
```

### **3. 3D Secure Test**

```
Card: 4000 0025 0000 3155
Expected: 🔐 Authentication modal appears → ✅ Payment succeeds
```

### **4. Subscription Test**

```
Card: 4242 4242 4242 4242
Expected: ✅ Subscription created, recurring charges succeed
```

---

## 🌐 **Testing in Different Regions**

### **European Cards (SCA Required)**

Use cards starting with `4000 00` for region-specific testing:

```
France:  4000 0025 0000 0003
Germany: 4000 0027 6000 0016
UK:      4000 0082 6000 0000
```

These cards will trigger Strong Customer Authentication (SCA) requirements.

---

## 🔧 **Stripe CLI Testing**

### **Trigger Test Webhooks**

```bash
# Successful payment
stripe trigger payment_intent.succeeded

# Failed payment
stripe trigger payment_intent.payment_failed

# Successful checkout
stripe trigger checkout.session.completed

# Subscription created
stripe trigger customer.subscription.created

# Subscription updated
stripe trigger customer.subscription.updated
```

---

## 📊 **Testing Checklist**

### **For CV-Helper Payment Integration:**

- [ ] **Successful one-time payment** (`4242 4242 4242 4242`)
  - [ ] Payment recorded in database
  - [ ] User status updated to `ONE_TIME`
  - [ ] Subscription created with 3 AI credits

- [ ] **Successful subscription** (`4242 4242 4242 4242`)
  - [ ] Payment recorded in database
  - [ ] User status updated to `PRO`
  - [ ] Subscription created with unlimited credits

- [ ] **Declined payment** (`4000 0000 0000 0002`)
  - [ ] Error message shown to user
  - [ ] No database records created

- [ ] **3D Secure authentication** (`4000 0025 0000 3155`)
  - [ ] Authentication modal appears
  - [ ] Payment succeeds after authentication
  - [ ] Database updated correctly

- [ ] **Webhook processing**
  - [ ] `checkout.session.completed` creates records
  - [ ] `payment_intent.succeeded` updates status
  - [ ] `payment_intent.payment_failed` marks as failed

---

## 🚨 **Important Notes**

### **Test Mode Only**

⚠️ **These cards ONLY work in TEST mode!**

- Test mode uses keys starting with `sk_test_` and `pk_test_`
- Live mode uses keys starting with `sk_live_` and `pk_live_`
- Never use test cards in production!

### **Switching to Live Mode**

When going to production:

1. ✅ Replace test keys with live keys
2. ✅ Create live products in Stripe Dashboard
3. ✅ Update webhook endpoints
4. ✅ Test with real cards (small amounts)
5. ✅ Monitor Stripe Dashboard for issues

---

## 🔗 **Useful Links**

- **Stripe Test Cards Docs:** https://stripe.com/docs/testing
- **Stripe Dashboard (Test):** https://dashboard.stripe.com/test
- **Stripe Dashboard (Live):** https://dashboard.stripe.com/live
- **Webhook Testing:** https://stripe.com/docs/webhooks/test

---

## 💡 **Quick Reference Card**

**Most Used Test Cards:**

```
✅ Success:        4242 4242 4242 4242
❌ Decline:        4000 0000 0000 0002
🔐 3D Secure:      4000 0025 0000 3155
💰 Insufficient:   4000 0000 0000 9995
```

**Remember:**
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any valid format

---

**Last Updated:** November 12, 2025  
**Version:** 1.0  
**Source:** Stripe Official Documentation
