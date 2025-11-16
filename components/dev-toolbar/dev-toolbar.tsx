'use client'

import { useState, useEffect } from 'react'
import { useDevTools } from '@/lib/dev-context'
import { formatCost, formatTokens } from '@/lib/ai-dev-tools'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown, Trash2, Settings } from 'lucide-react'
import { ModelSelector } from './model-selector'

export function DevToolbar() {
  const { isEnabled, operations, sessionStats, clearStats } = useDevTools()
  const [isOpen, setIsOpen] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  if (!isEnabled) return null

  const lastOp = operations[operations.length - 1]

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 bg-slate-900 text-white rounded-lg shadow-2xl border border-slate-700">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-800 rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-green-400" />
          <span className="font-semibold text-sm">AI Dev Tools</span>
          <span className="text-xs text-slate-400">
            {sessionStats.operations} ops
          </span>
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-3 space-y-3 border-t border-slate-700">
          {/* Model Selector */}
          <ModelSelector />

          {/* Stats */}
          <div className="space-y-2 text-xs">
            {lastOp && (
              <div className="p-2 bg-slate-800 rounded">
                <div className="text-slate-400 mb-1">Last Operation</div>
                <div className="flex justify-between">
                  <span>{lastOp.operation}</span>
                  <span className="text-green-400">{formatCost(lastOp.cost)}</span>
                </div>
                <div className="text-slate-400 mt-1">
                  {formatTokens(lastOp.totalTokens)} tokens
                </div>
              </div>
            )}

            <div className="p-2 bg-slate-800 rounded">
              <div className="text-slate-400 mb-1">Session Total</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg text-green-400">
                    {formatCost(sessionStats.totalCost)}
                  </div>
                  <div className="text-slate-400">
                    {formatTokens(sessionStats.totalTokens)} tokens
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearStats}
                  className="h-7 text-red-400 hover:text-red-300 hover:bg-red-950"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details Toggle */}
          {operations.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full h-7 text-xs"
            >
              {showDetails ? 'Hide' : 'Show'} History
            </Button>
          )}

          {/* History */}
          {showDetails && (
            <div className="max-h-64 overflow-y-auto space-y-1">
              {operations.slice(-10).reverse().map((op) => (
                <div key={op.id} className="p-2 bg-slate-800 rounded text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{op.operation}</span>
                    <span className="text-green-400">{formatCost(op.cost)}</span>
                  </div>
                  <div className="text-slate-500 text-[10px] mt-1">
                    {new Date(op.timestamp).toLocaleTimeString()} • {formatTokens(op.totalTokens)} tokens
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
