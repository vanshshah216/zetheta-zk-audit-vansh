'use client'

import { useRef } from 'react'
import { stats } from '@/lib/mock-data'
import { useCountUp } from '@/lib/hooks'
import { Card } from '@/components/ds/card'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'

export function StatsSection() {
  const refs = useRef<(HTMLElement | null)[]>([])

  return (
    <section className="py-20 sm:py-32 relative border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const numberValue = parseInt(stat.value.replace(/,/g, ''))
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { count, ref } = useCountUp(numberValue, 2000)

              return (
                <StaggerItem key={index}>
                  <Card variant="glass" className="text-center p-6">
                    <div
                      ref={ref as any}
                      className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue mb-2"
                    >
                      {count.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                </StaggerItem>
              )
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
