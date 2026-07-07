'use client'

import { timelineSteps } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'
import { Badge } from '@/components/ds/badge'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to get your smart contract audited by industry experts
          </p>
        </div>

        <StaggerContainer>
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <StaggerItem key={index}>
                <Card variant="glass">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-cyan to-blue flex items-center justify-center text-background font-bold text-lg">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {index < timelineSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan/50 to-blue/50 rounded-full" />
                  </div>
                )}
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
