'use client'

import Link from 'next/link'
import { Button } from '@/components/ds/button'
import { FloatingParticles, FadeIn } from '@/components/ds/animations'
import { ArrowRight, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <FloatingParticles particleCount={40} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-md border border-border/50 rounded-full">
            <Zap className="w-4 h-4 text-cyan" />
            <span className="text-sm text-muted-foreground">
              Now available on mainnet with 10,000+ auditors
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple">
              Smart Contract Security
            </span>
            {' '}Without Compromise
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Decentralized auditing powered by zero-knowledge proofs. Get your smart contracts audited by the
            world&apos;s best security professionals while keeping your code completely private.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button size="lg" variant="cyan" className="group">
                Request Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/#marketplace">
              <Button size="lg" variant="outline">
                View Marketplace
              </Button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 glass rounded-lg">
              <div className="text-2xl font-bold text-cyan">99.8%</div>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <div className="text-2xl font-bold text-emerald">24h</div>
              <p className="text-sm text-muted-foreground">Average Start Time</p>
            </div>
            <div className="p-4 glass rounded-lg">
              <div className="text-2xl font-bold text-purple">$50k</div>
              <p className="text-sm text-muted-foreground">Max Bounty Offered</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
