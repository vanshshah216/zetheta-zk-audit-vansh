'use client'

import { useState } from 'react'
import { faqs } from '@/lib/mock-data'
import { Card } from '@/components/ds/card'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'
import { ChevronDown } from 'lucide-react'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 sm:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our platform
          </p>
        </div>

        <StaggerContainer>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <Card variant="glass">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors"
                  >
                    <h3 className="text-left font-semibold text-foreground">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6 border-t border-border/30">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
