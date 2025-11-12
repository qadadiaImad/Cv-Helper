"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/lib/theme-context"
import { createCheckoutSession } from "@/lib/stripe"
import { toast } from "sonner"

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    price: "0",
    currency: "€",
    period: "forever",
    description: "Perfect for getting started with your first resume",
    badge: null,
    features: [
      "1 Resume",
      "5 Professional Templates",
      "Basic Customization",
      "PDF Export",
      "ATS-Friendly Format",
      "Email Support"
    ],
    limitations: [
      "No AI Features",
      "Limited Templates",
      "Basic Customization Only"
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    popular: false
  },
  {
    id: "one-time",
    name: "One-Time Boost",
    icon: Zap,
    price: "1",
    currency: "€",
    period: "one-time payment",
    description: "Perfect for a quick resume polish before that important application",
    badge: "Best Value",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ONE_TIME || "price_one_time",
    features: [
      "Everything in Free",
      "3 AI Polish Credits",
      "AI Content Suggestions",
      "AI Grammar & Style Check",
      "Keyword Optimization",
      "All 18+ Templates",
      "Advanced Customization",
      "Priority Email Support",
      "30-Day Access"
    ],
    limitations: [],
    cta: "Buy Now - €1",
    ctaVariant: "default" as const,
    popular: true
  },
  {
    id: "pro",
    name: "Pro Unlimited",
    icon: Crown,
    price: "6",
    currency: "€",
    period: "per month",
    description: "For professionals who want unlimited AI-powered resume optimization",
    badge: "Most Popular",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "price_pro",
    features: [
      "Everything in One-Time",
      "Unlimited AI Polish",
      "Unlimited Resumes",
      "AI Job Matching",
      "AI Cover Letter Generator",
      "Real-time ATS Score",
      "Industry-Specific Templates",
      "Custom Branding",
      "Version History",
      "Priority Support",
      "Early Access to New Features"
    ],
    limitations: [],
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
    popular: false
  }
]

export default function PricingPage() {
  const { theme } = useTheme()
  const [loading, setLoading] = React.useState<string | null>(null)

  const handleCheckout = async (plan: typeof PRICING_PLANS[number]) => {
    if (plan.id === 'free') {
      return // Free plan doesn't need checkout
    }

    try {
      setLoading(plan.id)
      
      // Get user ID from session/auth if available
      // For now, we'll pass undefined and handle guest checkout
      const userId = undefined // TODO: Get from auth context
      
      await createCheckoutSession(plan.id, plan.priceId!, userId)
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Failed to start checkout. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-300 pt-20 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom right, ${theme.bg}, ${theme.bgSecondary})`
      }}
      suppressHydrationWarning
    >
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blobs */}
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}40, ${theme.accent}20)`
          }}
        />
        <div 
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}30, ${theme.accent}15)`
          }}
        />
        <div 
          className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}25, ${theme.accent}15)`
          }}
        />
        
        {/* Infinity symbols */}
        <div 
          className="absolute top-32 right-1/4 text-9xl font-black opacity-8 rotate-12"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
        <div 
          className="absolute bottom-1/4 left-20 text-8xl font-black opacity-8 -rotate-12"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
        <div 
          className="absolute top-1/2 right-32 text-7xl font-black opacity-6 rotate-45"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge 
            className="mb-4 px-4 py-2 text-sm font-semibold"
            style={{ 
              backgroundColor: `${theme.accent}20`,
              color: theme.accent,
              borderColor: theme.accent
            }}
          >
            💎 Simple, Transparent Pricing
          </Badge>
          
          <h1 
            className="text-5xl md:text-6xl font-black tracking-tight"
            style={{ color: theme.text }}
          >
            Choose Your Plan
          </h1>
          
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: theme.textSecondary }}
          >
            Start free, upgrade when you need AI-powered features. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {PRICING_PLANS.map((plan) => {
            const Icon = plan.icon
            
            return (
              <Card
                key={plan.id}
                className={`relative p-8 transition-all duration-300 hover:shadow-2xl ${
                  plan.popular ? 'ring-2 scale-105' : ''
                }`}
                style={{
                  borderColor: plan.popular ? theme.accent : theme.border,
                  backgroundColor: theme.card
                }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: theme.text }}
                  >
                    {plan.name}
                  </h3>
                  
                  <p 
                    className="text-sm mb-4"
                    style={{ color: theme.textSecondary }}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span 
                      className="text-5xl font-black"
                      style={{ color: theme.accent }}
                    >
                      {plan.price}
                    </span>
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: theme.accent }}
                    >
                      {plan.currency}
                    </span>
                  </div>
                  
                  <p 
                    className="text-sm"
                    style={{ color: theme.textSecondary }}
                  >
                    {plan.period}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.ctaVariant}
                  className="w-full mb-6 h-12 text-base font-semibold"
                  style={
                    plan.ctaVariant === "default"
                      ? {
                          backgroundColor: theme.accent,
                          color: "white"
                        }
                      : undefined
                  }
                  onClick={() => plan.id === "free" ? window.location.href = "/dashboard/cvs" : handleCheckout(plan)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? "Processing..." : plan.cta}
                  {loading !== plan.id && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${theme.accent}20` }}
                      >
                        <Check 
                          className="w-3 h-3"
                          style={{ color: theme.accent }}
                        />
                      </div>
                      <span 
                        className="text-sm"
                        style={{ color: theme.text }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-3xl font-bold text-center mb-8"
            style={{ color: theme.text }}
          >
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card className="p-6" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
                What are AI Polish Credits?
              </h3>
              <p style={{ color: theme.textSecondary }}>
                AI Polish Credits allow you to use our AI to improve your resume content, fix grammar, optimize keywords, and make your resume more ATS-friendly. Each credit = one full resume polish.
              </p>
            </Card>

            <Card className="p-6" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
                Can I upgrade or downgrade anytime?
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Yes! You can upgrade from Free to One-Time or Pro at any time. Pro subscriptions can be cancelled anytime, and you'll keep access until the end of your billing period.
              </p>
            </Card>

            <Card className="p-6" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
                What payment methods do you accept?
              </h3>
              <p style={{ color: theme.textSecondary }}>
                We accept all major credit cards, PayPal, and other secure payment methods through our payment processor.
              </p>
            </Card>

            <Card className="p-6" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: theme.text }}>
                Is there a free trial for Pro?
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Yes! Pro plan comes with a 7-day free trial. No credit card required to start. You can cancel anytime before the trial ends.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg mb-4" style={{ color: theme.textSecondary }}>
            Still have questions?
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
