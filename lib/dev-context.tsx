'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { AIOperation, AIModel, SessionStats } from './ai-dev-tools'

interface DevContextType {
  isEnabled: boolean
  selectedModel: string
  setSelectedModel: (model: string) => void
  operations: AIOperation[]
  addOperation: (op: AIOperation) => void
  sessionStats: SessionStats
  clearStats: () => void
  models: AIModel[]
  setModels: (models: AIModel[]) => void
}

const DevContext = createContext<DevContextType | null>(null)

const STORAGE_KEY = 'ai-dev-tools'
const DEFAULT_MODEL = 'openai/gpt-3.5-turbo'

export function DevProvider({ children }: { children: ReactNode }) {
  const isEnabled = process.env.NEXT_PUBLIC_DEV_TOOLBAR === 'true'
  
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
  const [operations, setOperations] = useState<AIOperation[]>([])
  const [models, setModels] = useState<AIModel[]>([])

  // Load from localStorage
  useEffect(() => {
    if (!isEnabled) return
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setSelectedModel(data.selectedModel || DEFAULT_MODEL)
        setOperations(data.operations || [])
      } catch (e) {
        console.error('Failed to load dev tools data:', e)
      }
    }
  }, [isEnabled])

  // Save to localStorage
  useEffect(() => {
    if (!isEnabled) return
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      selectedModel,
      operations: operations.slice(-50), // Keep last 50
    }))
  }, [selectedModel, operations, isEnabled])

  const addOperation = (op: AIOperation) => {
    setOperations(prev => [...prev, op])
  }

  const clearStats = () => {
    setOperations([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const sessionStats: SessionStats = operations.reduce(
    (acc, op) => ({
      operations: acc.operations + 1,
      totalCost: acc.totalCost + op.cost,
      totalTokens: acc.totalTokens + op.totalTokens,
      models: {
        ...acc.models,
        [op.model]: (acc.models[op.model] || 0) + 1,
      },
    }),
    { operations: 0, totalCost: 0, totalTokens: 0, models: {} as Record<string, number> }
  )

  return (
    <DevContext.Provider
      value={{
        isEnabled,
        selectedModel,
        setSelectedModel,
        operations,
        addOperation,
        sessionStats,
        clearStats,
        models,
        setModels,
      }}
    >
      {children}
    </DevContext.Provider>
  )
}

export function useDevTools() {
  const context = useContext(DevContext)
  if (!context) {
    throw new Error('useDevTools must be used within DevProvider')
  }
  return context
}
