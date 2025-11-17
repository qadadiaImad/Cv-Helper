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
  const [selectedOp, setSelectedOp] = useState<typeof operations[0] | null>(null)

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
                <div 
                  key={op.id} 
                  className="p-2 bg-slate-800 rounded text-xs cursor-pointer hover:bg-slate-700 transition-colors"
                  onClick={() => setSelectedOp(op)}
                >
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

      {/* Prompt Details Modal */}
      {selectedOp && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setSelectedOp(null)}
        >
          <div 
            className="bg-slate-900 rounded-lg shadow-2xl border border-slate-700 max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{selectedOp.operation}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(selectedOp.timestamp).toLocaleString()} • {selectedOp.model}
                </p>
              </div>
              <button
                onClick={() => setSelectedOp(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)] space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-slate-800 rounded">
                  <div className="text-slate-400">Cost</div>
                  <div className="text-green-400 font-semibold">{formatCost(selectedOp.cost)}</div>
                </div>
                <div className="p-2 bg-slate-800 rounded">
                  <div className="text-slate-400">Tokens</div>
                  <div className="text-white font-semibold">{formatTokens(selectedOp.totalTokens)}</div>
                </div>
                <div className="p-2 bg-slate-800 rounded">
                  <div className="text-slate-400">Model</div>
                  <div className="text-white font-semibold text-[10px]">{selectedOp.model.split('/')[1]}</div>
                </div>
              </div>

              {/* System Prompt */}
              {selectedOp.systemPrompt && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">System Prompt</h4>
                  <div className="p-3 bg-slate-800 rounded text-xs text-slate-300 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                    {selectedOp.systemPrompt}
                  </div>
                </div>
              )}

              {/* User Prompt */}
              {selectedOp.userPrompt && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">User Prompt</h4>
                  <div className="p-3 bg-slate-800 rounded text-xs text-slate-300 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                    {selectedOp.userPrompt}
                  </div>
                </div>
              )}

              {/* AI Response */}
              {selectedOp.responseText && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">AI Response</h4>
                  <div className="p-3 bg-slate-800 rounded text-xs text-slate-300 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                    {selectedOp.responseText}
                  </div>
                </div>
              )}

              {/* Token Breakdown */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Token Breakdown</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-800 rounded">
                    <div className="text-slate-400">Prompt Tokens</div>
                    <div className="text-white">{formatTokens(selectedOp.promptTokens)}</div>
                  </div>
                  <div className="p-2 bg-slate-800 rounded">
                    <div className="text-slate-400">Completion Tokens</div>
                    <div className="text-white">{formatTokens(selectedOp.completionTokens)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


