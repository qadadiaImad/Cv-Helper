"use client"

import { useState, useCallback } from 'react'
import type { UpgradeFeature } from '@/components/upgrade-modal'

export function useUpgradeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [feature, setFeature] = useState<UpgradeFeature>('resume')

  const showUpgradeModal = useCallback((featureType: UpgradeFeature) => {
    setFeature(featureType)
    setIsOpen(true)
  }, [])

  const closeUpgradeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    feature,
    showUpgradeModal,
    closeUpgradeModal,
  }
}
