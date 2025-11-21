'use client'

import { useState } from 'react'
import type { FAQ } from '@/lib/ats-types'
import { ChevronDown } from 'lucide-react'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-muted-foreground">Frequently Asked Questions:</p>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border-2 border-border transition-all hover:border-primary/50"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/50"
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <ChevronDown
                className={`size-4 shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t-2 border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
