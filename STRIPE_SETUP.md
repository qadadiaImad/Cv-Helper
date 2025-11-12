# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for CV-Helper.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

   This will install:
   - `stripe` (v17.5.0) - Server-side Stripe SDK
   - `@stripe/stripe-js` (v4.11.0) - Client-side Stripe SDK

## Configuration

### 1. Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 2. Create Stripe Products and Prices

1. Go to https://dashboard.stripe.com/products
2. Create two products:

   **One-Time Boost** (€1)
   - Name: One-Time Boost
   - Price: €1.00
   - Type: One-time payment
   - Copy the Price ID (starts with `price_`)

   **Pro Unlimited** (€6/month)
   - Name: Pro Unlimited
   - Price: €6.00/month
   - Type: Recurring (monthly)
   - Copy the Price ID (starts with `price_`)

### 3. Set Up Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME="price_your_one_time_price_id"
NEXT_PUBLIC_STRIPE_PRICE_PRO="price_your_pro_price_id"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Testing

### Test Cards

Use these test card numbers in development:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

### Testing Webhooks Locally

1. Install Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret and update your `.env.local`

## Usage

### Pricing Page

The pricing page (`/pricing`) now has integrated Stripe checkout:

- **Free Plan**: Redirects to dashboard
- **One-Time Boost**: Opens Stripe Checkout for one-time payment
- **Pro Unlimited**: Opens Stripe Checkout for subscription

### API Routes

- **Create Checkout Session**: `POST /api/stripe/create-checkout-session`
- **Webhook Handler**: `POST /api/stripe/webhook`

### Client-Side Integration

```typescript
import { createCheckoutSession } from '@/lib/stripe';

// Trigger checkout
await createCheckoutSession(planId, priceId, userId);
```

## Production Deployment

1. Replace test keys with live keys from Stripe Dashboard
2. Update webhook endpoint URL to production domain
3. Set `NEXT_PUBLIC_APP_URL` to your production URL
4. Test with real payment methods

## Security Notes

- Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in client-side code
- Always validate webhook signatures
- Use HTTPS in production
- Implement proper user authentication before processing payments

## Troubleshooting

### Webhook Not Receiving Events

- Check webhook endpoint URL is correct
- Verify webhook secret matches
- Check Stripe Dashboard > Webhooks > Events for delivery status

### Payment Not Completing

- Check browser console for errors
- Verify price IDs are correct
- Check Stripe Dashboard > Payments for payment status

### TypeScript Errors

If you see "Cannot find module 'stripe'" errors, run:
```bash
npm install
```

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
