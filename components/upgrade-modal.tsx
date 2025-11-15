"use client"

import * as React from "react"
import { X, Sparkles, Check, Zap, Crown, Rocket } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export type UpgradeFeature = 
  | 'resume' 
  | 'template' 
  | 'ai_polish' 
  | 'ai_import' 
  | 'ai_cover_letter'
  | 'ats_score'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature: UpgradeFeature
  currentPlan?: 'free' | 'one_time' | 'basic' | 'pro'
}

const featureConfig: Record<UpgradeFeature, {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  recommendedPlan: 'basic' | 'pro' | 'one_time'
  planName: string
  price: string
}> = {
  resume: {
    icon: <Crown className="h-8 w-8 text-pink-600" />,
    title: "Upgrade to Create More Resumes",
    description: "You've reached your resume limit on the Free plan",
    benefits: [
      "Create up to 5 professional resumes",
      "Access all premium templates",
      "Unlimited AI-powered features",
      "Real-time ATS score checking"
    ],
    recommendedPlan: 'basic',
    planName: 'Basic Plan',
    price: '€8.99/month'
  },
  template: {
    icon: <Sparkles className="h-8 w-8 text-pink-600" />,
    title: "Unlock Premium Templates",
    description: "This template is only available on paid plans",
    benefits: [
      "Access 25+ premium templates",
      "Modern, ATS-friendly designs",
      "Regular template updates",
      "Stand out from the competition"
    ],
    recommendedPlan: 'one_time',
    planName: 'Quick Boost',
    price: '€2.99 one-time'
  },
  ai_polish: {
    icon: <Zap className="h-8 w-8 text-pink-600" />,
    title: "Unlock AI Resume Polish",
    description: "Enhance your resume with AI-powered improvements",
    benefits: [
      "AI-powered content optimization",
      "Grammar and style improvements",
      "Keyword optimization for ATS",
      "Professional tone enhancement"
    ],
    recommendedPlan: 'one_time',
    planName: 'Quick Boost',
    price: '€2.99 one-time'
  },
  ai_import: {
    icon: <Rocket className="h-8 w-8 text-pink-600" />,
    title: "Unlock AI CV Import",
    description: "Import and parse your existing CV with AI",
    benefits: [
      "Automatic CV parsing",
      "Smart data extraction",
      "Save hours of manual entry",
      "Works with PDF, DOC, DOCX"
    ],
    recommendedPlan: 'one_time',
    planName: 'Quick Boost',
    price: '€2.99 one-time'
  },
  ai_cover_letter: {
    icon: <Sparkles className="h-8 w-8 text-pink-600" />,
    title: "Unlock AI Cover Letter Generator",
    description: "Generate personalized cover letters with AI",
    benefits: [
      "AI-generated cover letters",
      "Tailored to job descriptions",
      "Professional formatting",
      "Multiple variations"
    ],
    recommendedPlan: 'basic',
    planName: 'Basic Plan',
    price: '€7.99/month'
  },
  ats_score: {
    icon: <Check className="h-8 w-8 text-pink-600" />,
    title: "Unlock Real-time ATS Score",
    description: "Get instant feedback on your resume's ATS compatibility",
    benefits: [
      "Real-time ATS score analysis",
      "Keyword optimization suggestions",
      "Format compatibility check",
      "Improve your chances of getting hired"
    ],
    recommendedPlan: 'basic',
    planName: 'Basic Plan',
    price: '€8.99/month'
  }
}

export function UpgradeModal({ isOpen, onClose, feature, currentPlan = 'free' }: UpgradeModalProps) {
  const router = useRouter()
  const config = featureConfig[feature]

  const handleUpgrade = () => {
    router.push('/pricing')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                {config.icon}
              </div>
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-2">
                  {config.planName}
                </Badge>
                <DialogTitle className="text-2xl font-bold text-white">
                  {config.title}
                </DialogTitle>
              </div>
            </div>
          </div>
          <DialogDescription className="text-pink-100 mt-2">
            {config.description}
          </DialogDescription>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">
                What you'll get with {config.planName}:
              </h4>
              <ul className="space-y-2">
                {config.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing highlight */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-pink-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{config.price}</p>
                </div>
                <Sparkles className="h-8 w-8 text-pink-400" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleUpgrade}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
            </div>

            {/* Footer note */}
            <p className="text-xs text-center text-gray-500 pt-2">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
