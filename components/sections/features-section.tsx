'use client'

import { features } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'
import { Zap, Shield, Lock, BarChart3, Zap as ZapPlus, Cpu, Globe2, Wrench, Clock } from 'lucide-react'

const featureIcons = [
  <Zap key="0" className="w-6 h-6" />,
  <Shield key="1" className="w-6 h-6" />,
  <Lock key="2" className="w-6 h-6" />,
  <BarChart3 key="3" className="w-6 h-6" />,
  <ZapPlus key="4" className="w-6 h-6" />,
  <Cpu key="5" className="w-6 h-6" />,
  <Globe2 key="6" className="w-6 h-6" />,
  <Wrench key="7" className="w-6 h-6" />,
  <Clock key="8" className="w-6 h-6" />,
]

const colorClasses = {
  cyan: 'border-cyan/30 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]',
  blue: 'border-blue/30 hover:border-blue/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]',
  emerald: 'border-emerald/30 hover:border-emerald/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]',
  purple: 'border-purple/30 hover:border-purple/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]',
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Enterprise Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for production-grade smart contract security and compliance
          </p>
        </div>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card
                  variant="default"
                  className={`border transition-all duration-300 h-full ${colorClasses[feature.color]}`}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-${feature.color}`}>
                      {featureIcons[index]}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
