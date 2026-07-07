'use client'

import Link from 'next/link'
import { Button } from '@/components/ds/button'
import { Card } from '@/components/ds/card'
import { FadeIn } from '@/components/ds/animations'
import { ArrowRight, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Card variant="gradient" className="p-8 sm:p-12 text-center border-gradient">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-balance">
                Ready to Secure Your Smart Contract?
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with a free code audit estimate in under 2 minutes. No credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/auth/register">
                  <Button size="lg" variant="cyan" className="group">
                    Start Free Audit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button size="lg" variant="outline">
                    Book a Demo
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground justify-center pt-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan" />
                  <span>Instant quote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan" />
                  <span>Dedicated auditor</span>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
