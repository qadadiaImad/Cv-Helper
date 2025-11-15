/**
 * Subscription Hook
 * 
 * Provides subscription status and feature access checks
 */

import { useState, useEffect } from 'react'

export interface SubscriptionLimits {
  maxResumes: number // -1 = unlimited
  hasAIAccess: boolean
  hasUnlimitedAI: boolean
  aiCreditsRemaining: number
  hasPremiumTemplates: boolean
  hasAICoverLetter: boolean
  hasATSScore: boolean
  planType: 'free' | 'one_time' | 'basic' | 'pro'
  planName: string
}

export function useSubscription() {
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptionLimits()
  }, [])

  const fetchSubscriptionLimits = async () => {
    try {
      const response = await fetch('/api/subscription/limits')
      if (response.ok) {
        const data = await response.json()
        setLimits(data)
      }
    } catch (error) {
      console.error('Failed to fetch subscription limits:', error)
    } finally {
      setLoading(false)
    }
  }

  const canCreateResume = (currentCount: number): boolean => {
    if (!limits) return false
    if (limits.maxResumes === -1) return true // unlimited
    return currentCount < limits.maxResumes
  }

  const canUseAI = (): boolean => {
    if (!limits) return false
    return limits.hasAIAccess && (limits.hasUnlimitedAI || limits.aiCreditsRemaining > 0)
  }

  const canAccessTemplate = (templateId: string): boolean => {
    if (!limits) return false
    
    // Basic templates (first 5) are always accessible
    const basicTemplates = [
      'atlantic_blue',
      'modern_blue_black',
      'classic_professional',
      'creative_minimal',
      'corporate_elegant'
    ]
    
    if (basicTemplates.includes(templateId)) return true
    
    // Premium templates require paid plan
    return limits.hasPremiumTemplates
  }

  const getUpgradeMessage = (feature: string): string => {
    const messages: Record<string, string> = {
      resume: `You've reached your resume limit. Upgrade to ${limits?.planType === 'free' ? 'Basic' : 'Pro'} for more resumes!`,
      ai: 'Upgrade to use AI features!',
      ai_credits: 'You\'ve used all your AI credits. Upgrade to Basic or Pro for unlimited AI!',
      template: 'This is a premium template. Upgrade to access all templates!',
      cover_letter: 'Upgrade to Basic or Pro to generate AI cover letters!',
      ats_score: 'Upgrade to Basic or Pro for real-time ATS scoring!',
    }
    return messages[feature] || 'Upgrade to unlock this feature!'
  }

  return {
    limits,
    loading,
    canCreateResume,
    canUseAI,
    canAccessTemplate,
    getUpgradeMessage,
    refresh: fetchSubscriptionLimits,
  }
}
