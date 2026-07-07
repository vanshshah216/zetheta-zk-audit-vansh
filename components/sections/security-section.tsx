'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Badge } from '@/components/ds/badge'
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'
import { Lock, Shield, Eye, Database } from 'lucide-react'

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'End-to-End Encryption',
    description:
      'Military-grade AES-256 encryption for all code uploads and audit communications. Your source code never exists in plaintext on our servers.',
    color: 'cyan',
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Zero Knowledge Proofs',
    description:
      'Cryptographic verification proves code correctness without revealing the code itself. Audit confidentiality guaranteed at protocol level.',
    color: 'blue',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'NDA & Legal Protection',
    description:
      'Legally binding non-disclosure agreements with all auditors. Insurance coverage for audit findings and compliance guarantees.',
    color: 'emerald',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Decentralized Storage',
    description:
      'Audit reports stored on distributed IPFS nodes with multi-signature access control. No single point of failure or censorship.',
    color: 'purple',
  },
]

export function SecuritySection() {
  const colorClasses = {
    cyan: 'text-cyan',
    blue: 'text-blue',
    emerald: 'text-emerald',
    purple: 'text-purple',
  }

  return (
    <section id="security" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Security First</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your code privacy and security are our top priority. Built with enterprise-grade infrastructure.
          </p>
        </div>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <Card variant="glass" className="h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${colorClasses[feature.color as keyof typeof colorClasses]} bg-${feature.color}/10`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Compliance Badge */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <div className="px-4 py-2 glass rounded-lg flex items-center gap-2">
            <Badge variant="success" className="!text-xs">
              SOC 2 Type II
            </Badge>
          </div>
          <div className="px-4 py-2 glass rounded-lg flex items-center gap-2">
            <Badge variant="success" className="!text-xs">
              ISO 27001
            </Badge>
          </div>
          <div className="px-4 py-2 glass rounded-lg flex items-center gap-2">
            <Badge variant="success" className="!text-xs">
              GDPR Compliant
            </Badge>
          </div>
          <div className="px-4 py-2 glass rounded-lg flex items-center gap-2">
            <Badge variant="success" className="!text-xs">
              Bug Bounty Insured
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
