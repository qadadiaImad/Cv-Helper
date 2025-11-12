import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  createPayment,
  updatePaymentStatus,
  upsertSubscription,
  updateUserSubscriptionStatus,
  saveStripeCustomerId
} from '@/lib/payment-helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const userId = session.client_reference_id;
    const planId = session.metadata?.planId;
    const customerId = session.customer as string;

    if (!userId) {
      console.error('No user ID in checkout session');
      return;
    }

    console.log(`Checkout completed for user ${userId}, plan: ${planId}`);

    // Save Stripe customer ID
    if (customerId) {
      await saveStripeCustomerId(userId, customerId);
    }

    // Get subscription details if it's a subscription
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      
      await upsertSubscription({
        userId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeProductId: subscription.items.data[0].price.product as string,
        status: subscription.status,
        planType: planId === 'pro' ? 'pro' : 'one-time',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        aiCreditsTotal: planId === 'one-time' ? 3 : 0
      });

      await updateUserSubscriptionStatus(userId, planId === 'pro' ? 'PRO' : 'ONE_TIME');
    }

    // Create payment record
    if (session.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
      
      await createPayment({
        userId,
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        planType: planId || 'unknown',
        status: 'SUCCEEDED',
        description: `Payment for ${planId} plan`
      });
    }

    console.log(`✅ Successfully processed checkout for user ${userId}`);

  } catch (error) {
    console.error('Handle checkout session error:', error);
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment successful: ${paymentIntent.id}`);

    // Update payment status
    try {
      await updatePaymentStatus(paymentIntent.id, 'SUCCEEDED');
      console.log(`✅ Updated payment ${paymentIntent.id} to SUCCEEDED`);
    } catch (error) {
      // Payment might not exist yet if webhook arrives before checkout.session.completed
      console.log(`Payment record not found for ${paymentIntent.id}, will be created by checkout handler`);
    }

  } catch (error) {
    console.error('Handle payment success error:', error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment failed: ${paymentIntent.id}`);

    // Update payment status
    try {
      await updatePaymentStatus(paymentIntent.id, 'FAILED');
      console.log(`✅ Updated payment ${paymentIntent.id} to FAILED`);
    } catch (error) {
      console.log(`Payment record not found for ${paymentIntent.id}`);
    }

  } catch (error) {
    console.error('Handle payment failure error:', error);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.userId;
    const status = subscription.status;

    console.log(`Subscription ${subscription.id} status: ${status}`);

    if (!userId) {
      console.error('No user ID in subscription metadata');
      return;
    }

    // Update subscription in database
    await upsertSubscription({
      userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeProductId: subscription.items.data[0].price.product as string,
      status: subscription.status,
      planType: subscription.metadata?.planType || 'pro',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    });

    // Update user status based on subscription status
    if (status === 'active') {
      await updateUserSubscriptionStatus(userId, 'PRO');
    } else if (status === 'canceled' || status === 'unpaid') {
      await updateUserSubscriptionStatus(userId, 'CANCELLED');
    } else if (status === 'past_due') {
      await updateUserSubscriptionStatus(userId, 'EXPIRED');
    }

    console.log(`✅ Updated subscription ${subscription.id} for user ${userId}`);

  } catch (error) {
    console.error('Handle subscription change error:', error);
  }
}
